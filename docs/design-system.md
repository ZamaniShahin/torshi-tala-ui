# Design System

The visual design was delivered as a finished static bundle and is reproduced
**pixel‑faithfully**. The original `tala.css` is the canonical reference.

## Where it lives

`app/styles/` (imported once via `app/globals.css`):

| File | Contents |
| --- | --- |
| `fonts.css` | Self‑hosted `@font-face` for Vazirmatn + Lalezar. |
| `tokens.css` | `:root` design tokens (colors, radius, type vars, motion, container). |
| `base.css` | Reset, body, type scale, buttons, eyebrow/divider motifs, cards, reveal, marquee, utilities, a11y (skip‑link, focus). |
| `components.css` | Nav/drawer, footer, hero, story teaser, product grid/card, why grid, order channels, contact, CTA band, page head, story page, process strip. |

JSX uses the **original class names** (`class` → `className`), so the markup maps
1:1 to the design.

## Tokens (from `tokens.css`)

| Token | Value | |
| --- | --- | --- |
| `--gold` | `#AE7A1C` | primary accent |
| `--gold-light` / `--gold-deep` | `#C9A24E` / `#8A5F12` | |
| `--aubergine` | `#5E2A44` | footer / IG badge |
| `--ink` | `#3A2A1E` | warm charcoal text |
| `--muted` | `#7C6A4E` | secondary text |
| `--cream` / `--cream-2` | `#FAF4E6` / `#F3E9D2` | page / deep sections |
| `--surface` | `#FFFDF8` | cards |
| `--radius` | `12px` | baked default |
| reveal | `--reveal-y: 28px`, `--reveal-dur: 820ms`, ease `cubic-bezier(.16,1,.3,1)`, stagger group×90ms | |

## Fonts

Self‑hosted (Google Fonts is unreliable in Iran). Both **SIL OFL 1.1** — license
copies in `public/fonts/Vazirmatn-OFL.txt` and `Lalezar-OFL.txt`.

| Family | Use | Weights | Source |
| --- | --- | --- | --- |
| **Vazirmatn** | body (`--font-body`) | variable 100–900 | `@fontsource-variable/vazirmatn` |
| **Lalezar** | display/hero (`--font-hero`) | 400 | `@fontsource/lalezar` |

The woff2 subset files (arabic + latin + latin‑ext) were copied from the
`@fontsource` packages into `public/fonts/`, and declared with matching
`unicode-range` in `fonts.css`. Because the family names (`Vazirmatn`,
`Lalezar`) match what the design tokens already reference, **no token rewiring
was needed**. The arabic subsets (Persian glyphs + Persian digits + ZWNJ) are
preloaded in `app/layout.tsx`. **Markazi Text was dropped** — it was only used by
the removed Tweaks panel.

> The `@fontsource` packages remain as devDependencies for provenance/updates;
> the served fonts are the committed copies in `public/fonts/`.

## Component map (design section → component)

| Design section | Component |
| --- | --- |
| Sticky nav + mobile drawer | `chrome/SiteHeader` (client) |
| Aubergine footer | `chrome/Footer` |
| Hero (`<h1>`) | `sections/Hero` |
| Trust marquee | `sections/TrustMarquee` |
| Story teaser | `sections/StoryTeaser` |
| Featured / all products | `sections/FeaturedProducts`, `ui/ProductCard` |
| Why grid | `sections/WhyGrid` |
| CTA band | `sections/CtaBand` |
| Inner‑page head (`<h1>`) | `sections/PageHead` |
| Story prose + stats + pull‑quote | `sections/StoryBody` |
| Process strip | `sections/ProcessStrip` |
| Order channels / steps | `sections/Channels`, `sections/OrderSteps` |
| Contact list / form | `sections/ContactList`, `forms/ContactForm` |
| Product note | `sections/ProductNote` |
| Eyebrow / Divider / SectionHead / Button / Icon / ImageFrame | `ui/*` |

## Intentional changes from the original

1. **Tweaks panel removed** — the design‑tool runtime (`.tw-panel …` CSS + the
   postMessage/localStorage JS) is gone. Its default settings are now the baked
   `:root` values.
2. **`<image-slot>` removed** — the drag‑drop custom element is replaced by
   `ui/ImageFrame` (a `next/image` with `fill` inside the design's aspect‑ratio
   frame). The old `image-slot` CSS rule became `.img-frame` (cream bg + hairline).
3. **Static theme** — `data-bg="cream" data-motion="smooth"` are fixed on
   `<html>`; the variant branches in the CSS are kept but never toggled.
4. **Scroll‑reveal** is now one `IntersectionObserver` in `RevealProvider` with a
   `.no-js` fallback, preserving the exact original timings.
