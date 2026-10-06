'use client';

import Link from 'next/link';
import { type CSSProperties, useEffect, useRef, useState } from 'react';

import { BouncyAccordion } from '@/components/motion/bouncy-accordion';
import { headings, solutions } from '@/content/site';
import { useAnchor } from '@/lib/anchor';

import { Icon, iconFor } from '../ui/icon';
import { Lucide, MENU_ICONS } from '../ui/lucide';
import { RollLabel } from '../ui/roll-link';
import { SOLUTION_MOCKS, SolutionsRestMock } from './native-mocks';

import { SectionHead } from './section-head';

/**
 * Codify's "Our Excellence" section, as the four solutions.
 *
 * A list on the left and a large panel on the right. The open solution is a white card — its
 * glyph, its name, then everything it says: its line, its two ways in and the way to its page;
 * the others are a glyph and a name. The colour is the glyphs' alone, each on its solution's
 * tint. The picture sits on a white panel and changes with the solution. The reader opens a
 * solution, or closes the open one again; with every one closed, the frame rests on the four
 * solutions as a deck, one card lifted over its slot. Nothing turns on its own.
 *
 * It is beUI's bouncy accordion (`@beui/bouncy-accordion`), as the FAQ is: the closed solutions sit
 * together in one container and the open one springs out as its own card, its region holding
 * everything the item says. The picture on the right repeats it visually and is hidden from
 * assistive tech. Below 1024px there is no right: the open card carries its own picture, under
 * its words.
 */

/** Each solution's glyph colours — the tint and colour its own page is drawn in. */
const TONES: Record<string, { tint: string; accent: string }> = {
  'lead-automation': { tint: 'var(--color-tint-mint)', accent: '#166534' },
  'online-store-and-bookings': { tint: 'var(--color-tint-sky)', accent: 'var(--color-signal-sky)' },
  'business-dashboard-crm': {
    tint: 'var(--color-tint-violet)',
    accent: 'var(--color-signal-violet)',
  },
  'website-care-hosting': { tint: 'var(--color-tint-blush)', accent: 'var(--color-signal-rose)' },
};
const toneOf = (slug?: string) =>
  (slug ? TONES[slug] : undefined) ?? { tint: 'var(--color-fill)', accent: 'var(--color-ink)' };

export function Solutions() {
  // The open row, or -1 once the reader closes it.
  const [active, setActive] = useState(0);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  // Sent here for one of a solution's bundles (from a menu, or a link with its hash): open that
  // solution.
  const anchor = useAnchor();
  useEffect(() => {
    const at = solutions.findIndex((s) => s.bundles.some((b) => `#${b.anchor}` === anchor));
    if (at < 0) return;
    setActive(at);
    // Arriving from another page, the browser has already scrolled to the bundle — before its
    // row opened, and while the first row, above it, was still open. Once the rows settle, the
    // bundle is brought back into view if that moved it out.
    if (performance.now() - mountedAt.current > 1500) return;
    const timer = window.setTimeout(() => {
      const target = document.getElementById(anchor.slice(1));
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      if (top >= 88 && top <= window.innerHeight * 0.75) return;
      const lenis = (
        window as Window & {
          __lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void };
        }
      ).__lenis;
      if (lenis) lenis.scrollTo(target, { offset: -120 });
      else window.scrollTo({ top: window.scrollY + top - 120 });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [anchor]);

  const current = solutions[active];

  return (
    <div className="mt-14 grid items-start gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-16">
      <BouncyAccordion
        value={current?.slug ?? null}
        onValueChange={(slug) => setActive(solutions.findIndex((s) => s.slug === slug))}
        classNames={SOL_CLASSES}
        items={solutions.map((solution) => {
          const tone = toneOf(solution.slug);
          return {
            id: solution.slug,
            title: solution.name,
            icon: (
              <span
                className="sol-acc__mark"
                style={{ '--tint': tone.tint, '--accent': tone.accent } as CSSProperties}
              >
                <Lucide name={MENU_ICONS[solution.slug] ?? 'layers'} size={18} />
              </span>
            ),
            description: (
              <>
                <p className="max-w-lg text-body text-ink-2">
                  {solution.line} {solution.positioning ?? ''}
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {solution.bundles.map((bundle) => (
                    <li
                      key={bundle.anchor}
                      id={bundle.anchor}
                      className="flex scroll-mt-40 items-start gap-3"
                    >
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-line bg-white text-ink">
                        <Icon name={iconFor(bundle.anchor)} size={14} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">{bundle.name}</span>
                        <span className="block text-xs leading-relaxed text-ink-2">
                          {bundle.includes.join(' · ')}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="roll mt-6 inline-flex text-sm font-semibold text-ink"
                >
                  <RollLabel>{`Explore ${solution.name}`}</RollLabel>
                </Link>
                <SceneFrame slug={solution.slug} inline />
              </>
            ),
          };
        })}
      />

      <SceneFrame slug={current?.slug} />
    </div>
  );
}

/** The site's look on beUI's accordion: white rows on a hairline, a tinted glyph, our type. */
const SOL_CLASSES = {
  root: 'sol-acc',
  item: 'sol-acc__item',
  trigger: 'min-h-0 gap-4 py-5 sm:px-6 sm:py-6',
  icon: 'size-9',
  title: 'sol-acc__title whitespace-normal!',
  chevron: 'sol-acc__chevron',
  description: 'pb-1 sm:pr-1 sm:pl-[3.25rem]',
};

/**
 * The picture's panel: white on a hairline, a dot grid fading out from its centre, the picture
 * on it — as before, without the grey card around it or the corner marks. The picture repeats
 * what its row says, so it is hidden from assistive tech. Beside the list from 1024px; `inline`,
 * inside the open card below that.
 */
function SceneFrame({ slug, inline = false }: { slug?: string; inline?: boolean }) {
  const Mock = slug ? SOLUTION_MOCKS[slug] : SolutionsRestMock;
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden border border-white/10 bg-night ${
        inline
          ? 'mt-6 rounded-2xl lg:hidden'
          : 'hidden rounded-[1.25rem] lg:sticky lg:top-24 lg:block'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" />
      <div
        key={slug ?? 'rest'}
        className={`scene-swap relative ${inline ? 'h-[15rem] sm:h-[21rem]' : 'h-[19rem] sm:h-[26rem] lg:h-[32rem]'}`}
      >
        {Mock ? <Mock /> : null}
      </div>
    </div>
  );
}

export function SolutionsHead() {
  return (
    <SectionHead
      id="solutions"
      eyebrow="Solutions"
      heading={headings.solutions}
      intro="Each solution puts the right services together for one goal, so you don’t have to pick them one by one."
      align="center"
    />
  );
}
