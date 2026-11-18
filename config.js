/* NovaCRM — налаштування під компанію.
   Більшість цього можна змінити і в самій програмі: «Налаштування» → «Компанія».
   Тут — значення за замовчуванням для нової бази. */
window.NOVA_CONFIG = {
  brand: 'NovaCRM',
  company: 'Моя компанія',
  /* Готові набори розділів і назв:
     construction — будівельна компанія (об’єкти, техніка, склад матеріалів)
     general      — будь-яка компанія послуг або продажів (проєкти замість об’єктів, без техніки) */
  preset: 'construction',
  /* Тема: classic (білий, коричневий, червоний), graphite, navy, forest — або власні кольори в налаштуваннях */
  theme: 'classic',
  autoLockMinutes: 15,
  currency: '₴',
};

window.NOVA_PRESETS = {
  construction: {
    name: 'Будівельна компанія',
    modules: ['clients', 'deals', 'objects', 'tasks', 'invoices', 'expenses', 'materials', 'equipment', 'employees', 'suppliers', 'documents'],
    terms: {},
  },
  general: {
    name: 'Компанія послуг / продажів',
    modules: ['clients', 'deals', 'objects', 'tasks', 'invoices', 'expenses', 'materials', 'employees', 'suppliers', 'documents'],
    terms: { objects: 'Проєкти', 'objects.one': 'Проєкт', materials: 'Товари', 'materials.one': 'Товар', suppliers: 'Постачальники', 'objects.foreman': 'Керівник проєкту', 'objects.client': 'Клієнт', 'objects.stages': 'Етапи', 'objects.kind': 'Тип проєкту' },
  },
};

window.NOVA_THEMES = {
  classic: { name: 'Класика: білий, коричневий, червоний', bg: '#FBF8F4', surface: '#FFFFFF', ink: '#2B1E16', brand: '#6B4226', accent: '#B3261E' },
  graphite: { name: 'Графіт', bg: '#F6F6F5', surface: '#FFFFFF', ink: '#1E1E1E', brand: '#2F3437', accent: '#D9480F' },
  navy: { name: 'Синій', bg: '#F5F7FA', surface: '#FFFFFF', ink: '#14213D', brand: '#1F3A68', accent: '#C1121F' },
  forest: { name: 'Зелений', bg: '#F6F8F5', surface: '#FFFFFF', ink: '#1C2A1E', brand: '#2D5A3D', accent: '#B5651D' },
};
