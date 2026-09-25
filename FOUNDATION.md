# UI foundation — v2.3

Locked 23 Sep 2026, after the owner's review of the home page; brought onto the new brand identity
25 Sep 2026. Every page of the public site is built from what is below — and when this build moves
into `apps/web`, this is the spec it moves with. Change it on purpose: bump the version, say what
changed and why.

- **v2.3** — at the owner's request: the bar is glassy Graphite Ink everywhere (ink at 86%,
  frosted), its flyouts and the phone sheet the same ink; one fluid container, Bootstrap's
  `container-fluid`, from the bar to the footer, its gutter stepping up at Bootstrap's breakpoints;
  the footer's closing sits on the living pattern in its ink version; the business column is
  phone, email and address; the social row is Instagram and LinkedIn.
- **v2.2** — at the owner's request: the bar is clear at rest and glass (white at 92%) once the
  page moves; the pattern stays only in the hero (alive) and the Work band (still) — the paper
  sections are clean again; on a phone the FAQ categories are Pricing's segmented control, a word
  each, and on a desktop the rail's marker slides between them; the footer is five columns (the
  last the business: phone, email, address, map), the social row between hairlines, and the
  identity's own closing on ink with the symbol turning and the copyright centred.
- **v2.1** — at the owner's request: type on Apple's scale (17px body in the platform's own face,
  48px section headlines, 56px for the page's headline, 44–48px buttons); the floating and edge
  controls leave the site-wide layout for the contact page; the Work band sits wholly on the
  identity's ink cover pattern, still; the paper sections alternate clean and patterned; the
  closing band carries the identity's website hero art; on a phone the FAQ categories are a picker
  with a step either side.
- **v2.0** — the site takes the new identity (`Pixel-Kinetix-Brand-Identity`), without giving up
  its own look. The mark is the P and the pixel; its pixel makes the identity's quarter-turn in the
  header, on the portal cube and in the closing drawing. Slate is gone: every filled control is
  Graphite Ink, the greys lean the brand's cool way, and the violet became the brand's Haze and
  Blue Night. Kinetic Blue marks what moves and nothing else. The header is Apple's global bar —
  no pill — with full-width flyouts over a softened page. The hero's living grid is now the
  identity's brand language in its light version (`ModuleField`), and its ink version turns beside
  the Work heading. The Solutions frame lost its two chips, so each scene sits centred between its
  corner marks. The footer closes on the wordmark.
- **v1.3** — the mega menu is light again, at the owner's request; its icons stay bare, grey at
  rest and slate when pointed at or where you are. Where you are is its own mark — a slate wash
  and outline — rather than the hover pill held.
- **v1.2** — the mega menu is slate, like the pill it drops from, and its icons stand bare
  (no badge behind them), at the owner's request. The call to action reads "Get Started"
  everywhere but the hero, which keeps "Start a Project".
- **v1.1** — two motion primitives added at the owner's request: the hero's living grid
  (`PixelField`, replaced in v2.0 by `ModuleField`) and the velocity rows (`KineticMarquee`),
  which replace the CSS marquee for the sector strip. `Pausable` takes a button position.

## 1. Principles

1. **A monochrome ground, colour in between, graphite for action, blue for motion.** Paper, ink
   and hairlines carry the page; soft tints sit behind pictures; Graphite Ink marks everything you
   can press; Kinetic Blue marks only what moves — the logo's pixel, a turning module.
2. **Motion earns attention and never blocks reading.** Every effect is readable before it runs,
   without script, and under reduced motion. Anything that moves on its own can be paused.
3. **One way to do each thing.** One button, one section head, one scroll controller, one way to
   swap content in place. A new page composes these; it does not invent a sibling.
4. **Nothing on the page that the business cannot stand behind.** See §8.

## 2. Tokens (`src/app/globals.css`, `@theme`)

| Role                   | Token                                | Value                                 |
| ---------------------- | ------------------------------------ | ------------------------------------- |
| Page ground            | `paper`                              | `#fcfcfd`                             |
| Cards, panels          | `surface` / white                    | `#ffffff`                             |
| Quiet fills, hover     | `fill`, `fill-2`                     | `#f4f5f8`, `#edeef3`                  |
| Hairlines              | `line`, `line-2`                     | `#e6e8ee`, `#d9dce4`                  |
| Text                   | `ink` · `ink-2` · `ink-3`            | `#0b0d12` · `#5b6070` · `#868a9a`     |
| Dark bands, focal card | `night`, `night-2`                   | `#0b0d12`, `#171b28`                  |
| Action                 | `graphite`, `graphite-2` (hover)     | `#0b0d12`, `#1d2130`                  |
| Motion                 | `kinetic`, `kinetic-night`           | `#2e3bff`, `#6e78ff`                  |
| Brand wash             | `haze`, `steel`                      | `#e8eaf6`, `#6b7080`                  |
| Tints (behind art)     | `tint-violet/mint/sky/butter/blush`  | five pastels (violet is Haze-cool)    |
| Signals (dots in art)  | `signal-violet/green/sky/amber/rose` | five saturates (violet is Blue Night) |
| WhatsApp               | gradient                             | `#15803d → #116530` (5:1)             |
| Stars                  | —                                    | `#d97706` (3.2:1)                     |

`ink` is the identity's Graphite Ink; `ink-3` is 3.3:1 on paper — large type and marks only,
never body copy. Kinetic Blue is never a fill for a control, a heading or a card.

**Type.** Apple's scale. DM Sans (the brand's face) for display and headings; body and controls
in the platform's own face — SF on a Mac or an iPhone, Segoe UI or Roboto elsewhere, as apple.com
does it; IBM Plex Sans for labels, numbers and small technical text. Scale: `display` 40→56px,
`h2` 32→48px, `h3` 22→28px, `h4` 19px, `lead` 17→19px, `body` 17px on 1.47, `sm` 14px, `xs`
12px; the bar and its flyouts 12px, their big links 24px. Tracking −0.04em display, −0.03em
headings, +0.08em uppercase labels. The brand's faces are self-hosted in `public/fonts` — no font
request leaves the site.

