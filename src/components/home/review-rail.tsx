'use client';

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from '../ui/icon';

/**
 * Lightfield's customer row: the cards in one line that scrolls sideways — by hand, by swipe, or
 * a card at a time with the two arrows beside the section's heading, each dimmed when there is no
 * further to go.
 */
export function ReviewRail({
  head,
  note,
  children,
}: {
  /** The section's heading, with the arrows at its right. */
  head: ReactNode;
  /** A line under the heading. */
  note?: ReactNode;
  children: ReactNode;
}) {
  const rail = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = rail.current;
    el?.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el?.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const el = rail.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: 'smooth' });
  };

  const button =
    'grid size-11 place-items-center rounded-[6px] bg-[#ececef] text-ink transition-colors duration-300 hover:bg-[#e2e2e6] disabled:cursor-default disabled:bg-[#f3f3f5] disabled:text-ink-3';

  return (
    <>
      <div className="flex items-end justify-between gap-6">
        {head}
        <div className="flex shrink-0 gap-2">
          <button type="button" className={button} onClick={() => step(-1)} disabled={edge.start}>
            <span className="sr-only">Previous review</span>
            <span className="rotate-180">
              <Icon name="arrow" size={16} />
            </span>
          </button>
          <button type="button" className={button} onClick={() => step(1)} disabled={edge.end}>
            <span className="sr-only">Next review</span>
            <span>
              <Icon name="arrow" size={16} />
            </span>
          </button>
        </div>
      </div>
      {note}
      <ul
        ref={rail}
        className="-mx-[var(--gutter)] mt-12 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] lg:mt-16 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </>
  );
}
