/**
 * Build-time data access for the Torshi Tala backend API.
 *
 * This site is a STATIC EXPORT (`output: 'export'`). These helpers are meant to
 * run on the server during `next build` (inside React Server Components and
 * `generateMetadata`), NOT in the browser — so the API base URL is read from a
 * server-only env var (`API_BASE_URL`, deliberately NOT `NEXT_PUBLIC_*`).
 *
 * Resilience contract: every fetcher catches ALL errors (network failure,
 * non-2xx status, TLS/cert issues, malformed JSON) and falls back to the
 * hardcoded `config/*.ts` data (or the inline marketing data mirrored here), so
 * `next build` ALWAYS succeeds even when the API is unreachable. The API is the
 * source of truth when available; the config is a typed safety net.
 *
 * Mapping note: the API returns `image` as a nested object
 * (`{ path, alt, width, height }`); the UI's `Product` type is flat. The
 * mappers here flatten the API DTOs onto the UI's EXISTING types so no component
 * needs to change beyond its data source.
 */

import { products as fallbackProducts, type Product } from '@/config/products';
import { site, type SiteConfig } from '@/config/site';

/* ------------------------------------------------------------------------- */
/* Base URL                                                                   */
/* ------------------------------------------------------------------------- */

/**
 * The backend API base URL, e.g. `https://localhost:7153/api/v1`.
 * Read from the server-only `API_BASE_URL` env var; defaults to the local dev
 * HTTPS endpoint when unset.
 */
export function apiBaseUrl(): string {
  return process.env.API_BASE_URL?.replace(/\/+$/, '') ?? 'https://localhost:7153/api/v1';
}

/* ------------------------------------------------------------------------- */
/* Low-level fetch                                                            */
/* ------------------------------------------------------------------------- */

/**
 * Fetch + parse JSON from `{apiBaseUrl()}{path}` at build time. Throws on any
 * non-2xx response so the caller's try/catch falls back. Uses `force-cache`
 * with `revalidate: false`, the correct semantics for a static export (fetched
 * once at build, never revalidated at runtime — there is no runtime).
 */
