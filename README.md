# Crestline Property Management — Homepage

```
crestline/
├── index.html                  ← Homepage preview (open via local server)
├── index2.html                 ← Homepage v2: Mandarin shown, 6 matching area cards, real links (built by _src/build-index2.js)
├── service-areas.html          ← Service Areas archive preview
├── location-template.html      ← Single location template preview ([Bracket] fields)
├── palo-alto.html              ← Palo Alto city page
├── data/cities/*.js            ← one data file per city (drives HTML + Elementor)
├── LOCATION_TEMPLATE.md        ← all locations, section map, how to make a city page
├── IMAGE_PROMPTS.md            ← AI image prompt for every placeholder
├── _src/                       ← page bodies + assemble.py (builds inner pages from index.html's header/footer)
├── assets/css/style.css
├── assets/js/main.js
├── assets/icons/*.svg          ← line icons (gold) for Elementor SVG upload if wanted
├── DESIGN_SYSTEM.md            ← fonts, colours, spacing, classes — reuse for every new page
└── elementor/
    ├── crestline-home.json     ← Homepage (Page template)
    ├── crestline-header.json   ← Theme Builder Header (top bar + sticky nav)
    ├── crestline-footer.json   ← Theme Builder Footer
    ├── crestline-service-areas.json      ← Service Areas archive (Page)
    ├── crestline-location-template.json  ← Location template (insert into each city page)
    ├── crestline-location-palo-alto.json ← Palo Alto page (Page)
    ├── lib.js / locations-data.js        ← shared helpers + city data
    ├── build-locations.js      ← regenerates the two location JSON files
    ├── crestline-global.css    ← paste once into Site Settings > Custom CSS
    └── build-elementor.js      ← regenerates home/header/footer JSON
```

## Preview in browser
From `F:\Wplus`: `python -m http.server 5510 --directory crestline`, then open http://localhost:5510
(opening index.html directly works too, but a server is more reliable).

## Install in WordPress (Elementor Pro, Flexbox Containers ON)
1. **Elementor > Settings > Features**: make sure *Flexbox Container* (and *Grid Container*) are active.
2. **Site Settings > Custom CSS**: paste `crestline-global.css` (each template also carries it in Page Settings, so this is a safety net that makes all future pages consistent).
3. **Templates > Saved Templates > Import Templates**: import the three JSON files.
4. **Header / Footer**: Templates > Theme Builder > Header → apply `Crestline — Header` to *Entire Site*; same for Footer.
   - In the header, open the **Nav Menu** widget and choose your WordPress menu
     (Home, Owner Services, Service Areas, Fees, Blog, About Us).
5. **Homepage**: Pages > Add New → *Edit with Elementor* → folder icon → My Templates → insert `Crestline — Home`.
   Page Settings → hide title, layout *Elementor Full Width*. Then Settings > Reading → set it as the homepage.
6. **Form**: the contact form is an Elementor Pro Form. Actions After Submit = Email (goes to the site admin email by default) — set the "To" address you want. A honeypot field is included; add reCAPTCHA under Elementor > Settings > Integrations if needed.

## Images
Every image is an Elementor **Image** widget showing the default placeholder. Click it → *Choose Image* to replace.
The CSS classes on each image (`cl-r-1-1`, `cl-r-9-8`, `cl-r-17-10`, `cl-r-5-3`, `cl-r-area`, `cl-r-post`) lock the aspect ratio and crop with object-fit, so any photo you upload fits the design.

| Spot | Ratio | Suggested size |
|---|---|---|
| Hero | 1:1 | 1200×1200 |
| About (Los Altos badge) | 9:8 | 1440×1280 |
| Core values | 17:10 | 1150×680 |
| Getting started | 5:3 | 1000×600 |
| Service areas (×4) | 281:220 | 800×630 |
| Blog cards (×3) | 375:240 | 900×575 |

## Notes
- Animations: Elementor Motion Effects (Fade In Up / Left / Right with staggered delays), restyled in the global CSS to a softer 28px rise. Counters (10+, 100%, $0) count up natively.
- Icons are inline SVG inside small HTML widgets (`cl-icon`) so they match the design exactly. To change one, edit that HTML widget, or replace with an Icon widget.
- The blog cards are static so they match the design. When real posts exist, you can swap the grid for an Elementor **Loop Grid**.
- FAQ answers 2–4 were not visible in the reference screenshot; draft answers are in place — please confirm with the client.
