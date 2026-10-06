# Pixel Kinetix — UI front end

This repository is only the UI front end of Pixel Kinetix: the public website's pages, design,
content and motion, built with Next.js. There is no back end here — no database, dashboard or
automation. The one server route, the enquiry form's, passes each lead on to an automation that
lives elsewhere (see [The enquiry form](#the-enquiry-form)).

## Run

Docker only. Node is never installed on the host; `node_modules` lives in a named volume.

```sh
docker compose up
```

Open <http://localhost:3000>. `/lab` shows every illustration side by side.

```sh
docker compose exec web npx tsc --noEmit      # typecheck
docker compose exec web npm run build         # production build
docker compose down                           # stop
```

## What is where

| Path                                           | What it is                                                                                                                                                                                                        |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/globals.css`                          | Tokens (the brand's Graphite Ink, Kinetic Orange and cool greys, the tints, the type scale, beUI's shadcn names) and every CSS-driven motion                                                    |
| `src/content/catalogue.json`                   | Catalogue v2 (25 Sep 2026): service groups, services, solutions, offers, FAQs, home copy. Ahead of the platform's seed until the seed takes the same text                                                         |
| `src/content/site.ts`                          | Typed reads of the catalogue, plus this page's own headings and figures                                                                                                                                           |
| `src/content/pages.ts`                         | The three group pages in full; for the services, Evolve and the solutions, their titles, descriptions, opening lines and closings                                                                                 |
| `src/content/products/`                        | One file per service, solution and Evolve: the product page's words, accent, example business and screens, and its FAQPage answers (`kit.ts` holds the shorthands)                                                |
| `src/content/lab/`                             | Each solution page’s own words (`solutions.ts`): its colour, opening tasks, the system behind it, its story, how it works and what changes                                                                        |
| `src/components/solutions/`                    | The solution page (`solution-page.tsx`) and its parts: the split section after Lightfield (`showcase.tsx`), the story and the ways in                                                                             |
| `src/components/lab/`                          | The mockups drawn in the light kit and the window kit, by page (`service-mocks.tsx`, `solution-mocks.tsx`)                                                                                                        |
| `src/content/cases.ts`                         | Case studies for `/work/<slug>` — empty until a client agrees to one                                                                                                                                              |
| `src/components/motion/`                       | The blur-in headline, scroll-filled headings, the pixel dissolve, the one scroll controller, the logo's quarter-turn and the living brand pattern, beside beUI's components (see [beUI](#beui))                |
| `src/components/visuals/iso.tsx`               | The isometric drawing kit                                                                                                                                                                                         |
| `src/components/visuals/scenes.tsx`            | Every illustration, composed from the kit                                                                                                                                                                         |
| `src/components/visuals/page-scenes.tsx`       | Each page's hero scene, planned from the kit (bounds worked out, no hand-set viewBox)                                                                                                                             |
| `src/components/visuals/connect-scene.tsx`     | The closing picture on every page but About: subject → the P cube → result                                                                                                                                        |
| `src/components/visuals/concept-sites.tsx`     | The concept websites in the hero and the gallery                                                                                                                                                                  |
| `src/components/screens/`                      | The product screens, drawn in HTML and CSS from data: iPhones and MacBooks, desktop software built from blocks (`desk-blocks.tsx`), phone apps built from blocks (`phone-screen.tsx`), WhatsApp, product pictures |
| `src/components/pages/product.tsx`             | The product page: its opening and product panel, highlights, feature bento, spec sheet, packages, why band, notes; shared parts in `product-parts.tsx`                                                            |
| `src/components/ui/brand.tsx`                  | The mark from the identity's own geometry: symbol, lockup, wordmark                                                                                                                                               |
| `src/components/layout/`                       | Header (Apple-style bar and flyouts), footer, framed band                                                                                                                                                         |
| `src/components/home/`                         | The home page's sections                                                                                                                                                                                          |
| `src/components/pages/`                        | What the other pages are built from: the page intro, card bands, sections, price cards, the flow strip, the policy page                                                                                           |
| `src/components/contact/`                      | The enquiry form, what happens next, and the thanks heading                                                                                                                                                       |
| `src/components/seo/`                          | JSON-LD: home (business, website, all 31 answers), every service and solution page (Service, BreadcrumbList, FAQPage), and the indexes, About, Contact and policies (`web-page-data.tsx`)                         |
| `src/app/services/[slug]`, `solutions/[slug]`  | Every service group, service, Evolve and solution, live and indexed, each with its own share image                                                                                                                |
| `src/app/api/enquiry`, `contact/thanks`        | Where the form sends (checked again, honeypot, rate limit, passed to `LEAD_WEBHOOK_URL`) and where it lands (`noindex`)                                                                                           |
| `src/app/about`, `contact`, `privacy`, `terms` | The company pages; `not-found.tsx` is the 404                                                                                                                                                                     |
| `src/app/sitemap.ts`, `robots.ts`, `llms.txt/` | The sitemap (live pages only), robots rules (search and AI crawlers welcome, `/lab` and `/api/` kept out) and `/llms.txt` for answer engines. All use `SITE_URL`, set per build by `NEXT_PUBLIC_SITE_URL`       |

What's left before the move to pixelkinetix.com — server, search, content and open decisions — is
in [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md).

## Photos and statements

The service and solution pages wait for one photograph each: a dark background for the product
panel (their point of view is drawn — an isometric scene per page, `visuals/iso-views.tsx`). [IMAGE-PROMPTS.md](IMAGE-PROMPTS.md) lists all forty: file names,
alt text and a prompt for each, in each page's own colour. They go in `public/photos/` as
`<name>-800` and `<name>-1600`, in AVIF and WebP; until one is there, the panel shows its dark
gradient and the point of view a tinted placeholder.

[STATEMENTS.md](STATEMENTS.md) gathers every line written for the twenty pages — search titles,
openings, taglines, statements, figures, feature titles, headings and closings — with the file
each lives in, for review.

## 25 Sep 2026 — the repositioning

The site now sells one connected system — websites, business software and automation, improved
every month — in the same theme, with every section and motion kept. What changed, line by line,
is in [`COPY.md`](COPY.md); the why is FOUNDATION.md v2.4.

Before it goes live:

1. `npm install`, then `npm run typecheck` and `npm run build` (in Docker as above, or locally).
2. `npm run format` to set the new files in the house style.
3. Fill in, when ready: the founder's bio and photo on `/about`, the LinkedIn address in
   `socials`, the office street and PIN in `contact.address` (structured data leaves them out
   until then), and the company's legal name once Superkernel Technologies Private Limited is
   incorporated.
4. Have `/privacy` and `/terms` read by a lawyer, and update `/privacy` before an enquiry form or
   analytics is added.

## beUI

The components come from [beUI](https://beui.dev), copied in as source through the shadcn
registry. `components.json` registers the `@beui` namespace, so on a machine that can reach
beui.dev:

```sh
npx shadcn@latest add @beui/breadcrumb
pnpm dlx shadcn@latest add @beui/expandable-control
```

The files are kept exactly as beUI ships them (and out of Prettier, see `.prettierignore`), so
running the same command again updates them in place.

| beUI component       | Where the site uses it                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `tabs`               | Pricing's Build · Evolve plans and the comparisons (`ui/segmented.tsx`), the FAQ rail, the solution engine |
| `collapsible`        | Every FAQ (`home/faq.tsx`), the home Solutions list, the phone menu's Services and Solutions                |
| `breadcrumb`         | Every inner page's opening (`pages/page-trail.tsx`)                                                          |
| `expandable-control` | The contact page's copy chips (`contact/copy-chips.tsx`)                                                     |
| `switch`             | Evolve's yearly billing in Pricing                                                                           |
| `select`, `checkbox`, `alert`, `button` | The enquiry form: its three choices, the consent box, the send failure, the stateful Send |
| `number-ticker`      | The home figures                                                                                             |
| `marquee`            | The sector rows, a service page's tool rows and logo strip, the Work gallery                                 |
| `smooth-scroll`, `scroll-to` | Lenis on every page (`app/layout.tsx`, with `motion/scroll-bridge.tsx`), the footer's Back to top    |
| shared               | `lib/utils.ts` (`cn`), `lib/ease.ts` (every `RollLink` presses on its `SPRING_PRESS`), `lib/hooks/use-hover-capable.ts`, `lib/presence-gate.tsx` |

Their sources are in `src/components/motion/` beside the site's own motion. One local change:
`tabs.tsx` line 202 has a `!` that this repository's stricter TypeScript (`noUncheckedIndexedAccess`)
needs; put it back after updating that file.

beUI is written in shadcn's token names (`background`, `foreground`, `muted`, `border`, `ring`,
`primary` …). `globals.css` maps each onto the brand's own token, so a newly added component
takes the brand's colours without editing it. beUI's AI-agent guide is at
<https://beui.dev/docs/ai-agents>; its MCP server is `https://mcp.beui.dev/mcp`.

## The enquiry form

The contact page's form shows only once it has somewhere to send to. Set, where the site is hosted:

- `LEAD_WEBHOOK_URL` — the automation that saves each lead to the dashboard, replies on WhatsApp
  and email, and alerts the team. The form posts its lead there as JSON.
- `LEAD_WEBHOOK_SECRET` (optional) — sent with it as a bearer token.

With neither, a production build leaves the form off and keeps "Your first message"; the dev server
shows the form and logs each lead instead. When the automation really replies to the visitor, set
`ENQUIRY_AUTOMATION_LIVE` in `src/lib/enquiry.ts` to `true`: the thanks page then says a copy is on
its way, and the contact page shows its "runs on our own Connected Website" caption.

## The foundation

The design system — tokens, layout, components and their states, every motion primitive with its
values, the accessibility floor and the content rules — is locked in [`FOUNDATION.md`](FOUNDATION.md).
New pages are built from it; changes to it are deliberate and versioned.

## Honesty rules this build keeps

- Every price, service, promise and answer is the published catalogue (`catalogue.json`).
- The concept websites are invented brands and are labelled as concepts wherever they appear.
- No figure is a count of clients or projects; the four numbers are on the price list.
- No request leaves the site's origin: fonts are self-hosted and every picture is drawn.