**Shape.** Cards 1rem, panels 1.5rem, pills fully round. **Eases:** `ease-premium`
`cubic-bezier(0.2,0.78,0.2,1)` for most movement, `ease-out-expo` for arrivals, `ease-roll`
`cubic-bezier(0.645,0.045,0.355,1)` for rolling labels and arrows.

## 3. Layout

- **Container** — one, Bootstrap's `.container-fluid`, from the bar to the footer: always the full
  width, never capped. Its gutter (`--gutter`) steps up at Bootstrap's breakpoints: 1.25rem, then
  1.5rem at 576px, 2rem at 768px, 2.5rem at 992px, 3rem at 1200px and 4rem at 1400px. Anything
  pinned to the edge of a row uses `var(--gutter)`, so every edge lines up at every width.
- **Band** (`components/layout/band.tsx`) — every section. The band's background runs edge to
  edge; its content sits in the container.
  Sections breathe at `py-24 lg:py-32`.
- **SectionHead** — every section opens with it: a small eyebrow with a dot, a heading written in
  two halves (`lead` in ink, `fill` filling with ink as it scrolls in), an optional intro line.
  Left-aligned by default, centred for sections that are one idea.
- Width steps: 768px (`md`) phones end, 1024px (`lg`) desktop navigation and wide layouts begin,
  1280px (`xl`) the widest grids. Nothing scrolls sideways at any width from 320px.

## 4. Components and their states

