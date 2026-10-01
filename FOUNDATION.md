# UI foundation — v2.14

Locked 23 Sep 2026, after the owner's review of the home page; brought onto the new brand identity
25 Sep 2026. Every page of the public site is built from what is below — and when this build moves
into `apps/web`, this is the spec it moves with. Change it on purpose: bump the version, say what
changed and why.

- **v2.14** — the service, solution and Evolve pages become product pages (after Apple's
  product pages and Lightfield's, principles only), approved on WhatsApp Automation on 26 Sep 2026. One template (`pages/product.tsx`, `content/products/<slug>.ts`): the page intro on the
  moving pattern, then a wide dark panel with the product at work — software at the back, iPhones
  in front, a toast dropping in — then highlights, the point of view beside its photo, a feature
  bento (five cards; the last runs the full width, its desk centred), a spec sheet, a comparison
  table with a raised dark "With Pixel Kinetix" column (stacked on a phone), how it's built with
  how we build it and a scrolling logo strip in one grey panel, who it's for, the packages with
  their notes on charges, the why band, and the questions with the small print boxed beside them.
  The step-by-step section, the separate build band and the logo hub are gone. Every page has its
  own example business, its own screens and its own accent — twenty accents, no two alike — and
  the screens are real software: desktop apps built from blocks (charts with a marker, tables,
  boards, calendars, room charts, invoices with the fields read from them, logs with each tool's
  logo, gauges, funnels, spreadsheets, roadmaps) and phone apps built from blocks (Google, a mail
  app, a camera, checkout, booking, WhatsApp). Tabs become separate pills on a phone, wrapping and
  centred, the thumb still sliding. Each page takes two photographs (IMAGE-PROMPTS.md).
- **v2.13** — the service and solution pages, story-led, from "Service & Solution Pages —
  Story-Led Content" (25 Sep 2026), after Lightfield's homepage (principles only, never its
  assets). The type drops a step everywhere, home included: `h2` 30→40px, `h3` 20px, `h4` 17px,
  `lead` 16→17px, `body` 15px on 1.55 — small, quiet text beside wide screens. The fifteen
  services, Evolve and the four solutions share one template (`pages/story.tsx`,
  `pages/story-page.tsx`): a hero that is mostly product — the example business's screen on the
  page's tint, a second screen over its lower right, a notification card — then a point of view
  beside one photograph, a day with it (the Example label, moments revealed one by one, each on a
  small screen), what changes (three outcomes alternating sides), before and after, under the hood
  (the page's isometric scene moves here from the hero), works with (plain chips, no logos), who
  it suits (industry cards), how we build it (the Process track on its side), the price, the
  questions, related cards and the closing. Screens are HTML and CSS drawn from data
  (`components/screens/`); each page's words and screens are one typed file
  (`content/stories/<slug>.ts`) that also feeds its FAQPage data, and links in its text are
  written `[words](/path)`. Tessel Components, a sheet-metal parts maker in Peenya, joins the cast
  as the ninth concept business (steel blue-grey `#4a6a85`). Service pages' breadcrumbs run Home ›
  Services › group › page.
- **v2.12** — the remaining pages, from "Remaining Pages: Content & Visuals" (25 Sep 2026): no
  page is coming soon. Four templates — service, group, solution, Evolve — each built from what
  the home page has: the intro on the moving pattern, the page's hero scene in a wide well of its
  tint (arriving through the pixel dissolve), problem cards in grey, build cards, the flow strip,
  still sector chips, price cards, a one-shelf FAQ, related cards, and the closing. Every closing
  but About's ends on the Connect scene (subject → the P cube → result, played once at 45% in
  view). The home FAQ grows to 31 answers on four shelves, every one in the HTML and the
  FAQPage data. The contact page gains its form ("Tell us about it") and a thanks page; every Get
  Started carries `?interest=`. Service, BreadcrumbList and FAQPage data on every service and
  solution page, and a 1200 × 630 share image for every page, drawn from its own scene. The Solutions menu lists the four solution pages, each with its two ways in as points under
  a hairline, inside the one link to its page.
