'use client';

import type { CSSProperties } from 'react';

import product from '@/content/products/business-platforms';

import { BRANDS } from '../visuals/concept-sites';
import {
  Bars,
  Card,
  Chip,
  Field,
  Line,
  Metric,
  Panel,
  Stage,
  Status,
  Step,
  Toast,
  Track,
} from './kit';

/**
 * Business Platforms, in the showcase kit, from the page's own sample business — a Recruitment
 * Agency Network's hiring platform, and Northstar Talent joining it: the workspace set up on a trial,
 * its recruiters and client access, plans by recruiter, the founder's view of the business, and who
 * keeps paying month by month.
 */
const P = product.accent;
const A = BRANDS.recruitment!.accent;

/** First version: an agency signs up and sets up its workspace on its own. */
export function SignupMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={290}
        label="Your agency"
        badge={<Status tone="accent">Step 2 of 4</Status>}
      >
        <div className="flex flex-col gap-2.5 px-2 pb-2">
          <Field label="Agency name" value="Northstar Talent" />
          <Field label="Web address" value="northstar.network.in" />
          <Field label="Hiring for" value="Tech, retail and healthcare" focus />
          <div>
            <Chip on>Candidate updates on WhatsApp</Chip>
          </div>
        </div>
      </Panel>
      <Panel x={282} y={100} w={200} label="Setup" i={2}>
        <Track
          steps={[
            { title: 'Your workspace', meta: 'Done', done: true },
            { title: 'Your agency', meta: 'Now' },
            { title: 'Invite recruiters' },
            { title: 'Import candidates' },
          ]}
        />
      </Panel>
      <Toast x={40} y={330} w={230} icon="check" title="14-day trial" meta="No card needed" />
    </Stage>
  );
}

/** Workspaces: the agency's own recruiters and clients, each with a role, and its branches. */
export function MembersMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={300} label="Members · Northstar" live>
        <div className="flex flex-col gap-2">
          <Step
            face="Anitha Krishnan"
            title="Anitha Krishnan"
            meta="Now"
            status="Owner"
            tone="accent"
          />
          <Step
            face="Suresh Iyer"
            title="Suresh Iyer"
            meta="10 min ago"
            status="Recruiter"
            tone="muted"
          />
          <Step face="Latha Rao" title="Latha Rao" meta="Today" status="Recruiter" tone="muted" />
          <Step face="Neha Dsouza" title="Neha Dsouza" meta="Invited" status="Client" tone="wait" />
        </div>
      </Panel>
      <Panel x={300} y={150} w={190} label="Workspaces" i={2}>
        <div className="px-2">
          <Line icon="layers" title="Northstar" meta="Bangalore" right={<Status>Open</Status>} />
          <Line icon="layers" title="Northstar Pune" meta="Branch" />
        </div>
      </Panel>
    </Stage>
  );
}

