'use client';

import product from '@/content/products/customer-portals';

import { BRANDS } from '../visuals/concept-sites';
import {
  Card,
  Checks,
  Chip,
  Field,
  Line,
  Metric,
  Panel,
  Press,
  Stage,
  Status,
  Step,
  Toast,
  Track,
} from './kit';

/**
 * Customer Portals, in the showcase kit, from the page's own sample business — an Industrial Parts
 * Distributor and its customer Sri Lakshmi Engineering: order SO-4821 packed and shipping today,
 * invoice INV-2291 due, Ramesh's quote request for 200 bearings, the team's customers and the test
 * certificates.
 */
const P = product.accent;
const A = BRANDS.partsdistributor!.accent;

/** Progress: the order's stages, and today's update from dispatch. */
export function ProgressMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={260}
        label="Order SO-4821"
        badge={<Status tone="accent">Ships today</Status>}
        foot={['Sri Lakshmi Engg.', '3 cartons']}
      >
        <Track
          steps={[
            { title: 'Order placed', meta: '16 Sep', done: true },
            { title: 'Picked and checked', meta: '17 Sep', done: true },
            { title: 'Packing', meta: '3 cartons · ships 4 pm' },
            { title: 'Delivery', meta: 'Tomorrow, by noon' },
          ]}
        />
      </Panel>
      <Card x={262} y={96} w={226} i={2}>
        <div className="p-2">
          <p className="text-[11.5px] text-ink-2">Today’s update · Arun, dispatch</p>
          <div className="mt-3">
            <Checks
              items={[
                { text: '6205 bearings × 200', done: true },
                { text: 'V-belts B-52 × 40', done: true },
                { text: 'Test certificates' },
              ]}
            />
          </div>
          <div className="mt-3 flex gap-1.5">
            <Chip>3 photos</Chip>
            <Chip on>4 pm</Chip>
          </div>
        </div>
      </Card>
    </Stage>
  );
}

/** Payments and papers: what's due, what's paid, and the receipts beside them. */
export function PaymentsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={290}
        label="Invoices"
        badge={<Status tone="wait">1 due</Status>}
        foot={['Paid this year', '₹8.6 L']}
      >
        <div className="mx-1 rounded-xl border border-line p-3">
          <p className="text-[11.5px] text-ink-2">INV-2291 · due 20 Oct</p>
          <p className="mt-1 font-display text-[26px] leading-none text-ink">₹1,82,400</p>
          <Press className="mt-3">Pay in the portal</Press>
        </div>
        <div className="px-2 pt-1">
          <Line
            icon="check"
            title="INV-2250 · SO-4790"
            meta="2 Oct · NEFT"
            right={<Status>Paid</Status>}
          />
          <Line
            icon="check"
            title="INV-2204 · SO-4712"
            meta="18 Sep · UPI"
            right={<Status>Paid</Status>}
          />
        </div>
      </Panel>
      <Toast
        x={266}
        y={58}
        w={226}
        icon="receipt"
        title="Receipt · INV-2250"
        meta="Saved to Documents"
      />
    </Stage>
  );
}

/** Requests: Ramesh's quote request, assigned and answered, with the others waiting. */
export function RequestsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={300}
        label="REQ-214 · Quote"
        badge={<Status tone="accent">Answered</Status>}
        foot={['200 × 6205', '₹92 each']}
      >
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            face="Ramesh Kumar"
            title="Ramesh asked in the portal"
            meta="Today, 9:20 am"
          />
          <Step
            turn
            n={3}
            i={1}
            icon="userCheck"
            title="Assigned to Kiran, sales"
            meta="Today, 9:22 am"
          />
          <Step
            turn
            n={3}
            i={2}
            icon="receipt"
            title="Quote sent · ₹92 each"
            meta="Valid 15 days · 11:05 am"
            status="Sent"
          />
        </div>
      </Panel>
      <Toast
        x={258}
        y={256}
        w={232}
        icon="layers"
        title="6 open requests"
        meta="Every one has an owner"
      />
    </Stage>
  );
}

