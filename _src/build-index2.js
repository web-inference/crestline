/* Builds index2.html (homepage v2) from index.html.
 * Also: the contact form is replaced by a Calendly-style booking demo (assets/js/booking.js).
 * Fixes: Mandarin visible on the homepage, area cards match the Service Areas page,
 * every card links somewhere real, "Also serving" list matches the archive.
 * Run from crestline/:  node _src/build-index2.js
 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const CITIES = require(path.join(root, 'elementor', 'locations-data.js'));
const built = (slug) => fs.existsSync(path.join(root, 'data', 'cities', `${slug}.js`));

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8').split('\r\n').join('\n'); // tolerate CRLF
const swap = (from, to) => { if (!html.includes(from)) throw new Error('not found: ' + from.slice(0, 60)); html = html.replace(from, () => to); };

/* 1. Mandarin: hero note */
swap(`        <a href="#services" class="cl-btn cl-btn--outline">Explore Our Services</a>
      </div>
    </div>`, `        <a href="#services" class="cl-btn cl-btn--outline">Explore Our Services</a>
      </div>
      <p class="cl-hero__lang" data-reveal style="--d:.75s"><span class="cl-hero__langtag">EN</span><span class="cl-hero__langtag">中文</span>English &amp; Mandarin support for local, out-of-state and overseas owners</p>
    </div>`);

/* 2. Mandarin: about paragraph */
swap(`team that treats their home like its own.</p>
      </div>`, `team that treats their home like its own.</p>
        <p>We work with owners in English and Mandarin (中文), whether you live in the Bay Area, out of state or overseas.</p>
      </div>`);

/* 3. Mandarin: contact details */
swap(`        <li>175 S San Antonio Rd, #100, Los Altos, CA</li>
      </ul>`, `        <li>175 S San Antonio Rd, #100, Los Altos, CA</li>
        <li>English &amp; 中文 spoken</li>
      </ul>`);

/* 4. Areas: same six cities as the Service Areas page, real links */
const d = (i) => (i ? ` style="--d:.${i}s"` : '');
const cards = CITIES.map((c, i) => `      <a href="${built(c.slug) ? c.slug + '.html' : 'service-areas.html#cities'}" class="cl-area cl-zoom" data-reveal${d(i % 3)}>
        <div class="cl-ph cl-ph--sm" data-img="city-${c.slug}"><!--img--><!--/img--></div>
        <div class="cl-area__row"><h3 class="cl-h cl-h3">${c.name}</h3><span class="arr">→</span></div>
      </a>`).join('\n');
const a = html.indexOf('    <div class="cl-areas">');
const b = html.indexOf('    <p class="cl-areas__more"');
if (a < 0 || b < 0) throw new Error('areas block not found');
html = html.slice(0, a) + `    <div class="cl-areas cl-areas--6">\n${cards}\n    </div>\n` + html.slice(b);

/* 6. Contact: replace the form with a Calendly-style booking widget (demo; swap in a real Calendly URL in the page) */
swap('Tell us about your property and we’ll send a free rental analysis within 2 business days.',
  'Pick a time that suits you and we’ll walk through a free rental analysis for your property on a short call.');
const f0 = html.indexOf('    <form class="cl-form"');
const f1 = html.indexOf('</form>', f0) + '</form>'.length;
if (f0 < 0 || f1 < f0) throw new Error('contact form not found');
html = html.slice(0, f0) + `    <div class="cl-book" id="booking" data-booking data-reveal="right" style="--d:.15s">
      <noscript><p>Please enable JavaScript to pick a time, or call <a href="tel:6508890570">650 889 0570</a>.</p></noscript>
    </div>` + html.slice(f1);
swap('<script src="assets/js/main.js"></script>', `<script>
  // To go live, paste your Calendly link here. The demo is then replaced by Calendly's real widget:
  // window.CRESTLINE_CALENDLY_URL = 'https://calendly.com/your-name/free-rental-analysis';
</script>
<script src="assets/js/booking.js"></script>
<script src="assets/js/main.js"></script>`);

/* 5. Also serving: same list as the archive; Los Altos is the home office (no page yet) */
swap('Also serving: Los Altos Hills · Cupertino · Menlo Park · Saratoga',
  `Our office is in Los Altos. Also serving: ${CITIES.ALSO_SERVING.filter((n) => n !== 'Los Altos').join(' · ')}`);

fs.writeFileSync(path.join(root, 'index2.html'), html);
console.log('wrote index2.html', (html.length / 1024).toFixed(1) + ' KB');
