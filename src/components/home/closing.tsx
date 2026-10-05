import type { ReactNode } from 'react';

import {
  CLOSING_LINE,
  contact,
  type Heading,
  headings,
  startFor,
  whatsappAbout,
} from '@/content/site';

import { Band } from '../layout/band';
import { FillText } from '../motion/fill-text';
import { Pausable } from '../motion/pause-toggle';
import { RollLink } from '../ui/roll-link';
import { BrandArt } from '../visuals/brand-art';

/**
 * aoutive's closing band: the ask on the left — a heading in two halves, one line, Get Started and
 * WhatsApp — and a picture on the right, drifting a little with the scroll.
 *
 * Every page closes here with its own heading, its own `?interest=` on Get Started, and a WhatsApp
 * message naming its topic. The picture is the page's Connect scene; About alone keeps the
 * identity's brand tile, its modules turning, which is the default.
 */
export function Closing({
  heading = headings.cta,
  line = CLOSING_LINE,
  interest,
  topic,
  visual,
}: {
  heading?: Heading;
  line?: string;
  /** What the contact form preselects. */
  interest?: string;
  /** What the WhatsApp message asks about. */
  topic?: string;
  visual?: ReactNode;
}) {
  return (
    <Band id="start" labelledBy="start-heading" className="overflow-hidden py-24 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 id="start-heading" className="text-title tracking-[var(--tracking-heading)]">
            {heading.lead} <FillText text={heading.fill} />
          </h2>
          <p data-reveal="" className="mt-6 max-w-md text-lead text-ink-2">
            {line}
          </p>
          <div
            data-reveal=""
            style={{ ['--i' as string]: 1 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <RollLink href={startFor(interest)} size="lg">
              Get Started
            </RollLink>
            <RollLink
              href={topic ? whatsappAbout(topic) : contact.whatsappHref}
              variant="kinetic"
              size="lg"
              external
            >
              Chat on WhatsApp
            </RollLink>
          </div>
        </div>
        <div data-parallax="-40" className="mx-auto w-full max-w-[30rem] lg:justify-self-end">
          {visual ?? (
            // The identity's website hero art: modules turning on their slow rhythm, the symbol's
            // pixel turning at the centre. It moves on its own, so it can be paused.
            <div className="mx-auto max-w-[26rem]">
              <Pausable label="the brand art" tone="night" buttonClassName="bottom-3 left-3">
                <BrandArt className="block h-auto w-full shadow-[0_40px_80px_-40px_rgb(11_13_18/0.55)]" />
              </Pausable>
            </div>
          )}
        </div>
      </div>
    </Band>
  );
}
