/* NovaCRM 3 — універсальна CRM: офлайн з флешки або на сервері */
import { ENTITIES, GROUPS, titleOf } from './schema.js';
import { OfflineStore, ServerStore, emptyDb, forgetFile, encryptDb } from './store.js';
import { demoDb } from './demo.js';
import { ic, $, $$, esc, num, money, fmtNum, today, fmtDate, daysTo, initials, toast, drawer, dialog, confirmBox, download, csv, readFile, MONTHS } from './ui.js';

const CFG = window.NOVA_CONFIG, PRESETS = window.NOVA_PRESETS, THEMES = window.NOVA_THEMES;
let S = null;              // сховище
let ME = { name: 'Адміністратор', role: 'admin' };
const ROLES = { admin: 'Адміністратор', manager: 'Керівник / менеджер', worker: 'Працівник', viewer: 'Лише перегляд' };

/* ── налаштування і назви ── */
const SET = () => S?.db?.settings || {};
const preset = () => PRESETS[SET().preset || CFG.preset] || PRESETS.construction;
const modules = () => SET().modules || preset().modules;
const terms = () => ({ ...preset().terms, ...(SET().terms || {}) });
const T = (e) => terms()[e] || ENTITIES[e].title;
const T1 = (e) => terms()[e + '.one'] || ENTITIES[e].one;
const FL = (e, f) => terms()[`${e}.${f.k}`] || f.l;
const company = () => SET().company || CFG.company;
const list = (e) => (S.db.data[e] ||= []);
const byId = (e, id) => list(e).find((r) => r.id === id);
const refName = (e, id) => { const r = id && byId(e, id); return r ? titleOf(e, r) : ''; };
const on = (e) => modules().includes(e);

/* ── права ── */
function can(action, e) {
  const r = ME.role;
  if (r === 'admin') return true;
  if (r === 'viewer') return action === 'view';
  if (action === 'settings') return false;
  if (r === 'worker') return action === 'view' || (['tasks', 'documents', 'expenses'].includes(e) && action !== 'delete') || (e === 'materials' && action === 'move');
  return true; // manager
}

/* ── тема ── */
function applyTheme() {
  const s = SET();
  const t = s.theme === 'custom' && s.customTheme ? s.customTheme : THEMES[s.theme || CFG.theme] || THEMES.classic;
  const r = document.documentElement.style;
  ['bg', 'surface', 'ink', 'brand', 'accent'].forEach((k) => r.setProperty('--' + k, t[k]));
  document.title = `${company()} — ${CFG.brand}`;
}
const logo = (sub) => `<span class="logo"><span class="logo-mark">${esc(initials(company()).slice(0, 1) || 'N')}</span><span><b>${esc(company())}</b><small>${esc(sub || CFG.brand)}</small></span></span>`;

/* ══════════ ВХІД ══════════ */
async function boot() {
  applyTheme();
  if (location.protocol.startsWith('http') && (await ServerStore.detect())) return serverGate();
  offlineGate();
}
function gateFrame(inner) {
  $('#root').innerHTML = `<div class="gate">
    <div class="gate-art">${logo('CRM для вашої компанії')}
      <div><h1>Клієнти, об’єкти, гроші й люди — в одному місці</h1><p>Працює з флешки без інтернету або на сервері компанії для всієї команди. Дані зашифровані.</p></div>
      <div class="gate-feats"><div><b>Угоди і воронка</b>від запиту до договору</div><div><b>Об’єкти</b>етапи, бюджет, витрати</div><div><b>Задачі і календар</b>для всієї команди</div><div><b>Звіти</b>прибутковість, борги, склад</div></div></div>
    <div class="gate-main"><div class="gate-box" id="gate">${inner}</div></div></div>`;
}
async function offlineGate(msg) {
  S = new OfflineStore();
  const remembered = await S.rememberedHandle();
  gateFrame(`${logo()}<h2>Вітаємо</h2><p>Оберіть, як почати роботу.</p>
    <div class="choice">
      ${remembered ? `<button data-a="last"><span class="ci">${ic('lock')}</span><span><b>Відкрити «${esc(remembered.name)}»</b><span>Остання база на цьому комп’ютері</span></span></button>` : ''}
      <button data-a="open"><span class="ci">${ic('folder')}</span><span><b>Відкрити файл бази</b><span>novacrm-data.json з флешки або диска</span></span></button>
      <button data-a="new"><span class="ci">${ic('newdb')}</span><span><b>Створити нову базу</b><span>Для вашої компанії, із паролем</span></span></button>
      <button data-a="demo"><span class="ci">${ic('play')}</span><span><b>Демо: будівельна компанія</b><span>Подивитися з прикладами, без збереження у файл</span></span></button>
    </div><p class="err">${esc(msg || '')}</p>
    ${!S.canFS ? '<p class="hint">Порада: відкривайте програму в Chrome або Edge — тоді зміни зберігаються в той самий файл автоматично.</p>' : ''}`);
  $$('[data-a]').forEach((b) => (b.onclick = async () => {
    const a = b.dataset.a;
    try {
      if (a === 'demo') { S.db = demoDb(); S.demo = true; S.save = async () => { S.dirty = false; S.emit(); }; S.touch = () => S.emit(); return enter(); }
      if (a === 'new') return newDbForm();
      const json = await S.openFile(a === 'last' ? remembered : null);
      passwordForm(json);
    } catch (e) { if (e.name !== 'AbortError' && e.message !== 'cancel') { console.error(e); $('.err').textContent = 'Не вдалося відкрити файл. Перевірте, що це база NovaCRM.'; } }
  }));
}
function passwordForm(json) {
  if (json?.format !== 'NovaCRM-encrypted') { $('.err').textContent = 'Це не файл бази NovaCRM 3.'; return; }
  let tries = 0;
  $('#gate').innerHTML = `${logo()}<h2>Введіть пароль</h2><p>База «${esc(S.fileName || 'novacrm-data.json')}» зашифрована.</p>
    <form id="pf" class="grid" style="gap:12px"><label class="f">Пароль<input class="field" id="pw" type="password" autocomplete="current-password" required></label>
    <button class="btn block">${ic('lock')}Відкрити</button><button type="button" class="btn ghost" id="back">Інша база</button></form><p class="err" id="perr"></p>`;
  $('#pw').onkeyup = (e) => { $('#perr').textContent = e.getModifierState?.('CapsLock') ? 'Увімкнено Caps Lock' : ''; };
  $('#back').onclick = () => { forgetFile(); offlineGate(); };
  $('#pf').onsubmit = async (e) => {
    e.preventDefault(); const btn = $('#pf .btn'); btn.disabled = true; btn.textContent = 'Перевіряємо…';
    try { await S.unlock(json, $('#pw').value); enter(); }
    catch (err) { tries++; $('#perr').textContent = err.message === 'password' ? 'Неправильний пароль.' : 'Файл пошкоджено або це інший формат.'; await new Promise((r) => setTimeout(r, Math.min(8000, 600 * tries))); btn.disabled = false; btn.innerHTML = ic('lock') + 'Відкрити'; }
  };
}
function newDbForm() {
  $('#gate').innerHTML = `${logo()}<h2>Нова база</h2><p>Пароль шифрує файл. Якщо його забути — відновити дані неможливо.</p>
    <form id="nf" class="grid" style="gap:12px">
      <label class="f">Назва компанії<input class="field" id="nc" required placeholder="ТОВ «Ваша компанія»"></label>
      <label class="f">Тип компанії<select class="field" id="np">${Object.entries(PRESETS).map(([k, p]) => `<option value="${k}">${esc(p.name)}</option>`).join('')}</select></label>
      <label class="f">Пароль (від 8 символів)<input class="field" id="n1" type="password" minlength="8" required autocomplete="new-password"></label>
      <label class="f">Повторіть пароль<input class="field" id="n2" type="password" required autocomplete="new-password"></label>
      <label style="display:flex;gap:8px;align-items:center;font-size:13px"><input type="checkbox" id="nd"> Додати приклади даних (будівельна компанія)</label>
      <button class="btn block">${ic('save')}Створити і зберегти файл</button><button type="button" class="btn ghost" id="back">Назад</button>
    </form><p class="err" id="nerr"></p>`;
  $('#back').onclick = () => offlineGate();
  $('#nf').onsubmit = async (e) => {
    e.preventDefault();
    if ($('#n1').value.length < 8) return ($('#nerr').textContent = 'Пароль має містити щонайменше 8 символів.');
    if ($('#n1').value !== $('#n2').value) return ($('#nerr').textContent = 'Паролі не збігаються.');
    const db = $('#nd').checked ? demoDb() : emptyDb();
    delete db.meta.demo;
    db.settings = { ...db.settings, company: $('#nc').value.trim(), preset: $('#np').value, theme: CFG.theme };
    try { await S.createDb($('#n1').value, db); enter(); }
    catch (err) { if (err.name !== 'AbortError') $('#nerr').textContent = 'Не вдалося створити файл: ' + err.message; }
  };
}
async function serverGate(msg) {
  S = new ServerStore();
  const u = await S.me();
  if (u) { ME = u; await S.load(); return enter(); }
  gateFrame(`${logo()}<h2>Вхід</h2><p>Сервер ${esc(location.host)}</p>
    <form id="lf" class="grid" style="gap:12px"><label class="f">Логін<input class="field" id="ll" autocomplete="username" required></label>
    <label class="f">Пароль<input class="field" id="lp" type="password" autocomplete="current-password" required></label><button class="btn block">Увійти</button></form><p class="err" id="lerr">${esc(msg || '')}</p>`);
  $('#lf').onsubmit = async (e) => {
    e.preventDefault();
    try { ME = await S.login($('#ll').value.trim(), $('#lp').value); await S.load(); enter(); }
    catch (err) { $('#lerr').textContent = err.status === 401 ? 'Неправильний логін або пароль.' : err.status === 429 ? 'Забагато спроб. Зачекайте хвилину.' : 'Помилка: ' + err.message; }
  };
}

