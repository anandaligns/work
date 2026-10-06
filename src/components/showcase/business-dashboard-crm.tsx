'use client';

import { content } from '@/content/lab/run-it-in-one-place';

import {
  Bars,
  Card,
  Face,
  Line,
  Metric,
  Money,
  Mono,
  Panel,
  Stage,
  Status,
  Step,
  Toast,
} from './kit';

/**
 * Business Dashboard & CRM's solution page, in the showcase kit, from its sample business — a
 * bakery with three outlets and an online shop, run by Sameera Khan: every till and tool feeding
 * one set of numbers, the outlets side by side, the day's flags, last night's sync and the week on
 * one screen.
 */
const A = content.accent;

/** Connected: the counters, the shop, the payments and the books, in one set of numbers. */
export function ConnectedMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={30} w={200} label="Connected">
        <div className="flex flex-col gap-2">
          <Step turn n={4} i={0} icon="store" title="Counters" />
          <Step turn n={4} i={1} tool="WooCommerce" title="WooCommerce" />
          <Step turn n={4} i={2} tool="Razorpay" title="Razorpay" />
          <Step turn n={4} i={3} tool="Tally" title="Tally" />
        </div>
      </Panel>
      <Panel
        x={200}
        y={20}
        w={280}
        label="Monday, 15 Sep"
        live
        i={2}
        foot={['Cash to bank', '₹42,300 · matched']}
      >
        <div className="grid grid-cols-2 gap-4 px-3 pb-3">
          <Metric label="Sales yesterday" value="₹1.86 L" delta="9%" size={26} />
          <Metric label="Orders" value={642} delta="31" size={26} />
        </div>
      </Panel>
    </Stage>
  );
}

/** Outlets: each outlet and online, side by side, the one to check lit. */
export function OutletsMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={20} w={330} label="Outlets · this week" live>
        <div className="flex flex-col gap-2">
          <Step icon="store" title="Jayanagar" meta="₹4.6 L · wastage 2.4%" status="On track" />
          <Step icon="store" title="Indiranagar" meta="₹3.9 L · wastage 3.0%" status="On track" />
          <Step
            lit
            icon="store"
            title="Whitefield"
            meta="₹2.9 L · wastage 4.2%"
            status="Check"
            tone="wait"
          />
          <Step icon="globe" title="Online" meta="₹2.8 L · 842 orders" status="On track" />
        </div>
      </Panel>
      <Toast
        x={290}
        y={60}
        w={196}
        icon="people"
        title="Everyone, one set"
        meta="Same totals for all"
      />
    </Stage>
  );
}

/** Flags: what needs a look today, three of them, on the owner's phone. */
export function FlagsMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={20} w={330} label="Flagged · today 3" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            icon="rupee"
            title="Whitefield cash short ₹1,200"
            meta="Closing count, 10:40 pm"
            status="Check"
            tone="wait"
          />
          <Step
            turn
            n={3}
            i={1}
            icon="layers"
            title="Butter: 6 kg left"
            meta="Jayanagar · reorder at 10 kg"
            status="Order"
            tone="accent"
          />
          <Step
            turn
            n={3}
            i={2}
            icon="repeat"
            title="5 online refunds"
            meta="Late deliveries, Indiranagar"
            status="Look"
            tone="muted"
          />
        </div>
      </Panel>
      <Card x={300} y={230} w={180} i={3}>
        <div className="p-2">
          <p className="text-[11.5px] text-ink-2">Counted vs billed</p>
          <p className="mt-1 font-display text-[26px] leading-none text-ink">−₹1,200</p>
          <p className="mt-1 text-[11px] text-ink-2">Whitefield</p>
        </div>
      </Card>
    </Stage>
  );
}

/** How it works: every connection kept, and last night's sync — the day's figures and its steps. */
export function RunHow() {
  return (
    <Stage w={780} accent={A}>
      <Panel x={20} y={150} w={256} label="Connections">
        <div className="px-2">
          <Line icon="store" title="Counter sales" meta="3 outlets" right={<Status>Kept</Status>} />
          <Line tool="WooCommerce" title="WooCommerce" right={<Status>Kept</Status>} />
          <Line tool="Razorpay" title="Razorpay" right={<Status>Kept</Status>} />
          <Line tool="Tally" title="Tally" right={<Status>Kept</Status>} />
          <Line
            tool="Google Sheets"
            title="Daily sales sheet"
            right={<Status tone="muted">Retired</Status>}
          />
        </div>
      </Panel>
      <Panel x={296} y={20} w={500} label="Last night’s sync" live i={2}>
        <div className="grid grid-cols-4 gap-3 px-3 pb-3">
          <Metric label="Sales" value="₹1.86 L" delta="9%" size={22} />
          <Metric label="Orders" value={642} size={22} />
          <Metric label="Cash to bank" value={42300} prefix="₹" size={22} />
          <Metric label="Wastage" value="3.1%" size={22} />
        </div>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            icon="store"
            title="Counter sales, 3 outlets"
            meta="11:10 pm · 1,488 bills · ₹1.32 L"
            status="Done"
          />
          <Step
            turn
            n={4}
            i={1}
            tool="WooCommerce"
            title="Online orders and refunds"
            meta="11:12 pm · 192 orders · 5 refunds"
            status="Done"
          />
          <Step
            turn
            n={4}
            i={2}
            tool="Razorpay"
            title="Payments settled"
            meta="2:00 am · ₹54,210 · 188 payments"
            status="Done"
          />
          <Step
            turn
            n={4}
            i={3}
            tool="Tally"
            title="Day book to accounts"
            meta="One voucher for each outlet"
            status="Done"
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** What changes: the week on Sameera's screen, and Whitefield opened up — sales, cash and wastage. */
export function RunBenefits() {
  return (
    <Stage w={780} accent={A}>
      <Panel x={20} y={20} w={330} label="Week 37 · all outlets" live>
        <div className="px-3 pb-2">
          <Metric label="Sales this week" value="₹13.2 L" delta="7%" size={30} />
          <p className="mt-1 text-[11.5px] text-ink-2">Best day: Saturday, ₹2.1 L</p>
        </div>
        <div className="px-2">
          <Line icon="store" title="Jayanagar" right={<Money>₹4.6 L</Money>} />
          <Line icon="store" title="Indiranagar" right={<Money>₹3.9 L</Money>} />
          <Line
            icon="store"
            title="Whitefield"
            meta="Cash short ₹1,200"
            right={<Money>₹2.9 L</Money>}
          />
        </div>
      </Panel>
      <Panel
        x={370}
        y={200}
        w={410}
        label="Outlets / Whitefield"
        badge={<Status tone="wait">Check</Status>}
        i={3}
      >
        <div className="grid grid-cols-3 gap-3 px-3 pb-3">
          <Metric label="Sales" value="₹2.9 L" size={22} />
          <Metric label="Orders" value={1122} size={22} />
          <Metric label="Wastage" value="4.2%" size={22} />
        </div>
        <div className="mx-1 rounded-xl border border-line p-3">
          <Mono>Wastage · last 8 weeks</Mono>
          <div className="mt-2">
            <Bars
              values={[51, 49, 47, 46, 45, 44, 43, 42]}
              labels={['Wk 30', '', '', '', '', '', '', 'Wk 37']}
              height={56}
            />
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-2 pt-3 pb-1">
          <Face name="Sameera Khan" size={28} />
          <Face name="Joseph D" size={28} />
          <span className="text-[11.5px] text-ink-2">
            Sameera, every outlet · Joseph, Whitefield
          </span>
        </div>
      </Panel>
    </Stage>
  );
}
