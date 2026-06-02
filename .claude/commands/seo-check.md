---
description: Sanity-check the SEO essentials on the built site
---

After `npm run build`, verify SEO on the exported HTML in `out/` (and fix any
regression you find):

- **Exactly one `<h1>`** per page.
- Each page has an absolute, self-referential `<link rel="canonical">` with a
  trailing slash matching the route.
- `<html lang="fa" dir="rtl">`; `og:title` / `og:description` / `og:image` and
  `og:locale=fa_IR`; `twitter:card`; `theme-color`; `manifest` link.
- **JSON-LD** present: Organization/FoodEstablishment + WebSite site-wide;
  `Product` ×6 on `/products`; `BreadcrumbList` on inner pages; `FAQPage` on
  `/order`. Product `offers.priceCurrency` is `IRR` with a numeric `price`.
- All content images have descriptive Persian `alt`; decorative ones `alt=""`.
- Fonts are **preloaded and self-hosted** — no request to `fonts.googleapis.com`.
- `robots.txt` and `sitemap.xml` are reachable and trailing-slash consistent.

Then validate externally: Lighthouse (mobile), Google Rich Results Test,
`validator.schema.org`, and a social-card debugger. See `docs/seo.md`.

Finally, remind the user to fill the placeholders in `config/site.ts` before
launch (see `docs/content-and-placeholders.md`).
