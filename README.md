# Nassila website

**Live:** [https://nassila-web.vercel.app](https://nassila-web.vercel.app) (EN · [AR](https://nassila-web.vercel.app/ar))

Public marketing and documentation site for [Nassila](https://github.com/jamalesam93/Nassila) — bilingual (EN/AR), custom Next.js layout, hosted on Vercel.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

## Build

```bash
npm run build
npm start
```

## Deploy

Production: **https://nassila-web.vercel.app** (Vercel project `nassila-web`).

- **Vercel:** [github.com/jamalesam93/nassila-web](https://github.com/jamalesam93/nassila-web) → import, build `npm run build`
- **Netlify:** same; use the Next.js runtime plugin

`NEXT_PUBLIC_SITE_URL` is set to `https://nassila-web.vercel.app` on Vercel. Update it only if you add a custom domain later.

## Design

See [DESIGN-WEB.md](./DESIGN-WEB.md) — extends the desktop app's Impeccable discipline; no AI-template landing patterns.

## Content

- `content/docs/{en,ar}/` — user documentation (ported from Nassila `docs/`)
- `content/changelog/` — release summaries
- `public/media/` — product screenshots (replace placeholders with fresh v1.1 captures)
