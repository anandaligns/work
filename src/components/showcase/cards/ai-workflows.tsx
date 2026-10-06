'use client';

import { Bars, Line, Metric, Press, Status, Step, Thinking } from '../kit';
import { App, Sheet } from '../sheet';

/**
 * AI Workflows' five screens, from the page's sample business — an Accounting & Tax Firm and
 * Shalini Iyer, a partner, doing the books for Arora Traders: the day's invoices read from the
 * inbox, what doesn't fit the order, the approvals before Tally, an invoice scanned on a phone, and
 * the month.
 */

/** Reading: today's invoices from the client's inbox, each read and sorted. */
export function Reading() {
  return (
    <Sheet label="Arora · inbox" live>
      <Thinking>Reading 3 new attachments…</Thinking>
      <div className="mt-1.5">
        <Line
          icon="file"
          title="NST/0418"
          meta="Shree Balaji · ₹47,636"
          right={<Status tone="wait">Look</Status>}
        />
        <Line
          icon="file"
          title="KS-2291"
          meta="Kaveri · ₹1.18 L"
          right={<Status>Matched</Status>}
        />
        <Line icon="file" title="PT-0917" meta="Precision Tools" right={<Status>Matched</Status>} />
      </div>
    </Sheet>
  );
}

/** Checks: what doesn't fit the order, the price list or last month. */
export function Exceptions() {
  return (
    <Sheet label="Exceptions" badge={<Status tone="wait">3 open</Status>}>
      <div className="flex flex-col gap-1.5">
        <Step lit icon="alert" title="Shree Balaji" meta="Qty 180, PO says 200" className="!py-2" />
        <Step icon="rupee" title="Metro Tubes" meta="₹412, price list ₹398" className="!py-2" />
        <Step
          icon="repeat"
          title="Sri Enterprises"
          meta="Repeat invoice number"
          className="!py-2"
        />
        <Step icon="search" title="Kaveri Steel" meta="GSTIN differs" className="!py-2" />
      </div>
    </Sheet>
  );
}

/** Approval: what's ready, the one to check, and nothing posted until a person says yes. */
export function Approval() {
  return (
    <App title="For approval" sub="Shalini Iyer · Arora Traders" icon="check">
      <Line
        icon="alert"
        title="Shree Balaji"
        meta="Qty differs · ₹47,636"
        right={<Status tone="wait">Check</Status>}
      />
      <Line icon="file" title="Kaveri Steel" meta="₹1,18,420" right={<Status>Match</Status>} />
      <Line icon="file" title="Precision Tools" meta="₹22,180" right={<Status>Match</Status>} />
      <Press className="mt-1.5">Approve 2 matches</Press>
      <p className="mt-1.5 text-center text-[10.5px] text-ink-2">
        Posted to Tally only after approval
      </p>
    </App>
  );
}

/** From anywhere: an invoice scanned on a phone, read into fields in two seconds. */
export function Scan() {
  return (
    <App title="Scan an invoice" sub="Read in 2 s" icon="scan" dark>
      <div className="relative overflow-hidden rounded-xl bg-white p-3 text-ink">
        <span className="sc-scan absolute inset-x-0 top-0 h-8" />
        <p className="font-mono text-[9px] tracking-[0.14em] text-ink-2">TAX INVOICE</p>
        <p className="mt-1 text-[12px] font-semibold">Shree Balaji Traders</p>
        <div className="mt-2 flex flex-col gap-1">
          <span className="h-1.5 w-4/5 rounded-full bg-fill" />
          <span className="h-1.5 w-3/5 rounded-full bg-fill" />
          <span className="h-1.5 w-2/3 rounded-full bg-fill" />
        </div>
      </div>
      <div className="mt-2.5 flex flex-col gap-1.5 text-[11px]">
        <span className="flex justify-between rounded-lg bg-white/10 px-2.5 py-1.5">
          <span className="text-white/60">Bright bar 12 mm</span>
          <span className="font-medium">180</span>
        </span>
        <span className="flex justify-between rounded-lg bg-white/10 px-2.5 py-1.5">
          <span className="text-white/60">Total</span>
          <span className="font-medium">₹47,636</span>
        </span>
      </div>
    </App>
  );
}

/** Summaries: the month's documents, what matched, and what waits. */
export function Summary() {
  return (
    <Sheet label="This month" live foot={['Most checks', 'Metro Tubes']}>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        <Metric label="Documents read" value="186" size={22} />
        <Metric label="Matched" value="71%" size={22} />
        <Metric label="Exceptions" value="23" size={22} />
        <Metric label="Waiting" value="4" size={22} />
      </div>
      <p className="mt-3 text-[11px] text-ink-2">Documents by day</p>
      <div className="mt-1.5">
        <Bars values={[6, 9, 7, 12, 8, 11, 14, 10, 9, 13]} height={40} />
      </div>
    </Sheet>
  );
}
