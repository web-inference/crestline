/* Location template — every [Bracket] is a field to fill per city.
 * Copy this file to <slug>.js, fill it in, then run the builders (see LOCATION_TEMPLATE.md).
 * Strings may contain inline HTML (<em>, <br>, &amp;). Set an optional section to null to drop it.
 */
module.exports = {
  name: '[City]',
  slug: 'location-template',
  county: '[County]',
  meta: {
    title: '[City] Property Management | Crestline Property Management',
    description: 'Local, hands-on property management in [City], CA. Tenant screening, rent collection, maintenance and [City] rent-rule compliance.',
  },
  hero: {
    lead: '[Intro, 1–2 sentences. e.g. Local, hands-on management for homes, condos and small multifamily properties in [City]. We find good tenants, take care of your property and keep you compliant.]',
    tag: '[Neighborhood] · [Neighborhood] · [Neighborhood]',
    prompt: 'Signature residential street in [City], California, with [typical home style, e.g. historic Craftsman homes / mid-century Eichlers] under mature trees, golden-hour light, editorial real-estate photography, photorealistic, no text',
  },
  takeaways: [ // optional
    ['chart', 'Real Local Pricing', '[Managed by a Coldwell Banker Realtor with recent [City] sales, so pricing comes from real market experience.]'],
    ['key', 'We Know the Renters', '[Experience with [City]’s renters: e.g. university staff, tech professionals and families moving for the schools.]'],
    ['shield', 'Compliance Built In', '[Built-in compliance with [City]’s key rules, e.g. lease offer, registry and relocation rules.]'],
    ['hand', 'English &amp; 中文 Support', 'English and Mandarin support for local, out-of-state and overseas owners.'],
  ],
  about: {
    title: 'Why owners rent<br>in <em>[City].</em>',
    paras: [
      '[City story, paragraph 1: history, how the city grew, major employers and what it is known for.]',
      '[Paragraph 2: housing types, schools, parks, transit (Caltrain, freeways) and why renters choose it.]',
    ],
    mini: [['~[00]%', 'Homes rented'], ['[Employer]', 'Major employer'], ['[Transit]', 'Transit']],
    prompt: 'Iconic landmark or downtown street of [City], California, e.g. [University Avenue / Castro Street / Murphy Avenue], people strolling at a distance, warm afternoon light, editorial travel photography, photorealistic, no legible signage',
  },
  market: {
    tiles: [['~$[0,000]', '1 Bed Apartment'], ['~$[0,000]', '2 Bed Apartment'], ['~$[0,000]', '3 Bed House'], ['~$[0,000]', '4+ Bed House (optional)'], ['~[00]%', 'Homes Rented'], ['~$[0.0]M', 'Median Home Value (optional)']],
    note: 'Source: Rentometer, [Month Year]. Figures are approximate and change with the market.',
  },
  renters: [ // optional
    ['key', '[Renter group 1]', '[Who they are, how long they stay and what they look for, e.g. Stanford faculty and visiting scholars on 1–2 year stays.]'],
    ['chart', '[Renter group 2]', '[e.g. Tech professionals at nearby employers who want walkable homes near Caltrain.]'],
    ['home', '[Renter group 3]', '[e.g. Families renting inside top school attendance areas while they wait to buy.]'],
  ],
  services: {
    intro: 'Full-service management built around [City]’s market, homes and rules. Five things we do for every owner.',
    prompt: 'Bright, freshly staged living room in a typical [City] rental home, large windows, neutral furniture with navy and brass accents, soft daylight, interior real-estate photography, photorealistic, no people',
    steps: [
      ['Rent Pricing &amp; Marketing', '[We price using recent [City] comps, school boundaries and seasonal demand, then market with professional photos and listings.]', 'Local comps · Pro photos'],
      ['Tenant Screening &amp; Leasing', '[Credit, income, employment and rental history checks, with leases written to [City] rules.]', 'Thorough checks'],
      ['Rent Collection &amp; Statements', 'Online rent collection, fast deposits, monthly owner statements and year-end tax documents.', 'Monthly reporting'],
      ['Maintenance &amp; Repairs', '[Preventive care and trusted local vendors who know [City] homes, e.g. older homes and Eichlers.]', 'Trusted local vendors'],
      ['Inspections &amp; Compliance', '[Photo inspections at move-in and move-out, plus every [City] notice, filing and rule change handled.]', 'Photo reports · City filings'],
    ],
  },
  hoods: [1, 2, 3, 4, 5, 6].map((n) => [`[Neighborhood ${n}]`, '[Short description: housing type, landmarks, who it suits.]']),
  rules: {
    items: [
      ['[Rule title, e.g. One-year lease]', '[What the rule says, who it applies to and the key numbers.]'],
      ['[Just cause eviction]', '[What the rule says, who it applies to and the key numbers.]'],
      ['[Relocation assistance]', '[What the rule says, who it applies to and the key numbers.]'],
      ['[Security deposit / Rent limits]', '[What the rule says, who it applies to and the key numbers.]'],
      ['[Registration &amp; required notices]', '[What the rule says, who it applies to and the key numbers.]'],
      ['[Mediation / What’s not covered]', '[What the rule says, who it applies to and the key numbers.]'],
    ],
    resourceUrl: '#',
    help: '[Department · phone · email]',
    reviewed: '[Month Year]',
    sources: '[Rentometer (Month Year), City of [City] …]',
  },
  review: { quote: '[A short review from an owner in or near [City]. Use a real review only.]', initials: '[AB]', who: '[Name] · Owner, [City]' },
  faq: [
    ['How much does property management cost in [City]?', 'Full management is 8% of the monthly rent collected, and leasing only is 75% of the first month’s rent. There is a one-time $250 setup fee, with no hidden fees and no markup on maintenance.'],
    ['[City-specific question 1]', '[Answer]'],
    ['[City-specific question 2]', '[Answer]'],
    ['Can you manage my home if I live out of state or overseas?', 'Yes. Many owners live outside the Bay Area. You get online statements, photo inspection reports and one point of contact in English or Mandarin.'],
  ],
  nearby: ['[Nearby city]', '[Nearby city]', '[Nearby city]', '[Nearby city]'],
};
