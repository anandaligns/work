import { hero, START } from '@/content/site';

import { BlurText } from '../motion/blur-text';
import { Pausable } from '../motion/pause-toggle';
import { ModuleField } from '../motion/module-field';
import { BRANDS, DesktopSite, MobileSite, Scaled } from '../visuals/concept-sites';
import { RollLink } from '../ui/roll-link';

/**
 * The hero: aoutive's opening — a headline that resolves out of blur a letter at a time, on the
 * brand's own pattern come to life — over codify's row of five tiles, at codify's sizes, whose
 * centre tile opens from 315 to 960 pixels over the first 500 pixels of scroll.
 *
 * The tiles are concept sites at full design size, scaled into their frames: four phones and one
 * desktop. The row is laid out fully open and closed with a clip and a translate (see
 * `.hero-row` in globals.css), so opening it moves nothing else on the page.
 *
 * Each tile carries a notification from the system behind the site — the enquiry answered, the
 * table booked, the order paid — arriving one after another once the row has risen. They say
 * what happens, never how many or how fast: these are concept businesses, with no numbers to show.
 */
const PHONES = [BRANDS.kora!, BRANDS.saffron!, BRANDS.loom!, BRANDS.brightpath!];

const TOASTS: Record<string, { title: string; detail: string }> = {
  kora: { title: 'New enquiry', detail: 'WhatsApp reply sent' },
  saffron: { title: 'Table for 4 booked', detail: 'Reminder set' },
  northfield: { title: 'Site visit booked', detail: 'Lead added to the dashboard' },
  loom: { title: 'Order paid', detail: 'Stock updated' },
  brightpath: { title: 'Demo class booked', detail: 'Parent notified' },
};
/** Left to right across the row, the order the notifications arrive in. */
const TOAST_ORDER = ['kora', 'saffron', 'northfield', 'loom', 'brightpath'];

function Toast({ id, centre = false }: { id: string; centre?: boolean }) {
  const toast = TOASTS[id];
  if (!toast) return null;
  return (
    <span
      className={`hero-toast rise-in${centre ? ' hero-toast--centre' : ''}`}
      style={{ ['--d' as string]: 1900 + TOAST_ORDER.indexOf(id) * 350 }}
    >
      <span className="hero-toast__dot" />
      <span>
        <span className="hero-toast__title">{toast.title}</span>
        <span className="hero-toast__detail">{toast.detail}</span>
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* The identity's two modules — the pixel and the quarter-turn — tiling the sides, tone on
          tone, and turning with the logo's own motion. Wide screens only — on a phone the words
          fill the width. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[46rem] md:block">
        <Pausable
          label="the moving pattern"
          className="module-field h-full"
          buttonClassName="pointer-events-auto top-[4.25rem] left-5"
        >
          <ModuleField />
        </Pausable>
      </div>
      <div className="container-fluid relative">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="eyebrow blur-char inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5"
            style={{ ['--d' as string]: 0 }}
          >
            <span className="size-1.5 rounded-full bg-signal-green" />
            {/* On a phone the chip keeps to one line. */}
            <span>
              Websites · Software · Automation
              <span className="max-sm:hidden"> · Bangalore</span>
            </span>
          </p>
          <h1
            id="hero-heading"
            className="mt-6 text-display tracking-[var(--tracking-display)] text-ink"
          >
            <BlurText text={hero.lines} delay={120} />
          </h1>
          <p
            className="rise-in mx-auto mt-5 max-w-xl text-lead text-ink-2"
            style={{ ['--d' as string]: 680 }}
          >
            {hero.body}
          </p>
          <div
            className="rise-in mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ ['--d' as string]: 820 }}
          >
            {/* The hero keeps "Start a Project"; everywhere else the same link reads "Get Started". */}
            <RollLink href={START.href} size="lg">
              Start a Project
            </RollLink>
            <RollLink href="/#pricing" variant="line" size="lg">
              See plans and prices
            </RollLink>
          </div>
        </div>
      </div>

      {/* Below 768px the codify row would show a slice of one tile; a phone gets the four phone
          designs drifting past at full size instead. */}
      <div
        aria-hidden="true"
        className="rise-in marquee mt-12 pb-4 md:hidden"
        style={{ ['--d' as string]: 950, ['--marquee-duration' as string]: '36s' }}
      >
        <div className="marquee__track gap-4 pr-4">
          {[...PHONES, ...PHONES].map((b, i) => (
            <Scaled
              key={`${b.id}-${i}`}
              k="0.5359"
              className="h-[360px] w-[209px] shrink-0 rounded-[14px] ring-1 ring-black/5"
            >
              <MobileSite b={b} />
            </Scaled>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="rise-in relative mt-12 hidden justify-center overflow-hidden pb-4 sm:mt-14 md:flex"
        style={{ ['--d' as string]: 950 }}
      >
        <ul id="hero-row" className="hero-row flex shrink-0 items-stretch gap-4">
          {[PHONES[0]!, PHONES[1]!].map((b) => (
            <li key={b.id} className="hero-tile-before relative h-[360px] w-[209px] shrink-0">
              <Scaled
                k="0.5359"
                className="h-full w-full rounded-[14px] ring-1 ring-black/5 shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)]"
              >
                <MobileSite b={b} />
              </Scaled>
              <Toast id={b.id} />
            </li>
          ))}
          <li className="hero-tile-centre relative h-[360px] w-[960px] shrink-0">
            <Scaled k="0.75" className="h-full w-full rounded-[14px] ring-1 ring-black/5">
              <DesktopSite b={BRANDS.northfield!} height={480} variant="poster" />
            </Scaled>
            <Toast id="northfield" centre />
          </li>
          {[PHONES[2]!, PHONES[3]!].map((b) => (
            <li key={b.id} className="hero-tile-after relative h-[360px] w-[209px] shrink-0">
              <Scaled
                k="0.5359"
                className="h-full w-full rounded-[14px] ring-1 ring-black/5 shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)]"
              >
                <MobileSite b={b} />
              </Scaled>
              <Toast id={b.id} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
