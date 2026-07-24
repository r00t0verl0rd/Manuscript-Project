# TODO: Доработка — кнопка "ещё"/"more" и переименование about-btn → more-btn

## Шаги (все выполнены):

### 1. index.html
- [x] Переименовать `about-btn` → `more-btn` во всех атрибутах (id, data-i18n)
- [x] Добавить кнопку "ещё"/"more" внутри блока `#project-info` после `<p>` с `data-i18n="intent_more_btn"`

### 2. i18n.js
- [x] Добавить переводы для `intent_more_btn`: `"ещё"` (ru), `"more"` (en)
- [x] Переименовать ключ `about_btn` → `more_btn` в переводах

### 3. styles.css
- [x] Добавить/обновить стили для новой кнопки внутри `#project-info`, чтобы она располагалась справа

### 4. script.js
- [x] Вынести логику показа About в отдельную функцию `showAboutBlock`
- [x] Назначить `showAboutBlock` на обе кнопки: `#more-btn` (в хедере) и `#intent-more-btn` (в блоке намерения)
- [x] Переименовать `about-btn` → `more-btn` в JavaScript-логике
- [x] Переименовать `about-back-btn` → `more-back-btn` в JavaScript-логике

