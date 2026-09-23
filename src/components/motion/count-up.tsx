'use client';

import { useEffect, useRef } from 'react';

/**
 * A figure that counts up when it arrives — aoutive's stats row, on aoutive's curve. Sampled off
 * the template frame by frame, its counter is a critically damped spring: a soft start, 60% of the
 * way by a quarter-second, 93% by half a second, then a long settle, done in about 1.1s — and
 * nothing else moves: no fade, no blur, no rise. That spring is `1 - (1 + ωt)·e^(−ωt)` with ω ≈ 8.2.
 *
 * The server renders the final number, so a reader without script, or one who arrives with it
 * already on screen, reads the truth at once; only a figure still below the fold is reset to zero
 * and counted in.
 */
const OMEGA = 8.2;
const spring = (seconds: number) => 1 - (1 + OMEGA * seconds) * Math.exp(-OMEGA * seconds);

export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    const format = (n: number) => Math.round(n).toLocaleString('en-IN');
    el.textContent = format(0);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const x = spring(Math.max(0, (now - t0) / 1000));
          const done = x > 0.9995;
          el.textContent = format(done ? value : value * x);
          if (!done) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{value.toLocaleString('en-IN')}</span>;
}
