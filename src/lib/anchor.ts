'use client';

import { useEffect, useState } from 'react';

/**
 * The item a visitor last went to on this one-page site — a service or a solution bundle, by its
 * anchor. A menu announces the anchor it sends the visitor to (Next's same-page links change the
 * URL without a `hashchange`), and anything that cares — the menus marking their active item, the
 * Solutions list opening the right row — listens. The address bar's own hash seeds it on load.
 *
 * Once services have pages of their own, the menus' active item becomes a pathname match instead.
 */
const EVENT = 'pk:anchor';

export function announceAnchor(href: string) {
  const hash = href.includes('#') ? `#${href.split('#')[1]}` : '';
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: hash }));
}

export function useAnchor() {
  const [anchor, setAnchor] = useState('');
  useEffect(() => {
    setAnchor(window.location.hash);
    const onAnchor = (event: Event) => setAnchor((event as CustomEvent<string>).detail);
    const onHash = () => setAnchor(window.location.hash);
    window.addEventListener(EVENT, onAnchor);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener(EVENT, onAnchor);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);
  return anchor;
}
