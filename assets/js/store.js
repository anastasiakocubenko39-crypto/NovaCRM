/* Збереження даних.
   1) Офлайн (флешка / без сервера): один зашифрований файл novacrm-data.json поруч із програмою.
      Шифрування AES-256-GCM, ключ з пароля через PBKDF2-SHA256 (600 000 ітерацій).
   2) Сервер (server/server.js): кілька користувачів, ролі, спільна база, синхронізація кожні кілька секунд. */

const enc = new TextEncoder(), dec = new TextDecoder();
const b64 = (buf) => { let s = ''; const a = new Uint8Array(buf); for (let i = 0; i < a.length; i += 0x8000) s += String.fromCharCode(...a.subarray(i, i + 0x8000)); return btoa(s); };
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const ITER = 600000;

async function deriveKey(password, salt) {
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
export async function encryptDb(db, password, saltB64) {
  const salt = saltB64 ? unb64(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(password, salt);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: enc.encode('novacrm-v3') }, key, enc.encode(JSON.stringify(db)));
  return { format: 'NovaCRM-encrypted', version: 3, kdf: { name: 'PBKDF2-SHA256', iterations: ITER, salt: b64(salt) }, iv: b64(iv), data: b64(ct), savedAt: new Date().toISOString() };
}
export async function decryptDb(file, password) {
  if (file?.format !== 'NovaCRM-encrypted' || file.version !== 3) throw new Error('format');
  const key = await deriveKey(password, unb64(file.kdf.salt));
  try {
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(file.iv), additionalData: enc.encode('novacrm-v3') }, key, unb64(file.data));
    return JSON.parse(dec.decode(pt));
  } catch { throw new Error('password'); }
}

export const emptyDb = () => ({ meta: { created: new Date().toISOString(), version: 3 }, settings: {}, data: {}, log: [] });
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/* ── офлайн-сховище: файл на диску ── */
export class OfflineStore {
  constructor() { this.mode = 'offline'; this.db = null; this.password = null; this.handle = null; this.salt = null; this.dirty = false; this.listeners = new Set(); this.status = ''; }
  get canFS() { return 'showSaveFilePicker' in window; }
  async rememberedHandle() {
    try {
      const h = await idb('get'); if (!h) return null;
      return h;
    } catch { return null; }
  }
  async openFile(handle) {
    let file;
    if (handle) { if ((await handle.queryPermission?.({ mode: 'readwrite' })) !== 'granted') await handle.requestPermission?.({ mode: 'readwrite' }); file = await handle.getFile(); this.handle = handle; }
    else if (this.canFS) { const [h] = await window.showOpenFilePicker({ types: [{ description: 'База NovaCRM', accept: { 'application/json': ['.json'] } }] }); this.handle = h; file = await h.getFile(); }
    else file = await pickFileFallback();
    const json = JSON.parse(await file.text());
    this.fileName = file.name;
    return json;
  }
  async unlock(json, password) {
    this.db = await decryptDb(json, password);
    this.password = password; this.salt = json.kdf.salt;
    if (this.handle) idb('set', this.handle).catch(() => {});
    return this.db;
  }
  async createDb(password, db) {
    this.db = db; this.password = password; this.salt = null;
    if (this.canFS) {
      this.handle = await window.showSaveFilePicker({ suggestedName: 'novacrm-data.json', types: [{ description: 'База NovaCRM', accept: { 'application/json': ['.json'] } }] });
      idb('set', this.handle).catch(() => {});
    }
    await this.save(true);
  }
  async save(force) {
    if (!this.db || (!this.dirty && !force)) return;
    const file = await encryptDb(this.db, this.password, this.salt);
    this.salt = file.kdf.salt;
    const text = JSON.stringify(file);
    if (this.handle) {
      const w = await this.handle.createWritable(); await w.write(text); await w.close();
      this.fileName = this.handle.name;
    } else {
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' })); a.download = 'novacrm-data.json'; a.click();
    }
    try { localStorage.setItem('novacrm_backup', text); } catch {} // аварійна копія в браузері (зашифрована)
    this.dirty = false; this.savedAt = new Date(); this.emit();
  }
  async changePassword(newPass) { this.password = newPass; this.salt = null; this.dirty = true; await this.save(true); }
  touch() { this.dirty = true; this.emit(); clearTimeout(this._t); this._t = setTimeout(() => this.handle && this.save().catch((e) => console.error(e)), 1500); }
  on(cb) { this.listeners.add(cb); }
  emit() { this.listeners.forEach((cb) => cb()); }
  lock() { this.db = null; this.password = null; }
  /* операції з записами */
  list(e) { return (this.db.data[e] ||= []); }
  async create(e, rec) { const r = { ...rec, id: uid(), createdAt: Date.now(), updatedAt: Date.now() }; this.list(e).push(r); this.log('create', e, r); this.touch(); return r; }
  async update(e, id, patch) { const r = this.list(e).find((x) => x.id === id); if (!r) return; Object.assign(r, patch, { updatedAt: Date.now() }); this.log('update', e, r); this.touch(); return r; }
  async remove(e, id) { const l = this.list(e); const i = l.findIndex((x) => x.id === id); if (i < 0) return; const [r] = l.splice(i, 1); this.log('delete', e, r); this.touch(); }
  async saveSettings(s) { this.db.settings = { ...this.db.settings, ...s }; this.touch(); }
  log(action, e, r) { (this.db.log ||= []).unshift({ at: Date.now(), who: this.user?.name || 'Адміністратор', action, entity: e, id: r.id, title: r.name || r.title || r.number || '' }); this.db.log.length = Math.min(this.db.log.length, 2000); }
}

