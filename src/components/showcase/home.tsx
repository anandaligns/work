'use client';

import type { CSSProperties } from 'react';

import { solutions } from '@/content/site';

import { BrandSymbol } from '../ui/brand';
import { ToolMark } from '../ui/brand-logos';
import { Lucide, MENU_ICONS } from '../ui/lucide';
import { Bubble, Card, Line, Metric, Mono, Panel, Stage, Status, Step, Toast, Track } from './kit';

/**
 * The home page's pictures, in the showcase kit, as its Services pictures are drawn: the four
 * promises (a fixed quote, a timeline in writing, a change by message, the warranty) and the four
 * solutions at work beside their list, with the deck of all four when none is open. Every
 * business, figure and time on them is an example.
 */

// The promises' colours, one each, as the cards had them.
const AMBER = '#d98a00';
const VIOLET = '#6e78ff';
const ROSE = '#f0506e';
const GREEN = '#1fb866';

// --- the promises ----------------------------------------------------------------------------------

/** Your price is fixed before we build: the quote, signed and fixed, and the advance due. */
export function PriceMock() {
  return (
    <Stage w={480} accent={AMBER}>
      <Panel x={20} y={14} w={270} label="Fixed quote">
        <div className="px-2">
          <Line
            icon="file"
            title="Scope"
            meta="Agreed in writing"
            right={<Status>Signed</Status>}
          />
          <Line
            icon="rupee"
            title="Price"
            meta="₹45,000, one-time"
            right={<Status>Fixed</Status>}
          />
          <Line
            icon="clock"
            title="Advance"
            meta="Work starts once it clears"
            right={<Status tone="wait">Due</Status>}
          />
        </div>
      </Panel>
      <Toast
        x={268}
        y={-6}
        w={210}
        icon="check"
        title="No surprises later"
        meta="The price is the price"
      />
    </Stage>
  );
}

/** Clear timelines, written down: the six weeks, this one lit, and where the build is. */
export function TimelineMock() {
  const weeks = [1, 2, 3, 4, 5, 6];
  return (
    <Stage w={480} accent={VIOLET}>
      <Panel
        x={20}
        y={14}
        w={300}
        label="Connected Website"
        badge={<Status tone="accent">4–6 weeks</Status>}
      >
        <div className="mb-2 flex gap-1.5 px-2">
          {weeks.map((week) => (
            <span
              key={week}
              className={`sc-pop grid h-7 flex-1 place-items-center rounded-lg text-[11.5px] font-semibold ${week === 4 ? 'sc-status--ink' : week < 4 ? 'sc-tile--accent' : 'bg-fill text-ink-2'}`}
              style={{ '--i': week / 2 } as CSSProperties}
            >
              {week}
            </span>
          ))}
        </div>
        <Track
          steps={[
            { title: 'Design approved', meta: 'Week 2', done: true },
            { title: 'Build and connect', meta: 'Week 4 · now' },
            { title: 'Launch', meta: 'Week 6' },
          ]}
        />
      </Panel>
    </Stage>
  );
}

/** Changes by message, not meetings: asked in the portal, done and marked done. */
export function ChangesMock() {
  return (
    <Stage w={480} accent={ROSE}>
      <Panel x={20} y={14} w={320} label="Request #214 · your portal" badge={<Status>Done</Status>}>
        <div className="flex flex-col gap-2 px-1 pb-2">
          <Bubble meta="Mon 10:12 am" i={1}>
            Can you add our new branch timings to the contact page?
          </Bubble>
          <Bubble from="us" meta="Pixel Kinetix · 1:40 pm" i={3}>
            Done — the new timings are live.
          </Bubble>
        </div>
      </Panel>
    </Stage>
  );
}

/** Covered after launch: the warranty's dates, and a defect fixed under it. */
export function WarrantyMock() {
  return (
    <Stage w={480} accent={GREEN}>
      <Panel x={20} y={14} w={280} label="Covered after launch" badge={<Status>Active</Status>}>
        <div className="px-2">
          <Line icon="rocket" title="Launched" meta="12 Sep" />
          <Line icon="shield" title="Warranty until" meta="12 Oct · 30 days" />
        </div>
      </Panel>
      <Toast
        x={250}
        y={110}
        w={210}
        icon="wrench"
        tone="ok"
        title="Form fix · covered"
        meta="A defect we built"
      />
    </Stage>
  );
}

// --- the solutions ---------------------------------------------------------------------------------

const SOLUTION_ACCENT: Record<string, string> = {
  'lead-automation': '#166534',
  'online-store-and-bookings': '#4d7c0f',
  'business-dashboard-crm': '#2563eb',
  'website-care-hosting': '#86198f',
};

/** Lead Automation: tonight's enquiries, each answered, and the note that no lead goes cold. */
export function LeadMock() {
  return (
    <Stage w={520} accent={SOLUTION_ACCENT['lead-automation']!} max={1.35}>
      <Panel x={20} y={20} w={370} label="New enquiries" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            face="Priya Sharma"
            title="Priya asked for a quote"
            meta="Just now · website"
            status="Replied"
          />
          <Step
            turn
            n={3}
            i={1}
            face="Rahul Bose"
            title="Rahul is waiting for a reply"
            meta="1 min ago · WhatsApp"
            status="Replied"
          />
          <Step
            turn
            n={3}
            i={2}
            face="Sana Khan"
            title="Sana’s follow-up is due"
            meta="3 min ago · today"
            status="Today"
            tone="wait"
          />
        </div>
      </Panel>
      <Card x={220} y={250} w={290} i={3}>
        <div className="flex items-start gap-3 p-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-ink">
            <BrandSymbol ink="#fff" className="size-4" />
          </span>
          <span className="text-[12.5px] leading-snug text-ink">
            All 5 enquiries were answered in seconds. 2 follow-ups go out today, so no lead goes
            cold.
          </span>
        </div>
      </Card>
    </Stage>
  );
}

