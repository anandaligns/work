# UI foundation — v1.3

Locked 23 Sep 2026, after the owner's review of the home page. Every page of the public site is
built from what is below — and when this build moves into `apps/web`, this is the spec it moves
with. Change it on purpose: bump the version, say what changed and why.

- **v1.3** — the mega menu is light again, at the owner's request; its icons stay bare, grey at
  rest and slate when pointed at or where you are. Where you are is its own mark — a slate wash
  and outline — rather than the hover pill held.
- **v1.2** — the mega menu is slate, like the pill it drops from, and its icons stand bare
  (no badge behind them), at the owner's request. The call to action reads "Get Started"
  everywhere but the hero, which keeps "Start a Project".
- **v1.1** — two motion primitives added at the owner's request: the hero's living grid
  (`PixelField`) and the velocity rows (`KineticMarquee`), which replace the CSS marquee for the
  sector strip. `Pausable` takes a button position.

## 1. Principles

1. **A monochrome ground, colour in between, slate for action.** Paper, ink and hairlines carry
   the page; soft tints sit behind pictures; slate marks everything you can press.
2. **Motion earns attention and never blocks reading.** Every effect is readable before it runs,
   without script, and under reduced motion. Anything that moves on its own can be paused.
3. **One way to do each thing.** One button, one section head, one scroll controller, one way to
   swap content in place. A new page composes these; it does not invent a sibling.
4. **Nothing on the page that the business cannot stand behind.** See §8.

## 2. Tokens (`src/app/globals.css`, `@theme`)

| Role                   | Token                                | Value                             |
| ---------------------- | ------------------------------------ | --------------------------------- |
| Page ground            | `paper`                              | `#fcfcfc`                         |
| Cards, panels          | `surface` / white                    | `#ffffff`                         |
| Quiet fills, hover     | `fill`, `fill-2`                     | `#f5f5f5`, `#efefef`              |
| Hairlines              | `line`, `line-2`                     | `#e6e6e6`, `#d6d6d6`              |
| Text                   | `ink` · `ink-2` · `ink-3`            | `#1a1a1a` · `#5f5f5f` · `#8c8c8c` |
| Dark bands, focal card | `night`, `night-2`                   | `#0f0f10`, `#1b1b1d`              |
| Action                 | `slate`, `slate-strong` (hover)      | `#2b2d42`, `#1f2132`              |
| Tints (behind art)     | `tint-violet/mint/sky/butter/blush`  | five pastels                      |
| Signals (dots in art)  | `signal-violet/green/sky/amber/rose` | five saturates                    |
| WhatsApp               | gradient                             | `#15803d → #116530` (5:1)         |
| Stars                  | —                                    | `#d97706` (3.2:1)                 |

`ink-3` is 3.4:1 on paper — large type and marks only, never body copy.

**Type.** DM Sans for display and headings, Poppins for body and controls, IBM Plex Sans for
labels, numbers and small technical text. Scale: `display` 40→68px, `h2` 32→52px, `h3` 22→28px,
`h4` 19px, `lead` 18px, `body` 16px, `sm` 14px, `xs` 12px. Tracking −0.045em display, −0.03em
headings, +0.08em uppercase labels. Self-hosted in `public/fonts` — no font request leaves the site.

**Shape.** Cards 1rem, panels 1.5rem, pills fully round. **Eases:** `ease-premium`
`cubic-bezier(0.2,0.78,0.2,1)` for most movement, `ease-out-expo` for arrivals, `ease-roll`
`cubic-bezier(0.645,0.045,0.355,1)` for rolling labels and arrows.

## 3. Layout

- **Band** (`components/layout/band.tsx`) — every section. The band's background runs edge to
  edge; its content sits in `.contain`, an invisible 80rem column with 1.5 / 2.5 / 3.5rem gutters.
  Sections breathe at `py-24 lg:py-32`.
- **SectionHead** — every section opens with it: a small eyebrow with a dot, a heading written in
  two halves (`lead` in ink, `fill` filling with ink as it scrolls in), an optional intro line.
  Left-aligned by default, centred for sections that are one idea.
- Width steps: 768px (`md`) phones end, 1024px (`lg`) desktop navigation and wide layouts begin,
  1280px (`xl`) the widest grids. Nothing scrolls sideways at any width from 320px.

## 4. Components and their states

