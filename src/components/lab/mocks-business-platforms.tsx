import product from '@/content/products/business-platforms';

import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import { Card, Face, Head, Pill, Row, Tag, Wires } from './light-kit';
import { Bars, Chip, Field, Stat, Steps } from './mock-parts';

/**
 * Business Platforms' mockups, in the light kit, from the page's own sample business — a
 * Recruitment Agency Network's hiring platform, and Northstar Talent joining it: the workspace set
 * up on a trial, its recruiters and client access, plans by recruiter, the founder's view of the
 * business, and who keeps paying month by month. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.recruitment!.accent;

/** First version: an agency signs up and sets up its workspace on its own. */
export function SignupMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={20} w={270} i={0}>
        <div className="p-3">
          <Head icon="briefcase" accent={P} title="Your agency" meta="Step 2 of 4" />
          <div className="mt-2.5 flex flex-col gap-2">
            <Field label="Agency name" value="Northstar Talent" accent={A} />
            <Field label="Web address" value="northstar.recruitmentagencynetwork.in" accent={A} />
            <Field label="Hiring for" value="Tech, retail and healthcare" focus accent={A} />
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip on accent={A}>
              Candidate updates on WhatsApp
            </Chip>
          </div>
        </div>
      </Card>
      <Card x={308} y={60} w={192} i={2}>
        <div className="p-3">
          <Steps
            accent={A}
            gap={8}
            steps={[
              { title: 'Your workspace', meta: 'Done', done: true },
              { title: 'Your agency', meta: 'Now', icon: 'briefcase' },
              { title: 'Invite recruiters', icon: 'people' },
              { title: 'Import candidates', icon: 'upload' },
            ]}
          />
        </div>
      </Card>
      <Pill x={308} y={238} i={4} accent={P} icon="check">
        14-day trial, no card needed
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M290 100 C 300 100, 298 110, 308 110']}
        dots={[[290, 100]]}
      />
    </Fit>
  );
}

