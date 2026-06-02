/**
 * Single source of truth for the product range. Feeds the Home featured grid
 * (the three flagged `featured`), the full Products page, and the Product
 * JSON-LD. Prices are stored as raw integer Toman; formatting (Persian digits
 * + grouping) and the Toman→Rial conversion for schema live in lib/format.ts.
 *
 * ⚠️ PRE-LAUNCH: confirm prices, and replace the placeholder product photos in
 * public/images/products/<slug>.webp (keep the filenames). See docs/images.md.
 */

export interface Product {
  /** URL-safe id and image filename stem. */
  slug: string;
  name: string;
  description: string;
  /** Price in Toman (raw integer), e.g. 180000. */
  priceToman: number;
  /** Image path under /public. */
  image: string;
  /** Descriptive Persian alt text (SEO + a11y). */
  alt: string;
  /** Shown on the Home page (first three). */
  featured?: boolean;
  /** Intrinsic pixels for next/image (CLS guard) — placeholders are 800×600 (4/3). */
  width: number;
  height: number;
}

export const products: Product[] = [
  {
    slug: 'lite',
    name: 'ترشی لیته',
    description: 'ترشی سنتی و خوش‌عطر با سبزیجاتِ معطر.',
    priceToman: 180000,
    image: '/images/products/lite.webp',
    alt: 'شیشهٔ ترشی لیتهٔ خانگی ترشی طلا',
    featured: true,
    width: 800,
    height: 600,
  },
  {
    slug: 'mix',
    name: 'ترشی مخلوط',
    description: 'ترکیبی از سبزیجاتِ ترد و خوش‌طعم.',
    priceToman: 160000,
    image: '/images/products/mix.webp',
    alt: 'شیشهٔ ترشی مخلوط خانگی ترشی طلا',
    featured: true,
    width: 800,
    height: 600,
  },
  {
    slug: 'bademjan',
    name: 'ترشی بادمجان',
    description: 'بادمجانِ کبابی با طعمی اصیل و خانگی.',
    priceToman: 200000,
    image: '/images/products/bademjan.webp',
    alt: 'شیشهٔ ترشی بادمجان کبابی خانگی ترشی طلا',
    featured: true,
    width: 800,
    height: 600,
  },
  {
    slug: 'sir',
    name: 'ترشی سیر',
    description: 'سیرِ رسیده با طعمی ملایم و دلپذیر.',
    priceToman: 220000,
    image: '/images/products/sir.webp',
    alt: 'شیشهٔ ترشی سیر خانگی ترشی طلا',
    width: 800,
    height: 600,
  },
  {
    slug: 'khiar',
    name: 'خیار شور',
    description: 'خیارهای تازه، ترد و خوش‌طعم.',
    priceToman: 150000,
    image: '/images/products/khiar.webp',
    alt: 'شیشهٔ خیارشور خانگی ترد ترشی طلا',
    width: 800,
    height: 600,
  },
  {
    slug: 'felfel',
    name: 'ترشی فلفل',
    description: 'تند و پرطعم، برای دوستدارانِ تندی.',
    priceToman: 170000,
    image: '/images/products/felfel.webp',
    alt: 'شیشهٔ ترشی فلفل تند خانگی ترشی طلا',
    width: 800,
    height: 600,
  },
];

export const featuredProducts = products.filter((p) => p.featured);
