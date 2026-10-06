'use client';

import { Icon } from '../../ui/icon';
import { Line, Metric, Status, Step, Track } from '../kit';
import { Sheet } from '../sheet';

/**
 * API Integrations' five screens, from the page's sample business — an Online Travel Agency and
 * Rohan in accounts: booking TR-2291 through every tool by itself, the day's settlement matched,
 * the failures that reach him, the packages sheet that updates itself, and the keys kept safe.
 */

/** Enter it once: booking TR-2291 through every tool, nothing by hand. */
export function Booking() {
  return (
    <Sheet label="Booking TR-2291" badge={<Status>By hand: 0</Status>}>
      <Track
        steps={[
          { title: 'Booking placed', meta: '9:41 am · website', done: true },
          { title: 'Payment captured', meta: '9:41 am · UPI', done: true },
          { title: 'Invoice INV-1182', meta: '9:41 am · GST 5%', done: true },
          { title: 'Voucher sent', meta: '9:42 am · to Meera', done: true },
        ]}
      />
    </Sheet>
  );
}

/** Books that match: today's settlement, payment by payment. */
export function Settled() {
  return (
    <Sheet label="Reconciliation" badge={<Status tone="accent">18 of 19</Status>}>
      <Metric label="Settled today" value="₹2,84,600" size={22} />
      <div className="mt-1.5">
        <Line icon="link" title="INV-1182" meta="₹48,600" right={<Status>Matched</Status>} />
        <Line icon="link" title="INV-1183" meta="₹12,400" right={<Status>Matched</Status>} />
        <Line
          icon="alert"
          title="Pk3Wx40"
          meta="No invoice yet"
          right={<Status tone="wait">Look</Status>}
        />
      </div>
    </Sheet>
  );
}

/** Failures you hear about: what needs Rohan, and what fixed itself. */
export function Failures() {
  return (
    <Sheet label="This week" live>
      <div className="flex flex-col gap-1.5">
        <Step
          lit
          icon="alert"
          title="Tally ledger missing"
          meta="Voucher held · to Rohan"
          className="!py-2"
        />
        <Step
          icon="repeat"
          title="Hotel API timed out"
          meta="Retried after 2 min · fixed"
          className="!py-2"
        />
        <Step icon="key" title="Zoho token expiring" meta="Renewed in time" className="!py-2" />
        <Step icon="filter" title="Webhook sent twice" meta="The copy ignored" className="!py-2" />
      </div>
    </Sheet>
  );
}

/** Sheets and Workspace: the packages sheet, updated by every booking. */
export function Packages() {
  const rows: [string, string, number, number, boolean?][] = [
    ['GOA-3N', 'Goa', 29, 11, true],
    ['KER-5N', 'Kerala', 18, 22],
    ['COO-2N', 'Coorg', 31, 9],
    ['AND-4N', 'Andamans', 12, 18],
  ];
  return (
    <Sheet label="Packages · Oct" badge={<Status tone="accent">Live sync</Status>}>
      <div className="overflow-hidden rounded-lg border border-line text-[10.5px]">
        <div className="grid grid-cols-[3.4rem_minmax(0,1fr)_2.2rem_2rem] bg-fill px-2 py-1.5 text-ink-2">
          <span>Code</span>
          <span>Package</span>
          <span className="text-right">Sold</span>
          <span className="text-right">Left</span>
        </div>
        {rows.map(([code, name, sold, left, lit]) => (
          <div
            key={code}
            className={`grid grid-cols-[3.4rem_minmax(0,1fr)_2.2rem_2rem] border-t border-line px-2 py-1.5 ${lit ? 'sc-tile--accent' : 'text-ink'}`}
          >
            <span className="font-mono text-[9.5px]">{code}</span>
            <span className="truncate">{name}</span>
            <span className="text-right tabular-nums">{sold}</span>
            <span className="text-right font-semibold tabular-nums">{left}</span>
          </div>
        ))}
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-[10.5px] text-ink-2">
        <Icon name="table" size={11} /> GOA-3N: 13 → 11, after TR-2291
      </p>
    </Sheet>
  );
}

/** Under the hood: the keys the calls use, never in a spreadsheet. */
export function Keys() {
  return (
    <Sheet label="Keys" badge={<Status>Encrypted</Status>} foot={['Calls · last hour', '1,284']}>
      <Line tool="Razorpay" title="Razorpay" meta="Live key · stored safe" />
      <Line tool="Zoho" title="Zoho Books" meta="Renews on its own" />
      <Line tool="WhatsApp" title="WhatsApp" meta="Rotated monthly" />
      <Line tool="Tally" title="Tally" meta="Local connector" />
    </Sheet>
  );
}