/* ══════════ ОБОЛОНКА ══════════ */
function enter() {
  applyTheme();
  if (S.mode === 'offline') ME = { name: 'Адміністратор', role: 'admin' };
  $('#root').innerHTML = `<div class="shell"><aside class="side" id="side"></aside>
    <div class="main"><header class="top"><button class="ib menu-btn" id="menuBtn" aria-label="Меню">${ic('menu')}</button>
      <div class="search">${ic('search')}<input id="q" placeholder="Пошук: клієнт, об’єкт, задача, телефон…" autocomplete="off"><div class="search-res" id="qr" hidden></div></div>
      <div class="save-state" id="saveState"></div>
      ${S.mode === 'offline' && !S.demo ? `<button class="btn line sm" id="saveBtn">${ic('save')}<span>Зберегти</span></button><button class="btn ghost sm" id="lockBtn" title="Заблокувати">${ic('lock')}</button>` : ''}
      ${S.demo ? `<button class="btn sm" id="exitDemo">Вийти з демо</button>` : ''}
    </header><main class="content" id="view"></main></div></div>`;
  sidebar();
  $('#menuBtn').onclick = () => $('#side').classList.toggle('open');
  $('#saveBtn')?.addEventListener('click', () => S.save(true).then(() => toast('Збережено у файл')).catch((e) => toast('Не вдалося зберегти: ' + e.message)));
  $('#lockBtn')?.addEventListener('click', lock);
  $('#exitDemo')?.addEventListener('click', () => location.reload());
  globalSearch();
  S.on(() => { saveState(); scheduleRender(); });
  saveState();
  addEventListener('hashchange', route);
  if (S.mode === 'offline' && !S.demo) idleLock();
  addEventListener('beforeunload', (e) => { if (S.dirty && !S.demo) { e.preventDefault(); e.returnValue = ''; } });
  route();
}
function sidebar() {
  const overdue = list('tasks').filter((t) => t.status !== 'Готово' && t.due && t.due < today()).length;
  const cnt = { tasks: overdue };
  const link = (h, label, icon, n) => `<a href="#/${h}" data-r="${h}">${ic(icon)}${esc(label)}${n ? `<span class="cnt">${n}</span>` : ''}</a>`;
  $('#side').innerHTML = `<a class="logo" href="#/dashboard"><span class="logo-mark">${esc(initials(company()).slice(0, 1) || 'N')}</span><span><b>${esc(company())}</b><small>${esc(S.demo ? 'Демо-режим' : S.mode === 'server' ? 'Сервер' : 'Офлайн-база')}</small></span></a>
    <nav class="nav">${link('dashboard', 'Головна', 'home')}${link('calendar', 'Календар', 'cal')}
    ${GROUPS.map(([g, gt]) => { const items = modules().filter((e) => ENTITIES[e]?.group === g); return items.length ? `<div class="nav-g">${gt}</div>${items.map((e) => link('e/' + e, T(e), ENTITIES[e].icon, cnt[e])).join('')}` : ''; }).join('')}
    <div class="nav-g">Аналітика</div>${link('reports', 'Звіти', 'chart')}${link('log', 'Журнал змін', 'history')}${can('settings') ? link('settings', 'Налаштування', 'gear') : ''}</nav>
    <div class="side-foot"><div class="who"><span class="avatar">${esc(initials(ME.name))}</span><span><b>${esc(ME.name)}</b><br><span class="hint">${esc(ROLES[ME.role] || '')}</span></span></div>
    ${S.mode === 'server' ? `<button class="btn ghost sm" id="logout">Вийти</button>` : ''}</div>`;
  $('#logout')?.addEventListener('click', async () => { await S.logout(); location.reload(); });
  markNav();
}
function markNav() { const h = location.hash.slice(2) || 'dashboard'; $$('.nav a').forEach((a) => a.toggleAttribute('aria-current', h === a.dataset.r || h.startsWith(a.dataset.r + '/'))); }
function saveState() {
  const el = $('#saveState'); if (!el) return;
  if (S.demo) { el.innerHTML = '<i></i><span>Демо: зміни не зберігаються</span>'; return; }
  if (S.mode === 'server') { el.className = 'save-state'; el.innerHTML = '<i></i><span>Синхронізовано</span>'; return; }
  el.className = 'save-state' + (S.dirty ? ' dirty' : '');
  el.innerHTML = S.dirty ? `<i></i><span>${S.handle ? 'Зберігаємо…' : 'Є незбережені зміни'}</span>` : `<i></i><span>Збережено${S.savedAt ? ' о ' + S.savedAt.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }) : ''}</span>`;
}
async function lock() { if (S.dirty) await S.save(true).catch(() => {}); S.lock(); location.reload(); }
function idleLock() {
  let t; const min = SET().autoLock ?? CFG.autoLockMinutes;
  if (!min) return;
  const reset = () => { clearTimeout(t); t = setTimeout(lock, min * 60000); };
  ['mousemove', 'keydown', 'click', 'touchstart'].forEach((e) => addEventListener(e, reset, { passive: true }));
  reset();
}
let rq = false;
function scheduleRender() {
  if (rq) return; rq = true;
  requestAnimationFrame(() => { rq = false; if (document.querySelector('.modal')) return; const a = document.activeElement; if (a && a.closest('#view') && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) return; sidebar(); route(true); });
}
function globalSearch() {
  const q = $('#q'), r = $('#qr');
  q.oninput = () => {
    const s = q.value.trim().toLowerCase();
    if (s.length < 2) { r.hidden = true; return; }
    const hits = [];
    for (const e of modules()) for (const rec of list(e)) {
      const txt = ENTITIES[e].fields.filter((f) => ['text', 'phone', 'email', 'textarea'].includes(f.t)).map((f) => rec[f.k]).join(' ').toLowerCase();
      if (txt.includes(s)) hits.push([e, rec]);
      if (hits.length > 30) break;
    }
    r.innerHTML = hits.length ? hits.map(([e, rec]) => `<a href="#/e/${e}/${rec.id}"><b>${esc(titleOf(e, rec))}</b><small>${esc(T1(e))}</small></a>`).join('') : '<div class="empty">Нічого не знайдено</div>';
    r.hidden = false;
  };
  q.onblur = () => setTimeout(() => (r.hidden = true), 200);
  r.onclick = () => { q.value = ''; r.hidden = true; };
  addEventListener('keydown', (e) => { if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); } });
}

/* ══════════ МАРШРУТИ ══════════ */
function route(keepScroll) {
  const parts = (location.hash.slice(2) || 'dashboard').split('/');
  markNav(); $('#side')?.classList.remove('open');
  const v = $('#view');
  if (parts[0] === 'e' && ENTITIES[parts[1]]) parts[2] ? recordView(v, parts[1], parts[2]) : listView(v, parts[1]);
  else ({ dashboard, calendar, reports, log: logView, settings }[parts[0]] || dashboard)(v);
  if (keepScroll !== true) scrollTo(0, 0);
}

