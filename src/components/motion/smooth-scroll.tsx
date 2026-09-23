'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

/**
 * aoutive's scroll: Lenis at `duration: 2` — Framer's "Smooth Scroll" component at intensity 20,
 * which it divides by ten. Wheel input eases to its target over two seconds on Lenis's default
 * expo curve, which is the long, weighted glide the recording shows.
 *
 * Anchor links go through Lenis too, offset for the header. Reduced motion gets native scrolling
 * and nothing is constructed at all.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 2, autoRaf: true, anchors: { offset: -88 } });
    // Exposed for the few controls that scroll the page themselves (back to top), so they glide
    // on the same curve instead of fighting it with a native smooth scroll.
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);
  return null;
}
