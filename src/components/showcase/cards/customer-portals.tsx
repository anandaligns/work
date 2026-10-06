'use client';

import { Icon } from '../../ui/icon';
import { Field, Line, Money, Press, Status, Track } from '../kit';
import { App, Sheet } from '../sheet';

/**
 * Customer Portals' five screens, from the page's sample business — an Industrial Parts
 * Distributor and its customer Sri Lakshmi Engineering: signing in with a code, order SO-4821
 * shipping today, invoice INV-2291 due, Ramesh's quote request and the certificates.
 */

/** Sign in: a phone number and a one-time code, no password to forget. */
export function SignIn() {
  return (
    <App title="Your orders" sub="Industrial Parts Distributor" icon="lock">
      <Field label="Phone number" value="+91 98450 44412" />
      <span className="mt-3 block text-[11px] text-ink-2">One-time code</span>
      <div className="mt-1 grid grid-cols-6 gap-1">
        {['4', '8', '2', '6', '1', '9'].map((digit, i) => (
          <span
            key={i}
            className={`grid h-9 place-items-center rounded-lg border text-[14px] font-semibold ${i === 5 ? 'sc-field--focus' : 'border-line'}`}
          >
            {digit}
          </span>
        ))}
      </div>
      <Press className="mt-4">See my orders</Press>
      <p className="mt-2 text-center text-[10.5px] text-ink-2">No password to remember</p>
    </App>
  );
}

/** Progress: SO-4821's stages, and today's update from dispatch. */
export function Order() {
  return (
    <Sheet label="Order SO-4821" badge={<Status tone="accent">Ships today</Status>}>
      <Track
        steps={[
          { title: 'Confirmed', meta: '12 Oct · 200 bearings', done: true },
          { title: 'Picked', meta: '14 Oct', done: true },
          { title: 'Packed · 3 cartons', meta: 'Today, 10:40 am', done: true },
          { title: 'Dispatched', meta: 'Today, by 5 pm' },
        ]}
      />
      <p className="mt-3 rounded-xl bg-fill px-3 py-2 text-[11px] leading-snug text-ink">
        <span className="block text-[10px] text-ink-2">Arun, dispatch</span>
        Packed in 3 cartons, ships today.
      </p>
    </Sheet>
  );
}

/** Payments and papers: what's due, what's paid. */
export function Invoices() {
  return (
    <Sheet label="Invoices">
      <div className="sc-step--lit rounded-xl border border-line p-3">
        <p className="text-[11px] text-ink-2">INV-2291 · due 20 Oct</p>
        <p className="mt-1 font-display text-[24px] leading-none text-ink">₹1,82,400</p>
        <Press className="mt-2.5">Pay in the portal</Press>
      </div>
      <div className="mt-1.5">
        <Line icon="receipt" title="INV-2250" meta="2 Oct · NEFT" right={<Status>Paid</Status>} />
        <Line icon="receipt" title="INV-2204" meta="18 Sep · UPI" right={<Status>Paid</Status>} />
      </div>
    </Sheet>
  );
}

/** Requests: Ramesh's quote for 200 bearings, assigned and answered. */
export function Quote() {
  return (
    <Sheet label="REQ-214 · Quote" badge={<Status>Answered</Status>}>
      <p className="rounded-xl bg-fill px-3 py-2 text-[11.5px] leading-snug text-ink">
        <span className="block text-[10px] text-ink-2">Ramesh · 9:20 am</span>
        Price for 200 bearings, 6205-2RS?
      </p>
      <div className="mt-1.5">
        <Line face="Kiran" title="Assigned to Kiran" meta="Sales · 9:22 am" />
        <Line icon="file" title="Quote sent" meta="Valid 15 days" right={<Money>₹92 each</Money>} />
      </div>
      <p className="mt-auto mb-3 flex items-center gap-1.5 text-[10.5px] text-ink-2">
        <Icon name="people" size={11} /> 6 open requests, each with an owner
      </p>
    </Sheet>
  );
}

/** Documents: certificates, invoices and the rate contract, each customer's own. */
export function Documents() {
  return (
    <Sheet label="Documents" foot={['Seen by', 'Your account']}>
      <Line
        icon="file"
        title="Certificate · 6205"
        meta="PDF · 2 pages"
        right={<Status tone="accent">New</Status>}
      />
      <Line icon="receipt" title="Invoice INV-2250" meta="PDF · paid" />
      <Line icon="clipboard" title="Rate contract 2025" meta="Signed · 14 pages" />
      <Line icon="download" title="Delivery notes" meta="12 this year" />
    </Sheet>
  );
}
