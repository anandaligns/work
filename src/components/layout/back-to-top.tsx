'use client';

import { Icon } from '../ui/icon';

/**
 * The footer's way back up: the words and an arrow, gliding on Lenis where it runs. Focus lands
 * on the page's main region, so a keyboard user starts again from the top too.
 */
export function BackToTop({ className = '' }: { className?: string }) {
  const toTop = () => {
    const lenis = (window as Window & { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };
  return (
    <button type="button" onClick={toTop} className={`roll gap-1.5 ${className}`}>
      <span className="roll__text">
        <span className="roll__label">Back to top</span>
        <span className="roll__label" aria-hidden="true">
          Back to top
        </span>
      </span>
      <Icon name="arrow" size={14} strokeWidth={1.8} className="-rotate-90" />
    </button>
  );
}
