'use client';

import product from '@/content/products/dashboards';

import { BRANDS } from '../visuals/concept-sites';
import {
  Bars,
  Card,
  Chip,
  Line,
  Meter,
  Metric,
  Money,
  Mono,
  Panel,
  Press,
  RoleGrid,
  Stage,
  Status,
  Step,
  Toast,
} from './kit';

/**
 * Dashboards, in the showcase kit, from the page's own sample business — a Solar Energy Company with
 * 38 rooftop sites in three regions: yesterday's summary at 7:00 am, five tools feeding one set of
 * numbers, Bangalore North's sites, four things flagged (an inverter offline among them), and
 * September's generation targets.
 */
const P = product.accent;
const A = BRANDS.solarenergy!.accent;

/** Morning summary: yesterday across 38 sites, in the inbox at 7:00 am. */
export function DigestMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={310}
        label="Morning summary · 7:00 am"
        badge={
          <Status tone="accent" icon="mail">
            Inbox
          </Status>
        }
      >
        <div className="px-2">
          <p className="text-[14px] font-medium text-ink">Yesterday: 4,120 kWh generated</p>
          <p className="mt-0.5 text-[12px] text-ink-2">Good morning, Kavya — your 38 sites.</p>
          <div className="mt-2">
            <Line icon="chart" title="Generated" right={<Money>4,120 kWh ↑6%</Money>} />
            <Line icon="rupee" title="Saved for clients" right={<Money>₹32,960</Money>} />
            <Line icon="gauge" title="Sites online" right={<Money>37 of 38</Money>} />
            <Line icon="target" title="New leads" right={<Money>9 · 5 Google</Money>} />
          </div>
          <Press className="mt-2 mb-1">Open the dashboard</Press>
        </div>
      </Panel>
      <Toast
        x={262}
        y={92}
        w={226}
        icon="alert"
        title="4 need a look today"
        meta="Inverter offline at Site 14"
      />
    </Stage>
  );
}

/** One source: every tool connected, live, into one set of numbers. */
export function SourcesMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={250} label="Connected" live>
        <div className="flex flex-col gap-2">
          <Step turn n={5} i={0} tool="Razorpay" title="Razorpay" meta="Payments" />
          <Step turn n={5} i={1} tool="Zoho" title="Zoho CRM" meta="Leads" />
          <Step turn n={5} i={2} tool="Google Sheets" title="Google Sheets" meta="Site readings" />
          <Step turn n={5} i={3} tool="Tally" title="Tally" meta="Invoices" />
          <Step turn n={5} i={4} tool="WhatsApp" title="WhatsApp" meta="Messages" />
        </div>
      </Panel>
      <Panel
        x={252}
        y={110}
        w={230}
        i={3}
        label="One set of numbers"
        foot={['Same totals', 'for everyone']}
      >
        <div className="grid gap-4 px-3 pb-2">
          <Metric label="Generated this month" value="118 MWh" size={24} />
          <Metric label="New leads" value={236} delta="14%" size={24} />
        </div>
      </Panel>
    </Stage>
  );
}

/** Filters: Bangalore North's rooftop sites this week, and generation through the day. */
export function FiltersMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={310} label="Sites · this week" foot={['Saved', '₹25,680']}>
        <div className="px-2">
          <div className="flex flex-wrap gap-1.5 pb-2">
            <Chip on>Bangalore North</Chip>
            <Chip on>Homes</Chip>
            <Chip>Weekdays</Chip>
          </div>
          <Line
            icon="pin"
            title="Site 03 · Hebbal"
            meta="1,240 kWh · 99.8% up"
            right={<Money>₹9,920</Money>}
          />
          <Line
            icon="pin"
            title="Site 07 · Yelahanka"
            meta="1,110 kWh · 97.2% up"
            right={<Money>₹8,880</Money>}
          />
          <Line
            icon="pin"
            title="Site 14 · Jakkur"
            meta="860 kWh · offline 6:10 am"
            right={<Money>₹6,880</Money>}
          />
        </div>
      </Panel>
      <Card x={300} y={60} w={190} i={2}>
        <div className="p-2">
          <Mono>By hour</Mono>
          <div className="mt-3">
            <Bars values={[8, 30, 62, 88, 100, 84, 52, 20]} now={4} height={78} />
          </div>
          <p className="mt-1.5 flex justify-between text-[10px] text-ink-2">
            <span>6 am</span>
            <span>12 pm</span>
            <span>6 pm</span>
          </p>
        </div>
      </Card>
    </Stage>
  );
}

