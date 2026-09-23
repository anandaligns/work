'use client';

import { type ReactNode, useEffect, useRef } from 'react';

/**
 * A row that drifts — and moves with the page. At rest it slides at `speed` px/s; while the page
 * scrolls it runs faster with the scroll's pace and turns to follow its direction (scrolling back
 * up sends every row the other way), then eases back to its drift. The Framer templates' velocity
 * marquee, on one rAF loop per row that runs only while the row is on screen.
 *
 * The content is drawn twice, the second copy hidden from assistive tech, and the row wraps by one
 * copy's width. Pointing at the row holds it so it can be read; its `Pausable` stops it. Under
 * reduced motion it does not move at all, and the CSS shows the first copy wrapped instead.
 */
export function KineticMarquee({
  children,
  direction = -1,
  speed = 34,
  className = '',
}: {
  children: ReactNode;
  /** -1 drifts left, 1 drifts right. */
  direction?: -1 | 1;
  speed?: number;
  className?: string;
}) {
  const row = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = row.current;
    const tr = track.current;
    if (!el || !tr) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const pausable = el.closest<HTMLElement>('[data-pausable]');

    let copy = (tr.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
    const ro = new ResizeObserver(() => {
      copy = (tr.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
    });
    if (tr.firstElementChild) ro.observe(tr.firstElementChild);

    let x = direction === 1 ? -copy : 0;
    let boost = 0;
    let heading = 1; // the page's last scroll direction: 1 down, -1 up
    let lastY = window.scrollY;
    let last = performance.now();
    let held = false;
    let raf = 0;
    let running = false;

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) heading = dy > 0 ? 1 : -1;
      // The scroll's pace in px per frame-ish, eased in and out so the row never jerks.
      const target = Math.min(7, Math.abs(dy) / Math.max(1, dt / 16) / 6);
      boost += (target - boost) * (target > boost ? 0.18 : 0.05);
      if (!held && copy > 0) {
        x += direction * heading * speed * (1 + boost) * (dt / 1000);
        if (x <= -copy) x += copy;
        if (x > 0) x -= copy;
        tr.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      }
      raf = requestAnimationFrame(frame);
    };

    const paused = () => pausable?.hasAttribute('data-paused') ?? false;
    let onScreen = false;
    const update = () => {
      const go = onScreen && !document.hidden && !paused();
      if (go && !running) {
        running = true;
        last = performance.now();
        lastY = window.scrollY;
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
    io.observe(el);
    const mo = pausable ? new MutationObserver(update) : null;
    if (pausable) mo!.observe(pausable, { attributes: true, attributeFilter: ['data-paused'] });
    document.addEventListener('visibilitychange', update);
    const hold = () => (held = true);
    const release = () => (held = false);
    el.addEventListener('pointerenter', hold);
    el.addEventListener('pointerleave', release);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo?.disconnect();
      document.removeEventListener('visibilitychange', update);
      el.removeEventListener('pointerenter', hold);
      el.removeEventListener('pointerleave', release);
    };
  }, [direction, speed]);

  return (
    <div ref={row} className={`kinetic ${className}`}>
      <div ref={track} className="kinetic__track">
        <div className="kinetic__copy">{children}</div>
        <div className="kinetic__copy" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
