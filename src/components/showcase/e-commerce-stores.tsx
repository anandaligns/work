'use client';

import product from '@/content/products/e-commerce-stores';

import { ToolMark } from '../ui/brand-logos';
import { BRANDS } from '../visuals/concept-sites';
import {
  Bars,
  Card,
  Chip,
  Field,
  Line,
  Meter,
  Metric,
  Money,
  Panel,
  Press,
  Stage,
  Status,
  Step,
  Toast,
  Track,
} from './kit';

/**
 * E-commerce Stores, in the showcase kit, from the page's own sample business — a handloom label
 * run by Nisha Rao: Ananya's ₹2,480 bag paid by UPI, the last two kurtas in M, order YS-1048 on its
 * way, the orders board and the month's sales.
 */
const P = product.accent;
const A = BRANDS.fashionstore!.accent;

/** Checkout and payments: the bag, paid by UPI, and the order that exists only once it's paid. */
export function CheckoutMock() {
  return (
    <Stage w={480} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={290}
        label="Checkout · your store"
        badge={<Status tone="accent">Secure</Status>}
        foot={['Deliver to', 'Koramangala']}
      >
        <div className="px-2">
          <Line
            icon="store"
            title="Indigo block-print kurta"
            meta="Size M · 1"
            right={<Money>₹1,890</Money>}
          />
          <Line icon="store" title="Kalamkari cotton stole" meta="1" right={<Money>₹590</Money>} />
          <div className="mt-2 flex gap-1.5">
            <Chip on>UPI</Chip>
            <Chip>Card</Chip>
            <Chip>Cash on delivery</Chip>
          </div>
          <Press className="mt-3 mb-1">Pay ₹2,480</Press>
        </div>
      </Panel>
      <Toast
        x={250}
        y={232}
        w={230}
        tool="Razorpay"
        title="₹2,480 paid by UPI"
        meta="Order YS-1052 created"
      />
    </Stage>
  );
}

/** Stock: the kurta's sizes, M down to two, and the warning before it sells out. */
export function StockMock() {
  return (
    <Stage w={480} accent={P} brand={A}>
      <Panel x={20} y={20} w={300} label="Stock · Indigo kurta" live>
        <div className="flex flex-col gap-2">
          <Step mark="S" title="6 left" meta="KU-014-S" status="In stock" />
          <Step lit mark="M" title="2 left" meta="KU-014-M" status="Low" tone="wait" />
          <Step mark="L" title="9 left" meta="KU-014-L" status="In stock" />
          <Step mark="XL" title="4 left" meta="KU-014-XL" status="In stock" />
        </div>
      </Panel>
      <Toast
        x={236}
        y={118}
        w={236}
        icon="bell"
        title="2 left in size M"
        meta="At this rate, gone by Friday"
      />
    </Stage>
  );
}

/** Order updates: YS-1048 from order to door, and the message that it shipped. */
export function ShippedMock() {
  return (
    <Stage w={480} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={280}
        label="Order YS-1048"
        badge={<Status tone="accent">On its way</Status>}
        foot={['Ananya R.', '₹2,480']}
      >
        <Track
          steps={[
            { title: 'Ordered', meta: 'Mon 9:41 pm · paid by UPI', done: true },
            { title: 'Packed', meta: 'Tue 11:20 am', done: true },
            { title: 'Shipped', meta: 'Tue 4:05 pm', done: true },
            { title: 'Out for delivery', meta: 'Today · by 6 pm' },
          ]}
        />
      </Panel>
      <Toast
        x={244}
        y={188}
        w={236}
        tool="WhatsApp"
        title="Your order has shipped"
        meta="Track it any time · 4:05 pm"
      />
    </Stage>
  );
}

