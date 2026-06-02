import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site, abs } from '@/config/site';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { Footer } from '@/components/chrome/Footer';
import { RevealProvider } from '@/components/motion/RevealProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationGraph } from '@/lib/jsonld';

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: 'ترشی طلا — طلای سر سفره | ترشی خانگی و دست‌ساز',
    template: '%s — ترشی طلا',
  },
  description: site.description,
  applicationName: site.brandName,
  authors: [{ name: site.brandName }],
  creator: site.brandName,
  publisher: site.brandName,
  keywords: [
    'ترشی خانگی',
    'ترشی دست‌ساز',
    'خرید ترشی',
    'ترشی لیته خانگی',
    'ترشی مخلوط',
    'ترشی بادمجان',
    'ترشی سیر',
    'خیار شور خانگی',
    'ترشی فلفل',
    'ترشی بدون مواد نگهدارنده',
    'ترشی طلا',
    'طلای سر سفره',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: site.brandName,
    title: 'ترشی طلا — طلای سر سفره',
    description: site.description,
    url: abs('/'),
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: 'ترشی طلا — طلای سر سفره' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ترشی طلا — طلای سر سفره',
    description: site.description,
    images: [site.ogImage],
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: '#ae7a1c',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

// Runs before paint: swaps the no-js fallback off so reveal animations engage
// for JS users, while no-JS visitors keep everything visible (CSS .no-js rule).
const NO_JS_SWAP = "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="no-js" data-bg="cream" data-motion="smooth" suppressHydrationWarning>
      <head>
        {/* Preload the above-the-fold Persian font subsets (self-hosted). */}
        <link
          rel="preload"
          href="/fonts/vazirmatn-arabic-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/lalezar-arabic-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_JS_SWAP }} />
        <a href="#main" className="skip-link">
          پرش به محتوای اصلی
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
        <RevealProvider />
        <JsonLd data={organizationGraph()} />
      </body>
    </html>
  );
}