| Component               | Rules                                                                                                                                                                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Button** (`RollLink`) | `ink` (slate fill), `line` (outline), `paper` (white, for dark grounds). 48px / 40px. The label rolls and the tilted arrow ↗ rolls out as its twin rolls in, 550ms.                                                                                                                                   |
| **Header**              | Light bar at the top; after 48px a slate pill (light links, white button, the logo tile ringed). Active section: centre-grown underline. Menu triggers: a pill while open.                                                                                                                            |
| **Mega menu**           | Light panel under the pill; columns on paper. Item: a bare icon (no badge), name, one-line summary, tilted arrow. Hover: white pill, the icon turning slate. Where you are: a light slate wash with a fine slate outline, the icon in slate — distinct from hover. Foot: a strip with a slate button. |
| **Phone menu**          | Full-screen sheet drawn down under the bar, hairline beneath it; aoutive's two-bar toggle. Rows end in a 2rem circle. Active row: the FAQ rail's bar, wash and nudge.                                                                                                                                 |
| **Quick contact**       | Desktop: Call Now (slate, 42px) with back-to-top at the edge; WhatsApp rail on the right (green, 50×151). Phones: Call Now + WhatsApp bar (50px); Get Started edge tab (slate, 40×157, ↖).                                                                                                            |
| **Tabs**                | Segmented control: a slate thumb slides between options. Category rail (FAQ): 3px bar, wash, 4px nudge, counts in one column.                                                                                                                                                                         |
| **Accordion**           | automatix's rows: no card at rest, muted question, chevron; hover fills; open is a bordered card, chevron turned, answer rising in.                                                                                                                                                                   |
| **Cards**               | White on paper, 1px `line`, panel radius. One dark focal card per row at most (`night`).                                                                                                                                                                                                              |
| **Footer**              | Lockup and one line, four link columns, Business Info pills (phone, email, WhatsApp, Instagram, Maps).                                                                                                                                                                                                |

Every interactive thing has a visible `:focus-visible` state, a keyboard path, and a 40px target.

## 5. Motion

One controller (`ScrollEffects`) reads every scroll-linked element, then writes — once a frame.
New scroll behaviour is a data attribute on the element, never a second listener.

| Primitive                    | Use it for                                             | Values                                                                                                                                            |
| ---------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lenis smooth scroll          | the whole page                                         | `duration: 2`, anchors offset −88px                                                                                                               |
| `BlurText`                   | the page's one headline                                | per character: blur 10px, y 0.28em, 22ms stagger, 1000ms                                                                                          |
| `[data-reveal]`              | blocks arriving below the fold                         | y 40px, 900ms `cubic-bezier(0.22,1,0.36,1)`                                                                                                       |
| `FillText`                   | the second half of section headings                    | ink over grey, 90% → 40% of the viewport                                                                                                          |
| `PixelReveal` / `PixelCover` | illustrations on first sight; content swapped in a tab | 20px cells, 20% band, bottom-up; 1.6s first sight, 0.7s on a tab switch                                                                           |
| `Morph`                      | any panel whose content is swapped                     | height eases 650ms; lists stagger in (`.morph-stagger`)                                                                                           |
| `[data-spread]`              | card grids that assemble (use cases)                   | rows gathered by ¼ width, spreading as they rise                                                                                                  |
| `.tilt-plane`                | the gallery                                            | straightens over 1.5 viewports, 0.7 on phones                                                                                                     |
| `[data-parallax]`            | one picture per section at most                        | px per viewport                                                                                                                                   |
| `CountUp`                    | figures                                                | critically damped spring, ω 8.2, ≈1.1s; nothing else moves                                                                                        |
| `PixelField`                 | the hero's empty sides, and nowhere else               | 44px drafting-grid cells, ≈38 alight, 2.4–4.2s each, 15% tinted; the logo's three steps every 3.6–6s; a cell under the pointer; wide screens only |
| `KineticMarquee`             | rows of labels that should feel alive                  | drift 26–34px/s; up to 8× with the scroll's pace, turning with its direction; held under the pointer                                              |
| Auto-advance (Solutions)     | one rotating feature per page                          | 9s dwell, pauses only on pointer or keyboard focus, resumes where it stopped                                                                      |

`prefers-reduced-motion`: native scroll, no reveals, no dissolves, hero open, gallery flat,
counts shown final, the living grid off, kinetic rows still and wrapped. Anything that moves on its
own for over 5s sits in a `Pausable` with a visible pause control (WCAG 2.2.2).

## 6. Visual language

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