/** Your team's admin: every customer, their open order, what's due and how it's going. */
export function ProjectsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={320} label="Customers · your team" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            face="Ramesh Kumar"
            title="Sri Lakshmi Engg."
            meta="SO-4821 · packing"
            status="On track"
          />
          <Step
            turn
            n={4}
            i={1}
            face="Farhan Ali"
            title="Apex Tools"
            meta="SO-4818 · picked"
            status="On track"
          />
          <Step
            turn
            n={4}
            i={2}
            face="Deepa Rao"
            title="Metro Pumps"
            meta="Invoice 5 days late"
            status="Chase"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={3}
            face="Sanjay Iyer"
            title="Kaveri Motors"
            meta="SO-4809 · delivering"
            status="Today"
            tone="accent"
          />
        </div>
      </Panel>
      <Card x={324} y={130} w={160} i={2}>
        <div className="grid gap-3 p-2">
          <Metric label="Open orders" value={42} size={24} />
          <Metric label="Due this month" value="₹11.4 L" size={22} />
        </div>
      </Card>
    </Stage>
  );
}

/** Documents: certificates, invoices and the rate contract — each customer sees only their own. */
export function DocumentsMock() {
  const docs = [
    ['Test certificate · 6205.pdf', 'Certificates · Quality', 'Today'],
    ['Invoice INV-2291.pdf', 'Invoices · Accounts', '16 Sep'],
    ['Receipt · INV-2250.pdf', 'Receipts · Accounts', '2 Oct'],
    ['Rate contract · 2026.pdf', 'Agreements · Sales', '1 Apr'],
  ] as const;
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={400}
        label="Documents · Sri Lakshmi Engg."
        badge={
          <Status tone="muted" icon="lock">
            Private
          </Status>
        }
        foot={['Files', '46']}
      >
        <div className="px-2">
          {docs.map(([name, kind, when]) => (
            <Line
              key={name}
              icon="file"
              title={name}
              meta={kind}
              right={<span className="text-[11px] text-ink-2">{when}</span>}
            />
          ))}
        </div>
      </Panel>
      <Card x={440} y={50} w={240} i={2}>
        <div className="p-2">
          <p className="text-[13px] font-medium text-ink">Test certificate · 6205</p>
          <p className="text-[11px] text-ink-2">Certificates · 2 pages</p>
          <div className="mt-3 h-24 rounded-lg border border-line bg-fill/50 p-2">
            <svg
              viewBox="0 0 200 80"
              className="size-full"
              fill="none"
              stroke={A}
              strokeWidth="1.3"
            >
              <circle cx="40" cy="40" r="32" />
              <circle cx="40" cy="40" r="13" />
              {Array.from({ length: 10 }, (_, k) => (
                <circle
                  key={k}
                  cx={(40 + 22.5 * Math.cos((k * Math.PI) / 5)).toFixed(2)}
                  cy={(40 + 22.5 * Math.sin((k * Math.PI) / 5)).toFixed(2)}
                  r="4"
                />
              ))}
              <line x1="92" y1="18" x2="190" y2="18" />
              <line x1="92" y1="34" x2="172" y2="34" />
              <line x1="92" y1="50" x2="184" y2="50" />
              <line x1="92" y1="66" x2="160" y2="66" />
            </svg>
          </div>
        </div>
      </Card>
      <Toast
        x={600}
        y={230}
        w={250}
        icon="lock"
        title="Ramesh viewed it today"
        meta="Only his account sees it"
      />
    </Stage>
  );
}

/** How it's built: the team posts an update; the customer signs in with a code and sees it. */
export function CustomerPortalsHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel
        x={40}
        y={30}
        w={340}
        label="Post an update"
        badge={<Status tone="accent">Team</Status>}
      >
        <div className="flex flex-col gap-2.5 px-2 pb-2">
          <Field label="Customer" value="Sri Lakshmi Engg. · SO-4821" />
          <Field label="What happened" value="Packed in 3 cartons, ships today." focus />
          <div className="flex flex-wrap gap-1.5">
            <Chip>3 photos</Chip>
            <Chip on>Tell them on WhatsApp</Chip>
          </div>
        </div>
      </Panel>
      <Panel x={360} y={290} w={300} label="Sign in · no password" i={2}>
        <div className="flex flex-col gap-2.5 px-2 pb-2">
          <Field label="Phone number" value="+91 98450 44412" />
          <Field label="One-time code" value="4  8  2  6  1  9" focus />
          <Press>See my orders</Press>
        </div>
      </Panel>
      <Toast
        x={420}
        y={180}
        w={250}
        tool="WhatsApp"
        title="SO-4821 packed"
        meta="Ships today · 3 photos"
      />
    </Stage>
  );
}

export const CustomerPortalsHow = CustomerPortalsHowBox;
