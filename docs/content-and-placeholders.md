# Content & Placeholders — Pre‑launch checklist

Everything the owner must fill in before launch. The site is fully functional
with the placeholder values below (links work, schema validates), but they are
**obviously fake** and must be replaced.

## 1. Brand & contact — `config/site.ts`

Every field marked `// PLACEHOLDER` in `config/site.ts`:

| Key | Placeholder now | Replace with |
| --- | --- | --- |
| `domain` | `https://torshitala.ir` | The real production origin, **no trailing slash**. Drives canonical URLs, sitemap, robots, OG. |
| `ownerName` | `[نام]` | The maker's name. Appears in the hero and story copy. |
| `contact.instagramHandle` | `torshitala` | Instagram handle **without** `@`. |
| `contact.whatsappE164` | `989000000000` | WhatsApp number in E.164 **without** `+` (e.g. `98912xxxxxxx`). |
| `contact.phoneE164` | `+989000000000` | Phone in E.164 **with** `+` (used by `tel:`). |
| `contact.phoneDisplay` | `۰۹۰۰ ۰۰۰ ۰۰۰۰` | Phone formatted with Persian digits (shown in UI). |
| `contact.telegramHandle` | `torshitala` | Telegram handle without `@`. Set `''` to hide the Telegram icon. |
| `contact.basalamUrl` | `https://basalam.com/torshitala` | Full Basalam storefront URL. Set `''` to hide the Basalam channel. |
| `contact.city` | `تهران` | City (Contact page + LocalBusiness schema). |

> `foundingYearFa` (`۱۳۷۴`) / `foundingDateISO` (`1995`) and `description` are set;
> change only if needed.

## 2. Products & prices — `config/products.ts`

Confirm each product's `name`, `description`, and **`priceToman`** (raw integer
Toman, e.g. `180000`). Prices feed the visible cards _and_ the Product schema
(auto‑converted to Rial). The six slugs are `lite, mix, bademjan, sir, khiar,
felfel`. To add/remove a product, edit this array (see
[development.md](./development.md)).

## 3. Product photos — `public/images/products/`

Replace the placeholder tiles with real photos, **keeping the same filenames**:
`lite.webp, mix.webp, bademjan.webp, sir.webp, khiar.webp, felfel.webp`
(4:3, ~800×600+). Also replace `hero-jar.webp` (4:5), `home-hands.webp` (5:6),
`story-hero.webp` (16:9). See [images.md](./images.md).

## 4. Footer year

The footer shows `© ۱۴۰۵`. Update the literal in
`components/chrome/Footer.tsx` if the Shamsi year changes.

## 5. After editing

```bash
npm run build      # confirm it still builds
npm run preview    # eyeball the result
```

Then redeploy `out/`. Nothing else references these values — `config/` is the
single source of truth.

## Quick checklist

- [ ] `domain` set to the real domain
- [ ] `ownerName` filled
- [ ] Instagram / WhatsApp / phone / Telegram / Basalam / city filled
- [ ] Prices confirmed in `config/products.ts`
- [ ] Real product + hero/story photos dropped in (same filenames)
- [ ] Footer year correct
- [ ] `npm run build` passes; OG/canonical checked (see [seo.md](./seo.md))
