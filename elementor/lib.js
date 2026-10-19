/* Crestline — shared Elementor builder library (tokens, helpers, shared sections).
 * Used by build-elementor.js (home/header/footer) and build-locations.js (service areas).
 */
const fs = require('fs');
const path = require('path');

const CSS = fs.readFileSync(path.join(__dirname, 'crestline-global.css'), 'utf8');

/* ---------------- tokens ---------------- */
const C = {
  navy: '#0F1D33', deep: '#0A1424', card: '#132340', gold: '#C4A467', goldDark: '#8B6A35',
  goldSoft: '#B89A5E', eyebrowLight: '#A8874F', cream: '#F7F4EE', sand: '#EFE8DC', white: '#FFFFFF',
  line: '#E6DECF', text: '#6B6F78', textLight: '#C3C9D3', heading: '#14213A', muted: '#9A9EA6',
};
const SERIF = 'Cormorant Garamond';
const SANS = 'Jost';
const PH = '/wp-content/plugins/elementor/assets/images/placeholder.png';

/* ---------------- helpers ---------------- */
const used = new Set();
const id = () => {
  let v;
  do { v = require('crypto').randomBytes(4).toString('hex').slice(0, 7); } while (used.has(v));
  used.add(v);
  return v;
};
const px = (size) => ({ unit: 'px', size, sizes: [] });
const pct = (size) => ({ unit: '%', size, sizes: [] });
const em = (size) => ({ unit: 'em', size, sizes: [] });
const box = (t, r, b, l, unit = 'px') => ({ unit, top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false });
const gap = (c, r = c) => ({ unit: 'px', size: c, column: String(c), row: String(r), isLinked: c === r });

/** Typography group. o = {family,size,sizeT,sizeM,weight,lh,ls,transform,style} */
function typo(prefix, o) {
  const s = { [`${prefix}_typography`]: 'custom' };
  if (o.family) s[`${prefix}_font_family`] = o.family;
  if (o.size) s[`${prefix}_font_size`] = px(o.size);
  if (o.sizeT) s[`${prefix}_font_size_tablet`] = px(o.sizeT);
  if (o.sizeM) s[`${prefix}_font_size_mobile`] = px(o.sizeM);
  if (o.weight) s[`${prefix}_font_weight`] = String(o.weight);
  if (o.lh) s[`${prefix}_line_height`] = em(o.lh);
  if (o.ls !== undefined) s[`${prefix}_letter_spacing`] = px(o.ls);
  if (o.transform) s[`${prefix}_text_transform`] = o.transform;
  if (o.style) s[`${prefix}_font_style`] = o.style;
  return s;
}
const T = {
  h1: { family: SERIF, size: 74, sizeT: 60, sizeM: 44, weight: 400, lh: 1.04 },
  h2: { family: SERIF, size: 60, sizeT: 50, sizeM: 40, weight: 400, lh: 1.08 },
  h3: { family: SERIF, size: 30, sizeT: 28, sizeM: 26, weight: 400, lh: 1.2 },
  h3card: { family: SERIF, size: 28, sizeT: 27, sizeM: 26, weight: 400, lh: 1.2 },
  body: { family: SANS, size: 17, sizeM: 16, weight: 300, lh: 1.85 },
  small: { family: SANS, size: 16, weight: 300, lh: 1.8 },
  eyebrow: { family: SANS, size: 12, weight: 400, lh: 1, ls: 3.8, transform: 'uppercase' },
  btn: { family: SANS, size: 12, weight: 500, lh: 1, ls: 2.6, transform: 'uppercase' },
  meta: { family: SANS, size: 11, weight: 400, lh: 1.5, ls: 2.6, transform: 'uppercase' },
};

/** Entrance animation (Elementor Motion Effects) */
const anim = (delay = 0, type = 'fadeInUp', isContainer = false) =>
  isContainer ? { animation: type, animation_delay: delay } : { _animation: type, _animation_delay: delay };

