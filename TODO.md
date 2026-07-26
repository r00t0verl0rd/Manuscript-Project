# TODO: Fixes

## Task 1: Auto-detect browser language for i18n
- [x] Read relevant files and understand the code
- [x] Get plan approved by user
- [x] Edit `i18n.js`: replace hardcoded `"ru"` default with `navigator.language` detection
- [x] Edit `i18n.js`: change `setLanguage` fallback from `"ru"` to `"en"`

## Task 2: Fix FOUT (Flash of Unstyled Text) — smooth loading
- [x] Edit `styles.css`: remove `@import url(...)` for Google Fonts
- [x] Edit `index.html`: add `<link rel="preconnect">` for fonts.googleapis.com and fonts.gstatic.com
- [x] Edit `index.html`: add `<link>` for Google Fonts (replaces CSS `@import`)
- [x] Edit `index.html`: add inline `<style>` with `body { opacity: 0 }` and `body.fonts-loaded { opacity: 1 }`
- [x] Edit `index.html`: add inline `<script>` to show body after fonts are loaded via `document.fonts.ready`

