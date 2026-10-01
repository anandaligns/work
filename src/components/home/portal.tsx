import { portal } from '@/content/site';

import { Band } from '../layout/band';
import { FillText } from '../motion/fill-text';
import { PortalTabs } from './portal-tabs';

/**
 * The client portal: its dashboard after Lightfield's, turning through the five things the portal
 * holds on its own. The title and body are the PORTAL block.
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
        <p data-reveal="" className="mx-auto mt-5 max-w-xl text-body text-ink-2">
          {portal.body}
        </p>
      </div>
      <PortalTabs />
    </Band>
  );
}
