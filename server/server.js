#!/usr/bin/env node
/* NovaCRM 3 — сервер для команди. Без сторонніх бібліотек (потрібен лише Node.js 18+).
   Запуск:   node server/server.js
   Налаштування через змінні середовища:
     PORT=8080            порт
     DATA_DIR=./data      де зберігати базу (db.json), користувачів і резервні копії
     HOST=0.0.0.0         на якому інтерфейсі слухати
   Перший запуск створює адміністратора і друкує його тимчасовий пароль у консоль. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const PORT = +process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const DATA = path.resolve(process.env.DATA_DIR || path.join(ROOT, 'data'));
const DB_FILE = path.join(DATA, 'db.json');
const USERS_FILE = path.join(DATA, 'users.json');
const ENTITIES = ['clients', 'deals', 'objects', 'tasks', 'invoices', 'expenses', 'materials', 'equipment', 'employees', 'suppliers', 'documents'];
const ROLES = ['admin', 'manager', 'worker', 'viewer'];
const SESSION_HOURS = 12;
const MAX_BODY = 25 * 1024 * 1024;

fs.mkdirSync(path.join(DATA, 'backups'), { recursive: true });

/* ── збереження ── */
const readJson = (f, def) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return def; } };
function writeJson(f, obj) { const tmp = f + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(obj)); fs.renameSync(tmp, f); }
let db = readJson(DB_FILE, { meta: { created: new Date().toISOString(), version: 3 }, settings: {}, data: {}, log: [] });
let users = readJson(USERS_FILE, []);
let rev = db.meta.rev || 0;
let changes = []; // [{rev, entity, id, deleted, record}]
let saveTimer = null;
function persist() { clearTimeout(saveTimer); saveTimer = setTimeout(() => { db.meta.rev = rev; writeJson(DB_FILE, db); }, 300); }
function dailyBackup() {
  const f = path.join(DATA, 'backups', `db-${new Date().toISOString().slice(0, 10)}.json`);
  if (!fs.existsSync(f) && fs.existsSync(DB_FILE)) fs.copyFileSync(DB_FILE, f);
  const all = fs.readdirSync(path.join(DATA, 'backups')).filter((x) => x.startsWith('db-')).sort();
  all.slice(0, Math.max(0, all.length - 30)).forEach((x) => fs.unlinkSync(path.join(DATA, 'backups', x))); // зберігаємо 30 днів
}
dailyBackup(); setInterval(dailyBackup, 3600e3);

/* ── паролі ── */
const hash = (pw, salt = crypto.randomBytes(16).toString('hex')) => ({ salt, hash: crypto.scryptSync(pw, salt, 64, { N: 16384 }).toString('hex') });
const verify = (pw, u) => { try { return crypto.timingSafeEqual(Buffer.from(hash(pw, u.salt).hash, 'hex'), Buffer.from(u.hash, 'hex')); } catch { return false; } };
if (!users.length) {
  const pw = crypto.randomBytes(9).toString('base64url');
  users.push({ id: crypto.randomUUID(), login: 'admin', name: 'Адміністратор', role: 'admin', active: true, ...hash(pw), mustChange: true });
  writeJson(USERS_FILE, users);
  console.log('\n  Створено адміністратора.  Логін: admin   Пароль: ' + pw + '\n  Змініть пароль після першого входу (Налаштування → Користувачі).\n');
}

/* ── сесії й захист від підбору ── */
const sessions = new Map(); // token -> {uid, exp}
const fails = new Map(); // ip -> {n, until}
const publicUser = (u) => ({ id: u.id, login: u.login, name: u.name, role: u.role, active: u.active !== false });
function getUser(req) {
  const m = /(?:^|;\s*)nsid=([a-f0-9]{64})/.exec(req.headers.cookie || '');
  const s = m && sessions.get(m[1]);
  if (!s || s.exp < Date.now()) return null;
  const u = users.find((x) => x.id === s.uid && x.active !== false);
  if (u) s.exp = Date.now() + SESSION_HOURS * 3600e3;
  return u || null;
}
function can(u, action, e) {
  if (u.role === 'admin') return true;
  if (u.role === 'viewer') return action === 'view';
  if (action === 'settings' || action === 'users') return false;
  if (u.role === 'worker') return action === 'view' || (['tasks', 'documents', 'expenses'].includes(e) && action !== 'delete') || (e === 'materials' && action === 'update');
  return true;
}