function widget(widgetType, settings) {
  return { id: id(), elType: 'widget', isInner: false, widgetType, settings, elements: [] };
}

/** Flex/grid container. opts: dir,gap,pad,bg,cls,width,align,justify,grid,boxed,tag,link,extra */
function con(children, o = {}) {
  const s = {
    content_width: o.boxed ? 'boxed' : 'full',
    flex_direction: o.dir || 'column',
    flex_gap: o.gap !== undefined ? gap(o.gap, o.rowGap ?? o.gap) : gap(0),
    padding: o.pad || box(0, 0, 0, 0),
  };
  if (o.boxed) s.boxed_width = px(1200);
  if (o.padT) s.padding_tablet = o.padT;
  if (o.padM) s.padding_mobile = o.padM;
  if (o.bg) { s.background_background = 'classic'; s.background_color = o.bg; }
  if (o.cls) s.css_classes = o.cls;
  if (o.width) { s.width = pct(o.width); s.width_tablet = pct(100); s.width_mobile = pct(100); }
  if (o.align) s.flex_align_items = o.align;
  if (o.justify) s.flex_justify_content = o.justify;
  if (o.dirT) s.flex_direction_tablet = o.dirT;
  if (o.dirM) s.flex_direction_mobile = o.dirM;
  if (o.wrap) s.flex_wrap = 'wrap';
  if (o.grid) {
    s.container_type = 'grid';
    s.grid_columns_grid = { unit: 'fr', size: o.grid[0], sizes: [] };
    s.grid_columns_grid_tablet = { unit: 'fr', size: o.grid[1], sizes: [] };
    s.grid_columns_grid_mobile = { unit: 'fr', size: o.grid[2], sizes: [] };
    s.grid_rows_grid = { unit: 'fr', size: o.rows || 1, sizes: [] };
    s.grid_gaps = { unit: 'px', column: String(o.gap ?? 0), row: String(o.rowGap ?? o.gap ?? 0), isLinked: false };
    s.grid_auto_flow = 'row';
  }
  if (o.border) Object.assign(s, o.border);
  if (o.tag) { s.html_tag = o.tag; if (o.link) s.link = { url: o.link, is_external: '', nofollow: '' }; }
  if (o.minH) s.min_height = px(o.minH);
  Object.assign(s, o.extra || {});
  return { id: id(), elType: 'container', isInner: !o.boxed, settings: s, elements: children };
}
/** Outer page section with standard padding */
const section = (children, o = {}) => con(children, {
  boxed: true,
  pad: o.pad || box(120, 32, 120, 32),
  padT: o.padT || box(88, 32, 88, 32),
  padM: o.padM || box(68, 20, 68, 20),
  bg: o.bg, cls: o.cls, dir: o.dir || 'column', gap: o.gap ?? 0, align: o.align,
  dirT: o.dirT, dirM: o.dirM, extra: o.extra,
});

