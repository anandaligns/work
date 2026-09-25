import { contact, headings, START } from '@/content/site';

import { Band } from '../layout/band';
import { FillText } from '../motion/fill-text';
import { Pausable } from '../motion/pause-toggle';
import { RollLink } from '../ui/roll-link';
import { BrandArt } from '../visuals/brand-art';

/**
 * aoutive's closing band: the ask on the left and, on the right, the identity's website hero art —
 * its modules turning, the symbol at the centre — drifting a little with the scroll.
 */
export function Closing() {
  return (
    <Band id="start" labelledBy="start-heading" className="overflow-hidden py-24 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 id="start-heading" className="text-display tracking-[var(--tracking-display)]">
            {headings.cta.lead} <FillText text={headings.cta.fill} />
          </h2>
          <p data-reveal="" className="mt-6 max-w-md text-lead text-ink-2">
            Message us on WhatsApp, call or email. We’ll tell you honestly if we’re the right fit.
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
        {/* The identity's website hero art: modules turning on their slow rhythm, the symbol's
            pixel turning at the centre. It moves on its own, so it can be paused. */}
        <div data-parallax="-40" className="mx-auto w-full max-w-[26rem] lg:justify-self-end">
          <Pausable label="the brand art" tone="night" buttonClassName="bottom-3 left-3">
            <BrandArt className="block h-auto w-full shadow-[0_40px_80px_-40px_rgb(11_13_18/0.55)]" />
          </Pausable>
        </div>
      </div>
    </Band>
  );
}
