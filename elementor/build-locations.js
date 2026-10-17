/* Crestline — Service Areas archive + single Location template (Elementor)
 * Run:  node build-locations.js
 * Out:  crestline-service-areas.json, crestline-location-template.json, crestline-location-<slug>.json (one per data/cities file)
 */
const {
  C, SERIF, SANS, px, pct, box, typo, T, anim, widget, con, section, heading, eyebrow, text, button, image, icon,
  headRow, centerHead, step, contactSection, write,
} = require('./lib');
const CITIES = require('./locations-data');

/* ---------------- shared inner-page parts ---------------- */
const crumbs = (items) => text(
  `<nav class="cl-crumbs" aria-label="Breadcrumb">${items.map(([l, h]) => (h ? `<a href="${h}">${l}</a>` : `<span>${l}</span>`)).join('<span aria-hidden="true">/</span>')}</nav>`,
  { t: { family: SANS, size: 12, weight: 400, lh: 1.4 }, color: '#8D96A6', anim: false },
);

/** Navy hero with breadcrumb + image frame */
const pageHero = (o) => section([
  con([
    crumbs(o.crumbs),
    eyebrow(o.eyebrow, { dark: true }),
    heading(o.title, { tag: 'h1', t: T.h1, color: C.white, cls: 'cl-h cl-h--light', mb: 34, delay: 100 }),
    text(`<p>${o.lead}</p>`, { color: C.textLight, maxW: 520, mb: 44, delay: 250 }),
    con([
      button('Get a Free Rental Analysis →', '#contact', 'gold', { delay: 400 }),
      button(o.btn2[0], o.btn2[1], 'outline', { delay: 500 }),
    ], { dir: 'row', gap: 14, wrap: true, dirM: 'column' }),
  ], { width: 54, justify: 'center' }),
  con([
    image('cl-r-5-4', { alt: o.alt, delay: 200, prompt: o.prompt }),
    heading(o.tag, {
      tag: 'div', t: { family: SANS, size: 12, sizeM: 10, weight: 400, lh: 1, ls: 1.9, transform: 'uppercase' }, color: '#E9ECF0',
      cls: 'cl-hero-tag', delay: 700, extra: {
        _padding: box(14, 18, 14, 18), _background_background: 'classic', _background_color: 'rgba(15,29,51,0.82)',
        _border_border: 'solid', _border_width: box(1, 1, 1, 1), _border_color: 'rgba(255,255,255,0.22)',
      },
    }),
  ], {
    width: 46, cls: 'cl-hero-frame', pad: box(14, 14, 14, 14),
    border: { border_border: 'solid', border_width: box(1, 1, 1, 1), border_color: 'rgba(255,255,255,0.2)' },
    extra: anim(150, 'fadeIn', true),
  }),
], { bg: C.navy, dir: 'row', dirT: 'column', gap: 56, align: 'center', pad: box(64, 32, 84, 32), padT: box(56, 32, 72, 32), padM: box(44, 20, 60, 20) });

/** Dark-background head row */
const headRowDark = (eb, title, aside) => con([
  con([eyebrow(eb, { dark: true }), heading(title, { cls: 'cl-h cl-h--light', color: C.white, delay: 100 })], { width: 58 }),
  text(`<p>${aside}</p>`, { color: C.textLight, maxW: 520, delay: 200 }),
], { dir: 'row', dirT: 'column', gap: 60, rowGap: 24, align: 'flex-end', justify: 'space-between', extra: { _margin: box(0, 0, 70, 0), _margin_tablet: box(0, 0, 52, 0) } });

const topCard = (ic, title, body, delay) => con([
  icon(ic, 36),
  heading(title, { tag: 'h3', t: { ...T.h3card, size: 26 }, mb: 18, anim: false }),
  text(`<p>${body}</p>`, { t: T.small, anim: false }),
], {
  cls: 'cl-card', bg: C.white, pad: box(44, 32, 50, 32), padM: box(40, 28, 44, 28),
  border: { border_border: 'solid', border_width: box(2, 0, 0, 0), border_color: C.goldDark },
  extra: anim(delay, 'fadeInUp', true),
});

