'use client';

import type { CSSProperties } from 'react';

import product from '@/content/products/ai-workflows';

import { ToolMark } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import {
  Bar,
  Bars,
  Card,
  Line,
  Metric,
  Panel,
  Phone,
  Press,
  Stage,
  Status,
  Step,
  Thinking,
  Toast,
} from './kit';

/**
 * AI Workflows, in the showcase kit, from the page's own sample business — an Accounting & Tax Firm
 * and Shalini Iyer, a partner, doing the books for Arora Traders: the day's supplier invoices read
 * from the client's inbox, the ones that don't fit the order, the approvals before anything reaches
 * the client's Tally, an invoice scanned on a phone, and the month's summary.
 */
const P = product.accent;
const A = BRANDS.accounting!.accent;

/** Reading: today's documents from the accounts inbox, each read and sorted. */
export function QueueMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={330} label="Arora Traders · inbox" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            icon="file"
            title="Invoice NST/0418"
            meta="Shree Balaji · ₹47,636"
            status="Check"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={1}
            icon="file"
            title="Invoice KS-2291"
            meta="Kaveri Steel · ₹1,18,420"
            status="Ready"
            tone="accent"
          />
          <Step
            turn
            n={4}
            i={2}
            icon="file"
            title="Invoice PT-0917"
            meta="Precision Tools · ₹22,180"
            status="Ready"
            tone="accent"
          />
          <Step
            turn
            n={4}
            i={3}
            icon="file"
            title="Invoice SE/1182"
            meta="Sri Enterprises · ₹8,960"
            status="Posted"
          />
        </div>
        <div className="px-1 pt-2.5 pb-1">
          <Thinking i={5}>Reading 3 new attachments…</Thinking>
        </div>
      </Panel>
      <Card x={330} y={160} w={150} i={3}>
        <div className="grid grid-cols-2 gap-3 p-2">
          <Metric label="Read" value={14} size={22} />
          <Metric label="Matched" value={11} size={22} />
          <Metric label="Look" value={2} size={22} />
          <Metric label="In Tally" value={9} size={22} />
        </div>
      </Card>
    </Stage>
  );
}

/** Checks: what doesn't fit the order, the price list or last month, caught before it's paid. */
export function ExceptionsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={330}
        label="Exceptions · every invoice"
        badge={<Status tone="wait">3 open</Status>}
      >
        <div className="flex flex-col gap-2">
          <Step
            lit
            icon="alert"
            title="NST/0418 · Shree Balaji"
            meta="Quantity 180, PO says 200"
            status="Open"
            tone="wait"
          />
          <Step
            icon="alert"
            title="MT-7719 · Metro Tubes"
            meta="Rate ₹412, price list ₹398"
            status="Open"
            tone="wait"
          />
          <Step
            icon="repeat"
            title="SE/1179 · Sri Enterprises"
            meta="Same number as last month"
            status="Duplicate"
            tone="accent"
          />
          <Step
            icon="check"
            title="KS-2280 · Kaveri Steel"
            meta="GSTIN differs from record"
            status="Resolved"
          />
        </div>
      </Panel>
      <Card x={326} y={40} w={160} i={2}>
        <div className="p-2">
          <p className="text-[11px] text-ink-2">NST/0418 · PO-7781</p>
          <p className="mt-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-[28px] leading-none text-ink">180</span>
            <span className="text-[11px] text-ink-2">of 200</span>
          </p>
          <p className="mt-1.5 text-[11px] text-ink-2">MS bright bar 12 mm</p>
        </div>
      </Card>
    </Stage>
  );
}

/** Approval: what's ready, the one to check, and nothing posted until a person says yes. */
export function ApproveMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={320} label="For approval · Shalini Iyer" live>
        <div className="flex flex-col gap-2">
          <Step
            icon="file"
            title="Shree Balaji Traders"
            meta="Qty differs · ₹47,636"
            status="Check"
            tone="wait"
          />
          <Step
            turn
            n={2}
            i={0}
            icon="file"
            title="Kaveri Steel"
            meta="Matches PO-7764 · ₹1,18,420"
            status="Match"
          />
          <Step
            turn
            n={2}
            i={1}
            icon="file"
            title="Precision Tools & Co"
            meta="Matches PO-7770 · ₹22,180"
            status="Match"
          />
        </div>
        <Press className="mx-1 mt-2.5 mb-1">Approve 2 matches</Press>
      </Panel>
      <Toast
        x={300}
        y={260}
        w={190}
        tool="Tally"
        title="Posted to Tally"
        meta="Only after approval"
        tone="ok"
      />
    </Stage>
  );
}

