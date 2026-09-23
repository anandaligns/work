'use client';

import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Content that is swapped in place — a tab's panel — without the page jumping under it.
 *
 * When `id` changes, the frame is held at the height the old content had, then eased to the new
 * content's height while the new content rises in (its lists stagger in with `.morph-stagger`).
 * Once there, the frame lets go of the height, so whatever is inside can still grow on its own —
 * an answer opening in the FAQ. A switch made mid-ease starts from wherever the frame has got to.
 *
 * The height it starts from is kept by a ResizeObserver, which reports after React has already
 * committed the new content — so at the moment of the swap it still holds the old height.
 */
export function Morph({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const last = useRef<number | null>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (!el.style.height) last.current = el.offsetHeight;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useIsoLayout(() => {
    const el = frame.current;
    if (!el) return;
    const easing = Boolean(el.style.height);
    const from = easing ? el.getBoundingClientRect().height : last.current;
    el.style.transition = '';
    el.style.height = '';
    const to = el.offsetHeight;
    last.current = to;
    if (
      from === null ||
      Math.abs(from - to) < 1 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.style.overflow = '';
      return;
    }
    el.style.overflow = 'hidden';
    el.style.height = `${from}px`;
    void el.offsetHeight;
    el.style.transition = 'height 0.65s var(--ease-premium)';
    el.style.height = `${to}px`;
    const settle = (event: TransitionEvent) => {
      if (event.target !== el || event.propertyName !== 'height') return;
      el.style.transition = '';
      el.style.height = '';
      el.style.overflow = '';
      last.current = el.offsetHeight;
    };
    el.addEventListener('transitionend', settle);
    return () => el.removeEventListener('transitionend', settle);
  }, [id]);

  return (
    <div ref={frame} className={className}>
      <div key={id}>{children}</div>
    </div>
  );
}
