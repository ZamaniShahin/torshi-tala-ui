import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

// Required for `output: 'export'` — emit a static robots.txt file.
export const dynamic = 'force-static';

/** Generates /robots.txt — allow everything, point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.domain}/sitemap.xml`,
    host: site.domain,
  };
}