/** Your admin: the orders board — paid, cash on delivery, packed and shipped. */
export function OrdersMock() {
  return (
    <Stage w={480} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={320}
        label="Orders · your admin"
        badge={<Status tone="accent">12 open</Status>}
      >
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            face="Ananya R"
            title="YS-1052 · Ananya R."
            meta="UPI · ₹2,480"
            status="Paid"
          />
          <Step
            turn
            n={4}
            i={1}
            face="Karthik S"
            title="YS-1051 · Karthik S."
            meta="Cash on delivery · ₹590"
            status="COD"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={2}
            face="Divya M"
            title="YS-1049 · Divya M."
            meta="Card · ₹3,140"
            status="Packed"
            tone="muted"
          />
          <Step
            turn
            n={4}
            i={3}
            face="Meera P"
            title="YS-1045 · Meera P."
            meta="Arrives Wed · ₹840"
            status="Shipped"
            tone="accent"
          />
        </div>
      </Panel>
      <Card x={322} y={150} w={140} i={2}>
        <div className="grid gap-3 p-2">
          <Metric label="Products" value={86} size={24} />
          <Metric label="Low stock" value={3} size={24} />
        </div>
      </Card>
    </Stage>
  );
}

/** Reports: the month's sales and orders, sales by day, and where the orders came from. */
export function SalesMock() {
  const sources = [
    ['Instagram', 38],
    ['Google', 24],
    ['Typed in', 18],
    ['WhatsApp', 12],
    ['Email', 8],
  ] as const;
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={40} w={290} label="This month" live>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-3 pb-3">
          <Metric label="Sales" value="₹4.86 L" delta="24%" size={26} />
          <Metric label="Orders" value={212} delta="18%" size={26} />
          <Metric label="Average order" value={2292} prefix="₹" size={22} />
          <Metric label="Returning" value={31} suffix="%" delta="4 pts" size={22} />
        </div>
      </Panel>
      <Panel x={326} y={20} w={270} label="Sales by day" i={1}>
        <div className="px-3 pb-2">
          <Bars
            values={[35, 53, 44, 65, 56, 76, 91, 71, 85, 100]}
            labels={['1', '', '', '', '', '', '', '', '', '30']}
            height={128}
          />
        </div>
      </Panel>
      <Panel x={612} y={56} w={270} label="Where orders came from" i={2}>
        <div className="flex flex-col gap-2.5 px-3 pb-3">
          {sources.map(([label, value], i) => (
            <Meter
              key={label}
              i={i}
              value={value}
              label={
                <span className="flex items-center gap-1.5">
                  {label === 'Typed in' || label === 'Email' ? null : (
                    <ToolMark tool={label} size={12} />
                  )}
                  {label}
                </span>
              }
            />
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

/** How it's built: the kurta as Nisha edits it in the admin, and the bag it lands in. */
export function ECommerceHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel
        x={40}
        y={30}
        w={340}
        label="Admin · Indigo kurta"
        badge={<Status>On the store</Status>}
      >
        <div className="flex flex-col gap-2.5 px-2 pb-2">
          <div className="grid grid-cols-2 gap-2">
            <Field label="Price" value="₹1,890" focus />
            <Field label="Was" value="₹2,290" />
          </div>
          <Field label="Sizes" value="S 6 · M 2 · L 9 · XL 4" />
          <div className="flex flex-wrap gap-1.5">
            <Chip on>Cash on delivery</Chip>
            <Chip>Free delivery over ₹999</Chip>
          </div>
        </div>
      </Panel>
      <Panel x={320} y={300} w={360} label="Your bag · fashionstore.in" i={2}>
        <div className="px-2 pb-1">
          <Line
            icon="store"
            title="Indigo block-print kurta"
            meta="Size M · 1"
            right={<Money>₹1,890</Money>}
          />
          <Line icon="store" title="Kalamkari cotton stole" meta="1" right={<Money>₹590</Money>} />
          <Press className="mt-2 mb-1">Checkout</Press>
        </div>
      </Panel>
      <Toast
        x={430}
        y={206}
        w={260}
        icon="store"
        title="Live on the store"
        meta="Changed in the admin, just now"
      />
    </Stage>
  );
}

export const ECommerceHow = ECommerceHowBox;
