import type { CSSProperties, ReactNode } from 'react';

import type { Heading } from '@/content/site';

import { SectionHead } from '../home/section-head';
import { markColour } from '../lab/light-kit';
import { Band } from '../layout/band';
import { Head, Rich } from '../pages/product-parts';
import { Icon, type IconName } from '../ui/icon';

/**
 * A solution's split section, after Lightfield's "what customers do" rows: the words in the
 * narrow column on the left — the section's head at the top, its points down to the foot, each a
 * small glyph, a name in ink and a quiet line — and the picture in the wide column on the right,
 * a panel of the page's tint as tall as the words beside it, or pinned beside a longer list.
 * Below 1024px the words come first, the points two across from 768px, and the picture under them.
 */

export type ShowcasePoint = { icon: IconName; title: string; body: string };

export function Showcase({
  id,
  eyebrow,
  heading,
  intro,
  points,
  accent,
  picture,
  pinned = false,
  after,
}: {
  id: string;
  eyebrow: string;
  /** A heading in two halves, the second filling as it scrolls in; or, on a service page, one line. */
  heading: Heading | string;
  intro?: string;
  /** Lines may carry links and lead-ins (`Rich`). */
  points: ShowcasePoint[];
  /** The page's colour, for the points' glyphs. */
  accent: string;
  /** Fills the right column: a panel that takes the column's height. */
  picture: ReactNode;
  /**
   * For a picture of its own proportions beside a longer list: it holds its place under the
   * header from 1024px while the points scroll past it.
   */
  pinned?: boolean;
  /** Under the split, across the full width: how we build it, on a service page. */
  after?: ReactNode;
}) {
  return (
    <Band id={id} labelledBy={`${id}-heading`} className="py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-x-10 xl:gap-x-14">
        <div className="flex flex-col">
          {typeof heading === 'string' ? (
            <Head id={id} eyebrow={eyebrow} title={heading} intro={intro} />
          ) : (
            <SectionHead id={id} eyebrow={eyebrow} heading={heading} intro={intro} />
          )}
          <ul className="mt-10 grid gap-x-10 md:grid-cols-2 lg:mt-auto lg:grid-cols-1 lg:pt-10">
            {points.map((point, i) => (
              <li
                key={point.title}
                data-reveal=""
                style={{ '--i': i % 4 } as CSSProperties}
                className="flex gap-3.5 border-t border-line py-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-px grid size-7 shrink-0 place-items-center rounded-[9px]"
                  style={{
                    background: `color-mix(in srgb, ${accent} 10%, white)`,
                    color: markColour(accent),
                  }}
                >
                  <Icon name={point.icon} size={14} strokeWidth={1.9} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] leading-snug font-medium text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm leading-[1.55] text-ink-2">
                    <Rich text={point.body} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          data-reveal=""
          className={`relative ${pinned ? 'lg:sticky lg:top-28 lg:self-start' : ''}`}
        >
          {picture}
        </div>
      </div>
      {after}
    </Band>
  );
}

/**
 * The picture's panel for a mockup that runs off its edges (`Bleed`): a set height below 1024px,
 * and from there as tall as the words beside it — or, given `className`, a shape of its own (a
 * pinned picture's aspect ratio).
 */
export function ShowcasePanel({
  className = 'lg:h-full lg:min-h-[45rem]',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`relative h-[26rem] sm:h-[34rem] lg:h-auto ${className}`}>{children}</div>;
}
