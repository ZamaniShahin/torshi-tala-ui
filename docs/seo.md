# SEO

SEO is the top priority for this site. Here's what's implemented and how to verify it.

## Foundations

- **Static prerendered HTML** — all content is in the initial HTML (no client
  rendering needed to see it). Strongest possible crawlability.
- **`<html lang="fa" dir="rtl">`**, single locale `fa-IR`. No `hreflang`
  (single language/region — it would be noise). `og:locale = fa_IR`.
- **One `<h1>` per page**, logical heading order, descriptive Persian `alt` on
  content images, decorative images `alt=""`.
- **Self‑hosted, preloaded fonts** (no Google Fonts request) — see
  [design-system.md](./design-system.md) and the Performance section below.

## Per‑page metadata (App Router Metadata API)

Root defaults live in `app/layout.tsx` (`metadataBase`, title template
`%s — ترشی طلا`, default description, keywords, OpenGraph, Twitter, robots,
manifest). Each page overrides `title` / `description` and pins a
self‑referential `canonical` (with trailing slash):

| Page | Title | Canonical |
| --- | --- | --- |
| Home | `ترشی طلا — طلای سر سفره \| ترشی خانگی و دست‌ساز` | `/` |
| Story | `داستان ما — ترشی طلا` | `/story/` |
| Products | `محصولات \| لیست قیمت ترشی خانگی — ترشی طلا` | `/products/` |
| Order | `سفارش \| چطور ترشی خانگی سفارش بدهیم؟ — ترشی طلا` | `/order/` |
| Contact | `تماس با ما — ترشی طلا` | `/contact/` |

Descriptions target real Iranian search intent (ترشی خانگی، خرید ترشی دست‌ساز،
ترشی لیته خانگی، لیست قیمت ترشی، خیار شور خانگی).

## sitemap.xml / robots.txt

- `app/sitemap.ts` → 5 URLs, trailing‑slash, priorities Home 1.0 → Products 0.9
  → Order 0.8 → Story 0.6 → Contact 0.5.
- `app/robots.ts` → allow all, references `…/sitemap.xml`, sets `host`.

## Structured data (JSON‑LD)

Injected via `components/seo/JsonLd.tsx`, built in `lib/jsonld.ts`:

- **Site‑wide** (in the layout, on every page): a `@graph` with
  `["Organization","FoodEstablishment"]` (name, logo, image, slogan,
  `foundingDate`, `servesCuisine: Persian`, `priceRange`, `areaServed: Iran`,
  city‑level address, `contactPoint`, `sameAs`), a `Brand`, and a `WebSite`
  (`inLanguage: fa-IR`). No fake `SearchAction`.
- **/products** — one `Product` per item with an `Offer`. **Currency:** Toman is
  not ISO‑4217, so prices are encoded in **IRR (Rial) = Toman × 10**, Western
  digits, no separators (e.g. `180000` Toman → `"1800000"`). `availability:
  InStock`, `itemCondition: NewCondition`, `seller` → the business, `url` →
  `/order/`. No `priceValidUntil`, **no fabricated ratings/reviews**.
- **Inner pages** — `BreadcrumbList` (Home → page).
- **/order** — `FAQPage` whose Q&A mirror the visible on‑page content.

## Icons / manifest / Open Graph

- Favicons from the logo via App‑Router auto icons (`app/icon.png`,
  `app/apple-icon.png`, `app/favicon.ico`). Manifest icons (192/512/maskable) in
  `public/icons/`.
- `app/manifest.ts` → `/manifest.webmanifest` (`lang: fa-IR`, `dir: rtl`,
  cream `background_color`, gold `theme_color`).
- `public/og/torshi-tala-og.png` — 1200×630 branded card (logo + Persian brand
  name in Lalezar + tagline). Static (the runtime OG generator can't run under
  export). Regenerate with `node scripts/gen-og.mjs`.

## Performance (Core Web Vitals, mobile Iran)

- **Fonts self‑hosted** (`@font-face`, `font-display: swap`); the above‑the‑fold
  Persian subsets are `<link rel="preload">`ed in the layout. **No request to
  `fonts.googleapis.com`** (it's throttled/blocked in Iran).
- **Hero image** uses `priority` + fixed aspect‑ratio frame (LCP fast, CLS ≈ 0);
  all other images are lazy inside aspect‑ratio frames.
- Minimal client JS (three small islands); everything else is static HTML/CSS.

## Accessibility (SEO‑adjacent)

Skip‑to‑content link, `:focus-visible` gold outline, `prefers-reduced-motion`
disables marquee/reveals, ≥44px tap targets, labelled form fields, `aria-*` on
the nav/drawer.

## Iran‑specific notes

- Keep the `.ir` ccTLD (a local‑relevance signal). Host on an Iran‑reachable
  static host/CDN — see [deployment.md](./deployment.md). Verify the CDN doesn't
  block Googlebot or inject `X-Robots-Tag`.
- Register the property in Google Search Console (DNS‑TXT verification is most
  robust) and submit the sitemap.

## Verification checklist

After `npm run build` (and after deploy):

1. **Static output** — `out/` has `index.html` + `story|products|order|contact/index.html`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `favicon.ico`, `icon.png`, `apple-icon.png`, `og/torshi-tala-og.png`, `404.html`.
2. **View‑source each page** — exactly one `<h1>`; absolute self‑canonical;
   `og:title/description/image`, `og:locale=fa_IR`; `<html lang="fa" dir="rtl">`;
   `theme-color`; JSON‑LD `<script type="application/ld+json">` present.
3. **Lighthouse (mobile)** — target SEO 100, Accessibility ≥95, CLS≈0, fast LCP.
4. **Google Rich Results Test** — Home (Org/FoodEstablishment + WebSite),
   Products (6 Products + Breadcrumb), Order (FAQ + Breadcrumb) → 0 errors.
5. **`validator.schema.org`** — `priceCurrency: "IRR"` with numeric `price`.
6. **Social cards** — Facebook Sharing Debugger / paste the URL into Telegram or
   WhatsApp → the 1200×630 OG renders with Persian text.
7. **robots/sitemap reachable** and trailing‑slash‑consistent with the pages.
8. **Network audit (DevTools)** — no request to `fonts.googleapis.com`; fonts
   load locally and the critical woff2 is preloaded.
