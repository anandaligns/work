'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Every scroll-linked effect on the page, in one listener and one frame.
 *
 *   - `[data-reveal]` rises into place when it enters the viewport — aoutive's in-view spring
 *     (y 40, stiffness 150, damping 40), as a CSS transition. Only what is wholly below the fold
 *     at mount is held back, so nothing on screen at load ever blinks out.
 *   - `[data-fill]` headings fill with ink over the band from 90% to 40% of the viewport.
 *   - `[data-track]` lists fill as they pass the line 62% down the viewport (the process).
 *   - `#hero-row` opens its centre tile over the first 500px of scroll (codify).
 *   - `.tilt-plane` straightens as its section arrives, over a viewport and a half (codify) — or,
 *     on a phone, where a viewport is short and the section is soon passed, over 0.7 of one.
 *   - `[data-parallax]` drifts by its own amount as it crosses the viewport.
 *   - `[data-spread]` cards start gathered toward the centre of their row, by a quarter of the
 *     row's width, and slide out sideways to their columns as they travel from the bottom of the
 *     viewport to a fifth of the way down it (aoutive's use cases). Wide screens only, where the
 *     rows are rows.
 *
 *   - Every section is marked `data-offscreen` while it is out of view (a quarter-viewport
 *     early), and globals.css holds its looping motion still meanwhile.
 *
 * All reads happen before any write, so the browser lays out once per frame. Reduced motion
 * turns off everything except the fills, which are colour, not movement.
 *
 * It sits in the layout, which stays mounted from page to page, so it looks for its elements
 * again each time the page changes.
 */
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function ScrollEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanup: (() => void)[] = [];

    if (!reduce && 'IntersectionObserver' in window) {
      const pending = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
        (el) => el.getBoundingClientRect().top > window.innerHeight,
      );
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.removeAttribute('data-pending');
            io.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
      );
      for (const el of pending) {
        el.setAttribute('data-pending', '');
        io.observe(el);
      }
      cleanup.push(() => io.disconnect());
    }

    if ('IntersectionObserver' in window) {
      const blocks = [...document.querySelectorAll<HTMLElement>('main section, footer')];
      const idle = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            entry.target.toggleAttribute('data-offscreen', !entry.isIntersecting);
        },
        { rootMargin: '25% 0px' },
      );
      for (const el of blocks) idle.observe(el);
      cleanup.push(() => {
        idle.disconnect();
        for (const el of blocks) el.removeAttribute('data-offscreen');
      });
    }

    const fills = [...document.querySelectorAll<HTMLElement>('[data-fill]')];
    const tracks = [...document.querySelectorAll<HTMLElement>('[data-track]')];
    const hero = document.getElementById('hero-row');
    const planes = [...document.querySelectorAll<HTMLElement>('.tilt-plane')];
    const drifts = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    const spreads = [...document.querySelectorAll<HTMLElement>('[data-spread]')];
    const wide = window.matchMedia('(min-width: 1024px)');
    const phone = window.matchMedia('(max-width: 767px)');

    let queued = false;
    const frame = () => {
      queued = false;
      const vh = window.innerHeight;
      const y = window.scrollY;

      // Reads.
      const fillRects = fills.map((el) => el.getBoundingClientRect());
      const trackRects = tracks.map((el) => el.getBoundingClientRect());
      const planeRects = planes.map((el) => el.parentElement!.getBoundingClientRect());
      const driftRects = drifts.map((el) => el.getBoundingClientRect());
      const spreadRects = spreads.map((el) => el.getBoundingClientRect());
      const spreadRows = spreads.map((el) => el.parentElement!.clientWidth);

      // Writes.
      fills.forEach((el, i) => {
        const top = fillRects[i]!.top;
        el.style.setProperty('--p', clamp((vh * 0.9 - top) / (vh * 0.5)).toFixed(3));
      });
      tracks.forEach((el, i) => {
        const r = trackRects[i]!;
        el.style.setProperty('--p', clamp((vh * 0.62 - r.top) / r.height).toFixed(3));
      });
      if (reduce) return;
      hero?.style.setProperty('--open', clamp(y / 500).toFixed(4));
      const straighten = phone.matches ? 0.7 : 1.5;
      planes.forEach((el, i) => {
        const r = planeRects[i]!;
        const progress = clamp((vh - r.top) / (vh * straighten));
        el.style.setProperty('--tilt', (1 - progress).toFixed(4));
      });
      drifts.forEach((el, i) => {
        const r = driftRects[i]!;
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.translate = `0 ${(offset * Number(el.dataset.parallax)).toFixed(1)}px`;
      });
      spreads.forEach((el, i) => {
        const side = Number(el.dataset.spread);
        if (!side || !wide.matches) {
          el.style.translate = '';
          return;
        }
        const progress = clamp((vh - spreadRects[i]!.top) / (vh * 0.8));
        const gathered = (1 - progress) ** 2;
        el.style.translate = `${(side * gathered * spreadRows[i]! * 0.25).toFixed(1)}px 0`;
      });
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    cleanup.push(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    });

    return () => cleanup.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
