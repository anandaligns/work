'use client';

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { Step, Tint } from '@/content/pages';

import { Icon } from '../ui/icon';

/**
 * How something works, as the Process track laid on its side: one glyph block per step on a route,
 * left to right — top to bottom on a phone. When the strip is well into view, a Kinetic Orange dot
 * runs along the route once, the one thing on it that moves; nothing loops, so it needs no pause.
 * The blocks are white, the first and last graphite — after the home Services pictures, the dot
 * is the only orange. `tint` is the page's, kept for callers.
 * Under reduced motion the dot never shows.
 *
 * The steps are an ordered list, so they read in order with or without the picture.
 */
export function FlowStrip({ steps }: { steps: Step[]; tint?: Tint | 'white' }) {
  const list = useRef<HTMLOListElement>(null);
  const [play, setPlay] = useState(false);

  // The route runs from the first block's centre to the last's — across on a wide screen, down on a
  // phone — measured rather than assumed, so labels of any length keep it true.
  useLayoutEffect(() => {
    const el = list.current;
    if (!el) return;
    const place = () => {
      const blocks = el.querySelectorAll<HTMLElement>('.flow__block');
      const first = blocks[0]?.getBoundingClientRect();
      const last = blocks[blocks.length - 1]?.getBoundingClientRect();
      if (!first || !last) return;
      const box = el.getBoundingClientRect();
      const at = (r: DOMRect) => [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
      const [x0, y0] = at(first);
      const [x1, y1] = at(last);
      el.style.setProperty('--x0', `${x0}px`);
      el.style.setProperty('--y0', `${y0}px`);
      el.style.setProperty('--x1', `${x1}px`);
      el.style.setProperty('--y1', `${y1}px`);
      el.setAttribute('data-placed', '');
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = list.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setPlay(true);
        io.disconnect();
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol
      ref={list}
      data-play={play || undefined}
      className="flow"
      style={{ '--n': steps.length } as CSSProperties}
    >
      <span aria-hidden="true" className="flow__line" />
      <span aria-hidden="true" className="flow__dot" />
      {steps.map((step, i) => (
        <li key={step.label} className="flow__step">
          <span
            className={`flow__block ${i === 0 || i === steps.length - 1 ? 'flow__block--end' : 'bg-white'}`}
          >
            <Icon name={step.icon} size={20} />
          </span>
          <span className="flow__label">
            <span className="font-tech text-xs text-ink-2">0{i + 1}</span>
            <span className="mt-1 block text-body text-ink">{step.label}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
