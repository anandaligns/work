'use client';

import { Line, Metric, Press, Ring, Status, Step, Track } from '../kit';
import { Sheet } from '../sheet';

/**
 * Website Care & Hosting's five screens, from its sample business — an industrial firm's site,
 * yourbusiness.in: the move in one night, its numbers, watched and backed up from the next
 * morning, the month's changes, and a change followed until it's live.
 */

/** Moved in one night: the move's steps. */
export function Move() {
  return (
    <Sheet label="Moving the site" badge={<Status tone="accent">Tonight</Status>}>
      <Track
        steps={[
          { title: 'Checked', meta: 'Site, domain, hosting', done: true },
          { title: 'Access recovered', meta: 'Domain, admin', done: true },
          { title: 'Copied and tested', meta: '46 pages · 3 fixed', done: true },
          { title: 'Switch', meta: 'Tonight, 11 pm' },
        ]}
      />
      <p className="mt-3 rounded-xl bg-fill px-3 py-2 text-[11px] leading-snug text-ink-2">
        The site stays up all through the move.
      </p>
    </Sheet>
  );
}

/** The night of the move: the speed, the pages and the old addresses, all checked. */
export function Night() {
  return (
    <Sheet label="After the move" foot={['Email', 'Left as it is']}>
      <div className="flex items-center gap-3">
        <Ring value={94} size={58} />
        <span>
          <span className="block text-[14px] font-semibold text-ink">38 → 94</span>
          <span className="block text-[11px] text-ink-2">Speed score on a phone</span>
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Metric label="Pages tested" value="46" size={20} />
        <Metric label="Redirects" value="112" size={20} />
      </div>
    </Sheet>
  );
}

/** Watched: everything normal, the backup at 2 am. */
export function Watched() {
  return (
    <Sheet label="All normal" live foot={['Plan', 'Standard']}>
      <div className="flex flex-col gap-1.5">
        <Step
          turn
          n={3}
          i={0}
          icon="gauge"
          title="Monitoring"
          meta="Uptime 100%"
          className="!py-2"
        />
        <Step
          turn
          n={3}
          i={1}
          icon="database"
          title="Nightly backup"
          meta="2:00 am · 60 days"
          className="!py-2"
        />
        <Step
          turn
          n={3}
          i={2}
          icon="shield"
          title="Security updates"
          meta="Fortnightly"
          className="!py-2"
        />
      </div>
    </Sheet>
  );
}

/** Changes: this month's, asked in the portal and live on the site. */
export function Changes() {
  return (
    <Sheet label="Changes · 5 of 5" live>
      <Line
        icon="pen"
        title="Sales number"
        meta="Contact · today"
        right={<Status tone="accent">Doing</Status>}
      />
      <Line icon="pen" title="Product list 2025" meta="Products" right={<Status>Live</Status>} />
      <Line icon="pen" title="CNC photos" meta="Capabilities" right={<Status>Live</Status>} />
      <Line icon="pen" title="Diwali closure" meta="Home banner" right={<Status>Live</Status>} />
    </Sheet>
  );
}

/** A change asked for, followed until it's live. */
export function Ask() {
  return (
    <Sheet label="Sales phone number" badge={<Status tone="accent">Today</Status>}>
      <p className="text-[11px] text-ink-2">Where · the contact page</p>
      <div className="mt-2">
        <Track
          steps={[
            { title: 'Asked in your portal', meta: 'Today, 10:12 am', done: true },
            { title: 'In progress', meta: 'Within your plan’s time' },
            { title: 'Live on the site', meta: 'Followed until it is' },
          ]}
        />
      </div>
      <Press className="mt-3">Ask for a change</Press>
    </Sheet>
  );
}