- **v2.11** — at the owner's request: the assistant's launcher is parked until the assistant
  works (`assistant.tsx`, rendered by no page); the footer's closing row loses the room it kept
  for it. The hero tiles' notifications are black glass — the tile blurred and dimmed behind
  white type — floating over each tile's lower edge, clear of the site's own button above; the
  desktop tile clips its screen rather than itself, so its notification can hang over too. Phones
  show them as well, on the four designs drifting past.
- **v2.10** — at the owner's request: the footer's lockup and line sit on the left edge at every
  width; the assistant's launcher is for desktops only — not under 1280px, nor on a touch
  screen; and lead follow-up is a lead passed on (Tabler's `user-share`), not a bell, in the
  menus and in Never Miss a Lead's scene. The bell stays for reminders.
- **v2.9** — at the owner's request: one light for now, the day version — the header is Apple's
  light bar at every hour, and the visitor's clock is gone (a site-wide dark mode comes later, as
  one more set of `--nav-*` values). The footer is still: no pattern, no turning pixel — the
  full lockup and its line (centred across the width on phones and tablets, the first column
  from 1280px), then six columns, Social the last, on Apple's #f5f5f7. The WhatsApp button's
  label is white.
- **v2.8** — at the owner's request: the business number is +91 80742 11007, for calls and
  WhatsApp. The floating contact controls leave the contact page (parked in
  `floating-actions.tsx`); its headline carries them instead — Mail us in Kinetic Orange first,
  WhatsApp in its own green (#25D366, ink label for contrast), Call Now with its phone ringing.
  The lower right of every page holds the AI assistant's launcher, Kix: a graphite pill with its
  face and "Ask Kix", the face alone in a circle on phones; it opens a note and the three ways to
  reach the team until the assistant is built. The footer is one section on the living pattern,
  in the header's light by the visitor's clock: the symbol, its line and the socials first; then
  Explore, Services, Solutions, Legal (with a Refund Policy and a Grievance page) and Business
  info; Apple's closing row — the copyright left, Back to top right. The pattern's blue module
  and ghosted mark never land under words.
- **v2.7** — at the owner's request: one icon set, Tabler Icons (MIT), outline at 1.5 — 52
  marks copied into `icon.tsx` as paths, no package. Each icon says its service rather than
  something near it: portals a person, web apps a window, dashboards the tiles (a gauge read as
  speed), internal tools a wrench, CRM people, API integrations a plug, AI workflows a document
  with a spark, the Connected Website a link, lead follow-up a bell, hosting a server; the
  sectors, the process, About, Contact, the FAQ shelves and the illustrations follow. One idea,
  one mark: Evolve is always the shield. The contact page's buttons, the rolling arrows and the
  pause button draw from the same set.
- **v2.6** — at the owner's request: the header keeps day and night by the visitor's clock
  (6:00–18:00 day): Apple's light bar (`rgba(245, 245, 247, .8)`) by day, the brand's glassy
  ink by night — the flyouts and the phone sheet with it. The mega menu's panel is gone: its
  columns sit on the sheet itself, starting in line with the lockup, titles on the same edge as
  the items.
- **v2.5** — at the owner's request: inside the ink flyouts, the earlier mega menu returns — a
  light panel of columns on paper under centred titles, items with an icon, a one-line summary and
  a tilted arrow, and a foot strip; the bar and the sheet are unchanged. The footer's social row
  becomes a sixth column of plain links, and the address carries its PIN, 560043.
- **v2.4** — 25 Sep 2026, at the owner's request: the site sells one connected system —
  websites, business software and automation, improved every month — rather than websites,
  hosting and care. Nothing in the look changes: every section, scene and motion stays. The
  content does: catalogue v2 (three service groups — Digital Experiences, Business Systems,
  Automation & AI — fifteen services, Evolve beneath them, four solutions, the Build lineup of
  Website, Connected Website, Store, System Blueprint and Custom, twelve answers). Starter and
  Signature are retired; Signature's custom design lives on in the Connected Website. Three small
  additions: the hero tiles carry a notification each from the system behind them (`.hero-toast`),
  a line for Evolve closes the Services section and opens the Evolve plans tab
  (`/#evolve-plans`), and the site has pages beyond the home page — a coming-soon page for every
  service group, service, Evolve and solution (`noindex`, out of the sitemap), and About,
  Contact, Privacy, Terms and a 404. Every "Get Started" leads to `/contact`. The menus' Services
  items open those pages, so "where you are" there is a pathname match; Solutions' bundles still
  open their row on the home page.
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
  Orange Night. Kinetic Orange marks what moves and nothing else. The header is Apple's global bar —
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
   can press; Kinetic Orange marks only what moves — the logo's pixel, a turning module.
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
| Motion                 | `kinetic`, `kinetic-night`           | `#ff3d00`, `#ff7a4d`                  |
| Brand wash             | `haze`, `steel`                      | `#e8eaf6`, `#6b7080`                  |
| Tints (behind art)     | `tint-violet/mint/sky/butter/blush`  | five pastels (violet is Haze-cool)    |
| Signals (dots in art)  | `signal-violet/green/sky/amber/rose` | five saturates (violet is Orange Night) |
| WhatsApp               | gradient                             | `#15803d → #116530` (5:1)             |
| Stars                  | —                                    | `#d97706` (3.2:1)                     |

`ink` is the identity's Graphite Ink; `ink-3` is 3.3:1 on paper — large type and marks only,
never body copy. Kinetic Orange is never a fill for a control, a heading or a card.

**Type.** DM Sans (the brand's face) for display and headings; body and controls in the
platform's own face — SF on a Mac or an iPhone, Segoe UI or Roboto elsewhere, as apple.com does
it; IBM Plex Sans for labels, numbers and small technical text. Scale (v2.13, smaller and quieter
after Lightfield): `display` 40→56px, `h2` 30→40px on 1.1, `h3` 20px, `h4` 17px, `lead` 16→17px,
`body` 15px on 1.55, `sm` 14px, `xs` 12px; text inside a product screen 10–13px; the bar and its flyouts 12px, their big links 24px. Tracking −0.04em display, −0.03em
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

| Component               | Rules                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Button** (`RollLink`) | `ink` (graphite fill), `line` (outline), `paper` (white, for dark grounds), `kinetic` (Kinetic Orange, for the one action a page leads with), `whatsapp` (#25D366, ink label); an optional leading `icon` spins on hover, `shake` rings it. 48px / 40px / 30px (the bar). The label rolls and the tilted arrow ↗ rolls out as its twin rolls in, 550ms.                                                                                                                                                                                                                                                                                     |
| **Logo**                | The symbol, and beside it the name typed as one lowercase word — “pixelkinetix”, DM Sans Bold — inline and one colour but the pixel; the same in the header, the footer and the share images. The pixel makes the quarter-turn 0.8s after load, on hover and focus, and each time the reader enters a new section. Never a loop.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Header**              | Apple's global bar: 44px (48px on phones), one frosted strip, the lockup, seven items and a 30px Get Started spread evenly on one line. Apple's light bar, `rgba(245, 245, 247, .8)`, ink type and an ink button. A hairline once the page moves. Pointed at, an item takes the earlier pill — it grows in, and lets go when the pointer leaves; Services and Solutions hold it while their menu is open. Where you are: full colour and a 3px pixel beneath. Never changes shape.                                                                                                                                                        |
| **Flyouts**             | Full width, the bar's own light made solid, drawn down in 0.36s (Apple's curve), the page behind dimmed and softened (18px blur). Inside, the earlier mega menu's pattern on the sheet itself, starting in line with the lockup: a column per group or solution under its title (linking to its page) and line, over a hairline; 3.5rem clear of the bar; every item an icon, a name, its summary in full (wrapping, never cut off) and a tilted arrow that rolls; a soft pill when pointed at, held with a hairline where you are. A foot under a hairline carries Evolve (services) or the ask (solutions) and a button to all of them. |
| **Phone menu**          | Full-screen sheet in the bar's light under the bar; the two-bar toggle. Items 28px bold ink on one left edge, no rules; Services and Solutions open their lists in place, grouped under small grey labels. Where you are: a blue pixel after the item.                                                                                                                                                                                                                                                                                                                                                                                    |
| **Page intro**          | Every page but home opens with the hero's chip, a `BlurText` headline (the page's one `h1`), a lead line and its actions, on `ModuleField`. Coming-soon pages add a notice pill — "This page is on its way. The service is available now." — then a band of related cards.                                                                                                                                                                                                                                                                                                                                                                |
| **Quick contact**       | Parked (`floating-actions.tsx`), on no page. Contact reaches from its headline: Mail us (`kinetic`), WhatsApp (`whatsapp`), Call Now (`ink`, the phone ringing on `ring-shake` every 2.4s).                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Tabs**                | `Segmented`: a graphite thumb slides between options (Pricing; a comparison's options; the FAQ on a phone). Under 640px the track goes: separate white pills, centred, wrapping to a second row, the thumb sliding across and down. Category rail (FAQ, desktop): 3px bar, wash, 4px nudge, counts in one column; the bar and wash are one marker that slides to the chosen category (0.55s).                                                                                                                                                                                                                                             |
| **Accordion**           | automatix's rows: no card at rest, muted question, chevron; hover fills; open is a bordered card, chevron turned, answer rising in.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Cards**               | White on paper, 1px `line`, panel radius. One dark focal card per row at most (`night`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Footer**              | Still, on Apple's #f5f5f7 under a hairline. The header's logo and "Engineered to move you forward." — on the left edge, across the width on phones and tablets and the first column from 1280px. Then six columns of plain links: Explore, Services, Solutions, Legal, Business info (phone, email, address with PIN) and Social (a profile without an address is its name alone). Under a hairline: "Copyright © year Pixel Kinetix. All rights reserved." left, Back to top right.                                                                                                                                                        |
| **Assistant**           | Parked — rendered by no page until the assistant works. When shown: lower right, every page, on desktops only — not under 1280px, nor on a touch screen (`assistant.tsx`; name, role and face in `site.ts`). A 48px graphite pill — the face, then "Ask Kix". The brand pixel at the face's corner turns once on load and on hover. Opens a non-modal panel: the note, Mail us / WhatsApp / Call now, a composer marked Coming soon. Escape or a click outside closes it.                                                                                                                                                                 |
| **Flow strip**          | One glyph block per step on a route — across from 768px, down on a phone, measured block centre to block centre. A Kinetic Orange dot runs it once at 45% in view; none under reduced motion. First and last blocks take the page's tint.                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Connect scene**       | The closing picture: subject block (page tint) → the black P cube → a white check with a green signal, in the Solutions frame. Routes draw in (0.9s), a blue dot travels (1.4s), the pixel turns at the cube, the signal pings; hovering replays the dot. Drawn complete and still under reduced motion. Home's converges three blocks into Evolve's shield.                                                                                                                                                                                                                                                                              |
| **Enquiry form**        | White panel, 16px fields, labels above, "(optional)" in grey, errors in words under the field with a mark, the first taking focus. Consent never pre-ticked. Honeypot, no puzzle. Shown only once `LEAD_WEBHOOK_URL` is set (always on the dev server).                                                                                                                                                                                                                                                                                                                                                                                   |
| **Product screens**     | `ScreenView` (`components/screens/`): iPhones with the Dynamic Island and MacBooks with Chrome, holding real-looking software — desktop apps from blocks at 1280 × 800 (`desk-blocks.tsx`), phone apps from blocks (`phone-screen.tsx`), WhatsApp as WhatsApp draws it, concept sites. Real type sizes, scaled like a screenshot; sample data only; one accent per page, no two pages alike; no screen repeated on another page. Decorative (`aria-hidden`), each with a one-line caption.                                                                                                                                                |
| **Feature bento**       | Five cards, two by two and the last across the full width: a label, a title, two lines, three checked points, and a crop of the product filling the rest — phones rise from the foot, desks run off the edge (centred in the wide card). Grey cards on a white band, white on a grey one.                                                                                                                                                                                                                                                                                                                                                 |
| **Industry cards**      | HBR Analytics' card, in our theme: white, 1px line, a 50px circle in the industry's own light tint (the home sector strip's) holding its Tabler mark, the name, one line on what the page does for it. Lifts 4px on hover; the circle turns graphite with a white mark.                                                                                                                                                                                                                                                                                                                                                                   |
| **Build track**         | The Process track laid horizontally from 1024px: numbered ink-ring dots joined by a hairline, each step's name and line under it; stacked on a phone.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Photo**               | Two per product page: a dark background behind the product panel (45% over the page's gradient) and a 3:2 point-of-view photo, slightly warm and muted. AVIF and WebP at 800 and 1600 wide, lazy, width and height set. Until one exists (`public/photos/<file>-1600.webp`), the gradient or a panel of the page's tint holds its place.                                                                                                                                                                                                                                                                                                  |
| **Icons**               | Tabler Icons outline (`Icon`), 24 × 24 at 1.5, `currentColor`, no fills — heavier (1.8–2) only on solid buttons and at 14px or under. One idea, one mark (`SERVICE_ICONS`); a new one is copied in from Tabler, never drawn.                                                                                                                                                                                                                                                                                                                                                                                                              |

Every interactive thing has a visible `:focus-visible` state, a keyboard path, and a 40px target.

## 5. Motion

One controller (`ScrollEffects`) reads every scroll-linked element, then writes — once a frame.
New scroll behaviour is a data attribute on the element, never a second listener.

| Primitive                    | Use it for                                             | Values                                                                                                                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lenis smooth scroll          | the whole page                                         | `duration: 2`, anchors offset −88px                                                                                                                                                                                                                 |
| `BlurText`                   | the page's one headline                                | per character: blur 10px, y 0.28em, 22ms stagger, 1000ms; a newline in the text breaks the line from `sm` up                                                                                                                                        |
| Hero notifications           | one per hero tile, the system behind the concept site  | `rise-in` from 1.9s, 350ms apart, left to right; phones under the site's bar, the desktop tile mid-way along its foot; shown still under reduced motion                                                                                             |
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
  and scaled. Fictional brands, always presented as concept work. Nine: Kora Dental, Saffron &
  Salt, Northfield Homes, Loom & Thread, Brightpath Academy, Ember Roasters, Meridian Legal,
  Fieldnote and Tessel Components — the cast for the home page and the Work gallery. The product
  pages show the reader's own business instead, in the page's accent: "Your Business", and where a
  site is shown, Your Clinic, Your Store, Your Stay and Your Studio.
- **Photography**: real work in natural light — hands, counters, screens, notebooks; Indian
  settings, no visible brand names, never text on a photo, no posed handshakes.

## 7. Accessibility floor

axe finds nothing at 1440, 390 and reduced motion, with the phone menu open. Text contrast 4.5:1
(3:1 for large type and graphics). Menus close on Escape and hand focus back; swapped content
keeps focus on the page; tabs and radio groups take the arrow keys; a skip link leads the page.

## 8. Content rules

- Every price, service, promise and answer comes from the published catalogue. A heading may
  reword; it may not claim more.
- No invented clients, logos, figures, awards or reviews. Concept work says so: every product page
  notes that its screens show sample data with invented names. Figures inside a screen belong to
  the example, never claimed as results. Review samples
  render on the dev server only; a real review needs the client's words and consent to their name.
- No duration the price list does not state, no portal feature the portal does not have
  (platform: `docs/10-public-surface.md` §7, `docs/11-platform-reference.md` §15.7). So the portal
  still lists five things, and the Evolve plans table keeps its eight rows.
- `src/content/catalogue.json` holds catalogue v2 (25 Sep 2026) and is the source of truth until
  the platform's seed and `docs/10-public-surface.md` §7 take the same text. The Connected Website
  (from ₹45,000, 4–6 weeks, three months of Evolve) and the System Blueprint (₹10,000, 1–2 weeks,
  credited in full if the build goes ahead) are the owner's prices, set 25 Sep 2026.
- A page that is not written yet is a coming-soon page, never a dead link: `noindex`, out of the
  sitemap, and saying plainly that the page is on its way while the service is on sale.

## 9. Moving into `apps/web`

1. Tokens and component CSS into `apps/web/src/app/globals.css`; fonts into its `public/fonts`.
2. Every read in `src/content/site.ts` becomes a CMS read. Section headings, the warranty card and
   reviews need a CMS home — a platform change with its rules test, and a `docs/10-public-surface.md`
   §7 update that `scripts/check-cms-seed.mjs` holds the seed to.
3. Anchors become routes: services and solutions have their pages (coming soon for now), and
   "where you are" is already a pathname match for services; when the solutions' bundles get
   pages too, `lib/anchor.ts` retires.
4. `lenis` is the only new runtime dependency — the port decides it.
5. `/lab` stays out of production. The gate runs green before anything merges.