/** Workspaces: the agency's own recruiters and clients, each with a role, and its branches. */
export function MembersMock() {
  const members = [
    {
      who: 'Anitha Krishnan',
      m: 'Now',
      tag: (
        <Tag tone="accent" accent={A}>
          Owner
        </Tag>
      ),
    },
    { who: 'Suresh Iyer', m: '10 min ago', tag: <Tag>Recruiter</Tag> },
    { who: 'Latha Rao', m: 'Today', tag: <Tag>Recruiter</Tag> },
    { who: 'Neha Dsouza', m: 'Invited', tag: <Tag tone="wait">Client</Tag> },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={272} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="people" accent={P} title="Members" meta="Northstar Talent" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {members.map((x) => (
              <Row
                key={x.who}
                lead={<Face name={x.who} />}
                title={x.who}
                meta={x.m}
                right={x.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={310} y={80} w={190} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="layers" accent={P} title="Your workspaces" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="Northstar" meta="Bangalore · Owner" right={<Tag tone="ok">Open</Tag>} />
            <Row title="Northstar Pune" meta="Branch · Owner" />
          </div>
        </div>
      </Card>
      <Pill x={310} y={214} i={4} accent={P} icon="lock">
        Every agency, its own workspace
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

/** Billing: the plans, the one chosen, and the invoices paid on autopay. */
export function BillingMock() {
  const plans = [
    { name: 'Starter', price: '₹1,499/mo', line: 'Up to 3 recruiters' },
    { name: 'Growth', price: '₹3,999/mo', line: 'Up to 15 recruiters', current: true },
    { name: 'Pro', price: '₹7,999/mo', line: 'Branches and API' },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={24} w={280} i={0}>
        <div className="p-3">
          <Head icon="card" accent={P} title="Your plan" meta="Northstar Talent" />
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {plans.map((p) => (
              <span
                key={p.name}
                className="rounded-[10px] border p-2"
                style={
                  p.current
                    ? { borderColor: A, background: `color-mix(in srgb, ${A} 9%, white)` }
                    : { borderColor: '#e6e7eb' }
                }
              >
                <span className="block text-[10.5px] font-semibold">{p.name}</span>
                <span className="mt-0.5 block text-[10px]">{p.price}</span>
                <span className="mt-1 block text-[8.5px] leading-tight text-ink-3">{p.line}</span>
              </span>
            ))}
          </div>
        </div>
      </Card>
      <Card x={318} y={90} w={182} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="receipt" accent={P} title="Invoices" meta="Autopay · renews 1 Oct" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="1 Sep · ₹4,719" meta="RN-2025-0912" right={<Tag tone="ok">Paid</Tag>} />
            <Row title="1 Aug · ₹4,719" meta="RN-2025-0811" right={<Tag tone="ok">Paid</Tag>} />
          </div>
        </div>
      </Card>
      <Pill x={40} y={220} i={4} accent={P} icon="refresh">
        Billing that runs itself
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M300 110 C 310 110, 308 120, 318 120']}
        dots={[[300, 110]]}
      />
    </Fit>
  );
}

/** Your admin: the whole business, revenue, workspaces, and the newest to join. */
export function AdminMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={266} i={0}>
        <div className="p-3">
          <Stat label="Monthly revenue" value="₹4.62 L" accent={A} />
          <div className="mt-3">
            <Bars
              values={[24, 30, 35, 41, 50, 57, 63, 72, 78, 85, 93, 100]}
              accent={A}
              height={70}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat label="Paying agencies" value="159" accent={A} size={15} />
            <Stat label="In trial" value="23" accent={A} size={15} />
            <Stat label="Cancelled" value="1.8%" accent={A} size={15} />
          </div>
        </div>
      </Card>
      <Card x={304} y={70} w={196} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="layers" accent={P} title="Newest workspaces" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="Northstar" meta="Trial · day 11" right={<Tag tone="wait">Trial</Tag>} />
            <Row title="Bluebridge" meta="Growth" right={<Tag tone="ok">Paying</Tag>} />
            <Row title="Peak Hire" meta="Starter" right={<Tag tone="ok">Paying</Tag>} />
          </div>
        </div>
      </Card>
      <Pill x={304} y={276} i={4} accent={P} icon="dashboard">
        Your business, at a glance
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M286 100 C 296 100, 294 110, 304 110']}
        dots={[[286, 100]]}
      />
    </Fit>
  );
}

/** Growth: who keeps paying, month by month, and the signups coming in. */
export function GrowthMock() {
  const cohorts = [
    { label: 'Apr', values: [100, 92, 88, 86, 85, 84] },
    { label: 'May', values: [100, 94, 90, 89, 88] },
    { label: 'Jun', values: [100, 95, 93, 91] },
    { label: 'Jul', values: [100, 96, 94] },
    { label: 'Aug', values: [100, 97] },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={34} w={420} i={0}>
        <div className="p-3.5">
          <Head
            icon="trend"
            accent={P}
            title="Still paying, by signup month"
            meta="Paying agencies"
          />
          <div className="mt-3 flex flex-col gap-1.5">
            {cohorts.map((c) => (
              <div key={c.label} className="grid grid-cols-[34px_repeat(6,minmax(0,1fr))] gap-1.5">
                <span className="text-[10px] text-ink-3">{c.label}</span>
                {c.values.map((v, k) => (
                  <span
                    key={k}
                    className="rounded-[5px] py-1 text-center text-[9.5px] font-medium text-ink"
                    style={{
                      background: `color-mix(in srgb, ${A} ${Math.round((v - 70) * 2)}%, white)`,
                    }}
                  >
                    {v}%
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card x={476} y={64} w={240} i={2}>
        <div className="p-3.5">
          <Head icon="chart" accent={P} title="Signups" meta="Apr to Sep" />
          <div className="mt-3">
            <Bars values={[44, 54, 66, 76, 88, 100]} accent={A} height={90} />
          </div>
        </div>
      </Card>
      <Card x={740} y={120} w={116} i={3}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">September</p>
          <p className="mt-1 text-[22px] leading-none font-semibold">41</p>
          <p className="mt-1 text-[9.5px] text-ink-3">new agencies</p>
        </div>
      </Card>
      <Pill x={476} y={286} i={4} accent={P} icon="trend">
        Who stays, month by month
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M448 110 C 462 110, 462 120, 476 120', 'M716 150 C 728 150, 728 160, 740 160']}
        dots={[
          [448, 110],
          [716, 150],
        ]}
      />
    </Fit>
  );
}

export const BUSINESS_PLATFORMS_MOCKS = [
  SignupMock,
  MembersMock,
  BillingMock,
  AdminMock,
  GrowthMock,
];

/** How it's built: the founder's admin, and the product at work in a client's pipeline. */
export function BusinessPlatformsHow() {
  const pipeline = [
    { who: 'Aarav Sharma', m: 'Shortlisted · 9 yrs Java', tag: <Tag tone="ok">Shortlisted</Tag> },
    { who: 'Ananya Bhat', m: 'Interview · Thu 11 am', tag: <Tag tone="ok">Interview</Tag> },
    {
      who: 'Dev Patel',
      m: 'Took another offer',
      tag: (
        <Tag tone="accent" accent={A}>
          Declined
        </Tag>
      ),
    },
    { who: 'Isha Nair', m: 'Offer sent · Mon', tag: <Tag tone="wait">Offer</Tag> },
  ];
  return (
    <Fit w={760} h={330}>
      <Card x={24} y={36} w={320} i={0}>
        <div className="p-3.5">
          <Head
            icon="dashboard"
            accent={P}
            title="Admin · the network"
            meta="admin.recruitmentagencynetwork.in"
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="Monthly revenue" value="₹4.62 L" accent={A} />
            <Stat label="Paying agencies" value="159" delta="11" accent={A} />
          </div>
        </div>
      </Card>
      <Card x={434} y={26} w={300} i={2}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head
            icon="briefcase"
            accent={P}
            title="Senior Java developer"
            meta="Client view · 4 of 38 candidates"
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {pipeline.map((r) => (
              <Row
                key={r.who}
                lead={<Face name={r.who} />}
                title={r.who}
                meta={r.m}
                right={r.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Pill x={60} y={200} i={4} accent={P}>
        One platform, every agency on it
      </Pill>
      <Wires
        w={760}
        h={330}
        accent={P}
        d={['M344 100 C 389 100, 389 110, 434 110']}
        dots={[
          [344, 100],
          [434, 110],
        ]}
      />
    </Fit>
  );
}
