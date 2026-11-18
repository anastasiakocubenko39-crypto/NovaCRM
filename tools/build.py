"""Збирає модулі assets/js/*.js в один файл assets/novacrm.js (звичайний скрипт),
щоб програма відкривалась з флешки (file://), де браузери блокують ES-модулі.
Запуск: python3 tools/build.py"""
import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
order = ['ui', 'schema', 'store', 'demo', 'app']
out = ['/* NovaCRM 3 — зібраний файл. Не редагуйте вручну: змініть assets/js/*.js і запустіть tools/build.py */', '(function () {', "'use strict';"]
for name in order:
    s = (root / 'assets' / 'js' / f'{name}.js').read_text(encoding='utf-8')
    s = re.sub(r'^import [^;]+;\s*$', '', s, flags=re.M)
    s = re.sub(r'^export (const|function|class|async function|let) ', r'\1 ', s, flags=re.M)
    out.append(f'\n/* ── {name}.js ── */\n' + s)
out.append('})();\n')
(root / 'assets' / 'novacrm.js').write_text('\n'.join(out), encoding='utf-8')
print('built', (root / 'assets' / 'novacrm.js').stat().st_size // 1024, 'KB')
