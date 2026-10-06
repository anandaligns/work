'use client';

import { useEffect, useRef, useState } from 'react';

import { PixelReveal } from '../motion/pixel-reveal';
import { PORTAL_VIEWS, PortalMock } from './native-mocks';

/**
 * The portal's dashboard turning through its five parts on its own — the project's stages, its
 * files, the agreement, the invoices and the requests — the sidebar lighting each, the chip saying
 * what just happened there and the table changing, on a panel after the home Services pictures:
 * white on a hairline, a fine grid fading toward its edges. It holds while the pointer rests on it, and
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
      <div className="ground ground--grid mx-auto mt-12 max-w-5xl overflow-hidden rounded-[1.75rem] border border-line px-3 pt-6 sm:px-8 sm:pt-10">
        <PixelReveal cover="#ffffff" className="h-[17rem] sm:h-[26rem] lg:h-[31rem]" delay={100}>
          <div aria-hidden="true" className="absolute inset-0">
            <PortalMock view={PORTAL_VIEWS[at]!.view} />
          </div>
        </PixelReveal>
      </div>
    </div>
  );
}
