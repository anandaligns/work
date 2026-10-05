import product from '@/content/products/crm-systems';

import { ToolMark } from '../ui/brand-logos';
import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import { Card, Face, Head, onColour, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Bubble, Dot } from './mock-parts';

/**
 * CRM Systems' mockups, in the light kit, from the page's own sample business — a developer
 * selling homes at Lakeside Residency and Palm Grove: Rohit Verma's one record, the rules that sent
 * him to Ravi at 9:42 pm, today's follow-ups, Farah's WhatsApp on her record, and the funnel from
 * enquiry to booking. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.realestate!.accent;

/** One record: every touch Rohit made, in order, on one record. */
export function RecordMock() {
  const touches = [
    {
      lead: <ToolMark tool="Google Ads" size={13} />,
      t: 'Clicked “3 BHK Whitefield” ad',
      m: '12 Sep · Google Ads',
    },
    {
      lead: <ToolMark tool="Your website forms" size={13} />,
      t: 'Downloaded the Lakeside brochure',
      m: '12 Sep · website form',
    },
    {
      lead: <ToolMark tool="WhatsApp" size={13} />,
      t: 'Asked about the payment plan',
      m: '14 Sep · replied by Ravi',
    },
    {
      lead: <ToolMark tool="Your website forms" size={13} />,
      t: 'Filled the site-visit form',
      m: 'Today',
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={290} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head
            icon="person"
            accent={P}
            title="Rohit Verma"
            meta="+91 98860 •• 214"
            right={
              <Tag tone="accent" accent={A}>
                Returning
              </Tag>
            }
          />
          <p className="mt-2 text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            Everything, in order
          </p>
          <div className="mt-1 divide-y divide-[#f0f0f3]">
            {touches.map((x) => (
              <Row
                key={x.t}
                lead={
                  <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#f4f5f7]">
                    {x.lead}
                  </span>
                }
                title={x.t}
                meta={x.m}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={328} y={92} w={172} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Budget</p>
          <p className="mt-1 text-[16px] leading-none font-semibold">₹1.3–1.5 Cr</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Tag>Home loan</Tag>
            <Tag>3 BHK</Tag>
          </div>
        </div>
      </Card>
      <Pill x={328} y={206} i={4} accent={P} icon="layers">
        One record, not three
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M310 120 C 320 120, 318 130, 328 130']}
        dots={[[310, 120]]}
      />
    </Fit>
  );
}

/** Routing: the rules in order, and who got the lead that came in at 9:42 pm. */
export function RoutingMock() {
  const rules = [
    { t: 'Budget over ₹2 Cr', m: 'To Meera · senior sales' },
    { t: 'Lakeside Residency', m: 'Ravi and Anita, taking turns' },
    { t: 'Palm Grove', m: 'Sameer' },
    { t: 'After 8 pm', m: 'First in tomorrow’s queue' },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={264} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="userShare" accent={P} title="Rules, in order" meta="Your rules, not ours" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {rules.map((r, i) => (
              <Row
                key={r.t}
                lead={
                  <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#f4f5f7] text-[10px] font-semibold">
                    {i + 1}
                  </span>
                }
                title={r.t}
                meta={r.m}
                right={<Tag tone="ok">On</Tag>}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={302} y={70} w={198} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Assigned · 9:42 pm</p>
          <p className="mt-1 text-[12.5px] font-semibold">Rohit Verma → Ravi</p>
          <p className="mt-0.5 text-[10px] text-ink-3">Rule: Lakeside Residency</p>
          <div className="mt-2.5 flex items-center gap-2 rounded-[9px] bg-[#f4f5f7] px-2 py-1.5">
            <ToolMark tool="WhatsApp" size={14} />
            <span className="truncate text-[10px]">New lead assigned to you</span>
          </div>
        </div>
      </Card>
      <Pill x={302} y={202} i={4} accent={P} icon="bell">
        Assigned and alerted, instantly
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M284 104 C 294 104, 292 110, 302 110']}
        dots={[[284, 104]]}
      />
    </Fit>
  );
}

/** Pipeline: today's follow-ups with times, and where each buyer stands. */
export function FollowUpsMock() {
  const due = [
    {
      who: 'Arvind Kulkarni',
      m: 'Call · brochure sent Tue',
      tag: (
        <Tag tone="accent" accent={A}>
          Overdue
        </Tag>
      ),
    },
    { who: 'Nikhil & Priya', m: 'Confirm Saturday’s visit', tag: <Tag tone="wait">11 am</Tag> },
    { who: 'Farah Siddiqui', m: 'Share the payment plan', tag: <Tag tone="wait">2 pm</Tag> },
    { who: 'Dr Suresh Menon', m: 'Revised offer', tag: <Tag>5 pm</Tag> },
  ];
  const stages = [
    ['New enquiry', 'Rohit · ₹1.4 Cr'],
    ['Site visit', 'Nikhil & Priya · ₹1.2 Cr'],
    ['Negotiation', 'Dr Suresh · ₹2.6 Cr'],
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={272} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="repeat" accent={P} title="Follow-ups" meta="Today" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {due.map((d) => (
              <Row
                key={d.who}
                lead={<Face name={d.who.replace('Dr ', '')} />}
                title={d.who}
                meta={d.m}
                right={d.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={310} y={76} w={190} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="layers" accent={P} title="Pipeline" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {stages.map(([s, m]) => (
              <Row key={s} title={s!} meta={m} />
            ))}
          </div>
        </div>
      </Card>
      <Pill x={40} y={272} i={4} accent={P} icon="clock">
        Reminders until it’s closed, either way
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M292 110 C 302 110, 300 120, 310 120']}
        dots={[[292, 110]]}
      />
    </Fit>
  );
}

/** WhatsApp on the record: Farah's chat, and the record it's kept on. */
export function ChatMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={18} w={270} i={0}>
        <div className="p-3">
          <Head tool="WhatsApp" accent={P} title="Farah Siddiqui" meta="2 BHK · yesterday" />
          <div className="mt-2.5 flex flex-col gap-1.5">
            <Bubble from="customer" time="7:12 pm" accent={A}>
              Is the 2 BHK in Tower A still available? What’s the payment plan?
            </Bubble>
            <Bubble from="business" time="7:12 pm" accent={A}>
              Yes, three 2 BHK homes are open in Tower A. Here is the brochure and plan.
            </Bubble>
            <Bubble from="customer" time="7:30 pm" accent={A}>
              Can I visit on Sunday morning?
            </Bubble>
          </div>
        </div>
      </Card>
      <Card x={308} y={110} w={192} i={2}>
        <div className="p-3">
          <Head icon="person" accent={P} title="Farah Siddiqui" meta="Lakeside Residency" />
          <div className="mt-2 divide-y divide-[#f0f0f3]">
            <Row lead={<Dot icon="chat" tone={P} />} title="4 messages" meta="On her record" />
            <Row
              lead={<Dot icon="calendar" tone={P} />}
              title="Visit: Sun, 11 am"
              meta="With Anita"
            />
          </div>
        </div>
      </Card>
      <Pill x={40} y={284} i={4} accent={P} icon="chat">
        Every chat on the lead’s record
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M290 140 C 300 140, 298 150, 308 150']}
        dots={[[290, 140]]}
      />
    </Fit>
  );
}

/** Reports: from enquiry to booking, and which sources bring buyers. */
export function ReportsMock() {
  const funnel = [
    ['Enquiries', '1,240', 100],
    ['Contacted', '1,012', 82],
    ['Site visits', '318', 26],
    ['Negotiation', '96', 8],
    ['Booked', '41', 3.3],
  ] as const;
  const sources = [
    { tool: 'Google Ads', leads: '412', booked: '17' },
    { tool: 'Meta', label: 'Meta ads', leads: '386', booked: '9' },
    { tool: 'Your website forms', label: 'Website forms', leads: '214', booked: '8' },
    { tool: 'WhatsApp', leads: '138', booked: '5' },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={34} w={360} i={0}>
        <div className="p-3.5">
          <Head icon="chart" accent={P} title="From enquiry to booking" meta="This quarter" />
          <div className="mt-3 flex flex-col gap-2">
            {funnel.map(([label, n, pct]) => (
              <div key={label} className="flex items-center gap-2 text-[10.5px]">
                <span className="w-20 shrink-0 text-ink-2">{label}</span>
                <span className="h-4 flex-1 overflow-hidden rounded-[4px] bg-[#f4f5f7]">
                  <span
                    className="flex h-full items-center rounded-[4px] pl-1.5 text-[9px] font-semibold"
                    style={{ width: `${Math.max(pct, 7)}%`, background: A, color: onColour(A) }}
                  >
                    {n}
                  </span>
                </span>
                <span className="w-9 shrink-0 text-right text-ink-3 tabular-nums">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card x={416} y={64} w={300} i={2}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head icon="target" accent={P} title="By source" meta="Leads → booked" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {sources.map((s) => (
              <Row
                key={s.tool}
                lead={
                  <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#f4f5f7]">
                    <ToolMark tool={s.tool} size={13} />
                  </span>
                }
                title={s.label ?? s.tool}
                meta={`${s.leads} leads`}
                right={
                  <Tag tone="accent" accent={A}>
                    {s.booked} booked
                  </Tag>
                }
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={740} y={120} w={116} i={3}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Booked</p>
          <p className="mt-1 text-[22px] leading-none font-semibold">41</p>
          <p className="mt-1.5 text-[9.5px] text-ink-3">17 from Google Ads</p>
        </div>
      </Card>
      <Pill x={40} y={288} i={4} accent={P} icon="trend">
        Know which ads bring buyers
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M388 110 C 402 110, 402 120, 416 120', 'M716 150 C 728 150, 728 160, 740 160']}
        dots={[
          [388, 110],
          [716, 150],
        ]}
      />
    </Fit>
  );
}

export const CRM_MOCKS = [RecordMock, RoutingMock, FollowUpsMock, ChatMock, ReportsMock];

/** How it's built: the weekend's site visits in the office, the new lead on Ravi's phone. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function CrmHowScene({ box = false }: { box?: boolean }) {
  const visits = [
    ['Nikhil & Priya', 'Sat, 11 am · Lakeside · Sameer'],
    ['Arvind Kulkarni', 'Sat, 2 pm · Lakeside · Ravi'],
    ['Sneha Iyer', 'Sun, 12:30 pm · Lakeside · Anita'],
    ['Rao family', 'Sun, 3 pm · Palm Grove · Sameer'],
  ];
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={24} w={330} i={0}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head
              icon="calendar"
              accent={P}
              title="Site visits"
              meta="crm.realestateagency.in · this weekend"
            />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              {visits.map(([who, m]) => (
                <Row key={who} lead={<Face name={who!} />} title={who!} meta={m} />
              ))}
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={434} y={40} w={300} i={2}>
          <div className="p-3.5">
            <Head
              icon="bell"
              accent={P}
              title="Rohit Verma"
              meta="New lead assigned to you · 9:42 pm"
            />
            <div className="mt-2 divide-y divide-[#f0f0f3]">
              <Row
                lead={<Dot icon="globe" tone={P} />}
                title="Website form"
                meta="From a Google search ad"
              />
              <Row
                lead={<Dot icon="rupee" tone={P} />}
                title="₹1.3–1.5 Cr"
                meta="Home loan · within 6 months"
              />
              <Row
                lead={<Dot icon="phone" tone={P} />}
                title="Call back"
                meta="Today, before 10 am"
                right={<Tag tone="wait">Next</Tag>}
              />
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -4, y: 232 } : HOME}>
        <Pill x={60} y={268} i={4} accent={P}>
          The office and the phone see the same lead
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M386 126 H 438 V 256']}
          dots={[
            [386, 126],
            [438, 256],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M354 110 C 394 110, 394 100, 434 100']}
          dots={[
            [354, 110],
            [434, 100],
          ]}
        />
      )}
    </Fit>
  );
}

export function CrmHow() {
  return <CrmHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function CrmHowBox() {
  return <CrmHowScene box />;
}
