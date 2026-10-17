# Crestline Property Management — Design System

Single source of truth for every Crestline page. New pages must reuse these tokens,
section patterns and class names so the site stays consistent.

## Fonts (Google Fonts)
| Role | Family | Weights |
|---|---|---|
| Headings, numbers, quotes | **Cormorant Garamond** | 400, 500, 400 italic, 500 italic |
| Body, labels, buttons, nav | **Jost** | 300, 400, 500 |

- Headline accent = same heading in *italic*, gold (`<em>` inside heading).
- Eyebrow = Jost 12px, uppercase, letter-spacing 0.32em, gold, with a 36px gold line before (and after when centered).

## Colours
| Token | Hex | Use |
|---|---|---|
| `--navy` | `#0F1D33` | Hero, dark sections, primary text on light |
| `--navy-deep` | `#0A1424` | Top bar, "difference" section, footer |
| `--navy-card` | `#132340` | Cards on deep navy |
| `--gold` | `#C4A467` | Buttons, accents on dark bg |
| `--gold-dark` | `#8B6A35` | Italic accents / icons on light bg |
| `--cream` | `#F7F4EE` | Light section bg |
| `--sand` | `#EFE8DC` | Alternate light section bg |
| `--white` | `#FFFFFF` | Cards, white sections |
| `--line` | `#E6DECF` | Borders on light bg |
| `--text` | `#6B6F78` | Body text on light |
| `--text-light` | `#C3C9D3` | Body text on dark |

## Type scale (desktop → mobile)
| Element | Size | Line height |
|---|---|---|
| H1 hero | 76px → 46px | 1.04 |
| H2 section | 60px → 40px | 1.08 |
| H3 card title | 30px → 26px | 1.2 |
| Stat / price number | 52px → 40px | 1 |
| Body | 17px (16 in cards) | 1.85 |
| Eyebrow / labels | 12px, ls .32em | — |
| Buttons | 12px, uppercase, ls .22em, Jost 500 | — |

## Layout
- Max content width **1200px**, side gutter 32px (20px mobile).
- Section padding **120px** top/bottom (80px tablet, 64px mobile).
- Square corners everywhere (border-radius 0). Thin 1px borders.
- Breakpoints: 1024px (tablet), 767px (mobile) — same as Elementor defaults.

## Components (class names shared by HTML + Elementor CSS Classes field)
| Class | What |
|---|---|
| `cl-eyebrow` / `cl-eyebrow--center` | Gold eyebrow with line(s) |
| `cl-h` | Serif heading, `em` turns gold italic (`cl-h--light` on dark bg) |
| `cl-btn cl-btn--gold / --outline / --navy` | Buttons |
| `cl-link` | Gold uppercase text link with underline + arrow |
| `cl-ph` | Image placeholder (swap for real image) |
| `cl-card`, `cl-card--top` (gold top border), `cl-card--dark` | Cards |
| `cl-num` | Italic gold numbering (01, 02…) |

## Motion
- Entrance: fade-up 28px, 0.9s, `cubic-bezier(.2,.7,.2,1)`, stagger 120ms in grids.
- Hero: line-by-line heading reveal, image frame wipe.
- Hover: cards lift 4px + soft shadow; arrows nudge 4px right; buttons darken.
- Elementor equivalent: Motion Effects → Entrance "Fade In Up", duration Normal, delays 0/150/300ms.
- All motion disabled under `prefers-reduced-motion`.

## Contact facts
- Phone: 650 889 0570 · Email: realtor@baliliu.homes
- 175 S San Antonio Rd, #100, Los Altos, CA · DRE #01234567