/** Billing: the plans, the one chosen, and the invoices paid on autopay. */
export function BillingMock() {
  const plans = [
    ['Starter', '₹1,499/mo', 'Up to 3 recruiters', false],
    ['Growth', '₹3,999/mo', 'Up to 15 recruiters', true],
    ['Pro', '₹7,999/mo', 'Branches and API', false],
  ] as const;
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={290} label="Your plan" badge={<Status tone="accent">Growth</Status>}>
        <div className="flex flex-col gap-2">
          {plans.map(([name, price, line, on], i) => (
            <div
              key={name}
              className={`sc-rise flex items-center justify-between rounded-xl border px-3 py-2.5 ${on ? 'sc-plan--on' : 'border-line'}`}
              style={{ '--i': i + 1 } as CSSProperties}
            >
              <span>
                <span className="block text-[13.5px] font-medium text-ink">{name}</span>
                <span className="block text-[11.5px] text-ink-2">{line}</span>
              </span>
              <span className="text-[13px] font-semibold text-ink">{price}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel x={292} y={150} w={200} label="Autopay · 1 Oct" i={2}>
        <div className="px-2">
          <Line
            icon="receipt"
            title="1 Sep · ₹4,719"
            meta="RN-0912"
            right={<Status>Paid</Status>}
          />
          <Line
            icon="receipt"
            title="1 Aug · ₹4,719"
            meta="RN-0811"
            right={<Status>Paid</Status>}
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** Your admin: the whole business — revenue, workspaces, and the newest to join. */
export function AdminMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={290} label="The network · admin" live>
        <div className="px-3 pb-2">
          <Metric label="Monthly revenue" value="₹4.62 L" delta="9%" />
          <div className="mt-3">
            <Bars values={[24, 30, 35, 41, 50, 57, 63, 72, 78, 85, 93, 100]} height={70} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Metric label="Paying" value={159} size={20} />
            <Metric label="In trial" value={23} size={20} />
            <Metric label="Cancelled" value="1.8%" size={20} />
          </div>
        </div>
      </Panel>
      <Panel x={290} y={160} w={200} label="Newest" i={2}>
        <div className="px-2">
          <Line
            icon="layers"
            title="Northstar"
            meta="Day 11"
            right={<Status tone="wait">Trial</Status>}
          />
          <Line icon="layers" title="Bluebridge" meta="Growth" right={<Status>Paying</Status>} />
          <Line icon="layers" title="Peak Hire" meta="Starter" right={<Status>Paying</Status>} />
        </div>
      </Panel>
    </Stage>
  );
}

/** Growth: who keeps paying, month by month, and the signups coming in. */
export function GrowthMock() {
  const cohorts = [
    ['Apr', [100, 92, 88, 86, 85, 84]],
    ['May', [100, 94, 90, 89, 88]],
    ['Jun', [100, 95, 93, 91]],
    ['Jul', [100, 96, 94]],
    ['Aug', [100, 97]],
  ] as const;
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={20} w={440} label="Still paying, by signup month" live>
        <div className="flex flex-col gap-1.5 px-3 pb-3">
          {cohorts.map(([month, values], r) => (
            <div key={month} className="grid grid-cols-[2.25rem_repeat(6,minmax(0,1fr))] gap-1.5">
              <span className="self-center text-[11px] text-ink-2">{month}</span>
              {values.map((v, k) => (
                <span
                  key={k}
                  className="sc-pop grid h-7 place-items-center rounded-md text-[11px] font-medium text-ink"
                  style={
                    {
                      '--i': r + k / 2,
                      background: `color-mix(in srgb, var(--sc-accent) ${Math.round((v - 70) * 1.6)}%, white)`,
                    } as CSSProperties
                  }
                >
                  {v}%
                </span>
              ))}
            </div>
          ))}
        </div>
      </Panel>
      <Panel x={476} y={40} w={250} label="Signups · Apr to Sep" i={1}>
        <div className="px-3 pb-2">
          <Bars
            values={[44, 54, 66, 76, 88, 100]}
            labels={['A', 'M', 'J', 'J', 'A', 'S']}
            height={110}
          />
        </div>
      </Panel>
      <Card x={742} y={90} w={140} i={2}>
        <div className="p-2">
          <Metric label="September" value={41} size={30} />
          <p className="mt-1 text-[11px] text-ink-2">new agencies</p>
        </div>
      </Card>
    </Stage>
  );
}

/** How it's built: the founder's admin, and the product at work in a client's pipeline. */
export function BusinessPlatformsHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel x={40} y={30} w={320} label="Admin · the network" live>
        <div className="grid grid-cols-2 gap-4 px-3 pb-3">
          <Metric label="Monthly revenue" value="₹4.62 L" size={26} />
          <Metric label="Paying agencies" value={159} delta="11" size={26} />
        </div>
      </Panel>
      <Panel
        x={330}
        y={200}
        w={340}
        label="Senior Java developer"
        badge={<Status tone="muted">Client view</Status>}
        i={2}
      >
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            face="Aarav Sharma"
            title="Aarav Sharma"
            meta="9 yrs Java"
            status="Shortlisted"
          />
          <Step
            turn
            n={4}
            i={1}
            face="Ananya Bhat"
            title="Ananya Bhat"
            meta="Thu 11 am"
            status="Interview"
          />
          <Step
            turn
            n={4}
            i={2}
            face="Dev Patel"
            title="Dev Patel"
            meta="Took another offer"
            status="Declined"
            tone="muted"
          />
          <Step
            turn
            n={4}
            i={3}
            face="Isha Nair"
            title="Isha Nair"
            meta="Sent Mon"
            status="Offer"
            tone="accent"
          />
        </div>
      </Panel>
    </Stage>
  );
}

export const BusinessPlatformsHow = BusinessPlatformsHowBox;
