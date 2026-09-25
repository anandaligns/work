'use client';

import { useEffect, useRef } from 'react';

import { SYMBOL } from '../ui/brand';
import { pose, TURN_MS } from './quarter-turn';

/**
 * The living ground: the identity's brand language — "two modules, endless systems" — in its
 * light version behind the hero and the pages' intros, and in its ink version for dark grounds.
 *
 * The two modules come from the mark: the pixel (a square) and the quarter-turn (a quarter-disc,
 * the arc a pixel traces when it turns on its corner). They tile the hero's sides tone on tone, as
 * the identity's cover pattern tiles its ink, and clear away over the words in the middle. Then
 * the pattern lives the way the logo does:
 *
 * - every half-second or so a module makes the logo's quarter-turn — the same 1.2s on
 *   `cubic-bezier(.7, 0, .2, 1)`, shrinking just enough to stay inside its cell — and a
 *   quarter-disc comes to rest facing the next way;
 * - modules leave and arrive, turning as they come, so the pattern is never the same twice;
 * - now and then one module turns Kinetic Blue for a few seconds — only ever one at a time,
 *   because blue marks what moves and nothing else, and never under words, so it can't cost a
 *   line its contrast;
 * - every so often the mark itself assembles in the pattern — the P ghosted in, its pixel in
 *   blue making its turn — and dissolves back into modules;
 * - under the pointer, a module turns.
 *
 * One canvas. It draws only while it is on screen and the tab is showing, freezes when its
 * `Pausable` is paused, and under reduced motion shows the pattern still.
 */
/** The modules' tones, tone on tone with their ground, and the ghosted P: light for paper, and
 *  the identity's cover tones for Graphite Ink. */
const TONES = {
  light: { palette: ['#eef0f4', '#e9ebf1', '#f1f2f6', '#e8eaf6'], ghost: '#d9dce4' },
  dark: { palette: ['#131722', '#161a26', '#10131c', '#1a1f2e'], ghost: '#2a3042' },
} as const;
const BLUE = '#2e3bff';
const P_PATH = SYMBOL.p;

type Module = {
  c: number;
  r: number;
  square: boolean;
  /** quarter-disc: which corner it pivots on — top-left, top-right, bottom-right, bottom-left */
  k: number;
  tone: string;
  weight: number;
  turnAt: number;
  /** opacity: from → to over [fadeAt, fadeAt + fadeMs] */
  from: number;
  to: number;
  fadeAt: number;
  fadeMs: number;
  blueAt: number;
  blueFor: number;
};

type Signature = { c: number; r: number; at: number; hold: number };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** A small seeded generator, so the first pattern is the same on every visit. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const mix = (a: string, b: string, t: number) => {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (shift: number) =>
    Math.round(((pa >> shift) & 255) * (1 - t) + ((pb >> shift) & 255) * t);
  return `rgb(${ch(16)} ${ch(8)} ${ch(0)})`;
};