/* ---- widget shortcuts ---- */
function heading(title, o = {}) {
  return widget('heading', {
    title, header_size: o.tag || 'h2', align: o.alignText || '',
    ...(o.alignT ? { align_tablet: o.alignT } : {}),
    title_color: o.color || C.heading,
    ...typo('typography', o.t || T.h2),
    _css_classes: o.cls || '',
    ...(o.mb !== undefined ? { _margin: box(0, 0, o.mb, 0) } : {}),
    ...(o.link ? { link: { url: o.link, is_external: '', nofollow: '' } } : {}),
    ...(o.anim === false ? {} : anim(o.delay || 0, o.animType)),
    ...(o.extra || {}),
  });
}
const eyebrow = (text, o = {}) => heading(text, {
  tag: 'div', t: T.eyebrow, color: o.dark ? C.goldSoft : C.eyebrowLight,
  cls: 'cl-eyebrow' + (o.center ? ' cl-eyebrow--center' : ''), alignText: o.center ? 'center' : '', mb: 26, delay: 0,
});
function text(html, o = {}) {
  return widget('text-editor', {
    editor: html, align: o.alignText || '', text_color: o.color || C.text,
    ...typo('typography', o.t || T.body),
    _css_classes: o.cls || '',
    ...(o.mb !== undefined ? { _margin: box(0, 0, o.mb, 0) } : {}),
    ...(o.maxW ? { _element_width: 'initial', _element_custom_width: px(o.maxW), _element_width_tablet: 'inherit' } : {}),
    ...(o.anim === false ? {} : anim(o.delay || 0)),
  });
}
const BTN = {
  gold: { bg: C.gold, color: C.navy, hbg: '#D3B67C', hcolor: C.navy, border: C.gold },
  outline: { bg: 'rgba(0,0,0,0)', color: C.white, hbg: C.white, hcolor: C.navy, border: 'rgba(255,255,255,0.55)' },
  navy: { bg: C.navy, color: C.white, hbg: C.goldDark, hcolor: C.white, border: C.navy },
};
function button(label, href, variant = 'gold', o = {}) {
  const v = BTN[variant];
  return widget('button', {
    text: label, link: { url: href, is_external: '', nofollow: '' }, align: o.alignBtn || '',
    ...(o.full ? { align_mobile: 'justify' } : {}),
    ...typo('typography', o.t || T.btn),
    button_text_color: v.color, background_color: v.bg,
    hover_color: v.hcolor, button_background_hover_color: v.hbg, button_hover_border_color: v.hbg === C.white ? C.white : v.hbg,
    border_border: 'solid', border_width: box(1, 1, 1, 1), border_color: v.border,
    border_radius: box(0, 0, 0, 0), text_padding: o.pad || box(22, 30, 22, 30),
    _css_classes: 'cl-btn', ...(o.anim === false ? {} : anim(o.delay || 0)),
    ...(o.mt ? { _margin: box(o.mt, 0, 0, 0) } : {}),
  });
}
const image = (cls, o = {}) => widget('image', {
  image: { url: PH, id: '', size: '', alt: o.alt || '', source: 'library' },
  image_size: 'full', width: pct(100), _css_classes: `cl-img ${cls}`,
  // AI image prompt shows as the element name in Elementor's Navigator
  ...(o.prompt ? { _title: `IMG PROMPT: ${o.prompt}` } : {}),
  ...(o.mb !== undefined ? { _margin: box(0, 0, o.mb, 0) } : {}),
  ...(o.anim === false ? {} : anim(o.delay || 0, o.animType || 'fadeIn')),
});
const SVG = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v12h14V9"/><path d="M10 21v-6h4v6"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 10h18"/><path d="M7 15h4"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.3 5.3L3.6 17.4a1.8 1.8 0 0 0 2.6 2.6l5.8-5.8a4 4 0 0 0 5.3-5.3l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  clipboard: '<path d="M9 4H5.5v17h13V4H15"/><rect x="9" y="2.5" width="6" height="3"/><path d="m9 13 2 2 4-4"/>',
  chart: '<path d="M3 20h18"/><path d="M6 20v-9"/><path d="M10 20V5"/><path d="M14 20v-8"/><path d="M18 20v-4"/>',
  hand: '<path d="M18 11V6.5a1.5 1.5 0 0 0-3 0V11"/><path d="M15 10.5V4.5a1.5 1.5 0 0 0-3 0v6"/><path d="M12 10.5V5.5a1.5 1.5 0 0 0-3 0V13"/><path d="M9 13v-2.5a1.5 1.5 0 0 0-3 0V15a6 6 0 0 0 6 6h1.5a4.5 4.5 0 0 0 4.5-4.5V11"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  key: '<circle cx="7" cy="17" r="3.5"/><path d="m9.5 14.5 10-10"/><path d="m15.5 8.5 2.5 2.5"/><path d="m18 6 2 2"/>',
  houseCheck: '<path d="M3.5 10.5 12 3.5l8.5 7V20.5h-17z"/><path d="m8.5 14 2.5 2.5 4.5-4.5"/>',
  shield: '<path d="M12 3 4.5 5.8V12c0 4.4 3.2 7.9 7.5 9 4.3-1.1 7.5-4.6 7.5-9V5.8z"/><path d="m8.5 12 2.5 2.5 4.5-4.5"/>',
};
const icon = (name, mb = 52) => widget('html', {
  html: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SVG[name]}</svg>`,
  _css_classes: 'cl-icon', _margin: box(0, 0, mb, 0),
});

/* ---------------- shared section parts ---------------- */
/** Header row: title left, copy right */
const headRow = (eb, title, aside, o = {}) => con([
  con([eyebrow(eb), heading(title, { cls: 'cl-h', delay: 100 })], { width: o.leftW || 58 }),
  aside,
], { dir: 'row', dirT: 'column', gap: 60, rowGap: 24, align: 'flex-end', justify: 'space-between', extra: { _margin: box(0, 0, o.mb ?? 70, 0), _margin_tablet: box(0, 0, 52, 0) } });

const centerHead = (eb, title, sub, o = {}) => con([
  eyebrow(eb, { center: true, dark: o.dark }),
  heading(title, { cls: o.dark ? 'cl-h cl-h--light' : 'cl-h', color: o.dark ? C.white : C.heading, alignText: 'center', delay: 100 }),
  ...(sub ? [text(`<p>${sub}</p>`, { alignText: 'center', color: o.dark ? C.textLight : C.text, delay: 200, extra: {} })] : []),
], { align: 'center', gap: 0, extra: { _margin: box(0, 0, o.mb ?? 70, 0) } });

const step = (num, title, body, meta, delay, last) => con([
  con([
    heading(num, { tag: 'div', t: { family: SERIF, size: 34, weight: 400, lh: 1, style: 'italic' }, color: C.goldDark, anim: false }),
    heading(title, { tag: 'h3', t: { ...T.h3, size: 32, sizeM: 26 }, anim: false }),
  ], { dir: 'row', dirM: 'row', gap: 14, align: 'baseline', extra: { _margin: box(0, 0, 14, 0) } }),
  text(`<p>${body}</p>`, { t: { family: SANS, size: 15.5, weight: 300, lh: 1.8 }, mb: 12, anim: false }),
  heading(meta, { tag: 'div', t: T.meta, color: C.muted, anim: false }),
], { cls: 'cl-step' + (last ? ' cl-step--last' : ''), pad: box(0, 0, last ? 0 : 54, 0), extra: anim(delay, 'fadeInRight', true) });

const quote = (q, initials, who, delay) => con([
  heading('“', { tag: 'div', t: { family: SERIF, size: 52, weight: 400, lh: 1 }, color: C.goldDark, extra: { _margin: box(0, 0, 20, 0) }, anim: false }),
  text(`<p>${q}</p>`, { t: { family: SERIF, size: 22, sizeM: 20, weight: 400, lh: 1.5, style: 'italic' }, color: '#3D4556', mb: 30, anim: false }),
  con([
    heading(initials, { tag: 'div', t: { family: SERIF, size: 17, weight: 400, lh: 1 }, color: C.gold, cls: 'cl-avatar', anim: false }),
    heading(who, { tag: 'div', t: { family: SANS, size: 12, weight: 400, lh: 1.5, ls: 2.4, transform: 'uppercase' }, color: C.muted, anim: false }),
  ], { dir: 'row', dirM: 'row', gap: 14, align: 'center', extra: { margin: box(0, 0, 0, 0) } }),
], { cls: 'cl-card', bg: C.white, pad: box(34, 36, 38, 36), justify: 'space-between', extra: anim(delay, 'fadeInUp', true) });

const formFields = () => [
  { custom_id: 'name', field_type: 'text', field_label: 'Name', width: '50', required: 'true' },
  { custom_id: 'phone', field_type: 'tel', field_label: 'Phone', width: '50' },
  { custom_id: 'email', field_type: 'email', field_label: 'Email', width: '100', required: 'true' },
  { custom_id: 'address', field_type: 'text', field_label: 'Property Address', width: '100' },
  { custom_id: 'message', field_type: 'textarea', field_label: 'Message', width: '100', rows: 4 },
  { custom_id: 'hp', field_type: 'honeypot', field_label: 'Honeypot', width: '100' },
  { custom_id: 'note', field_type: 'html', field_label: '', field_html: '<p class="cl-form__note">Spam protected (reCAPTCHA / honeypot)</p>', width: '100' },
].map((f) => ({ _id: id(), placeholder: '', ...f }));
/** Contact section. o = {title, lead, formName} */
const contactSection = (o = {}) => section([
  con([
    eyebrow('Get in Touch', { dark: true }),
    heading(o.title || 'Ready to <em>maximize</em><br>your investment?', { color: C.white, cls: 'cl-h cl-h--light', mb: 28, delay: 100 }),
    text(`<p>${o.lead || 'Tell us about your property and we’ll send a free rental analysis within 2 business days.'}</p>`, { t: T.small, color: C.textLight, maxW: 440, mb: 44, delay: 200 }),
    text('<p style="margin-bottom:14px"><a href="tel:6508890570" style="color:inherit">650 889 0570</a></p><p style="margin-bottom:14px"><a href="mailto:realtor@baliliu.homes" style="color:inherit">realtor@baliliu.homes</a></p><p>175 S San Antonio Rd, #100, Los Altos, CA</p>' + (o.extraLine ? `<p style="margin-top:14px">${o.extraLine}</p>` : ''), { t: { family: SANS, size: 16, weight: 300, lh: 1.6 }, color: '#E6E9EE', delay: 300 }),
  ], { width: 50 }),
  con([
    widget('form', {
      form_name: o.formName || 'Free Rental Analysis', form_fields: formFields(),
      input_size: 'sm', show_labels: 'yes', mark_required: '', label_position: 'above',
      button_text: 'Request Free Analysis →', button_size: 'md', button_align: 'start',
      submit_actions: ['email'], email_subject: 'New rental analysis request — Crestline',
      success_message: 'Thank you. We’ll be in touch within 2 business days.',
      column_gap: px(18), row_gap: px(26),
      label_spacing: px(4), label_color: C.muted,
      ...typo('label_typography', { family: SANS, size: 11, weight: 400, lh: 1.4, ls: 2.4, transform: 'uppercase' }),
      field_text_color: C.heading,
      ...typo('field_typography', { family: SANS, size: 16, weight: 300, lh: 1.6 }),
      field_background_color: 'rgba(0,0,0,0)', field_border_color: '#D6C9AD',
      field_border_width: box(0, 0, 1, 0), field_border_radius: box(0, 0, 0, 0),
      button_background_color: C.gold, button_text_color: C.navy,
      button_background_hover_color: '#D3B67C', button_hover_color: C.navy,
      button_border_radius: box(0, 0, 0, 0), button_text_padding: box(22, 30, 22, 30),
      ...typo('button_typography', T.btn),
      _css_classes: 'cl-form',
    }),
  ], { width: 50, bg: C.white, pad: box(44, 40, 46, 40), padM: box(32, 24, 32, 24), extra: anim(150, 'fadeInRight', true) }),
], { bg: C.navy, dir: 'row', dirT: 'column', gap: 80, align: 'flex-start', extra: { _element_id: 'contact' } });

function write(file, title, type, content, pageSettings = {}) {
  const tpl = {
    version: '0.4', title, type,
    page_settings: { custom_css: CSS, ...pageSettings },
    content,
  };
  fs.writeFileSync(path.join(__dirname, file), JSON.stringify(tpl, null, 1));
  console.log('wrote', file, (fs.statSync(path.join(__dirname, file)).size / 1024).toFixed(1) + ' KB');
}

module.exports = {
  fs, path, CSS, C, SERIF, SANS, PH, id, px, pct, em, box, gap, typo, T, anim, widget, con, section,
  heading, eyebrow, text, BTN, button, image, SVG, icon, headRow, centerHead, step, quote, contactSection, write,
};