| Component               | Rules                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Button** (`RollLink`) | `ink` (graphite fill), `line` (outline), `paper` (white, for dark grounds). 48px / 40px / 30px (the bar). The label rolls and the tilted arrow ↗ rolls out as its twin rolls in, 550ms.                                                                                                                                                                                                                                                                     |
| **Logo**                | The horizontal lockup, inline: the P and the pixel, the wordmark one colour. The pixel makes the quarter-turn 0.8s after load, on hover and focus, and each time the reader enters a new section. Never a loop.                                                                                                                                                                                                                                             |
| **Header**              | Apple's global bar in glassy Graphite Ink: 44px (48px on phones), ink at 86% with a 20px frost, a hairline of light once the page moves. The white lockup, seven white items and a white 30px Get Started spread evenly on one line. Where you are: full white and a 3px pixel beneath. Never changes shape.                                                                                                                                                |
| **Flyouts**             | Full width, the bar's own ink, drawn down in 0.36s (Apple's curve), the page behind dimmed and softened (18px blur). First column: the big way in (24px bold, white); beside it, every item in small semibold type. Items arrive a beat apart. Where you are: white, a blue pixel before it.                                                                                                                                                                |
| **Phone menu**          | Full-screen sheet of ink under the bar; the two-bar toggle. Items 28px bold white on one left edge, no rules; Services and Solutions open their lists in place, grouped under small grey labels. Where you are: a blue pixel after the item.                                                                                                                                                                                                                |
| **Quick contact**       | Contact page only — not in the site-wide layout. Desktop: Call Now (graphite, 42px, a faint light ring) with back-to-top; WhatsApp rail on the right (green, 50×151). Phones: Call Now + WhatsApp bar (50px); Get Started edge tab (graphite, 40×157, ↖).                                                                                                                                                                                                   |
| **Tabs**                | `Segmented`: a graphite thumb slides between options (Pricing; the FAQ on a phone, one word per category, no icons). Category rail (FAQ, desktop): 3px bar, wash, 4px nudge, counts in one column; the bar and wash are one marker that slides to the chosen category (0.55s).                                                                                                                                                                              |
| **Accordion**           | automatix's rows: no card at rest, muted question, chevron; hover fills; open is a bordered card, chevron turned, answer rising in.                                                                                                                                                                                                                                                                                                                         |
| **Cards**               | White on paper, 1px `line`, panel radius. One dark focal card per row at most (`night`).                                                                                                                                                                                                                                                                                                                                                                    |
| **Footer**              | Five link columns, the last the business (phone, email, address). The social row between hairlines — Instagram and LinkedIn: tiles with a glyph in an ink disc, the name and a tilted arrow; pointed at, the tile whitens, the disc takes the platform's colour, the name underlines. A profile without an address is a placeholder tile. Last, the identity's closing on ink over the living pattern: the symbol turning, the line, the copyright centred. |

Every interactive thing has a visible `:focus-visible` state, a keyboard path, and a 40px target.

## 5. Motion

One controller (`ScrollEffects`) reads every scroll-linked element, then writes — once a frame.
New scroll behaviour is a data attribute on the element, never a second listener.

| Primitive                    | Use it for                                             | Values                                                                                                                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lenis smooth scroll          | the whole page                                         | `duration: 2`, anchors offset −88px                                                                                                                                                                                                                 |
| `BlurText`                   | the page's one headline                                | per character: blur 10px, y 0.28em, 22ms stagger, 1000ms                                                                                                                                                                                            |
| `[data-reveal]`              | blocks arriving below the fold                         | y 40px, 900ms `cubic-bezier(0.22,1,0.36,1)`                                                                                                                                                                                                         |
| `FillText`                   | the second half of section headings                    | ink over grey, 90% → 40% of the viewport                                                                                                                                                                                                            |
| `PixelReveal` / `PixelCover` | illustrations on first sight; content swapped in a tab | 20px cells, 20% band, bottom-up; 1.6s first sight, 0.7s on a tab switch                                                                                                                                                                             |
| `Morph`                      | any panel whose content is swapped                     | height eases 650ms; lists stagger in (`.morph-stagger`)                                                                                                                                                                                             |
| `[data-spread]`              | card grids that assemble (use cases)                   | rows gathered by ¼ width, spreading as they rise                                                                                                                                                                                                    |
| `.tilt-plane`                | the gallery                                            | straightens over 1.5 viewports, 0.7 on phones                                                                                                                                                                                                       |
| `[data-parallax]`            | one picture per section at most                        | px per viewport                                                                                                                                                                                                                                     |
| `CountUp`                    | figures                                                | critically damped spring, ω 8.2, ≈1.1s; nothing else moves                                                                                                                                                                                          |
| Quarter-turn (`turn`)        | the logo's pixel, and any mark drawn on the page       | 0.8s rest, 90° over 1.2s on `cubic-bezier(.7,0,.2,1)`, scale 1/(cos θ + sin θ); played once per trigger, never looped                                                                                                                               |
| `TurnOnView`                 | a mark inside an illustration (portal, closing)        | turns every `[data-turn]` once at 45% in view, and again when pointed at                                                                                                                                                                            |
| `ModuleField`                | the hero's sides (light); the footer's closing (ink)   | the identity's two modules, 56–78px cells, tone on tone; a quarter-turn every 0.4–0.9s, a module in and out every 1.3–2.7s, one blue module at most, every 4.8–7.8s; the mark assembling every 8–12s; a module under the pointer; wide screens only |
| `KineticMarquee`             | rows of labels that should feel alive                  | drift 26–34px/s; up to 8× with the scroll's pace, turning with its direction; held under the pointer                                                                                                                                                |
| Auto-advance (Solutions)     | one rotating feature per page                          | 9s dwell, pauses only on pointer or keyboard focus, resumes where it stopped                                                                                                                                                                        |