/** Online Store & Bookings: the day chosen, and the booking paid and confirmed. */
export function SellMock() {
  const days = ['18', '19', '20', '21', '22'];
  return (
    <Stage w={520} accent={SOLUTION_ACCENT['online-store-and-bookings']!} max={1.35}>
      <Card x={60} y={20} w={300} i={0}>
        <div className="flex gap-1.5 p-1">
          {days.map((day) => (
            <span
              key={day}
              className={`grid h-9 flex-1 place-items-center rounded-lg text-[13px] font-semibold ${day === '20' ? 'sc-chip--on' : 'bg-fill text-ink-2'}`}
            >
              {day}
            </span>
          ))}
        </div>
      </Card>
      <Panel x={20} y={100} w={340} label="Booking paid" badge={<Status>Sat 10 am</Status>} i={1}>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            tool="Razorpay"
            title="Payment received"
            meta="₹6,450 · UPI"
            status="Paid"
          />
          <Step
            turn
            n={3}
            i={1}
            icon="calendar"
            title="2 seats reserved"
            meta="Sat, 10 am"
            status="Held"
          />
          <Step
            turn
            n={3}
            i={2}
            tool="WhatsApp"
            title="Confirmation sent"
            meta="On WhatsApp"
            status="Sent"
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** Business Dashboard & CRM: the tools that fed spreadsheets, now one view of yesterday. */
export function RunMock() {
  return (
    <Stage w={520} accent={SOLUTION_ACCENT['business-dashboard-crm']!} max={1.35}>
      <Panel x={20} y={40} w={200} label="Connected">
        <div className="flex flex-col gap-2">
          <Step turn n={4} i={0} tool="Tally" title="Tally" />
          <Step turn n={4} i={1} tool="Google Sheets" title="Sheets" />
          <Step turn n={4} i={2} tool="WhatsApp" title="WhatsApp" />
          <Step turn n={4} i={3} tool="Razorpay" title="Razorpay" />
        </div>
      </Panel>
      <Panel x={200} y={20} w={300} label="One view" live i={2} foot={['Updated', '2 min ago']}>
        <div className="grid grid-cols-2 gap-4 px-3 pb-3">
          <Metric label="Sales yesterday" value="₹1.86 L" delta="9%" size={26} />
          <Metric label="Orders" value={642} size={26} />
        </div>
        <div className="flex flex-col gap-1.5 px-3 pb-2">
          {['Daily sales v7.xlsx', 'Stock register.xlsx', 'Outlet cash book.xlsx'].map((file) => (
            <span
              key={file}
              className="flex items-center gap-2 text-[11.5px] text-ink-3 line-through"
            >
              <ToolMark tool="Excel" size={12} />
              {file}
            </span>
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

/** Website Care & Hosting: a change asked for on Monday morning, live by the afternoon. */
export function KeepMock() {
  return (
    <Stage w={520} accent={SOLUTION_ACCENT['website-care-hosting']!} max={1.35}>
      <Panel x={20} y={20} w={330} label="Change request" badge={<Status>Live</Status>}>
        <div className="px-2 pb-1">
          <p className="text-[14px] font-medium text-ink">New offer banner</p>
          <div className="mt-2">
            <Track
              steps={[
                { title: 'Raised', meta: 'Mon, 10:12 am', done: true },
                { title: 'In progress', meta: 'Within your plan’s time', done: true },
                { title: 'Live', meta: 'Mon, 1:40 pm', done: true },
              ]}
            />
          </div>
        </div>
      </Panel>
      <Toast
        x={250}
        y={250}
        w={240}
        icon="globe"
        tone="ok"
        title="Live on your site"
        meta="Same day, no meeting"
      />
    </Stage>
  );
}

/** With every solution closed: the four as a deck, one lifted over its slot. */
export function RestMock() {
  return (
    <Stage w={520} accent="#6e78ff" max={1.35}>
      <Panel
        x={40}
        y={20}
        w={420}
        label="Four solutions"
        badge={<Status tone="muted">Open one</Status>}
      >
        <div className="grid grid-cols-2 gap-2">
          {solutions.map((solution, i) => (
            <div
              key={solution.slug}
              className={`sc-rise flex flex-col gap-2 rounded-xl border border-line p-3 ${i === 0 ? 'sc-step--lit' : ''}`}
              style={
                {
                  '--i': i + 1,
                  '--sc-accent': SOLUTION_ACCENT[solution.slug],
                } as CSSProperties
              }
            >
              <span className="sc-tile sc-tile--accent grid size-9 place-items-center rounded-[10px]">
                <Lucide name={MENU_ICONS[solution.slug] ?? 'layers'} size={16} />
              </span>
              <span className="text-[13px] font-medium text-ink">{solution.name}</span>
              <span className="line-clamp-2 text-[11px] text-ink-2">{solution.line}</span>
            </div>
          ))}
        </div>
        <Mono className="px-1 pt-3 pb-1">Open one to see it at work</Mono>
      </Panel>
    </Stage>
  );
}
