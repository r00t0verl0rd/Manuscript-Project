# Manuscript Project

Manuscript is an experimental idea-sharing interface at https://manuscript.world.

The current frontend uses React, Vite and CSS. It includes a lightweight Canvas 2D particle network, solar scenery and animated botanical SVGs. Wallet connection, minting and on-chain voting are demonstrations, not active blockchain features.

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Verify changes

```bash
npm test
npm run build
```

## Deployment and branches

`main` is the single source-of-truth branch.

`.github/workflows/pages.yml` tests the app in Chrome at mobile, tablet and desktop widths, builds it, and publishes `index.html` and `assets/` to `main` for GitHub Pages.

GitHub Pages must be configured as **Settings → Pages → Deploy from a branch → main → /(root)**. The custom domain is `manuscript.world`.

All new commits go to `main`, with descriptive English commit titles.
