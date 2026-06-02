/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site to out/ — no server runtime needed.
  // Lets us host on any static host/CDN (incl. Iranian hosts; Vercel/Netlify
  // are unreliable from inside Iran). Pre-rendered HTML is also ideal for SEO.
  output: 'export',

  // Write /products/index.html etc. so directory-index hosts serve clean URLs
  // without rewrite rules. Canonicals/sitemap use the matching trailing slash.
  trailingSlash: true,

  images: {
    // The Image Optimization API needs a Node server, which static export has
    // not. We pre-size/optimize assets ourselves; next/image still gives us
    // width/height (CLS guard) and lazy loading.
    unoptimized: true,
  },

  reactStrictMode: true,
};

export default nextConfig;
