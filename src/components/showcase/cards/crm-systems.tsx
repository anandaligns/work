'use client';

import type { CSSProperties } from 'react';

import { Bubble, Chip, Line, Press, Status, Step, Track } from '../kit';
import { App, Chat, Sheet } from '../sheet';

/**
 * CRM Systems' five screens, from the page's sample business — a developer selling homes at
 * Lakeside Residency and Palm Grove: Rohit Verma's one record, the new lead on Ravi's phone at
 * 9:42 pm, today's follow-ups, Farah's WhatsApp, and the funnel from enquiry to booking.
 */

/** One record: every touch Rohit made, in order. */
export function Record() {
  return (
    <Sheet label="Rohit Verma" badge={<Status tone="accent">Returning</Status>}>
      <Track
        steps={[
          { title: 'Clicked a 3 BHK ad', meta: '12 Sep · Google Ads', done: true },
          { title: 'Got the brochure', meta: '12 Sep · website', done: true },
          { title: 'Asked about payments', meta: '14 Sep · Ravi', done: true },
          { title: 'Site-visit form', meta: 'Today' },
        ]}
      />
      <p className="mt-auto mb-3 text-[10.5px] text-ink-2">One record, not three.</p>
    </Sheet>
  );
}

/** Routing: the new lead on Ravi's phone, with what to do next. */
export function NewLead() {
  return (
    <App title="New lead · 9:42 pm" sub="Assigned to you by the rules" icon="bell">
      <p className="text-[16px] font-semibold text-ink">Rohit Verma</p>
      <Line icon="globe" title="Website form" meta="From a Google search ad" />
      <Line icon="home" title="₹1.3–1.5 Cr" meta="Home loan · 6 months" />
      <Line icon="phone" title="Call back" meta="Today, before 10 am" />
      <Press className="mt-1.5">Call Rohit</Press>
    </App>
  );
}

/** Pipeline: today's follow-ups, and where each buyer stands. */
export function FollowUps() {
  return (
    <Sheet label="Follow-ups · today" live>
      <div className="flex flex-col gap-1.5">
        <Step
          turn
          n={4}
          i={0}
          face="Arvind K"
          title="Arvind Kulkarni"
          meta="Call · brochure sent"
          className="!py-2"
        />
        <Step
          turn
          n={4}
          i={1}
          face="Nikhil P"
          title="Nikhil & Priya"
          meta="Confirm Saturday"
          className="!py-2"
        />
        <Step
          turn
          n={4}
          i={2}
          face="Farah S"
          title="Farah Siddiqui"
          meta="Payment plan"
          className="!py-2"
        />
        <Step
          turn
          n={4}
          i={3}
          face="Suresh M"
          title="Dr Suresh Menon"
          meta="Revised offer"
          className="!py-2"
        />
      </div>
    </Sheet>
  );
}

/** WhatsApp on the record: Farah's chat, kept with her. */
export function Farah() {
  return (
    <Chat name="Farah Siddiqui" meta="Lakeside · on her record">
      <Bubble meta="7:12 pm">Is there a payment plan for the 3 BHK?</Bubble>
      <Bubble from="us" meta="7:30 pm">
        Yes — 10% now, the rest on milestones. Shall we show you the flat on Sunday?
      </Bubble>
      <div className="flex justify-end gap-1.5">
        <Chip on>Sun, 11 am</Chip>
        <Chip>Sun, 4 pm</Chip>
      </div>
    </Chat>
  );
}

/** Reports: from enquiry to booking this quarter, each stage a bar as long as its share. */
export function Funnelled() {
  const stages: [string, string, number][] = [
    ['Enquiries', '1,012', 100],
    ['Site visits', '186', 38],
    ['Offers', '74', 17],
    ['Booked', '41', 9],
  ];
  return (
    <Sheet label="This quarter" foot={['Booked', '41 · 17 from ads']}>
      <div className="flex flex-col gap-2.5">
        {stages.map(([label, count, share], i) => (
          <div key={label}>
            <div className="flex justify-between text-[11.5px]">
              <span className="text-ink-2">{label}</span>
              <span className="font-medium text-ink tabular-nums">{count}</span>
            </div>
            <span className="mt-1 block h-5 overflow-hidden rounded-md bg-fill">
              <span
                className="sc-fill sc-funnel block h-full rounded-md"
                style={{ '--i': i, width: `${Math.max(share, 6)}%` } as CSSProperties}
              />
            </span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
