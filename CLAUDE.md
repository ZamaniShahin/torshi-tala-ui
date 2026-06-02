# CLAUDE.md — ترشی طلا / Torshi Tala

Guidance for Claude (and developers) working in this repo.

## What this is

The marketing website for **ترشی طلا (Torshi Tala)** — a premium, home‑made Persian
_torshi_ (pickle) brand. Fully **Persian, RTL**, mobile‑first, aimed at an Iranian
audience. It is a 5‑page brochure site (Home, Story, Products, Order, Contact).
**There is no cart or online payment** — every "order" action deep‑links to
WhatsApp / Instagram / phone. **SEO is the top priority.**

The visual design was delivered as a finished static bundle (`Torshi Tala.zip`)
and has been reproduced **pixel‑faithfully**. Treat the original `tala.css` /
markup as canonical for look‑and‑feel.

## Stack

- **Next.js 16 (App Router) + React 19 + TypeScript** (strict).
- **Static export** (`output: 'export'` in `next.config.mjs`) → builds to `out/`,
  hostable on any static host/CDN. No server runtime.
- **Self‑hosted fonts** (Vazirmatn + Lalezar, SIL OFL) via `@font-face` in
  `app/styles/fonts.css`, files in `public/fonts/`. No Google Fonts request
  (it is unreliable in Iran).
- **`next/image`** with `unoptimized: true` (static export); images are pre‑sized.
- Plain global CSS (the ported design system) — **no Tailwind / CSS Modules**.

## Project layout

```
app/                 App Router: layout.tsx (chrome + root metadata + JSON-LD),
                     page.tsx + story|products|order|contact/page.tsx,
                     sitemap.ts robots.ts manifest.ts not-found.tsx,
                     icon.png apple-icon.png favicon.ico (auto icons),
                     globals.css + styles/{fonts,tokens,base,components}.css
components/  chrome/ (SiteHeader=client nav+drawer, Footer)
             sections/ (Hero, TrustMarquee, StoryTeaser, FeaturedProducts, WhyGrid,
                        CtaBand, PageHead, StoryBody, ProcessStrip, Channels,
                        OrderSteps, ContactList, ProductNote)
             ui/ (ProductCard, Button, Eyebrow, Divider, SectionHead, Icon, ImageFrame)
             motion/ (RevealProvider = client IntersectionObserver)
             forms/ (ContactForm = client, composes a WhatsApp message)
             seo/ (JsonLd)
config/      site.ts (★ all placeholders), products.ts (★ the 6 products), nav.ts
lib/         links.ts (deep-links), format.ts (Persian digits/Toman), jsonld.ts
public/      images/ (logo + photos + products/), fonts/ (woff2 + OFL), icons/, og/
scripts/     gen-assets.mjs, gen-og.mjs (sharp — regenerate images/icons/OG)
assets-src/  source-photo.png (generation source; NOT shipped)
docs/        full documentation set (start at docs/README.md)
```

## Conventions

- **Server‑first.** Pages and sections are Server Components so all content is in
  the static HTML (crawlable). Only four client islands: `SiteHeader`,
  `RevealProvider`, `ContactForm`, and they exist for interactivity only.
- **All copy that changes per‑owner lives in `config/`** — never hard‑code a
  phone number, handle, price, or the domain in a component. See
  `docs/content-and-placeholders.md`.
- **Persian digits are literal text** (e.g. `۱۳۷۴`); numeric formatting uses
  `lib/format.ts` (deterministic — no `toLocaleString`, no hydration mismatch).
- **One `<h1>` per page** (Hero on Home; PageHead on inner pages).
- **Reproduce the design faithfully.** Reuse existing classes from
  `app/styles/*`; don't restyle. The chosen theme (gold `#AE7A1C`, Lalezar
  headings, cream bg) is baked into `:root`.
- Internal links use `next/link`; external (`wa.me`/Instagram/`tel:`) use the
  helpers in `lib/links.ts` and open in a new tab with `rel="noopener noreferrer"`.

## Commands

```bash
npm run dev         # local dev (http://localhost:3000)
npm run build       # production build → static export in out/
npm run preview     # serve the exported out/ locally
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run format      # prettier --write
node scripts/gen-assets.mjs   # regenerate images/icons from assets-src + logo
node scripts/gen-og.mjs       # regenerate the OG share image
```

## Before launch

Fill every `// PLACEHOLDER` in `config/site.ts` (owner name, Instagram/WhatsApp/
phone, city, domain), confirm prices in `config/products.ts`, and drop real
product photos into `public/images/products/<slug>.webp` (same filenames). Full
checklist: `docs/content-and-placeholders.md`.

## SEO (do not regress)

Per‑page `metadata` (unique fa title+description, self‑canonical), `sitemap.ts`,
`robots.ts`, JSON‑LD (Organization/FoodEstablishment + WebSite site‑wide;
Product on /products; Breadcrumb on inner pages; FAQ on /order), OG image,
self‑hosted preloaded fonts, one `<h1>`/page, Persian `alt` text. Details +
verification steps: `docs/seo.md`.
