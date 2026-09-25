'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

import { headings, solutions } from '@/content/site';
import { useAnchor } from '@/lib/anchor';

import { Icon, iconFor } from '../ui/icon';
import { RollLabel } from '../ui/roll-link';
import { Corners } from '../visuals/scene-panel';
import { SOLUTION_SCENES } from '../visuals/scenes';

import { SectionHead } from './section-head';

/**
 * aoutive's "infrastructure" section, as the four solutions.
 *
 * A list on the left, one item open at a time, with a line under the open item that fills over
 * nine seconds and then hands on to the next — and a large framed scene on the right that changes
 * with it. The clock pauses only while the pointer rests on an item, or keyboard focus is on one —
 * a click's own focus does not hold it — and resumes where it stopped, the line with it. Choosing
 * an item restarts it there. Under reduced motion nothing advances on its own.
 *
 * It is an accordion in the ARIA sense — each item's button expands its own region, which holds
 * everything the item says. The picture on the right repeats it visually and is hidden from
 * assistive tech.
 */
const DWELL = 9000;

export function Solutions() {
  const ids = useId();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const reduce = useRef(false);
  const mountedAt = useRef(0);
  const remaining = useRef(DWELL);
  const paused = hovered || focused;

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    mountedAt.current = performance.now();
  }, []);

  // Sent here for one of a solution's bundles (from a menu, or a link with its hash): open that
  // solution, with a fresh dwell.
  const anchor = useAnchor();
  useEffect(() => {
    const at = solutions.findIndex((s) => s.bundles.some((b) => `#${b.anchor}` === anchor));
    if (at < 0) return;
    setActive(at);
    setCycle((c) => c + 1);
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

  // A new item gets the whole dwell. Declared before the clock so it runs first.
  useEffect(() => {
    remaining.current = DWELL;
  }, [active, cycle]);

  // The clock runs on what is left of the dwell, and a pause banks what has been spent.
  useEffect(() => {
    if (paused || reduce.current) return;
    const started = performance.now();
    const timer = window.setTimeout(
      () => setActive((i) => (i + 1) % solutions.length),
      remaining.current,
    );
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [active, paused, cycle]);

  const choose = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  const current = solutions[active]!;
  const Scene = SOLUTION_SCENES[current.slug as keyof typeof SOLUTION_SCENES];

  return (
    <div
      className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14"
      data-paused={paused || undefined}
    >
      {/* automatix's list: one rail down the left, the open row tall with its paragraph, the others
          a title and a line on one row, hairlines fading out to the right. */}
      <div
        className="relative"
        onFocus={(event) => setFocused(event.target.matches(':focus-visible'))}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line" />
        {solutions.map((solution, i) => {
          const selected = i === active;
          return (
            <div
              key={solution.slug}
              className="auto-row relative"
              data-active={selected || undefined}
              onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
              onPointerLeave={() => setHovered(false)}
            >
              {selected ? (
                <span
                  aria-hidden="true"
                  key={`${active}-${cycle}`}
                  className="auto-rail absolute top-0 bottom-0 left-0 w-[2px] bg-ink"
                  style={{ ['--dwell' as string]: `${DWELL}ms` }}
                />
              ) : null}
              <button
                type="button"
                id={`${ids}-tab-${i}`}
                aria-expanded={selected}
                aria-controls={`${ids}-region-${i}`}
                onClick={() => choose(i)}
                onKeyDown={(event) => {
                  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
                  event.preventDefault();
                  const next =
                    (i + (event.key === 'ArrowDown' ? 1 : -1) + solutions.length) %
                    solutions.length;
                  choose(next);
                  document.getElementById(`${ids}-tab-${next}`)?.focus();
                }}
                className={`flex w-full flex-wrap items-baseline gap-x-6 gap-y-1 pt-7 pr-4 pl-8 text-left transition-[padding] duration-500 sm:pl-12 ${selected ? 'pb-3' : 'pb-7'}`}
              >
                <span className="auto-row__title">{solution.name}</span>
                <span
                  aria-hidden={selected || undefined}
                  className={`text-body text-ink-2 transition-opacity duration-500 ${selected ? 'opacity-0 max-sm:hidden' : ''}`}
                >
                  {solution.line}
                </span>
              </button>
              <div
                id={`${ids}-region-${i}`}
                role="region"
                aria-labelledby={`${ids}-tab-${i}`}
                inert={!selected}
                className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-premium)] ${
                  selected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pr-4 pb-8 pl-8 sm:pl-12">
                    <p className="max-w-lg text-lead text-ink-2">
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
                            <span className="block text-sm font-semibold text-ink">
                              {bundle.name}
                            </span>
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
                  </div>
                </div>
              </div>
              <span aria-hidden="true" className="auto-row__rule" />
            </div>
          );
        })}
      </div>

      {/* automatix's frame: a padded outer card, the picture in a rounded panel inside it, framed
          by four corner marks and centred between them. The picture repeats what the open row
          says, so it is hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="rounded-[2rem] border border-line bg-fill p-3 sm:p-5 lg:sticky lg:top-24"
      >
        <div className="relative overflow-hidden rounded-[1.4rem] border border-line bg-white">
          <Corners />
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(11_13_18/0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" />
          <div
            key={current.slug}
            className="scene-swap relative grid h-[19rem] place-items-center p-10 sm:h-[26rem] sm:p-14 [&_svg]:max-h-full [&_svg]:max-w-[30rem]"
          >
            {Scene ? <Scene /> : null}
          </div>
        </div>
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
    />
  );
}
