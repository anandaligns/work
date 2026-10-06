'use client';

import type { CSSProperties } from 'react';

import product from '@/content/products/api-integrations';

import { ToolMark } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import { Card, Line, Metric, Panel, Stage, Status, Step, Toast } from './kit';

/**
 * API Integrations, in the showcase kit, from the page's own sample business — an Online Travel
 * Agency and Rohan in accounts: a booking mapped once into its invoice, the day's settlement matched,
 * the failures that reach him and the ones that fix themselves, the packages sheet that updates
 * itself, and the calls and keys underneath.
 */
const P = product.accent;
const A = BRANDS.travelagency!.accent;

/** A field's name, set in mono on grey. */
function Code({ children }: { children: string }) {
  return (
    <span className="truncate rounded-md bg-fill px-2 py-1.5 font-mono text-[11px] text-ink">
      {children}
    </span>
  );
}

/** Enter it once: the booking's fields mapped to the invoice's, and the rules on the way. */
export function MappingMock() {
  const fields = [
    ['traveller.name', 'customer_name'],
    ['trip.package', 'item.sku'],
    ['total_tax', 'tax_total'],
  ] as const;
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={300} label="Mapped once" live>
        <div className="px-2 pb-2">
          <div className="flex items-center justify-between pb-2 text-[12px] font-medium text-ink">
            <span className="flex items-center gap-1.5">
              <ToolMark tool="WooCommerce" size={15} /> Booking
            </span>
            <Icon name="arrow" size={13} className="text-ink-2" />
            <span className="flex items-center gap-1.5">
              <ToolMark tool="Zoho" size={15} /> Invoice
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {fields.map(([from, to], i) => (
              <span
                key={from}
                className="sc-rise grid grid-cols-[1fr_16px_1fr] items-center gap-2"
                style={{ '--i': i + 1 } as CSSProperties}
              >
                <Code>{from}</Code>
                <span className="sc-tile--accent grid size-4 place-items-center rounded-full">
                  <Icon name="arrow" size={10} />
                </span>
                <Code>{to}</Code>
              </span>
            ))}
          </div>
        </div>
      </Panel>
      <Panel x={290} y={140} w={200} label="Rules" i={2}>
        <div className="px-2">
          <Line icon="receipt" title="GST by state" meta="IGST outside Karnataka" />
          <Line icon="person" title="New customer, once" meta="Matched by phone" />
          <Line icon="repeat" title="Refunds → notes" meta="Linked to invoice" />
        </div>
      </Panel>
    </Stage>
  );
}

/** Books that match: the day's settlement, every payment matched to its invoice. */
export function ReconMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={320} label="Reconciliation · today" badge={<Status>18 of 19</Status>}>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            tool="Razorpay"
            title="pay_Pk3Xa91 → INV-1182"
            meta="₹48,600 · 9:52 am"
            status="Matched"
          />
          <Step
            turn
            n={4}
            i={1}
            tool="Razorpay"
            title="pay_Pk3Xb27 → INV-1183"
            meta="₹12,400 · 9:52 am"
            status="Matched"
          />
          <Step
            turn
            n={4}
            i={2}
            tool="Razorpay"
            title="pay_Pk3Wz88 → INV-1177"
            meta="₹6,200 · refund"
            status="Refund"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={3}
            tool="Razorpay"
            title="pay_Pk3Wx40"
            meta="₹31,000 · no invoice yet"
            status="Check"
            tone="accent"
          />
        </div>
      </Panel>
      <Card x={320} y={190} w={170} i={3}>
        <div className="p-2">
          <Metric label="Settled today" value={284600} prefix="₹" size={22} />
        </div>
      </Card>
    </Stage>
  );
}

/** Failures you hear about: what needs Rohan, and what was retried, renewed or skipped on its own. */
export function ErrorsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={320} label="Errors and retries · week" live>
        <div className="flex flex-col gap-2">
          <Step
            lit
            tool="Tally"
            title="Tally ledger missing"
            meta="“Visa fees” · voucher held"
            status="Needs you"
            tone="wait"
          />
          <Step
            icon="refresh"
            title="Hotel API timed out"
            meta="TR-2286 · retried after 2 min"
            status="Retried"
          />
          <Step
            tool="Zoho"
            title="Zoho token expiring"
            meta="Renewed before it lapsed"
            status="Renewed"
          />
          <Step
            icon="refresh"
            title="Webhook twice · TR-2280"
            meta="Second copy ignored"
            status="Skipped"
            tone="muted"
          />
        </div>
      </Panel>
      <Toast x={286} y={40} w={204} tool="WhatsApp" title="To Rohan" meta="Voucher held · Tally" />
    </Stage>
  );
}

