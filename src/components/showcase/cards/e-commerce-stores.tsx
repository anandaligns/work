'use client';

import { Icon } from '../../ui/icon';
import { Chip, Line, Metric, Money, Press, Status, Track } from '../kit';
import { App, Picture, Sheet, Slot, Web } from '../sheet';

/**
 * E-commerce Stores' five screens, from the page's sample business — a handloom label run by Nisha
 * Rao: the kurta on its page, Ananya's ₹2,480 bag paid by UPI, the last two in size M, order
 * YS-1048 on its way, and the orders board.
 */

/** The product page: the kurta, its price, the sizes left and the bag. */
export function Product() {
  return (
    <Web address="fashionstore.in/kurta" className="px-3.5 pt-3">
      <Picture h={96} icon="store" />
      <p className="mt-2.5 text-[14px] leading-tight font-semibold">Indigo block-print kurta</p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <Money>₹1,890</Money>
        <span className="text-[11px] text-ink-3 line-through">₹2,290</span>
        <span className="text-[10.5px] font-medium text-[#136b3d]">17% off</span>
      </p>
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        <Slot>S</Slot>
        <Slot on>M</Slot>
        <Slot>L</Slot>
        <Slot>XL</Slot>
      </div>
      <p className="mt-1.5 text-[10.5px] text-[#a15c00]">Only 2 left in M</p>
      <Press className="mt-2">Add to bag</Press>
    </Web>
  );
}

/** Checkout: the bag, UPI first, one tap to pay. */
export function Checkout() {
  return (
    <App title="Checkout" sub="Secure · fashionstore.in" icon="lock">
      <Line icon="store" title="Indigo kurta" meta="Size M · 1" right={<Money>₹1,890</Money>} />
      <Line icon="store" title="Cotton stole" meta="1" right={<Money>₹590</Money>} />
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Chip on>UPI</Chip>
        <Chip>Card</Chip>
        <Chip>Cash on delivery</Chip>
      </div>
      <Press className="mt-3">Pay ₹2,480</Press>
      <p className="mt-2 flex items-center justify-center gap-1 text-[10.5px] text-ink-2">
        <Icon name="shield" size={10} /> The order exists once it’s paid
      </p>
    </App>
  );
}

/** Stock: the kurta's sizes, M down to two, and the warning before it sells out. */
export function Stock() {
  const sizes: [string, number, boolean?][] = [
    ['S', 6],
    ['M', 2, true],
    ['L', 9],
    ['XL', 4],
  ];
  return (
    <Sheet label="Stock · kurta" live foot={['Low stock', '1 size']}>
      <div className="flex flex-col gap-2">
        {sizes.map(([size, left, low]) => (
          <div
            key={size}
            className={`flex items-center gap-3 rounded-xl border border-line px-3 py-2 ${low ? 'sc-step--lit' : ''}`}
          >
            <span className="sc-tile sc-tile--fill grid size-8 place-items-center rounded-[9px] text-[12px] font-semibold text-ink">
              {size}
            </span>
            <span className="flex-1 text-[12.5px] text-ink">{left} left</span>
            {low ? (
              <Status tone="wait">Gone by Fri</Status>
            ) : (
              <span className="text-[10.5px] text-ink-3">KU-014-{size}</span>
            )}
          </div>
        ))}
      </div>
    </Sheet>
  );
}

/** Order updates: YS-1048 from order to door. */
export function Shipped() {
  return (
    <Sheet label="Order YS-1048" badge={<Status tone="accent">On its way</Status>}>
      <Track
        steps={[
          { title: 'Ordered and paid', meta: 'Mon · UPI', done: true },
          { title: 'Packed', meta: 'Tue · 11:20 am', done: true },
          { title: 'Shipped', meta: 'Tue · 4:05 pm', done: true },
          { title: 'Out for delivery', meta: 'Arrives Thursday' },
        ]}
      />
      <p className="mt-3 rounded-xl bg-fill px-3 py-2 text-[11px] leading-snug text-ink-2">
        Ananya was told on WhatsApp at every step.
      </p>
    </Sheet>
  );
}

/** Your admin: the orders board — paid, cash on delivery, packed and shipped. */
export function Orders() {
  return (
    <Sheet label="Orders" live>
      <Metric label="Sales this month" value="₹4.86 L" delta="14%" size={24} />
      <div className="mt-2">
        <Line
          face="Ananya R"
          title="Ananya R"
          meta="₹2,480 · UPI"
          right={<Status tone="accent">Paid</Status>}
        />
        <Line
          face="Karthik S"
          title="Karthik S"
          meta="₹590 · COD"
          right={<Status tone="wait">COD</Status>}
        />
        <Line face="Divya M" title="Divya M" meta="₹3,140 · card" right={<Status>Packed</Status>} />
      </div>
    </Sheet>
  );
}
