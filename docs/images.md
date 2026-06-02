# Images & Assets

## Filename convention (`public/images/`)

The owner swaps in real photos by **overwriting these files, keeping the names**:

| File | Aspect | Suggested size | Used by |
| --- | --- | --- | --- |
| `hero-jar.webp` | 4:5 | ~1000×1250 | Home hero (LCP, `priority`) |
| `home-hands.webp` | 5:6 | ~1000×1200 | Home story teaser |
| `story-hero.webp` | 16:9 | ~1600×900 | Story page banner |
| `products/lite.webp` | 4:3 | ~800×600+ | ترشی لیته (+ Home featured) |
| `products/mix.webp` | 4:3 | ~800×600+ | ترشی مخلوط (+ Home featured) |
| `products/bademjan.webp` | 4:3 | ~800×600+ | ترشی بادمجان (+ Home featured) |
| `products/sir.webp` | 4:3 | ~800×600+ | ترشی سیر |
| `products/khiar.webp` | 4:3 | ~800×600+ | خیار شور |
| `products/felfel.webp` | 4:3 | ~800×600+ | ترشی فلفل |
| `logo-mark.png` | — | (provided) | nav, footer, watermark, icons |

`alt` text lives in code: product alts in `config/products.ts`; hero/story alts
in the section components. Keep them descriptive and Persian. Decorative marks
(footer watermark, CTA mark) use `alt=""`.

## Current state (placeholders)

The only real artwork provided is the gold line‑drawing (hands cradling a jar) +
the logo mark. Today:

- **hero / home‑hands / story‑hero** are framed crops of that artwork (look
  finished; replace with real photos when available).
- **6 product tiles** are on‑brand placeholders (cream + faint logo watermark +
  gold hairline). Replace each with a real product photo (same filename).

## next/image under static export

`images.unoptimized: true` is required (no optimization server). `ui/ImageFrame`
renders `next/image` with `fill` inside the design's aspect‑ratio frame, so
images never cause layout shift (CLS ≈ 0). The hero is `priority`; the rest lazy.
**Pre‑size and compress** replacement photos (export WebP at the sizes above) —
the build won't resize them for you.

## Regenerating derived assets

Source artwork is in `assets-src/source-photo.png` (not shipped). The scripts use
**sharp** (devDependency):

```bash
node scripts/gen-assets.mjs   # hero/story crops, 6 product placeholders, full icon set + favicon.ico
node scripts/gen-og.mjs       # the 1200×630 Open Graph image (Persian text baked in)
```

`gen-assets.mjs` samples the artwork's cream background so framed crops are
seamless, and produces `app/icon.png` / `app/apple-icon.png` / `app/favicon.ico`
plus `public/icons/icon-{192,512}.png` and `icon-maskable-512.png`.
