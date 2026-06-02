/**
 * Single source of truth for brand + contact details and the canonical domain.
 *
 * ⚠️ PRE-LAUNCH: every value tagged `// PLACEHOLDER` must be replaced with the
 * owner's real details. See docs/content-and-placeholders.md for the checklist.
 * The placeholders below are intentionally valid (so links/JSON-LD work and the
 * site is fully previewable) but obviously fake.
 */

export interface ContactConfig {
  /** Instagram handle WITHOUT the leading @. */
  instagramHandle: string;
  /** WhatsApp number in E.164 WITHOUT the leading + (used by wa.me). */
  whatsappE164: string;
  /** Phone number in E.164 WITH the leading + (used by tel:). */
  phoneE164: string;
  /** Phone number pre-formatted with Persian digits for display. */
  phoneDisplay: string;
  /** Telegram handle WITHOUT @ (optional — empty string hides it). */
  telegramHandle: string;
  /** Full Basalam storefront URL (optional — empty string hides the channel). */
  basalamUrl: string;
  /** City, shown on the Contact page and in LocalBusiness JSON-LD. */
  city: string;
}

export interface SiteConfig {
  /** Canonical origin, NO trailing slash. The one value to change per environment. */
  domain: string;
  brandName: string;
  brandNameLatin: string;
  tagline: string;
  /** The maker's name woven into hero/story copy. */
  ownerName: string;
  /** Founding year for display (Persian digits). */
  foundingYearFa: string;
  /** Founding year, Gregorian ISO (for JSON-LD foundingDate). */
  foundingDateISO: string;
  /** Default meta description (Persian). */
  description: string;
  /** Social-share image, served from /public. */
  ogImage: string;
  contact: ContactConfig;
}

export const site: SiteConfig = {
  domain: 'https://torshitala.ir', // PLACEHOLDER (swap for the real domain)
  brandName: 'ترشی طلا',
  brandNameLatin: 'Torshi Tala',
  tagline: 'طلای سر سفره',
  ownerName: '[نام]', // PLACEHOLDER (the maker's name — appears in hero & story copy)
  foundingYearFa: '۱۳۷۴',
  foundingDateISO: '1995',
  description:
    'ترشی طلا؛ ترشی خانگی و دست‌ساز ایرانی، بدون مواد نگهدارنده، با بیش از سی سال تجربه. لیته، مخلوط، بادمجان، سیر، خیار شور و فلفل — سفارش از اینستاگرام، واتساپ و تلفن.',
  ogImage: '/og/torshi-tala-og.png',
  contact: {
    instagramHandle: 'torshitala', // PLACEHOLDER
    whatsappE164: '989000000000', // PLACEHOLDER (e.g. 98912xxxxxxx)
    phoneE164: '+989000000000', // PLACEHOLDER
    phoneDisplay: '۰۹۰۰ ۰۰۰ ۰۰۰۰', // PLACEHOLDER
    telegramHandle: 'torshitala', // PLACEHOLDER (set '' to hide)
    basalamUrl: 'https://basalam.com/torshitala', // PLACEHOLDER (set '' to hide)
    city: 'تهران', // PLACEHOLDER
  },
};

/** Build an absolute URL from a site-root-relative path. */
export const abs = (path = '/'): string =>
  `${site.domain}${path.startsWith('/') ? path : `/${path}`}`;
