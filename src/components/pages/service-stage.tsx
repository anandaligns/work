import type { ReactNode } from 'react';

import { startFor, whatsappAbout } from '@/content/site';

import { Fit } from '../lab/fit';
import { Icon } from '../ui/icon';
import { RollLink } from '../ui/roll-link';
import { BRANDS, DesktopSite, MobileSite, Scaled } from '../visuals/concept-sites';

/**
 * A service page's opening under trial, laid out as the Never Miss a Lead v2 page opens: one
 * screen tall on white, the words on the left — the service's group on a green dot, its name, a
 * line and two actions — and the picture on the right,
 * from just past a third of the way across to the screen's edge. The picture is Coderhouse's live
 * class made ours: an example business's website on a graphite laptop and on an iPhone in Safari,
 * and six white cards in a row along the foot — the moments the service makes, where Coderhouse
 * has its students' faces. Nothing on it moves.
 *
 * Below 1024px the words come first and the picture under them. It is drawn on a fixed canvas and
 * scaled to its frame (`Fit`), and repeats what the page says in words, so it is hidden from
 * assistive tech.
 */

/** A moment the service makes: a mark, a label, a figure or a phrase, and a line under it. */
export type StageCard = { lead: ReactNode; label: string; value: string; line: string };

export type ServiceStageProps = {
  /** The example business whose website the devices show. */
  brand: string;
  /** The stage's one colour, top to bottom: a pale step of the page's own. */
  ground: string;
  /** Six, in a row under the devices from 1024px, three across below it. */
  cards: StageCard[];
};

/** A graphite laptop with the website on its 16:10 screen. */
function Laptop({ brand }: { brand: string }) {
  const b = BRANDS[brand]!;
  return (
    <div className="relative">
      <div className="rounded-t-[16px] bg-[#0b0c10] p-[9px] pb-[12px] shadow-[0_40px_80px_-30px_rgb(11_13_18/0.5)] ring-1 ring-black/40">
        <span className="absolute top-[4px] left-1/2 size-[4px] -translate-x-1/2 rounded-full bg-[#2a2d34]" />
        <div className="overflow-hidden rounded-[4px] bg-white">
          <Scaled className="h-[300px] w-[480px] [--k:0.375]">
            <DesktopSite b={b} />
          </Scaled>
        </div>
      </div>
      <div className="relative -mx-[34px] h-[14px] rounded-b-[14px] bg-[linear-gradient(180deg,#4a4e57_0%,#2a2d34_45%,#15171c_100%)] shadow-[0_18px_30px_-14px_rgb(11_13_18/0.5)]">
        <span className="absolute top-0 left-1/2 h-[5px] w-[74px] -translate-x-1/2 rounded-b-[6px] bg-[#0b0c10]" />
      </div>
    </div>
  );
}

/**
 * An iPhone as it is: a 393 × 852 screen (drawn at 390 wide) in a black body 2.06 times as tall
 * as it is wide, the Dynamic Island at the top — the site open in Safari between the status bar
 * and the address bar.
 */