/** Sheets and Workspace: the packages sheet, updated by every booking. */
export function SheetMock() {
  const rows = [
    ['GOA-3N', 'Goa · 3 nights', '44', '11'],
    ['KER-5N', 'Kerala · 5 nights', '31', '6'],
    ['AND-6N', 'Andaman · 6 nights', '12', '2'],
    ['COO-2N', 'Coorg · 2 nights', '58', '4'],
  ] as const;
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={330}
        label="Packages · October"
        badge={<Status tone="accent">Live sync</Status>}
      >
        <div className="mx-1 overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-[4.25rem_1fr_3rem_2.5rem] gap-2 bg-fill px-3 py-2 text-[10.5px] text-ink-2">
            <span>Code</span>
            <span>Package</span>
            <span className="text-right">Booked</span>
            <span className="text-right">Left</span>
          </div>
          {rows.map(([code, name, booked, left], i) => (
            <div
              key={code}
              className={`grid grid-cols-[4.25rem_1fr_3rem_2.5rem] gap-2 border-t border-line px-3 py-2 text-[12px] ${i === 0 ? 'sc-row--lit' : ''}`}
            >
              <span className="font-mono text-[11px] text-ink">{code}</span>
              <span className="truncate text-ink">{name}</span>
              <span className="text-right font-medium text-ink tabular-nums">{booked}</span>
              <span className="text-right text-ink-2 tabular-nums">{left}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-2 pt-3 pb-1 text-[11.5px] text-ink-2">
          <ToolMark tool="Google Sheets" size={14} /> Updated by every booking
        </div>
      </Panel>
      <Toast x={300} y={240} w={190} icon="table" title="GOA-3N: 13 → 11" meta="After TR-2291" />
    </Stage>
  );
}

/** Under the hood: the calls made in the last hour, and the keys they use, kept safe. */
export function RequestsMock() {
  const calls = [
    ['POST', '/books/v3/invoices', '201', '312 ms'],
    ['POST', '/sheets/v4/values:append', '200', '188 ms'],
    ['GET', '/wc/v3/orders/2291', '200', '96 ms'],
  ] as const;
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel
        x={20}
        y={40}
        w={430}
        label="Requests · last hour"
        badge={<Status tone="muted">Official APIs</Status>}
      >
        <div className="mx-1 flex flex-col gap-1.5 pb-2">
          {calls.map(([method, path, code, ms], i) => (
            <div
              key={path}
              className="sc-rise grid grid-cols-[3rem_1fr_2.5rem_3.5rem] items-center gap-2 rounded-lg bg-fill px-3 py-2 font-mono text-[11.5px]"
              style={{ '--i': i + 1 } as CSSProperties}
            >
              <span className="sc-code font-semibold">{method}</span>
              <span className="truncate text-ink">{path}</span>
              <span className="sc-code">{code}</span>
              <span className="text-right text-ink-2">{ms}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel x={470} y={20} w={400} label="Keys · never in a spreadsheet" i={1}>
        <div className="flex flex-col gap-2">
          <Step tool="Razorpay" title="Razorpay" meta="Live key · stored encrypted" status="Live" />
          <Step tool="Zoho" title="Zoho Books" meta="OAuth · renews on its own" status="Live" />
          <Step
            tool="WhatsApp"
            title="WhatsApp"
            meta="Access token · rotated monthly"
            status="Live"
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** How it's built: the sync log of every run, and one booking through every tool. */
export function ApiIntegrationsHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel x={40} y={30} w={360} label="Sync log" live>
        <div className="px-2">
          <Line
            icon="history"
            title="Booking → invoice, voucher, sheet"
            meta="10:14 am · 1.4 s"
            right={<Status>Done</Status>}
          />
          <Line
            icon="history"
            title="Settlement → reconciliation"
            meta="9:52 am · 19 records"
            right={<Status>Done</Status>}
          />
          <Line
            icon="history"
            title="Invoices → Tally vouchers"
            meta="2:00 am · 48 records"
            right={<Status tone="wait">1 held</Status>}
          />
        </div>
      </Panel>
      <Panel
        x={350}
        y={230}
        w={330}
        label="Booking TR-2291"
        badge={<Status tone="accent">By hand: 0</Status>}
        i={2}
      >
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            tool="WooCommerce"
            title="Booking placed"
            meta="9:41 am · website"
            status="Done"
          />
          <Step
            turn
            n={4}
            i={1}
            tool="Razorpay"
            title="Payment captured"
            meta="9:41 am · UPI"
            status="Done"
          />
          <Step
            turn
            n={4}
            i={2}
            tool="Zoho"
            title="Invoice INV-1182"
            meta="9:41 am · GST 5%"
            status="Done"
          />
          <Step
            turn
            n={4}
            i={3}
            tool="WhatsApp"
            title="Voucher sent"
            meta="9:42 am · to Meera"
            status="Done"
          />
        </div>
      </Panel>
    </Stage>
  );
}

export const ApiIntegrationsHow = ApiIntegrationsHowBox;
