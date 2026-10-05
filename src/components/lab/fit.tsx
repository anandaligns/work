'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

/**
 * A mockup drawn on a canvas of fixed size (`w` × `h`), scaled to fit the panel it sits in and
 * centred there — so one composition reads the same on a phone and a wide screen. The canvas
 * fades in once it has been measured, so nothing jumps.
 */
export function Fit({
  w,
  h,
  max = 1.15,
  children,
}: {
  w: number;
  h: number;
  /** The most it may grow past its own size. */
  max?: number;
  children: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [k, setK] = useState<number | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setK(Math.min(r.width / w, r.height / h, max));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [w, h, max]);

  return (
    <div ref={box} className="absolute inset-0">
      <div
        className="absolute top-1/2 left-1/2 transition-opacity duration-500"
        style={{
          width: w,
          height: h,
          transform: `translate(-50%, -50%) scale(${k ?? 0.5})`,
          opacity: k ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * A mockup on a canvas of fixed size that covers its panel rather than fitting inside it, as
 * Lightfield's product windows do: scaled until it fills the panel both ways (within `min` and
 * `max`), held to the top left, and cut by the panel's right and bottom edges, which fade out
 * (`.edge-fade`). Whatever matters goes toward the top left; the rest may run off.
 */
export function Bleed({
  w,
  h,
  min = 0.45,
  max = 1.2,
  children,
}: {
  w: number;
  h: number;
  min?: number;
  max?: number;
  children: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [k, setK] = useState<number | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setK(Math.min(Math.max(r.width / w, r.height / h, min), max));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [w, h, min, max]);

  return (
    <div ref={box} className="edge-fade absolute inset-0 overflow-hidden">
      <div
        className="absolute top-0 left-0 origin-top-left transition-opacity duration-500"
        style={{ width: w, height: h, transform: `scale(${k ?? 1})`, opacity: k ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
