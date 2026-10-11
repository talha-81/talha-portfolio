# Talha Arshad — Portfolio

Personal site for Talha Arshad, a software engineer in Pakistan. Dark layout inspired by the Zedian portfolio template: neon green on slate, a draggable ID badge, and a stacking project deck.

Built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and lucide-react.

## Run locally

```bash
npm install
npm run dev
```

The dev server is [http://127.0.0.1:4731](http://127.0.0.1:4731).

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` typechecks with `tsc -b`, then writes the static site to `dist/`.

## Deploy on Netlify

The repo includes `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: `/*` → `/index.html` (status 200), so a refreshed path still serves the app

Connect the repository in Netlify and use the settings from that file. No environment variables are required. This project is not deployed from here.

## Portrait

The hero ID card uses `public/avatar/talha.webp` (WebP, 1086×1448). `src/components/Avatar.tsx` sets `width` and `height` to those pixels and alt text `Talha Arshad`. Replace that file to change the photo. Do not commit the original PNG.

## Mascot

Zoru sits fixed at the bottom-right. Talha is the site owner. The artwork files are:

- `public/mascot/zoru-chibi-512.webp` (323×512, used first)
- `public/mascot/zoru-chibi.png` (454×720 fallback)

The hide choice is stored in `localStorage` as `zoru-mascot-hidden`. A future contact form can call `celebrateZoru()` from `src/lib/mascot.ts` after a successful send. GitHub and LinkedIn clicks fire that jump for now.
