'use client';

import { Bars, Line, Meter, Metric, Press, Status, Step } from '../kit';
import { App, Sheet } from '../sheet';

/**
 * Dashboards' five screens, from the page's sample business — a Solar Energy Company with 38
 * rooftop sites: yesterday's summary at 7:00 am, five tools feeding one set of numbers, Bangalore
 * North's sites, what needs a look, and September's targets.
 */

/** Morning summary: yesterday across 38 sites, in the inbox at 7:00 am. */
export function Morning() {
  return (
    <App title="Good morning, Kavya" sub="Yesterday · your 38 sites" icon="bulb">
      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        <Metric label="Generated" value="4,120" delta="6%" size={20} />
        <Metric label="Saved" value="₹32,960" size={20} />
        <Metric label="Sites up" value="37/38" size={20} />
        <Metric label="New leads" value="9" size={20} />
      </div>
      <div className="sc-step--lit mt-3 rounded-xl border border-line px-3 py-2">
        <p className="text-[12px] font-medium text-ink">4 need a look today</p>
        <p className="text-[10.5px] text-ink-2">Inverter offline at Site 14</p>
      </div>
      <Press className="mt-2.5">Open the dashboard</Press>
    </App>
  );
}

/** One source: every tool connected into one set of numbers. */
export function Sources() {
  return (
    <Sheet label="Connected" live foot={['This month', '118 MWh']}>
      <Line tool="Razorpay" title="Razorpay" meta="Payments" right={<Status>Synced</Status>} />
      <Line tool="Zoho CRM" title="Zoho CRM" meta="Leads" right={<Status>Synced</Status>} />
      <Line
        tool="Google Sheets"
        title="Google Sheets"
        meta="Readings"
        right={<Status>Synced</Status>}
      />
      <Line tool="Tally" title="Tally" meta="Invoices" right={<Status>Synced</Status>} />
    </Sheet>
  );
}

/** Filters: Bangalore North's sites this week, and the day's generation by hour. */
export function Region() {
  return (
    <Sheet label="Bangalore North" badge={<Status tone="muted">This week</Status>}>
      <Bars values={[2, 9, 24, 41, 52, 55, 49, 36, 18, 5]} now={5} height={58} />
      <div className="mt-1 flex justify-between text-[10px] text-ink-3">
        <span>6 am</span>
        <span>12 pm</span>
        <span>6 pm</span>
      </div>
      <div className="mt-1.5">
        <Line icon="bulb" title="Site 03 · Hebbal" meta="1,240 kWh · 99.8% up" />
        <Line icon="bulb" title="Site 07 · Yelahanka" meta="1,110 kWh · 97.2% up" />
        <Line icon="alert" title="Site 14 · Jakkur" meta="Offline since 6:10 am" />
      </div>
    </Sheet>
  );
}

/** Flags: what the dashboard noticed overnight. */
export function Flags() {
  return (
    <Sheet label="Needs a look" badge={<Status tone="wait">4 today</Status>}>
      <div className="flex flex-col gap-1.5">
        <Step
          turn
          n={4}
          i={0}
          icon="alert"
          title="Inverter offline"
          meta="Site 14 · since 6:10 am"
          className="!py-2"
        />
        <Step
          turn
          n={4}
          i={1}
          icon="receipt"
          title="3 invoices unpaid"
          meta="7 days · ₹6,800"
          className="!py-2"
        />
        <Step
          turn
          n={4}
          i={2}
          icon="clipboard"
          title="5 surveys to confirm"
          meta="Before 11 am"
          className="!py-2"
        />
        <Step
          turn
          n={4}
          i={3}
          icon="phone"
          title="2 leads to call"
          meta="Waiting 48 hours"
          className="!py-2"
        />
      </div>
    </Sheet>
  );
}

/** Targets: each region against September's target, sixteen days in. */
export function Targets() {
  return (
    <Sheet label="September" badge={<Status tone="accent">Day 16 of 30</Status>}>
      <Metric label="Generated, all regions" value="118 MWh" delta="9%" size={24} />
      <div className="mt-4 flex flex-col gap-2.5">
        <Meter label="Mysuru" value={91} />
        <Meter label="North" value={82} i={1} />
        <Meter label="South" value={64} i={2} />
      </div>
      <p className="mt-3 text-[10.5px] leading-snug text-ink-2">
        Of each region’s target for the month so far.
      </p>
    </Sheet>
  );
}
