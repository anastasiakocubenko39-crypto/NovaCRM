/* NovaCRM 3 — зібраний файл. Не редагуйте вручну: змініть assets/js/*.js і запустіть tools/build.py */
(function () {
'use strict';

/* ── ui.js ── */
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
const ic = (n) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || P.file}</svg>`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = (v) => { const n = parseFloat(String(v ?? '').replace(/\s/g, '').replace(',', '.')); return isFinite(n) ? n : 0; };
const money = (n, cur = window.NOVA_CONFIG?.currency || '₴') => `${Math.round(num(n)).toLocaleString('uk-UA').replace(/,/g, ' ')} ${cur}`;
const fmtNum = (n) => (Math.round(num(n) * 100) / 100).toLocaleString('uk-UA').replace(/,/g, ' ');
const pad = (n) => String(n).padStart(2, '0');
const today = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const MONTHS = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const MG = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];
const fmtDate = (d) => { if (!d) return ''; const [y, m, dd] = String(d).slice(0, 10).split('-'); return `${+dd} ${MG[+m - 1]} ${y}`; };
const daysTo = (d) => Math.round((new Date(d + 'T00:00') - new Date(today() + 'T00:00')) / 864e5);
const initials = (s) => String(s || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

function toast(t) { $('.toast')?.remove(); const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.append(d); setTimeout(() => d.remove(), 2600); }

/* бокова панель-форма */
function drawer(title, body, { onSave, saveText = 'Зберегти', extra = '' } = {}) {
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
function dialog(html, onMount) {
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
const confirmBox = (text, yes = 'Так', danger = true) => new Promise((res) => {
  dialog(`<h3>${esc(text)}</h3><div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn line" data-no>Скасувати</button><button class="btn ${danger ? 'red' : ''}" data-yes>${esc(yes)}</button></div>`, (box, close) => {
    $('[data-no]', box).onclick = () => { close(); res(false); };
    $('[data-yes]', box).onclick = () => { close(); res(true); };
  });
});
function download(name, text, type = 'text/plain') {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
const csv = (rows) => '﻿' + rows.map((r) => r.map((x) => `"${String(x ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
const readFile = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });


/* ── schema.js ── */
/* Опис розділів CRM: поля, списки, статуси.
   Назви розділів можна змінити в config.js (terms), а непотрібні розділи — вимкнути (modules). */

const STATUS_COLORS = { ok: 'ok', warn: 'warn', bad: 'bad', info: 'info', mute: 'mute' };

const ENTITIES = {
  clients: {
    title: 'Клієнти', one: 'Клієнт', icon: 'users', group: 'sales',
    fields: [
      { k: 'name', l: 'Назва / ПІБ', t: 'text', req: 1, list: 1 },
      { k: 'kind', l: 'Тип', t: 'select', o: ['Компанія', 'Фізична особа', 'ФОП', 'Держустанова'], list: 1 },
      { k: 'contact', l: 'Контактна особа', t: 'text', list: 1 },
      { k: 'phone', l: 'Телефон', t: 'phone', list: 1 },
      { k: 'email', l: 'Email', t: 'email' },
      { k: 'city', l: 'Місто', t: 'text', list: 1 },
      { k: 'address', l: 'Адреса', t: 'text' },
      { k: 'code', l: 'ЄДРПОУ / ІПН', t: 'text' },
      { k: 'source', l: 'Джерело', t: 'select', o: ['Рекомендація', 'Сайт', 'Реклама', 'Повторний клієнт', 'Тендер', 'Інше'] },
      { k: 'status', l: 'Статус', t: 'select', o: ['Потенційний', 'Активний', 'Постійний', 'Неактивний'], list: 1, color: { 'Активний': 'ok', 'Постійний': 'info', 'Потенційний': 'warn', 'Неактивний': 'mute' } },
      { k: 'manager', l: 'Відповідальний', t: 'ref', ref: 'employees' },
      { k: 'notes', l: 'Нотатки', t: 'textarea', wide: 1 },
    ],
  },
  deals: {
    title: 'Угоди', one: 'Угода', icon: 'funnel', group: 'sales', board: 'stage',
    fields: [
      { k: 'title', l: 'Назва угоди', t: 'text', req: 1, list: 1 },
      { k: 'client', l: 'Клієнт', t: 'ref', ref: 'clients', list: 1 },
      { k: 'amount', l: 'Сума', t: 'money', list: 1 },
      { k: 'stage', l: 'Етап', t: 'select', o: ['Новий запит', 'Замір / консультація', 'Кошторис', 'Переговори', 'Договір', 'Виграно', 'Програно'], list: 1, color: { 'Виграно': 'ok', 'Програно': 'bad', 'Договір': 'info' } },
      { k: 'probability', l: 'Ймовірність, %', t: 'percent' },
      { k: 'due', l: 'Очікувана дата', t: 'date', list: 1 },
      { k: 'manager', l: 'Менеджер', t: 'ref', ref: 'employees', list: 1 },
      { k: 'object', l: 'Об’єкт', t: 'ref', ref: 'objects' },
      { k: 'notes', l: 'Деталі', t: 'textarea', wide: 1 },
    ],
  },
  objects: {
    title: 'Об’єкти', one: 'Об’єкт', icon: 'building', group: 'work',
    fields: [
      { k: 'name', l: 'Назва об’єкта', t: 'text', req: 1, list: 1 },
      { k: 'client', l: 'Замовник', t: 'ref', ref: 'clients', list: 1 },
      { k: 'kind', l: 'Тип робіт', t: 'select', o: ['Будівництво будинку', 'Капітальний ремонт', 'Ремонт квартири', 'Комерційне приміщення', 'Покрівля / фасад', 'Інженерні мережі', 'Інше'] },
      { k: 'address', l: 'Адреса', t: 'text', list: 1 },
      { k: 'status', l: 'Статус', t: 'select', o: ['Планування', 'В роботі', 'Призупинено', 'Здано', 'Гарантія'], list: 1, color: { 'В роботі': 'info', 'Здано': 'ok', 'Призупинено': 'bad', 'Планування': 'warn', 'Гарантія': 'mute' } },
      { k: 'start', l: 'Початок', t: 'date' },
      { k: 'end', l: 'Здача (план)', t: 'date', list: 1 },
      { k: 'budget', l: 'Бюджет (кошторис)', t: 'money', list: 1 },
      { k: 'progress', l: 'Готовність, %', t: 'percent', list: 1 },
      { k: 'foreman', l: 'Виконроб', t: 'ref', ref: 'employees' },
      { k: 'stages', l: 'Етапи робіт', t: 'stages', wide: 1 },
      { k: 'notes', l: 'Опис', t: 'textarea', wide: 1 },
    ],
  },
  tasks: {
    title: 'Задачі', one: 'Задача', icon: 'check', group: 'work', board: 'status',
    fields: [
      { k: 'title', l: 'Задача', t: 'text', req: 1, list: 1 },
      { k: 'status', l: 'Статус', t: 'select', o: ['До виконання', 'В роботі', 'На перевірці', 'Готово'], list: 1, color: { 'Готово': 'ok', 'В роботі': 'info', 'На перевірці': 'warn' } },
      { k: 'priority', l: 'Пріоритет', t: 'select', o: ['Низький', 'Звичайний', 'Високий', 'Терміново'], list: 1, color: { 'Терміново': 'bad', 'Високий': 'warn' } },
      { k: 'due', l: 'Термін', t: 'date', list: 1 },
      { k: 'assignee', l: 'Виконавець', t: 'ref', ref: 'employees', list: 1 },
      { k: 'object', l: 'Об’єкт', t: 'ref', ref: 'objects' },
      { k: 'client', l: 'Клієнт', t: 'ref', ref: 'clients' },
      { k: 'notes', l: 'Опис', t: 'textarea', wide: 1 },
    ],
  },
  invoices: {
    title: 'Рахунки й акти', one: 'Документ', icon: 'receipt', group: 'money',
    fields: [
      { k: 'number', l: 'Номер', t: 'text', req: 1, list: 1 },
      { k: 'kind', l: 'Тип', t: 'select', o: ['Рахунок', 'Акт виконаних робіт', 'Договір', 'Кошторис'], list: 1 },
      { k: 'client', l: 'Клієнт', t: 'ref', ref: 'clients', list: 1 },
      { k: 'object', l: 'Об’єкт', t: 'ref', ref: 'objects' },
      { k: 'date', l: 'Дата', t: 'date', list: 1 },
      { k: 'due', l: 'Оплатити до', t: 'date', list: 1 },
      { k: 'amount', l: 'Сума', t: 'money', list: 1 },
      { k: 'paid', l: 'Оплачено', t: 'money', list: 1 },
      { k: 'notes', l: 'Примітки', t: 'textarea', wide: 1 },
    ],
  },
  expenses: {
    title: 'Витрати', one: 'Витрата', icon: 'wallet', group: 'money',
    fields: [
      { k: 'date', l: 'Дата', t: 'date', req: 1, list: 1 },
      { k: 'category', l: 'Стаття', t: 'select', o: ['Матеріали', 'Зарплата', 'Субпідряд', 'Оренда техніки', 'Паливо і транспорт', 'Офіс', 'Податки', 'Інше'], list: 1 },
      { k: 'amount', l: 'Сума', t: 'money', req: 1, list: 1 },
      { k: 'object', l: 'Об’єкт', t: 'ref', ref: 'objects', list: 1 },
      { k: 'supplier', l: 'Постачальник', t: 'ref', ref: 'suppliers', list: 1 },
      { k: 'notes', l: 'Коментар', t: 'text', wide: 1 },
    ],
  },
  materials: {
    title: 'Склад', one: 'Матеріал', icon: 'box', group: 'resources',
    fields: [
      { k: 'name', l: 'Матеріал', t: 'text', req: 1, list: 1 },
      { k: 'unit', l: 'Од.', t: 'select', o: ['шт', 'м²', 'м³', 'м', 'кг', 'т', 'л', 'мішок', 'уп'], list: 1 },
      { k: 'qty', l: 'Залишок', t: 'number', list: 1 },
      { k: 'min', l: 'Мінімум', t: 'number', list: 1 },
      { k: 'price', l: 'Ціна за од.', t: 'money', list: 1 },
      { k: 'place', l: 'Склад / місце', t: 'text' },
      { k: 'supplier', l: 'Постачальник', t: 'ref', ref: 'suppliers' },
    ],
  },
  equipment: {
    title: 'Техніка', one: 'Техніка', icon: 'truck', group: 'resources',
    fields: [
      { k: 'name', l: 'Назва', t: 'text', req: 1, list: 1 },
      { k: 'inv', l: 'Інв. номер', t: 'text', list: 1 },
      { k: 'status', l: 'Стан', t: 'select', o: ['Вільна', 'На об’єкті', 'Ремонт', 'Списано'], list: 1, color: { 'Вільна': 'ok', 'На об’єкті': 'info', 'Ремонт': 'bad', 'Списано': 'mute' } },
      { k: 'object', l: 'Де зараз', t: 'ref', ref: 'objects', list: 1 },
      { k: 'service', l: 'Наступне ТО', t: 'date', list: 1 },
      { k: 'notes', l: 'Нотатки', t: 'textarea', wide: 1 },
    ],
  },
  employees: {
    title: 'Персонал', one: 'Працівник', icon: 'badge', group: 'resources',
    fields: [
      { k: 'name', l: 'ПІБ', t: 'text', req: 1, list: 1 },
      { k: 'position', l: 'Посада', t: 'text', list: 1 },
      { k: 'team', l: 'Відділ / бригада', t: 'text', list: 1 },
      { k: 'phone', l: 'Телефон', t: 'phone', list: 1 },
      { k: 'email', l: 'Email', t: 'email' },
      { k: 'status', l: 'Статус', t: 'select', o: ['Працює', 'Відпустка', 'Лікарняний', 'Відрядження', 'Звільнений'], list: 1, color: { 'Працює': 'ok', 'Відпустка': 'info', 'Лікарняний': 'warn', 'Відрядження': 'info', 'Звільнений': 'mute' } },
      { k: 'hired', l: 'Дата прийому', t: 'date' },
      { k: 'birth', l: 'Дата народження', t: 'date' },
      { k: 'rate', l: 'Ставка / оклад', t: 'money' },
      { k: 'docs', l: 'Документи (паспорт, ІПН, допуски)', t: 'textarea', wide: 1 },
      { k: 'notes', l: 'Нотатки', t: 'textarea', wide: 1 },
    ],
  },
  suppliers: {
    title: 'Партнери', one: 'Партнер', icon: 'handshake', group: 'resources',
    fields: [
      { k: 'name', l: 'Назва', t: 'text', req: 1, list: 1 },
      { k: 'kind', l: 'Тип', t: 'select', o: ['Постачальник', 'Субпідрядник', 'Оренда техніки', 'Послуги'], list: 1 },
      { k: 'spec', l: 'Що постачає / робить', t: 'text', list: 1 },
      { k: 'contact', l: 'Контактна особа', t: 'text' },
      { k: 'phone', l: 'Телефон', t: 'phone', list: 1 },
      { k: 'email', l: 'Email', t: 'email' },
      { k: 'rating', l: 'Оцінка', t: 'select', o: ['5 — відмінно', '4 — добре', '3 — нормально', '2 — є зауваження', '1 — не працювати'], list: 1 },
      { k: 'notes', l: 'Умови, знижки, нотатки', t: 'textarea', wide: 1 },
    ],
  },
  documents: {
    title: 'Документи', one: 'Документ', icon: 'file', group: 'other',
    fields: [
      { k: 'title', l: 'Назва', t: 'text', req: 1, list: 1 },
      { k: 'kind', l: 'Тип', t: 'select', o: ['Договір', 'Проєкт / креслення', 'Дозвіл', 'Фото', 'Акт', 'Інше'], list: 1 },
      { k: 'object', l: 'Об’єкт', t: 'ref', ref: 'objects', list: 1 },
      { k: 'client', l: 'Клієнт', t: 'ref', ref: 'clients' },
      { k: 'date', l: 'Дата', t: 'date', list: 1 },
      { k: 'file', l: 'Файл', t: 'file', wide: 1 },
      { k: 'notes', l: 'Опис', t: 'textarea', wide: 1 },
    ],
  },
};

const GROUPS = [
  ['sales', 'Продажі'], ['work', 'Роботи'], ['money', 'Фінанси'], ['resources', 'Ресурси'], ['other', 'Інше'],
];

/* Що показувати в заголовку запису */
const titleOf = (ent, r) => (r ? r.name || r.title || r.number || r.notes || r.category || '—' : '—');


/* ── store.js ── */
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
async function encryptDb(db, password, saltB64) {
  const salt = saltB64 ? unb64(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(password, salt);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: enc.encode('novacrm-v3') }, key, enc.encode(JSON.stringify(db)));
  return { format: 'NovaCRM-encrypted', version: 3, kdf: { name: 'PBKDF2-SHA256', iterations: ITER, salt: b64(salt) }, iv: b64(iv), data: b64(ct), savedAt: new Date().toISOString() };
}
async function decryptDb(file, password) {
  if (file?.format !== 'NovaCRM-encrypted' || file.version !== 3) throw new Error('format');
  const key = await deriveKey(password, unb64(file.kdf.salt));
  try {
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(file.iv), additionalData: enc.encode('novacrm-v3') }, key, unb64(file.data));
    return JSON.parse(dec.decode(pt));
  } catch { throw new Error('password'); }
}

const emptyDb = () => ({ meta: { created: new Date().toISOString(), version: 3 }, settings: {}, data: {}, log: [] });
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/* ── офлайн-сховище: файл на диску ── */
class OfflineStore {
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
class ServerStore {
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
const forgetFile = () => idb('del').catch(() => {});


/* ── demo.js ── */
/* Демо-база: вигадана будівельна компанія «БудМайстер». Усі імена, телефони і компанії — умовні. */

const d = (offset) => { const x = new Date(); x.setDate(x.getDate() + offset); return x.toISOString().slice(0, 10); };

function demoDb() {
  const id = () => uid();
  const E = [
    ['Олег Ковальчук', 'Директор', 'Керівництво', '+380 67 000 11 01', 'Працює', 65000],
    ['Ірина Мельник', 'Менеджер з продажів', 'Відділ продажів', '+380 67 000 11 02', 'Працює', 28000],
    ['Андрій Ткач', 'Виконроб', 'Бригада №1', '+380 67 000 11 03', 'Працює', 38000],
    ['Сергій Бондар', 'Виконроб', 'Бригада №2', '+380 67 000 11 04', 'Відпустка', 38000],
    ['Наталія Шевчук', 'Кошторисник', 'Інженерний відділ', '+380 67 000 11 05', 'Працює', 32000],
    ['Василь Гнатюк', 'Муляр', 'Бригада №1', '+380 67 000 11 06', 'Працює', 26000],
    ['Тарас Литвин', 'Електрик', 'Бригада №2', '+380 67 000 11 07', 'Працює', 27000],
    ['Марія Олійник', 'Бухгалтер', 'Фінанси', '+380 67 000 11 08', 'Працює', 30000],
  ].map(([name, position, team, phone, status, rate]) => ({ id: id(), name, position, team, phone, status, rate, hired: d(-400 - Math.floor(Math.random() * 600)) }));
  const [dir, sales, f1, f2, est] = E;

  const C = [
    ['ТОВ «Зелений квартал»', 'Компанія', 'Петро Савченко', 'Київ', 'Постійний', 'Тендер'],
    ['Олена Гордієнко', 'Фізична особа', 'Олена Гордієнко', 'Ірпінь', 'Активний', 'Рекомендація'],
    ['ФОП Романюк І. В.', 'ФОП', 'Ігор Романюк', 'Бровари', 'Активний', 'Сайт'],
    ['ОСББ «Липки-12»', 'Компанія', 'Голова правління', 'Київ', 'Потенційний', 'Реклама'],
    ['Максим Дяченко', 'Фізична особа', 'Максим Дяченко', 'Буча', 'Потенційний', 'Сайт'],
    ['ТОВ «Агро-Логістик»', 'Компанія', 'Анна Кравець', 'Біла Церква', 'Неактивний', 'Повторний клієнт'],
  ].map(([name, kind, contact, city, status, source], i) => ({ id: id(), name, kind, contact, city, status, source, phone: `+380 50 000 22 0${i + 1}`, email: `client${i + 1}@example.com`, manager: sales.id }));

  const S = [
    ['Будмаркет-Центр', 'Постачальник', 'Цемент, суміші, блоки', '5 — відмінно'],
    ['МеталБуд', 'Постачальник', 'Арматура, металопрокат', '4 — добре'],
    ['ТехОренда', 'Оренда техніки', 'Екскаватори, крани', '4 — добре'],
    ['ЕлектроМонтаж Плюс', 'Субпідрядник', 'Електромонтажні роботи', '3 — нормально'],
    ['Покрівля Про', 'Субпідрядник', 'Покрівельні роботи', '5 — відмінно'],
  ].map(([name, kind, spec, rating], i) => ({ id: id(), name, kind, spec, rating, contact: 'Менеджер', phone: `+380 63 000 33 0${i + 1}` }));

  const st = (rows) => rows.map(([name, s, e, status, cost]) => ({ name, start: d(s), end: d(e), status, cost }));
  const O = [
    { name: 'Житловий будинок, Ірпінь', client: C[1].id, kind: 'Будівництво будинку', address: 'Ірпінь, вул. Садова, 14', status: 'В роботі', start: d(-120), end: d(95), budget: 4200000, progress: 55, foreman: f1.id,
      stages: st([['Фундамент', -120, -90, 'Готово', 620000], ['Стіни і перекриття', -89, -30, 'Готово', 1250000], ['Покрівля', -29, 5, 'В роботі', 540000], ['Інженерні мережі', 6, 45, 'Заплановано', 690000], ['Оздоблення', 46, 95, 'Заплановано', 1100000]]) },
    { name: 'Офіс ТОВ «Зелений квартал»', client: C[0].id, kind: 'Комерційне приміщення', address: 'Київ, вул. Хрещатик, 10, оф. 4', status: 'В роботі', start: d(-45), end: d(30), budget: 1850000, progress: 70, foreman: f2.id,
      stages: st([['Демонтаж', -45, -38, 'Готово', 120000], ['Електрика', -37, -15, 'Готово', 380000], ['Перегородки і стелі', -14, 10, 'В роботі', 560000], ['Чистове оздоблення', 11, 30, 'Заплановано', 790000]]) },
    { name: 'Ремонт квартири, Бровари', client: C[2].id, kind: 'Ремонт квартири', address: 'Бровари, вул. Київська, 230, кв. 41', status: 'Планування', start: d(10), end: d(80), budget: 640000, progress: 0, foreman: f1.id,
      stages: st([['Замір і кошторис', -5, 5, 'В роботі', 0], ['Чорнові роботи', 10, 40, 'Заплановано', 280000], ['Чистові роботи', 41, 80, 'Заплановано', 360000]]) },
    { name: 'Покрівля ОСББ «Липки-12»', client: C[3].id, kind: 'Покрівля / фасад', address: 'Київ, вул. Липська, 12', status: 'Здано', start: d(-200), end: d(-150), budget: 980000, progress: 100, foreman: f2.id,
      stages: st([['Демонтаж старої покрівлі', -200, -190, 'Готово', 90000], ['Монтаж покрівлі', -189, -150, 'Готово', 890000]]) },
  ].map((o) => ({ id: id(), ...o }));

  const deals = [
    ['Будинок 180 м², Буча', C[4].id, 5200000, 'Кошторис', 50, 14], ['Ремонт офісу 2-й поверх', C[0].id, 1300000, 'Переговори', 70, 21],
    ['Фасад ОСББ «Липки-12»', C[3].id, 760000, 'Новий запит', 20, 30], ['Склад 600 м²', C[5].id, 3900000, 'Програно', 0, -20],
    ['Ремонт квартири, Бровари', C[2].id, 640000, 'Виграно', 100, -12], ['Котедж, Ірпінь', C[1].id, 4200000, 'Виграно', 100, -125],
    ['Ландшафтні роботи, Ірпінь', C[1].id, 310000, 'Договір', 90, 7],
  ].map(([title, client, amount, stage, probability, due]) => ({ id: id(), title, client, amount, stage, probability, due: d(due), manager: sales.id }));
  deals[4].object = O[2].id; deals[5].object = O[0].id;

  const tasks = [
    ['Замовити металочерепицю для покрівлі', 'В роботі', 'Високий', 2, f1.id, O[0].id], ['Погодити кольори фасаду із замовником', 'До виконання', 'Звичайний', 5, sales.id, O[0].id],
    ['Підготувати кошторис будинку в Бучі', 'В роботі', 'Терміново', 1, est.id, null], ['Акт виконаних робіт: електрика, офіс', 'На перевірці', 'Високий', 0, f2.id, O[1].id],
    ['Техогляд екскаватора', 'До виконання', 'Звичайний', 9, f1.id, null], ['Зустріч з ОСББ щодо фасаду', 'До виконання', 'Звичайний', 3, sales.id, null],
    ['Оплатити оренду крана', 'Готово', 'Звичайний', -2, dir.id, O[0].id], ['Закупити гіпсокартон', 'Готово', 'Високий', -6, f2.id, O[1].id],
    ['Перевірити гідроізоляцію фундаменту', 'До виконання', 'Високий', -1, f1.id, O[0].id],
  ].map(([title, status, priority, due, assignee, object]) => ({ id: id(), title, status, priority, due: d(due), assignee, object }));

  const inv = [
    ['Р-2026-031', 'Рахунок', C[1].id, O[0].id, -60, -45, 1260000, 1260000], ['Р-2026-044', 'Рахунок', C[1].id, O[0].id, -20, -5, 840000, 400000],
    ['А-2026-018', 'Акт виконаних робіт', C[0].id, O[1].id, -10, 5, 500000, 0], ['Р-2026-047', 'Рахунок', C[0].id, O[1].id, -40, -30, 740000, 740000],
    ['Р-2026-049', 'Рахунок', C[2].id, O[2].id, -3, 12, 190000, 0], ['Р-2026-012', 'Рахунок', C[3].id, O[3].id, -190, -170, 980000, 980000],
  ].map(([number, kind, client, object, date, due, amount, paid]) => ({ id: id(), number, kind, client, object, date: d(date), due: d(due), amount, paid }));

  const cats = ['Матеріали', 'Зарплата', 'Субпідряд', 'Оренда техніки', 'Паливо і транспорт'];
  const exp = [];
  [[O[0], 1900000], [O[1], 820000], [O[3], 760000]].forEach(([o, total]) => {
    const parts = [.45, .25, .15, .1, .05];
    parts.forEach((p, i) => exp.push({ id: id(), date: d(-Math.floor(Math.random() * 60) - 2), category: cats[i], amount: Math.round(total * p / 100) * 100, object: o.id, supplier: i === 0 ? S[0].id : i === 3 ? S[2].id : i === 2 ? S[3].id : undefined, notes: `${cats[i]} — ${o.name}` }));
  });
  exp.push({ id: id(), date: d(-4), category: 'Офіс', amount: 18500, notes: 'Оренда офісу' });

  const M = [
    ['Цемент М500', 'мішок', 120, 50, 245], ['Газоблок 300 мм', 'м³', 18, 20, 3150], ['Арматура 12 мм', 'т', 2.4, 1, 32500],
    ['Гіпсокартон 12,5 мм', 'шт', 45, 60, 285], ['Металочерепиця', 'м²', 0, 150, 420], ['Утеплювач мінвата', 'м³', 26, 10, 1650],
  ].map(([name, unit, qty, min, price]) => ({ id: id(), name, unit, qty, min, price, place: 'Склад, Ірпінь', supplier: S[0].id }));

  const Q = [
    ['Екскаватор JCB 3CX', 'ТЕ-001', 'На об’єкті', O[0].id, 9], ['Бетонозмішувач 180 л', 'ТЕ-002', 'Вільна', null, 40],
    ['Риштування 120 м²', 'ТЕ-003', 'На об’єкті', O[1].id, 60], ['Генератор 10 кВт', 'ТЕ-004', 'Ремонт', null, -3],
  ].map(([name, inv, status, object, service]) => ({ id: id(), name, inv, status, object, service: d(service) }));

  const docs = [
    { id: id(), title: 'Договір підряду №14', kind: 'Договір', object: O[0].id, client: C[1].id, date: d(-125) },
    { id: id(), title: 'Проєкт будинку (архітектурна частина)', kind: 'Проєкт / креслення', object: O[0].id, date: d(-130) },
    { id: id(), title: 'Дозвіл на будівництво', kind: 'Дозвіл', object: O[0].id, date: d(-128) },
  ];

  const now = Date.now();
  const stamp = (l) => l.map((r, i) => ({ ...r, createdAt: now - (l.length - i) * 3600e3, updatedAt: now - (l.length - i) * 3600e3 }));
  return {
    meta: { created: new Date().toISOString(), version: 3, demo: true },
    settings: { company: 'БудМайстер', preset: 'construction', theme: 'classic' },
    data: { employees: stamp(E), clients: stamp(C), suppliers: stamp(S), objects: stamp(O), deals: stamp(deals), tasks: stamp(tasks), invoices: stamp(inv), expenses: stamp(exp), materials: stamp(M), equipment: stamp(Q), documents: stamp(docs) },
    log: [],
  };
}


/* ── app.js ── */
/* NovaCRM 3 — універсальна CRM: офлайн з флешки або на сервері */




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

})();
