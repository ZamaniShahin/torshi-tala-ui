# Torshi Tala — Documentation

Documentation for the **ترشی طلا (Torshi Tala)** website — a premium, home‑made
Persian torshi brand. Built with Next.js (App Router, TypeScript), exported as a
fully static site, RTL Persian, SEO‑first.

## Start here

| Doc | What it covers |
| --- | --- |
| [content-and-placeholders.md](./content-and-placeholders.md) | **Pre‑launch checklist** — every placeholder and exactly where to edit it. Read this first before going live. |
| [development.md](./development.md) | Install, run, scripts, conventions, how to add a product. |
| [architecture.md](./architecture.md) | Project structure, App Router layout, server/client split, data flow. |
| [seo.md](./seo.md) | The full SEO implementation (metadata, sitemap/robots, JSON‑LD, OG, perf, a11y) + how to verify. |
| [design-system.md](./design-system.md) | Tokens, colors, fonts (sources + licenses), the component map, what was changed from the original. |
| [images.md](./images.md) | Image specs, the `/public/images` filename convention, and how to swap in real photos. |
| [deployment.md](./deployment.md) | Build → `out/`, hosting (Iran‑friendly options + Vercel caveats), post‑deploy SEO. |
| [decisions.md](./decisions.md) | The key engineering decisions and why. |

## At a glance

- **Pages:** Home (`/`), Story (`/story/`), Products (`/products/`), Order (`/order/`), Contact (`/contact/`).
- **No backend:** orders go to WhatsApp / Instagram / phone via deep‑links.
- **Build:** `npm run build` → static site in `out/` → upload anywhere.
- **One place for content:** `config/site.ts` and `config/products.ts`.
