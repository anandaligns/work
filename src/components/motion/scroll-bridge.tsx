'use client';

import type Lenis from 'lenis';
import { useLenis } from 'lenis/react';
import { useEffect } from 'react';

/**
 * What the site asks of beUI's smooth scroll (`@beui/smooth-scroll`) beyond its provider:
 *
 * - links to a place on the same page glide there through Lenis, stopping clear of the header
 *   (88px), as Lenis's own `anchors` option would — beUI's provider doesn't pass that option on;
 * - the running Lenis is shared on `window.__lenis` for the few controls that steer the page
 *   themselves (the phone menu holding it still, the Solutions list bringing a row back into view).
 *
 * Under reduced motion there is no Lenis, so the page scrolls natively and `[id]`'s scroll margin
 * keeps a target clear of the header.
 */
export function ScrollBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const global = window as Window & { __lenis?: Lenis };
    global.__lenis = lenis;
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const link = (event.target as Element | null)?.closest?.('a[href*="#"]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname)
        return;
      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) lenis.scrollTo(target, { offset: -88 });
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      if (global.__lenis === lenis) delete global.__lenis;
    };
  }, [lenis]);

  return null;
}
