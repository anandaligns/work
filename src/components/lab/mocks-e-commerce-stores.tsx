import product from '@/content/products/e-commerce-stores';

import { ToolMark } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import { Card, deep, Face, Head, onColour, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Bars, Chip, Dot, Field, Share, Stat } from './mock-parts';

/**
 * E-commerce Stores' mockups, in the light kit, from the page's own sample business — Fashion / Clothing Store,
 * a handloom label run by Nisha Rao: Ananya's ₹2,480 bag paid by UPI, the last two kurtas in M,
 * order YS-1048 on its way, the orders board and the month's sales. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.fashionstore!.accent;

/** Checkout and payments: the bag, paid by UPI, and the order that exists only once it's paid. */
export function CheckoutMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={20} w={262} i={0}>
        <div className="px-3 pt-3 pb-3">
          <Head icon="cart" accent={P} title="Checkout" meta="Fashion / Clothing Store" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Dot icon="store" tone={P} />}
              title="Indigo block-print kurta"
              meta="Size M · 1"
              right={<span className="text-[11px] font-semibold">₹1,890</span>}
            />
            <Row
              lead={<Dot icon="store" tone={P} />}
              title="Kalamkari cotton stole"
              meta="1"
              right={<span className="text-[11px] font-semibold">₹590</span>}
            />
          </div>
          <div className="mt-2 flex gap-1.5">
            <Chip on accent={A}>
              UPI
            </Chip>
            <Chip accent={A}>Card</Chip>
            <Chip accent={A}>Cash on delivery</Chip>
          </div>
          <span
            className="mt-3 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Pay ₹2,480
          </span>
          <p className="mt-1.5 text-center text-[9.5px] text-ink-3">
            Delivering to Koramangala 560034
          </p>
        </div>
      </Card>
      <Card x={300} y={96} w={200} i={2}>
        <div className="p-3">
          <Head
            tool="Razorpay"
            accent={P}
            title="Confirmed"
            meta="UPI · just now"
            right={<Tag tone="ok">Paid</Tag>}
          />
          <p className="mt-2.5 text-[20px] leading-none font-semibold">₹2,480</p>
          <p className="mt-2 flex items-center gap-1.5 text-[10.5px] text-ink-2">
            <span style={{ color: deep(A) }}>
              <Icon name="check" size={12} strokeWidth={2.4} />
            </span>
            Order YS-1052 created
          </p>
        </div>
      </Card>
      <Pill x={300} y={226} i={4} accent={P}>
        The order exists once it’s paid
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M282 150 C 292 150, 290 130, 300 130']}
        dots={[[282, 150]]}
      />
    </Fit>
  );
}