async function getJson<T>(path: string): Promise<T> {
  const url = `${apiBaseUrl()}${path}`;
  const res = await fetch(url, {
    cache: 'force-cache',
    next: { revalidate: false },
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

/** Log a concise warning explaining why a fetcher fell back to static config. */
function warnFallback(resource: string, err: unknown): void {
  const reason = err instanceof Error ? err.message : String(err);
  console.warn(`[api] ${resource}: falling back to static config (${reason})`);
}

/* ------------------------------------------------------------------------- */
/* API DTO shapes (camelCase, as returned by ASP.NET Core web defaults)       */
/* ------------------------------------------------------------------------- */

interface ImageDto {
  path: string;
  alt: string;
  width: number;
  height: number;
}

interface ProductDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceToman: number;
  image: ImageDto;
  featured: boolean;
  displayOrder: number;
  isPublished: boolean;
}

interface SiteSettingsDto {
  id: string;
  brand: {
    brandName: string;
    brandNameLatin: string;
    tagline: string;
    ownerName: string;
    foundingYearFa: string;
    foundingDateIso: string;
    metaDescription: string;
    ogImage: string;
    domain: string;
  };
  contact: {
    instagramHandle: string;
    whatsAppE164: string;
    phoneE164: string;
    phoneDisplay: string;
    city: string;
    telegramHandle: string | null;
    basalamUrl: string | null;
  };
}

interface FeatureDto {
  id: string;
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
}

interface ProcessStepDto {
  id: string;
  title: string;
  description: string;
  displayOrder: number;
}

interface OrderStepDto {
  id: string;
  text: string;
  displayOrder: number;
}

interface FaqItemDto {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
}

interface TrustBadgeDto {
  id: string;
  label: string;
  displayOrder: number;
}

interface SectionCtaDto {
  label: string;
  href: string;
}

interface SectionDto {
  id: string;
  sectionKey: string;
  displayOrder: number;
  eyebrow?: string;
  title?: string;
  lede?: string;
  body?: string;
  image?: ImageDto;
  primaryCta?: SectionCtaDto;
  secondaryCta?: SectionCtaDto;
}

interface PageDto {
  id: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  sections: SectionDto[];
}

/* ------------------------------------------------------------------------- */
/* UI-facing types for resources that don't yet have a config/*.ts module     */
/* (marketing lists + CMS pages). Kept here so wiring them later is trivial.  */
/* ------------------------------------------------------------------------- */

export interface Feature {
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
}

export interface ProcessStep {
  title: string;
  description: string;
  displayOrder: number;
}

export interface OrderStep {
  text: string;
  displayOrder: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  displayOrder: number;
}

export interface TrustBadge {
  label: string;
  displayOrder: number;
}

export interface SectionCta {
  label: string;
  href: string;
}

export interface PageImage {
  path: string;
  alt: string;
  width: number;
  height: number;
}

export interface Section {
  sectionKey: string;
  displayOrder: number;
  eyebrow?: string;
  title?: string;
  lede?: string;
  body?: string;
  image?: PageImage;
  primaryCta?: SectionCta;
  secondaryCta?: SectionCta;
}

export interface Page {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  sections: Section[];
}

/* ------------------------------------------------------------------------- */
/* Mappers: API DTO -> UI type                                                */
/* ------------------------------------------------------------------------- */

/** Flatten the API's nested `image` onto the UI's flat `Product` shape. */
function toProduct(dto: ProductDto): Product {
  return {
    slug: dto.slug,
    name: dto.name,
    description: dto.description,
    priceToman: dto.priceToman,
    image: dto.image.path,
    alt: dto.image.alt,
    width: dto.image.width,
    height: dto.image.height,
    featured: dto.featured,
  };
}

function toSiteConfig(dto: SiteSettingsDto): SiteConfig {
  return {
    domain: dto.brand.domain,
    brandName: dto.brand.brandName,
    brandNameLatin: dto.brand.brandNameLatin,
    tagline: dto.brand.tagline,
    ownerName: dto.brand.ownerName,
    foundingYearFa: dto.brand.foundingYearFa,
    foundingDateISO: dto.brand.foundingDateIso,
    description: dto.brand.metaDescription,
    ogImage: dto.brand.ogImage,
    contact: {
      instagramHandle: dto.contact.instagramHandle,
      whatsappE164: dto.contact.whatsAppE164,
      phoneE164: dto.contact.phoneE164,
      phoneDisplay: dto.contact.phoneDisplay,
      telegramHandle: dto.contact.telegramHandle ?? '',
      basalamUrl: dto.contact.basalamUrl ?? '',
      city: dto.contact.city,
    },
  };
}

function toImage(dto: ImageDto): PageImage {
  return { path: dto.path, alt: dto.alt, width: dto.width, height: dto.height };
}

function toSection(dto: SectionDto): Section {
  return {
    sectionKey: dto.sectionKey,
    displayOrder: dto.displayOrder,
    eyebrow: dto.eyebrow,
    title: dto.title,
    lede: dto.lede,
    body: dto.body,
    image: dto.image ? toImage(dto.image) : undefined,
    primaryCta: dto.primaryCta,
    secondaryCta: dto.secondaryCta,
  };
}

function toPage(dto: PageDto): Page {
  return {
    slug: dto.slug,
    metaTitle: dto.metaTitle,
    metaDescription: dto.metaDescription,
    keywords: dto.keywords ?? [],
    sections: (dto.sections ?? []).map(toSection),
  };
}

const byDisplayOrder = <T extends { displayOrder: number }>(a: T, b: T): number =>
  a.displayOrder - b.displayOrder;

/* ------------------------------------------------------------------------- */
/* Public fetchers — Products (WIRED into the UI)                             */
/* ------------------------------------------------------------------------- */

/** All published products, ordered by the API. Falls back to `config/products`. */
export async function getProducts(): Promise<Product[]> {
  try {
    const dtos = await getJson<ProductDto[]>('/products');
    return dtos.map(toProduct);
  } catch (err) {
    warnFallback('GET /products', err);
    return fallbackProducts;
  }
}

/**
 * The featured products for the Home grid. Mirrors the semantics of the
 * `featuredProducts` derived constant in `config/products.ts`. Falls back to the
 * config-derived list (the products flagged `featured`).
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const dtos = await getJson<ProductDto[]>('/products/featured');
    return dtos.map(toProduct);
  } catch (err) {
    warnFallback('GET /products/featured', err);
    return fallbackProducts.filter((p) => p.featured);
  }
}

/** A single published product by slug, or `null` if not found / API down. */
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const dto = await getJson<ProductDto>(`/products/${encodeURIComponent(slug)}`);
    return toProduct(dto);
  } catch (err) {
    warnFallback(`GET /products/${slug}`, err);
    return fallbackProducts.find((p) => p.slug === slug) ?? null;
  }
}

