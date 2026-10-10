# Manuscript — React migration

This branch moves the existing Manuscript demo to **React 19 + Vite 7** without changing the RU/EN translation files, texts, demo idea values, sorting modes, wallet/voting alerts, navigation, or browser-language selection.

## Run

Requires Node.js 22 (or supported Vite 7 Node.js release).

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

The Vite build writes static assets to `dist/`. Deploy **the contents of dist**, not the repository root. For GitHub Pages, the `dist/CNAME` file preserves the custom domain. For Vercel, set framework preset **Vite**, build command `npm run build`, and output directory `dist`. Do not switch the production deployment before confirming the preview.

## Source layout

- `src/main.jsx`: React UI, content panels, voting buttons, navigation, locale selection
- `src/data.js`: original demo data and sorting
- `src/react-polish.css`: lightweight design finishing
- `styles.css`, `partners.css`, `solar-biopunk.css`: current solar-spring look
- `locales/ru.json`, `locales/en.json`: original **unchanged** dictionaries
- `tests/data.test.js`: content, keys, ideas, sorting parity
- `.github/workflows/react-check.yml`: CI test and production build

The old `script.js`, `i18n.js`, and `particles-config.js` remain in the repository as migration reference, but are **not loaded** by the new entrypoint. Botanical vectors, CSS gradients, and accessible native interactions replace the particle dependency with less moving work.

## Deployment note

The existing `main` branch still serves the original site. Merging this branch changes the root `index.html` to a Vite source entrypoint. If production serves raw GitHub files, it **must** first be reconfigured to serve built `dist/` output. The PR is deliberately separate from production until CI and visual/browser checks pass.
