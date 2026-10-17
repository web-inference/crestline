/* Crestline — service area data (from the client's "Service Area Pages – Draft").
 * Used by build-locations.js for the archive cards + comparison table.
 * When a city page is built, its full content goes in its own builder object.
 */
const PROMPT_STYLE = 'editorial real-estate photography, photorealistic, no text';

module.exports = [
  {
    name: 'Palo Alto', slug: 'palo-alto', county: 'Santa Clara County',
    intro: 'Stanford, Professorville and some of the Bay Area’s most detailed rent rules.',
    rent2: '~$4,300', rented: '44%', tags: ['1-year lease offer', 'Rental Registry', 'EN · 中文'],
    rentControl: 'No · state rules (AB 1482)', leaseRule: 'Must offer a 1-year lease',
    relocation: '1 month (under 10 units); ~$8,400–$20,400 (10+ units)',
    nearby: ['Menlo Park', 'Mountain View', 'Los Altos', 'Sunnyvale'],
    prompt: `Tree-lined street in Palo Alto's Professorville with historic Craftsman homes, mature oaks, soft morning light, ${PROMPT_STYLE}`,
  },
  {
    name: 'Mountain View', slug: 'mountain-view', county: 'Santa Clara County',
    intro: 'Home to Google and NASA Ames, with the highest share of renters on our list.',
    rent2: '~$4,200', rented: '~60%', tags: ['Rent control (CSFRA)', 'Annual rental fee'],
    rentControl: 'Yes · CSFRA (3+ units built before 1995)', leaseRule: 'No local rule',
    relocation: 'Yes, for households at or below 120% AMI',
    nearby: ['Palo Alto', 'Sunnyvale', 'Los Altos', 'Menlo Park'],
    prompt: 'Castro Street in downtown Mountain View at dusk, outdoor café tables, warm string lights, low-rise storefronts, editorial lifestyle photography, photorealistic, no legible signage',
  },
  {
    name: 'Sunnyvale', slug: 'sunnyvale', county: 'Santa Clara County',
    intro: 'Murphy Avenue, Caltrain and a short commute to Apple, Google and LinkedIn.',
    rent2: '~$3,650', rented: '~55%', tags: ['12-month lease offer', '2 months relocation'],
    rentControl: 'No · state rules (AB 1482)', leaseRule: 'Must offer a 12-month lease',
    relocation: '2 months’ rent',
    nearby: ['Mountain View', 'Santa Clara', 'Cupertino', 'San Jose'],
    prompt: `Bright mid-century ranch home in Sunnyvale's Cherry Chase neighborhood, manicured front yard, clear blue sky, late afternoon sun, ${PROMPT_STYLE}`,
  },
  {
    name: 'San Jose', slug: 'san-jose', county: 'Santa Clara County',
    intro: 'The Bay Area’s largest city, with steady demand from tech workers and SJSU.',
    rent2: '~$3,300', rented: '~44%', tags: ['Rent control (ARO)', 'Tenant Protection Ord.'],
    rentControl: 'Yes · ARO (3+ units built before 1979)', leaseRule: 'No local rule',
    relocation: '~$6,900–$12,400 (TPO)',
    nearby: ['Santa Clara', 'Sunnyvale', 'Campbell', 'Milpitas', 'Cupertino'],
    prompt: `Charming Willow Glen bungalow in San Jose with a deep front porch and mature trees, golden-hour light, ${PROMPT_STYLE}`,
  },
  {
    name: 'Menlo Park', slug: 'menlo-park', county: 'San Mateo County',
    intro: 'Meta, Sand Hill Road and Stanford next door draw professionals and families.',
    rent2: '~$4,500', rented: '~42%', tags: ['12-month lease (4+ units)', 'State rent caps'],
    rentControl: 'No · state rules (AB 1482)', leaseRule: '1-year lease offer (4+ units)',
    relocation: '1 month; 3–4 months may apply',
    nearby: ['Palo Alto', 'Redwood City', 'Atherton', 'Mountain View'],
    prompt: `Elegant shingle-style home in Menlo Park's Allied Arts neighborhood behind a low hedge and heritage oaks, dappled sunlight, ${PROMPT_STYLE}`,
  },
  {
    name: 'Foster City', slug: 'foster-city', county: 'San Mateo County',
    intro: 'A planned waterfront community of lagoons, parks and top-rated schools.',
    rent2: '~$4,000', rented: '~46%', tags: ['No local rent control', 'BMR unit rules'],
    rentControl: 'No · state rules (AB 1482)', leaseRule: 'No local rule',
    relocation: '1 month (state); 3 months for BMR units',
    nearby: ['San Mateo', 'Belmont', 'Redwood City', 'San Carlos'],
    prompt: `Waterfront townhomes along a calm Foster City lagoon with small boats docked, reflections on the water, soft evening light, ${PROMPT_STYLE}`,
  },
];

module.exports.ALSO_SERVING = ['Los Altos', 'Los Altos Hills', 'Cupertino', 'Saratoga', 'Atherton', 'Redwood City', 'San Carlos', 'Belmont', 'San Mateo', 'Santa Clara', 'Campbell', 'Milpitas'];
