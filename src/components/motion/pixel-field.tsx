'use client';

import { useEffect, useRef } from 'react';

/**
 * The hero's living grid. The drafting grid behind the headline is 44px squares; here a few of
 * those squares at a time fill softly and fade — mostly out at the sides, never over the words —
 * in faint grey, now and then in one of the site's signal colours. Every few seconds three squares
 * step up and out in slate at the logo's own three strengths (1, 0.7, 0.42), the mark coming to
 * life in the grid. Under the pointer a square brightens and lets go.
 *
 * One canvas, laid exactly over the drafting grid so every square lands in a cell. It draws only
 * while the hero is on screen and the tab is showing, stops when its `Pausable` is paused, and is
 * never started under reduced motion.
 */
const CELL = 44;
const TOP_ROW = 2; // under the header bar, nothing lights
const BOTTOM = 560; // the tile row begins below this
const SIGNALS = ['#6d5cff', '#1fb866', '#1e9be0', '#f0a500', '#f0506e'];
const SLATE = '#2b2d42';
const STEP = [0.2, 0.14, 0.085]; // the logo's 1 / 0.7 / 0.42, at a whisper

type Lit = { c: number; r: number; born: number; life: number; peak: number; color: string };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
// Rise over the first quarter, hold, fall over the last two-fifths.
const envelope = (t: number) =>
  t < 0.25 ? smooth(0, 1, t / 0.25) : t > 0.6 ? 1 - smooth(0, 1, (t - 0.6) / 0.4) : 1;

export function PixelField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const box = cv?.parentElement;
    const hero = cv?.closest('section');
    if (!cv || !box || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const pausable = cv.closest<HTMLElement>('[data-pausable]');

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = box.clientWidth;
      H = box.clientHeight;
      cv.width = Math.ceil(W * dpr);
      cv.height = Math.ceil(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / CELL);
      rows = Math.min(Math.ceil(H / CELL), Math.floor(BOTTOM / CELL));
    };
    size();

    // The drafting grid's own fade (ellipse 70% × 60% at 50% 40%, solid to 30%, gone by 78%),
    // times a clearing over the words in the middle.
    const reach = (c: number, r: number) => {
      const x = (c + 0.5) * CELL;
      const y = (r + 0.5) * CELL;
      const d = Math.hypot((x - W * 0.5) / (W * 0.7), (y - H * 0.4) / (H * 0.6));
      const fade = 1 - smooth(0.3, 0.78, d);
      const side = smooth(0.42, 0.72, Math.abs(x - W / 2) / (W / 2));
      return fade * side;
    };

    const lit = new Map<string, Lit>();
    const light = (cell: Omit<Lit, 'born'>, born = performance.now()) => {
      if (cell.c < 0 || cell.c >= cols || cell.r < TOP_ROW || cell.r >= rows) return;
      lit.set(`${cell.c},${cell.r}`, { ...cell, born });
    };

    const spawn = (now: number) => {
      for (let tries = 0; tries < 6; tries++) {
        const c = Math.floor(Math.random() * cols);
        const r = TOP_ROW + Math.floor(Math.random() * (rows - TOP_ROW));
        const weight = reach(c, r);
        if (Math.random() > weight || lit.has(`${c},${r}`)) continue;
        const tinted = Math.random() < 0.15;
        light(
          {
            c,
            r,
            life: 2400 + Math.random() * 1800,
            peak: (tinted ? 0.18 + Math.random() * 0.08 : 0.06 + Math.random() * 0.045) * weight,
            color: tinted ? SIGNALS[Math.floor(Math.random() * SIGNALS.length)]! : '#1a1a1a',
          },
          now,
        );
        return;
      }
    };

    // The logo's three pixels, stepping up and out, somewhere out at the sides.
    const signature = (now: number) => {
      for (let tries = 0; tries < 12; tries++) {
        const c = Math.floor(Math.random() * (cols - 2));
        const r = TOP_ROW + 2 + Math.floor(Math.random() * Math.max(1, rows - TOP_ROW - 2));
        if (reach(c, r) < 0.55 || reach(c + 2, r - 2) < 0.4) continue;
        STEP.forEach((peak, i) =>
          light({ c: c + i, r: r - i, life: 2600, peak, color: SLATE }, now + i * 170),
        );
        return;
      }
    };

    let raf = 0;
    let running = false;
    let last = performance.now();
    let nextSignature = last + 1800;
    const TARGET = Math.round(cols * 1.15); // ≈ 38 squares alight on a wide screen

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (lit.size < TARGET && Math.random() < (dt / 3200) * TARGET) spawn(now);
      if (now > nextSignature) {
        signature(now);
        nextSignature = now + 3600 + Math.random() * 2400;
      }
      ctx.clearRect(0, 0, W, H);
      for (const [key, cell] of lit) {
        const t = (now - cell.born) / cell.life;
        if (t < 0) continue;
        if (t >= 1) {
          lit.delete(key);
          continue;
        }
        ctx.globalAlpha = cell.peak * envelope(t);
        ctx.fillStyle = cell.color;
        // Inside the cell's lines: the grid draws a 1px line along each cell's top and left.
        ctx.fillRect(cell.c * CELL + 1, cell.r * CELL + 1, CELL - 1, CELL - 1);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const paused = () => pausable?.hasAttribute('data-paused') ?? false;
    let onScreen = true;
    const update = () => {
      const go = onScreen && !document.hidden && !paused();
      if (go && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!go && running) {
        running = false;
        cancelAnimationFrame(raf);
        if (paused()) {
          lit.clear();
          ctx.clearRect(0, 0, W, H);
        }
      }
    };

    const io = new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      update();
    });
    io.observe(cv);
    const mo = pausable ? new MutationObserver(update) : null;
    if (pausable) mo!.observe(pausable, { attributes: true, attributeFilter: ['data-paused'] });
    document.addEventListener('visibilitychange', update);
    const onResize = () => {
      size();
      lit.clear();
    };
    window.addEventListener('resize', onResize);

    // Under the pointer, a square brightens and lets go.
    const onMove = (event: PointerEvent) => {
      if (!running || event.pointerType !== 'mouse') return;
      const rect = cv.getBoundingClientRect();
      const c = Math.floor((event.clientX - rect.left) / CELL);
      const r = Math.floor((event.clientY - rect.top) / CELL);
      if (reach(c, r) < 0.05) return;
      light({ c, r, life: 1100, peak: 0.08, color: '#1a1a1a' });
    };
    hero.addEventListener('pointermove', onMove);

    update();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo?.disconnect();
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('resize', onResize);
      hero.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
