# Talha Arshad — Portfolio

Personal site for Talha Arshad, a software engineer in Pakistan. Dark mode keeps the neon-green look. A light theme is included, and the choice follows the system until it is saved.

Built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router, and lucide-react.

## Pages

- `/` Home
- `/about` About
- `/services` Services
- `/projects` Project list
- `/projects/:slug` Project detail
- `/ai` AI products
- `/skills` Skills
- `/contact` WhatsApp, Email, GitHub, and LinkedIn buttons
- `/faq` FAQ

Contact is icon-and-label buttons only. The phone number and email address live in the link targets, not as visible text. There is no contact form.

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
- SPA redirects for `/about`, `/services`, `/projects`, `/projects/*`, `/ai`, `/skills`, `/contact`, `/faq`, and a `/*` fallback to `/index.html` (status 200)

Connect the repository in Netlify and use the settings from that file. No environment variables are required. This project is not deployed from here.

## Theme

An inline script in `index.html` sets `data-theme` before paint, using the saved choice or `prefers-color-scheme`. The toggle stores the choice in `localStorage` as `theme` (`light` or `dark`).

## Portrait

The hero ID card uses `public/avatar/talha.webp` (WebP, 1086×1448). `src/components/Avatar.tsx` sets `width` and `height` to those pixels and alt text `Talha Arshad`. Replace that file to change the photo. Do not commit the original PNG.

## Mascot

Zoru is always shown, fixed at the bottom-right. There is no hide control. On a desktop pointer, the tip opens on hover and on click. On touch devices, tap opens it. Reduced-motion users get a static Zoru. The artwork files are:

- `public/mascot/zoru-chibi-512.webp` (323×512, used first)
- `public/mascot/zoru-chibi.png` (454×720 fallback)

GitHub, LinkedIn, Email, and WhatsApp clicks call `celebrateZoru()` from `src/lib/mascot.ts`. A round WhatsApp button sits at the bottom-left, away from Zoru.

## Figures

`src/data/stats.ts` holds the figures on the site. Projects delivered follows the project list. Satisfied clients stays hidden until a real number is set there.
