'use client';

import { Bars, Face, Metric, Status, Step } from '../kit';
import { App, Sheet } from '../sheet';

/**
 * Business Dashboard & CRM's five screens, from its sample business — a bakery with three outlets
 * and an online shop, run by Sameera Khan: every till and tool connected, Monday morning on her
 * phone, the outlets side by side, the day's flags, and Whitefield's wastage coming down.
 */

/** Connected: the counters, the shop, the payments and the books. */
export function Connected() {
  return (
    <Sheet label="Connected" live foot={['Last sync', '2:00 am']}>
      <div className="flex flex-col gap-1.5">
        <Step turn n={4} i={0} icon="store" title="Counters" meta="3 outlets" className="!py-2" />
        <Step
          turn
          n={4}
          i={1}
          tool="WooCommerce"
          title="WooCommerce"
          meta="Online"
          className="!py-2"
        />
        <Step turn n={4} i={2} tool="Razorpay" title="Razorpay" meta="Payments" className="!py-2" />
        <Step turn n={4} i={3} tool="Tally" title="Tally" meta="Accounts" className="!py-2" />
      </div>
    </Sheet>
  );
}

/** Monday morning: yesterday, on Sameera's phone, before the first batch is out. */
export function Monday() {
  return (
    <App title="Monday, 15 Sep" sub="Good morning, Sameera" icon="chart">
      <Metric label="Sales yesterday" value="₹1.86 L" delta="9%" size={28} />
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <Metric label="Orders" value="642" size={20} />
        <Metric label="Cash to bank" value="₹42,300" size={20} />
      </div>
      <div className="mt-3">
        <Bars
          values={[1.42, 1.51, 1.38, 1.62, 1.71, 2.1, 1.86]}
          labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
          height={50}
        />
      </div>
    </App>
  );
}

/** Outlets: each outlet and online side by side, the one to check lit. */
export function Outlets() {
  return (
    <Sheet label="Outlets · week" live>
      <div className="flex flex-col gap-1.5">
        <Step icon="store" title="Jayanagar" meta="₹4.6 L · waste 2.4%" className="!py-2" />
        <Step icon="store" title="Indiranagar" meta="₹3.9 L · waste 3.0%" className="!py-2" />
        <Step lit icon="store" title="Whitefield" meta="₹2.9 L · waste 4.2%" className="!py-2" />
        <Step icon="globe" title="Online" meta="₹2.8 L · 842 orders" className="!py-2" />
      </div>
    </Sheet>
  );
}

/** Flags: what needs a look today. */
export function Flags() {
  return (
    <Sheet label="Flagged · 3" live>
      <div className="flex flex-col gap-1.5">
        <Step
          turn
          n={3}
          i={0}
          icon="rupee"
          title="Cash short ₹1,200"
          meta="Whitefield · 10:40 pm"
          className="!py-2"
        />
        <Step
          turn
          n={3}
          i={1}
          icon="layers"
          title="Butter: 6 kg left"
          meta="Reorder at 10 kg"
          className="!py-2"
        />
        <Step
          turn
          n={3}
          i={2}
          icon="repeat"
          title="5 online refunds"
          meta="Late deliveries"
          className="!py-2"
        />
      </div>
      <div className="mt-2.5 rounded-xl border border-line px-3 py-2">
        <p className="text-[10.5px] text-ink-2">Counted vs billed · Whitefield</p>
        <p className="font-display text-[20px] leading-tight text-ink">−₹1,200</p>
      </div>
    </Sheet>
  );
}

/** Whitefield opened up: wastage over eight weeks, and who sees it. */
export function Whitefield() {
  return (
    <Sheet label="Whitefield" badge={<Status tone="wait">Check</Status>}>
      <Metric label="Wastage this week" value="4.2%" size={26} />
      <p className="mt-3 text-[11px] text-ink-2">Last 8 weeks</p>
      <div className="mt-1.5">
        <Bars values={[5.1, 4.9, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2]} height={50} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Face name="Sameera Khan" size={26} />
        <Face name="Joseph D" size={26} />
        <span className="text-[10.5px] leading-snug text-ink-2">
          Sameera, every outlet · Joseph, Whitefield
        </span>
      </div>
    </Sheet>
  );
}