/* ══════════ ПОЛЯ ══════════ */
function pill(e, k, v) { const f = ENTITIES[e].fields.find((x) => x.k === k); const c = f?.color?.[v]; return v ? `<span class="pill ${c || 'mute'}">${esc(v)}</span>` : ''; }
function cell(e, f, r) {
  const v = r[f.k];
  switch (f.t) {
    case 'money': return v != null && v !== '' ? money(v) : '';
    case 'number': return v != null && v !== '' ? fmtNum(v) : '';
    case 'percent': return v != null && v !== '' ? `<div class="prog-l"><div class="prog"><i style="width:${Math.min(100, num(v))}%"></i></div>${num(v)}%</div>` : '';
    case 'date': return v ? `<span style="${f.k === 'due' && daysTo(v) < 0 && !['Готово', 'Виграно', 'Програно'].includes(r.status || r.stage) ? 'color:var(--accent);font-weight:600' : ''}">${fmtDate(v)}</span>` : '';
    case 'select': return f.color ? pill(e, f.k, v) : esc(v);
    case 'ref': return esc(refName(f.ref, v));
    case 'phone': return v ? `<a href="tel:${esc(String(v).replace(/[^\d+]/g, ''))}" data-stop>${esc(v)}</a>` : '';
    default: return esc(v);
  }
}
function input(e, f, r = {}) {
  const v = r[f.k] ?? '', id = 'f_' + f.k, L = esc(FL(e, f)) + (f.req ? ' *' : '');
  const wide = f.wide || f.t === 'textarea' ? ' wide' : '';
  switch (f.t) {
    case 'textarea': return `<label class="f wide">${L}<textarea class="field" id="${id}">${esc(v)}</textarea></label>`;
    case 'select': return `<label class="f${wide}">${L}<select class="field" id="${id}"><option value="">—</option>${f.o.map((o) => `<option${o === v ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select></label>`;
    case 'ref': return on(f.ref) ? `<label class="f${wide}">${L}<select class="field" id="${id}"><option value="">—</option>${[...list(f.ref)].sort((a, b) => titleOf(f.ref, a).localeCompare(titleOf(f.ref, b), 'uk')).map((o) => `<option value="${o.id}"${o.id === v ? ' selected' : ''}>${esc(titleOf(f.ref, o))}</option>`).join('')}</select></label>` : '';
    case 'date': return `<label class="f${wide}">${L}<input class="field" type="date" id="${id}" value="${esc(v)}"></label>`;
    case 'money': case 'number': case 'percent': return `<label class="f${wide}">${L}<input class="field" inputmode="decimal" id="${id}" value="${v === '' ? '' : esc(v)}"${f.t === 'percent' ? ' placeholder="0–100"' : ''}></label>`;
    case 'email': return `<label class="f${wide}">${L}<input class="field" type="email" id="${id}" value="${esc(v)}"></label>`;
    case 'phone': return `<label class="f${wide}">${L}<input class="field" type="tel" id="${id}" value="${esc(v)}" placeholder="+380"></label>`;
    case 'file': return `<label class="f wide">${L}<div class="file-box">${ic('clip')}<span id="fname" style="flex:1">${v?.name ? esc(v.name) : 'Файл не вибрано'}</span><input type="file" id="${id}" style="max-width:220px"></div><span class="hint">До 10 МБ. Файл зберігається всередині бази.</span></label>`;
    case 'stages': return `<div class="f wide" style="display:grid;gap:8px"><span style="font-size:12.5px;font-weight:600;color:var(--muted)">${L}</span><div class="stages" id="stages">${(r.stages || []).map(stageRow).join('')}</div><button type="button" class="btn line sm" id="addStage" style="justify-self:start">${ic('plus')}Етап</button></div>`;
    default: return `<label class="f${wide}">${L}<input class="field" id="${id}" value="${esc(v)}"></label>`;
  }
}
const STAGE_ST = ['Заплановано', 'В роботі', 'Готово'];
const stageRow = (s = {}) => `<div class="stage"><input class="field" data-s="name" placeholder="Назва етапу" value="${esc(s.name || '')}"><input class="field" type="date" data-s="start" value="${esc(s.start || '')}"><input class="field" type="date" data-s="end" value="${esc(s.end || '')}"><select class="field" data-s="status">${STAGE_ST.map((o) => `<option${o === s.status ? ' selected' : ''}>${o}</option>`).join('')}</select><input class="field" data-s="cost" inputmode="decimal" placeholder="Вартість" value="${s.cost ?? ''}"><button type="button" class="ib" data-sdel aria-label="Видалити етап">${ic('trash')}</button></div>`;

function recordForm(e, rec, defaults = {}) {
  const r = rec ? { ...rec } : { ...defaults };
  const fs = ENTITIES[e].fields;
  let fileVal = r.file;
  const d = drawer(rec ? `${T1(e)}: ${titleOf(e, rec)}` : `Новий запис: ${T1(e)}`, `<div class="form-grid">${fs.map((f) => input(e, f, r)).join('')}</div>`, {
    saveText: rec ? 'Зберегти' : 'Створити',
    onSave: async (m) => {
      const out = {};
      for (const f of fs) {
        if (f.t === 'stages') { out.stages = $$('.stage', m).map((row) => Object.fromEntries($$('[data-s]', row).map((i) => [i.dataset.s, i.dataset.s === 'cost' ? num(i.value) : i.value]))).filter((s) => s.name.trim()); continue; }
        if (f.t === 'file') { out.file = fileVal || null; continue; }
        const el = $('#f_' + f.k, m); if (!el) continue;
        let v = el.value.trim();
        if (['money', 'number', 'percent'].includes(f.t)) v = v === '' ? '' : num(v);
        if (f.t === 'percent' && v !== '') v = Math.max(0, Math.min(100, v));
        out[f.k] = v;
        if (f.req && (v === '' || v == null)) { el.focus(); toast(`Заповніть поле «${FL(e, f)}»`); return false; }
      }
      if (rec) await S.update(e, rec.id, out); else { const n = await S.create(e, out); if (defaults.__open !== false && location.hash.startsWith('#/e/' + e + '/') === false && !defaults.__stay) location.hash = `#/e/${e}/${n.id}`; }
      toast(rec ? 'Збережено' : 'Створено');
    },
  });
  const m = d.el;
  $('#addStage', m)?.addEventListener('click', () => $('#stages', m).insertAdjacentHTML('beforeend', stageRow()));
  $('#stages', m)?.addEventListener('click', (ev) => ev.target.closest('[data-sdel]')?.closest('.stage').remove());
  $('#f_file', m)?.addEventListener('change', async (ev) => {
    const f = ev.target.files[0]; if (!f) return;
    if (f.size > 10 * 1024 * 1024) { toast('Файл більший за 10 МБ'); ev.target.value = ''; return; }
    fileVal = { name: f.name, type: f.type, size: f.size, data: await readFile(f) }; $('#fname', m).textContent = f.name;
  });
}
async function delRecord(e, r) {
  if (!(await confirmBox(`Видалити «${titleOf(e, r)}»? Дію не можна скасувати.`, 'Видалити'))) return false;
  await S.remove(e, r.id); toast('Видалено'); return true;
}

/* ══════════ СПИСОК ══════════ */
const LS = { view: {}, filter: {}, sort: {} };
function listView(v, e) {
  const E = ENTITIES[e];
  if (!on(e)) { v.innerHTML = '<div class="empty"><b>Розділ вимкнено</b>Увімкніть його в налаштуваннях.</div>'; return; }
  const cols = E.fields.filter((f) => f.list && (f.t !== 'ref' || on(f.ref)));
  const st = E.fields.find((f) => f.k === (E.board || 'status')) || E.fields.find((f) => f.color);
  const flt = (LS.filter[e] ||= { q: '', s: '' });
  const mode = LS.view[e] || (E.board ? 'board' : 'table');
  let rows = list(e).filter((r) => (!flt.s || r[st?.k] === flt.s) && (!flt.q || JSON.stringify(Object.values(r).filter((x) => typeof x !== 'object')).toLowerCase().includes(flt.q.toLowerCase())));
  const sort = LS.sort[e] || { k: null, d: 1 };
  rows.sort((a, b) => { if (!sort.k) return (b.updatedAt || 0) - (a.updatedAt || 0); const f = E.fields.find((x) => x.k === sort.k); let x = a[sort.k], y = b[sort.k]; if (f.t === 'ref') { x = refName(f.ref, x); y = refName(f.ref, y); } if (['money', 'number', 'percent'].includes(f.t)) return (num(x) - num(y)) * sort.d; return String(x ?? '').localeCompare(String(y ?? ''), 'uk') * sort.d; });
  const sums = cols.filter((f) => f.t === 'money');
  v.innerHTML = `<div class="ph"><div><h1>${esc(T(e))}</h1><p>${rows.length} ${rows.length === list(e).length ? 'записів' : 'з ' + list(e).length}${sums[0] ? ' · ' + money(rows.reduce((s, r) => s + num(r[sums[0].k]), 0)) : ''}</p></div>
    <div class="acts">${E.board ? `<div class="seg"><button data-m="board" aria-pressed="${mode === 'board'}">${ic('board')}Дошка</button><button data-m="table" aria-pressed="${mode === 'table'}">${ic('list')}Таблиця</button></div>` : ''}
    <button class="btn line" id="exp">${ic('down')}CSV</button>${can('create', e) ? `<button class="btn" id="add">${ic('plus')}${esc(T1(e))}</button>` : ''}</div></div>
    <div class="toolbar"><input class="field grow" id="lq" placeholder="Фільтр у розділі" value="${esc(flt.q)}">
    ${st && mode === 'table' ? `<div class="chips">${['', ...st.o].map((o) => `<button class="chip" data-s="${esc(o)}" aria-pressed="${flt.s === o}">${o || 'Усі'} <b>${o ? list(e).filter((r) => r[st.k] === o).length : list(e).length}</b></button>`).join('')}</div>` : ''}</div>
    <div id="lb"></div>`;
  const lb = $('#lb');
  if (mode === 'board') board(lb, e, rows, E.fields.find((f) => f.k === E.board));
  else lb.innerHTML = rows.length ? `<div class="card tbl-wrap"><table class="tbl"><thead><tr>${cols.map((f) => `<th data-k="${f.k}" class="${['money', 'number'].includes(f.t) ? 'num' : ''}">${esc(FL(e, f))}${sort.k === f.k ? (sort.d > 0 ? ' ↑' : ' ↓') : ''}</th>`).join('')}${e === 'invoices' ? '<th>Стан</th>' : ''}</tr></thead>
      <tbody>${rows.map((r) => `<tr data-id="${r.id}">${cols.map((f, i) => `<td class="${i === 0 ? 'main-c' : ''} ${['money', 'number'].includes(f.t) ? 'num' : ''}">${cell(e, f, r)}</td>`).join('')}${e === 'invoices' ? `<td>${invState(r)}</td>` : ''}</tr>`).join('')}</tbody>
      ${sums.length ? `<tfoot><tr>${cols.map((f, i) => `<td class="${['money', 'number'].includes(f.t) ? 'num' : ''}">${i === 0 ? 'Разом' : f.t === 'money' ? money(rows.reduce((s, r) => s + num(r[f.k]), 0)) : ''}</td>`).join('')}${e === 'invoices' ? '<td></td>' : ''}</tr></tfoot>` : ''}</table></div>`
    : `<div class="card empty"><b>${list(e).length ? 'Нічого не знайдено' : 'Поки порожньо'}</b>${list(e).length ? 'Змініть фільтр.' : `Додайте перший запис у розділ «${esc(T(e))}».`}</div>`;
  $$('tbody tr', lb).forEach((tr) => (tr.onclick = (ev) => { if (ev.target.closest('[data-stop]')) return; location.hash = `#/e/${e}/${tr.dataset.id}`; }));
  $$('th[data-k]', lb).forEach((th) => (th.onclick = () => { LS.sort[e] = { k: th.dataset.k, d: sort.k === th.dataset.k ? -sort.d : 1 }; listView(v, e); }));
  $$('[data-m]', v).forEach((b) => (b.onclick = () => { LS.view[e] = b.dataset.m; listView(v, e); }));
  $$('[data-s]', v).forEach((b) => (b.onclick = () => { flt.s = b.dataset.s; listView(v, e); }));
  let t; $('#lq').oninput = (ev) => { flt.q = ev.target.value; clearTimeout(t); t = setTimeout(() => { listView(v, e); const q = $('#lq'); q.focus(); q.setSelectionRange(q.value.length, q.value.length); }, 250); };
  $('#add')?.addEventListener('click', () => recordForm(e, null, defaultsFor(e)));
  $('#exp').onclick = () => download(`${T(e)}-${today()}.csv`, csv([cols.map((f) => FL(e, f)), ...rows.map((r) => cols.map((f) => (f.t === 'ref' ? refName(f.ref, r[f.k]) : r[f.k] ?? '')))]), 'text/csv');
}
const defaultsFor = (e) => ({ deals: { stage: 'Новий запит' }, tasks: { status: 'До виконання', priority: 'Звичайний', due: today() }, objects: { status: 'Планування' }, invoices: { date: today(), kind: 'Рахунок' }, expenses: { date: today() }, clients: { status: 'Потенційний' }, employees: { status: 'Працює' }, equipment: { status: 'Вільна' }, documents: { date: today() } }[e] || {});
function board(el, e, rows, f) {
  const amount = ENTITIES[e].fields.find((x) => x.t === 'money');
  el.innerHTML = `<div class="board">${f.o.map((o) => { const l = rows.filter((r) => r[f.k] === o); return `<div class="col" data-col="${esc(o)}"><div class="col-h"><span>${esc(o)} · ${l.length}</span>${amount ? `<small>${money(l.reduce((s, r) => s + num(r[amount.k]), 0))}</small>` : ''}</div>
    ${l.map((r) => `<div class="bcard" draggable="${can('edit', e)}" data-id="${r.id}"><b>${esc(titleOf(e, r))}</b><div class="m"><span>${esc(refName('clients', r.client) || refName('employees', r.assignee) || refName('objects', r.object))}</span>${amount && r[amount.k] ? `<span class="amt">${money(r[amount.k])}</span>` : r.due ? `<span style="${daysTo(r.due) < 0 && o !== 'Готово' ? 'color:var(--accent)' : ''}">${fmtDate(r.due)}</span>` : ''}</div>${r.priority && ['Високий', 'Терміново'].includes(r.priority) ? `<div style="margin-top:6px">${pill(e, 'priority', r.priority)}</div>` : ''}</div>`).join('')}
    </div>`; }).join('')}</div><p class="hint">Перетягуйте картки між колонками, щоб змінити ${esc(FL(e, f).toLowerCase())}.</p>`;
  $$('.bcard', el).forEach((c) => {
    c.onclick = () => (location.hash = `#/e/${e}/${c.dataset.id}`);
    c.ondragstart = (ev) => { ev.dataTransfer.setData('text/plain', c.dataset.id); c.classList.add('drag'); };
    c.ondragend = () => c.classList.remove('drag');
  });
  $$('.col', el).forEach((col) => {
    col.ondragover = (ev) => { ev.preventDefault(); col.classList.add('over'); };
    col.ondragleave = () => col.classList.remove('over');
    col.ondrop = async (ev) => { ev.preventDefault(); col.classList.remove('over'); const id = ev.dataTransfer.getData('text/plain'); const r = byId(e, id); if (!r || r[f.k] === col.dataset.col) return; await S.update(e, id, { [f.k]: col.dataset.col, ...(e === 'deals' && col.dataset.col === 'Виграно' ? { probability: 100 } : {}) }); if (e === 'deals' && col.dataset.col === 'Виграно') wonDeal(byId(e, id)); };
  });
}
function invState(r) {
  const a = num(r.amount), p = num(r.paid);
  if (r.kind === 'Договір' || r.kind === 'Кошторис') return '<span class="pill mute">—</span>';
  if (a && p >= a) return '<span class="pill ok">Оплачено</span>';
  if (r.due && daysTo(r.due) < 0) return `<span class="pill bad">Прострочено ${-daysTo(r.due)} дн.</span>`;
  return p > 0 ? '<span class="pill warn">Частково</span>' : '<span class="pill info">Очікує оплати</span>';
}
async function wonDeal(d) {
  if (d.object || !on('objects')) return;
  if (await confirmBox(`Угода «${d.title}» виграна. Створити ${T1('objects').toLowerCase()} з цієї угоди?`, 'Створити', false)) {
    const o = await S.create('objects', { name: d.title, client: d.client, budget: d.amount, status: 'Планування', progress: 0 });
    await S.update('deals', d.id, { object: o.id }); location.hash = `#/e/objects/${o.id}`;
  }
}