/** Flags: what the dashboard noticed overnight, each with what to do. */
export function FlagsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={330} label="Needs attention · 7:00 am" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            icon="alert"
            title="Inverter offline · Site 14"
            meta="Since 6:10 am · Jakkur"
            status="New"
            tone="accent"
          />
          <Step
            turn
            n={4}
            i={1}
            icon="receipt"
            title="3 invoices unpaid, 7 days"
            meta="₹6,800 · Bangalore South"
            status="Chase"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={2}
            icon="calendar"
            title="5 surveys not confirmed"
            meta="Today before 11 am"
            status="Today"
            tone="accent"
          />
          <Step
            turn
            n={4}
            i={3}
            icon="phone"
            title="2 leads not called back"
            meta="Waiting over 48 hours"
            status="Call"
            tone="muted"
          />
        </div>
      </Panel>
      <Card x={326} y={180} w={160} i={3}>
        <div className="p-2">
          <p className="text-[11.5px] text-ink-2">Site 14, this week</p>
          <div className="mt-2">
            <Bars values={[92, 95, 90, 94, 93, 96, 8]} height={54} />
          </div>
        </div>
      </Card>
    </Stage>
  );
}

/** Targets: each region against September's generation target, sixteen days in. */
export function TargetsMock() {
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel
        x={20}
        y={40}
        w={330}
        label="Targets · September"
        badge={<Status tone="muted">Day 16 of 30</Status>}
      >
        <div className="flex flex-col gap-3.5 px-3 pb-3">
          <Meter label="Bangalore North" value={82} i={0} />
          <Meter label="Bangalore South" value={64} i={1} />
          <Meter label="Mysuru" value={91} i={2} />
        </div>
      </Panel>
      <Panel x={366} y={20} w={270} label="Month so far" i={1}>
        <div className="px-3 pb-2">
          <Bars
            values={[8, 25, 42, 58, 77, 100]}
            labels={['1', '5', '8', '11', '14', '16']}
            height={120}
          />
        </div>
      </Panel>
      <Panel x={652} y={60} w={230} label="All regions" i={2} foot={['South needs', '23 MWh']}>
        <div className="px-3 pb-2">
          <Metric label="Generated" value="118 MWh" delta="9%" size={28} />
        </div>
      </Panel>
    </Stage>
  );
}

/** How it's built: what each role sees, and the owner's morning on her phone. */
export function DashboardsHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel
        x={40}
        y={30}
        w={400}
        label="Roles and access"
        badge={
          <Status tone="accent" icon="lock">
            Set per person
          </Status>
        }
      >
        <div className="px-3 pb-3">
          <RoleGrid
            heads={['Owner', 'Ops', 'Sales', 'Accts']}
            rows={[
              ['Generation and savings', [true, true, false, true]],
              ['Payments and invoices', [true, false, false, true]],
              ['Leads and surveys', [true, true, true, false]],
              ['Every region', [true, true, false, true]],
            ]}
          />
        </div>
      </Panel>
      <Panel x={330} y={270} w={330} label="Good morning, Kavya" live i={2}>
        <div className="grid grid-cols-3 gap-3 px-3 pb-3">
          <Metric label="kWh made" value={4120} size={20} />
          <Metric label="Sites up" value="37/38" size={20} />
          <Metric label="Leads" value={9} size={20} />
        </div>
        <Step
          lit
          icon="alert"
          title="Inverter offline"
          meta="Site 14 · since 6:10 am"
          status="Look"
          tone="accent"
        />
      </Panel>
    </Stage>
  );
}

export const DashboardsHow = DashboardsHowBox;
