'use client';

import Link from 'next/link';
import type { MotionStyle } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/motion/collapsible';
import { headings, solutions } from '@/content/site';
import { useAnchor } from '@/lib/anchor';

import { Icon, iconFor } from '../ui/icon';
import { Lucide, MENU_ICONS } from '../ui/lucide';
import { RollLabel } from '../ui/roll-link';
import { SOLUTION_MOCKS, SolutionsRestMock } from './native-mocks';

import { GRAPHITE } from '../visuals/graphite';
import { SectionHead } from './section-head';

/**
 * Codify's "Our Excellence" section, as the four solutions.
 *
 * A list on the left and a large panel on the right. The open solution is a white card — its
 * glyph, its name, then everything it says: its line, its two ways in and the way to its page;
 * the others are a glyph and a name. The glyphs are graphite on light grey. The picture sits on a
 * panel after the home Services pictures and changes with the solution. The reader opens a
 * solution, or closes the open one again; with every one closed, the frame rests on the four
 * solutions as a deck, one card lifted over its slot. Nothing turns on its own.
 *
 * It is an accordion in the ARIA sense, each row beUI's Collapsible (`@beui/collapsible`): its
 * button expands its own region, which holds everything the item says, on beUI's layout spring. The picture on the right repeats it visually and is hidden from
 * assistive tech. Below 1024px there is no right: the open card carries its own picture, under
 * its words.
 */

/** Each solution's glyph colours: graphite on light grey, after the home Services pictures. */
const toneOf = (_slug?: string) => ({ tint: 'var(--color-fill)', accent: GRAPHITE });

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
      <div data-sol-list="" className="flex flex-col gap-1.5">
        {solutions.map((solution, i) => {
          const selected = i === active;
          const tone = toneOf(solution.slug);
          return (
            <Collapsible
              key={solution.slug}
              open={selected}
              onOpenChange={(open) => setActive(open ? i : -1)}
              className="sol-item"
              data-active={selected || undefined}
              style={{ '--tint': tone.tint, '--accent': tone.accent } as MotionStyle}
            >
              <CollapsibleTrigger
                render={
                  <button
                    type="button"
                    onKeyDown={(event) => {
                      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
                      event.preventDefault();
                      const next =
                        (i + (event.key === 'ArrowDown' ? 1 : -1) + solutions.length) %
                        solutions.length;
                      setActive(next);
                      event.currentTarget
                        .closest('[data-sol-list]')
                        ?.querySelectorAll<HTMLButtonElement>('[data-slot="collapsible-trigger"]')
                        [next]?.focus();
                    }}
                    className={`flex w-full items-center gap-4 px-5 pt-5 text-left transition-[padding] duration-500 sm:px-6 sm:pt-6 ${selected ? 'pb-4' : 'pb-5 sm:pb-6'}`}
                  />
                }
              >
                <span aria-hidden="true" className="sol-item__mark">
                  <Lucide name={MENU_ICONS[solution.slug] ?? 'layers'} size={18} />
                </span>
                <span className="sol-item__title">{solution.name}</span>
              </CollapsibleTrigger>
              <CollapsibleContent contentClassName="px-5 pb-6 sm:pr-6 sm:pl-[4.75rem]">
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
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      <SceneFrame slug={current?.slug} />
    </div>
  );
}

/**
 * The picture's panel, after the home Services pictures: white on a hairline, a fine grid fading
 * out toward its edges, the picture on it in graphite. The picture repeats what its row says, so
 * it is hidden from assistive tech. Beside the list from 1024px; `inline`, inside the open card
 * below that.
 */
function SceneFrame({ slug, inline = false }: { slug?: string; inline?: boolean }) {
  const Mock = slug ? SOLUTION_MOCKS[slug] : SolutionsRestMock;
  return (
    <div
      aria-hidden="true"
      className={`ground ground--grid relative overflow-hidden border border-line ${
        inline
          ? 'mt-6 rounded-2xl lg:hidden'
          : 'hidden rounded-[1.75rem] lg:sticky lg:top-24 lg:block'
      }`}
    >
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
