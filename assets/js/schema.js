/* Опис розділів CRM: поля, списки, статуси.
   Назви розділів можна змінити в config.js (terms), а непотрібні розділи — вимкнути (modules). */

export const STATUS_COLORS = { ok: 'ok', warn: 'warn', bad: 'bad', info: 'info', mute: 'mute' };

export const ENTITIES = {
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

export const GROUPS = [
  ['sales', 'Продажі'], ['work', 'Роботи'], ['money', 'Фінанси'], ['resources', 'Ресурси'], ['other', 'Інше'],
];

/* Що показувати в заголовку запису */
export const titleOf = (ent, r) => (r ? r.name || r.title || r.number || r.notes || r.category || '—' : '—');
