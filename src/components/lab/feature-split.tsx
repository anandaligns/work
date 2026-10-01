'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

import { Icon, type IconName } from '../ui/icon';
import { GlowPanel, lit } from './kit';

/**
 * Alia's feature section: three cards stacked on the left and, beside them, one dark panel lit
 * in the page's colour with the open card's mockup in it. The open card is raised and says what
 * the feature does; the others show their glyph and name only. They take turns on their own, a
 * line filling along the open card's foot; a pointer resting on them or keyboard focus holds the
 * turn, and choosing one opens it there. `night` sets the whole section on the dark.
 *
 * Below 1024px the panel comes first and the cards under it. Each card is a toggle; the panel
 * repeats what the cards say, so it is hidden from assistive tech.
 */
const DWELL = 6500;

export type SplitItem = { icon: IconName; title: string; body: string; scene: ReactNode };

export function FeatureSplit({
  items,
  accent,
  tone = 'paper',
  flip = false,
}: {
  items: SplitItem[];
  accent: string;
  tone?: 'paper' | 'night';
  /** The panel on the left, the cards on the right. */
  flip?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const reduce = useRef(false);
  const remaining = useRef(DWELL);
  const paused = hovered || focused;
  const night = tone === 'night';

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  useEffect(() => {
    remaining.current = DWELL;
  }, [active, cycle]);
  useEffect(() => {
    if (paused || reduce.current) return;
    const started = performance.now();
    const timer = window.setTimeout(
      () => setActive((i) => (i + 1) % items.length),
      remaining.current,
    );
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [active, paused, cycle, items.length]);

  const choose = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <div className="grid gap-4 lg:h-[660px] lg:grid-cols-2" data-paused={paused || undefined}>
      <GlowPanel
        accent={accent}
        corner={flip ? 'left' : 'right'}
        className={`h-[440px] sm:h-[540px] lg:h-full ${flip ? 'lg:order-first' : 'lg:order-last'}`}
      >
        <div key={active} className="absolute inset-0">
          {items[active]!.scene}
        </div>
      </GlowPanel>

      <div
        className="flex flex-col gap-3 max-lg:order-last"
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={(event) => setFocused(event.target.matches(':focus-visible'))}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
        {items.map((item, i) => {
          const on = i === active;
          const skin = night
            ? on
              ? 'bg-white/[0.07]'
              : 'border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.045]'
            : on
              ? 'border-line bg-white shadow-[0_1px_2px_rgb(11_13_18/0.04),0_24px_48px_-28px_rgb(11_13_18/0.3)]'
              : 'border-transparent bg-[#f2f2f4] hover:bg-[#ececef]';
          return (
            <button
              key={item.title}
              type="button"
              aria-pressed={on}
              onClick={() => choose(i)}
              className={`relative flex flex-col justify-center overflow-hidden rounded-[22px] border p-7 text-left transition-[background-color,border-color,box-shadow] duration-500 lg:flex-1 lg:p-9 ${skin}`}
              style={
                night && on
                  ? { borderColor: `color-mix(in srgb, ${lit(accent)} 60%, transparent)` }
                  : undefined
              }
            >
              <span
                className="grid size-12 shrink-0 place-items-center rounded-[14px]"
                style={
                  night
                    ? { background: lit(accent), color: '#0b0d12' }
                    : { background: '#0b0d12', color: lit(accent) }
                }
              >
                <Icon name={item.icon} size={22} />
              </span>
              <span
                className={`mt-5 block font-display text-[1.625rem] leading-[1.1] font-bold tracking-[-0.03em] lg:text-[1.875rem] ${night ? 'text-white' : 'text-ink'}`}
              >
                {item.title}
              </span>
              <span
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-premium)] ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <span className="overflow-hidden">
                  <span
                    className={`block pt-3 text-[1rem] leading-relaxed ${night ? 'text-white/70' : 'text-ink-2'}`}
                  >
                    {item.body}
                  </span>
                </span>
              </span>
              {on ? (
                <span
                  aria-hidden="true"
                  key={`${active}-${cycle}`}
                  className="split-progress absolute right-0 bottom-0 left-0 h-[2px]"
                  style={
                    {
                      background: night ? lit(accent) : accent,
                      '--dwell': `${DWELL}ms`,
                    } as CSSProperties
                  }
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
