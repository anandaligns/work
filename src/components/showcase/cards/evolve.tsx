'use client';

import type { CSSProperties } from 'react';

import { Bars, Line, Metric, Press, Ring, Status } from '../kit';
import { Sheet } from '../sheet';

/**
 * Evolve's five screens, from its sample site — yourbusiness.in, a clinic's site on the Standard
 * plan: everything normal this morning, the month's requests, ninety days watched, last night's
 * backup, and September's report with what to do next.
 */

/** All systems normal: the certificate, last night's backup, the updates and the speed. */
export function Normal() {
  return (
    <Sheet label="yourbusiness.in" live>
      <div className="flex items-center gap-3">
        <Ring value={96} size={56} />
        <span>
          <span className="block text-[14px] font-semibold text-ink">All systems normal</span>
          <span className="block text-[11px] text-ink-2">Speed on a phone</span>
        </span>
      </div>
      <div className="mt-2">
        <Line icon="lock" title="SSL certificate" meta="84 more days" right={<Status>OK</Status>} />
        <Line
          icon="database"
          title="Last backup"
          meta="Today, 2:00 am"
          right={<Status>OK</Status>}
        />
        <Line
          icon="shield"
          title="Security updates"
          meta="Applied Tuesday"
          right={<Status>OK</Status>}
        />
      </div>
    </Sheet>
  );
}

/** Requests: asked in the portal, followed until they're done. */
export function Requests() {
  return (
    <Sheet label="Requests" badge={<Status tone="muted">3 of 5</Status>}>
      <p className="text-[10.5px] text-ink-2">In progress</p>
      <div className="sc-step--lit mt-1 rounded-xl border border-line px-3 py-2">
        <p className="text-[12.5px] font-medium text-ink">Dr Farah’s photo and bio</p>
        <p className="text-[10.5px] text-ink-2">Team page · asked Monday</p>
      </div>
      <p className="mt-2.5 text-[10.5px] text-ink-2">Done</p>
      <Line icon="check" title="Diwali timings banner" meta="Home · 2 Sep" />
      <Line icon="check" title="Aligner prices updated" meta="Treatments · 8 Sep" />
      <Press className="mt-1">New request</Press>
    </Sheet>
  );
}

/** Monitoring: ninety days up, and the one incident, resolved. */
export function Watched() {
  const days = Array.from({ length: 45 }, (_, i) => (i === 31 ? 'down' : i === 12 ? 'slow' : 'up'));
  return (
    <Sheet label="Monitoring" live>
      <Metric label="Uptime · 90 days" value="99.98%" size={24} />
      <div className="mt-2 grid grid-cols-[repeat(15,minmax(0,1fr))] gap-[3px]">
        {days.map((day, i) => (
          <span
            key={i}
            className="h-3 rounded-[2px]"
            style={
              {
                background:
                  day === 'down' ? '#f0b429' : day === 'slow' ? '#f7d989' : 'var(--sc-accent)',
                opacity: day === 'up' ? 0.75 : 1,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="mt-2.5">
        <Line
          icon="alert"
          title="Down 6 min"
          meta="14 Aug · noted"
          right={<Status>Fixed</Status>}
        />
        <Line icon="gauge" title="Response time" meta="420 → 240 ms since June" />
      </div>
    </Sheet>
  );
}

/** Backups: every night's, kept sixty days, restored on request. */
export function Backups() {
  return (
    <Sheet label="Backups" badge={<Status tone="muted">Kept 60 days</Status>}>
      <Line
        icon="database"
        title="Today, 2 am"
        meta="1.2 GB · all of it"
        right={<Status>Done</Status>}
      />
      <Line icon="database" title="Yesterday, 2 am" meta="1.2 GB" right={<Status>Done</Status>} />
      <Line icon="database" title="Monday, 2 am" meta="1.1 GB" right={<Status>Done</Status>} />
      <Press className="mt-2">Request a restore</Press>
    </Sheet>
  );
}

/** Reports: September's speed score climbing, and what's suggested next. */
export function Report() {
  return (
    <Sheet label="September report">
      <p className="text-[11px] text-ink-2">Speed score on a phone</p>
      <div className="mt-1.5">
        <Bars
          values={[71, 78, 84, 89, 92, 96]}
          labels={['A', 'M', 'J', 'J', 'A', 'S']}
          height={56}
        />
      </div>
      <p className="mt-2.5 text-[11px] text-ink-2">Suggested for October</p>
      <Line icon="calendar" title="Book from every page" meta="Treatment pages" />
      <Line icon="gauge" title="Compress the gallery" meta="Saves about 1.4 MB" />
    </Sheet>
  );
}