/** From anywhere: an invoice scanned on a phone, read into fields in two seconds. */
export function ScanMock() {
  const fields = [
    ['Supplier', 'Shree Balaji Traders', '99%'],
    ['Invoice no.', 'NST/26-27/0418', '99%'],
    ['Purchase order', 'PO-7781', '97%'],
    ['Total incl. GST', '₹47,636', '98%'],
  ] as const;
  return (
    <Stage w={500} accent={P} brand={A}>
      <Phone x={20} y={10} w={180}>
        <div className="px-3 pb-4">
          <p className="text-[12px] font-semibold">Scan an invoice</p>
          <div className="relative mt-2 overflow-hidden rounded-lg border border-line bg-white p-2.5">
            <p className="text-[8.5px] font-semibold tracking-wide">TAX INVOICE</p>
            <p className="text-[8px] text-ink-2">Shree Balaji Traders</p>
            <div className="mt-2 flex flex-col gap-1.5">
              {[80, 62, 70, 48, 66, 40].map((w, k) => (
                <Bar key={k} w={`${w}%`} h={4} />
              ))}
            </div>
            <span className="sc-loop sc-scan absolute inset-x-0 top-0 h-6" />
          </div>
          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[10.5px] text-ink-2">
            <Icon name="scan" size={12} /> Reading…
          </p>
        </div>
      </Phone>
      <Panel
        x={190}
        y={40}
        w={290}
        label="Read from it · 2 s"
        badge={<Status tone="accent">Auto</Status>}
        i={2}
      >
        <div className="px-2">
          {fields.map(([label, value, sure], i) => (
            <div key={label} className="sc-rise" style={{ '--i': i + 2 } as CSSProperties}>
              <Line title={value} meta={label} right={<Status>{sure}</Status>} />
            </div>
          ))}
          <Line
            title="Bright bar 12 mm · 180"
            meta="Quantity"
            right={<Status tone="wait">PO: 200</Status>}
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** Summaries: the month's documents, what matched, and which suppliers need the most checks. */
export function SummaryMock() {
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={40} w={290} label="This month" live>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-3 pb-3">
          <Metric label="Documents read" value={186} delta="12%" size={26} />
          <Metric label="Matched on arrival" value={71} suffix="%" size={26} />
          <Metric label="Exceptions" value={23} size={22} />
          <Metric label="Waiting" value={4} size={22} />
        </div>
      </Panel>
      <Panel x={326} y={20} w={270} label="Documents by day" i={1}>
        <div className="px-3 pb-2">
          <Bars
            values={[80, 89, 69, 100, 86, 34]}
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
            now={3}
            height={120}
          />
        </div>
      </Panel>
      <Panel x={612} y={56} w={270} label="Most checks · by supplier" i={2}>
        <div className="px-2">
          <Line icon="alert" title="Metro Tubes · 7" right={<Status tone="wait">Rates</Status>} />
          <Line
            icon="alert"
            title="Shree Balaji · 5"
            right={<Status tone="wait">Quantities</Status>}
          />
          <Line
            icon="repeat"
            title="Sri Enterprises · 3"
            right={<Status tone="accent">Duplicates</Status>}
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** How it's built: the checks on every invoice, and the approved invoice's fields mapped into Tally. */
export function AiWorkflowsHowBox() {
  const checks = [
    'Quantity matches the PO',
    'Rate within 1% of the price list',
    'Invoice number not seen before',
    'GSTIN matches the supplier',
    'Over ₹1 lakh: two approvals',
  ];
  const map = [
    ['supplier', 'party_ledger'],
    ['invoice_no', 'reference'],
    ['lines[]', 'stock_items[]'],
    ['total', 'amount'],
  ] as const;
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel x={40} y={30} w={340} label="Checks on every invoice" live>
        <div className="px-2">
          {checks.map((check) => (
            <Line key={check} icon="shield" title={check} right={<Status>On</Status>} />
          ))}
        </div>
      </Panel>
      <Panel
        x={360}
        y={300}
        w={320}
        label="Into Tally, once approved"
        badge={
          <span className="flex items-center gap-1.5">
            <ToolMark tool="Tally" size={16} />
          </span>
        }
        i={2}
      >
        <div className="flex flex-col gap-1.5 px-2 pb-2">
          {map.map(([from, to], i) => (
            <span
              key={from}
              className="sc-rise grid grid-cols-[1fr_16px_1fr] items-center gap-2 font-mono text-[11px]"
              style={{ '--i': i + 2 } as CSSProperties}
            >
              <span className="truncate rounded-md bg-fill px-2 py-1.5 text-ink">{from}</span>
              <Icon name="arrow" size={12} className="text-ink-2" />
              <span className="sc-row--lit truncate rounded-md px-2 py-1.5 text-ink">{to}</span>
            </span>
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

export const AiWorkflowsHow = AiWorkflowsHowBox;
