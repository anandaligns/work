'use client';

import { type ReactNode, useEffect, useRef } from 'react';

import { turn } from './quarter-turn';

/**
 * Turns every brand pixel inside it (`[data-turn]`) a quarter — once when it first comes well
 * into view, and again whenever it is pointed at. The pixel is the one part of the mark that
 * moves, so a mark drawn anywhere on the page answers the reader the way the logo does. Nothing
 * turns on its own after that, and nothing turns under reduced motion.
 */
export function TurnOnView({
  children,
  className = '',
  delay = 250,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        el.querySelectorAll('[data-turn]').forEach((px, i) => turn(px, delay + i * 160));
        io.disconnect();
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={box}
      className={className}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return;
        event.currentTarget.querySelectorAll('[data-turn]').forEach((px) => turn(px));
      }}
    >
      {children}
    </div>
  );
}
