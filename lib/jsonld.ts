/**
 * Structured-data (JSON-LD) builders. All values come from config so they stay
 * in sync with the visible site. Currency note: Toman is NOT ISO-4217, so Product
 * offers are encoded in IRR (Rial) = Toman × 10, with Western digits.
 */
import { site, abs } from '@/config/site';
import { products } from '@/config/products';
import { formatToman, tomanToRial } from '@/lib/format';

type Json = Record<string, unknown>;

const BUSINESS_ID = abs('/#business');
const BRAND_ID = abs('/#brand');
const WEBSITE_ID = abs('/#website');

function sameAs(): string[] {
  const c = site.contact;
  return [
    `https://instagram.com/${c.instagramHandle}`,
    c.telegramHandle ? `https://t.me/${c.telegramHandle}` : '',
    `https://wa.me/${c.whatsappE164}`,
    c.basalamUrl,
  ].filter(Boolean);
}

/** Identity graph for the Home page: Organization+FoodEstablishment, Brand, WebSite. */
export function organizationGraph(): Json {
  const prices = products.map((p) => p.priceToman);
  const priceRange = `${formatToman(Math.min(...prices))}–${formatToman(Math.max(...prices))} تومان`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'FoodEstablishment'],
        '@id': BUSINESS_ID,
        name: site.brandName,
        alternateName: site.brandNameLatin,
        url: abs('/'),
        logo: abs('/icons/icon-512.png'),
        image: abs(site.ogImage),
        description: site.description,
        slogan: site.tagline,
        foundingDate: site.foundingDateISO,
        servesCuisine: 'Persian',
        priceRange,
        knowsLanguage: 'fa',
        areaServed: { '@type': 'Country', name: 'Iran' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.contact.city,
          addressCountry: 'IR',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: site.contact.phoneE164,
          availableLanguage: 'fa',
        },
        sameAs: sameAs(),
      },
      {
        '@type': 'Brand',
        '@id': BRAND_ID,
        name: site.brandName,
        logo: abs('/icons/icon-512.png'),
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: abs('/'),
        name: site.brandName,
        description: site.description,
        inLanguage: 'fa-IR',
        publisher: { '@id': BUSINESS_ID },
      },
    ],
  };
}

/** One Product node per item for the Products page. */
export function productsJsonLd(): Json[] {
  return products.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': abs(`/products/#${p.slug}`),
    name: p.name,
    description: p.description,
    image: abs(p.image),
    category: 'ترشی خانگی',
    brand: { '@id': BRAND_ID },
    offers: {
      '@type': 'Offer',
      url: abs('/order/'),
      priceCurrency: 'IRR',
      price: tomanToRial(p.priceToman),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': BUSINESS_ID },
    },
  }));
}

/** BreadcrumbList: Home → current page. */
export function breadcrumb(name: string, path: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: abs('/') },
      { '@type': 'ListItem', position: 2, name, item: abs(path) },
    ],
  };
}

export interface QA {
  q: string;
  a: string;
}

/** FAQPage for the Order page. Texts must mirror the visible content. */
export function faqPage(items: QA[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
