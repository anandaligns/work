import type { CSSProperties } from 'react';

import { headings, START, steps } from '@/content/site';

import { Band } from '../layout/band';
import { RollLink } from '../ui/roll-link';
import { Icon, type IconName } from '../ui/icon';
import { SectionHead } from './section-head';

/**
 * Six steps on a track that fills as you scroll. The list carries `--p` (written by
 * `ScrollEffects` for every `[data-track]`), each step its index; a step lights when the fill
 * passes it, in CSS alone. The left column is sticky, so the heading stays while the steps pass.
 */
const ICONS: IconName[] = ['search', 'file', 'pen', 'code', 'rocket', 'shield'];

export function Process() {
  return (
    <Band id="process" labelledBy="process-heading" className="py-24 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            id="process"
            eyebrow="How it works"
            heading={headings.process}
            intro="Six simple steps. You always know what happens next — it’s all in your client portal."
          />
          <div data-reveal="" style={{ ['--i' as string]: 2 }} className="mt-8">
            <RollLink href={START.href}>{START.label}</RollLink>
          </div>
        </div>
        <ol
          data-track=""
          className="process-track relative"
          style={{ '--n': steps.length } as CSSProperties}
        >
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-line"
          />
          <span
            aria-hidden="true"
            className="process-fill absolute top-2 bottom-2 left-[1.1875rem] w-px origin-top bg-ink"
          />
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="process-step relative flex gap-6 pb-12 last:pb-0"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="process-dot relative z-10 grid size-10 shrink-0 place-items-center rounded-full border">
                <Icon name={ICONS[i] ?? 'spark'} size={17} />
              </span>
              <div className="pt-1.5">
                <p className="font-tech text-xs text-ink-2">Step 0{i + 1}</p>
                <h3 className="mt-1 text-h4 font-medium tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 max-w-md text-body text-ink-2">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}
