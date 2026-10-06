'use client';

import { useEffect, useRef, useState } from 'react';

import { PixelReveal } from '../motion/pixel-reveal';
import { PORTAL_VIEWS, PortalMock } from './native-mocks';

/**
 * The portal's dashboard turning through its five parts on its own — the project's stages, its
 * files, the agreement, the invoices and the requests — the sidebar lighting each, the chip saying
 * what just happened there and the table changing. It holds while the pointer rests on it, and
 * under reduced motion stays on the first. The picture repeats what the section says, so it is
 * hidden from assistive tech.
 */
const DWELL = 5000;

export function PortalTabs() {
  const [at, setAt] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  useEffect(() => {
    if (hovered || reduce.current) return;
    const timer = window.setTimeout(() => setAt((i) => (i + 1) % PORTAL_VIEWS.length), DWELL);
    return () => window.clearTimeout(timer);
  }, [at, hovered]);

  return (
    <div
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <PixelReveal
        className="mx-auto mt-12 h-[19rem] max-w-5xl sm:h-[28rem] lg:h-[34rem]"
        delay={100}
      >
        <div aria-hidden="true" className="absolute inset-0">
          <PortalMock view={PORTAL_VIEWS[at]!.view} />
        </div>
      </PixelReveal>
    </div>
  );
}
