import type { CSSProperties, ReactNode } from 'react';

import type { Faq, Point, PriceCard, Tint } from '@/content/pages';
import { startFor, whatsappAbout } from '@/content/site';

import { AskCard, FaqList } from '../home/faq';
import { Band } from '../layout/band';
import { PixelReveal } from '../motion/pixel-reveal';
import { Icon } from '../ui/icon';
import { TINT_BG, TINT_HEX } from '../visuals/scene-panel';
import { Card } from './cards';
import { PriceCards } from './price-cards';

/**
 * The sections every page beyond home is built from, each one something the home page already
 * has: a band opens with a small label and one H2 in the words people search with, then its body.
 * The page's H1 is in its intro; everything here is an H2 and below.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  className = 'py-20 lg:py-28',
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Band id={id} labelledBy={`${id}-heading`} className={className}>
      <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
        <span className="size-1.5 bg-ink" />
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-5 max-w-3xl text-h2 tracking-[var(--tracking-heading)] text-ink"
      >
        {title}
      </h2>
      {intro ? (
        <p
          data-reveal=""
          style={{ '--i': 1 } as CSSProperties}
          className="mt-5 max-w-2xl text-body text-ink-2"
        >
          {intro}
        </p>
      ) : null}
      {children ? <div className="mt-12">{children}</div> : null}
    </Band>
  );
}

/**
 * The page's picture, straight after its intro: the scene in a wide well of the page's tint,
 * arriving through the pixel dissolve as the Services cards' scenes do. Decorative line art — the
 * words beside it say everything it shows — so it is hidden from assistive tech.
 */
export function HeroWell({ tint, children }: { tint: Tint; children: ReactNode }) {
  return (
    <div aria-hidden="true" className="container-fluid pb-4">
      <div className={`relative overflow-hidden rounded-[2rem] ${TINT_BG[tint]}`}>
        <PixelReveal
          cover={TINT_HEX[tint]}
          className="grid h-[17rem] place-items-center px-6 py-8 sm:h-[24rem] lg:h-[28rem] [&_svg]:max-h-full [&_svg]:max-w-[40rem]"
        >
          {children}
        </PixelReveal>
      </div>
    </div>
  );
}

/** What gets in the way: plain cards, a small grey glyph each, no tint — the problem stays grey. */
export function ProblemCards({ points }: { points: Point[] }) {
  return (
    <ul
      className={`grid gap-4 md:grid-cols-2 ${points.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'}`}
    >
      {points.map((point, i) => (
        <li
          key={point.text}
          data-reveal=""
          style={{ '--i': i } as CSSProperties}
          className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-line bg-white p-7"
        >
          <span className="text-ink-3">
            <Icon name={point.icon} size={22} />
          </span>
          <p className="text-body text-ink-2">{point.text}</p>
        </li>
      ))}
    </ul>
  );
}

/** What we build: the card grid the pages share, a mark from the icon set on each. */
export function BuildCards({ points }: { points: Point[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {points.map((point, i) => (
        <Card key={point.text} icon={point.icon} name={point.text} index={i} />
      ))}
    </ul>
  );
}

export function Prices({
  cards,
  note,
  compact,
}: {
  cards: PriceCard[];
  note?: string;
  compact?: boolean;
}) {
  return (
    <>
      <PriceCards cards={cards} compact={compact} />
      {note ? <p className="mt-8 max-w-2xl text-body text-ink-2">{note}</p> : null}
    </>
  );
}

/** Questions: the FAQ accordion, one shelf, no category rail. */
export function Questions({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="max-w-4xl">
      <FaqList items={faqs} />
    </div>
  );
}

/**
 * A page's questions in two columns, as Lightfield sets its FAQ: the heading, a line and the way
 * to ask something else on the left — held in view on a wide screen while the answers scroll —
 * and the accordion on the right. One column on a phone.
 */
export function FaqBand({
  id = 'questions',
  eyebrow,
  title,
  intro,
  faqs,
  interest,
  topic,
  after,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  faqs: Faq[];
  /** Where "tell us" sends the reader: the page's `?interest=`. */
  interest?: string;
  /** What the WhatsApp message is about. */
  topic?: string;
  /** The page's small print, in its own box: under the intro on a wide screen, else last. */
  after?: ReactNode;
}) {
  return (
    <Band id={id} labelledBy={`${id}-heading`} className="py-24 lg:py-32">
      {/* Side by side from 1024px, the card to ask and the small print under the intro; stacked
          below that, both after the questions. */}
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div className="contents lg:sticky lg:top-28 lg:block lg:self-start">
          <div>
            <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
              <span className="size-1.5 bg-ink" />
              {eyebrow}
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-5 text-h2 tracking-[var(--tracking-heading)] text-balance text-ink"
            >
              {title}
            </h2>
            <p data-reveal="" className="mt-5 max-w-sm text-body text-ink-2">
              {intro ?? 'Straight answers to the questions we’re asked most.'}
            </p>
          </div>
          <div className="max-w-sm max-lg:order-last lg:mt-8">
            <AskCard whatsapp={whatsappAbout(topic ?? eyebrow)} start={startFor(interest)} />
          </div>
          {after ? <div className="max-lg:order-last lg:mt-10">{after}</div> : null}
        </div>
        <FaqList items={faqs} />
      </div>
    </Band>
  );
}