/** Process section: left copy + image + button, right numbered timeline */
const processSection = (o) => section([
  con([
    eyebrow(o.eyebrow),
    heading(o.title, { cls: 'cl-h', mb: 30, delay: 100 }),
    text(`<p>${o.intro}</p>`, { t: T.small, maxW: 420, mb: 52, delay: 200 }),
    image('cl-r-5-3', { alt: o.alt, mb: 36, delay: 200, prompt: o.prompt }),
    button(o.btn, '#contact', 'navy', { pad: box(22, 28, 22, 28) }),
  ], { width: 42 }),
  con(o.steps.map((s, i) => step(String(i + 1).padStart(2, '0'), s[0], s[1], s[2], i * 100, i === o.steps.length - 1)),
    { width: 58, cls: 'cl-timeline', pad: box(0, 0, 0, 50), padM: box(0, 0, 0, 36) }),
], { bg: o.bg || C.cream, dir: 'row', dirT: 'column', gap: 80, align: 'flex-start' });

const faqAccordion = (items) => con([
  widget('accordion', {
    tabs: items.map(([q, a]) => ({ _id: require('crypto').randomBytes(4).toString('hex').slice(0, 7), tab_title: q, tab_content: `<p>${a}</p>` })),
    selected_icon: { value: 'fas fa-plus', library: 'fa-solid' },
    selected_active_icon: { value: 'fas fa-minus', library: 'fa-solid' },
    title_html_tag: 'h3', icon_align: 'right', faq_schema: 'yes',
    border_width: px(1), border_color: '#DEDAD3',
    title_background: 'rgba(0,0,0,0)', title_color: '#2B3446', tab_active_color: C.goldDark,
    icon_color: C.goldDark, icon_active_color: C.goldDark, icon_space: px(20),
    ...typo('title_typography', { family: SERIF, size: 24, sizeM: 21, weight: 400, lh: 1.3 }),
    content_background_color: 'rgba(0,0,0,0)', content_color: '#8A8E96',
    ...typo('content_typography', { family: SANS, size: 15.5, weight: 300, lh: 1.8 }),
    _css_classes: 'cl-faq', ...anim(200),
  }),
], { extra: { width: px(860), width_tablet: pct(100) } });

const chipsHtml = (items) => text(`<div class="cl-chips">${items.join('')}</div>`, { anim: false, extra: {} });

/* =====================================================================
   SERVICE AREAS — ARCHIVE
   ===================================================================== */
const saHero = pageHero({
  crumbs: [['Home', '/'], ['Service Areas']],
  eyebrow: 'Peninsula &amp; Silicon Valley',
  title: 'Areas<br><em>We Serve</em>',
  lead: 'Hands-on property management across the Peninsula and Silicon Valley. Every city has its own renters, rents and rules, so each area page covers local market numbers, neighborhoods and the regulations that apply to your property.',
  btn2: ['Find Your City ↓', '#cities'],
  alt: 'Aerial view of a Silicon Valley neighborhood',
  prompt: 'Aerial view of a leafy Silicon Valley neighborhood at golden hour, tree-lined streets of single-family homes with rolling Santa Cruz foothills in the distance, warm soft light, slight haze, editorial real-estate photography, photorealistic, no text',
  tag: 'Santa Clara &amp; San Mateo Counties',
});

const statT = { family: SERIF, size: 46, sizeM: 38, weight: 400, lh: 1 };
const statLabel = { family: SANS, size: 12, sizeM: 10, weight: 400, lh: 1.5, ls: 3.1, transform: 'uppercase' };
const counter = (end, prefix, suffix, title, delay) => widget('counter', {
  starting_number: 0, ending_number: end, prefix, suffix, title, duration: 1600, thousand_separator: '',
  number_color: C.heading, title_color: C.muted,
  ...typo('typography_number', statT), ...typo('typography_title', statLabel),
  title_gap: px(18), ...anim(delay),
});
const saStats = section([
  con([
    counter(6, '', '', 'City Guides', 0),
    counter(2, '', '', 'Counties Served', 120),
    counter(60, 'Up to ', '%', 'Of Homes Rented', 240),
    con([
      heading('EN · 中文', { tag: 'div', t: statT, color: C.heading, alignText: 'center', mb: 18, delay: 360 }),
      heading('Owner Support', { tag: 'div', t: statLabel, color: C.muted, alignText: 'center', delay: 360 }),
    ]),
  ], { grid: [4, 2, 2], gap: 30, rowGap: 44 }),
], { bg: C.white, pad: box(56, 32, 56, 32), padT: box(56, 32, 56, 32), padM: box(48, 20, 48, 20) });

