'use client';

import type { CSSProperties } from 'react';

import product from '@/content/products/custom-software';

import { BRANDS } from '../visuals/concept-sites';
import {
  Bars,
  Card,
  Checks,
  Line,
  Meter,
  Metric,
  Panel,
  Stage,
  Status,
  Step,
  Toast,
  Track,
} from './kit';

/**
 * Custom Software, in the showcase kit, from the page's own sample business — a Construction Company
 * run by Vinod Shetty: every project and its stage, the purchases only he needs to approve, the week
 * in numbers, the system built in phases, and the crews and cranes planned across the sites.
 */
const P = product.accent;
const A = BRANDS.construction!.accent;

/** One system: every project, its stage on site and how far along it is. */
export function OrdersMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={330} label="Projects · estimate to handover" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            icon="home"
            title="Greenfield School · B"
            meta="Slab 3 · 72%"
            status="On time"
          />
          <Step
            turn
            n={4}
            i={1}
            icon="home"
            title="Lakeview Homes · T2"
            meta="Brickwork · 48%"
            status="At risk"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={2}
            icon="home"
            title="Metro Clinic · fit-out"
            meta="Plumbing · 85%"
            status="On time"
          />
          <Step
            turn
            n={4}
            i={3}
            icon="home"
            title="Orchid Villas · 1"
            meta="Handover · 100%"
            status="Ready"
            tone="accent"
          />
        </div>
      </Panel>
      <Card x={330} y={160} w={154} i={3}>
        <div className="p-2">
          <Metric label="Block B · slab 3" value={72} suffix="%" size={28} />
          <p className="mt-1.5 text-[11px] text-ink-2">Due 18 Oct</p>
        </div>
      </Card>
    </Stage>
  );
}

/** Roles and approvals: what's waiting for the owner, and the one he's reading now. */
export function ApprovalsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={320}
        label="Approvals · Vinod, owner"
        badge={<Status tone="wait">2 waiting</Status>}
      >
        <div className="flex flex-col gap-2">
          <Step
            lit
            icon="layers"
            title="Cement · 400 bags"
            meta="Stores · Latha · ₹1,64,000"
            status="Owner"
            tone="wait"
          />
          <Step
            icon="layers"
            title="Steel · 12 tonnes"
            meta="2 quotes · ₹8,40,000"
            status="Owner"
            tone="wait"
          />
          <Step
            icon="clock"
            title="Overtime, Block B, Sat"
            meta="Site · Mahesh · ₹14,400"
            status="Approved"
          />
          <Step
            icon="pen"
            title="Change order · toilet"
            meta="Metro Clinic · ₹62,000"
            status="Approved"
          />
        </div>
      </Panel>
      <Toast x={286} y={50} w={200} tool="WhatsApp" title="Sent to Vinod" meta="Cement · 9:48 am" />
    </Stage>
  );
}

/** Reports and summaries: the week on site, and the running bills still to be paid. */
export function ReportsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={280} label="This week · on site" live>
        <div className="grid grid-cols-3 gap-3 px-3 pb-3">
          <Metric label="Labour days" value={1180} size={20} />
          <Metric label="On schedule" value="3 of 4" size={20} />
          <Metric label="Wastage" value="1.8%" size={20} />
        </div>
        <div className="px-3 pb-2">
          <Bars
            values={[89, 94, 83, 100, 95, 55]}
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
            now={3}
            height={70}
          />
        </div>
      </Panel>
      <Panel x={282} y={150} w={210} label="Running bills · ₹38.6 L" i={2}>
        <div className="px-2">
          <Line
            icon="rupee"
            title="Lakeview Homes"
            meta="Bill 6 · ₹21 L"
            right={<Status tone="accent">Late</Status>}
          />
          <Line
            icon="rupee"
            title="Metro Clinic"
            meta="Bill 3 · ₹9.4 L"
            right={<Status tone="wait">Fri</Status>}
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** Built in phases: the roadmap, and what the phase under way adds. */
export function PhasesMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={290} label="Roadmap · quoted by phase">
        <div className="flex flex-col gap-3 px-3 pb-3">
          <Meter label="1 · Projects, site diary" value={100} i={0} />
          <Meter label="2 · Purchase, stores" value={60} i={1} />
          <Meter label="3 · Running bills" value={0} i={2} />
        </div>
      </Panel>
      <Panel
        x={262}
        y={130}
        w={230}
        label="Phase 2 adds"
        badge={<Status tone="accent">6 of 10</Status>}
        i={2}
      >
        <Track
          steps={[
            { title: 'Materials per project', meta: 'Live in testing', done: true },
            { title: 'Low stock → purchase', meta: 'Live in testing', done: true },
            { title: 'Goods received on a PO', meta: 'This week' },
          ]}
        />
      </Panel>
    </Stage>
  );
}

/** Planning: every crew's and crane's week, each on the site it works. */
export function PlanMock() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const rows = [
    ['Crew A · masons', 0, 3, 'Greenfield · slab 4'],
    ['Crew B · masons', 1, 4, 'Lakeview · Tower 2'],
    ['Crane 1', 0, 2, 'Greenfield · Block B'],
    ['Crane 2', 2, 5, 'Lakeview · Tower 2'],
    ['Plumbers', 0, 2, 'Metro Clinic'],
    ['Electricians', 2, 4, 'Metro Clinic'],
  ] as const;
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={20} w={860} label="Crews and equipment · 15–20 Sep" live>
        <div className="grid grid-cols-[8.5rem_repeat(6,minmax(0,1fr))] gap-y-2 px-3 pb-3">
          <span />
          {days.map((day) => (
            <span key={day} className="border-l border-line pl-2 text-[11px] text-ink-2">
              {day}
            </span>
          ))}
          {rows.map(([who, from, to, where], i) => (
            <div key={who} className="col-span-7 grid grid-cols-subgrid items-center">
              <span className="truncate text-[12px] font-medium text-ink">{who}</span>
              <span
                className={`sc-fill rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium text-ink ${i % 2 ? 'sc-slot' : 'sc-slot--on'}`}
                style={{ gridColumn: `${from + 2} / ${to + 2}`, '--i': i } as CSSProperties}
              >
                <span className="block truncate">{where}</span>
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

/** How it's built: the office's projects, and the site engineer's diary on a tablet. */
export function CustomSoftwareHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel x={40} y={30} w={360} label="Projects · the office" live>
        <div className="flex flex-col gap-2">
          <Step icon="home" title="Greenfield School · B" meta="Slab 3 · 18 Oct" status="On time" />
          <Step
            icon="home"
            title="Lakeview Homes · T2"
            meta="Brickwork · 30 Nov"
            status="At risk"
            tone="wait"
          />
          <Step
            icon="home"
            title="Metro Clinic · fit-out"
            meta="Plumbing · 6 Oct"
            status="On time"
          />
        </div>
      </Panel>
      <Panel
        x={360}
        y={270}
        w={310}
        label="Site diary · Block B"
        badge={<Status tone="accent">Today</Status>}
        i={2}
      >
        <div className="px-2 pb-2">
          <p className="font-display text-[26px] leading-none text-ink">Slab 3 · 72%</p>
          <div className="mt-3">
            <Checks
              items={[
                { text: 'Shuttering checked', done: true },
                { text: 'Concrete poured · 42 m³', done: true },
                { text: 'Site photos' },
              ]}
            />
          </div>
        </div>
      </Panel>
    </Stage>
  );
}

export const CustomSoftwareHow = CustomSoftwareHowBox;
