# Smooth Loading Implementation

## Changes Made

### 1. `i18n.js`
- ✅ Added `window.__i18nResolve()` callback after translations are applied — signals readiness to the page loader

### 2. `index.html`
- ✅ Added `<link rel="preload">` for YAML locale files so they start downloading earlier
- ✅ Replaced the old `fonts-loaded` logic with a `Promise.all` that waits for BOTH fonts AND translations before revealing content
- ✅ Added a subtle neon loader bar (`#loader-bar`) that animates while the page loads and fades out when content is ready
- ✅ Changed body class from `fonts-loaded` to `content-ready` with a smooth 0.45s opacity transition

### 3. No changes needed for `styles.css` or `script.js`
- The existing CSS animations and layout are unaffected
- The `DOMContentLoaded` logic in `script.js` already waits for `i18n.ready` before rendering ideas

## How it works

1. User visits the page → body starts with `opacity: 0` (hidden)
2. Loader bar animates at the top while both fonts and YAML translations load in parallel
3. Once **both** are done → body gets `content-ready` class → fades in smoothly with all text already populated
4. No more layout shifts or font style jumps

