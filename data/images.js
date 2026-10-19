/* Crestline — image list. ONE place that knows every image slot on the site.
 *
 * - Each slot has a fixed file name: assets/images/<slot>.jpg (.png / .webp also work).
 * - If the file exists, every page and Elementor template shows it. If not, the page shows a placeholder with the
 *   file name and the AI prompt.
 * - To add or replace an image: save it as assets/images/<slot>.jpg, then run:  node _src/build-pages.js
 * - IMAGE_PROMPTS.md is generated from this file by _src/apply-images.js. Do not edit it by hand.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'images');
const EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
const PAGES_BASE = 'https://web-inference.github.io/crestline/'; // Elementor imports images from here

const CITIES = require('../elementor/locations-data.js');

/* ---- shared look for every site photo (add to the end of each prompt if your tool needs a style line) ---- */
const STYLE_LINE = 'editorial real-estate photography, photorealistic, natural light, Bay Area California setting, no text, no logos, no watermark, no visible faces';

const slots = [];
const add = (s) => slots.push(s);

/* ---------------- Homepage (photos supplied by the client) ---------------- */
add({
  slot: 'home-hero', group: 'Homepage', where: 'Hero, right side', ratio: '1:1', minSize: '1600 × 1600',
  alt: 'Modern glass-walled home glowing at dusk beside a pool', focus: '74% 50%', parallax: true, eager: true,
  prompt: 'Modern single-storey Bay Area home with floor-to-ceiling glass walls glowing warmly at dusk, a calm pool in the foreground, mature trees behind, deep blue twilight sky, editorial architectural photography, photorealistic, square 1:1, no text',
});
add({
  slot: 'home-about', group: 'Homepage', where: 'Who We Are, left image', ratio: '9:8', minSize: '1400 × 1250',
  alt: 'Styled living room with a navy wall, brass mirror and mustard throw', focus: '50% 40%',
  prompt: 'Warm styled living room in a Bay Area home, deep navy accent wall, round brass mirror, charcoal velvet sofa with a mustard throw, orange roses in a glass vase on a white round coffee table, soft daylight, shallow depth of field, editorial interior photography, no text',
});
add({
  slot: 'home-values', group: 'Homepage', where: 'Core Values, under the heading', ratio: '17:10', minSize: '1700 × 1000',
  alt: 'Modern two-storey home with a glass balcony among tall pines',
  prompt: 'Modern two-storey home with a cantilevered wood-clad roof, glass balcony railing and large windows glowing at dusk, manicured lawn with stone landscaping, tall pines behind, editorial architectural photography, no text',
});
add({
  slot: 'home-process', group: 'Homepage', where: 'Getting Started, under the intro', ratio: '5:3', minSize: '1500 × 900',
  alt: 'Bright living room with cream sofas and a brick archway',
  prompt: 'Bright welcoming living room in a Bay Area rental home, cream sofas, wooden coffee table, brick archway shelving, tall windows with sheer curtains, light wood floor, soft daylight, interior real-estate photography, no people, no text',
});

/* ---------------- Homepage blog cards ---------------- */
add({
  slot: 'blog-tenant-risk', group: 'Blog cards (homepage)', where: '"5 warning signs of a bad tenant" card', ratio: '3:2', minSize: '1500 × 1000',
  alt: 'Rental application paperwork with reading glasses and a pen on a desk',
  prompt: `A rental application checklist on a clean desk with reading glasses, a pen and a laptop showing a blurred report, soft window light, shallow depth of field, form text blurred and unreadable, ${STYLE_LINE}`,
});
add({
  slot: 'blog-owner-tips', group: 'Blog cards (homepage)', where: '"Prepare your home for a higher rent" card', ratio: '3:2', minSize: '1500 × 1000',
  alt: 'Freshly painted living room with paint swatches and a roller tray',
  prompt: `Bright freshly refreshed living room in a Bay Area home, new light-grey paint, a few paint swatches and a small roller tray in the foreground, hardwood floors, large window, soft daylight, ${STYLE_LINE}`,
});
add({
  slot: 'blog-market-update', group: 'Blog cards (homepage)', where: '"Bay Area rental market update: fall 2026" card', ratio: '3:2', minSize: '1500 × 1000',
  alt: 'Quiet Bay Area street in autumn with tidy single-family homes',
  prompt: `Quiet Bay Area residential street in early autumn, golden and orange leaves on the trees and sidewalk, tidy single-family homes with porches, soft late-afternoon light, ${STYLE_LINE}`,
});

