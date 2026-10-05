'use client';

import { ScrollTo } from '@/components/motion/scroll-to';

import { Icon } from '../ui/icon';

/**
 * The footer's way back up: the words and an arrow, on beUI's scroll-to (`@beui/scroll-to`), which
 * glides through the page's smooth scroll. Focus lands on the page's main region, so a keyboard
 * user starts again from the top too.
 */
export function BackToTop({ className = '' }: { className?: string }) {
  return (
    <ScrollTo
      to={0}
      onClickCapture={() => document.getElementById('main')?.focus({ preventScroll: true })}
      className={`roll gap-1.5 ${className}`}
    >
      <span className="roll__text">
        <span className="roll__label">Back to top</span>
        <span className="roll__label" aria-hidden="true">
          Back to top
        </span>
      </span>
      <Icon name="arrow" size={14} strokeWidth={1.8} className="-rotate-90" />
    </ScrollTo>
  );
}
