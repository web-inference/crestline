/* Rebuilds every page and every Elementor template from the sources, then fills the image slots.
 * Run from crestline/:   node _src/build-pages.js
 * Use it after: adding or replacing a file in assets/images, or editing data/images.js / data/cities/*.js
 */
const { execFileSync } = require('child_process');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const run = (cmd, args) => {
  console.log(`\n> ${cmd} ${args.join(' ')}`);
  execFileSync(cmd, args, { cwd: ROOT, stdio: 'inherit' });
};

run('node', ['_src/render-location.js']);   // city page bodies from data/cities/*.js
run('python', ['_src/assemble.py']);        // service-areas.html, <city>.html, location-template.html
run('node', ['_src/build-index2.js']);      // index2.html from index.html
run('node', ['_src/apply-images.js']);      // fill image slots + IMAGE_PROMPTS.md
run('node', ['elementor/build-elementor.js']);  // home, header, footer JSON
run('node', ['elementor/build-locations.js']);  // service areas + city page JSON
console.log('\nAll pages and templates rebuilt.');
