---
description: Build the site and confirm the static export is complete
---

Run `npm run build`, then verify the static export:

1. Confirm the build completes with no errors (and no TypeScript/lint failures —
   run `npm run typecheck` and `npm run lint` too if in doubt).
2. Confirm these files exist under `out/`:
   - `index.html`, `story/index.html`, `products/index.html`, `order/index.html`,
     `contact/index.html`, `404.html`
   - `robots.txt`, `sitemap.xml`, `manifest.webmanifest`
   - `favicon.ico`, `icon.png`, `apple-icon.png`, `og/torshi-tala-og.png`
3. Report any missing file or build error. If the build fails, diagnose and fix
   the **root cause** (don't paper over it).

Reminder: metadata routes (`sitemap`/`robots`/`manifest`) must keep
`export const dynamic = 'force-static'` — required by `output: 'export'`.
