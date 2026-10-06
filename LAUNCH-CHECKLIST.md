# Launch checklist — liquidglass → pixelkinetix.com

Checkpoints left open on 6 Oct 2026, after the SEO, speed and content pass. The staging copy runs
at <https://liquidglass.pixelkinetix.com> (server `digitalphymedia-prod`, `/srv/sites/pixel-kinetix-ui`,
image `pixel-kinetix-ui:20261006-2283059-seo`; the previous tag is in `.env.prev` for rollback).
Tick each one off as it is done.

## Server

- [ ] **Turn on HTTP/2 for the sites on port 443.** Lighthouse estimates ~0.8 s saved on a phone.
      The server runs nginx 1.24, where HTTP/2 is set on the shared `listen` line, so it switches
      on for every site on 443 at once (digitalphymedia.com, academy, astrosai2, dev, liquidglass).
      It is a standard, safe change, but it touches the production sites, so do it in a quiet hour:
      in each file in `/etc/nginx/sites-enabled/`, change `listen 443 ssl;` to
      `listen 443 ssl http2;` and `listen [::]:443 ssl;` to `listen [::]:443 ssl http2;`, then
      `sudo nginx -t && sudo systemctl reload nginx`, and check every site loads.
      (On nginx 1.25.1+ it is `http2 on;` inside one server block instead.)
- [ ] **Enquiry form:** set `LEAD_WEBHOOK_URL` (and optionally `LEAD_WEBHOOK_SECRET`) in the
      server's `docker-compose.yml` environment. Until then the contact page shows "Your first
      message" instead of the form.

## Moving to pixelkinetix.com

- [ ] **Rebuild without the staging address.** The liquidglass image is built with
      `--build-arg NEXT_PUBLIC_SITE_URL=https://liquidglass.pixelkinetix.com`, so its canonicals,
      sitemap, robots and structured data point at liquidglass. Build the live image with no
      build arg, and it points at `https://pixelkinetix.com`.
- [ ] **Stop liquidglass competing with the live site.** Once pixelkinetix.com is up, either
      301-redirect liquidglass to it, or rebuild liquidglass with a `noindex` robots header, so
      search engines don't keep two copies.
- [ ] **Search consoles:** add pixelkinetix.com to Google Search Console and Bing Webmaster
      Tools, submit `/sitemap.xml`, and request indexing of the home, services and solutions pages.
- [ ] **PageSpeed Insights** on the live domain (the free API quota was used up during the
      audit). Last local Lighthouse (mobile): home ~80, service and solution pages ~90; desktop
      home 99; SEO 100 everywhere.

## Decisions waiting on you

- [ ] **Evolve vs Website Care & Hosting.** Evolve is a care plan, not a service, and
      `/services/evolve` and `/solutions/website-care-hosting` both aim at "website hosting and
      maintenance" searches. Their titles now split the work (plans and prices vs the service),
      but one page would be stronger: fold Evolve's plans into Website Care & Hosting and drop
      `/services/evolve` (the site isn't launched, so no redirect is needed).
- [ ] **The phone "Get Started" side tab** sits halfway down the right edge on every page and
      covers the ends of the hero's lines on a phone. Options: show it only after the hero has
      scrolled away (the hero has its own button), or move it to the bottom bar.
- [ ] **Test and snapshot pages** — `/solutions/never-miss-a-lead-v1`, `-v2`, `-test`,
      `/solutions/sell-and-book-online-test`, `/services/whatsapp-automation-test`,
      `/services/booking-salon-test`. They are `noindex` and out of the sitemap; delete them before
      launch.
- [ ] **Renames still on the table** (only the solutions were renamed): "CRM-Connected Systems" →
      "CRM Systems", "Admin Panels & Internal Tools" → "Internal Tools", "AI Workflows & Insights"
      → "AI Document Automation", "Business Platforms & SaaS" → "SaaS & Platforms", and the groups
      "Digital Experiences" → "Websites & Apps", "Business Systems" → "Business Software".

## Content still to supply

- [ ] The founder's bio and photo on `/about`; the LinkedIn address in `socials`; the office
      street and PIN in `contact.address` (structured data leaves them out until then); the legal
      name once the company is incorporated.
- [ ] Real proof: a first case study for `/work/<slug>` and real reviews, once clients agree. The
      site has no client logos, counts or named results yet — the biggest gap in trust.
- [ ] The product panel's dark background photos ([IMAGE-PROMPTS.md](IMAGE-PROMPTS.md)). The
      point-of-view photos are no longer needed: each page now has its five fanned screens.
- [ ] `/privacy` and `/terms` read by a lawyer, and `/privacy` updated before the form or
      analytics goes live.