const saWhy = section([
  headRow('Why Local Matters', 'Local rules, <em>local know-how.</em>',
    text('<p>Most property managers stop at a services list. We go further, with the neighborhoods, renters and city rules that actually shape your rental.</p>', { maxW: 520, delay: 200 })),
  con([
    topCard('chart', 'Local Rent Snapshot', 'Current rents by home size, and how much of each city rents rather than owns.', 0),
    topCard('home', 'Neighborhood Knowledge', 'The streets, schools and commutes that drive demand and price, block by block.', 100),
    topCard('clipboard', 'City Rent Rules', 'Lease, eviction, relocation and registration rules, explained in plain English.', 200),
    topCard('shield', 'Compliance Handled', 'We file, notify and update as City Council rules change, so you stay protected.', 300),
  ], { grid: [4, 2, 1], gap: 28 }),
], { bg: C.cream });

const locStat = (val, label, first) => con([
  heading(val, { tag: 'div', t: { family: SERIF, size: 28, weight: 400, lh: 1 }, anim: false }),
  heading(label, { tag: 'div', t: { family: SANS, size: 10.5, weight: 400, lh: 1.4, ls: 2.1, transform: 'uppercase' }, color: C.muted, anim: false, extra: { _margin: box(8, 0, 0, 0) } }),
], {
  pad: box(16, 0, 16, first ? 0 : 20),
  ...(first ? {} : { border: { border_border: 'solid', border_width: box(0, 0, 0, 1), border_color: C.line } }),
});
const locCard = (c, i) => con([
  image('cl-r-4-3', { alt: `${c.name} rental home`, anim: false, prompt: c.prompt }),
  con([
    heading(c.county, { tag: 'div', t: T.meta, color: C.eyebrowLight, mb: 10, anim: false }),
    heading(c.name, { tag: 'h3', t: { ...T.h3, size: 32, sizeM: 28 }, cls: 'cl-post-title', mb: 12, anim: false }),
    text(`<p>${c.intro}</p>`, { t: { family: SANS, size: 15, weight: 300, lh: 1.7 }, mb: 24, anim: false }),
    con([locStat(c.rent2, 'Avg. 2-bed rent', true), locStat(c.rented, 'Homes rented')], {
      grid: [2, 2, 2], gap: 0,
      border: { border_border: 'solid', border_width: box(1, 0, 1, 0), border_color: C.line },
      extra: { _margin: box(0, 0, 20, 0) },
    }),
    chipsHtml([`<div class="cl-tags">${c.tags.map((t) => `<span class="cl-tag">${t}</span>`).join('')}</div>`]),
    heading(`View ${c.name} →`, { tag: 'div', t: { family: SANS, size: 13, weight: 400, lh: 1, ls: 2.9, transform: 'uppercase' }, color: C.goldDark, cls: 'cl-link', anim: false, extra: { _margin: box(6, 0, 0, 0) } }),
  ], { pad: box(32, 32, 34, 32), padM: box(26, 24, 28, 24), extra: { flex_grow: 1 } }),
], { cls: 'cl-loc cl-card cl-zoom', bg: C.white, tag: 'a', link: `/service-areas/${c.slug}/`, extra: anim((i % 3) * 100, 'fadeInUp', true) });

const saCities = section([
  headRow('Our Cities', 'Choose <em>your city</em>',
    text('<p>Each city page has local rents, neighborhoods, the renters you can expect and the rent rules that apply to your property.</p>', { maxW: 520, delay: 200 })),
  con(CITIES.map(locCard), { grid: [3, 2, 1], gap: 34 }),
], { bg: C.sand, extra: { _element_id: 'cities' } });

