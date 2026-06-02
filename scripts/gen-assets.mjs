// One-shot asset generator for Torshi Tala.
//   node scripts/gen-assets.mjs
// Source artwork: public/images/_source-photo.png (gold line-art, hands+jar on
// cream) and public/images/logo-mark.png (transparent gold mark).
// Produces: hero/story/teaser crops, 6 on-brand product placeholders, and the
// full icon set. Images only (no text) → deterministic across platforms.
// The owner overwrites the generated photos by keeping the same filenames.
import sharp from 'sharp';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pngToIco from 'png-to-ico';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...p) => path.join(root, ...p);

const SRC_ART = P('assets-src/source-photo.png');
const SRC_LOGO = P('public/images/logo-mark.png');

// Brand palette (matches tala.css tokens)
const GOLD = '#AE7A1C';
const GOLD_LIGHT = '#C9A24E';

await mkdir(P('public/images/products'), { recursive: true });
await mkdir(P('public/icons'), { recursive: true });
await mkdir(P('public/og'), { recursive: true });
await mkdir(P('app'), { recursive: true });

// Sample the artwork's own background so contain-padding is seamless.
const { data: corner } = await sharp(SRC_ART)
  .extract({ left: 2, top: 2, width: 2, height: 2 })
  .raw()
  .toBuffer({ resolveWithObject: true });
const CREAM = { r: corner[0], g: corner[1], b: corner[2] };
const creamHex = '#' + [CREAM.r, CREAM.g, CREAM.b].map((n) => n.toString(16).padStart(2, '0')).join('');
console.log('Sampled cream background:', creamHex);

const webp = { quality: 84, effort: 5 };

// ---- 1. Framed artwork crops (contain on cream → full art always visible) ----
async function framed(out, w, h, fillRatio = 0.86) {
  const inner = Math.round(Math.min(w, h) * fillRatio);
  const art = await sharp(SRC_ART)
    .resize(inner, inner, { fit: 'inside' })
    .toBuffer();
  await sharp({ create: { width: w, height: h, channels: 3, background: CREAM } })
    .composite([{ input: art }])
    .webp(webp)
    .toFile(out);
  console.log('wrote', path.relative(root, out), `${w}x${h}`);
}
await framed(P('public/images/hero-jar.webp'), 1000, 1250, 0.92); // 4/5
await framed(P('public/images/home-hands.webp'), 1000, 1200, 0.88); // 5/6
await framed(P('public/images/story-hero.webp'), 1600, 900, 0.9); // 16/9

// ---- 2. On-brand product placeholders (cream + watermark logo + hairline) ----
const logoB64 = (await readFile(SRC_LOGO)).toString('base64');
const PRODUCTS = ['lite', 'mix', 'bademjan', 'sir', 'khiar', 'felfel'];
async function productPlaceholder(slug) {
  const w = 800;
  const h = 600;
  const lw = 300;
  const lh = Math.round((lw * 485) / 520); // logo intrinsic 520x485
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${creamHex}"/>
  <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="none" stroke="${GOLD_LIGHT}" stroke-width="1.5" opacity="0.55"/>
  <g opacity="0.18"><image x="${(w - lw) / 2}" y="${(h - lh) / 2}" width="${lw}" height="${lh}" href="data:image/png;base64,${logoB64}"/></g>
  <g transform="translate(${w / 2}, ${h - 70})">
    <rect x="-5" y="-5" width="10" height="10" fill="${GOLD}" transform="rotate(45)"/>
  </g>
</svg>`;
  const out = P('public/images/products', `${slug}.webp`);
  await sharp(Buffer.from(svg)).webp(webp).toFile(out);
  console.log('wrote', path.relative(root, out), `${w}x${h}`);
}
for (const s of PRODUCTS) await productPlaceholder(s);

// ---- 3. Icons (logo centered on cream; maskable keeps a safe zone) ----
async function iconOnCream(out, size, logoFrac, format = 'png') {
  const lw = Math.round(size * logoFrac);
  const lh = Math.round((lw * 485) / 520);
  const logo = await sharp(SRC_LOGO).resize(lw, lh, { fit: 'inside' }).toBuffer();
  const img = sharp({ create: { width: size, height: size, channels: 3, background: CREAM } }).composite([
    { input: logo },
  ]);
  if (format === 'png') await img.png().toFile(out);
  else await img.toFormat(format).toFile(out);
  console.log('wrote', path.relative(root, out), `${size}x${size}`);
  return out;
}
await iconOnCream(P('app/icon.png'), 512, 0.72);
await iconOnCream(P('app/apple-icon.png'), 180, 0.72);
await iconOnCream(P('public/icons/icon-192.png'), 192, 0.72);
await iconOnCream(P('public/icons/icon-512.png'), 512, 0.72);
await iconOnCream(P('public/icons/icon-maskable-512.png'), 512, 0.56); // ~20% safe padding

// favicon.ico (16/32/48) → app/favicon.ico
const icoPngs = [];
for (const s of [16, 32, 48]) {
  const tmp = P('public/icons', `_fav-${s}.png`);
  await iconOnCream(tmp, s, 0.82);
  icoPngs.push(tmp);
}
await writeFile(P('app/favicon.ico'), await pngToIco(icoPngs));
console.log('wrote app/favicon.ico');

console.log('\nDone. Source art lives in assets-src/ (not shipped) for re-runs.');