/* ------------------------------------------------------------------------- */
/* Public fetchers — still on static config in the UI (typed & ready to wire) */
/* ------------------------------------------------------------------------- */

/**
 * Site brand + contact settings. Falls back to `config/site`.
 *
 * TODO(api-wiring): swap `config/site` imports in layout.tsx, lib/jsonld.ts,
 * lib/links.ts, the Channels/ContactList sections, sitemap.ts/robots.ts/
 * manifest.ts for `await getSiteSettings()` once those become async. `abs()`
 * currently closes over `site.domain`; route domain through the resolved
 * settings (or pass it in) when wiring.
 */
export async function getSiteSettings(): Promise<SiteConfig> {
  try {
    const dto = await getJson<SiteSettingsDto>('/sitesettings');
    return toSiteConfig(dto);
  } catch (err) {
    warnFallback('GET /sitesettings', err);
    return site;
  }
}

/**
 * "چرا ترشی طلا؟" feature reasons. Falls back to the inline list mirrored from
 * `components/sections/WhyGrid.tsx`.
 *
 * TODO(api-wiring): make `WhyGrid` async and source `REASONS` from here.
 */
export async function getFeatures(): Promise<Feature[]> {
  try {
    const dtos = await getJson<FeatureDto[]>('/features');
    return dtos
      .map((d) => ({ icon: d.icon, title: d.title, description: d.description, displayOrder: d.displayOrder }))
      .sort(byDisplayOrder);
  } catch (err) {
    warnFallback('GET /features', err);
    return FALLBACK_FEATURES;
  }
}

/**
 * "از سبزی تا سفره" process steps. Falls back to the inline list mirrored from
 * `components/sections/ProcessStrip.tsx`.
 *
 * TODO(api-wiring): make `ProcessStrip` async and source `STEPS` from here.
 */
export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const dtos = await getJson<ProcessStepDto[]>('/processsteps');
    return dtos
      .map((d) => ({ title: d.title, description: d.description, displayOrder: d.displayOrder }))
      .sort(byDisplayOrder);
  } catch (err) {
    warnFallback('GET /processsteps', err);
    return FALLBACK_PROCESS_STEPS;
  }
}

/**
 * "سه قدم تا سفرهٔ شما" order steps. Falls back to the inline list mirrored from
 * `components/sections/OrderSteps.tsx`.
 *
 * TODO(api-wiring): make `OrderSteps` async and source the steps from here.
 */
export async function getOrderSteps(): Promise<OrderStep[]> {
  try {
    const dtos = await getJson<OrderStepDto[]>('/ordersteps');
    return dtos.map((d) => ({ text: d.text, displayOrder: d.displayOrder })).sort(byDisplayOrder);
  } catch (err) {
    warnFallback('GET /ordersteps', err);
    return FALLBACK_ORDER_STEPS;
  }
}

/**
 * Order-page FAQ. Falls back to the inline list mirrored from
 * `app/order/page.tsx`.
 *
 * TODO(api-wiring): source the `FAQ` array in app/order/page.tsx from here and
 * feed `faqPage()` JSON-LD from the same data.
 */
export async function getFaq(): Promise<FaqItem[]> {
  try {
    const dtos = await getJson<FaqItemDto[]>('/faq');
    return dtos
      .map((d) => ({ question: d.question, answer: d.answer, displayOrder: d.displayOrder }))
      .sort(byDisplayOrder);
  } catch (err) {
    warnFallback('GET /faq', err);
    return FALLBACK_FAQ;
  }
}

/**
 * Trust marquee badges. Falls back to the inline list mirrored from
 * `components/sections/TrustMarquee.tsx`.
 *
 * TODO(api-wiring): make `TrustMarquee` async and source `VALUES` from here
 * (use `.label`).
 */
export async function getTrustBadges(): Promise<TrustBadge[]> {
  try {
    const dtos = await getJson<TrustBadgeDto[]>('/trustbadges');
    return dtos.map((d) => ({ label: d.label, displayOrder: d.displayOrder })).sort(byDisplayOrder);
  } catch (err) {
    warnFallback('GET /trustbadges', err);
    return FALLBACK_TRUST_BADGES;
  }
}

