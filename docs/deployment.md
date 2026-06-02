# Deployment

The site builds to a folder of static files. Host it anywhere that serves static
content.

## Build

```bash
npm run build      # → out/
```

`out/` contains `index.html`, `story/order/products/contact/index.html`,
`404.html`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, the icons, the
OG image, hashed `_next/static/*`, and everything from `public/`.

Smoke‑test locally before deploying:

```bash
npm run preview    # serves out/ at a local URL
```

## Set the domain first

In `config/site.ts`, set `domain` to the real origin (no trailing slash) **before
building** — it drives canonical URLs, the sitemap, robots, and OG/Twitter image
URLs. Rebuild after changing it.

## Hosting (Iran audience)

Because the output is plain static files, portability is total. For an Iranian
audience, prefer an **Iran‑reachable static host/CDN**:

- **ArvanCloud** (object storage + CDN), **Liara** (static hosting), **ParsPack**,
  or any VPS with **Nginx** serving `out/`.
- **Avoid Vercel/Netlify for production here** — both are frequently inaccessible
  from inside Iran (for visitors and operators). You can keep a mirror abroad.

Nginx sketch (with `trailingSlash: true`, files are directory indexes):

```nginx
server {
  listen 80;
  server_name torshitala.ir www.torshitala.ir;
  root /var/www/torshi-tala/out;
  index index.html;
  location / { try_files $uri $uri/ $uri.html =404; }
  error_page 404 /404.html;
}
```

Serve over HTTPS, and make sure the CDN/host does **not** block Googlebot or
inject an `X-Robots-Tag: noindex` header (some Iranian CDNs have aggressive bot
rules — allowlist Googlebot/Bingbot).

## Post‑deploy SEO

1. Confirm `https://<domain>/robots.txt` and `/sitemap.xml` load and the URLs use
   the trailing slash.
2. Add the property in **Google Search Console** (DNS‑TXT verification is most
   robust on a ccTLD) and **submit the sitemap**.
3. Run the verification checklist in [seo.md](./seo.md) (Lighthouse, Rich Results
   Test, schema validator, social‑card debuggers).
4. Make sure the brand's Instagram / Telegram / Basalam profiles link back
   (reinforces the `sameAs` graph).
