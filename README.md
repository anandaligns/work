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

| Path                                           | What it is                                                                                                                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/globals.css`                          | Tokens (the brand's Graphite Ink and cool greys, the tints, the type scale) and every CSS-driven motion                                                             |
| `src/content/catalogue.json`                   | Catalogue v2 (25 Sep 2026): service groups, services, solutions, offers, FAQs, home copy. Ahead of the platform's seed until the seed takes the same text           |
| `src/content/site.ts`                          | Typed reads of the catalogue, plus this page's own headings and figures                                                                                             |
| `src/content/pages.ts`                         | Every page beyond home, word for word: the three groups, fifteen services, Evolve and four solutions                                                                |
| `src/content/cases.ts`                         | Case studies for `/work/<slug>` — empty until a client agrees to one                                                                                                |
| `src/components/motion/`                       | Lenis, the blur-in headline, scroll-filled headings, the pixel dissolve, count-ups, the one scroll controller, the logo's quarter-turn and the living brand pattern |
| `src/components/visuals/iso.tsx`               | The isometric drawing kit                                                                                                                                           |
| `src/components/visuals/scenes.tsx`            | Every illustration, composed from the kit                                                                                                                           |
| `src/components/visuals/page-scenes.tsx`       | Each page's hero scene, planned from the kit (bounds worked out, no hand-set viewBox)                                                                               |
| `src/components/visuals/connect-scene.tsx`     | The closing picture on every page but About: subject → the P cube → result                                                                                          |
| `src/components/visuals/concept-sites.tsx`     | The concept websites in the hero and the gallery                                                                                                                    |
| `src/components/ui/brand.tsx`                  | The mark from the identity's own geometry: symbol, lockup, wordmark                                                                                                 |
| `src/components/layout/`                       | Header (Apple-style bar and flyouts), footer, framed band                                                                                                           |
| `src/components/home/`                         | The home page's sections                                                                                                                                            |
| `src/components/pages/`                        | What the other pages are built from: the page intro, card bands, sections, price cards, the flow strip, the policy page                                             |
| `src/components/contact/`                      | The enquiry form, what happens next, and the thanks heading                                                                                                         |
| `src/components/seo/`                          | JSON-LD: home (business, website, all 31 answers) and every service and solution page (Service, BreadcrumbList, FAQPage)                                            |
| `src/app/services/[slug]`, `solutions/[slug]`  | Every service group, service, Evolve and solution, live and indexed, each with its own share image                                                                  |
| `src/app/api/enquiry`, `contact/thanks`        | Where the form sends (checked again, honeypot, rate limit, passed to `LEAD_WEBHOOK_URL`) and where it lands (`noindex`)                                             |
| `src/app/about`, `contact`, `privacy`, `terms` | The company pages; `not-found.tsx` is the 404                                                                                                                       |
| `src/app/sitemap.ts`, `robots.ts`              | The sitemap (live pages only) and robots rules (`/lab` kept out)                                                                                                    |

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