/**
 * A CMS page (sections + SEO meta) by slug: home | story | products | order |
 * contact. Returns `null` when the API is down (no static fallback exists yet —
 * page copy still lives inline in the section components).
 *
 * TODO(api-wiring): once page copy is migrated to the CMS, source the per-page
 * `metadata` and section content from here.
 */
export async function getPage(slug: string): Promise<Page | null> {
  try {
    const dto = await getJson<PageDto>(`/pages/${encodeURIComponent(slug)}`);
    return toPage(dto);
  } catch (err) {
    warnFallback(`GET /pages/${slug}`, err);
    return null;
  }
}

/* ------------------------------------------------------------------------- */
/* Static fallbacks for the marketing lists (mirror the inline section data). */
/* These live here only because there is no config/*.ts module for them yet.  */
/* ------------------------------------------------------------------------- */

const FALLBACK_FEATURES: Feature[] = [
  { icon: 'home', title: 'خانگی و دست‌ساز', description: 'هر شیشه با دست و در خانه تهیه می‌شود، نه در کارخانه.', displayOrder: 0 },
  { icon: 'leaf', title: 'بدون مواد نگهدارنده', description: 'هیچ ماده‌ی نگهدارنده یا افزودنیِ شیمیایی در کار نیست.', displayOrder: 1 },
  { icon: 'sprout', title: 'موادِ اولیه‌ی تازه', description: 'از بهترین و تازه‌ترین سبزیجاتِ فصل.', displayOrder: 2 },
  { icon: 'clock', title: 'سی سال تجربه', description: 'دستوری که در طول سه دهه کامل شده است.', displayOrder: 3 },
  { icon: 'shield', title: 'تهیه‌ی بهداشتی', description: 'با رعایتِ کاملِ بهداشت و کیفیت.', displayOrder: 4 },
];

const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
  { title: 'انتخاب مواد', description: 'تازه‌ترین سبزیجاتِ فصل، دانه‌به‌دانه دست‌چین.', displayOrder: 0 },
  { title: 'آماده‌سازی', description: 'شستن و خرد کردن با دست، بدون عجله.', displayOrder: 1 },
  { title: 'دستورِ خانگی', description: 'ترکیبی که در طول سی سال کامل شده است.', displayOrder: 2 },
  { title: 'زمان و صبر', description: 'انتظار تا طعم به اوج خودش برسد.', displayOrder: 3 },
];

const FALLBACK_ORDER_STEPS: OrderStep[] = [
  { text: 'محصولِ موردنظرتان را از صفحهٔ محصولات انتخاب کنید.', displayOrder: 0 },
  { text: 'از یکی از کانال‌های بالا برای ما پیام بفرستید یا تماس بگیرید.', displayOrder: 1 },
  { text: 'سفارش‌تان تازه آماده و برایتان ارسال می‌شود.', displayOrder: 2 },
];

const FALLBACK_FAQ: FaqItem[] = [
  {
    question: 'چطور از ترشی طلا سفارش بدهم؟',
    answer:
      'سفارش‌ها از طریق اینستاگرام (کانال اصلی)، واتساپ و تماس تلفنی پذیرفته می‌شوند. کافی است محصول موردنظرتان را انتخاب و از یکی از این راه‌ها برای ما پیام بفرستید.',
    displayOrder: 0,
  },
  {
    question: 'مراحل ثبت سفارش چیست؟',
    answer:
      'در سه قدم: ۱) محصول موردنظر را از صفحهٔ محصولات انتخاب کنید. ۲) از اینستاگرام، واتساپ یا تلفن برای ما پیام بفرستید. ۳) سفارش‌تان تازه آماده و برایتان ارسال می‌شود.',
    displayOrder: 1,
  },
];

const FALLBACK_TRUST_BADGES: TrustBadge[] = [
  { label: 'خانگی', displayOrder: 0 },
  { label: 'بدون مواد نگهدارنده', displayOrder: 1 },
  { label: 'دست‌ساز', displayOrder: 2 },
  { label: 'موادِ تازه', displayOrder: 3 },
  { label: 'تهیهٔ بهداشتی', displayOrder: 4 },
];