export function ModuleField({
  bottom = 600,
  tone = 'light',
  clearing = [0.4, 0.86],
}: {
  /** Where the pattern has faded out, in px from the top. */
  bottom?: number;
  tone?: keyof typeof TONES;
  /** How far from the middle the pattern starts and reaches full strength, as fractions of half
   *  the width — the words in the middle stay clear. */
  clearing?: [number, number];
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [clearFrom, clearTo] = clearing;

  useEffect(() => {
    const cv = ref.current;
    const box = cv?.parentElement;
    const hero = cv?.closest<HTMLElement>('section, footer');
    if (!cv || !box || !hero) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pausable = cv.closest<HTMLElement>('[data-pausable]');
    const pPath = new Path2D(P_PATH);
    const { palette: PALETTE, ghost: GHOST } = TONES[tone];

    let W = 0;
    let H = 0;
    let cell = 72;
    let cols = 0;
    let rows = 0;
    let ox = 0;
    let grid: (Module | null)[] = [];
    let mods: Module[] = [];
    let signature: Signature | null = null;

    // Clear over the words in the middle; fade out towards the tiles below.
    const reach = (c: number, r: number) => {
      const x = ox + (c + 0.5) * cell;
      const y = (r + 0.5) * cell;
      const side = smooth(clearFrom, clearTo, Math.abs(x - W / 2) / (W / 2));
      const down = 1 - smooth(0.55, 1, y / bottom);
      return side * down;
    };

    const make = (c: number, r: number, rnd: () => number, weight: number): Module => ({
      c,
      r,
      square: rnd() < 0.34,
      k: Math.floor(rnd() * 4),
      tone: PALETTE[rnd() < 0.12 ? 3 : Math.floor(rnd() * 3)]!,
      weight,
      turnAt: -1,
      from: 1,
      to: 1,
      fadeAt: 0,
      fadeMs: 1,
      blueAt: -1,
      blueFor: 0,
    });

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = box.clientWidth;
      H = box.clientHeight;
      cv.width = Math.ceil(W * dpr);
      cv.height = Math.ceil(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.round(Math.min(78, Math.max(56, W / 20)));
      cols = Math.ceil(W / cell) + 1;
      rows = Math.ceil(Math.min(H, bottom) / cell);
      ox = (W - cols * cell) / 2;
      const rnd = seeded(20260923);
      grid = Array.from({ length: cols * rows }, () => null);
      mods = [];
      signature = null;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const weight = reach(c, r);
          const keep = rnd() < 0.66 * Math.min(1, weight * 1.6);
          const mod = make(c, r, rnd, weight);
          if (!keep || weight < 0.06) continue;
          grid[r * cols + c] = mod;
          mods.push(mod);
        }
      }
    };

    const opacity = (m: Module, now: number) => {
      const t = Math.min(1, Math.max(0, (now - m.fadeAt) / m.fadeMs));
      return m.from + (m.to - m.from) * smooth(0, 1, t);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      const h = cell / 2;
      for (const m of mods) {
        let alpha = opacity(m, now) * (0.45 + 0.55 * m.weight);
        if (
          signature &&
          Math.abs(m.c - signature.c - 0.5) <= 0.5 &&
          Math.abs(m.r - signature.r - 0.5) <= 0.5
        ) {
          alpha *= 1 - sigShow(now);
        }
        if (alpha < 0.01) continue;
        let color = m.tone;
        if (m.blueAt >= 0) {
          const t = now - m.blueAt;
          const b =
            t < 500
              ? smooth(0, 500, t)
              : t > m.blueFor - 700
                ? 1 - smooth(m.blueFor - 700, m.blueFor, t)
                : 1;
          if (t >= m.blueFor) m.blueAt = -1;
          else {
            color = mix(m.tone, BLUE, b);
            alpha = Math.max(alpha, b * 0.95);
          }
        }
        let theta = 0;
        let s = 1;
        if (m.turnAt >= 0 && now >= m.turnAt) {
          const p = (now - m.turnAt) / TURN_MS;
          if (p >= 1) {
            m.turnAt = -1;
            if (!m.square) m.k = (m.k + 1) % 4;
          } else ({ theta, scale: s } = pose(p));
        }
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.translate(ox + m.c * cell + h, m.r * cell + h);
        if (theta) {
          ctx.rotate(theta);
          ctx.scale(s, s);
        }
        if (m.square) ctx.fillRect(-h, -h, cell, cell);
        else {
          const [px, py] = [
            [-h, -h],
            [h, -h],
            [h, h],
            [-h, h],
          ][m.k]!;
          ctx.beginPath();
          ctx.moveTo(px!, py!);
          ctx.arc(px!, py!, cell, (m.k * Math.PI) / 2, ((m.k + 1) * Math.PI) / 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
      if (signature) drawSignature(now);
      ctx.globalAlpha = 1;
    };

    // The mark assembling in the pattern: 2 × 2 cells, the P ghosted, the pixel in blue.
    const SIG_IN = 600;
    const SIG_OUT = 700;
    const sigShow = (now: number) => {
      if (!signature) return 0;
      const t = now - signature.at;
      const end = SIG_IN + signature.hold;
      if (t < 0) return 0;
      if (t < SIG_IN) return smooth(0, SIG_IN, t);
      if (t < end) return 1;
      return 1 - smooth(end, end + SIG_OUT, t);
    };
    const drawSignature = (now: number) => {
      const sig = signature!;
      const show = sigShow(now);
      if (now - sig.at > SIG_IN + sig.hold + SIG_OUT) {
        signature = null;
        return;
      }
      const size = cell * 2;
      const k = size / SYMBOL.size;
      const x0 = ox + sig.c * cell;
      const y0 = sig.r * cell;
      ctx.save();
      ctx.globalAlpha = show;
      ctx.translate(x0, y0);
      ctx.scale(k, k);
      ctx.fillStyle = GHOST;
      ctx.fill(pPath);
      ctx.restore();
      // The pixel turns once the mark has settled.
      const p = (now - sig.at - SIG_IN - 250) / TURN_MS;
      const { theta, scale } = p > 0 && p < 1 ? pose(p) : { theta: 0, scale: 1 };
      ctx.save();
      ctx.globalAlpha = show;
      ctx.fillStyle = BLUE;
      ctx.translate(x0 + 166 * k, y0 + 166 * k);
      ctx.rotate(theta);
      ctx.scale(scale, scale);
      ctx.fillRect(-50 * k, -50 * k, 100 * k, 100 * k);
      ctx.restore();
    };

    // ---- the rhythm --------------------------------------------------------------------
    // Where the words are, measured when an accent is placed: the blue module and the mark keep
    // off them.
    const words = () => {
      const origin = box.getBoundingClientRect();
      return [...hero.querySelectorAll('h1, h2, h3, p, li, address, a, button')]
        .map((el) => el.getBoundingClientRect())
        .filter((q) => q.width > 0 && q.height > 0)
        .map((q) => ({
          l: q.left - origin.left,
          t: q.top - origin.top,
          r: q.right - origin.left,
          b: q.bottom - origin.top,
        }));
    };
    const clearOf = (rects: ReturnType<typeof words>, c: number, r: number, span = 1) => {
      const x0 = ox + c * cell;
      const y0 = r * cell;
      const x1 = x0 + span * cell;
      const y1 = y0 + span * cell;
      return !rects.some((w) => w.l < x1 && w.r > x0 && w.t < y1 && w.b > y0);
    };
    const pick = (min: number, ok: (m: Module) => boolean = () => true) => {
      for (let tries = 0; tries < 24; tries++) {
        const m = mods[Math.floor(Math.random() * mods.length)];
        if (m && m.weight >= min && m.turnAt < 0 && m.to > 0 && ok(m)) return m;
      }
      return null;
    };
    const turnOne = (now: number) => {
      const m = pick(0.2);
      if (m) m.turnAt = now;
    };
    const blueOne = (now: number) => {
      if (signature || mods.some((m) => m.blueAt >= 0)) return;
      const rects = words();
      const m = pick(0.55, (mod) => clearOf(rects, mod.c, mod.r));
      if (!m) return;
      m.blueAt = now;
      m.blueFor = 3400;
      m.turnAt = now + 600;
    };
    const shuffle = (now: number) => {
      const out = pick(0.15);
      if (out && out.blueAt < 0) {
        Object.assign(out, { from: opacity(out, now), to: 0, fadeAt: now, fadeMs: 700 });
      }
      for (let tries = 0; tries < 12; tries++) {
        const c = Math.floor(Math.random() * cols);
        const r = Math.floor(Math.random() * rows);
        const weight = reach(c, r);
        if (grid[r * cols + c] || weight < 0.25) continue;
        const m = make(c, r, Math.random, weight);
        Object.assign(m, { from: 0, to: 1, fadeAt: now, fadeMs: 900, turnAt: now });
        grid[r * cols + c] = m;
        mods.push(m);
        break;
      }
      // Clear away what has finished leaving.
      mods = mods.filter((m) => {
        const gone = m.to === 0 && now > m.fadeAt + m.fadeMs;
        if (gone) grid[m.r * cols + m.c] = null;
        return !gone;
      });
    };
    const sign = (now: number) => {
      const rects = words();
      for (let tries = 0; tries < 20; tries++) {
        const c = Math.floor(Math.random() * (cols - 1));
        const r = 1 + Math.floor(Math.random() * Math.max(1, rows - 3));
        if (reach(c, r) < 0.6 || reach(c + 1, r + 1) < 0.6) continue;
        if (!clearOf(rects, c, r, 2)) continue;
        signature = { c, r, at: now, hold: 2600 };
        return;
      }
    };

    let raf = 0;
    let running = false;
    let nextTurn = 0;
    let nextBlue = 0;
    let nextShuffle = 0;
    let nextSign = 0;
    const schedule = (now: number) => {
      nextTurn = now + 400;
      nextBlue = now + 1800;
      nextShuffle = now + 1200;
      nextSign = now + 4200;
    };

    const frame = (now: number) => {
      if (now > nextTurn) {
        turnOne(now);
        nextTurn = now + 380 + Math.random() * 520;
      }
      if (now > nextBlue) {
        blueOne(now);
        nextBlue = now + 4800 + Math.random() * 3000;
      }
      if (now > nextShuffle) {
        shuffle(now);
        nextShuffle = now + 1300 + Math.random() * 1400;
      }
      if (now > nextSign && !signature) {
        sign(now);
        nextSign = now + 8000 + Math.random() * 4000;
      }
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    build();
    draw(performance.now());
    box.setAttribute('data-ready', '');

    if (still) {
      const onResize = () => {
        build();
        draw(performance.now());
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const paused = () => pausable?.hasAttribute('data-paused') ?? false;
    let onScreen = true;
    const update = () => {
      const go = onScreen && !document.hidden && !paused();
      if (go && !running) {
        running = true;
        schedule(performance.now());
        raf = requestAnimationFrame(frame);
      } else if (!go && running) {
        running = false;
        cancelAnimationFrame(raf);
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
    let lastW = W;
    const onResize = () => {
      if (box.clientWidth === lastW && box.clientHeight === H) return;
      lastW = box.clientWidth;
      build();
      draw(performance.now());
    };
    window.addEventListener('resize', onResize);

    // Under the pointer, a module turns.
    let lastCell = -1;
    const onMove = (event: PointerEvent) => {
      if (!running || event.pointerType !== 'mouse') return;
      const rect = cv.getBoundingClientRect();
      const c = Math.floor((event.clientX - rect.left - ox) / cell);
      const r = Math.floor((event.clientY - rect.top) / cell);
      if (c < 0 || c >= cols || r < 0 || r >= rows) return;
      const at = r * cols + c;
      if (at === lastCell) return;
      lastCell = at;
      const m = grid[at];
      if (m && m.turnAt < 0 && m.to > 0) m.turnAt = performance.now();
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
  }, [bottom, tone, clearFrom, clearTo]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