`prefers-reduced-motion`: native scroll, no reveals, no dissolves, hero open, gallery flat,
counts shown final, the brand pattern still, no pixel turns, kinetic rows still and wrapped. Anything that moves on its
own for over 5s sits in a `Pausable` with a visible pause control (WCAG 2.2.2).

## 6. Visual language

- **The mark** (`ui/brand.tsx`): the identity's own geometry — a 216 grid, stems of 100, a gap of
  16, a bowl of radius 100 — for the symbol, the lockup and the wordmark. The blue lives only in
  the pixel; on a dark block the P turns white.
- **Brand language**: the pixel and the quarter-disc. Alive in the hero and, in ink, behind the
  footer's closing (`ModuleField`), never over words; still, as the identity's ink cover, under the
  whole Work band (`BrandPattern`). The paper sections stay clean.
- **Brand art** (`BrandArt`): the identity's website hero art in the closing band — modules turning
  on an 8s rhythm, the symbol's pixel on 5.5s — pausable.
- **Isometric line art** (`visuals/iso.tsx`): projection `[(x−y)·cos30°, (x+y)·½ − z]`, 1.25
  strokes, white/tinted/black blocks, glyph blocks, routes and joints. Every scene's viewBox is
  measured on `/lab` (`bbox`), never guessed. Tinted wells behind them, one hue per card.
- **Concept websites** (`visuals/concept-sites.tsx`): drawn at design size (1280×800, 390×672)
  and scaled. Fictional brands, always presented as concept work.

## 7. Accessibility floor

axe finds nothing at 1440, 390 and reduced motion, with the phone menu open. Text contrast 4.5:1
(3:1 for large type and graphics). Menus close on Escape and hand focus back; swapped content
keeps focus on the page; tabs and radio groups take the arrow keys; a skip link leads the page.

## 8. Content rules

- Every price, service, promise and answer comes from the published catalogue. A heading may
  reword; it may not claim more.
- No invented clients, logos, figures, awards or reviews. Concept work says so. Review samples
  render on the dev server only; a real review needs the client's words and consent to their name.
- No duration the price list does not state, no portal feature the portal does not have
  (platform: `docs/10-public-surface.md` §7, `docs/11-platform-reference.md` §15.7).

## 9. Moving into `apps/web`

1. Tokens and component CSS into `apps/web/src/app/globals.css`; fonts into its `public/fonts`.
2. Every read in `src/content/site.ts` becomes a CMS read. Section headings, the warranty card and
   reviews need a CMS home — a platform change with its rules test, and a `docs/10-public-surface.md`
   §7 update that `scripts/check-cms-seed.mjs` holds the seed to.
3. Anchors become routes: services and solutions get their pages, and "where you are" in the
   menus becomes a pathname match (`lib/anchor.ts` retires).
4. `lenis` is the only new runtime dependency — the port decides it.
5. `/lab` stays out of production. The gate runs green before anything merges.
