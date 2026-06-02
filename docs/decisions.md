# Decisions (ADR‑style)

Short log of the key engineering decisions and why.

## 1. Next.js (App Router, TS) exported as a fully static site

**Decision:** Build with Next.js 16 App Router + TypeScript and `output: 'export'`.
**Why:** The owner wanted a maintainable, SEO‑friendly Next.js/React project.
The site is 5 static pages with no server logic, so static export gives the best
of both: component reuse + a great metadata/SEO toolchain at dev time, and plain
prerendered HTML at runtime that any host serves (critical for Iran, where
Vercel/Netlify are unreliable). `trailingSlash: true` for clean directory‑index
URLs; `images.unoptimized: true` because the optimizer needs a server.

## 2. Self‑hosted fonts (no Google Fonts)

**Decision:** Serve Vazirmatn + Lalezar from `public/fonts/` via `@font-face`.
**Why:** Google Fonts is frequently throttled/blocked in Iran; a render‑blocking
external font request would hurt the mobile‑first Iranian audience. Self‑hosting
(SIL OFL fonts) is faster and works offline. Manual `@font-face` (rather than
`next/font`) keeps the design's existing `"Vazirmatn"`/`"Lalezar"` family
references working unchanged and lets us subset correctly (arabic/latin/latin‑ext
with `unicode-range`).

## 3. No backend — deep‑link ordering

**Decision:** Orders and the contact form deep‑link to WhatsApp (prefilled
Persian message), Instagram, and `tel:`; no cart, payment, or server.
**Why:** Matches how the business actually takes orders (DM/WhatsApp/phone) and
keeps the site 100% static. Product "سفارش" buttons name the product in the
WhatsApp prefill; the contact form composes a message client‑side. All
identifiers come from `config/site.ts`.

## 4. Remove the design‑tool runtime; bake the theme

**Decision:** Strip the "Tweaks" panel and the `<image-slot>` custom element from
the delivered design; bake the chosen theme (gold `#AE7A1C`, Lalezar headings,
cream bg, radius 12) into `:root`.
**Why:** Those were authoring‑tool plumbing (postMessage/localStorage, drag‑drop
image placeholders), not production features. Images became `next/image` inside
the design's aspect‑ratio frames (`ui/ImageFrame`); scroll‑reveal became one
`IntersectionObserver` (`RevealProvider`) preserving the original timings, with a
`.no-js` fallback.

## 5. Placeholder domain + centralized content

**Decision:** `https://torshitala.ir` is a single config value; all owner‑specific
content (name, handles, numbers, prices, city) lives in `config/`.
**Why:** One place to update before launch; nothing to hunt for across
components. See [content-and-placeholders.md](./content-and-placeholders.md).

## 6. Global CSS port (no Tailwind / CSS Modules)

**Decision:** Port `tala.css` verbatim into global style partials and reuse the
original class names.
**Why:** The design is a cohesive, hand‑tuned system built on CSS custom
properties. Re‑authoring 900 lines into Tailwind/Modules would risk visual drift
and lose the token cascade for zero user benefit on a 5‑page site. Faithful
reproduction was the explicit requirement.
