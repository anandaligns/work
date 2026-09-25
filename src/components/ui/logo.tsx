'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { HOLD_MS, turn } from '../motion/quarter-turn';
import { BrandLockup } from './brand';

/**
 * The lockup as a link home, with its pixel alive.
 *
 * The pixel makes the identity's quarter-turn once the page has settled (after the motion spec's
 * 0.8s rest), again whenever the lockup is pointed at or focused, and — in the header — each time
 * the reader moves into a new section (`turnKey`), so the one part of the mark that moves keeps
 * time with the reader. It never loops on its own. Inline, so it paints with the first byte of
 * HTML.
 */
export function Logo({
  tone = 'ink',
  turnKey,
  className = 'h-[1.3rem] w-auto',
}: {
  /** `inherit` takes the colour of whatever it sits in — the header sets it by day or night. */
  tone?: 'ink' | 'white' | 'inherit';
  turnKey?: string;
  className?: string;
}) {
  const pixel = useRef<SVGPathElement>(null);
  const first = useRef(true);

  useEffect(() => {
    turn(pixel.current, HOLD_MS);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    turn(pixel.current);
  }, [turnKey]);

  return (
    <Link
      href="/"
      aria-label="Pixel Kinetix home"
      className="inline-flex items-center"
      onPointerEnter={() => turn(pixel.current)}
      onFocus={() => turn(pixel.current)}
    >
      <BrandLockup
        pixelRef={pixel}
        className={`${className} transition-colors duration-300 ${tone === 'white' ? 'text-white' : tone === 'ink' ? 'text-ink' : ''}`}
      />
    </Link>
  );
}
