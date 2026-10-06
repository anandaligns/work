import product from '@/content/products/api-integrations';

import { ToolMark } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import { Card, deep, Head, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Dot, Stat } from './mock-parts';

/**
 * API Integrations' mockups, in the light kit, from the page's own sample business — an Online
 * Travel Agency and Rohan in accounts: a booking mapped once into its invoice, the day's settlement
 * matched, the failures that reach him and the ones that fix themselves, the packages sheet that
 * updates itself, and the calls and keys underneath. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.travelagency!.accent;

/** A tool's mark in a small grey disc, for a row's lead. */
function Mark({ tool }: { tool: string }) {
  return (
    <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#f4f5f7]">
      <ToolMark tool={tool} size={13} />
    </span>
  );
}

/** Enter it once: the booking's fields mapped to the invoice's, and the rules on the way. */
export function MappingMock() {
  const fields = [
    ['traveller.name', 'customer_name'],
    ['trip.package', 'item.sku'],
    ['total_tax', 'tax_total'],
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={24} w={268} i={0}>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10.5px] font-semibold">
              <ToolMark tool="WooCommerce" size={14} /> Booking
            </span>
            <span className="text-ink-3">
              <Icon name="arrow" size={12} />
            </span>
            <span className="flex items-center gap-1.5 text-[10.5px] font-semibold">
              <ToolMark tool="Zoho Books" size={14} /> Invoice
            </span>
          </div>
          <div className="mt-2.5 flex flex-col gap-1.5">
            {fields.map(([from, to]) => (
              <span key={from} className="grid grid-cols-[1fr_14px_1fr] items-center gap-1.5">
                <span className="truncate rounded-[7px] bg-[#f4f5f7] px-1.5 py-1 font-mono text-[9.5px]">
                  {from}
                </span>
                <span style={{ color: deep(A) }}>
                  <Icon name="arrow" size={11} />
                </span>
                <span
                  className="truncate rounded-[7px] px-1.5 py-1 font-mono text-[9.5px]"
                  style={{ background: `color-mix(in srgb, ${A} 10%, white)` }}
                >
                  {to}
                </span>
              </span>
            ))}
          </div>
        </div>
      </Card>
      <Card x={306} y={60} w={194} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="tasks" accent={P} title="Rules" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="GST by the state" meta="IGST outside Karnataka" />
            <Row title="New customer, once" meta="Matched by phone and email" />
            <Row title="Refunds → credit notes" meta="Linked to the invoice" />
          </div>
        </div>
      </Card>
      <Pill x={40} y={200} i={4} accent={P} icon="check">
        Typed once, by the traveller
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M288 100 C 298 100, 296 110, 306 110']}
        dots={[[288, 100]]}
      />
    </Fit>
  );
}