/** Stock: the kurta's sizes, M down to two, and the warning before it sells out. */
export function StockMock() {
  const sizes = [
    { size: 'S', sku: 'KU-014-S', left: '6', tag: <Tag tone="ok">In stock</Tag> },
    { size: 'M', sku: 'KU-014-M', left: '2', tag: <Tag tone="wait">Low</Tag> },
    { size: 'L', sku: 'KU-014-L', left: '9', tag: <Tag tone="ok">In stock</Tag> },
    { size: 'XL', sku: 'KU-014-XL', left: '4', tag: <Tag tone="ok">In stock</Tag> },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={24} w={262} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head
            icon="database"
            accent={P}
            title="Indigo block-print kurta"
            meta="YS-KU-014 · sizes"
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {sizes.map((s) => (
              <Row
                key={s.size}
                lead={
                  <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#f4f5f7] text-[10px] font-semibold">
                    {s.size}
                  </span>
                }
                title={`${s.left} left`}
                meta={s.sku}
                right={s.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={300} y={70} w={200} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <Dot icon="alert" tone={P} />
            <span className="text-[11.5px] font-semibold">2 left: size M</span>
          </div>
          <p className="mt-2 text-[10.5px] leading-[1.45] text-ink-2">
            38 sold in 30 days. At this rate it sells out by Friday.
          </p>
        </div>
      </Card>
      <Pill x={300} y={186} i={4} accent={P} icon="bell">
        Warned before it sells out
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M282 110 C 292 110, 290 100, 300 100']}
        dots={[[282, 110]]}
      />
    </Fit>
  );
}

/** Order updates: YS-1048 from order to door, and the message that it shipped. */
export function ShippedMock() {
  const steps = [
    { title: 'Ordered', meta: 'Mon, 9:41 pm · paid by UPI', done: true },
    { title: 'Packed', meta: 'Tue, 11:20 am', done: true },
    { title: 'Shipped', meta: 'Tue, 4:05 pm', done: true },
    { title: 'Out for delivery', meta: 'Today, 8:10 am · by 6 pm', done: false },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={236} i={0}>
        <div className="px-3 pt-3 pb-2">
          <Head icon="truck" accent={P} title="Order YS-1048" meta="Ananya R. · ₹2,480" />
          <ol className="relative mt-2.5 flex flex-col gap-2.5">
            <span className="absolute top-3 bottom-3 left-[12.5px] w-px bg-[#e6e7eb]" />
            {steps.map((s) => (
              <li key={s.title} className="relative flex items-center gap-2.5">
                <Dot icon={s.done ? 'check' : 'truck'} tone={P} />
                <span className="min-w-0">
                  <span className="block truncate text-[11.5px] font-medium">{s.title}</span>
                  <span className="block truncate text-[10px] text-ink-3">{s.meta}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Card>
      <Card x={280} y={104} w={220} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <ToolMark tool="WhatsApp" size={16} />
            <span className="text-[10.5px] font-semibold">Fashion / Clothing Store</span>
            <span className="ml-auto text-[9.5px] text-ink-3">4:05 pm</span>
          </div>
          <p className="mt-1.5 text-[11px] leading-[1.45]">
            Your order YS-1048 has shipped. Track it any time from the button below.
          </p>
          <span
            className="mt-2 flex items-center justify-center rounded-[7px] border py-1 text-[10.5px] font-semibold"
            style={{ borderColor: A, color: A }}
          >
            Track order
          </span>
        </div>
      </Card>
      <Pill x={40} y={276} i={4} accent={P} icon="chat">
        An update at every step
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M256 132 C 268 132, 266 140, 280 140']}
        dots={[[256, 132]]}
      />
    </Fit>
  );
}

/** Your admin: the orders board, paid, cash on delivery, packed and shipped. */
export function OrdersMock() {
  const orders = [
    {
      who: 'Ananya R.',
      id: 'YS-1052',
      meta: 'Paid · UPI',
      amount: '₹2,480',
      tag: <Tag tone="ok">Paid</Tag>,
    },
    {
      who: 'Karthik S.',
      id: 'YS-1051',
      meta: 'Cash on delivery',
      amount: '₹590',
      tag: <Tag tone="wait">COD</Tag>,
    },
    {
      who: 'Divya M.',
      id: 'YS-1049',
      meta: 'Paid · card',
      amount: '₹3,140',
      tag: <Tag>Packed</Tag>,
    },
    {
      who: 'Meera P.',
      id: 'YS-1045',
      meta: 'Arrives Wed',
      amount: '₹840',
      tag: (
        <Tag tone="accent" accent={A}>
          Shipped
        </Tag>
      ),
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={292} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head
            icon="cart"
            accent={P}
            title="Orders"
            meta="Nisha Rao · Owner"
            right={
              <Tag tone="accent" accent={A}>
                12 open
              </Tag>
            }
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {orders.map((o) => (
              <Row
                key={o.id}
                lead={<Face name={o.who} />}
                title={`${o.id} · ${o.who}`}
                meta={`${o.meta} · ${o.amount}`}
                right={o.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={330} y={96} w={170} i={2}>
        <div className="p-3">
          <div className="flex flex-col gap-3">
            <Stat label="Products" value="86" accent={A} size={18} />
            <Stat label="Low stock" value="3" accent={A} size={18} />
          </div>
        </div>
      </Card>
      <Pill x={300} y={236} i={4} accent={P} icon="store">
        Run by you, no developer
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M312 140 C 322 140, 320 130, 330 130']}
        dots={[[312, 140]]}
      />
    </Fit>
  );
}

/** Reports: the month's sales and orders, and where the orders came from. */
export function SalesMock() {
  const sources = [
    { label: 'Instagram', value: 38 },
    { label: 'Google', value: 24 },
    { label: 'Typed in', value: 18 },
    { label: 'WhatsApp shares', value: 12 },
    { label: 'Email', value: 8 },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={36} w={300} i={0}>
        <div className="p-3.5">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            This month
          </p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Stat label="Sales" value="₹4.86 L" delta="24%" accent={A} />
            <Stat label="Orders" value="212" delta="18%" accent={A} />
            <Stat label="Average order" value="₹2,292" delta="5%" accent={A} size={17} />
            <Stat label="Returning" value="31%" delta="4 pts" accent={A} size={17} />
          </div>
        </div>
      </Card>
      <Card x={352} y={56} w={250} i={2}>
        <div className="p-3.5">
          <Head icon="chart" accent={P} title="Sales by day" />
          <div className="mt-3">
            <Bars values={[35, 53, 44, 65, 56, 76, 91, 71, 85, 100]} accent={A} height={96} />
          </div>
        </div>
      </Card>
      <Card x={626} y={92} w={226} i={3}>
        <div className="p-3.5">
          <Head icon="target" accent={P} title="Where orders came from" meta="212 orders" />
          <div className="mt-3 flex flex-col gap-2">
            {sources.map((s) => (
              <Share key={s.label} label={s.label} value={s.value} accent={A} />
            ))}
          </div>
        </div>
      </Card>
      <Pill x={352} y={272} i={4} accent={P} icon="trend">
        See what sells, and where it sells
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M328 100 C 340 100, 340 110, 352 110', 'M602 130 C 614 130, 614 140, 626 140']}
        dots={[
          [328, 100],
          [602, 130],
        ]}
      />
    </Fit>
  );
}

export const E_COMMERCE_MOCKS = [CheckoutMock, StockMock, ShippedMock, OrdersMock, SalesMock];

/** How it's built: the product as you edit it in the admin, and the bag it lands in. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function ECommerceHowScene({ box = false }: { box?: boolean }) {
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={26} w={300} i={0}>
          <div className="p-3.5">
            <Head
              icon="pen"
              accent={P}
              title="Indigo block-print kurta"
              meta="Kurtas"
              right={<Tag tone="ok">On the store</Tag>}
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Field label="Price" value="₹1,890" accent={A} />
              <Field label="Was" value="₹2,290" accent={A} />
            </div>
            <div className="mt-2">
              <Field label="Sizes" value="S 6 · M 2 · L 9 · XL 4" accent={A} />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <Chip on accent={A}>
                Cash on delivery
              </Chip>
              <Chip accent={A}>Free delivery over ₹999</Chip>
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={392} y={56} w={340} i={2}>
          <div className="px-3.5 pt-3.5 pb-2">
            <Head icon="cart" accent={P} title="Your bag" meta="fashionclothingstore.in" />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              <Row
                lead={<Dot icon="store" tone={P} />}
                title="Indigo block-print kurta"
                meta="Size M · Qty 1"
                right={<span className="text-[11px] font-semibold">₹1,890</span>}
              />
              <Row
                lead={<Dot icon="store" tone={P} />}
                title="Kalamkari cotton stole"
                meta="Qty 1"
                right={<span className="text-[11px] font-semibold">₹590</span>}
              />
            </div>
            <span
              className="mt-2 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
              style={{ background: A, color: onColour(A) }}
            >
              Checkout
            </span>
          </div>
        </Card>
        <Pill x={420} y={236} i={4} accent={P}>
          Changed in the admin, live on the store
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M356 126 H 396 V 272']}
          dots={[
            [356, 126],
            [396, 272],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M324 110 C 358 110, 358 120, 392 120']}
          dots={[
            [324, 110],
            [392, 120],
          ]}
        />
      )}
    </Fit>
  );
}

export function ECommerceHow() {
  return <ECommerceHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function ECommerceHowBox() {
  return <ECommerceHowScene box />;
}
