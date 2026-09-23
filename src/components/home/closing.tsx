import { contact, headings, START } from '@/content/site';

import { Band } from '../layout/band';
import { FillText } from '../motion/fill-text';
import { RollLink } from '../ui/roll-link';

/**
 * aoutive's closing band: the ask on the left, a quiet line drawing on the right — a circle, a
 * square and a triangle in outline, turning slowly with the scroll.
 */
export function Closing() {
  return (
    <Band id="start" labelledBy="start-heading" className="overflow-hidden py-24 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2
            id="start-heading"
            className="text-[clamp(2.4rem,1.5rem+3.4vw,4.25rem)] leading-[1.02] tracking-[var(--tracking-display)]"
          >
            {headings.cta.lead} <FillText text={headings.cta.fill} />
          </h2>
          <p data-reveal="" className="mt-6 max-w-md text-lead text-ink-2">
            Fill in a short form or message us on WhatsApp. We’ll tell you honestly if we’re the
            right fit.
          </p>
          <div
            data-reveal=""
            style={{ ['--i' as string]: 1 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <RollLink href={START.href} size="lg">
              {START.label}
            </RollLink>
            <RollLink href={contact.whatsappHref} variant="line" size="lg" external>
              Chat on WhatsApp
            </RollLink>
          </div>
        </div>
        <div aria-hidden="true" data-parallax="-40" className="mx-auto w-full max-w-md">
          <svg
            viewBox="0 0 400 320"
            className="w-full"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="1.25"
          >
            <circle cx="120" cy="190" r="100" />
            <circle
              cx="120"
              cy="190"
              r="100"
              strokeDasharray="2 6"
              transform="rotate(18 120 190)"
              opacity="0.4"
            />
            <rect x="170" y="40" width="150" height="150" rx="2" />
            <path d="M245 60 330 300H160z" />
            <path d="M20 300h360" stroke="#d6d6d6" />
            <circle cx="245" cy="115" r="5" fill="#1a1a1a" />
            <circle cx="120" cy="190" r="5" fill="#6d5cff" stroke="none" />
            <circle cx="330" cy="300" r="5" fill="#1fb866" stroke="none" />
          </svg>
        </div>
      </div>
    </Band>
  );
}
