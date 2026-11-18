/* Допоміжні функції інтерфейсу */
const P = {
  home: '<path d="M3 11 12 4l9 7M5 10v10h14V10"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  funnel: '<path d="M3 4h18l-7 9v6l-4 2v-8z"/>', building: '<path d="M4 21V5l8-3v19M12 8h8v13M8 7h.01M8 11h.01M8 15h.01M16 12h.01M16 16h.01M2 21h20"/>',
  check: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 12 3 3 5-6"/>', receipt: '<path d="M6 2h12v20l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2M7 6V4h10v2"/>', box: '<path d="M3 7 12 3l9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10"/>',
  truck: '<path d="M2 6h11v10H2zM13 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>', badge: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17a4 4 0 0 1 8 0"/>',
  handshake: '<path d="m11 17 2 2a2 2 0 0 0 3-3l-4-4M14 14l2 2a2 2 0 0 0 3-3l-5-5-3 3a2 2 0 0 1-3-3l3-3h4l5 5M3 11l4-4 3 3M3 11l5 5 1 1"/>', file: '<path d="M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h4"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>', trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>', lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  save: '<path d="M5 3h11l3 3v15H5zM8 3v5h8M8 21v-7h8v7"/>', down: '<path d="M12 4v12M6 10l6 6 6-6M4 20h16"/>', up: '<path d="M12 20V8M6 14l6-6 6 6M4 4h16"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', board: '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="4" height="13" rx="1"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', print: '<path d="M6 9V3h12v6M6 17H4v-6h16v6h-2M7 14h10v7H7z"/>', key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3"/>',
  folder: '<path d="M3 6h7l2 2h9v11H3z"/>', newdb: '<path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3M20 6v5M17 15v6M14 18h6"/>', play: '<path d="M7 4v16l13-8z"/>',
  alert: '<path d="M12 3 2 20h20zM12 10v4M12 17h.01"/>', left: '<path d="m15 5-7 7 7 7"/>', right: '<path d="m9 5 7 7-7 7"/>', move: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>', clip: '<path d="m21 11-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"/>',
};
export const ic = (n) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || P.file}</svg>`;
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const num = (v) => { const n = parseFloat(String(v ?? '').replace(/\s/g, '').replace(',', '.')); return isFinite(n) ? n : 0; };
export const money = (n, cur = window.NOVA_CONFIG?.currency || '₴') => `${Math.round(num(n)).toLocaleString('uk-UA').replace(/,/g, ' ')} ${cur}`;
export const fmtNum = (n) => (Math.round(num(n) * 100) / 100).toLocaleString('uk-UA').replace(/,/g, ' ');
const pad = (n) => String(n).padStart(2, '0');
export const today = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
export const MONTHS = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const MG = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];
export const fmtDate = (d) => { if (!d) return ''; const [y, m, dd] = String(d).slice(0, 10).split('-'); return `${+dd} ${MG[+m - 1]} ${y}`; };
export const daysTo = (d) => Math.round((new Date(d + 'T00:00') - new Date(today() + 'T00:00')) / 864e5);
export const initials = (s) => String(s || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export function toast(t) { $('.toast')?.remove(); const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.append(d); setTimeout(() => d.remove(), 2600); }

/* бокова панель-форма */
export function drawer(title, body, { onSave, saveText = 'Зберегти', extra = '' } = {}) {
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="drawer" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="drawer-h"><h3>${esc(title)}</h3><button class="ib" data-x aria-label="Закрити">${ic('x')}</button></div>
    <div class="drawer-b">${body}</div>${onSave ? `<div class="drawer-f">${extra}<button class="btn line" data-x>Скасувати</button><button class="btn" data-save>${esc(saveText)}</button></div>` : ''}</div>`;
  document.body.append(m);
  const close = () => { m.remove(); removeEventListener('keydown', key); };
  const key = (e) => { if (e.key === 'Escape') close(); };
  addEventListener('keydown', key);
  m.addEventListener('mousedown', (e) => { if (e.target === m) close(); });
  $$('[data-x]', m).forEach((b) => (b.onclick = close));
  const save = $('[data-save]', m);
  if (save) save.onclick = async () => { save.disabled = true; try { if ((await onSave(m)) !== false) close(); } catch (e) { console.error(e); toast('Помилка: ' + e.message); } finally { save.disabled = false; } };
  setTimeout(() => $('input:not([type=hidden]), select, textarea', m)?.focus(), 50);
  return { el: m, close };
}
export function dialog(html, onMount) {
  const m = document.createElement('div'); m.className = 'modal'; m.style.justifyContent = 'center';
  m.innerHTML = `<div class="dialog" role="dialog" aria-modal="true">${html}</div>`;
  document.body.append(m);
  const close = () => m.remove();
  m.addEventListener('mousedown', (e) => { if (e.target === m) close(); });
  $$('[data-x]', m).forEach((b) => (b.onclick = close));
  onMount?.(m.firstElementChild, close);
  setTimeout(() => $('input, select', m)?.focus(), 50);
  return close;
}
export const confirmBox = (text, yes = 'Так', danger = true) => new Promise((res) => {
  dialog(`<h3>${esc(text)}</h3><div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn line" data-no>Скасувати</button><button class="btn ${danger ? 'red' : ''}" data-yes>${esc(yes)}</button></div>`, (box, close) => {
    $('[data-no]', box).onclick = () => { close(); res(false); };
    $('[data-yes]', box).onclick = () => { close(); res(true); };
  });
});
export function download(name, text, type = 'text/plain') {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
export const csv = (rows) => '﻿' + rows.map((r) => r.map((x) => `"${String(x ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
export const readFile = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
