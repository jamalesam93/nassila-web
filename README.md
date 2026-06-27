# Nassila website

Public marketing and documentation site for [Nassila](https://github.com/jamalesam93/Nassila) — bilingual (EN/AR), custom Next.js layout, deployable to Vercel or Netlify.

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

- **Vercel:** import repo, framework preset Next.js, build `npm run build`
- **Netlify:** same; publish directory `.next` with Next.js runtime plugin or use `next start` on supported plans

Set `NEXT_PUBLIC_SITE_URL` when you attach a custom domain (optional, for absolute URLs later).

## Design

See [DESIGN-WEB.md](./DESIGN-WEB.md) — extends the desktop app's Impeccable discipline; no AI-template landing patterns.

## Content

- `content/docs/{en,ar}/` — user documentation (ported from Nassila `docs/`)
- `content/changelog/` — release summaries
- `public/media/` — product screenshots (replace placeholders with fresh v1.1 captures)