/** Books that match: the day's settlement, every payment matched to its invoice. */
export function ReconMock() {
  const rows = [
    { p: 'pay_Pk3Xa91 → INV-1182', m: '₹48,600 · 9:52 am', tag: <Tag tone="ok">Matched</Tag> },
    { p: 'pay_Pk3Xb27 → INV-1183', m: '₹12,400 · 9:52 am', tag: <Tag tone="ok">Matched</Tag> },
    { p: 'pay_Pk3Wz88 → INV-1177', m: '₹6,200 · refund', tag: <Tag tone="wait">Refund</Tag> },
    {
      p: 'pay_Pk3Wx40',
      m: '₹31,000 · no invoice yet',
      tag: (
        <Tag tone="accent" accent={A}>
          Check
        </Tag>
      ),
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={290} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head tool="Razorpay" accent={P} title="Reconciliation" meta="Settled today" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {rows.map((r) => (
              <Row key={r.p} title={r.p} meta={r.m} right={r.tag} />
            ))}
          </div>
        </div>
      </Card>
      <Card x={328} y={84} w={172} i={2}>
        <div className="flex flex-col gap-3 p-3">
          <Stat label="Settled today" value="₹2,84,600" accent={A} size={18} />
          <Stat label="Matched" value="18 of 19" accent={A} size={18} />
        </div>
      </Card>
      <Pill x={40} y={266} i={4} accent={P} icon="receipt">
        Books that match the bank
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M310 110 C 320 110, 318 120, 328 120']}
        dots={[[310, 110]]}
      />
    </Fit>
  );
}

/** Failures you hear about: what needs Rohan, and what was retried, renewed or skipped on its own. */
export function ErrorsMock() {
  const errs = [
    {
      t: 'Tally ledger missing',
      m: '“Visa fees” · voucher held',
      tag: <Tag tone="wait">Needs you</Tag>,
      tone: A,
    },
    {
      t: 'Hotel API timed out',
      m: 'TR-2286 · retried after 2 min',
      tag: <Tag tone="ok">Retried</Tag>,
      tone: A,
    },
    {
      t: 'Zoho token expiring',
      m: 'Renewed before it lapsed',
      tag: <Tag tone="ok">Renewed</Tag>,
      tone: A,
    },
    {
      t: 'Webhook twice · TR-2280',
      m: 'Second copy ignored',
      tag: <Tag>Skipped</Tag>,
      tone: P,
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={294} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="alert" accent={P} title="Errors and retries" meta="This week" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {errs.map((e) => (
              <Row
                key={e.t}
                lead={<Dot icon="refresh" tone={e.tone} />}
                title={e.t}
                meta={e.m}
                right={e.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={332} y={96} w={168} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <ToolMark tool="WhatsApp" size={14} />
            <span className="text-[10.5px] font-semibold">To Rohan</span>
          </div>
          <p className="mt-1.5 text-[10.5px] leading-[1.45] text-ink-2">
            Voucher held: ledger “Visa fees” is missing in Tally.
          </p>
        </div>
      </Card>
      <Pill x={40} y={272} i={4} accent={P} icon="bell">
        You hear about the ones that need you
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M314 90 C 324 90, 322 120, 332 120']}
        dots={[[314, 90]]}
      />
    </Fit>
  );
}

/** Sheets and Workspace: the packages sheet, updated by every booking. */
export function SheetMock() {
  const rows = [
    ['GOA-3N', 'Goa · 3 nights', '44', '11'],
    ['KER-5N', 'Kerala backwaters · 5 nights', '31', '6'],
    ['AND-6N', 'Andaman · 6 nights', '12', '2'],
    ['COO-2N', 'Coorg · 2 nights', '58', '4'],
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={30} w={318} i={0}>
        <div className="p-3">
          <Head
            tool="Google Sheets"
            accent={P}
            title="Packages · October"
            meta="Booking → packages sheet"
          />
          <div className="mt-2.5 overflow-hidden rounded-[8px] border border-[#e6e7eb] text-[10px]">
            <div className="grid grid-cols-[52px_1fr_40px_40px] bg-[#f6f7f9] px-2 py-1 text-[9px] text-ink-3">
              <span>Code</span>
              <span>Package</span>
              <span className="text-right">Booked</span>
              <span className="text-right">Left</span>
            </div>
            {rows.map((r, i) => (
              <div
                key={r[0]}
                className="grid grid-cols-[52px_1fr_40px_40px] border-t border-[#f0f0f3] px-2 py-1.5"
                style={i === 0 ? { background: `color-mix(in srgb, ${A} 9%, white)` } : undefined}
              >
                <span className="font-mono text-[9.5px]">{r[0]}</span>
                <span className="truncate">{r[1]}</span>
                <span className="text-right font-medium tabular-nums">{r[2]}</span>
                <span className="text-right tabular-nums">{r[3]}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card x={356} y={96} w={144} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">GOA-3N · seats left</p>
          <p className="mt-1 text-[18px] leading-none font-semibold">13 → 11</p>
          <p className="mt-1.5 text-[9.5px] text-ink-3">After TR-2291</p>
        </div>
      </Card>
      <Pill x={356} y={196} i={4} accent={P} icon="table">
        The sheet updates itself
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M338 110 C 346 110, 346 120, 356 120']}
        dots={[[338, 110]]}
      />
    </Fit>
  );
}

/** Under the hood: the calls made in the last hour, and the keys they use, kept safe. */
export function RequestsMock() {
  const calls = [
    { m: 'POST', p: '/books/v3/invoices', s: '201', ms: '312 ms', t: '10:14:03' },
    { m: 'POST', p: '/sheets/v4/values:append', s: '200', ms: '188 ms', t: '10:14:04' },
    { m: 'GET', p: '/wc/v3/orders/2291', s: '200', ms: '96 ms', t: '10:14:02' },
  ];
  const keys = [
    { tool: 'Razorpay', m: 'Live key · stored encrypted' },
    { tool: 'Zoho Books', m: 'OAuth · renews on its own' },
    { tool: 'WhatsApp', m: 'Access token · rotated monthly' },
    { tool: 'Google Sheets', m: 'Service account · one sheet' },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={36} w={420} i={0}>
        <div className="p-3.5">
          <Head icon="code" accent={P} title="Requests · last hour" meta="Official APIs only" />
          <div className="mt-3 flex flex-col gap-1.5 font-mono text-[10px]">
            {calls.map((c) => (
              <span
                key={c.p}
                className="grid grid-cols-[42px_1fr_34px_50px] items-center gap-2 rounded-[8px] bg-[#f6f7f9] px-2 py-1.5"
              >
                <span className="font-semibold" style={{ color: deep(A) }}>
                  {c.m}
                </span>
                <span className="truncate">{c.p}</span>
                <span style={{ color: deep(A) }}>{c.s}</span>
                <span className="text-right text-ink-3">{c.ms}</span>
              </span>
            ))}
          </div>
        </div>
      </Card>
      <Card x={476} y={56} w={376} i={2}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head icon="key" accent={P} title="Keys" meta="Never in a spreadsheet" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {keys.map((k) => (
              <Row
                key={k.tool}
                lead={<Mark tool={k.tool} />}
                title={k.tool}
                meta={k.m}
                right={<Tag tone="ok">Live</Tag>}
              />
            ))}
          </div>
        </div>
      </Card>
      <Pill x={40} y={236} i={4} accent={P} icon="lock">
        Official APIs, keys kept safe
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M448 110 C 462 110, 462 120, 476 120']}
        dots={[[448, 110]]}
      />
    </Fit>
  );
}

export const API_INTEGRATIONS_MOCKS = [MappingMock, ReconMock, ErrorsMock, SheetMock, RequestsMock];

/** How it's built: the sync log of every run, and one booking through every tool. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function ApiIntegrationsHowScene({ box = false }: { box?: boolean }) {
  const steps = [
    { tool: 'WooCommerce', t: 'Booking placed', m: '9:41 am · website' },
    { tool: 'Razorpay', t: 'Payment captured', m: '9:41 am · UPI' },
    { tool: 'Zoho Books', t: 'Invoice INV-1182', m: '9:41 am · GST 5%' },
    { tool: 'WhatsApp', t: 'Voucher sent', m: '9:42 am · to Meera' },
  ];
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={30} w={330} i={0}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head icon="history" accent={P} title="Sync log" meta="api.onlinetravelagency.in" />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              <Row
                title="Booking → invoice, voucher, sheet"
                meta="10:14 am · 1.4 s"
                right={<Tag tone="ok">Done</Tag>}
              />
              <Row
                title="Settlement → reconciliation"
                meta="9:52 am · 19 records"
                right={<Tag tone="ok">Done</Tag>}
              />
              <Row
                title="Invoices → Tally vouchers"
                meta="2:00 am · 48 records"
                right={<Tag tone="wait">1 held</Tag>}
              />
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={434} y={20} w={300} i={2}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head icon="globe" accent={P} title="Booking TR-2291" meta="Nothing copied by hand" />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              {steps.map((s) => (
                <Row
                  key={s.t}
                  lead={<Mark tool={s.tool} />}
                  title={s.t}
                  meta={s.m}
                  right={<Tag tone="ok">Done</Tag>}
                />
              ))}
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -4, y: 280 } : HOME}>
        <Pill x={60} y={220} i={4} accent={P}>
          Every tool talking to the others
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M386 116 H 438 V 236']}
          dots={[
            [386, 116],
            [438, 236],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M354 100 C 394 100, 394 110, 434 110']}
          dots={[
            [354, 100],
            [434, 110],
          ]}
        />
      )}
    </Fit>
  );
}

export function ApiIntegrationsHow() {
  return <ApiIntegrationsHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function ApiIntegrationsHowBox() {
  return <ApiIntegrationsHowScene box />;
}
