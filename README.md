# Pixel Kinetix — UI front end

This repository is only the UI front end of Pixel Kinetix: the public website's pages, design,
content and motion, built with Next.js. There is no back end here.

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

| Path                                       | What it is                                                                                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/globals.css`                      | Tokens (the brand's Graphite Ink and cool greys, the tints, the type scale) and every CSS-driven motion                                                             |
| `src/content/catalogue.json`               | The platform's seed, verbatim: services, solutions, offers, FAQs, home copy                                                                                         |
| `src/content/site.ts`                      | Typed reads of the catalogue, plus this page's own headings and figures                                                                                             |
| `src/components/motion/`                   | Lenis, the blur-in headline, scroll-filled headings, the pixel dissolve, count-ups, the one scroll controller, the logo's quarter-turn and the living brand pattern |
| `src/components/visuals/iso.tsx`           | The isometric drawing kit                                                                                                                                           |
| `src/components/visuals/scenes.tsx`        | Every illustration, composed from the kit                                                                                                                           |
| `src/components/visuals/concept-sites.tsx` | The concept websites in the hero and the gallery                                                                                                                    |
| `src/components/ui/brand.tsx`              | The mark from the identity's own geometry: symbol, lockup, wordmark                                                                                                 |
| `src/components/layout/`                   | Header (Apple-style bar and flyouts), footer, framed band                                                                                                           |
| `src/components/home/`                     | The page's sections                                                                                                                                                 |

## The foundation

The design system — tokens, layout, components and their states, every motion primitive with its
values, the accessibility floor and the content rules — is locked in [`FOUNDATION.md`](FOUNDATION.md).
New pages are built from it; changes to it are deliberate and versioned.

## Honesty rules this build keeps

- Every price, service, promise and answer is the platform's published catalogue.
- The concept websites are invented brands and are labelled as concepts wherever they appear.
- No figure is a count of clients or projects; the four numbers are on the price list.
- No request leaves the site's origin: fonts are self-hosted and every picture is drawn.