const tableHtml = `<div class="cl-table-wrap"><table class="cl-table"><thead><tr><th scope="col">City</th><th scope="col">Avg. 2-bed rent</th><th scope="col">Homes rented</th><th scope="col">Local rent control</th><th scope="col">Lease rule</th><th scope="col">No-fault relocation</th></tr></thead><tbody>${
  CITIES.map((c) => `<tr><th scope="row"><a href="/service-areas/${c.slug}/">${c.name}</a></th><td>${c.rent2}</td><td>${c.rented}</td><td${c.rentControl.startsWith('Yes') ? ' class="cl-yes"' : ''}>${c.rentControl}</td><td${c.leaseRule.startsWith('No') ? '' : ' class="cl-yes"'}>${c.leaseRule}</td><td>${c.relocation}</td></tr>`).join('')
}</tbody></table></div><p class="cl-note">Summary only, not legal advice. Rules change often; see each city page and the official city resource. Rents: Rentometer, 2025–2026. AMI = area median income. BMR = below market rate.</p>`;
const saTable = section([
  centerHead('Rent Rules at a Glance', 'How the cities <em>compare</em>', 'A quick summary for owners. Each city page has the full details and a link to the official city resource.', { mb: 64 }),
  text(tableHtml, { t: { family: SANS, size: 15, weight: 300, lh: 1.55 }, color: C.text, delay: 200 }),
], { bg: C.white });

const saProcess = processSection({
  eyebrow: 'Getting Started',
  title: 'Wherever you own,<br><em>four simple steps.</em>',
  intro: 'Local or overseas, the process is the same. One conversation, one clear agreement, and we take care of the rest.',
  alt: 'Handing over house keys', btn: 'Book a Free Consultation →',
  prompt: 'Property manager handing a set of house keys to a homeowner on the front steps of a modern Bay Area home, hands and keys in focus, warm natural light, editorial lifestyle photography, photorealistic, no faces',
  steps: [
    ['Free Consultation', 'A relaxed conversation about your property, your goals and the rules that apply in your city.', 'Day 1 · No obligation'],
    ['Local Rental Analysis', 'We price your home with recent comps from your neighborhood, school area and season.', 'Within 3 days'],
    ['Sign &amp; Onboard', 'A simple agreement. We collect keys and documents and set up every city filing your property needs.', 'Simple paperwork'],
    ['We Take It From Here', 'Marketing, screening, rent collection, repairs and compliance, all handled, with clear monthly statements.', 'Ongoing care'],
  ],
});

const saAlso = section([
  con([
    eyebrow('Also Serving'),
    heading('Nearby cities <em>we cover</em>', { cls: 'cl-h', mb: 24, delay: 100 }),
    text('<p>Our office is in Los Altos, and we manage homes across the surrounding cities too. Don’t see yours? Ask us. We may still be able to help.</p>', { maxW: 460, mb: 30, delay: 200 }),
    heading('Ask About Your City →', { tag: 'div', t: { family: SANS, size: 13, weight: 400, lh: 1, ls: 2.9, transform: 'uppercase' }, color: C.goldDark, cls: 'cl-link', link: '#contact', delay: 300 }),
  ], { width: 45 }),
  con([
    chipsHtml(CITIES.ALSO_SERVING.map((n) => `<span class="cl-chip">${n}${n === 'Los Altos' ? ' <small>Home office</small>' : ''}</span>`)),
  ], { width: 55, extra: anim(150, 'fadeInUp', true) }),
], { bg: C.sand, dir: 'row', dirT: 'column', gap: 80, align: 'center' });

const archive = [saHero, saStats, saWhy, saCities, saTable, saProcess, saAlso, contactSection()];

/* =====================================================================
   LOCATION PAGES — built from data/cities/*.js
   (_template.js = the reusable template with [Bracket] fields)
   ===================================================================== */