/* ── серверне сховище ── */
export class ServerStore {
  constructor() { this.mode = 'server'; this.db = null; this.listeners = new Set(); this.rev = 0; }
  async api(path, opt = {}) {
    const r = await fetch('api/' + path, { credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, ...opt, body: opt.body ? JSON.stringify(opt.body) : undefined });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(j.error || r.statusText); e.status = r.status; throw e; }
    return j;
  }
  static async detect() { try { const r = await fetch('api/ping', { cache: 'no-store' }); return r.ok && (await r.json()).novacrm === true; } catch { return false; } }
  async me() { try { this.user = (await this.api('me')).user; return this.user; } catch { return null; } }
  async login(login, password) { this.user = (await this.api('login', { method: 'POST', body: { login, password } })).user; return this.user; }
  async logout() { await this.api('logout', { method: 'POST' }).catch(() => {}); }
  async load() { const j = await this.api('db'); this.db = j.db; this.rev = j.rev; this.startSync(); return this.db; }
  startSync() {
    clearInterval(this._sync);
    this._sync = setInterval(async () => {
      try {
        const j = await this.api('sync?since=' + this.rev);
        if (j.rev === this.rev) return;
        for (const ch of j.changes) {
          const l = (this.db.data[ch.entity] ||= []);
          const i = l.findIndex((x) => x.id === ch.id);
          if (ch.deleted) { if (i > -1) l.splice(i, 1); } else if (i > -1) l[i] = ch.record; else l.push(ch.record);
        }
        if (j.settings) this.db.settings = j.settings;
        this.rev = j.rev; this.emit();
      } catch (e) { if (e.status === 401) location.reload(); }
    }, 5000);
  }
  on(cb) { this.listeners.add(cb); }
  emit() { this.listeners.forEach((cb) => cb()); }
  list(e) { return (this.db.data[e] ||= []); }
  apply(e, rec, deleted) { const l = this.list(e); const i = l.findIndex((x) => x.id === rec.id); if (deleted) { if (i > -1) l.splice(i, 1); } else if (i > -1) l[i] = rec; else l.push(rec); this.emit(); }
  async create(e, rec) { const j = await this.api('rec/' + e, { method: 'POST', body: rec }); this.apply(e, j.record); return j.record; }
  async update(e, id, patch) { const j = await this.api(`rec/${e}/${id}`, { method: 'PUT', body: patch }); this.apply(e, j.record); return j.record; }
  async remove(e, id) { await this.api(`rec/${e}/${id}`, { method: 'DELETE' }); this.apply(e, { id }, true); }
  async saveSettings(s) { const j = await this.api('settings', { method: 'PUT', body: s }); this.db.settings = j.settings; this.emit(); }
  async users() { return (await this.api('users')).users; }
  async saveUser(u) { return this.api('users' + (u.id ? '/' + u.id : ''), { method: u.id ? 'PUT' : 'POST', body: u }); }
  async deleteUser(id) { return this.api('users/' + id, { method: 'DELETE' }); }
  async changePassword(oldP, newP) { return this.api('password', { method: 'POST', body: { old: oldP, new: newP } }); }
  async importDb(db) { return this.api('import', { method: 'POST', body: { db } }); }
}

/* ── дрібні помічники ── */
function pickFileFallback() {
  return new Promise((res, rej) => {
    const i = document.createElement('input'); i.type = 'file'; i.accept = '.json,application/json';
    i.onchange = () => (i.files[0] ? res(i.files[0]) : rej(new Error('cancel'))); i.click();
  });
}
function idb(op, val) {
  return new Promise((res, rej) => {
    const r = indexedDB.open('novacrm', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onerror = () => rej(r.error);
    r.onsuccess = () => {
      const tx = r.result.transaction('kv', op === 'get' ? 'readonly' : 'readwrite');
      const s = tx.objectStore('kv');
      const q = op === 'get' ? s.get('file') : op === 'del' ? s.delete('file') : s.put(val, 'file');
      q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error);
    };
  });
}
export const forgetFile = () => idb('del').catch(() => {});
