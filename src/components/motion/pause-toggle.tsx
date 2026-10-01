'use client';

import type { ReactNode } from 'react';

/**
 * The wrapper round anything that moves on its own. It used to carry a pause button (WCAG 2.2.2);
 * at the owner's request the button is gone, and what moves stops only for readers who ask their
 * system for reduced motion — every animation here honours `prefers-reduced-motion`. The wrapper
 * and its `data-pausable` mark stay, so the pieces inside keep their hooks.
 */
export function Pausable({
  className = '',
  children,
}: {
  /** What moves, as the old button named it. Kept so callers need not change. */
  label?: string;
  tone?: 'paper' | 'night';
  className?: string;
  buttonClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${className}`} data-pausable="">
      {children}
    </div>
  );
}
