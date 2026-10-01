import type { CSSProperties } from 'react';

import { hero, START } from '@/content/site';

import { BlurText } from '../motion/blur-text';
import { Pausable } from '../motion/pause-toggle';
import { ModuleField } from '../motion/module-field';
import { productFor } from '@/content/products';

import { DeskView, isDesk } from '../screens/desk-views';
import { ScreenView } from '../screens/screen';
import type { Screen } from '../screens/types';
import { wash } from './wash';
import { RollLink } from '../ui/roll-link';

/**
 * The hero: aoutive's opening — a headline that resolves out of blur a letter at a time, on the
 * brand's own pattern come to life — over codify's row of five tiles, at codify's sizes, whose
 * centre tile opens from 315 to 960 pixels over the first 500 pixels of scroll.
 *
 * The tiles are the products themselves, as their service pages show them, each on one of the
 * home page's tints: a WhatsApp chat, a room booked, the enquiries dashboard in the centre, a
 * store's product and an ordering app. The row is laid out fully open and closed with a clip and a
 * translate (see `.hero-row` in globals.css), so opening it moves nothing else on the page; the
 * pictures move with it — the phones rise, and the centre's phone widens into a MacBook.
 *
 * Each tile carries a notification from the system behind it, arriving one after another once
 * the row has risen. The screens are the product pages' own invented sample businesses.
 */
/** A product's front screens and its colour, from its own page. */
const front = (slug: string, i = 0) => {
  const page = productFor(slug)!;
  return { screen: page.stage?.front?.[i]!, accent: page.accent };
};

/** `lift` is how far down the tile its phone starts: the row's phones step up to the centre. */
type Tile = { id: string; tint: number; screen: Screen; accent: string; lift: number };

/** The four phone tiles, left to right, each on its own tint. */
const PHONES: Tile[] = [
  { id: 'chat', tint: 0, lift: 70, ...front('whatsapp-automation') },
  { id: 'booking', tint: 1, lift: 42, ...front('booking-payment-workflows') },
  { id: 'store', tint: 3, lift: 42, ...front('e-commerce-stores') },
  { id: 'app', tint: 4, lift: 70, ...front('mobile-apps') },
];

/** The centre tile: the enquiries dashboard, and the alert on the team's phone. */
const LEADS = productFor('never-miss-a-lead')!;
const DASHBOARD = LEADS.stage?.back!;
const ALERT = LEADS.stage?.front?.[1]!;

const TOASTS: Record<string, { title: string; detail: string }> = {
  chat: { title: 'Booked on WhatsApp', detail: 'Tomorrow, 7:00 pm' },
  booking: { title: 'Slot booked', detail: 'Deposit paid' },
  leads: { title: 'New enquiry answered', detail: 'Lead added to the dashboard' },
  store: { title: 'Order paid', detail: 'Stock updated' },
  app: { title: 'New order from the app', detail: 'Sent to the kitchen' },
};
/** Left to right across the row, the order the notifications arrive in. */
const TOAST_ORDER = ['chat', 'booking', 'leads', 'store', 'app'];

/**
 * A phone tile: the product's own screen on its tint, the phone rising from the tile's foot and
 * cut by it, as the service pages draw them. It rises a little further as the row opens.
 */
function PhoneTile({ tile, className = '' }: { tile: Tile; className?: string }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-[14px] ring-1 ring-black/5 ${className}`}
      style={wash(tile.tint, true)}
    >
      <div
        className="hero-phone absolute left-1/2 -ml-[135px] w-[270px]"
        style={{ top: tile.lift }}
      >
        <div className="origin-top scale-[0.58]">
          <ScreenView screen={tile.screen} size="lg" accent={tile.accent} />
        </div>
      </div>
    </div>
  );
}

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
      <div className="pointer-events-none absolute inset-x-0 top-[3.4375rem] hidden h-[46rem] md:block">
        <Pausable
          label="the moving pattern"
          className="module-field h-full"
          buttonClassName="pointer-events-auto top-4 left-5"
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
          designs drifting past at full size instead, each with its notification. */}
      <div
        aria-hidden="true"
        className="rise-in marquee mt-12 pb-10 md:hidden"
        style={{ ['--d' as string]: 950, ['--marquee-duration' as string]: '36s' }}
      >
        <div className="marquee__track gap-4 pr-4">
          {[...PHONES, ...PHONES].map((tile, i) => (
            <div key={`${tile.id}-${i}`} className="relative h-[360px] w-[209px] shrink-0">
              <PhoneTile tile={tile} />
              <Toast id={tile.id} />
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="rise-in relative mt-12 hidden justify-center overflow-hidden pb-10 sm:mt-14 md:flex"
        style={{ ['--d' as string]: 950 }}
      >
        <ul id="hero-row" className="hero-row flex shrink-0 items-stretch gap-4">
          {PHONES.slice(0, 2).map((tile) => (
            <li key={tile.id} className="hero-tile-before relative h-[360px] w-[209px] shrink-0">
              <PhoneTile tile={tile} className="shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)]" />
              <Toast id={tile.id} />
            </li>
          ))}
          <li className="hero-tile-centre relative h-[360px] w-[960px] shrink-0">
            {/* One device that changes with the row: shut, it is a phone showing the alert on the
                team's phone; as the row opens, its bezel widens into a MacBook's screen, the phone's
                screen gives way to the dashboard the alert came from — which never moves — and
                the base rises under it. */}
            <div
              className="hero-tile-centre__screen relative h-full w-full overflow-hidden rounded-[14px] ring-1 ring-black/5"
              style={wash(2)}
            >
              <div className="hero-device absolute top-[7px] left-[480px] h-[335px] bg-[#05060a] shadow-[0_30px_60px_-28px_rgb(11_13_18/0.5)] ring-1 ring-black/40">
                <span className="hero-device__camera absolute top-[4px] left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-[#2a2c33]" />
              </div>
              {isDesk(DASHBOARD) ? (
                <div
                  className="hero-dash absolute top-[18px] left-[230px] overflow-hidden"
                  style={{ '--accent': LEADS.accent } as CSSProperties}
                >
                  <DeskView screen={DASHBOARD} frame="row" />
                </div>
              ) : null}
              {/* The phone itself, as the other tiles draw theirs — its body the frame's exact
                  size (270 × 570 at 0.5877 is 158.7 × 335), so as it fades the frame under it
                  carries on as its bezel. */}
              <div className="hero-mobile absolute top-[7px] left-[480px] -ml-[135px] w-[270px]">
                <div className="origin-top scale-[0.5877]">
                  <ScreenView screen={ALERT} size="lg" accent={LEADS.accent} />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="hero-mac-base absolute top-[340px] left-[160px] h-[16px] w-[640px] rounded-b-[14px] bg-[linear-gradient(180deg,#4a4e57_0%,#2a2d34_45%,#15171c_100%)] shadow-[0_18px_30px_-14px_rgb(11_13_18/0.55)] ring-1 ring-black/40"
              >
                <span className="absolute top-0 left-1/2 h-[6px] w-[110px] -translate-x-1/2 rounded-b-[8px] bg-[#0b0c10]" />
              </div>
            </div>
            <Toast id="leads" centre />
          </li>
          {PHONES.slice(2).map((tile) => (
            <li key={tile.id} className="hero-tile-after relative h-[360px] w-[209px] shrink-0">
              <PhoneTile tile={tile} className="shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)]" />
              <Toast id={tile.id} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
