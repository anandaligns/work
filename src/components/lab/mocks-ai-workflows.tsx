import { ToolMark } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { Fit } from './fit';
import { Card, deep, Head, onColour, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Bars, Dot, Stat } from './mock-parts';
import { GRAPHITE } from '../visuals/graphite';

/**
 * AI Workflows' mockups, in the light kit, from the page's own sample business — an Accounting &
 * Tax Firm and Shalini Iyer, a partner, doing the books for Arora Traders: the day's supplier
 * invoices read from the client's inbox, the ones that don't fit the order, the approvals before
 * anything reaches the client's Tally, an invoice scanned on a phone, and the month's summary.
 * Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = GRAPHITE;
/** The business's own colour: everything inside its screens. */
const A = GRAPHITE;

/** Reading: today's documents from the accounts inbox, each read and sorted. */
export function QueueMock() {
  const docs = [
    {
      t: 'Invoice NST/0418',
      m: 'Shree Balaji Traders · ₹47,636',
      tag: <Tag tone="wait">Check</Tag>,
    },
    {
      t: 'Invoice KS-2291',
      m: 'Kaveri Steel · ₹1,18,420',
      tag: (
        <Tag tone="accent" accent={A}>
          Ready
        </Tag>
      ),
    },
    {
      t: 'Invoice PT-0917',
      m: 'Precision Tools & Co · ₹22,180',
      tag: (
        <Tag tone="accent" accent={A}>
          Ready
        </Tag>
      ),
    },
    { t: 'Invoice SE/1182', m: 'Sri Enterprises · ₹8,960', tag: <Tag tone="ok">Posted</Tag> },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={294} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="mail" accent={P} title="Arora Traders · inbox" meta="Read as they arrive" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {docs.map((d) => (
              <Row
                key={d.t}
                lead={<Dot icon="file" tone={P} />}
                title={d.t}
                meta={d.m}
                right={d.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={332} y={80} w={168} i={2}>
        <div className="grid grid-cols-2 gap-3 p-3">
          <Stat label="Read today" value="14" accent={A} size={17} />
          <Stat label="Matched" value="11" accent={A} size={17} />
          <Stat label="Need a look" value="2" accent={A} size={17} />
          <Stat label="In Tally" value="9" accent={A} size={17} />
        </div>
      </Card>
      <Pill x={40} y={266} i={4} accent={P} icon="scan">
        Read in seconds, straight from the inbox
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M314 110 C 324 110, 322 120, 332 120']}
        dots={[[314, 110]]}
      />
    </Fit>
  );
}

/** Checks: what doesn't fit the order, the price list or last month, caught before it's paid. */
export function ExceptionsMock() {
  const rows = [
    {
      t: 'NST/0418 · Shree Balaji',
      m: 'Quantity 180, PO says 200',
      tag: <Tag tone="wait">Open</Tag>,
    },
    {
      t: 'MT-7719 · Metro Tubes',
      m: 'Rate ₹412, price list ₹398',
      tag: <Tag tone="wait">Open</Tag>,
    },
    {
      t: 'SE/1179 · Sri Enterprises',
      m: 'Same number as last month',
      tag: (
        <Tag tone="accent" accent={A}>
          Duplicate
        </Tag>
      ),
    },
    {
      t: 'KS-2280 · Kaveri Steel',
      m: 'GSTIN differs from record',
      tag: <Tag tone="ok">Resolved</Tag>,
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={296} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="alert" accent={P} title="Exceptions" meta="Checked on every invoice" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {rows.map((r) => (
              <Row key={r.t} title={r.t} meta={r.m} right={r.tag} />
            ))}
          </div>
        </div>
      </Card>
      <Card x={334} y={90} w={166} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">NST/0418 · PO-7781</p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[20px] leading-none font-semibold">180</span>
            <span className="text-[10px] text-ink-3">of 200 ordered</span>
          </p>
          <p className="mt-1.5 text-[10px] text-ink-2">MS bright bar 12 mm</p>
        </div>
      </Card>
      <Pill x={40} y={266} i={4} accent={P} icon="shield">
        Caught before it’s paid
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M316 90 C 326 90, 324 120, 334 120']}
        dots={[[316, 90]]}
      />
    </Fit>
  );
}

/** Approval: what's ready, the one to check, and nothing posted until a person says yes. */
export function ApproveMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={280} i={0}>
        <div className="px-3 pt-3 pb-3">
          <Head
            icon="userCheck"
            accent={P}
            title="Ready for approval"
            meta="Shalini Iyer · Partner, for Arora Traders"
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              title="Shree Balaji Traders"
              meta="NST/0418 · qty differs · ₹47,636"
              right={<Tag tone="wait">Check</Tag>}
            />
            <Row
              title="Kaveri Steel"
              meta="Matches PO-7764 · ₹1,18,420"
              right={<Tag tone="ok">Match</Tag>}
            />
            <Row
              title="Precision Tools & Co"
              meta="Matches PO-7770 · ₹22,180"
              right={<Tag tone="ok">Match</Tag>}
            />
          </div>
          <span
            className="mt-2 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Approve 2 matches
          </span>
        </div>
      </Card>
      <Card x={318} y={96} w={182} i={2}>
        <div className="p-3">
          <Head tool="Tally" accent={P} title="Tally" meta="Arora Traders · after approval" />
          <p className="mt-2 text-[10px] leading-[1.45] text-ink-2">
            Nothing is posted to Tally until you approve it.
          </p>
        </div>
      </Card>
      <Pill x={318} y={212} i={4} accent={P} icon="userCheck">
        A person approves, every time
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M300 130 C 310 130, 308 126, 318 126']}
        dots={[[300, 130]]}
      />
    </Fit>
  );
}

/** From anywhere: an invoice scanned on a phone, read into fields in two seconds. */
export function ScanMock() {
  const fields = [
    { k: 'Supplier', v: 'Shree Balaji Traders', c: '99%' },
    { k: 'Invoice number', v: 'NST/26-27/0418', c: '99%' },
    { k: 'Purchase order', v: 'PO-7781', c: '97%' },
    { k: 'Total incl. GST', v: '₹47,636', c: '98%' },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={26} w={180} i={0}>
        <div className="p-3">
          <Head icon="scan" accent={P} title="Scan an invoice" />
          <div className="relative mt-2.5 h-[160px] overflow-hidden rounded-[10px] bg-[#f6f7f9]">
            <div className="absolute inset-3 rounded-[4px] bg-white p-2 shadow-sm">
              <p className="text-[8px] font-semibold">TAX INVOICE</p>
              <p className="text-[7px] text-ink-3">Shree Balaji Traders</p>
              {[70, 55, 62, 40].map((w, i) => (
                <span
                  key={i}
                  className="mt-1.5 block h-1 rounded-full bg-[#e6e7eb]"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            <span
              className="absolute inset-x-3 top-[46%] h-[2px] rounded-full"
              style={{ background: A }}
            />
          </div>
        </div>
      </Card>
      <Card x={218} y={42} w={282} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="spark" accent={P} title="Read from the invoice" meta="2 seconds" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {fields.map((f) => (
              <Row key={f.k} title={f.v} meta={f.k} right={<Tag tone="ok">{f.c}</Tag>} />
            ))}
            <Row
              title="Bright bar 12 mm · 180"
              meta="Quantity"
              right={<Tag tone="wait">PO says 200</Tag>}
            />
          </div>
        </div>
      </Card>
      <Pill x={40} y={236} i={4} accent={P} icon="devices">
        A phone, a scan or an email
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M200 110 C 208 110, 208 100, 218 100']}
        dots={[[200, 110]]}
      />
    </Fit>
  );
}

/** Summaries: the month's documents, what matched, and which suppliers need the most checks. */
export function SummaryMock() {
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={34} w={300} i={0}>
        <div className="p-3.5">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            This month
          </p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Stat label="Documents read" value="186" delta="12%" accent={A} />
            <Stat label="Matched on arrival" value="71%" accent={A} />
            <Stat label="Exceptions" value="23" accent={A} size={17} />
            <Stat label="Waiting" value="4" accent={A} size={17} />
          </div>
        </div>
      </Card>
      <Card x={352} y={54} w={250} i={2}>
        <div className="p-3.5">
          <Head icon="chart" accent={P} title="Documents by day" meta="Matched" />
          <div className="mt-3">
            <Bars values={[80, 89, 69, 100, 86, 34]} accent={A} height={92} />
          </div>
          <p className="mt-1.5 flex justify-between text-[8.5px] text-ink-3">
            <span>Mon</span>
            <span>Sat</span>
          </p>
        </div>
      </Card>
      <Card x={626} y={96} w={226} i={3}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head icon="alert" accent={P} title="Most checks" meta="By supplier" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="Metro Tubes · 7" right={<Tag tone="wait">Rates</Tag>} />
            <Row title="Shree Balaji · 5" right={<Tag tone="wait">Quantities</Tag>} />
            <Row
              title="Sri Enterprises · 3"
              right={
                <Tag tone="accent" accent={A}>
                  Duplicates
                </Tag>
              }
            />
          </div>
        </div>
      </Card>
      <Pill x={352} y={272} i={4} accent={P} icon="chart">
        The month’s paperwork, in one view
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M328 100 C 340 100, 340 110, 352 110', 'M602 140 C 614 140, 614 150, 626 150']}
        dots={[
          [328, 100],
          [602, 140],
        ]}
      />
    </Fit>
  );
}

export const AI_WORKFLOWS_MOCKS = [QueueMock, ExceptionsMock, ApproveMock, ScanMock, SummaryMock];

/** How it's built: the checks on every invoice, and the approved invoice's fields mapped into Tally. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function AiWorkflowsHowScene({ box = false }: { box?: boolean }) {
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
  ];
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={24} w={320} i={0}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head
              icon="shield"
              accent={P}
              title="Checks on every invoice"
              meta="docs.accountingtaxfirm.in"
            />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              {checks.map((c) => (
                <Row key={c} title={c} right={<Tag tone="ok">On</Tag>} />
              ))}
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={434} y={48} w={300} i={2}>
          <div className="p-3.5">
            <div className="flex items-center justify-between text-[10.5px] font-semibold">
              <span>Approved invoice</span>
              <span className="flex items-center gap-1.5">
                <ToolMark tool="Tally" size={14} /> Tally
              </span>
            </div>
            <div className="mt-2.5 flex flex-col gap-1.5">
              {map.map(([from, to]) => (
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
        <Pill x={434} y={236} i={4} accent={P}>
          Your checks, then your books
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M376 126 H 438 V 264']}
          dots={[
            [376, 126],
            [438, 264],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M344 110 C 389 110, 389 110, 434 110']}
          dots={[
            [344, 110],
            [434, 110],
          ]}
        />
      )}
    </Fit>
  );
}

export function AiWorkflowsHow() {
  return <AiWorkflowsHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function AiWorkflowsHowBox() {
  return <AiWorkflowsHowScene box />;
}
