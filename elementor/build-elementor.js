/* Crestline — Elementor template builder
 * Run:  node build-elementor.js
 * Out:  crestline-home.json, crestline-header.json, crestline-footer.json
 * Target: Elementor Pro 3.16+ with Flexbox Containers (+ Grid container) enabled.
 * Reuse the helpers below for future Crestline pages so they share the same system.
 */
const {
  C, SERIF, SANS, id, px, pct, box, typo, T, anim, widget, con, section, heading, eyebrow, text, button, image, icon,
  headRow, centerHead, step, quote, contactSection, write,
} = require('./lib');
const fs = require('fs');
const path = require('path');
const CITIES = require('./locations-data');
const cityBuilt = (slug) => fs.existsSync(path.join(__dirname, '..', 'data', 'cities', `${slug}.js`));


/* =====================================================================
   HOME PAGE
   ===================================================================== */
const hero = section([
  con([
    eyebrow('Bay Area Property Management', { dark: true }),
    heading('Need Property<br>Management?<br><em>We’ll take it from here.</em>', { tag: 'h1', t: T.h1, color: C.white, cls: 'cl-h cl-h--light', mb: 34, delay: 100 }),
    text('<p>Thoughtful, hands-on care for your rental home. We find great tenants, look after the property and keep you informed, so you can enjoy the returns without the stress.</p>', { color: C.textLight, maxW: 520, mb: 44, delay: 250 }),
    con([
      button('Get a Free Rental Analysis →', '#contact', 'gold', { delay: 400 }),
      button('Explore Our Services', '#services', 'outline', { delay: 500 }),
    ], { dir: 'row', gap: 14, wrap: true, dirM: 'column' }),
    text('<p class="cl-hero__lang"><span class="cl-hero__langtag">EN</span><span class="cl-hero__langtag">中文</span>English &amp; Mandarin support for local, out-of-state and overseas owners</p>', { t: { family: SANS, size: 14, weight: 300, lh: 1.5 }, color: '#AEB6C3', delay: 650 }),
  ], { width: 54, justify: 'center' }),
  con([
    image('cl-r-1-1', { slot: 'home-hero', delay: 200 }),
    heading('Los Altos · Palo Alto · Mountain View', {
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
], {
  bg: C.navy, dir: 'row', dirT: 'column', gap: 56, align: 'center',
  pad: box(80, 32, 90, 32), padT: box(64, 32, 72, 32), padM: box(56, 20, 64, 20),
});

const statT = { family: SERIF, size: 50, sizeM: 40, weight: 400, lh: 1 };
const statLabel = { family: SANS, size: 12, sizeM: 10, weight: 400, lh: 1.5, ls: 3.1, transform: 'uppercase' };
const counter = (end, prefix, suffix, title, delay) => widget('counter', {
  starting_number: 0, ending_number: end, prefix, suffix, title, duration: 1600, thousand_separator: '',
  number_color: C.heading, title_color: C.muted,
  ...typo('typography_number', statT), ...typo('typography_title', statLabel),
  title_gap: px(18), ...anim(delay),
});
const stats = section([
  con([
    counter(10, '', '+', 'Years in Property Management', 0),
    counter(100, '', '%', 'Transparent', 120),
    counter(0, '$', '', 'Hidden Fees', 240),
    con([
      heading('Bay Area', { tag: 'div', t: statT, color: C.heading, alignText: 'center', mb: 18, delay: 360 }),
      heading('Local Market Experts', { tag: 'div', t: statLabel, color: C.muted, alignText: 'center', delay: 360 }),
    ]),
  ], { grid: [4, 2, 2], gap: 30, rowGap: 44 }),
], { bg: C.white, pad: box(56, 32, 56, 32), padT: box(56, 32, 56, 32), padM: box(48, 20, 48, 20) });

const about = section([
  con([
    image('cl-r-9-8', { slot: 'home-about', animType: 'fadeInLeft' }),
    con([
      heading('Los Altos', { tag: 'div', t: { family: SERIF, size: 40, sizeM: 30, weight: 400, lh: 1 }, color: C.gold, mb: 16, anim: false }),
      heading('Local, Boutique Team', { tag: 'div', t: { family: SANS, size: 13, sizeM: 11, weight: 400, lh: 1, ls: 2.9, transform: 'uppercase' }, color: '#E9ECF0', anim: false }),
    ], { cls: 'cl-about-badge', bg: C.navy, pad: box(34, 40, 36, 40), padM: box(22, 24, 22, 24), extra: anim(350, 'fadeInUp', true) }),
  ], { width: 50, cls: 'cl-about-media' }),
  con([
    eyebrow('Who We Are'),
    heading('Local people,<br><em>personal service.</em>', { cls: 'cl-h', mb: 34, delay: 100 }),
    text('<p>We are a boutique property management team based in Los Altos. For more than ten years we have helped Bay Area homeowners rent their properties with confidence, without the stress of handling tenants, repairs and paperwork on their own.</p><p>We keep our portfolio small on purpose. That way every owner gets personal attention, honest advice and a team that treats their home like its own.</p><p>We work with owners in English and Mandarin (中文), whether you live in the Bay Area, out of state or overseas.</p>', { maxW: 600, mb: 30, delay: 200 }),
    heading('More About Us →', { tag: 'div', t: { family: SANS, size: 13, weight: 400, lh: 1, ls: 2.9, transform: 'uppercase' }, color: C.goldDark, cls: 'cl-link', link: '/about-us/', delay: 300 }),
  ], { width: 50 }),
], { bg: C.cream, dir: 'row', dirT: 'column', gap: 90, align: 'center', extra: { _element_id: 'about' } });

const whyItem = (num, title, body, delay) => con([
  heading(num, { tag: 'div', t: { family: SERIF, size: 30, weight: 400, lh: 1, style: 'italic' }, color: C.gold, mb: 28, anim: false }),
  heading(title, { tag: 'h3', t: { ...T.h3, weight: 500 }, color: C.white, mb: 18, anim: false }),
  text(`<p>${body}</p>`, { t: T.small, color: C.textLight, anim: false }),
], {
  pad: box(52, 0, 56, 0), padM: box(36, 0, 40, 0),
  border: { border_border: 'solid', border_width: box(1, 0, 0, 0), border_color: 'rgba(255,255,255,0.14)' },
  extra: anim(delay, 'fadeInUp', true),
});
const why = section([
  con([
    eyebrow('Why Hire Us', { dark: true }),
    heading('Less stress for you, <em>more from your rental.</em>', { color: C.white, cls: 'cl-h cl-h--light', mb: 40, delay: 100 }),
    text('<p>Owning a rental should grow your wealth, not take over your weekends. We handle the day-to-day work so you can enjoy the returns with confidence.</p>', { color: C.textLight, maxW: 520, mb: 44, delay: 200 }),
    button('Talk to Us →', '#contact', 'gold', { delay: 300 }),
  ], { width: 42 }),
  con([
    whyItem('01', 'One Dedicated Manager', 'A single point of contact who knows your property, your tenants and your goals.', 0),
    whyItem('02', 'Fewer Vacant Days', 'Smart pricing and strong marketing help your home rent quickly, so it keeps earning.', 120),
    whyItem('03', 'Honest, Simple Pricing', 'One clear management fee, no surprise charges and no markup on repairs.', 240),
    whyItem('04', 'Flexible Agreements', 'No long lock-in contracts. Simple terms that keep you in control of your property.', 360),
  ], { width: 58, grid: [2, 2, 1], gap: 50, rowGap: 0 }),
], { bg: C.navy, dir: 'row', dirT: 'column', gap: 80, align: 'flex-start' });


const service = (ic, title, body, delay) => con([
  icon(ic),
  heading(title, { tag: 'h3', t: T.h3, mb: 18, anim: false }),
  text(`<p>${body}</p>`, { t: T.small, anim: false }),
], { cls: 'cl-service', pad: box(56, 44, 60, 44), padM: box(40, 28, 44, 28), extra: anim(delay, 'fadeInUp', true) });

const services = section([
  headRow('Owner Services', 'What <em>We Do</em>',
    text('<p>Full-service management for single-family homes, condos and small multi-unit properties. Everything you need, under one roof.</p>', { maxW: 520, delay: 200 })),
  con([
    service('search', 'Tenant Screening', 'Credit, background, income and rental history checks to keep bad tenants out.', 0),
    service('home', 'Marketing &amp; Leasing', 'Professional photos, listings and showings that fill vacancies quickly.', 100),
    service('card', 'Rent Collection', 'On-time rent collection and fast deposits straight to your account.', 200),
    service('wrench', 'Maintenance &amp; Repairs', 'Trusted local vendors and fair pricing, with your approval on larger jobs.', 300),
    service('clipboard', 'Property Inspections', 'Move-in, routine and move-out inspections with photo reports.', 400),
    service('chart', 'Owner Reporting', 'Detailed income and expense records, plus year-end tax documents.', 500),
  ], { grid: [3, 2, 1], rows: 2, gap: 0, cls: 'cl-services' }),
], { bg: C.white, extra: { _element_id: 'services' } });

const lightCard = (ic, title, body, delay) => con([
  icon(ic, 44),
  heading(title, { tag: 'h3', t: T.h3card, mb: 20, anim: false }),
  text(`<p>${body}</p>`, { t: T.small, anim: false }),
], {
  cls: 'cl-card', bg: C.white, pad: box(56, 44, 64, 44), padM: box(42, 30, 48, 30),
  border: { border_border: 'solid', border_width: box(2, 0, 0, 0), border_color: C.goldDark },
  extra: anim(delay, 'fadeInUp', true),
});
const approach = section([
  headRow('Our Approach', 'How We Manage <em>Your Property</em>',
    heading('Your property deserves a manager who truly cares.', { tag: 'p', t: { family: SERIF, size: 26, sizeM: 22, weight: 400, lh: 1.5, style: 'italic' }, color: C.heading, delay: 200, extra: { _element_width: 'initial', _element_custom_width: px(480), _element_width_tablet: 'inherit' } }),
    { leftW: 64 }),
  con([
    lightCard('hand', 'Hands-On Support', 'Say goodbye to DIY stress. We handle everything so you don’t have to lift a finger.', 0),
    lightCard('eye', 'Full Transparency, Always', 'From monthly statements to inspection updates, you’ll always know exactly what’s happening with your property.', 120),
    lightCard('wrench', 'Maintenance Handled', 'From small repairs to emergencies, we coordinate everything quickly, keeping your property in top shape.', 240),
  ], { grid: [3, 2, 1], gap: 34 }),
], { bg: C.sand });

const darkCard = (ic, title, body, delay) => con([
  icon(ic, 44),
  heading(title, { tag: 'h3', t: { ...T.h3card, weight: 500 }, color: C.white, alignText: 'center', mb: 20, anim: false }),
  text(`<p>${body}</p>`, { t: T.small, color: C.textLight, alignText: 'center', anim: false }),
], {
  cls: 'cl-card cl-card--dark', bg: C.card, pad: box(64, 34, 72, 34), padM: box(48, 26, 52, 26), align: 'center',
  border: { border_border: 'solid', border_width: box(1, 1, 1, 1), border_color: 'rgba(255,255,255,0.14)' },
  extra: anim(delay, 'fadeInUp', true),
});
const difference = section([
  centerHead('Our Difference', 'What Makes Us <em>Different</em>', 'Three promises we make to every owner, from the first showing to the last lease renewal.', { dark: true, mb: 84 }),
  con([
    darkCard('key', 'Only the Best Tenants', 'We protect your investment with thorough background, credit and rental history checks, so only the best tenants call your property home.', 0),
    darkCard('houseCheck', 'Cared For Like Our Own', 'We treat your property like our own, coordinating repairs and upkeep with the same care and pride you put into it.', 120),
    darkCard('shield', 'Every Law Handled', 'Rest easy knowing every lease, disclosure and California rental law is handled, so you never have to worry about what you don’t know.', 240),
  ], { grid: [3, 2, 1], gap: 34, pad: box(0, 24, 0, 24), padT: box(0, 0, 0, 0) }),
], { bg: C.deep });

const value = (title, body, delay) => con([
  heading(title, { tag: 'h3', t: T.h3card, mb: 20, anim: false }),
  text(`<p>${body}</p>`, { t: T.small, anim: false }),
], { pad: box(40, 0, 62, 0), border: { border_border: 'solid', border_width: box(1, 0, 0, 0), border_color: '#A8885A' }, extra: anim(delay, 'fadeInUp', true) });
const values = section([
  con([
    eyebrow('Our Core Values'),
    heading('Our core values,<br><em>your peace of mind.</em>', { cls: 'cl-h', mb: 34, delay: 100 }),
    widget('divider', { width: px(96), align: 'left', color: C.navy, weight: px(1), gap: px(0), _margin: box(0, 0, 34, 0), ...anim(200) }),
    heading('Everything we do is built around you.', { tag: 'p', t: { family: SERIF, size: 26, sizeM: 22, weight: 400, lh: 1.4, style: 'italic' }, color: '#5A5F69', mb: 56, delay: 250 }),
    image('cl-r-17-10', { slot: 'home-values', delay: 200 }),
  ], { width: 45 }),
  con([
    value('You Come First', 'Your goals guide every decision we make, from how we price your home to who we choose to live in it.', 0),
    value('Integrity in Everything', 'Transparent, ethical and reliable in every interaction and every transaction.', 120),
    value('Results You Can Count On', 'We measure our success by yours, delivering consistent, reliable results for every property owner we serve.', 240),
    value('Local Expertise', 'Deep knowledge of the Bay Area rental market means smarter decisions for your property.', 360),
  ], { width: 55, grid: [2, 2, 1], gap: 50, rowGap: 0 }),
], { bg: C.sand, dir: 'row', dirT: 'column', gap: 72, align: 'flex-start' });

const process = section([
  con([
    eyebrow('Getting Started'),
    heading('From first call<br>to <em>fully managed.</em>', { cls: 'cl-h', mb: 30, delay: 100 }),
    text('<p>Handing over your property should feel easy. Four calm, clear steps, and we take care of the rest.</p>', { t: T.small, maxW: 420, mb: 52, delay: 200 }),
    image('cl-r-5-3', { slot: 'home-process', mb: 36, delay: 200 }),
    button('Book a Free Consultation →', '#contact', 'navy', { pad: box(22, 28, 22, 28) }),
  ], { width: 42 }),
  con([
    step('01', 'Free Consultation', 'A relaxed conversation about your property, your goals and any concerns you have about renting it out.', 'Day 1 · No obligation', 0),
    step('02', 'Rental Analysis', 'We visit the home and price it using current Bay Area market data, so it rents quickly at the right rate.', 'Within 3 days', 100),
    step('03', 'Sign &amp; Onboard', 'A simple, clear agreement. We collect the keys, documents and property details, and set up your owner account.', 'Simple paperwork', 200),
    step('04', 'We Take It From Here', 'Marketing, tenant screening, rent collection and repairs, all handled. You get clear monthly statements and peace of mind.', 'Ongoing care', 300, true),
  ], { width: 58, cls: 'cl-timeline', pad: box(0, 0, 0, 50), padM: box(0, 0, 0, 36) }),
], { bg: C.cream, dir: 'row', dirT: 'column', gap: 80, align: 'flex-start' });

const priceCard = (label, amount, unit, items, featured, delay) => con([
  heading(label, { tag: 'div', t: { family: SANS, size: 11.5, weight: 400, lh: 1.4, ls: 2.3, transform: 'uppercase' }, color: featured ? C.gold : '#8E9198', mb: 34, anim: false }),
  heading(amount, { tag: 'div', t: { family: SERIF, size: 54, sizeM: 44, weight: 400, lh: 1 }, color: featured ? C.white : C.heading, mb: 6, anim: false }),
  heading(unit, { tag: 'div', t: { family: SANS, size: 15, weight: 300, lh: 1.5 }, color: featured ? C.textLight : '#8E9198', anim: false }),
  widget('divider', { color: featured ? 'rgba(255,255,255,0.16)' : '#E0D6C2', weight: px(1), gap: px(0), _margin: box(34, 0, 22, 0) }),
  text(`<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`, { cls: 'cl-price-list', t: { family: SANS, size: 15.5, weight: 300, lh: 1.6 }, color: featured ? '#E6E9EE' : '#4D525C', anim: false }),
], {
  cls: 'cl-card', bg: featured ? C.navy : C.cream, pad: box(50, 36, 56, 36),
  border: { border_border: 'solid', border_width: box(1, 1, 1, 1), border_color: featured ? C.navy : '#E3D9C4' },
  extra: anim(delay, 'fadeInUp', true),
});
const pricing = section([
  centerHead('Management Fees', 'Simple, <em>honest</em> pricing', '100% transparent, with $0 hidden fees. You always know what you pay and why.'),
  con([
    priceCard('Leasing Only', '75%', 'of first month’s rent', ['✓ Rental pricing analysis', '✓ Professional photos and listing', '✓ Showings and full tenant screening', '✓ Lease preparation and move-in report'], false, 0),
    priceCard('Full Management · Most Popular', '8%', 'of monthly rent collected', ['✓ Everything in Leasing Only', '✓ Rent collection and monthly deposits', '✓ 24/7 maintenance coordination', '✓ Routine inspections with photo reports', '✓ Monthly statements and year-end 1099'], true, 120),
    priceCard('Other Fees', '$250', 'one-time setup fee', ['Lease renewal: $200', 'Eviction support: at cost', 'Vacancy fee: none', 'Maintenance markup: none'], false, 240),
  ], { grid: [3, 2, 1], gap: 28 }),
], { bg: C.white, extra: { _element_id: 'fees' } });

const area = (name, href, delay, slot) => con([
  image('cl-r-4-3', { slot, anim: false }),
  con([
    heading(name, { tag: 'h3', t: { ...T.h3, size: 28 }, anim: false }),
    heading('→', { tag: 'div', t: { family: SANS, size: 20, weight: 300, lh: 1 }, color: C.goldDark, cls: 'cl-arrow', anim: false }),
  ], {
    dir: 'row', dirM: 'row', justify: 'space-between', align: 'center', cls: 'cl-area-row', pad: box(26, 0, 24, 0),
    border: { border_border: 'solid', border_width: box(0, 0, 1, 0), border_color: '#D8D0C1' },
  }),
], { cls: 'cl-area cl-zoom', tag: 'a', link: href, extra: anim(delay, 'fadeInUp', true) });
const areas = section([
  headRow('Service Areas', 'Areas <em>We Serve</em>',
    text('<p>Each area links to its own page with local history and rental insights. New areas can be added any time.</p>', { maxW: 520, delay: 200 })),
  con([
    ...CITIES.map((c, i) => area(c.name, cityBuilt(c.slug) ? `/service-areas/${c.slug}/` : '/service-areas/#cities', (i % 3) * 100, `city-${c.slug}`)),
  ], { grid: [3, 2, 1], gap: 28, rowGap: 40 }),
  text(`<p>Our office is in Los Altos. Also serving: ${CITIES.ALSO_SERVING.filter((n) => n !== 'Los Altos').join(' · ')}</p>`, { t: { family: SANS, size: 14, weight: 300, lh: 1.6 }, color: '#8E9198', delay: 100, extra: {} }),
], { bg: C.cream, extra: { _element_id: 'areas', border_border: 'solid', border_width: box(1, 0, 0, 0), border_color: '#E7E1D6' } });
// spacing above "Also serving"
areas.elements[2].settings._margin = box(30, 0, 0, 0);

const testimonials = section([
  centerHead('Client Feedback', 'What our <em>owners say</em>'),
  con([
    quote('We moved overseas and were nervous about renting our home. They found wonderful tenants within two weeks and we have not had a single worry since.', 'SM', 'Sarah M. · Owner, Los Altos', 0),
    quote('Clear statements every month, quick answers and repairs handled at fair prices. It finally feels like someone is looking after my property properly.', 'DK', 'David K. · Owner, Palo Alto', 120),
    quote('Their screening is thorough and their advice on California rental rules saved me from a costly mistake. Professional, honest and kind.', 'JL', 'Jenny L. · Owner, Sunnyvale', 240),
  ], { grid: [3, 2, 1], gap: 28 }),
], { bg: C.sand });

const post = (meta, title, excerpt, delay, slot) => con([
  image('cl-r-post', { slot, mb: 28, anim: false }),
  heading(meta, { tag: 'div', t: T.meta, color: C.eyebrowLight, mb: 12, anim: false }),
  heading(title, { tag: 'h3', t: { family: SERIF, size: 27, sizeM: 25, weight: 400, lh: 1.28 }, cls: 'cl-post-title', mb: 14, anim: false }),
  text(`<p>${excerpt}</p>`, { t: { family: SANS, size: 15, weight: 300, lh: 1.75 }, anim: false }),
], { cls: 'cl-post cl-zoom', tag: 'a', link: '#', extra: anim(delay, 'fadeInUp', true) });
const blog = section([
  headRow('Owner Insights', 'From the <em>Blog</em>',
    heading('View All Articles →', { tag: 'div', t: { family: SANS, size: 13, weight: 400, lh: 1, ls: 2.9, transform: 'uppercase' }, color: C.goldDark, cls: 'cl-link', link: '/blog/', delay: 200 }),
    { mb: 56 }),
  con([
    post('Tenant Risk · Sep 18, 2026', '5 warning signs of a bad tenant, and how to spot them early', 'From gaps in rental history to rushed move-in dates, here is what our screening looks for.', 0, 'blog-tenant-risk'),
    post('Owner Tips · Sep 4, 2026', 'How to prepare your home for a higher rent', 'Small, smart upgrades that help Bay Area rentals lease faster and earn more.', 120, 'blog-owner-tips'),
    post('Local Market · Aug 21, 2026', 'Bay Area rental market update: fall 2026', 'Where rents are heading in Los Altos, Palo Alto and nearby cities this season.', 240, 'blog-market-update'),
  ], { grid: [3, 2, 1], gap: 36, rowGap: 48 }),
], { bg: C.cream, extra: { _element_id: 'blog' } });

const faqItems = [
  ['How much does property management cost?', 'Full management is 8% of the monthly rent collected, and leasing only is 75% of the first month’s rent. There are no hidden fees and no markup on maintenance.'],
  ['How do you screen tenants?', 'Every applicant goes through credit, background, income and rental history checks. We verify employment and speak with previous landlords before recommending anyone to you.'],
  ['How quickly can you rent my home?', 'Most homes rent within two to three weeks. Smart pricing, professional photos and quick showings keep vacant days to a minimum.'],
  ['What happens with the security deposit?', 'We collect and hold the deposit in line with California law, document the home at move-in and move-out, and handle any deductions with a clear, itemized statement.'],
];
const faq = section([
  centerHead('Owner Questions', 'Owner <em>FAQs</em>', null, { mb: 64 }),
  con([
    widget('accordion', {
      tabs: faqItems.map(([q, a]) => ({ _id: id(), tab_title: q, tab_content: `<p>${a}</p>` })),
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
  ], { extra: { width: px(860), width_tablet: pct(100) } }),
], { bg: C.white, align: 'center' });


const contact = contactSection({ extraLine: 'English &amp; 中文 spoken' });

const home = [hero, stats, about, why, services, approach, difference, values, process, pricing, areas, testimonials, blog, faq, contact];

/* =====================================================================
   HEADER (Theme Builder > Header)
   ===================================================================== */
const logo = (o = {}) => con([
  heading('Crestline', { tag: 'div', t: { family: SERIF, size: 29, sizeM: 25, weight: 500, lh: 1 }, color: C.white, link: '/', anim: false }),
  heading('Property Management', { tag: 'div', t: { family: SANS, size: 10, weight: 400, lh: 1, ls: 3.4, transform: 'uppercase' }, color: C.goldSoft, anim: false, extra: { _margin: box(o.subGap || 8, 0, 0, 0) } }),
], { extra: { width: { unit: 'px', size: '' } } });

const topbar = con([
  text('<p><a href="tel:6508890570" style="color:inherit;margin-right:28px">650 889 0570</a><a href="mailto:realtor@baliliu.homes" style="color:inherit">realtor@baliliu.homes</a></p>', { t: { family: SANS, size: 13, sizeM: 12, weight: 300, lh: 1 }, color: '#AEB6C3', anim: false }),
  heading('Licensed &amp; Insured · DRE #01234567', { tag: 'div', t: { family: SANS, size: 12.5, weight: 300, lh: 1, ls: 0.8, transform: 'uppercase' }, color: '#AEB6C3', anim: false, extra: { _element_hide_mobile: 'hidden-mobile', hide_mobile: 'hidden-mobile' } }),
], { boxed: true, dir: 'row', dirM: 'row', justify: 'space-between', align: 'center', bg: C.deep, pad: box(10, 32, 10, 32), padM: box(10, 20, 10, 20) });

const mainHeader = con([
  logo(),
  con([
    widget('nav-menu', {
      menu: '', layout: 'horizontal', align_items: 'right', pointer: 'underline', animation_line: 'slide',
      dropdown: 'tablet', toggle: 'burger', full_width: 'stretch',
      ...typo('menu_typography', { family: SANS, size: 13, weight: 400, lh: 1, ls: 1.7, transform: 'uppercase' }),
      color_menu_item: '#E6E9EE', color_menu_item_hover: C.gold, pointer_color_menu_item_hover: C.gold,
      color_menu_item_active: C.gold, pointer_color_menu_item_active: C.gold,
      padding_horizontal_menu_item: px(13), pointer_width: px(1),
      background_color_dropdown_item: C.navy, color_dropdown_item: '#E6E9EE', color_dropdown_item_hover: C.gold,
      background_color_dropdown_item_hover: C.navy,
      ...typo('dropdown_typography', { family: SANS, size: 13, weight: 400, ls: 1.7, transform: 'uppercase' }),
      toggle_color: C.white, toggle_background_color: 'rgba(0,0,0,0)',
      _css_classes: 'cl-nav',
    }),
    button('Free Rental Analysis', '#contact', 'gold', { anim: false, pad: box(16, 19, 16, 19), t: { ...T.btn, weight: 400, ls: 1.7 } }),
  ], { dir: 'row', dirM: 'row', gap: 26, align: 'center', extra: { width: { unit: 'px', size: '' } } }),
], {
  boxed: true, dir: 'row', dirT: 'row', dirM: 'row', justify: 'space-between', align: 'center', bg: C.navy, cls: 'cl-sticky-header',
  pad: box(0, 32, 0, 32), padM: box(0, 20, 0, 20), minH: 82,
  border: { border_border: 'solid', border_width: box(0, 0, 1, 0), border_color: 'rgba(255,255,255,0.14)' },
  extra: { sticky: 'top', sticky_on: ['desktop', 'tablet', 'mobile'], sticky_effects_offset: 40 },
});
// hide the gold CTA on mobile (it lives inside the burger menu instead)
mainHeader.elements[1].elements[1].settings.hide_mobile = 'hidden-mobile';

/* =====================================================================
   FOOTER (Theme Builder > Footer)
   ===================================================================== */
const footHead = (t) => heading(t, { tag: 'h4', t: { family: SANS, size: 12, weight: 500, lh: 1.2, ls: 2.9, transform: 'uppercase' }, color: C.white, mb: 24, anim: false, extra: { _margin: box(4, 0, 24, 0) } });
const footList = (items) => text(`<ul>${items.map(([l, h]) => (h ? `<li><a href="${h}">${l}</a></li>` : `<li>${l}</li>`)).join('')}</ul>`, { cls: 'cl-footer-links', t: { family: SANS, size: 15, weight: 300, lh: 1.5 }, color: '#A7AFBC', anim: false });
const footer = [
  con([
    con([
      logo({ subGap: 14 }),
      text('<p>Thoughtful property management for Bay Area homeowners.</p>', { t: { family: SANS, size: 15, weight: 300, lh: 1.65 }, color: '#A7AFBC', maxW: 280, anim: false, mb: 0 }),
    ], { gap: 28 }),
    con([footHead('Company'), footList([['About Us', '/about-us/'], ['Owner Services', '/owner-services/'], ['Fees', '/fees/'], ['Blog', '/blog/'], ['Contact', '/contact/']])]),
    con([footHead('Service Areas'), footList([['Palo Alto', '/service-areas/palo-alto/'], ['Mountain View', '/service-areas/mountain-view/'], ['Sunnyvale', '/service-areas/sunnyvale/'], ['San Jose', '/service-areas/san-jose/'], ['Menlo Park', '/service-areas/menlo-park/'], ['Foster City', '/service-areas/foster-city/']])]),
    con([footHead('Contact'), footList([['650 889 0570', 'tel:6508890570'], ['realtor@baliliu.homes', 'mailto:realtor@baliliu.homes'], ['175 S San Antonio Rd, #100, Los Altos, CA'], ['DRE #01234567']])]),
  ], { boxed: true, grid: [4, 2, 1], gap: 40, rowGap: 48, bg: C.deep, pad: box(72, 32, 46, 32), padM: box(56, 20, 40, 20) }),
  con([
    con([
      text('<p>© 2026 Crestline Property Management. All rights reserved.</p>', { t: { family: SANS, size: 13, weight: 300, lh: 1.5 }, color: '#A7AFBC', anim: false }),
      text('<p><a href="/privacy-policy/" style="color:inherit">Privacy Policy</a> · <a href="/terms/" style="color:inherit">Terms</a> · <a href="/fair-housing/" style="color:inherit">Fair Housing</a></p>', { t: { family: SANS, size: 13, weight: 300, lh: 1.5 }, color: '#A7AFBC', anim: false }),
    ], {
      dir: 'row', dirM: 'column', justify: 'space-between', gap: 20, rowGap: 8, pad: box(24, 0, 28, 0),
      border: { border_border: 'solid', border_width: box(1, 0, 0, 0), border_color: 'rgba(255,255,255,0.07)' },
    }),
  ], { boxed: true, bg: C.deep, pad: box(0, 32, 0, 32), padM: box(0, 20, 0, 20) }),
];

write('crestline-home.json', 'Crestline — Home', 'page', home, { hide_title: 'yes', template: 'elementor_header_footer' });
write('crestline-header.json', 'Crestline — Header', 'header', [topbar, mainHeader]);
write('crestline-footer.json', 'Crestline — Footer', 'footer', footer);
