import type { CSSProperties } from 'react';

import { everyWebsiteIncludes, headings, promises, warrantyPromise } from '@/content/site';

import { Icon } from '../ui/icon';

import { Band } from '../layout/band';
import { PixelReveal } from '../motion/pixel-reveal';
import { PROMISE_MOCKS } from './native-mocks';
import { SectionHead } from './section-head';

/**
 * aoutive's use-case section: five cards, two across the top and three beneath, that spread into
 * place as the page scrolls. On a wide screen each row starts gathered at the centre — the top two
 * stacked on one another, the outer two of the bottom row tucked behind the middle one — and each
 * card slides out sideways to its column as its row travels up the viewport. Only sideways: no
 * fade, no scale, exactly as aoutive moves them (`ScrollEffects`, `[data-spread]`).
 *
 * The cards are the three promises from the CMS, the warranty from the price list, and the list of
 * what every build includes.
 */
const TINTS = ['bg-tint-butter', 'bg-tint-violet', 'bg-tint-blush', 'bg-tint-mint'];
const COVERS = ['#fff5d6', '#eceefb', '#fdecee', '#e6f7ee'];

/**
 * Where each card sits, which way it starts displaced toward the centre of its row (1 to the
 * right, -1 to the left, 0 not at all), and which card lies on top while they are gathered.
 */
const PLACES = [
  { span: 'lg:col-span-3', spread: 1, z: 2 },
  { span: 'lg:col-span-3', spread: -1, z: 1 },
  { span: 'lg:col-span-2', spread: 1, z: 1 },
  { span: 'lg:col-span-2', spread: 0, z: 2 },
  { span: 'md:col-span-2 lg:col-span-2', spread: -1, z: 1 },
];

const cards = [...promises, warrantyPromise];

export function Promises() {
  return (
    <Band id="promises" labelledBy="promises-heading" className="py-24 lg:py-32">
      <SectionHead
        id="promises"
        eyebrow="Working with us"
        heading={headings.promises}
        align="center"
      />
      <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {cards.map((card, index) => {
          const place = PLACES[index]!;
          return (
            <li
              key={card.title}
              data-spread={place.spread}
              style={{ zIndex: place.z } as CSSProperties}
              className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white ${place.span}`}
            >
              <div className={`m-3 overflow-hidden rounded-2xl ${TINTS[index % 4]}`}>
                <PixelReveal
                  cover={COVERS[index % 4]}
                  delay={index * 120}
                  className="h-72 transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
                >
                  {(() => {
                    const Mock = PROMISE_MOCKS[index];
                    return Mock ? <Mock /> : null;
                  })()}
                </PixelReveal>
              </div>
              <div className="px-7 pt-3 pb-8">
                <h3 className="text-h4 font-medium tracking-[-0.02em]">{card.title}</h3>
                <p className="mt-3 max-w-md text-body text-ink-2">{card.body}</p>
              </div>
            </li>
          );
        })}
        <li
          data-spread={PLACES[4]!.spread}
          style={{ zIndex: PLACES[4]!.z } as CSSProperties}
          className={`on-night relative flex flex-col gap-8 overflow-hidden rounded-[var(--radius-panel)] bg-night p-8 text-white lg:p-9 ${PLACES[4]!.span}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-10 size-44 rounded-full border border-white/10"
          />
          <div>
            <p className="eyebrow text-white/60">Whatever the package</p>
            <p className="mt-4 font-display text-h3 tracking-[var(--tracking-heading)]">
              Every build includes
            </p>
          </div>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1">
            {everyWebsiteIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10">
                  <Icon name="check" size={12} strokeWidth={2.4} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </Band>
  );
}
