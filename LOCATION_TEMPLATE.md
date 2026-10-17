# Crestline — Service Areas + Location Template

Built from the client's **"Service Area Pages – Draft"**, in the same design system as the homepage (see `DESIGN_SYSTEM.md`).

| File | What |
|---|---|
| `service-areas.html` | Archive page preview: lists every city |
| `location-template.html` | Single city template preview: every `[Bracket]` is a field to fill per city |
| `elementor/crestline-service-areas.json` | Archive page for Elementor |
| `elementor/crestline-location-template.json` | Location template for Elementor (insert into each city page) |
| `palo-alto.html` + `elementor/crestline-location-palo-alto.json` | **Palo Alto page: finished** |
| `data/cities/<slug>.js` | One data file per city: the single source for both its HTML page and its Elementor JSON |
| `data/cities/_template.js` | The template's `[Bracket]` data (copy it to start a new city) |
| `elementor/locations-data.js` | City summary data used by the archive cards + comparison table |
| `IMAGE_PROMPTS.md` | Every AI image prompt, by page and spot |

Suggested URLs: `/service-areas/` and `/service-areas/palo-alto/` and so on (each city = a child page of Service Areas).

---

## All locations mentioned in the draft

### Main city pages (have a draft)
| # | City | County | Draft depth | Missing before it can go live |
|---|---|---|---|---|
| 1 | **Palo Alto** | Santa Clara | Full | ✅ **Built.** Fees filled from homepage; review = David K. (Palo Alto owner, from homepage); "Last reviewed" set to May 2026 (draft's Rentometer date). Please confirm both |
| 2 | **Mountain View** | Santa Clara | Short | Who rents, neighborhood descriptions, FAQ answers, review |
| 3 | **Sunnyvale** | Santa Clara | Short | Who rents, neighborhood descriptions, FAQ answers, review |
| 4 | **San Jose** | Santa Clara | Short | Who rents, neighborhood descriptions, FAQ answers, review |
| 5 | **Menlo Park** | San Mateo | Short | **City resource link is empty in the draft**, who rents, neighborhood descriptions, FAQ answers, review |
| 6 | **Foster City** | San Mateo | Short | Who rents, neighborhood descriptions, FAQ answers, review |

### Also serving (chips on the archive, no page yet)
Los Altos (home office), Los Altos Hills, Cupertino, Saratoga, Atherton, Redwood City, San Carlos, Belmont, San Mateo, Santa Clara, Campbell, Milpitas.

> Los Altos is on the homepage as a service area but has **no draft**. Send content if it should get its own page.

---

## Location template: section map

Short drafts can still fill every section. Sections marked *optional* can be deleted for a city with no content.

| # | Section | Background | Fill from the draft |
|---|---|---|---|
| 1 | **Hero**: breadcrumb, `[County] · Service Area`, H1 `[City]` + *Property Management*, intro, 2 buttons, image with neighborhood tag | Navy | Headline + intro paragraph + "Get a Free Rental Analysis" |
| 2 | **Key takeaways**: 4 icon items *(optional)* | White | "Key takeaways" bullets (Palo Alto) |
| 3 | **About [City]**: image + badge, 2 paragraphs, 3 mini stats | Cream | "About [City]" / "Why [City]" text, % rented, top employer, transit |
| 4 | **Rental market snapshot**: 6 tiles | Deep navy | "Average rents" / "Rental market snapshot" + % rented + median value. Source + month in the note |
| 5 | **Who rents in [City]**: 3 cards *(optional)* | Sand | "Who rents" bullets (Palo Alto) |
| 6 | **How we manage [City] homes**: numbered steps **01–05** | White | "How we manage" (Palo Alto) or the 5 standard "Our services" items |
| 7 | **Neighborhoods**: up to 6 cards (name + description) | Cream | "Neighborhoods" list. Short drafts: name only, or delete the description |
| 8 | **Local rent rules**: numbered rule rows **01–06** + navy sidebar (city link, help line, last reviewed, sources) | White | "Local rent rules" bullets (add or remove rows freely) + "City resource" + "Help" + "Sources" |
| 9 | **Fees band**: 8% / 75% / $0 | Navy on sand | Already filled (same as homepage) |
| 10 | **Owner review**: one featured quote | Sand | A real review from that city (do not invent one) |
| 11 | **FAQ**: accordion with FAQ schema | White | FAQ. Q1 (cost) is pre-filled with real fees, which answers every "[add fees]" |
| 12 | **Nearby cities**: chips that link to other city pages | Cream | "Nearby cities" |
| 13 | **Contact**: "Get a free rental analysis for your [City] home" | Navy | Already filled; just replace [City] |

### Steps used across the site
- Homepage "Getting started": 01–04
- Archive "Wherever you own, four simple steps": 01–04
- Location "How we manage [City] homes": 01–05
- Location "Local rent rules": 01–06 (one number per rule)

---

## Making a city page in Elementor
1. Pages → Add New → title `[City] Property Management`, parent **Service Areas**, slug e.g. `palo-alto`.
2. Edit with Elementor → My Templates → insert **Crestline — Location Template**.
3. Replace every `[Bracket]`. Use Elementor's Finder or Navigator to jump between sections.
4. Replace the 3 images. Each one's AI prompt is its name in the **Navigator** (`IMG PROMPT: …`).
5. Delete optional sections that have no content.
6. Update the link on the archive card and in the table (`/service-areas/<slug>/`).

## Building a city (how I do it)
1. Copy `data/cities/_template.js` → `data/cities/<slug>.js` and fill it from the draft (optional sections → `null`).
2. `node _src/render-location.js && python _src/assemble.py` → `<slug>.html`
3. `node elementor/build-locations.js` → `elementor/crestline-location-<slug>.json`
4. Link the city's archive card/table row to its page.

> Ask me for the next city ("build Mountain View") and I'll do the steps above from its draft.