const fs = require('fs');
const path = require('path');
const CITY_DIR = path.join(__dirname, '..', 'data', 'cities');
const CITY_FILES = fs.readdirSync(CITY_DIR).filter((f) => f.endsWith('.js'));
const slugOf = (name) => name.toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const take = (ic, title, body, delay) => con([
  icon(ic, 14),
  heading(title, { tag: 'h3', t: { family: SERIF, size: 22, weight: 500, lh: 1.25 }, mb: 12, anim: false }),
  text(`<p>${body}</p>`, { t: { family: SANS, size: 15, weight: 300, lh: 1.7 }, anim: false }),
], { extra: anim(delay, 'fadeInUp', true) });
const mini = (v, l) => con([
  heading(v, { tag: 'div', t: { family: SERIF, size: 38, sizeM: 32, weight: 400, lh: 1 }, anim: false }),
  heading(l, { tag: 'div', t: { family: SANS, size: 11, weight: 400, lh: 1.4, ls: 2.4, transform: 'uppercase' }, color: C.muted, anim: false, extra: { _margin: box(10, 0, 0, 0) } }),
], { extra: { width: { unit: 'px', size: '' } } });
const tile = (num, label) => con([
  heading(num, { tag: 'div', t: { family: SERIF, size: 54, sizeM: 38, weight: 400, lh: 1 }, color: C.white, anim: false }),
  heading(label, { tag: 'div', t: { family: SANS, size: 12, sizeM: 10.5, weight: 400, lh: 1.4, ls: 2.9, transform: 'uppercase' }, color: '#9AA3B2', anim: false, extra: { _margin: box(16, 0, 0, 0) } }),
], { cls: 'cl-tile', pad: box(44, 40, 46, 40), padM: box(30, 20, 32, 20), border: { border_border: 'solid', border_width: box(0, 1, 1, 0), border_color: 'rgba(255,255,255,0.14)' } });
const hood = (name, desc, delay) => con([
  heading(name, { tag: 'h3', t: { ...T.h3, size: 27 }, mb: desc ? 12 : 0, anim: false }),
  ...(desc ? [text(`<p>${desc}</p>`, { t: { family: SANS, size: 15.5, weight: 300, lh: 1.75 }, anim: false })] : []),
], { pad: box(34, 0, 46, 0), border: { border_border: 'solid', border_width: box(1, 0, 0, 0), border_color: '#A8885A' }, extra: anim(delay, 'fadeInUp', true) });
const rule = (n, title, body) => con([
  heading(String(n).padStart(2, '0'), { tag: 'div', t: { family: SERIF, size: 28, weight: 400, lh: 1, style: 'italic' }, color: C.goldDark, anim: false, extra: { _element_width: 'initial', _element_custom_width: px(60), _margin: box(4, 0, 0, 0) } }),
  con([
    heading(title, { tag: 'h3', t: { family: SERIF, size: 26, sizeM: 23, weight: 500, lh: 1.25 }, mb: 10, anim: false }),
    text(`<p>${body}</p>`, { t: { family: SANS, size: 15.5, weight: 300, lh: 1.8 }, anim: false }),
  ], { extra: { flex_grow: 1, width: { unit: 'px', size: '' } } }),
], {
  dir: 'row', dirT: 'row', dirM: 'row', gap: 10, align: 'flex-start', pad: box(32, 0, 34, 0),
  border: { border_border: 'solid', border_width: box(0, 0, 1, 0), border_color: C.line }, extra: anim(0, 'fadeInUp', true),
});
const dl = (t, d) => con([
  heading(t, { tag: 'div', t: { family: SANS, size: 10.5, weight: 400, lh: 1.4, ls: 2.3, transform: 'uppercase' }, color: C.goldSoft, anim: false }),
  heading(d, { tag: 'div', t: { family: SANS, size: 15, weight: 300, lh: 1.5 }, color: '#E6E9EE', anim: false, extra: { _margin: box(6, 0, 0, 0) } }),
], { pad: box(18, 0, 18, 0), border: { border_border: 'solid', border_width: box(0, 0, 1, 0), border_color: 'rgba(255,255,255,0.14)' } });
const fee = (big, small) => con([
  heading(big, { tag: 'div', t: { family: SERIF, size: 50, weight: 400, lh: 1 }, color: C.white, anim: false }),
  heading(small, { tag: 'div', t: { family: SANS, size: 13.5, weight: 300, lh: 1.5 }, color: C.textLight, anim: false, extra: { _margin: box(12, 0, 0, 0) } }),
], { pad: box(6, 28, 6, 28), padM: box(20, 0, 0, 0), border: { border_border: 'solid', border_width: box(0, 0, 0, 1), border_color: 'rgba(255,255,255,0.14)' }, extra: { border_width_mobile: box(1, 0, 0, 0) } });