/* ── HTTP ── */
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.md': 'text/plain; charset=utf-8' };
const SEC = { 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'same-origin' };
function send(res, code, obj, headers = {}) { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...SEC, ...headers }); res.end(JSON.stringify(obj)); }
function body(req) {
  return new Promise((ok, fail) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > MAX_BODY) { fail(Object.assign(new Error('Завеликий запит'), { code: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { ok(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch { fail(Object.assign(new Error('Некоректні дані'), { code: 400 })); } });
  });
}
const clean = (o) => { const r = {}; for (const [k, v] of Object.entries(o || {})) if (!['id', 'createdAt', 'updatedAt', 'createdBy', '__proto__', 'constructor', 'prototype'].includes(k) && !k.startsWith('__')) r[k] = v; return r; };
function log(u, action, entity, r) { db.log.unshift({ at: Date.now(), who: u.name, action, entity, id: r.id, title: r.name || r.title || r.number || '' }); db.log.length = Math.min(db.log.length, 5000); }
function change(entity, id, record, deleted) { rev++; changes.push({ rev, entity, id, record, deleted }); if (changes.length > 5000) changes = changes.slice(-3000); persist(); return rev; }

async function api(req, res, p) {
  const ip = req.socket.remoteAddress;
  if (p === 'ping') return send(res, 200, { novacrm: true, version: 3 });
  if (p === 'login' && req.method === 'POST') {
    const f = fails.get(ip); if (f && f.until > Date.now()) return send(res, 429, { error: 'Забагато спроб' });
    const { login, password } = await body(req);
    const u = users.find((x) => x.login === String(login || '').toLowerCase() && x.active !== false);
    if (!u || !verify(String(password || ''), u)) {
      const n = (f?.n || 0) + 1; fails.set(ip, { n, until: n >= 5 ? Date.now() + 60e3 * Math.min(15, n - 4) : 0 });
      await new Promise((r) => setTimeout(r, 400)); return send(res, 401, { error: 'Неправильний логін або пароль' });
    }
    fails.delete(ip);
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, { uid: u.id, exp: Date.now() + SESSION_HOURS * 3600e3 });
    const secure = req.headers['x-forwarded-proto'] === 'https' || req.socket.encrypted ? '; Secure' : '';
    return send(res, 200, { user: publicUser(u) }, { 'Set-Cookie': `nsid=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_HOURS * 3600}${secure}` });
  }
  const u = getUser(req);
  if (!u) return send(res, 401, { error: 'Потрібен вхід' });
  // захист від CSRF: змінюючі запити лише з того самого сайту
  if (req.method !== 'GET' && req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return send(res, 403, { error: 'Заборонено' });

  if (p === 'logout') { const m = /nsid=([a-f0-9]{64})/.exec(req.headers.cookie || ''); if (m) sessions.delete(m[1]); return send(res, 200, { ok: true }, { 'Set-Cookie': 'nsid=; Path=/; Max-Age=0' }); }
  if (p === 'me') return send(res, 200, { user: publicUser(u) });
  if (p === 'db') return send(res, 200, { db: { meta: db.meta, settings: db.settings, data: db.data, log: db.log.slice(0, 500) }, rev });
  if (p.startsWith('sync')) {
    const since = +new URL('http://x/' + p).searchParams.get('since') || 0;
    const ch = changes.filter((c) => c.rev > since);
    if (since && changes.length && changes[0].rev > since + 1) return send(res, 200, { rev, changes: Object.entries(db.data).flatMap(([entity, l]) => l.map((r) => ({ entity, id: r.id, record: r }))), settings: db.settings });
    return send(res, 200, { rev, changes: ch, settings: db.settings });
  }
  if (p === 'settings' && req.method === 'PUT') { if (!can(u, 'settings')) return send(res, 403, { error: 'Немає прав' }); db.settings = { ...db.settings, ...clean(await body(req)) }; rev++; persist(); return send(res, 200, { settings: db.settings }); }
  if (p === 'password' && req.method === 'POST') { const b = await body(req); if (!verify(String(b.old || ''), u)) return send(res, 400, { error: 'Поточний пароль неправильний' }); if (String(b.new || '').length < 8) return send(res, 400, { error: 'Мінімум 8 символів' }); Object.assign(u, hash(b.new), { mustChange: false }); writeJson(USERS_FILE, users); return send(res, 200, { ok: true }); }
  if (p === 'import' && req.method === 'POST') { if (u.role !== 'admin') return send(res, 403, { error: 'Немає прав' }); const b = await body(req); if (!b.db?.data) return send(res, 400, { error: 'Порожній файл' }); fs.copyFileSync(DB_FILE, path.join(DATA, 'backups', `before-import-${Date.now()}.json`)); db = { meta: { ...b.db.meta, imported: new Date().toISOString() }, settings: b.db.settings || {}, data: b.db.data, log: b.db.log || [] }; rev += 1; changes = []; persist(); return send(res, 200, { ok: true }); }

  let m;
  if ((m = /^users(?:\/([\w-]+))?$/.exec(p))) {
    if (!can(u, 'users')) return send(res, 403, { error: 'Немає прав' });
    if (req.method === 'GET') return send(res, 200, { users: users.map(publicUser) });
    const b = req.method === 'DELETE' ? {} : await body(req);
    if (b.role && !ROLES.includes(b.role)) return send(res, 400, { error: 'Невідома роль' });
    if (req.method === 'POST') {
      const login = String(b.login || '').toLowerCase().trim();
      if (!/^[a-z0-9._-]{3,32}$/.test(login)) return send(res, 400, { error: 'Логін: 3–32 латинські літери, цифри, . _ -' });
      if (users.some((x) => x.login === login)) return send(res, 400, { error: 'Такий логін уже є' });
      if (String(b.password || '').length < 8) return send(res, 400, { error: 'Пароль — мінімум 8 символів' });
      users.push({ id: crypto.randomUUID(), login, name: String(b.name || login).slice(0, 80), role: b.role || 'worker', active: true, ...hash(b.password) });
    } else {
      const t = users.find((x) => x.id === m[1]); if (!t) return send(res, 404, { error: 'Немає користувача' });
      const admins = users.filter((x) => x.role === 'admin' && x.active !== false && x.id !== t.id).length;
      if (req.method === 'DELETE') { if (t.id === u.id) return send(res, 400, { error: 'Не можна видалити себе' }); if (t.role === 'admin' && !admins) return send(res, 400, { error: 'Має лишитися хоча б один адміністратор' }); users = users.filter((x) => x.id !== t.id); }
      else {
        if ((b.role && b.role !== 'admin' || b.active === false) && t.role === 'admin' && !admins) return send(res, 400, { error: 'Має лишитися хоча б один адміністратор' });
        if (b.name) t.name = String(b.name).slice(0, 80); if (b.role) t.role = b.role; if (typeof b.active === 'boolean') t.active = b.active;
        if (b.password) { if (String(b.password).length < 8) return send(res, 400, { error: 'Пароль — мінімум 8 символів' }); Object.assign(t, hash(b.password)); for (const [k, s] of sessions) if (s.uid === t.id) sessions.delete(k); }
        if (t.active === false) for (const [k, s] of sessions) if (s.uid === t.id) sessions.delete(k);
      }
    }
    writeJson(USERS_FILE, users); return send(res, 200, { ok: true });
  }
  if ((m = /^rec\/(\w+)(?:\/([\w-]+))?$/.exec(p))) {
    const [, e, id] = m;
    if (!ENTITIES.includes(e)) return send(res, 404, { error: 'Невідомий розділ' });
    const l = (db.data[e] ||= []);
    if (req.method === 'POST') {
      if (!can(u, 'create', e)) return send(res, 403, { error: 'Немає прав' });
      const r = { ...clean(await body(req)), id: crypto.randomUUID().slice(0, 13), createdAt: Date.now(), updatedAt: Date.now(), createdBy: u.id };
      l.push(r); log(u, 'create', e, r); const v = change(e, r.id, r); return send(res, 200, { record: r, rev: v });
    }
    const r = l.find((x) => x.id === id); if (!r) return send(res, 404, { error: 'Запис не знайдено' });
    if (req.method === 'PUT') {
      if (!can(u, 'update', e) && !(e === 'materials' && can(u, 'update', e))) return send(res, 403, { error: 'Немає прав' });
      Object.assign(r, clean(await body(req)), { updatedAt: Date.now() }); log(u, 'update', e, r); const v = change(e, r.id, r); return send(res, 200, { record: r, rev: v });
    }
    if (req.method === 'DELETE') {
      if (!can(u, 'delete', e)) return send(res, 403, { error: 'Немає прав' });
      l.splice(l.indexOf(r), 1); log(u, 'delete', e, r); change(e, id, null, true); return send(res, 200, { ok: true });
    }
  }
  return send(res, 404, { error: 'Не знайдено' });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const p = decodeURIComponent(url.pathname);
    if (p.startsWith('/api/')) return await api(req, res, p.slice(5) + (url.search || ''));
    // статичні файли програми (без доступу до data/ і server/)
    let f = path.normalize(path.join(ROOT, p === '/' ? 'NovaCRM.html' : p));
    const rel = path.relative(ROOT, f);
    if (rel.startsWith('..') || /^(data|server|tools|\.git)([\\/]|$)/.test(rel) || path.basename(f).startsWith('.')) { res.writeHead(404, SEC); return res.end('Not found'); }
    fs.stat(f, (err, st) => {
      if (err || !st.isFile()) { res.writeHead(404, SEC); return res.end('Not found'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache', ...SEC });
      fs.createReadStream(f).pipe(res);
    });
  } catch (e) { console.error(e); if (!res.headersSent) send(res, e.code >= 400 && e.code < 500 ? e.code : 500, { error: e.code ? e.message : 'Помилка сервера' }); }
});
server.listen(PORT, HOST, () => console.log(`NovaCRM працює: http://localhost:${PORT}  (дані: ${DATA})`));
const stop = () => { clearTimeout(saveTimer); db.meta.rev = rev; writeJson(DB_FILE, db); process.exit(0); };
process.on('SIGINT', stop); process.on('SIGTERM', stop);
