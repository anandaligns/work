'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { START } from '@/content/site';

import { Icon } from '../ui/icon';

/**
 * Get Started on a phone: pk-static's side rail, kept as a slim graphite tab on the right edge.
 */
/** pk-static's rail arrow: a plain right arrow, turned by the rail's CSS. */
function RailArrow() {
  return <Icon name="arrow" strokeWidth={1.8} />;
}

/**
 * Get Started on a phone, on every page: the rail's slim tab on the right edge, halfway down,
 * tucked 0.5rem off-screen and sliding in when touched — in the site's ink button, its gradient,
 * ring and highlight. From 768px the header carries Get Started, so the tab is phones only; on the
 * Start a project page itself, it would only lead back, so it stays off there.
 */
export function MobileStart() {
  const path = usePathname();
  if (path === START.href) return null;
  return (
    <div className="side-rail md:hidden">
      <Link href={START.href} className="side-rail__start">
        <span className="signal" aria-hidden="true" />
        <span>{START.label}</span>
        <span className="side-rail__arrow" aria-hidden="true">
          <RailArrow />
          <RailArrow />
        </span>
      </Link>
    </div>
  );
}
