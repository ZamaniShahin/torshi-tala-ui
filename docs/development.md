# Development

## Prerequisites

Node ≥ 18.18 (built/tested on Node 24). npm.

## Setup

```bash
npm install
```

## Scripts

| Command | What |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:3000 (Turbopack). |
| `npm run build` | Production build → static export in `out/`. |
| `npm run preview` | Serve the exported `out/` locally (`npx serve out`). |
| `npm run lint` | ESLint (flat config, `eslint-config-next`). |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run format` / `format:check` | Prettier. |
| `node scripts/gen-assets.mjs` | Regenerate images + icons (sharp). |
| `node scripts/gen-og.mjs` | Regenerate the OG image. |

## Conventions

- **Server‑first.** Add a `'use client'` component only when you need
  interactivity. The current client components are `SiteHeader`,
  `RevealProvider`, `ContactForm`.
- **Content lives in `config/`.** Don't hard‑code contact details, prices, or the
  domain in components.
- **Persian digits are literal** in copy; use `lib/format.ts` for numbers/prices.
- **Reuse the design classes** in `app/styles/*`; don't invent new styling.
- **One `<h1>` per page.**
- Internal links → `next/link`; external → helpers in `lib/links.ts` with
  `target="_blank" rel="noopener noreferrer"`.

## How to… add a product

Edit `config/products.ts`: add an object `{ slug, name, description, priceToman,
image: '/images/products/<slug>.webp', alt, width: 800, height: 600 }` and set
`featured: true` if it should appear on the Home grid (Home shows the featured
ones). Drop a `public/images/products/<slug>.webp`. The Products page, Home grid,
and Product JSON‑LD update automatically.

## How to… change copy

- Brand/contact/owner name → `config/site.ts`.
- Nav labels → `config/nav.ts`.
- Section prose → the relevant component in `components/sections/`.

## Reveal animations

Add `data-reveal` (and optionally `data-reveal-group="N"` for stagger) to an
element; `RevealProvider` animates it in on scroll. Content stays visible without
JS (CSS `.no-js` fallback) and with `prefers-reduced-motion`.

## Notes

- ESLint flags `setState` inside an effect; the drawer closes via link `onClick`,
  not a route‑change effect.
- Metadata routes (`sitemap`/`robots`/`manifest`) export `dynamic = 'force-static'`
  — required by `output: 'export'`. Keep it when editing them.
