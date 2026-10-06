'use client';

import type { CSSProperties } from 'react';

import { Chip, Field, Line, Metric, Money, Press, Status, Step } from '../kit';
import { Sheet, Web } from '../sheet';

/**
 * Business Platforms' five screens, from the page's sample business — a Recruitment Agency
 * Network's hiring platform, and Northstar Talent joining it: the workspace set up on a trial, its
 * members, the plan on autopay, the founder's admin, and who keeps paying.
 */

/** First version: an agency signs up and sets up its workspace on its own. */
export function Signup() {
  return (
    <Web address="network.in/start" className="px-3.5 pt-3">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-semibold">Your agency</p>
        <Status tone="accent" icon={null}>
          Step 2 of 4
        </Status>
      </div>
      <div className="mt-2.5 flex flex-col gap-2.5">
        <Field label="Agency name" value="Northstar Talent" />
        <Field label="Web address" value="northstar.network.in" focus />
      </div>
      <Press className="mt-3">Start the 14-day trial</Press>
      <p className="mt-1.5 text-center text-[10.5px] text-ink-2">No card needed</p>
    </Web>
  );
}

/** Workspaces: the agency's own recruiters and clients, each with a role. */
export function Members() {
  return (
    <Sheet label="Members · Northstar" live>
      <Line
        face="Anitha Krishnan"
        title="Anitha Krishnan"
        meta="Owner · now"
        right={<Chip on>Admin</Chip>}
      />
      <Line
        face="Suresh Iyer"
        title="Suresh Iyer"
        meta="10 min ago"
        right={<Chip>Recruiter</Chip>}
      />
      <Line face="Latha Rao" title="Latha Rao" meta="Today" right={<Chip>Recruiter</Chip>} />
      <Line face="Neha Dsouza" title="Neha Dsouza" meta="Invited" right={<Chip>Client</Chip>} />
    </Sheet>
  );
}

/** Billing: the plan chosen, and the invoices paid on autopay. */
export function Billing() {
  return (
    <Sheet label="Your plan" badge={<Status>Autopay</Status>}>
      <div className="sc-step--lit rounded-xl border border-line p-3">
        <p className="text-[11px] text-ink-2">Growth · 5 recruiters</p>
        <p className="mt-1 font-display text-[24px] leading-none text-ink">
          ₹3,999<span className="text-[12px] text-ink-2"> / month</span>
        </p>
        <p className="mt-1 text-[10.5px] text-ink-2">Next on 1 Oct</p>
      </div>
      <div className="mt-1.5">
        <Line icon="receipt" title="1 Sep" meta="RN-0912" right={<Money>₹4,719</Money>} />
        <Line icon="receipt" title="1 Aug" meta="RN-0811" right={<Money>₹4,719</Money>} />
      </div>
    </Sheet>
  );
}

/** Your admin: the whole business — revenue, workspaces and the newest to join. */
export function Admin() {
  return (
    <Sheet label="The network" live>
      <div className="grid grid-cols-2 gap-2">
        <Metric label="Monthly revenue" value="₹4.62 L" size={20} />
        <Metric label="Paying" value="159" size={20} />
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        <Step lit icon="briefcase" title="Northstar" meta="Day 11 of trial" className="!py-2" />
        <Step icon="briefcase" title="Bluebridge" meta="Growth · paying" className="!py-2" />
        <Step icon="briefcase" title="Peak Hire" meta="Starter · paying" className="!py-2" />
      </div>
    </Sheet>
  );
}

/** Growth: who keeps paying, by signup month. */
export function Retention() {
  const months: [string, number[]][] = [
    ['Apr', [100, 96, 94, 92, 91, 90]],
    ['May', [100, 97, 95, 94, 93]],
    ['Jun', [100, 98, 96, 95]],
    ['Jul', [100, 97, 96]],
    ['Aug', [100, 98]],
    ['Sep', [100]],
  ];
  return (
    <Sheet label="Still paying" foot={['Signups · Sep', '41']}>
      <div className="flex flex-col gap-1">
        {months.map(([month, row]) => (
          <div key={month} className="grid grid-cols-[2rem_repeat(6,minmax(0,1fr))] gap-1">
            <span className="text-[10.5px] leading-6 text-ink-2">{month}</span>
            {row.map((share, k) => (
              <span
                key={k}
                className="grid h-6 place-items-center rounded-[5px] text-[9.5px] font-medium text-ink"
                style={
                  {
                    background: `color-mix(in srgb, var(--sc-accent) ${Math.round((share - 80) * 2.4)}%, white)`,
                  } as CSSProperties
                }
              >
                {share}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10.5px] text-ink-2">% of each month’s agencies, month by month</p>
    </Sheet>
  );
}
