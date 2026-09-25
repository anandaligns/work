import type { CSSProperties } from 'react';

import { Icon, type IconName } from '../ui/icon';

/** What happens after a message: three steps on the Process section's track. */
const STEPS: { icon: IconName; text: string }[] = [
  { icon: 'eye', text: 'We read your message.' },
  { icon: 'phone', text: 'We call or message you.' },
  {
    icon: 'check',
    text: 'You get a clear next step: a package, a System Blueprint, or honest advice.',
  },
];

export function NextSteps({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <div>
      <Heading className="font-display text-h3 tracking-[var(--tracking-heading)] text-ink">
        What happens next
      </Heading>
      <ol className="relative mt-8">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-line"
        />
        {STEPS.map((step, i) => (
          <li
            key={step.text}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className="relative flex gap-5 pb-8 last:pb-0"
          >
            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-ink bg-white text-ink">
              <Icon name={step.icon} size={17} />
            </span>
            <p className="pt-2 text-body text-ink">
              <span className="mr-2 font-tech text-xs text-ink-2">0{i + 1}</span>
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