function Phone({ brand }: { brand: string }) {
  const b = BRANDS[brand]!;
  const host = `${b.name.toLowerCase().replace(/[^a-z]+/g, '')}.in`;
  return (
    <div className="relative w-[172px] rounded-[30px] bg-[#0b0c10] p-[6px] shadow-[0_30px_60px_-24px_rgb(11_13_18/0.55)] ring-1 ring-black/50">
      <div
        className="relative h-[349px] overflow-hidden rounded-[24px]"
        style={{ background: b.bg }}
      >
        <Scaled className="h-[349px] w-[160px] [--k:0.41]">
          <div style={{ width: 390, height: 852, background: b.bg }}>
            <div
              className="flex items-center justify-between px-[34px] font-semibold"
              style={{ height: 54, fontSize: 17, color: b.ink }}
            >
              <span>9:41</span>
              <span className="flex items-center gap-[6px]">
                <span className="flex items-end gap-[2px]">
                  {[6, 9, 12, 15].map((h) => (
                    <span
                      key={h}
                      className="w-[3.5px] rounded-[1px]"
                      style={{ height: h, background: b.ink }}
                    />
                  ))}
                </span>
                <span
                  className="ml-[4px] h-[13px] w-[26px] rounded-[4px] border-[1.5px] p-[1.5px]"
                  style={{ borderColor: b.ink }}
                >
                  <span className="block size-full rounded-[2px]" style={{ background: b.ink }} />
                </span>
              </span>
            </div>
            <MobileSite b={b} />
            <div
              className="flex flex-col items-center gap-[14px] border-t border-black/[0.06] bg-white/90 pt-[14px]"
              style={{ height: 126 }}
            >
              <span className="flex h-[44px] w-[350px] items-center justify-center gap-[8px] rounded-[14px] bg-[#eef0f3] text-[16px] text-[#3c4049]">
                <Icon name="lock" size={14} strokeWidth={2.2} />
                {host}
              </span>
              <span className="h-[5px] w-[134px] rounded-full bg-black/80" />
            </div>
          </div>
        </Scaled>
      </div>
      <span className="absolute top-[11px] left-1/2 h-[15px] w-[52px] -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
}

const DOTS =
  'pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(11_13_18/0.07)_1px,transparent_1px)] [background-size:18px_18px]';

/** One moment, as a white square card, drawn at 120 × 120. */
function MomentCard({ card }: { card: StageCard }) {
  return (
    <div className="flex size-[120px] flex-col justify-between rounded-[16px] bg-white p-3 text-ink shadow-[0_1px_2px_rgb(11_13_18/0.04),0_18px_36px_-16px_rgb(11_13_18/0.3)] ring-1 ring-black/[0.05]">
      {card.lead}
      <span className="min-w-0">
        <span className="block truncate text-[9.5px] text-ink-3">{card.label}</span>
        <span className="mt-1 block truncate text-[16px] leading-none font-semibold">
          {card.value}
        </span>
        <span className="mt-1 block truncate text-[9.5px] text-ink-3">{card.line}</span>
      </span>
    </div>
  );
}

/*
 * The devices as one group, in their own units: the laptop's screen 498 wide with its base 34
 * past each side, the iPhone 172 × 361 standing 52 over the laptop's right edge and 8 lower —
 * 652 × 361 in all. The group is drawn at `S` times that, as wide as the canvas allows.
 */
const GROUP = { w: 652, h: 361, base: 34, phoneX: 446, phoneY: -18 };
const S = 1.288;
const EDGE = 20;
const CARD = 120;
/** The cards' row, along the canvas's foot, spread across the group's width. */
const ROW_Y = 740 - 24 - CARD;
const ROW_GAP = (GROUP.w * S - 6 * CARD) / 5;
/** The group, centred in the space above the row. */
const TOP = 24 + (ROW_Y - 28 - 24 - GROUP.h * S) / 2;

/** The laptop and the iPhone, placed from the group's corner at scale `k`. */
function Devices({ brand, x, y, k }: { brand: string; x: number; y: number; k: number }) {
  return (
    <>
      <div
        className="absolute origin-top-left"
        style={{ left: x + GROUP.base * k, top: y - GROUP.phoneY * k, transform: `scale(${k})` }}
      >
        <Laptop brand={brand} />
      </div>
      <div
        className="absolute origin-top-left"
        style={{ left: x + (GROUP.base + GROUP.phoneX) * k, top: y, transform: `scale(${k})` }}
      >
        <Phone brand={brand} />
      </div>
    </>
  );
}

/**
 * The picture. From 1024px, one 880 × 740 canvas: the laptop and the iPhone as large as its width
 * allows, and the six cards in a row along the foot, clear of them. Below it, the devices on their
 * own canvas and the cards under them, three across.
 */
function Stage({ brand, ground, cards }: ServiceStageProps) {
  const six = cards.slice(0, 6);
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-[20px] ring-1 ring-black/[0.05] lg:size-full lg:rounded-none lg:rounded-tl-[22px]"
      style={{ background: ground }}
    >
      <div className={DOTS} />
      <div className="absolute inset-0 hidden lg:block">
        <Fit w={880} h={740} max={1.3}>
          <Devices brand={brand} x={EDGE} y={TOP} k={S} />
          {six.map((card, i) => (
            <div
              key={card.label}
              className="absolute"
              style={{ left: EDGE + i * (CARD + ROW_GAP), top: ROW_Y }}
            >
              <MomentCard card={card} />
            </div>
          ))}
        </Fit>
      </div>
      <div className="relative lg:hidden">
        <div className="relative aspect-[700/400]">
          <Fit w={700} h={400} max={1.3}>
            <Devices brand={brand} x={24} y={20} k={1} />
          </Fit>
        </div>
        <div className="grid grid-cols-3 gap-2.5 px-4 pb-4 sm:gap-3 sm:px-6 sm:pb-6">
          {six.map((card) => (
            <div key={card.label} className="relative aspect-square">
              <Fit w={CARD} h={CARD} max={1.3}>
                <MomentCard card={card} />
              </Fit>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServiceOpening({
  eyebrow,
  title,
  intro,
  interest,
  topic,
  stage,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  interest: string;
  topic: string;
  stage: ServiceStageProps;
}) {
  return (
    <section
      aria-labelledby="page-heading"
      className="relative overflow-hidden bg-white pb-10 lg:h-[100svh] lg:min-h-[640px] lg:pb-0"
    >
      <div className="container-fluid relative pt-28 sm:pt-32 lg:flex lg:h-full lg:items-center lg:pt-0">
        <div className="max-w-md lg:max-w-[min(27rem,32vw)] lg:pb-[4vh]">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-signal-green" />
            {eyebrow}
          </p>
          <h1
            id="page-heading"
            className="mt-6 text-title tracking-[var(--tracking-heading)] text-ink"
          >
            {title}
          </h1>
          <p className="mt-5 text-lead text-ink-2">{intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <RollLink href={startFor(interest)} size="lg">
              Get Started
            </RollLink>
            <RollLink href={whatsappAbout(topic)} variant="line" size="lg" external>
              Ask on WhatsApp
            </RollLink>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-10 lg:absolute lg:top-[16%] lg:right-0 lg:bottom-0 lg:left-[37.5%] lg:mt-0 lg:w-auto lg:max-w-none lg:px-0">
        <Stage {...stage} />
      </div>
    </section>
  );
}