/* ══════════ ЗАПИС ══════════ */
function recordView(v, e, id) {
  const r = byId(e, id);
  if (!r) { v.innerHTML = `<div class="card empty"><b>Запис не знайдено</b><a href="#/e/${e}">До розділу «${esc(T(e))}»</a></div>`; return; }
  const E = ENTITIES[e];
  const status = E.fields.find((f) => f.color && r[f.k]);
  const props = E.fields.filter((f) => !['stages', 'file'].includes(f.t) && (f.t !== 'ref' || on(f.ref)) && r[f.k] !== '' && r[f.k] != null);
  const rel = related(e, r);
  v.innerHTML = `<div class="crumbs"><a href="#/e/${e}">${esc(T(e))}</a> / ${esc(titleOf(e, r))}</div>
    <div class="rec-head"><div><h1>${esc(titleOf(e, r))}</h1><div class="chips">${status ? pill(e, status.k, r[status.k]) : ''}${e === 'invoices' ? invState(r) : ''}${r.priority ? pill(e, 'priority', r.priority) : ''}</div></div>
    <div class="acts" style="display:flex;gap:8px;flex-wrap:wrap">${extraActions(e, r)}${can('edit', e) ? `<button class="btn" id="edit">${ic('edit')}Редагувати</button>` : ''}${can('delete', e) ? `<button class="btn danger" id="del">${ic('trash')}</button>` : ''}</div></div>
    <div class="grid g-side">
      <div class="grid">
        ${e === 'objects' ? objectFinance(r) : ''}
        <div class="card"><div class="card-h"><h3>Дані</h3><span class="hint">Оновлено ${r.updatedAt ? new Date(r.updatedAt).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' }) : ''}</span></div><div class="card-b"><div class="props">
          ${props.map((f) => `<div class="prop${f.wide || f.t === 'textarea' ? ' wide' : ''}"><span>${esc(FL(e, f))}</span><b class="${f.t === 'textarea' ? 'pre' : ''}">${f.t === 'textarea' ? esc(r[f.k]) : f.t === 'ref' ? `<a href="#/e/${f.ref}/${r[f.k]}">${esc(refName(f.ref, r[f.k]))}</a>` : f.t === 'email' ? `<a href="mailto:${esc(r[f.k])}">${esc(r[f.k])}</a>` : cell(e, f, r)}</b></div>`).join('') || '<p class="hint">Поля ще не заповнені.</p>'}
          ${r.file?.data ? `<div class="prop wide"><span>Файл</span><b><a href="${r.file.data}" download="${esc(r.file.name)}">${ic('down')} ${esc(r.file.name)}</a> <span class="hint">(${Math.round(r.file.size / 1024)} КБ)</span></b></div>` : ''}
        </div></div></div>
        ${e === 'objects' && r.stages?.length ? `<div class="card"><div class="card-h"><h3>${esc(FL(e, { k: 'stages', l: 'Етапи робіт' }))}</h3><span class="hint">${r.stages.filter((s) => s.status === 'Готово').length} з ${r.stages.length} готово</span></div><div class="card-b">${r.stages.map((s) => `<div class="stage-v"><span class="dot ${s.status === 'Готово' ? 'done' : s.status === 'В роботі' ? 'run' : ''}"></span><div><b>${esc(s.name)}</b><br><span class="hint">${fmtDate(s.start)} — ${fmtDate(s.end)}${s.status !== 'Готово' && s.end && daysTo(s.end) < 0 ? ' · <span style="color:var(--accent)">прострочено</span>' : ''}</span></div><span>${s.cost ? money(s.cost) : ''}</span></div>`).join('')}</div></div>` : ''}
      </div>
      <div class="grid">${rel.map(([re, title, items, defaults]) => `<div class="card"><div class="card-h"><h3>${esc(title)} · ${items.length}</h3>${can('create', re) ? `<button class="ib" data-add="${re}" data-def='${esc(JSON.stringify(defaults))}' aria-label="Додати">${ic('plus')}</button>` : ''}</div><div class="card-b mini-list">${items.length ? items.slice(0, 8).map((x) => `<a href="#/e/${re}/${x.id}"><span><b>${esc(titleOf(re, x))}</b><br><small>${esc(miniMeta(re, x))}</small></span>${miniRight(re, x)}</a>`).join('') : '<span class="hint">Немає записів</span>'}</div></div>`).join('')}
        <div class="card"><div class="card-h"><h3>Історія</h3></div><div class="card-b">${(S.db.log || []).filter((l) => l.id === r.id).slice(0, 6).map((l) => `<div class="log-i"><span class="avatar" style="width:26px;height:26px;font-size:11px">${esc(initials(l.who))}</span><div>${esc(l.who)} ${l.action === 'create' ? 'створив(ла)' : 'змінив(ла)'}<br><small>${new Date(l.at).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' })}</small></div></div>`).join('') || '<span class="hint">Записів немає</span>'}</div></div>
      </div></div>`;
  $('#edit')?.addEventListener('click', () => recordForm(e, r));
  $('#del')?.addEventListener('click', async () => { if (await delRecord(e, r)) location.hash = '#/e/' + e; });
  $$('[data-add]', v).forEach((b) => (b.onclick = () => recordForm(b.dataset.add, null, { ...defaultsFor(b.dataset.add), ...JSON.parse(b.dataset.def), __stay: true })));
  bindExtra(e, r);
}
function related(e, r) {
  const out = [];
  const add = (re, title, pred, defaults = {}) => on(re) && out.push([re, title, list(re).filter(pred).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)), defaults]);
  if (e === 'clients') { add('deals', T('deals'), (x) => x.client === r.id, { client: r.id }); add('objects', T('objects'), (x) => x.client === r.id, { client: r.id }); add('invoices', T('invoices'), (x) => x.client === r.id, { client: r.id }); add('tasks', T('tasks'), (x) => x.client === r.id, { client: r.id }); }
  if (e === 'objects') { add('tasks', T('tasks'), (x) => x.object === r.id, { object: r.id }); add('invoices', T('invoices'), (x) => x.object === r.id, { object: r.id, client: r.client }); add('expenses', T('expenses'), (x) => x.object === r.id, { object: r.id }); add('equipment', T('equipment'), (x) => x.object === r.id); add('documents', T('documents'), (x) => x.object === r.id, { object: r.id }); }
  if (e === 'employees') { add('tasks', 'Задачі працівника', (x) => x.assignee === r.id && x.status !== 'Готово', { assignee: r.id }); add('objects', 'Веде об’єкти', (x) => x.foreman === r.id); add('deals', 'Угоди', (x) => x.manager === r.id, { manager: r.id }); }
  if (e === 'deals') { add('tasks', T('tasks'), (x) => x.client && x.client === r.client, { client: r.client }); }
  if (e === 'suppliers') { add('expenses', 'Оплати партнеру', (x) => x.supplier === r.id, { supplier: r.id }); add('materials', 'Матеріали', (x) => x.supplier === r.id, { supplier: r.id }); }
  if (e === 'materials') { add('expenses', 'Закупівлі', (x) => x.material === r.id); }
  return out;
}
function miniMeta(e, x) {
  if (e === 'tasks') return [x.status, x.due && fmtDate(x.due), refName('employees', x.assignee)].filter(Boolean).join(' · ');
  if (e === 'deals') return [x.stage, x.due && fmtDate(x.due)].filter(Boolean).join(' · ');
  if (e === 'objects') return [x.status, x.progress != null && x.progress !== '' ? x.progress + '%' : ''].filter(Boolean).join(' · ');
  if (e === 'invoices') return [x.kind, fmtDate(x.date)].filter(Boolean).join(' · ');
  if (e === 'expenses') return [x.category, fmtDate(x.date)].filter(Boolean).join(' · ');
  return [x.kind, x.status, x.position, fmtDate(x.date)].filter(Boolean).join(' · ');
}
const miniRight = (e, x) => (x.amount ? `<b>${money(x.amount)}</b>` : e === 'invoices' ? invState(x) : '');
function objectFinance(o) {
  const ex = list('expenses').filter((x) => x.object === o.id).reduce((s, x) => s + num(x.amount), 0);
  const inv = list('invoices').filter((x) => x.object === o.id && ['Рахунок', 'Акт виконаних робіт'].includes(x.kind));
  const billed = inv.reduce((s, x) => s + num(x.amount), 0), paid = inv.reduce((s, x) => s + num(x.paid), 0);
  const budget = num(o.budget), use = budget ? ex / budget * 100 : 0;
  return `<div class="grid g4"><div class="card kpi"><span>${ic('wallet')}Бюджет</span><b>${money(budget)}</b><small>готовність ${num(o.progress)}%</small></div>
    <div class="card kpi${use > num(o.progress) + 15 ? ' alert' : ''}"><span>${ic('down')}Витрачено</span><b>${money(ex)}</b><small>${Math.round(use)}% бюджету</small></div>
    <div class="card kpi"><span>${ic('receipt')}Виставлено</span><b>${money(billed)}</b><small>оплачено ${money(paid)}</small></div>
    <div class="card kpi${paid - ex < 0 ? ' alert' : ''}"><span>${ic('money')}Баланс</span><b>${money(paid - ex)}</b><small>оплачено мінус витрати</small></div></div>`;
}
function extraActions(e, r) {
  if (e === 'invoices' && can('edit', e) && num(r.paid) < num(r.amount) && ['Рахунок', 'Акт виконаних робіт'].includes(r.kind)) return `<button class="btn red" id="pay">${ic('money')}Внести оплату</button>`;
  if (e === 'materials' && can('move', e)) return `<button class="btn line" id="mIn">${ic('down')}Прихід</button><button class="btn line" id="mOut">${ic('up')}Списати</button>`;
  if (e === 'deals' && r.stage === 'Виграно' && !r.object && on('objects') && can('create', 'objects')) return `<button class="btn red" id="toObj">${ic('building')}Створити ${esc(T1('objects').toLowerCase())}</button>`;
  if (e === 'tasks' && r.status !== 'Готово' && can('edit', e)) return `<button class="btn line" id="done">${ic('check')}Виконано</button>`;
  return '';
}
function bindExtra(e, r) {
  $('#pay')?.addEventListener('click', () => dialog(`<h3>Оплата за «${esc(r.number)}»</h3><p class="hint" style="margin:0">Залишок до оплати: ${money(num(r.amount) - num(r.paid))}</p><label class="f">Сума<input class="field" id="pa" inputmode="decimal" value="${num(r.amount) - num(r.paid)}"></label><div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn line" data-x>Скасувати</button><button class="btn" id="pok">Зарахувати</button></div>`, (box, close) => {
    $('#pok', box).onclick = async () => { const a = num($('#pa', box).value); if (a <= 0) return; await S.update('invoices', r.id, { paid: num(r.paid) + a }); close(); toast(`Зараховано ${money(a)}`); };
  }));
  const move = (dir) => dialog(`<h3>${dir > 0 ? 'Прихід' : 'Списання'}: ${esc(r.name)}</h3><label class="f">Кількість, ${esc(r.unit || '')}<input class="field" id="mq" inputmode="decimal"></label>
    ${dir < 0 && on('objects') ? `<label class="f">На ${esc(T1('objects').toLowerCase())}<select class="field" id="mo"><option value="">—</option>${list('objects').filter((o) => o.status !== 'Здано').map((o) => `<option value="${o.id}">${esc(o.name)}</option>`).join('')}</select></label>` : ''}
    ${dir > 0 ? `<label class="f">Ціна за од.<input class="field" id="mp" inputmode="decimal" value="${r.price || ''}"></label><label style="display:flex;gap:8px;font-size:13px"><input type="checkbox" id="mx" checked> Записати закупівлю у витрати</label>` : ''}
    <div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn line" data-x>Скасувати</button><button class="btn" id="mok">Зберегти</button></div>`, (box, close) => {
    $('#mok', box).onclick = async () => {
      const q = num($('#mq', box).value); if (q <= 0) return;
      if (dir < 0 && q > num(r.qty)) { toast('На складі менше, ніж ви списуєте'); return; }
      const patch = { qty: Math.round((num(r.qty) + dir * q) * 1000) / 1000 };
      if (dir > 0 && $('#mp', box).value) patch.price = num($('#mp', box).value);
      await S.update('materials', r.id, patch);
      if (dir > 0 && $('#mx', box)?.checked && on('expenses')) await S.create('expenses', { date: today(), category: 'Матеріали', amount: Math.round(q * num(patch.price || r.price)), supplier: r.supplier, material: r.id, notes: `${r.name}: ${q} ${r.unit || ''}` });
      if (dir < 0 && $('#mo', box)?.value) await S.create('expenses', { date: today(), category: 'Матеріали', amount: Math.round(q * num(r.price)), object: $('#mo', box).value, material: r.id, notes: `Списано зі складу: ${r.name}, ${q} ${r.unit || ''}` });
      close(); toast('Склад оновлено');
    };
  });
  $('#mIn')?.addEventListener('click', () => move(1));
  $('#mOut')?.addEventListener('click', () => move(-1));
  $('#toObj')?.addEventListener('click', () => wonDeal(r));
  $('#done')?.addEventListener('click', async () => { await S.update('tasks', r.id, { status: 'Готово' }); toast('Задачу виконано'); });
}

