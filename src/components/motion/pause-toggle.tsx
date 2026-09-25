'use client';

import { type ReactNode, useState } from 'react';

import { Icon } from '../ui/icon';

/**
 * Anything that moves on its own for more than five seconds needs a way to stop it that is not a
 * pointer — WCAG 2.2.2. One button, one name, `aria-pressed` for the state.
 */
export function Pausable({
  label,
  tone = 'paper',
  className = '',
  buttonClassName = 'bottom-5 left-5',
  children,
}: {
  label: string;
  tone?: 'paper' | 'night';
  className?: string;
  /** Where the button sits in the wrapper; lower left unless the content needs that corner. */
  buttonClassName?: string;
  children: ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`relative ${className}`} data-pausable="" data-paused={paused || undefined}>
      {children}
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className={`absolute ${buttonClassName} z-10 grid size-9 place-items-center rounded-full border backdrop-blur transition-colors ${
          tone === 'night'
            ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
            : 'border-line bg-white text-ink hover:bg-fill'
        }`}
      >
        <span className="sr-only">Pause {label}</span>
        {/* Tabler's play and pause, filled in so they read at this size. */}
        <Icon name={paused ? 'play' : 'pause'} size={14} strokeWidth={2} fill="currentColor" />
      </button>
    </div>
  );
}
