'use client';

import { type ReactNode, useEffect, useState } from 'react';

/**
 * A marquee's second copy, which only makes the loop seamless — so it is drawn only where the
 * marquee shows (below `max`) and only once the page has hydrated, seconds before the first copy
 * has drifted far enough for it to come into view. Its track slides by a fixed distance
 * (`.marquee__track--shift`, `--marquee-shift`), the width of one copy, so the motion is the same
 * before and after it arrives.
 */
export function MarqueeCopy({ max = 767, children }: { max?: number; children: ReactNode }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const narrow = window.matchMedia(`(max-width: ${max}px)`);
    const update = () => setShow(narrow.matches);
    update();
    narrow.addEventListener('change', update);
    return () => narrow.removeEventListener('change', update);
  }, [max]);
  return show ? children : null;
}