/* ══════════ ГОЛОВНА ══════════ */
function dashboard(v) {
  const t = today(), m = t.slice(0, 7);
  const objs = list('objects'), active = objs.filter((o) => o.status === 'В роботі');
  const openDeals = list('deals').filter((d) => !['Виграно', 'Програно'].includes(d.stage));
  const pipeline = openDeals.reduce((s, d) => s + num(d.amount) * (d.probability === '' || d.probability == null ? 0.5 : num(d.probability) / 100), 0);
  const inv = list('invoices').filter((x) => ['Рахунок', 'Акт виконаних робіт'].includes(x.kind));
  const debt = inv.reduce((s, x) => s + Math.max(0, num(x.amount) - num(x.paid)), 0);
  const overdueInv = inv.filter((x) => num(x.paid) < num(x.amount) && x.due && x.due < t);
  const myTasks = list('tasks').filter((x) => x.status !== 'Готово').sort((a, b) => String(a.due || '9').localeCompare(String(b.due || '9')));
  const overdue = myTasks.filter((x) => x.due && x.due < t);
  const exM = list('expenses').filter((x) => String(x.date).startsWith(m)).reduce((s, x) => s + num(x.amount), 0);
  const low = list('materials').filter((x) => x.min !== '' && num(x.qty) < num(x.min));
  const service = list('equipment').filter((x) => x.service && daysTo(x.service) <= 7 && x.status !== 'Списано');
  const hello = new Date().getHours() < 12 ? 'Доброго ранку' : new Date().getHours() < 18 ? 'Добрий день' : 'Добрий вечір';
  v.innerHTML = `<div class="ph"><div><h1>${hello}, ${esc(ME.name.split(' ')[0])}</h1><p>${new Date().toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · ${esc(company())}</p></div>
    <div class="acts">${on('tasks') && can('create', 'tasks') ? `<button class="btn line" data-q="tasks">${ic('plus')}Задача</button>` : ''}${on('deals') && can('create', 'deals') ? `<button class="btn line" data-q="deals">${ic('plus')}Угода</button>` : ''}${on('expenses') && can('create', 'expenses') ? `<button class="btn" data-q="expenses">${ic('plus')}Витрата</button>` : ''}</div></div>
    <div class="grid g4">
      ${on('objects') ? `<a class="card kpi" href="#/e/objects" style="text-decoration:none;color:inherit"><span>${ic('building')}${esc(T('objects'))} в роботі</span><b>${active.length}</b><small>усього ${objs.length}</small></a>` : ''}
      ${on('deals') ? `<a class="card kpi" href="#/e/deals" style="text-decoration:none;color:inherit"><span>${ic('funnel')}Воронка (з урахуванням імовірності)</span><b>${money(pipeline)}</b><small>${openDeals.length} відкритих угод</small></a>` : ''}
      ${on('invoices') ? `<a class="card kpi${overdueInv.length ? ' alert' : ''}" href="#/reports" style="text-decoration:none;color:inherit"><span>${ic('receipt')}Нам винні</span><b>${money(debt)}</b><small>${overdueInv.length ? `прострочено ${overdueInv.length} рах.` : 'без прострочень'}</small></a>` : ''}
      ${on('expenses') ? `<a class="card kpi" href="#/e/expenses" style="text-decoration:none;color:inherit"><span>${ic('wallet')}Витрати за ${MONTHS[+m.slice(5) - 1].toLowerCase()}</span><b>${money(exM)}</b><small>${list('expenses').filter((x) => String(x.date).startsWith(m)).length} записів</small></a>` : ''}
    </div>
    <div class="grid g-side" style="margin-top:16px">
      <div class="grid">
        ${on('objects') ? `<div class="card"><div class="card-h"><h3>${esc(T('objects'))} в роботі</h3><a href="#/e/objects" class="hint">усі</a></div><div class="card-b">${active.length ? `<div class="bars">${active.map((o) => { const ex = list('expenses').filter((x) => x.object === o.id).reduce((s, x) => s + num(x.amount), 0); const late = o.end && daysTo(o.end) < 0; return `<a href="#/e/objects/${o.id}" class="obj-bar"><span><b>${esc(o.name)}</b><br><span class="hint">${o.end ? `здача ${fmtDate(o.end)}${late ? ' · прострочено' : ''}` : ''}</span></span><span class="prog-l"><span class="prog" style="flex:1"><i style="width:${num(o.progress)}%"></i></span>${num(o.progress)}%</span><b>${money(ex)} <span class="hint">/ ${money(o.budget)}</span></b></a>`; }).join('')}</div>` : '<span class="hint">Немає об’єктів у роботі</span>'}</div></div>` : ''}
        ${on('tasks') ? `<div class="card"><div class="card-h"><h3>Задачі ${overdue.length ? `<span class="pill bad">${overdue.length} прострочено</span>` : ''}</h3><a href="#/e/tasks" class="hint">усі</a></div><div class="card-b mini-list">${myTasks.slice(0, 7).map((x) => `<a href="#/e/tasks/${x.id}"><span><b>${esc(x.title)}</b><br><small>${esc([refName('employees', x.assignee), refName('objects', x.object)].filter(Boolean).join(' · '))}</small></span><span style="${x.due && x.due < t ? 'color:var(--accent);font-weight:600' : 'color:var(--muted)'};font-size:12.5px;white-space:nowrap">${x.due ? (x.due === t ? 'сьогодні' : fmtDate(x.due)) : ''}</span></a>`).join('') || '<span class="hint">Усі задачі виконано</span>'}</div></div>` : ''}
      </div>
      <div class="grid">
        ${on('deals') ? `<div class="card"><div class="card-h"><h3>Угоди за етапами</h3></div><div class="card-b funnel">${ENTITIES.deals.fields.find((f) => f.k === 'stage').o.filter((s) => s !== 'Програно').map((s) => { const l = list('deals').filter((d) => d.stage === s); const mx = Math.max(1, ...ENTITIES.deals.fields.find((f) => f.k === 'stage').o.map((o) => list('deals').filter((d) => d.stage === o).length)); return `<div class="fun" style="grid-template-columns:120px 1fr"><span class="hint">${esc(s)}</span><div class="${s === 'Виграно' ? 'red' : ''}" style="width:${Math.max(12, l.length / mx * 100)}%">${l.length} · ${money(l.reduce((a, d) => a + num(d.amount), 0))}</div></div>`; }).join('')}</div></div>` : ''}
        ${overdueInv.length || low.length || service.length ? `<div class="card"><div class="card-h"><h3>${ic('alert')} Потребує уваги</h3></div><div class="card-b mini-list">
          ${overdueInv.map((x) => `<a href="#/e/invoices/${x.id}"><span><b>${esc(x.number)}</b><br><small>${esc(refName('clients', x.client))}</small></span><span class="pill bad">${money(num(x.amount) - num(x.paid))}</span></a>`).join('')}
          ${low.map((x) => `<a href="#/e/materials/${x.id}"><span><b>${esc(x.name)}</b><br><small>залишок ${fmtNum(x.qty)} ${esc(x.unit || '')}, мінімум ${fmtNum(x.min)}</small></span><span class="pill warn">Замовити</span></a>`).join('')}
          ${service.map((x) => `<a href="#/e/equipment/${x.id}"><span><b>${esc(x.name)}</b><br><small>ТО ${fmtDate(x.service)}</small></span><span class="pill ${daysTo(x.service) < 0 ? 'bad' : 'warn'}">ТО</span></a>`).join('')}
        </div></div>` : ''}
        <div class="card"><div class="card-h"><h3>Останні зміни</h3><a href="#/log" class="hint">журнал</a></div><div class="card-b">${(S.db.log || []).slice(0, 5).map((l) => `<div class="log-i"><span class="avatar" style="width:26px;height:26px;font-size:11px">${esc(initials(l.who))}</span><div>${esc(l.who)} · ${l.action === 'create' ? 'додано' : l.action === 'delete' ? 'видалено' : 'змінено'} ${esc(ENTITIES[l.entity] ? T1(l.entity).toLowerCase() : '')} «${esc(l.title)}»<br><small>${new Date(l.at).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' })}</small></div></div>`).join('') || '<span class="hint">Змін ще не було</span>'}</div></div>
      </div></div>`;
  $$('[data-q]', v).forEach((b) => (b.onclick = () => recordForm(b.dataset.q, null, { ...defaultsFor(b.dataset.q), __stay: true })));
}

/* ══════════ КАЛЕНДАР ══════════ */
let calM = today().slice(0, 7);
function calendar(v) {
  const [y, m] = calM.split('-').map(Number);
  const first = (new Date(y, m - 1, 1).getDay() + 6) % 7, days = new Date(y, m, 0).getDate();
  const ev = {};
  const push = (d, html) => d && String(d).startsWith(calM) && (ev[+String(d).slice(8, 10)] ||= []).push(html);
  if (on('tasks')) list('tasks').forEach((x) => push(x.due, `<a class="ev task${x.status === 'Готово' ? ' done' : ''}" href="#/e/tasks/${x.id}" title="${esc(x.title)}">${esc(x.title)}</a>`));
  if (on('deals')) list('deals').filter((x) => !['Виграно', 'Програно'].includes(x.stage)).forEach((x) => push(x.due, `<a class="ev" href="#/e/deals/${x.id}">${esc(x.title)}</a>`));
  if (on('invoices')) list('invoices').filter((x) => num(x.paid) < num(x.amount)).forEach((x) => push(x.due, `<a class="ev money" href="#/e/invoices/${x.id}">Оплата ${esc(x.number)}</a>`));
  if (on('objects')) list('objects').forEach((o) => { push(o.end, `<a class="ev" href="#/e/objects/${o.id}">Здача: ${esc(o.name)}</a>`); (o.stages || []).forEach((s) => push(s.end, `<a class="ev${s.status === 'Готово' ? ' done' : ''}" href="#/e/objects/${o.id}">${esc(s.name)}</a>`)); });
  if (on('equipment')) list('equipment').forEach((x) => push(x.service, `<a class="ev money" href="#/e/equipment/${x.id}">ТО: ${esc(x.name)}</a>`));
  const t = today();
  v.innerHTML = `<div class="ph"><div><h1>Календар</h1><p>Задачі, оплати, етапи робіт, угоди і техобслуговування</p></div><div class="acts"><button class="ib" data-c="-1">${ic('left')}</button><b style="min-width:140px;text-align:center;align-self:center">${MONTHS[m - 1]} ${y}</b><button class="ib" data-c="1">${ic('right')}</button><button class="btn line sm" data-c="0">Сьогодні</button></div></div>
    <div class="cal">${['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((d) => `<div class="dn">${d}</div>`).join('')}${'<div class="day off"></div>'.repeat(first)}
    ${Array.from({ length: days }, (_, i) => `<div class="day${`${calM}-${String(i + 1).padStart(2, '0')}` === t ? ' today' : ''}"><span class="n">${i + 1}</span>${(ev[i + 1] || []).slice(0, 4).join('')}${(ev[i + 1] || []).length > 4 ? `<span class="hint">ще ${ev[i + 1].length - 4}</span>` : ''}</div>`).join('')}
    ${'<div class="day off"></div>'.repeat((7 - ((first + days) % 7)) % 7)}</div>`;
  $$('[data-c]', v).forEach((b) => (b.onclick = () => { if (b.dataset.c === '0') calM = today().slice(0, 7); else { const d = new Date(y, m - 1 + +b.dataset.c, 1); calM = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; } calendar(v); }));
}

/* ══════════ ЗВІТИ ══════════ */
let rep = 'profit', repFrom = today().slice(0, 4) + '-01-01', repTo = today();
function reports(v) {
  const R = {
    profit: ['Прибутковість об’єктів', () => { const rows = list('objects').map((o) => { const ex = list('expenses').filter((x) => x.object === o.id).reduce((s, x) => s + num(x.amount), 0); const inv = list('invoices').filter((x) => x.object === o.id && ['Рахунок', 'Акт виконаних робіт'].includes(x.kind)); const b = inv.reduce((s, x) => s + num(x.amount), 0), p = inv.reduce((s, x) => s + num(x.paid), 0); return [o.name, o.status, num(o.budget), ex, b, p, b - ex]; }); return { head: ['Об’єкт', 'Статус', 'Бюджет', 'Витрати', 'Виставлено', 'Оплачено', 'Маржа'], rows, money: [2, 3, 4, 5, 6], total: true }; }],
    debt: ['Дебіторська заборгованість', () => { const rows = list('invoices').filter((x) => ['Рахунок', 'Акт виконаних робіт'].includes(x.kind) && num(x.paid) < num(x.amount)).sort((a, b) => String(a.due).localeCompare(String(b.due))).map((x) => [x.number, refName('clients', x.client), fmtDate(x.due), x.due && daysTo(x.due) < 0 ? -daysTo(x.due) : 0, num(x.amount), num(x.paid), num(x.amount) - num(x.paid)]); return { head: ['Документ', 'Клієнт', 'Термін', 'Днів прострочки', 'Сума', 'Оплачено', 'Борг'], rows, money: [4, 5, 6], total: true }; }],
    funnel: ['Воронка продажів', () => { const st = ENTITIES.deals.fields.find((f) => f.k === 'stage').o; const all = list('deals'); const rows = st.map((s) => { const l = all.filter((d) => d.stage === s); return [s, l.length, l.reduce((a, d) => a + num(d.amount), 0), all.length ? Math.round(l.length / all.length * 100) + '%' : '0%']; }); const won = all.filter((d) => d.stage === 'Виграно').length, lost = all.filter((d) => d.stage === 'Програно').length; return { head: ['Етап', 'Угод', 'Сума', 'Частка'], rows, money: [2], total: true, note: `Конверсія закритих угод: ${won + lost ? Math.round(won / (won + lost) * 100) : 0}% (виграно ${won}, програно ${lost})` }; }],
    expenses: ['Витрати за статтями', () => { const l = list('expenses').filter((x) => x.date >= repFrom && x.date <= repTo); const cats = {}; l.forEach((x) => (cats[x.category || 'Без статті'] = (cats[x.category || 'Без статті'] || 0) + num(x.amount))); const tot = l.reduce((s, x) => s + num(x.amount), 0); return { head: ['Стаття', 'Сума', 'Частка'], rows: Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([c, s]) => [c, s, tot ? Math.round(s / tot * 100) + '%' : '']), money: [1], total: true, period: true }; }],
    team: ['Завантаження персоналу', () => ({ head: ['Працівник', 'Посада', 'Відкриті задачі', 'Прострочені', 'Виконано за період'], rows: list('employees').filter((x) => x.status !== 'Звільнений').map((p) => { const ts = list('tasks').filter((x) => x.assignee === p.id); return [p.name, p.position, ts.filter((x) => x.status !== 'Готово').length, ts.filter((x) => x.status !== 'Готово' && x.due && x.due < today()).length, ts.filter((x) => x.status === 'Готово' && new Date(x.updatedAt).toISOString().slice(0, 10) >= repFrom).length]; }), period: true }) ],
    stock: ['Залишки складу', () => ({ head: ['Матеріал', 'Од.', 'Залишок', 'Мінімум', 'Ціна', 'Вартість залишку', 'Стан'], rows: list('materials').map((x) => [x.name, x.unit, num(x.qty), x.min === '' ? '' : num(x.min), num(x.price), num(x.qty) * num(x.price), x.min !== '' && num(x.qty) < num(x.min) ? 'Замовити' : 'Достатньо']), money: [4, 5], total: true })],
    clients: ['Клієнти за обсягом робіт', () => ({ head: ['Клієнт', 'Статус', 'Угод', 'Виграно на суму', 'Виставлено', 'Оплачено'], rows: list('clients').map((c) => { const d = list('deals').filter((x) => x.client === c.id); const inv = list('invoices').filter((x) => x.client === c.id && ['Рахунок', 'Акт виконаних робіт'].includes(x.kind)); return [c.name, c.status, d.length, d.filter((x) => x.stage === 'Виграно').reduce((s, x) => s + num(x.amount), 0), inv.reduce((s, x) => s + num(x.amount), 0), inv.reduce((s, x) => s + num(x.paid), 0)]; }).sort((a, b) => b[4] - a[4]), money: [3, 4, 5], total: true })],
  };
  const avail = Object.entries(R).filter(([k]) => ({ profit: on('objects'), debt: on('invoices'), funnel: on('deals'), expenses: on('expenses'), team: on('employees') && on('tasks'), stock: on('materials'), clients: on('clients') }[k]));
  if (!avail.find(([k]) => k === rep)) rep = avail[0]?.[0];
  if (!rep) { v.innerHTML = '<div class="empty">Немає розділів для звітів.</div>'; return; }
  const r = R[rep][1]();
  const tot = r.total && r.rows.length ? r.head.map((_, i) => (i === 0 ? 'Разом' : r.money?.includes(i) ? r.rows.reduce((s, x) => s + num(x[i]), 0) : '')) : null;
  const fmt = (x, i) => (r.money?.includes(i) ? money(x) : typeof x === 'number' ? fmtNum(x) : esc(x));
  v.innerHTML = `<div class="ph"><div><h1>Звіти</h1><p>${esc(company())} · сформовано ${fmtDate(today())}</p></div><div class="acts"><button class="btn line" id="rcsv">${ic('down')}Excel (CSV)</button><button class="btn" id="rprint">${ic('print')}Друк / PDF</button></div></div>
    <div class="toolbar no-print"><div class="chips">${avail.map(([k, [t]]) => `<button class="chip" data-r="${k}" aria-pressed="${k === rep}">${esc(t)}</button>`).join('')}</div></div>
    ${r.period ? `<div class="toolbar no-print"><label class="f">З<input class="field" type="date" id="rf" value="${repFrom}"></label><label class="f">По<input class="field" type="date" id="rt" value="${repTo}"></label></div>` : ''}
    <div class="card"><div class="card-h"><h3>${esc(R[rep][0])}${r.period ? ` · ${fmtDate(repFrom)} — ${fmtDate(repTo)}` : ''}</h3></div>
    ${r.rows.length ? `<div class="tbl-wrap"><table class="tbl"><thead><tr>${r.head.map((h, i) => `<th class="${i && (r.money?.includes(i) || typeof r.rows[0][i] === 'number') ? 'num' : ''}">${esc(h)}</th>`).join('')}</tr></thead><tbody>${r.rows.map((x) => `<tr style="cursor:default">${x.map((c, i) => `<td class="${i === 0 ? 'main-c' : ''} ${i && typeof c === 'number' ? 'num' : ''}" ${r.money?.includes(i) && c < 0 ? 'style="color:var(--accent)"' : ''}>${fmt(c, i)}</td>`).join('')}</tr>`).join('')}</tbody>${tot ? `<tfoot><tr>${tot.map((c, i) => `<td class="${i && c !== '' ? 'num' : ''}">${c === '' ? '' : i ? money(c) : c}</td>`).join('')}</tr></tfoot>` : ''}</table></div>` : '<div class="empty">Немає даних</div>'}
    ${r.note ? `<div class="card-b hint">${esc(r.note)}</div>` : ''}</div>`;
  $$('[data-r]', v).forEach((b) => (b.onclick = () => { rep = b.dataset.r; reports(v); }));
  $('#rf')?.addEventListener('change', (e) => { repFrom = e.target.value; reports(v); });
  $('#rt')?.addEventListener('change', (e) => { repTo = e.target.value; reports(v); });
  $('#rprint').onclick = () => print();
  $('#rcsv').onclick = () => download(`${R[rep][0]}-${today()}.csv`, csv([r.head, ...r.rows, ...(tot ? [tot] : [])]), 'text/csv');
}

/* ══════════ ЖУРНАЛ ══════════ */
function logView(v) {
  const L = S.db.log || [];
  v.innerHTML = `<div class="ph"><div><h1>Журнал змін</h1><p>Хто, що і коли змінював · останні ${Math.min(L.length, 300)} записів</p></div></div>
    <div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Час</th><th>Хто</th><th>Дія</th><th>Розділ</th><th>Запис</th></tr></thead><tbody>${L.slice(0, 300).map((l) => `<tr ${l.action !== 'delete' && ENTITIES[l.entity] ? `data-h="#/e/${l.entity}/${l.id}"` : 'style="cursor:default"'}><td>${new Date(l.at).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' })}</td><td>${esc(l.who)}</td><td>${l.action === 'create' ? '<span class="pill ok">створено</span>' : l.action === 'delete' ? '<span class="pill bad">видалено</span>' : '<span class="pill info">змінено</span>'}</td><td>${esc(ENTITIES[l.entity] ? T(l.entity) : l.entity)}</td><td class="main-c">${esc(l.title)}</td></tr>`).join('') || '<tr><td colspan="5" class="empty">Порожньо</td></tr>'}</tbody></table></div></div>`;
  $$('[data-h]', v).forEach((tr) => (tr.onclick = () => (location.hash = tr.dataset.h)));
}

/* ══════════ НАЛАШТУВАННЯ ══════════ */
async function settings(v) {
  if (!can('settings')) { v.innerHTML = '<div class="empty">Немає доступу</div>'; return; }
  const s = SET(), th = s.theme || CFG.theme;
  const ct = s.customTheme || THEMES.classic;
  v.innerHTML = `<div class="ph"><div><h1>Налаштування</h1><p>${S.mode === 'server' ? 'Серверна версія' : S.demo ? 'Демо-режим — зміни не зберігаються' : 'Офлайн-база: ' + esc(S.fileName || 'novacrm-data.json')}</p></div></div>
    <div class="grid g2">
      <div class="card"><div class="card-h"><h3>Компанія</h3></div><div class="card-b grid" style="gap:14px">
        <label class="f">Назва компанії<input class="field" id="sc" value="${esc(company())}"></label>
        <label class="f">Тип компанії (набір розділів і назв)<select class="field" id="sp">${Object.entries(PRESETS).map(([k, p]) => `<option value="${k}"${(s.preset || CFG.preset) === k ? ' selected' : ''}>${esc(p.name)}</option>`).join('')}</select></label>
        <div><div class="hint" style="margin-bottom:6px">Розділи</div><div class="chips" id="smods">${Object.keys(ENTITIES).map((e) => `<button class="chip" data-mod="${e}" aria-pressed="${on(e)}">${esc(T(e))}</button>`).join('')}</div></div>
        <button class="btn" id="saveCo" style="justify-self:start">${ic('save')}Зберегти</button></div></div>
      <div class="card"><div class="card-h"><h3>Кольори</h3></div><div class="card-b grid" style="gap:8px">
        ${Object.entries(THEMES).map(([k, t]) => `<button class="theme-opt" data-th="${k}" aria-pressed="${th === k}"><span class="sw">${['bg', 'brand', 'accent'].map((c) => `<i style="background:${t[c]}"></i>`).join('')}</span>${esc(t.name)}</button>`).join('')}
        <button class="theme-opt" data-th="custom" aria-pressed="${th === 'custom'}"><span class="sw">${['bg', 'brand', 'accent'].map((c) => `<i style="background:${ct[c]}"></i>`).join('')}</span>Власні кольори</button>
        <div class="form-grid" id="custom" ${th === 'custom' ? '' : 'hidden'}>${[['bg', 'Фон'], ['surface', 'Картки'], ['ink', 'Текст'], ['brand', 'Основний'], ['accent', 'Акцент']].map(([k, l]) => `<label class="f">${l}<input type="color" class="field" data-cc="${k}" value="${ct[k]}" style="padding:2px"></label>`).join('')}</div>
      </div></div>
      <div class="card"><div class="card-h"><h3>Назви розділів і полів</h3></div><div class="card-b grid" style="gap:12px"><p class="hint" style="margin:0">Перейменуйте розділи під свою компанію. Порожнє поле — стандартна назва.</p>
        <div class="form-grid">${Object.keys(ENTITIES).map((e) => `<label class="f">${esc(ENTITIES[e].title)}<input class="field" data-term="${e}" value="${esc((s.terms || {})[e] || '')}" placeholder="${esc(T(e))}"></label>`).join('')}</div>
        <button class="btn line" id="saveTerms" style="justify-self:start">Зберегти назви</button></div></div>
      ${S.mode === 'offline' ? `<div class="card"><div class="card-h"><h3>Безпека і файл</h3></div><div class="card-b grid" style="gap:12px">
        <label class="f">Автоблокування після бездіяльності<select class="field" id="sal">${[5, 10, 15, 30, 60, 0].map((m) => `<option value="${m}"${(s.autoLock ?? CFG.autoLockMinutes) === m ? ' selected' : ''}>${m ? m + ' хв' : 'вимкнено'}</option>`).join('')}</select></label>
        ${!S.demo ? `<button class="btn line" id="chpw" style="justify-self:start">${ic('key')}Змінити пароль бази</button><button class="btn line" id="backup" style="justify-self:start">${ic('down')}Резервна копія (зашифрована)</button>` : ''}
        <button class="btn line" id="toServer" style="justify-self:start">${ic('up')}Експорт для серверної версії</button>
        <p class="hint" style="margin:0">Робіть копію файлу бази щотижня. Забутий пароль = дані втрачено.</p></div></div>` : ''}
      ${S.mode === 'server' && ME.role === 'admin' ? `<div class="card"><div class="card-h"><h3>Користувачі</h3><button class="btn sm" id="addU">${ic('plus')}Користувач</button></div><div class="card-b mini-list" id="ulist"><span class="hint">Завантаження…</span></div></div>
        <div class="card"><div class="card-h"><h3>Імпорт офлайн-бази</h3></div><div class="card-b grid" style="gap:10px"><p class="hint" style="margin:0">Завантажте файл, експортований з офлайн-версії («Експорт для серверної версії»). Поточні дані на сервері буде замінено.</p><input type="file" id="impF" accept=".json"></div></div>` : ''}
    </div>`;
  const mods = new Set(modules());
  $$('[data-mod]').forEach((b) => (b.onclick = () => { const e = b.dataset.mod; mods.has(e) ? mods.delete(e) : mods.add(e); b.setAttribute('aria-pressed', mods.has(e)); }));
  $('#sp').onchange = () => { const p = PRESETS[$('#sp').value]; mods.clear(); p.modules.forEach((e) => mods.add(e)); $$('[data-mod]').forEach((b) => b.setAttribute('aria-pressed', mods.has(b.dataset.mod))); };
  $('#saveCo').onclick = async () => { await S.saveSettings({ company: $('#sc').value.trim() || 'Моя компанія', preset: $('#sp').value, modules: Object.keys(ENTITIES).filter((e) => mods.has(e)) }); applyTheme(); sidebar(); toast('Збережено'); };
  $$('[data-th]').forEach((b) => (b.onclick = async () => { $$('[data-th]').forEach((x) => x.setAttribute('aria-pressed', x === b)); $('#custom').hidden = b.dataset.th !== 'custom'; await S.saveSettings({ theme: b.dataset.th, ...(b.dataset.th === 'custom' && !s.customTheme ? { customTheme: { ...THEMES.classic } } : {}) }); applyTheme(); }));
  $$('[data-cc]').forEach((i) => (i.oninput = () => { const c = { ...(SET().customTheme || THEMES.classic) }; c[i.dataset.cc] = i.value; S.db.settings.customTheme = c; applyTheme(); }));
  $$('[data-cc]').forEach((i) => (i.onchange = () => S.saveSettings({ customTheme: SET().customTheme, theme: 'custom' })));
  $('#saveTerms').onclick = async () => { const t = { ...(s.terms || {}) }; $$('[data-term]').forEach((i) => { if (i.value.trim()) t[i.dataset.term] = i.value.trim(); else delete t[i.dataset.term]; }); await S.saveSettings({ terms: t }); sidebar(); toast('Назви збережено'); };
  $('#sal')?.addEventListener('change', (e) => S.saveSettings({ autoLock: +e.target.value }));
  $('#chpw')?.addEventListener('click', () => dialog(`<h3>Новий пароль бази</h3><label class="f">Поточний пароль<input class="field" type="password" id="p0"></label><label class="f">Новий пароль (від 8 символів)<input class="field" type="password" id="p1"></label><label class="f">Повторіть<input class="field" type="password" id="p2"></label><p class="err" id="perr"></p><div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn line" data-x>Скасувати</button><button class="btn" id="pok">Змінити</button></div>`, (box, close) => {
    $('#pok', box).onclick = async () => { if ($('#p0', box).value !== S.password) return ($('#perr', box).textContent = 'Поточний пароль неправильний'); if ($('#p1', box).value.length < 8) return ($('#perr', box).textContent = 'Мінімум 8 символів'); if ($('#p1', box).value !== $('#p2', box).value) return ($('#perr', box).textContent = 'Паролі не збігаються'); await S.changePassword($('#p1', box).value); close(); toast('Пароль змінено, файл перезаписано'); };
  }));
  $('#backup')?.addEventListener('click', async () => download(`novacrm-backup-${today()}.json`, JSON.stringify(await encryptDb(S.db, S.password)), 'application/json'));
  $('#toServer')?.addEventListener('click', async () => { if (await confirmBox('Файл для сервера НЕ зашифрований. Передавайте його лише безпечно і видаліть після імпорту. Продовжити?', 'Експортувати', false)) download(`novacrm-export-${today()}.json`, JSON.stringify({ format: 'NovaCRM-export', version: 3, db: S.db }), 'application/json'); });
  if (S.mode === 'server' && ME.role === 'admin') {
    const drawUsers = async () => { const us = await S.users(); $('#ulist').innerHTML = us.map((u) => `<a href="#" data-u="${u.id}"><span><b>${esc(u.name)}</b><br><small>${esc(u.login)} · ${esc(ROLES[u.role])}${u.active === false ? ' · вимкнено' : ''}</small></span>${ic('edit')}</a>`).join(''); $$('[data-u]').forEach((a) => (a.onclick = (ev) => { ev.preventDefault(); userForm(us.find((x) => x.id === a.dataset.u), drawUsers); })); };
    drawUsers(); $('#addU').onclick = () => userForm(null, drawUsers);
    $('#impF').onchange = async (ev) => { const f = ev.target.files[0]; if (!f) return; const j = JSON.parse(await f.text()); if (j.format !== 'NovaCRM-export') return toast('Це не файл експорту NovaCRM'); if (!(await confirmBox('Замінити всі дані на сервері даними з файлу?', 'Замінити'))) return; await S.importDb(j.db); location.reload(); };
  }
}
function userForm(u, done) {
  dialog(`<h3>${u ? 'Користувач' : 'Новий користувач'}</h3>
    <label class="f">Ім’я<input class="field" id="un" value="${esc(u?.name || '')}"></label><label class="f">Логін<input class="field" id="ul" value="${esc(u?.login || '')}" ${u ? 'disabled' : ''}></label>
    <label class="f">Роль<select class="field" id="ur">${Object.entries(ROLES).map(([k, l]) => `<option value="${k}"${u?.role === k ? ' selected' : ''}>${l}</option>`).join('')}</select></label>
    <label class="f">${u ? 'Новий пароль (залиште порожнім, щоб не міняти)' : 'Пароль (від 8 символів)'}<input class="field" id="up" type="password" autocomplete="new-password"></label>
    ${u ? `<label style="display:flex;gap:8px;font-size:13px"><input type="checkbox" id="ua" ${u.active !== false ? 'checked' : ''}> Доступ увімкнено</label>` : ''}
    <p class="err" id="uerr"></p><div style="display:flex;gap:8px;justify-content:space-between">${u ? '<button class="btn danger" id="udel">Видалити</button>' : '<span></span>'}<span style="display:flex;gap:8px"><button class="btn line" data-x>Скасувати</button><button class="btn" id="uok">Зберегти</button></span></div>`, (box, close) => {
    $('#uok', box).onclick = async () => {
      const body = { id: u?.id, name: $('#un', box).value.trim(), login: $('#ul', box).value.trim(), role: $('#ur', box).value, password: $('#up', box).value, active: u ? $('#ua', box).checked : true };
      if (!u && body.password.length < 8) return ($('#uerr', box).textContent = 'Пароль — щонайменше 8 символів');
      try { await S.saveUser(body); close(); done(); toast('Збережено'); } catch (e) { $('#uerr', box).textContent = e.message; }
    };
    $('#udel', box)?.addEventListener('click', async () => { try { await S.deleteUser(u.id); close(); done(); } catch (e) { $('#uerr', box).textContent = e.message; } });
  });
}

boot().catch((e) => { console.error(e); $('#root').innerHTML = `<div class="empty"><b>Не вдалося запустити програму</b>${esc(e.message)}</div>`; });
