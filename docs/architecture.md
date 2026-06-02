# Architecture

## Overview

Next.js 16 (App Router) + React 19 + TypeScript, exported as a **fully static
site** (`output: 'export'`). No server runtime: every page is prerendered to
HTML at build time, which is both the simplest thing to host (any static
host/CDN) and the strongest SEO posture (content is in the initial HTML).

```
next.config.mjs   output:'export' · trailingSlash:true · images.unoptimized:true
```

- **`trailingSlash: true`** → emits `out/story/index.html` etc., so directory‑index
  hosts serve clean URLs without rewrites. Canonicals and the sitemap use the
  matching trailing slash.
- **`images.unoptimized: true`** → the Image Optimization API needs a server,
  which static export doesn't have. We pre‑size/compress assets ourselves;
  `next/image` still provides width/height (CLS guard) + lazy loading.

## Routing

| File | URL |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/story/page.tsx` | `/story/` |
| `app/products/page.tsx` | `/products/` |
| `app/order/page.tsx` | `/order/` |
| `app/contact/page.tsx` | `/contact/` |
| `app/not-found.tsx` | `404.html` |
| `app/sitemap.ts` `robots.ts` `manifest.ts` | `/sitemap.xml` `/robots.txt` `/manifest.webmanifest` |
| `app/icon.png` `apple-icon.png` `favicon.ico` | auto‑linked favicons |

Metadata routes export `dynamic = 'force-static'` (required under `output: export`).

## Server vs client

Everything is a **Server Component** except three small client islands:

| Client island | Why |
| --- | --- |
| `components/chrome/SiteHeader.tsx` | Sticky‑nav scroll state, mobile drawer (open state, body‑scroll‑lock, Esc/focus‑trap), active link via `usePathname`. |
| `components/motion/RevealProvider.tsx` | One `IntersectionObserver` that adds `.in` to `[data-reveal]` with a staggered delay; respects `prefers-reduced-motion`. Mounted once in the layout. |
| `components/forms/ContactForm.tsx` | Composes a WhatsApp message from the fields on submit. |

Because pages/sections are server‑rendered, all meaningful content (headings,
copy, prices, contact info, JSON‑LD) is in the static HTML regardless of
hydration. Scroll‑reveal only animates; a `.no-js` CSS fallback (swapped to `.js`
by a tiny inline script) keeps content visible if JS never runs.

## Layout & composition

`app/layout.tsx` renders `<html lang="fa" dir="rtl">`, preloads the critical
Persian font subsets, imports `globals.css`, and mounts the chrome
(`SiteHeader` + `Footer`), the `RevealProvider`, and the site‑wide
Organization/WebSite JSON‑LD. Each page composes section components and adds its
own `metadata` and page‑specific JSON‑LD (Product / Breadcrumb / FAQ).

Shared building blocks live in `components/`:
- `sections/` — one component per design section (Hero, StoryTeaser, WhyGrid…).
- `ui/` — atoms (Button, Icon, Divider, Eyebrow, SectionHead, ImageFrame, ProductCard).

## Data flow

Content is centralized so it never drifts:

- `config/site.ts` — domain, brand, **all contact placeholders**.
- `config/products.ts` — the 6 products (one source for Home featured, Products
  page, and Product JSON‑LD).
- `config/nav.ts` — nav items (desktop + drawer).
- `lib/links.ts` — WhatsApp/Instagram/tel/Telegram/Basalam deep‑links.
- `lib/format.ts` — Persian digit + Toman formatting (deterministic).
- `lib/jsonld.ts` — JSON‑LD builders.

## Styling

The original `tala.css` design system was ported **verbatim** into
`app/styles/{tokens,base,components}.css` (+ `fonts.css`), imported once via
`app/globals.css`. JSX uses the original class names. See
[design-system.md](./design-system.md) for the few intentional changes
(Tweaks panel + image‑slot removed, theme defaults baked in).
