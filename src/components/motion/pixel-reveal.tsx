'use client';

import { type ReactNode, useEffect, useRef } from 'react';

/**
 * aoutive's pixel dissolve, without WebGL.
 *
 * The template runs a three.js shader over each illustration (`gridSize 20`, `revealDuration 1.6`,
 * `direction up`): a reveal line sweeps the image, and a band 20% deep ahead of it lights random
 * grid cells in a pixel colour before the picture shows through. The template starts its line 35%
 * outside the art, which reads as half a second of nothing on a site this long; this starts it 12%
 * out, so the pixels arrive almost as soon as the art does. This is the same rule on a 2D
 * canvas laid over the artwork — cells behind the line are cleared, cells well ahead are painted
 * with the ground colour, and cells inside the band flicker grey with a probability that rises as
 * the line approaches. One canvas, one rAF loop for 1.6s, then the canvas is hidden.
 *
 * Reduced motion, or an engine without IntersectionObserver, never draws it: the art is simply
 * there, as it is in the server HTML.
 *
 * `PixelReveal` wraps what it reveals; `PixelCover` is the canvas alone, for a parent that is
 * already laid out (a pricing card). Either can play `now` — on mount, wherever it is — which is
 * how a tab's new content arrives: dissolved in, as the section was the first time it was seen.
 * On a dark ground the flicker is in dark greys.
 */
const CELL = 20;
const BAND = 0.2;
const MARGIN = 0.12;
const DURATION = 1600;
const GREYS = {
  light: ['#eceef2', '#e2e5eb', '#d8dbe3', '#f2f3f6'],
  dark: ['#171b28', '#20242f', '#2a2e3a', '#12151e'],
};

type Dissolve = {
  cover?: string;
  delay?: number;
  /** Play on mount rather than on first sight, and even if already on screen. */
  now?: boolean;
  /** How long the sweep takes, in ms — aoutive's 1.6s unless the caller needs it sooner. */
  duration?: number;
  tone?: keyof typeof GREYS;
};

const hash = (x: number, y: number) => {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return s - Math.floor(s);
};
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function DissolveCanvas({
  cover = '#fcfcfd',
  delay = 0,
  now = false,
  tone = 'light',
  duration = DURATION,
}: Dissolve) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const el = cv?.parentElement;
    if (!el || !cv) return;
    const greys = GREYS[tone];
    // A canvas hidden by a play that finished shows again for the next one.
    cv.style.display = '';
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      cv.style.display = 'none';
      return;
    }
    // Already on screen at mount: the reader is looking at it, so do not cover it — unless it was
    // put there to be revealed.
    const start = el.getBoundingClientRect();
    if (!now && start.top < window.innerHeight * 0.85 && start.bottom > 0) {
      cv.style.display = 'none';
      return;
    }

    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let cols = 0;
    let rows = 0;
    const size = () => {
      const { width, height } = el.getBoundingClientRect();
      cv.width = Math.ceil(width * dpr);
      cv.height = Math.ceil(height * dpr);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const paint = (progress: number) => {
      ctx.clearRect(0, 0, cols * CELL, rows * CELL);
      // The line travels bottom to top: 0 = below the art, 1 = above it.
      const line = -MARGIN + progress * (1 + 2 * MARGIN);
      for (let r = 0; r < rows; r++) {
        const coord = 1 - (r + 0.5) / rows; // 1 at the top row, 0 at the bottom
        for (let c = 0; c < cols; c++) {
          const d = coord - line;
          const rand = hash(c, r);
          if (d <= 0) {
            // Behind the line: revealed, with a thin trailing sparkle.
            if (-d < BAND * 0.35 && rand > 1 + d / (BAND * 0.35)) {
              ctx.fillStyle = greys[(c + r) % greys.length]!;
              ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
            }
            continue;
          }
          if (d < BAND && rand > d / BAND) {
            ctx.fillStyle = greys[(c * 7 + r) % greys.length]!;
          } else {
            ctx.fillStyle = cover;
          }
          ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
        }
      }
    };

    size();
    paint(0);
    let raf = 0;
    const play = () => {
      const t0 = performance.now() + delay;
      const tick = (at: number) => {
        const t = Math.min(1, Math.max(0, (at - t0) / duration));
        paint(ease(t));
        if (t < 1) raf = requestAnimationFrame(tick);
        else cv.style.display = 'none';
      };
      raf = requestAnimationFrame(tick);
    };
    if (now) {
      play();
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        play();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [cover, delay, now, tone, duration]);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}

export function PixelReveal({
  children,
  className = '',
  ...dissolve
}: Dissolve & { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <DissolveCanvas {...dissolve} />
    </div>
  );
}

/** The dissolve alone, laid over its parent — which must be positioned. */
export function PixelCover(props: Dissolve) {
  return <DissolveCanvas {...props} />;
}
