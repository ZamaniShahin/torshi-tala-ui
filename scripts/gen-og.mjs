// Builds the 1200x630 social-share (Open Graph) image with Persian text.
// Uses sharp to rasterize an SVG with the brand fonts embedded as base64
// @font-face so it renders identically anywhere (no reliance on OS fonts).
//   node scripts/gen-og.mjs
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...p) => path.join(root, ...p);
await mkdir(P('public/og'), { recursive: true });

const lalezar = (await readFile(P('public/fonts/lalezar-arabic-400-normal.woff2'))).toString('base64');
const vazir = (await readFile(P('public/fonts/vazirmatn-arabic-wght-normal.woff2'))).toString('base64');
const art = (await readFile(P('assets-src/source-photo.png'))).toString('base64');

const W = 1200;
const H = 630;
const CREAM = '#FBF5EA';
const GOLD = '#AE7A1C';
const GOLD_DEEP = '#8A5F12';
const INK = '#3A2A1E';
const MUTED = '#7C6A4E';

// RTL layout: artwork on the left, text block on the right.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <style>
    @font-face{font-family:'Lalezar';src:url(data:font/woff2;base64,${lalezar}) format('woff2');}
    @font-face{font-family:'Vazirmatn';src:url(data:font/woff2;base64,${vazir}) format('woff2');font-weight:400 700;}
    .hero{font-family:'Lalezar';fill:${INK};}
    .tag{font-family:'Lalezar';fill:${GOLD_DEEP};}
    .sub{font-family:'Vazirmatn';fill:${MUTED};font-weight:500;}
  </style>
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="${GOLD}" stroke-width="2" opacity="0.45"/>
  <image x="60" y="65" width="500" height="500" href="data:image/png;base64,${art}"/>
  <g text-anchor="middle">
    <text class="hero" x="850" y="270" font-size="118">ترشی طلا</text>
    <text class="tag" x="850" y="365" font-size="60">طلای سر سفره</text>
    <text class="sub" x="850" y="445" font-size="32">ترشی خانگی و دست‌ساز · بدون مواد نگهدارنده</text>
    <rect x="790" y="485" width="120" height="3" fill="${GOLD}"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(P('public/og/torshi-tala-og.png'));
console.log('wrote public/og/torshi-tala-og.png');
