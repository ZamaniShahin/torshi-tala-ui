import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

// Required for `output: 'export'` — emit a static sitemap file.
export const dynamic = 'force-static';

/** Generates /sitemap.xml at build time. URLs use trailing slashes to match
 *  trailingSlash:true and the per-page canonicals. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const u = (path: string) => `${site.domain}${path}`;
  return [
    { url: u('/'), lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: u('/products/'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: u('/order/'), lastModified, changeFrequency: 'yearly', priority: 0.8 },
    { url: u('/story/'), lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: u('/contact/'), lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ];
}
