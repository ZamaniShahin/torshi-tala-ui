import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

// Required for `output: 'export'` — emit a static manifest file.
export const dynamic = 'force-static';

/** Generates /manifest.webmanifest (PWA-lite, RTL Persian). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ترشی طلا — طلای سر سفره',
    short_name: 'ترشی طلا',
    description: site.description,
    lang: 'fa-IR',
    dir: 'rtl',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#faf4e6',
    theme_color: '#ae7a1c',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
