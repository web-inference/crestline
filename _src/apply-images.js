/* Fills every image slot in the built HTML pages from data/images.js, and writes IMAGE_PROMPTS.md.
 * A slot is an element tagged data-img="<slot>" with <!--img--><!--/img--> markers inside.
 *   - file exists  -> <img> (assets/images/<slot>.jpg|png|webp)
 *   - file missing -> placeholder showing the file name and the AI prompt
 * Run via:  node _src/build-pages.js   (or directly: node _src/apply-images.js)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IM = require(path.join(ROOT, 'data', 'images.js'));
const entries = IM.all();
const bySlot = Object.fromEntries(entries.map((e) => [e.slot, e]));

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const text = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function inner(e) {
  if (e.file) {
    const cls = 'cl-ph__img' + (e.parallax ? ' cl-ph__img--parallax cl-parallax' : '');
    return `<img class="${cls}" src="assets/images/${e.file}" alt="${attr(e.alt)}"` +
      (e.focus ? ` style="object-position:${e.focus}"` : '') +
      (e.parallax ? ' data-speed="0.06"' : '') +
      (e.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }
  return `<div class="cl-ph__inner${e.parallax ? ' cl-parallax' : ''}"${e.parallax ? ' data-speed="0.06"' : ''}>` +
    `<svg><use href="#i-image"/></svg>${e.slot}.jpg · ${e.ratio}\n          <span class="cl-ph__prompt">${text(e.prompt)}</span></div>`;
}

const RE = /(<div\b[^>]*\bdata-img="([^"]+)"[^>]*>)<!--img-->[\s\S]*?<!--\/img-->/g;
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const unknown = new Set();
let filled = 0, placeholders = 0;
for (const f of pages) {
  const p = path.join(ROOT, f);
  const src = fs.readFileSync(p, 'utf8');
  const out = src.replace(RE, (m, open, slot) => {
    const e = bySlot[slot];
    if (!e) { unknown.add(`${f}: ${slot}`); return m; }
    e.file ? filled++ : placeholders++;
    return `${open}<!--img-->${inner(e)}<!--/img-->`;
  });
  if (out !== src) fs.writeFileSync(p, out);
}
if (unknown.size) { console.error('Unknown image slots:\n  ' + [...unknown].join('\n  ')); process.exit(1); }
console.log(`apply-images: ${filled} photos placed, ${placeholders} placeholders (with prompts) across ${pages.length} pages`);

/* ---------------- IMAGE_PROMPTS.md ---------------- */
const have = entries.filter((e) => e.file);
const need = entries.filter((e) => !e.file && !/^location-template-/.test(e.slot));
const groups = [...new Set(entries.map((e) => e.group))];
const cell = (s) => String(s).replace(/\|/g, '/');

let md = `# Crestline — image list and AI prompts

> Generated from \`data/images.js\` by \`_src/apply-images.js\`. Do not edit by hand; edit \`data/images.js\` and rebuild.

**${have.length} images are in the site. ${need.length} still need to be made** (the location template is not counted; its images are fill-in examples).

## How to add or replace an image
1. Make the image with the prompt in the table (or use your own photo).
2. Save it as **\`assets/images/<File name>.jpg\`** using the exact file name from the table (PNG or WebP also work). Use at least the size shown, in the ratio shown.
3. Give me the files (or drop them in that folder) and say "update images". I run \`node _src/build-pages.js\`, which updates every HTML page and every Elementor template in one go.

## Keep every photo in the same family
- **Style line** (add to the end of any prompt if your tool needs it): \`${IM.STYLE_LINE}\`
- Exteriors: golden hour or soft morning light. Interiors: soft daylight, navy / brass / cream accents. Places look like the Bay Area, not a resort.
- No readable text, no logos, no visible faces. Real photos of the client, team or office are better than AI people whenever they exist.
- Ratio: the page crops to fit, so keep the subject in the middle. Save as JPG, about 200–400 KB, at the sizes below.

## Needed now (${need.length})
`;
for (const g of groups) {
  const rows = need.filter((e) => e.group === g);
  if (!rows.length) continue;
  md += `\n### ${g}\n\n| File name | Used for | Ratio · size | Prompt |\n|---|---|---|---|\n`;
  for (const e of rows) md += `| \`${e.slot}.jpg\` | ${cell(e.where)} | ${e.ratio} · ${e.minSize} | ${cell(e.prompt)} |\n`;
}
md += `\n## Already in the site (${have.length})\n\nThe prompts below describe what each slot needs, in case you ever want to replace the photo.\n\n| File name | Used for | Ratio | Prompt to recreate or replace |\n|---|---|---|---|\n`;
for (const e of have) md += `| \`${e.file}\` | ${cell(e.group)} · ${cell(e.where)} | ${e.ratio} | ${cell(e.prompt)} |\n`;
md += `
## Future city pages
Each new city page (Mountain View, Sunnyvale, San Jose, Menlo Park, Foster City) needs 3 more images, named **\`<city-slug>-hero\`**, **\`<city-slug>-about\`** and **\`<city-slug>-services\`** (for example \`mountain-view-hero.jpg\`). Their prompts are written when the page is built. The Palo Alto page above is the example.

## Location template (fill-ins, not counted)
${entries.filter((e) => /^location-template-/.test(e.slot)).map((e) => `- \`${e.slot}.jpg\`: ${e.prompt}`).join('\n')}
`;
fs.writeFileSync(path.join(ROOT, 'IMAGE_PROMPTS.md'), md);
console.log(`IMAGE_PROMPTS.md written (${need.length} needed, ${have.length} in site)`);
