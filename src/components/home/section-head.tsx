import type { Heading } from '@/content/site';

import { FillText } from '../motion/fill-text';

/**
 * Every section opens the same way: a small label, a heading in two halves — the first in ink,
 * the second filling with ink as it scrolls into view — and an optional line beneath.
 */
export function SectionHead({
  id,
  eyebrow,
  heading,
  intro,
  align = 'left',
  tone = 'paper',
  className = '',
}: {
  id: string;
  eyebrow: string;
  heading: Heading;
  intro?: string;
  align?: 'left' | 'center';
  tone?: 'paper' | 'night';
  className?: string;
}) {
  const centred = align === 'center';
  return (
    <div className={`${centred ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      <p
        data-reveal=""
        className={`eyebrow inline-flex items-center gap-2 ${tone === 'night' ? 'text-white/70' : ''}`}
      >
        <span className={`size-1.5 ${tone === 'night' ? 'bg-white/70' : 'bg-ink'}`} />
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className={`mt-5 text-h2 tracking-[var(--tracking-heading)] ${tone === 'night' ? 'text-white' : 'text-ink'}`}
      >
        {heading.lead} <FillText text={heading.fill} />
      </h2>
      {intro ? (
        <p
          data-reveal=""
          style={{ ['--i' as string]: 1 }}
          className={`mt-5 text-body ${centred ? 'mx-auto max-w-xl' : 'max-w-lg'} ${tone === 'night' ? 'text-white/70' : 'text-ink-2'}`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