function locationPage(c) {
  const N = c.name;
  const out = [];

  out.push(pageHero({
    crumbs: [['Home', '/'], ['Service Areas', '/service-areas/'], [N]],
    eyebrow: `${c.county} · Service Area`,
    title: `${N}<br><em>Property Management</em>`,
    lead: c.hero.lead,
    btn2: ['Call 650 889 0570', 'tel:6508890570'],
    alt: `${N} residential street`, prompt: c.hero.prompt, tag: c.hero.tag,
  }));

  if (c.takeaways) out.push(section([
    con(c.takeaways.map(([ic, t, p], i) => take(ic, t, p, i * 100)), { grid: [4, 2, 1], gap: 40 }),
  ], { bg: C.white, pad: box(60, 32, 60, 32), padT: box(56, 32, 56, 32), padM: box(48, 20, 48, 20), extra: { border_border: 'solid', border_width: box(0, 0, 1, 0), border_color: '#F0ECE4' } }));

  out.push(section([
    con([
      image('cl-r-9-8', { alt: `About ${N}`, animType: 'fadeInLeft', prompt: c.about.prompt }),
      con([
        heading(N, { tag: 'div', t: { family: SERIF, size: 40, sizeM: 30, weight: 400, lh: 1 }, color: C.gold, mb: 16, anim: false }),
        heading(c.county, { tag: 'div', t: { family: SANS, size: 13, sizeM: 11, weight: 400, lh: 1, ls: 2.9, transform: 'uppercase' }, color: '#E9ECF0', anim: false }),
      ], { cls: 'cl-about-badge', bg: C.navy, pad: box(34, 40, 36, 40), padM: box(22, 24, 22, 24), extra: anim(350, 'fadeInUp', true) }),
    ], { width: 50, cls: 'cl-about-media' }),
    con([
      eyebrow(`About ${N}`),
      heading(c.about.title, { cls: 'cl-h', mb: 34, delay: 100 }),
      text(c.about.paras.map((p) => `<p>${p}</p>`).join(''), { maxW: 600, mb: 34, delay: 200 }),
      con(c.about.mini.map(([v, l]) => mini(v, l)), {
        dir: 'row', dirM: 'row', wrap: true, gap: 46, rowGap: 24, pad: box(30, 0, 0, 0),
        border: { border_border: 'solid', border_width: box(1, 0, 0, 0), border_color: '#DDD3C1' }, extra: anim(300, 'fadeInUp', true),
      }),
    ], { width: 50 }),
  ], { bg: C.cream, dir: 'row', dirT: 'column', gap: 90, align: 'center' }));

  const market = section([
    headRowDark('Rental Market Snapshot', `${N} rents <em>at a glance</em>`, `Typical asking rents in ${N}. We price every home individually, using recent comps from your street and school area.`),
    con(c.market.tiles.map(([n, l]) => tile(n, l)), { grid: [3, 2, 2], gap: 0, border: { border_border: 'solid', border_width: box(1, 0, 0, 1), border_color: 'rgba(255,255,255,0.14)' }, extra: anim(150, 'fadeInUp', true) }),
    text(`<p>${c.market.note}</p>`, { t: { family: SANS, size: 13, weight: 300, lh: 1.6 }, color: '#8D96A6', delay: 200 }),
  ], { bg: C.deep });
  market.elements[2].settings._margin = box(22, 0, 0, 0);
  out.push(market);

  if (c.renters) out.push(section([
    headRow('Who Rents Here', `Who rents in <em>${N}</em>`,
      heading('Knowing your renters means faster leasing and longer tenancies.', { tag: 'p', t: { family: SERIF, size: 26, sizeM: 22, weight: 400, lh: 1.5, style: 'italic' }, color: C.heading, delay: 200, extra: { _element_width: 'initial', _element_custom_width: px(480), _element_width_tablet: 'inherit' } }),
      { leftW: 64 }),
    con(c.renters.map(([ic, t, p], i) => topCard(ic, t, p, i * 120)), { grid: [3, 2, 1], gap: 34 }),
  ], { bg: C.sand }));

  out.push(processSection({
    bg: C.white, eyebrow: 'Our Services',
    title: `How we manage<br><em>${N} homes.</em>`,
    intro: c.services.intro, alt: `${N} rental home interior`, btn: 'Get a Free Rental Analysis →',
    prompt: c.services.prompt, steps: c.services.steps,
  }));

  out.push(section([
    headRow('Neighborhoods We Serve', `Across <em>${N}</em>`,
      text('<p>Rents can change a lot from one street to the next. We know what each neighborhood offers and who it suits.</p>', { maxW: 520, delay: 200 })),
    con(c.hoods.map(([n, p], i) => hood(n, p, (i % 3) * 100)), { grid: [3, 2, 1], gap: 50, rowGap: 0 }),
  ], { bg: C.cream }));

  const r = c.rules;
  const rules = section([
    headRow('Local Rent Rules', `${N} rules,<br><em>handled for you.</em>`,
      text(`<p>A plain-English summary of the rules that apply to ${N} rentals. Not legal advice. We keep up with every change from City Council.</p>`, { maxW: 520, delay: 200 })),
    con([
      con(r.items.map(([t, p], i) => rule(i + 1, t, p)), { width: 65, border: { border_border: 'solid', border_width: box(1, 0, 0, 0), border_color: C.line } }),
      con([
        eyebrow('City Resource', { dark: true }),
        heading(`Official ${N} tenant &amp; landlord resources`, { tag: 'h3', t: { family: SERIF, size: 30, weight: 400, lh: 1.2 }, color: C.white, mb: 16, anim: false }),
        text('<p>Always confirm current amounts and dates with the city. We do this for every property we manage.</p>', { t: { family: SANS, size: 15, weight: 300, lh: 1.75 }, color: C.textLight, mb: 10, anim: false }),
        con([dl('City help line', r.help), dl('Last reviewed', r.reviewed)], { border: { border_border: 'solid', border_width: box(1, 0, 0, 0), border_color: 'rgba(255,255,255,0.14)' }, extra: { _margin: box(0, 0, 30, 0) } }),
        button('Visit City Website ↗', r.resourceUrl, 'gold', { anim: false, alignBtn: 'justify' }),
        text(`<p>Sources: ${r.sources}</p>`, { t: { family: SANS, size: 12.5, weight: 300, lh: 1.6 }, color: '#8D96A6', anim: false }),
      ], { width: 35, bg: C.navy, cls: 'cl-aside', pad: box(44, 38, 46, 38), padM: box(36, 26, 38, 26), extra: anim(150, 'fadeInRight', true) }),
    ], { dir: 'row', dirT: 'column', gap: 70, align: 'flex-start' }),
  ], { bg: C.white });
  const aside = rules.elements[1].elements[1];
  aside.elements[5].settings._margin = box(22, 0, 0, 0);
  if (r.resourceUrl.startsWith('http')) aside.elements[4].settings.link.is_external = 'on';
  out.push(rules);

  out.push(section([
    con([
      con([
        eyebrow('Management Fees', { dark: true }),
        heading('Simple, <em>honest</em> pricing', { cls: 'cl-h cl-h--light', color: C.white, t: { ...T.h2, size: 48, sizeT: 44, sizeM: 36 }, mb: 26, anim: false }),
        heading('See All Fees →', { tag: 'div', t: { family: SANS, size: 13, weight: 400, lh: 1, ls: 2.9, transform: 'uppercase' }, color: C.gold, cls: 'cl-link', link: '/fees/', anim: false }),
      ], { width: 38 }),
      con([
        fee('8%', 'of monthly rent collected, full management'),
        fee('75%', 'of first month’s rent, leasing only'),
        fee('$0', 'hidden fees and no markup on maintenance'),
      ], { width: 62, grid: [3, 3, 1], gap: 0, rowGap: 22 }),
    ], { bg: C.navy, dir: 'row', dirT: 'column', gap: 60, align: 'center', pad: box(60, 56, 60, 56), padT: box(48, 36, 48, 36), padM: box(40, 24, 40, 24), extra: anim(0, 'fadeInUp', true) }),
  ], { bg: C.sand, pad: box(120, 32, c.review ? 0 : 120, 32), padT: box(88, 32, c.review ? 0 : 88, 32), padM: box(68, 20, c.review ? 0 : 68, 20) }));

  if (c.review) out.push(section([
    eyebrow('Owner Feedback', { center: true }),
    heading('“', { tag: 'div', t: { family: SERIF, size: 80, weight: 400, lh: 0.8 }, color: C.goldDark, alignText: 'center', mb: 26, anim: false }),
    heading(c.review.quote, { tag: 'blockquote', t: { family: SERIF, size: 36, sizeT: 30, sizeM: 26, weight: 400, lh: 1.45, style: 'italic' }, alignText: 'center', mb: 34, delay: 100, extra: { _element_width: 'initial', _element_custom_width: px(900), _element_width_tablet: 'inherit' } }),
    con([
      heading(c.review.initials, { tag: 'div', t: { family: SERIF, size: 17, weight: 400, lh: 1 }, color: C.gold, cls: 'cl-avatar', anim: false }),
      heading(c.review.who, { tag: 'div', t: { family: SANS, size: 12, weight: 400, lh: 1.5, ls: 2.4, transform: 'uppercase' }, color: C.muted, anim: false }),
    ], { dir: 'row', dirM: 'row', gap: 14, align: 'center', justify: 'center', extra: anim(200, 'fadeInUp', true) }),
  ], { bg: C.sand, align: 'center' }));

  out.push(section([
    centerHead(`${N} Owner Questions`, `${N} <em>FAQs</em>`, null, { mb: 64 }),
    faqAccordion(c.faq),
  ], { bg: C.white, align: 'center' }));

  const chipLink = (n) => (n.startsWith('[') ? '#' : (n === 'Los Altos' ? '/service-areas/' : `/service-areas/${slugOf(n)}/`));
  out.push(section([
    con([eyebrow('Nearby Cities'), heading(`Also near <em>${N}</em>`, { cls: 'cl-h', delay: 100 })], { extra: { width: { unit: 'px', size: '' } } }),
    con([chipsHtml([
      ...c.nearby.map((n) => `<a href="${chipLink(n)}" class="cl-chip">${n} <span class="arr">→</span></a>`),
      '<a href="/service-areas/" class="cl-chip">All Service Areas <span class="arr">→</span></a>',
    ])], { extra: { width: { unit: 'px', size: '' }, ...anim(150, 'fadeInUp', true) } }),
  ], { bg: C.cream, dir: 'row', dirT: 'column', gap: 40, align: 'center', extra: { flex_justify_content: 'space-between' }, pad: box(80, 32, 80, 32), padT: box(72, 32, 72, 32), padM: box(60, 20, 60, 20) }));

  out.push(contactSection({
    title: `Get a free rental analysis<br>for your <em>${N}</em> home.`,
    lead: `Tell us about your ${N} property and we’ll send a free rental analysis within 2 business days.`,
  }));
  return out;
}

const pageOpts = { hide_title: 'yes', template: 'elementor_header_footer' };
write('crestline-service-areas.json', 'Crestline — Service Areas', 'page', archive, pageOpts);
for (const f of CITY_FILES) {
  const c = require(path.join(CITY_DIR, f));
  const isTemplate = f === '_template.js';
  write(isTemplate ? 'crestline-location-template.json' : `crestline-location-${c.slug}.json`,
    isTemplate ? 'Crestline — Location Template' : `Crestline — ${c.name}`, 'page', locationPage(c), pageOpts);
}
