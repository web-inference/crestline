/* Renders location page bodies from data/cities/*.js
 * Run from crestline/:  node _src/render-location.js && python _src/assemble.py
 * Writes _src/<slug>.main.html + _src/locations.json (page meta for assemble.py)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'data', 'cities');
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.js'));
const cities = files.map((f) => require(path.join(DIR, f)));
const built = new Set(cities.map((c) => c.slug));

const slugOf = (name) => name.toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const pageHref = (name) => (built.has(slugOf(name)) ? `${slugOf(name)}.html` : 'service-areas.html#cities');
const d = (i, step = 0.1) => (i ? ` style="--d:${String(+(i * step).toFixed(2)).replace(/^0/, '')}s"` : '');

function render(c) {
  const s = [];
  s.push(`<!-- ${c.name.toUpperCase()} — generated from data/cities/${c.slug}.js by _src/render-location.js. Edit the data file, not this file. -->`);

  /* 1. HERO */
  s.push(`
<!-- ============ 1. HERO ============ -->
<section class="cl-hero cl-hero--page">
  <div class="cl-container">
    <div class="cl-hero__copy">
      <nav class="cl-crumbs" aria-label="Breadcrumb" data-reveal="fade"><a href="index.html">Home</a><span aria-hidden="true">/</span><a href="service-areas.html">Service Areas</a><span aria-hidden="true">/</span><span>${c.name}</span></nav>
      <div class="cl-eyebrow" data-reveal="fade">${c.county} · Service Area</div>
      <h1 class="cl-h cl-h--light cl-h1">
        <span class="line"><span>${c.name}</span></span>
        <span class="line"><span><em>Property Management</em></span></span>
      </h1>
      <p class="cl-lead" data-reveal style="--d:.45s">${c.hero.lead}</p>
      <div class="cl-hero__btns" data-reveal style="--d:.6s">
        <a href="#contact" class="cl-btn cl-btn--gold">Get a Free Rental Analysis <span class="arr">→</span></a>
        <a href="tel:6508890570" class="cl-btn cl-btn--outline">Call 650 889 0570</a>
      </div>
    </div>
    <div class="cl-hero__frame" data-reveal="fade" style="--d:.2s">
      <div class="cl-ph cl-ph--dark" data-img="${c.slug}-hero" data-reveal="wipe" style="--d:.3s"><!--img--><!--/img--></div>
      <div class="cl-hero__tag" data-reveal style="--d:.9s">${c.hero.tag}</div>
    </div>
  </div>
</section>`);

  /* 2. TAKEAWAYS */
  if (c.takeaways) s.push(`
<!-- ============ 2. KEY TAKEAWAYS ============ -->
<section class="cl-takeaways">
  <div class="cl-container">
${c.takeaways.map(([ic, t, p], i) => `    <div class="cl-take" data-reveal${d(i)}>
      <div class="cl-icon"><svg><use href="#i-${ic}"/></svg></div>
      <h3>${t}</h3>
      <p>${p}</p>
    </div>`).join('\n')}
  </div>
</section>`);

  /* 3. ABOUT */
  s.push(`
<!-- ============ 3. ABOUT THE CITY ============ -->
<section class="cl-section bg-cream cl-about">
  <div class="cl-container cl-split">
    <div class="cl-about__media" data-reveal="left">
      <div class="cl-ph cl-zoom" data-img="${c.slug}-about"><!--img--><!--/img--></div>
      <div class="cl-about__badge" data-reveal style="--d:.35s">
        <div class="cl-h">${c.name}</div>
        <span>${c.county}</span>
      </div>
    </div>
    <div class="cl-about__copy">
      <div class="cl-eyebrow" data-reveal>About ${c.name}</div>
      <h2 class="cl-h cl-h2" data-reveal style="--d:.1s">${c.about.title}</h2>
      <div data-reveal style="--d:.2s">
${c.about.paras.map((p) => `        <p>${p}</p>`).join('\n')}
      </div>
      <div class="cl-mini-stats" data-reveal style="--d:.3s">
${c.about.mini.map(([v, l]) => `        <div><strong>${v}</strong><span>${l}</span></div>`).join('\n')}
      </div>
    </div>
  </div>
</section>`);

  /* 4. MARKET */
  s.push(`
<!-- ============ 4. MARKET SNAPSHOT ============ -->
<section class="cl-section bg-deep">
  <div class="cl-container">
    <div class="cl-head">
      <div>
        <div class="cl-eyebrow" data-reveal>Rental Market Snapshot</div>
        <h2 class="cl-h cl-h--light cl-h2" data-reveal style="--d:.1s">${c.name} rents <em>at a glance</em></h2>
      </div>
      <p class="cl-head__aside" style="color:var(--text-light);--d:.2s" data-reveal>Typical asking rents in ${c.name}. We price every home individually, using recent comps from your street and school area.</p>
    </div>
    <div class="cl-tiles" data-reveal style="--d:.15s">
${c.market.tiles.map(([n, l]) => `      <div class="cl-tile"><div class="cl-tile__num">${n.replace(/^~/, '<em>~</em>')}</div><div class="cl-tile__label">${l}</div></div>`).join('\n')}
    </div>
    <p class="cl-dark-note" data-reveal>${c.market.note}</p>
  </div>
</section>`);

  /* 5. RENTERS */
  if (c.renters) s.push(`
<!-- ============ 5. WHO RENTS ============ -->
<section class="cl-section bg-sand">
  <div class="cl-container">
    <div class="cl-head cl-head--wide">
      <div>
        <div class="cl-eyebrow" data-reveal>Who Rents Here</div>
        <h2 class="cl-h cl-h2" data-reveal style="--d:.1s">Who rents in <em>${c.name}</em></h2>
      </div>
      <p class="cl-head__quote" data-reveal style="--d:.2s">Knowing your renters means faster leasing and longer tenancies.</p>
    </div>
    <div class="cl-cards">
${c.renters.map(([ic, t, p], i) => `      <div class="cl-card cl-card--top" data-reveal${d(i, 0.12)}>
        <div class="cl-icon"><svg><use href="#i-${ic}"/></svg></div>
        <h3 class="cl-h cl-h3">${t}</h3>
        <p>${p}</p>
      </div>`).join('\n')}
    </div>
  </div>
</section>`);

  /* 6. SERVICES (numbered steps) */
  const st = c.services.steps;
  s.push(`
<!-- ============ 6. HOW WE MANAGE ============ -->
<section class="cl-section bg-white cl-process">
  <div class="cl-container cl-split">
    <div>
      <div class="cl-eyebrow" data-reveal>Our Services</div>
      <h2 class="cl-h cl-h2" data-reveal style="--d:.1s">How we manage<br><em>${c.name} homes.</em></h2>
      <p class="cl-process__intro" data-reveal style="--d:.2s">${c.services.intro}</p>
      <div class="cl-ph cl-zoom" data-img="${c.slug}-services" data-reveal="wipe" style="--d:.2s"><!--img--><!--/img--></div>
      <a href="#contact" class="cl-btn cl-btn--navy" data-reveal>Get a Free Rental Analysis <span class="arr">→</span></a>
    </div>
    <div class="cl-timeline">
      <span class="cl-timeline__track"></span>
      <span class="cl-timeline__fill"></span>
${st.map(([t, p, m], i) => `      <div class="cl-step${i === st.length - 1 ? ' cl-step--last' : ''}" data-reveal="right"${d(i)}>
        <div class="cl-step__title"><span class="cl-num">${String(i + 1).padStart(2, '0')}</span><h3 class="cl-h cl-h3">${t}</h3></div>
        <p>${p}</p>
        <div class="cl-meta">${m}</div>
      </div>`).join('\n')}
    </div>
  </div>
</section>`);

  /* 7. NEIGHBORHOODS */
  s.push(`
<!-- ============ 7. NEIGHBORHOODS ============ -->
<section class="cl-section bg-cream">
  <div class="cl-container">
    <div class="cl-head">
      <div>
        <div class="cl-eyebrow" data-reveal>Neighborhoods We Serve</div>
        <h2 class="cl-h cl-h2" data-reveal style="--d:.1s">Across <em>${c.name}</em></h2>
      </div>
      <p class="cl-head__aside" data-reveal style="--d:.2s">Rents can change a lot from one street to the next. We know what each neighborhood offers and who it suits.</p>
    </div>
    <div class="cl-hoods">
${c.hoods.map(([n, p], i) => `      <div class="cl-hood" data-reveal${d(i % 3)}><h3 class="cl-h cl-h3">${n}</h3>${p ? `<p>${p}</p>` : ''}</div>`).join('\n')}
    </div>
  </div>
</section>`);

  /* 8. RULES */
  const r = c.rules;
  s.push(`
<!-- ============ 8. LOCAL RENT RULES ============ -->
<section class="cl-section bg-white">
  <div class="cl-container">
    <div class="cl-head">
      <div>
        <div class="cl-eyebrow" data-reveal>Local Rent Rules</div>
        <h2 class="cl-h cl-h2" data-reveal style="--d:.1s">${c.name} rules,<br><em>handled for you.</em></h2>
      </div>
      <p class="cl-head__aside" data-reveal style="--d:.2s">A plain-English summary of the rules that apply to ${c.name} rentals. Not legal advice. We keep up with every change from City Council.</p>
    </div>
    <div class="cl-rules-wrap">
      <div class="cl-rules">
${r.items.map(([t, p], i) => `        <div class="cl-rule-row" data-reveal><span class="cl-num">${String(i + 1).padStart(2, '0')}</span><div><h3>${t}</h3><p>${p}</p></div></div>`).join('\n')}
      </div>
      <aside class="cl-aside" data-reveal="right" style="--d:.15s">
        <div class="cl-eyebrow">City Resource</div>
        <h3>Official ${c.name} tenant &amp; landlord resources</h3>
        <p>Always confirm current amounts and dates with the city. We do this for every property we manage.</p>
        <dl>
          <dt>City help line</dt><dd>${r.help}</dd>
          <dt>Last reviewed</dt><dd>${r.reviewed}</dd>
        </dl>
        <a href="${r.resourceUrl}" class="cl-btn cl-btn--gold" target="_blank" rel="noopener">Visit City Website <span class="arr">↗</span></a>
        <p class="cl-sources" style="color:#8d96a6;margin:22px 0 0">Sources: ${r.sources}</p>
      </aside>
    </div>
  </div>
</section>`);

  /* 9. FEES */
  s.push(`
<!-- ============ 9. FEES ============ -->
<section class="cl-section bg-sand" style="padding-bottom:0">
  <div class="cl-container">
    <div class="cl-feeband" data-reveal>
      <div>
        <div class="cl-eyebrow">Management Fees</div>
        <h2 class="cl-h cl-h--light cl-h2">Simple, <em>honest</em> pricing</h2>
        <a href="index.html#fees" class="cl-link">See All Fees <span class="arr">→</span></a>
      </div>
      <div class="cl-feeband__items">
        <div class="cl-fee"><strong>8%</strong><span>of monthly rent collected, full management</span></div>
        <div class="cl-fee"><strong>75%</strong><span>of first month’s rent, leasing only</span></div>
        <div class="cl-fee"><strong>$0</strong><span>hidden fees and no markup on maintenance</span></div>
      </div>
    </div>
  </div>
</section>`);

  /* 10. REVIEW */
  if (c.review) s.push(`
<!-- ============ 10. REVIEW ============ -->
<section class="cl-section bg-sand">
  <div class="cl-container">
    <div class="cl-feature-quote" data-reveal>
      <div class="cl-eyebrow cl-eyebrow--center">Owner Feedback</div>
      <div class="cl-quote__mark">“</div>
      <blockquote>${c.review.quote}</blockquote>
      <div class="cl-quote__who"><div class="cl-avatar">${c.review.initials}</div><span>${c.review.who}</span></div>
    </div>
  </div>
</section>`);

  /* 11. FAQ */
  s.push(`
<!-- ============ 11. FAQ ============ -->
<section class="cl-section bg-white">
  <div class="cl-container">
    <div class="cl-head cl-head--center" style="margin-bottom:0">
      <div class="cl-eyebrow cl-eyebrow--center" data-reveal>${c.name} Owner Questions</div>
      <h2 class="cl-h cl-h2" data-reveal style="--d:.1s">${c.name} <em>FAQs</em></h2>
    </div>
    <div class="cl-faq" data-reveal style="--d:.2s">
${c.faq.map(([q, a], i) => `      <div class="cl-faq__item${i ? '' : ' is-open'}">
        <button class="cl-faq__q" aria-expanded="${i ? 'false' : 'true'}">${q}<span class="cl-faq__icon"></span></button>
        <div class="cl-faq__a"><div><p>${a}</p></div></div>
      </div>`).join('\n')}
    </div>
  </div>
</section>`);

  /* 12. NEARBY */
  s.push(`
<!-- ============ 12. NEARBY CITIES ============ -->
<section class="cl-section bg-cream" style="padding:80px 0">
  <div class="cl-container cl-nearby">
    <div>
      <div class="cl-eyebrow" data-reveal>Nearby Cities</div>
      <h2 class="cl-h cl-h2" data-reveal style="--d:.1s">Also near <em>${c.name}</em></h2>
    </div>
    <div class="cl-chips" data-reveal style="--d:.15s">
${c.nearby.map((n) => `      <a href="${n.startsWith('[') ? '#' : pageHref(n)}" class="cl-chip">${n} <span class="arr">→</span></a>`).join('\n')}
      <a href="service-areas.html" class="cl-chip">All Service Areas <span class="arr">→</span></a>
    </div>
  </div>
</section>

<!-- ============ 13. CONTACT ============ -->
<!--CONTACT-->
`);
  return s.join('\n');
}

const manifest = cities.map((c) => {
  fs.writeFileSync(path.join(__dirname, `${c.slug}.main.html`), render(c));
  console.log('rendered', `${c.slug}.main.html`);
  return {
    src: `${c.slug}.main.html`, out: `${c.slug}.html`, title: c.meta.title, desc: c.meta.description,
    ctitle: `Get a free rental analysis<br>for your <em>${c.name}</em> home.`,
    clead: `Tell us about your ${c.name} property and we’ll send a free rental analysis within 2 business days.`,
  };
});
fs.writeFileSync(path.join(__dirname, 'locations.json'), JSON.stringify(manifest, null, 2));
