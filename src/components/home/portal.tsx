import { portal } from '@/content/site';

import { Band } from '../layout/band';
import { FillText } from '../motion/fill-text';
import { PixelReveal } from '../motion/pixel-reveal';
import { TurnOnView } from '../motion/turn-on-view';
import { PortalScene } from '../visuals/scenes';

/**
 * aoutive's "connect the tools" section as the client portal: the cube with the symbol inside, and
 * the five things the portal really holds wired to it. The title and body are the PORTAL block.
 */
export function Portal() {
  const [lead, ...rest] = portal.title.split(' ');
  return (
    <Band id="portal" labelledBy="portal-heading" className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
          <span className="size-1.5 bg-ink" />
          Your portal
        </p>
        <h2 id="portal-heading" className="mt-5 text-h2 tracking-[var(--tracking-heading)]">
          {lead} <FillText text={rest.join(' ')} />
        </h2>
        <p data-reveal="" className="mx-auto mt-5 max-w-xl text-lead text-ink-2">
          {portal.body}
        </p>
      </div>
      <PixelReveal className="mx-auto mt-10 max-w-4xl" delay={100}>
        {/* The mark on the cube turns once the dissolve has cleared, and again when pointed at. */}
        <TurnOnView delay={1900} className="mx-auto">
          <div data-parallax="-30">
            <PortalScene />
          </div>
        </TurnOnView>
      </PixelReveal>
      <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
        {['Project stage', 'Files', 'Agreement', 'Invoices', 'Requests'].map((item, i) => (
          <li
            key={item}
            data-reveal=""
            style={{ ['--i' as string]: i }}
            className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium"
          >
            {item}
          </li>
        ))}
      </ul>
    </Band>
  );
}