/* ---------------- City cards (used on the homepage AND the Service Areas page) ---------------- */
for (const c of CITIES) {
  add({
    slot: `city-${c.slug}`, group: 'City cards (homepage + Service Areas)', where: `${c.name} card`, ratio: '4:3', minSize: '1600 × 1200',
    alt: `${c.name} rental home`, prompt: c.prompt,
  });
}

/* Los Altos is the home office. It has a card on the original homepage (index.html) but no city page yet. */
add({
  slot: 'city-los-altos', group: 'City cards (homepage + Service Areas)', where: 'Los Altos card (original homepage only)', ratio: '4:3', minSize: '1600 × 1200',
  alt: 'Los Altos village street', prompt: `Village main street in Los Altos, California at golden hour, low-rise brick and stucco storefronts, mature street trees, planters and café umbrellas, a few pedestrians far in the distance, warm soft light, clear sky, ${STYLE_LINE}`,
});

/* ---------------- Service Areas page ---------------- */
add({
  slot: 'areas-hero', group: 'Service Areas page', where: 'Hero, right side', ratio: '5:4', minSize: '1600 × 1280', parallax: true, eager: true,
  alt: 'Aerial view of a leafy Silicon Valley neighborhood',
  prompt: 'Aerial view of a leafy Silicon Valley neighborhood at golden hour, tree-lined streets of single-family homes with rolling Santa Cruz foothills in the distance, warm soft light, slight haze, editorial real-estate photography, photorealistic, no text',
});
add({
  slot: 'areas-process', group: 'Service Areas page', where: 'Getting Started, under the intro', ratio: '5:3', minSize: '1500 × 900',
  alt: 'Property manager handing house keys to a homeowner',
  prompt: 'Property manager handing a set of house keys to a homeowner on the front steps of a modern Bay Area home, hands and keys in focus, warm natural light, editorial lifestyle photography, photorealistic, no faces',
});

/* ---------------- City pages: 3 images each (from data/cities/*.js) ---------------- */
const CITY_DIR = path.join(ROOT, 'data', 'cities');
for (const f of fs.readdirSync(CITY_DIR).filter((x) => x.endsWith('.js')).sort()) {
  const c = require(path.join(CITY_DIR, f));
  const isTemplate = f === '_template.js';
  const group = isTemplate ? 'Location template ([City] fill-ins)' : `${c.name} page`;
  const N = isTemplate ? '[City]' : c.name;
  add({ slot: `${c.slug}-hero`, group, where: 'Hero, right side', ratio: '5:4', minSize: '1600 × 1280', parallax: true, eager: true, alt: `${N} residential street`, prompt: c.hero.prompt });
  add({ slot: `${c.slug}-about`, group, where: `About ${N}, left image`, ratio: '9:8', minSize: '1400 × 1250', alt: `About ${N}`, prompt: c.about.prompt });
  add({ slot: `${c.slug}-services`, group, where: `How we manage ${N} homes, left image`, ratio: '5:3', minSize: '1500 × 900', alt: `${N} rental home interior`, prompt: c.services.prompt });
}

/* Per-photo crop focus (object-position) where the default centre crop cuts the subject */
const FOCUS = { 'palo-alto-services': '50% 70%' };
for (const s of slots) if (FOCUS[s.slot]) s.focus = FOCUS[s.slot];

/* ---------------- helpers ---------------- */
function findFile(slot) {
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(IMG_DIR, `${slot}.${ext}`))) return `${slot}.${ext}`;
  }
  return null;
}
const all = () => slots.map((s) => ({ ...s, file: findFile(s.slot) }));
const get = (slot) => {
  const s = slots.find((x) => x.slot === slot);
  return s ? { ...s, file: findFile(slot) } : null;
};
const urlFor = (entry) => (entry && entry.file ? `${PAGES_BASE}assets/images/${entry.file}` : null);

module.exports = { all, get, urlFor, findFile, STYLE_LINE, PAGES_BASE, EXTS };
