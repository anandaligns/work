import product from '@/content/products/whatsapp-automation';

import { Fit } from './fit';
import { Bubble, Device, Frag, FragHead, Line, Pill, Tag, Wires, lit } from './kit';
import { GRAPHITE } from '../visuals/graphite';

/**
 * WhatsApp & Email Automation's mockups for the page under test, from its own sample business:
 * the customer's chat beside the rule that answered it, the reminders that went out on their own,
 * the follow-up that stops when someone replies, the payment and its receipt, the hand-over to a
 * person, and the template Meta approved. Canvases are 600 × 600 for the feature panels and
 * 480 × 340 for the cards.
 */

const A = GRAPHITE;
const screen = (label: string) => product.features.items.find((i) => i.label === label)!.screen!;

export function InstantScene() {
  return (
    <Fit w={600} h={600}>
      <Device x={318} y={40} i={0} screen={screen('Instant replies')} accent={A} />
      <Frag x={20} y={78} w={268} i={1}>
        <div className="p-4">
          <FragHead tool="Instagram" title="New enquiry" meta="Instagram ad · 11:52 pm" />
          <p className="mt-3 rounded-xl bg-white/[0.06] px-3.5 py-2.5 text-[13.5px] leading-snug text-white/85">
            Hi! Saw your ad. Do you open on Sundays?
          </p>
        </div>
      </Frag>
      <Frag x={20} y={262} w={268} i={3}>
        <div className="px-4 pt-4 pb-1.5">
          <FragHead icon="spark" accent={A} title="Reply rule" meta="Instagram ads, any hour" />
          <div className="mt-2 divide-y divide-white/[0.06]">
            <Line icon="clock" title="Sunday hours" meta="10 am to 2 pm" />
            <Line icon="receipt" title="Prices" meta="Consultation, session, package" />
            <Line icon="calendar" title="Buttons" meta="Book · See prices · Talk to the team" />
          </div>
        </div>
      </Frag>
      <Wires
        w={600}
        h={600}
        accent={A}
        d={['M288 150 C 312 150, 296 232, 330 232', 'M288 330 C 316 330, 300 400, 330 400']}
        dots={[
          [288, 150],
          [330, 232],
          [288, 330],
          [330, 400],
        ]}
      />
      <Pill x={34} y={512} i={5} accent={A}>
        Answered the same minute
      </Pill>
    </Fit>
  );
}

export function RemindersScene() {
  return (
    <Fit w={600} h={600}>
      <Device x={318} y={36} i={0} screen={screen('Reminders and confirmations')} accent={A} />
      <Frag x={20} y={70} w={272} i={1}>
        <div className="px-4 pt-4 pb-1.5">
          <FragHead icon="calendar" accent={A} title="Booking · Arjun Rao" meta="Friday, 7:00 pm" />
          <div className="mt-2 divide-y divide-white/[0.06]">
            <Line
              tool="WhatsApp"
              title="Confirmation"
              meta="Yesterday"
              right={<Tag tone="ok">Sent</Tag>}
            />
            <Line
              tool="WhatsApp"
              title="Receipt · ₹1,500"
              meta="2 hours ago"
              right={<Tag tone="ok">Sent</Tag>}
            />
            <Line
              tool="WhatsApp"
              title="Reminder, with the map"
              meta="An hour before"
              right={
                <Tag tone="accent" accent={A}>
                  Now
                </Tag>
              }
            />
          </div>
        </div>
      </Frag>
      <Frag x={42} y={352} w={250} i={3}>
        <div className="p-4">
          <p className="text-[13px] text-white/55">In the reminder</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <span
              className="rounded-lg py-2 text-center text-[13px] font-semibold text-[#0b0d12]"
              style={{ background: lit(A) }}
            >
              Confirm
            </span>
            <span className="rounded-lg bg-white/[0.08] py-2 text-center text-[13px] font-semibold">
              Change the time
            </span>
          </div>
        </div>
      </Frag>
      <Wires
        w={600}
        h={600}
        accent={A}
        d={['M292 238 C 318 238, 300 170, 330 170']}
        dots={[
          [292, 238],
          [330, 170],
        ]}
      />
      <Pill x={42} y={500} i={5} accent={A}>
        Not one sent by hand
      </Pill>
    </Fit>
  );
}

export function FollowUpScene() {
  const branches = [
    { x: 16, title: 'Replied', line: 'Stop here', ok: true },
    { x: 212, title: 'Accepted', line: 'Stop here', ok: true },
    { x: 408, title: 'No reply', line: 'Wait 5 days, then tell the owner', ok: false },
  ];
  return (
    <Fit w={600} h={600}>
      <Frag x={150} y={30} w={300} i={0}>
        <div className="p-4">
          <FragHead
            icon="receipt"
            accent={A}
            title="Quote sent"
            meta="From your CRM · Tuesday"
            right={<Tag>Arjun Rao</Tag>}
          />
        </div>
      </Frag>
      <Frag x={200} y={148} w={200} i={2}>
        <div className="flex flex-col items-center px-4 py-4 text-center">
          <span
            className="grid size-9 place-items-center rounded-xl"
            style={{ background: lit(A), color: '#0b0d12' }}
          >
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <span className="mt-2.5 text-[15px] font-semibold">Wait 2 days</span>
          <span className="text-[12px] text-white/55">Sends between 9 am and 8 pm</span>
        </div>
      </Frag>
      <Frag x={165} y={296} w={270} i={3} glow={lit(A)}>
        <div className="p-4">
          <FragHead tool="WhatsApp" title="Any questions?" meta="Template: quote_followup_1" />
        </div>
      </Frag>
      {branches.map((b, i) => (
        <Frag key={b.title} x={b.x} y={458} w={176} i={5 + i} faded={!b.ok && false}>
          <div className="p-4">
            <p className="flex items-center gap-2 text-[14px] font-semibold">
              <span
                className="size-2 rounded-full"
                style={{ background: b.ok ? '#4ade80' : '#fbbf24' }}
              />
              {b.title}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-snug text-white/60">{b.line}</p>
          </div>
        </Frag>
      ))}
      <Wires
        w={600}
        h={600}
        accent={A}
        d={[
          'M300 104 V 148',
          'M300 262 V 296',
          'M300 370 C 300 420, 104 410, 104 458',
          'M300 370 V 458',
          'M300 370 C 300 420, 496 410, 496 458',
        ]}
        dots={[
          [300, 104],
          [300, 148],
          [300, 262],
          [300, 296],
          [300, 370],
          [104, 458],
          [300, 458],
          [496, 458],
        ]}
      />
    </Fit>
  );
}

export function PaymentScene() {
  return (
    <Fit w={600} h={600}>
      <Device x={318} y={40} i={0} screen={screen('Payments and receipts')} accent={A} />
      <Frag x={20} y={84} w={272} i={1}>
        <div className="p-4">
          <FragHead tool="Razorpay" title="Payment link" meta="Tuesday, 11:00 am session" />
          <p className="mt-4 font-display text-[2.25rem] leading-none font-bold tracking-[-0.03em]">
            ₹1,500
          </p>
          <p className="mt-1.5 text-[12.5px] text-white/55">Through your payment gateway</p>
        </div>
      </Frag>
      <Frag x={20} y={290} w={272} i={3}>
        <div className="px-4 pt-3 pb-1.5">
          <div className="divide-y divide-white/[0.06]">
            <Line
              icon="person"
              title="Meera · session"
              meta="1:31 pm"
              right={<Tag tone="ok">Paid</Tag>}
            />
            <Line
              icon="receipt"
              title="Receipt"
              meta="Sent in the same chat"
              right={<Tag tone="ok">Sent</Tag>}
            />
          </div>
        </div>
      </Frag>
      <Wires
        w={600}
        h={600}
        accent={A}
        d={['M292 150 C 316 150, 300 240, 330 240']}
        dots={[
          [292, 150],
          [330, 240],
        ]}
      />
      <Pill x={20} y={460} i={5} accent={A}>
        Receipt sent at 1:31 pm
      </Pill>
    </Fit>
  );
}

export function HandoverScene() {
  return (
    <Fit w={600} h={600}>
      <Frag x={14} y={24} w={180} i={0} faded>
        <div className="p-4">
          <FragHead icon="spark" title="Instant reply" meta="9:12 pm" />
        </div>
      </Frag>
      <Frag x={210} y={24} w={180} i={1} glow={lit(A)}>
        <div className="p-4">
          <FragHead icon="person" accent={A} title="Hand-over" meta="9:15 pm" />
        </div>
      </Frag>
      <Frag x={406} y={24} w={180} i={2} faded>
        <div className="p-4">
          <FragHead icon="calendar" title="Booked" meta="9:21 pm" />
        </div>
      </Frag>
      <Frag x={80} y={150} w={440} i={3}>
        <div className="p-4">
          <FragHead
            icon="chat"
            title="Lakshmi Menon"
            meta="Website form · +91 99001 •• •58"
            right={<Tag tone="wait">Handed over</Tag>}
          />
          <p className="mt-3.5 max-w-[80%] rounded-xl rounded-tl-sm bg-white/[0.07] px-3.5 py-2.5 text-[13.5px] leading-snug">
            Can I bring my mother along? She uses a wheelchair.
          </p>
          <p className="mx-auto mt-3 w-fit rounded-full bg-white/[0.06] px-3 py-1 text-[11.5px] text-white/65">
            Needs a person: handed to Sameer, with the history
          </p>
          <p
            className="mt-3 ml-auto max-w-[85%] rounded-xl rounded-tr-sm px-3.5 py-2.5 text-[13.5px] leading-snug text-[#0b0d12]"
            style={{ background: lit(A) }}
          >
            Of course, Lakshmi. We have step-free access and parking right at the entrance.
          </p>
        </div>
      </Frag>
      <Frag x={110} y={468} w={380} i={5}>
        <div className="p-4">
          <FragHead
            icon="userCheck"
            accent={A}
            title="Sameer · Thursday, 5:30 pm"
            meta="Two people · step-free entrance"
            right={<Tag tone="ok">Booked</Tag>}
          />
        </div>
      </Frag>
      <Wires
        w={600}
        h={600}
        accent={A}
        d={['M300 96 V 150', 'M300 430 V 468']}
        dots={[
          [300, 96],
          [300, 150],
          [300, 430],
          [300, 468],
        ]}
      />
    </Fit>
  );
}

export function OfficialScene() {
  const inspector = (
    screen('Follow-up sequences') as Extract<ReturnType<typeof screen>, { kind: 'automation' }>
  ).inspector;
  return (
    <Fit w={600} h={600}>
      <Frag x={20} y={40} w={300} i={0}>
        <div className="px-4 pt-4 pb-2">
          <FragHead tool="WhatsApp" title={inspector.title} meta="Quote follow-up" />
          <div className="mt-2 divide-y divide-white/[0.06]">
            {inspector.fields.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-2.5 text-[13px]">
                <span className="text-white/55">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
          <p
            className="mt-1 mb-2 flex items-center gap-2 text-[13px] font-semibold"
            style={{ color: '#4ade80' }}
          >
            <span className="size-2 rounded-full bg-[#4ade80]" />
            {inspector.status}
          </p>
        </div>
      </Frag>
      <Bubble
        x={276}
        y={236}
        w={304}
        i={2}
        header={inspector.preview.header}
        text={inspector.preview.text}
        footer={inspector.preview.footer}
        time={inspector.preview.time}
        buttons={inspector.preview.buttons}
      />
      <Wires
        w={600}
        h={600}
        accent={A}
        d={['M170 262 C 170 320, 230 330, 276 330']}
        dots={[
          [170, 262],
          [276, 330],
        ]}
      />
      <Pill x={20} y={506} i={4} accent={A}>
        Your number, your name on every message
      </Pill>
    </Fit>
  );
}

/** For the cards: the tools that start a flow, into WhatsApp and email. */
export function TriggersCard() {
  const from = [
    { tool: 'Your website forms', label: 'Forms' },
    { tool: 'Meta', label: 'Ad leads' },
    { tool: 'Google Calendar', label: 'Bookings' },
    { tool: 'Razorpay', label: 'Payments' },
  ];
  return (
    <Fit w={480} h={340}>
      {from.map((f, i) => (
        <Frag key={f.label} x={28} y={30 + i * 72} w={150} i={i}>
          <div className="px-3 py-2.5">
            <FragHead tool={f.tool} title={f.label} />
          </div>
        </Frag>
      ))}
      <Frag x={214} y={134} w={72} h={72} i={4} glow={lit(A)} className="grid place-items-center">
        <span
          className="grid size-10 place-items-center rounded-xl"
          style={{ background: lit(A), color: '#0b0d12' }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
          </svg>
        </span>
      </Frag>
      <Frag x={320} y={94} w={132} i={5}>
        <div className="px-3 py-2.5">
          <FragHead tool="WhatsApp" title="WhatsApp" />
        </div>
      </Frag>
      <Frag x={320} y={194} w={132} i={6}>
        <div className="px-3 py-2.5">
          <FragHead tool="Gmail" title="Email" />
        </div>
      </Frag>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={[
          'M178 58 C 200 58, 196 160, 214 160',
          'M178 130 C 196 130, 200 166, 214 166',
          'M178 202 C 196 202, 200 174, 214 174',
          'M178 274 C 200 274, 196 180, 214 180',
          'M286 160 C 304 160, 300 122, 320 122',
          'M286 180 C 304 180, 300 222, 320 222',
        ]}
        dots={[
          [214, 170],
          [286, 170],
        ]}
      />
    </Fit>
  );
}

/** For the cards: one customer's record, with every message that went out. */
export function RecordCard() {
  const handover = screen('Team inbox and hand-over') as Extract<
    ReturnType<typeof screen>,
    { kind: 'inbox' }
  >;
  return (
    <Fit w={480} h={340}>
      <Frag x={40} y={28} w={400} i={0}>
        <div className="px-4 pt-4 pb-1.5">
          <FragHead
            icon="person"
            accent={A}
            title="Lakshmi Menon"
            meta="Website form · assigned to Sameer"
            right={<Tag tone="ok">Booked</Tag>}
          />
          <div className="mt-2 divide-y divide-white/[0.06]">
            {handover.contact.automations.map((a) => (
              <Line
                key={a.title}
                tool="WhatsApp"
                title={a.title}
                meta={a.meta}
                right={
                  <Tag tone={a.pill.tone === 'accent' ? 'accent' : 'ok'} accent={A}>
                    {a.pill.text}
                  </Tag>
                }
              />
            ))}
          </div>
        </div>
      </Frag>
    </Fit>
  );
}

/** For the cards: the flows running, each live. */
export function FlowsCard() {
  const follow = screen('Follow-up sequences') as Extract<
    ReturnType<typeof screen>,
    { kind: 'automation' }
  >;
  return (
    <Fit w={480} h={340}>
      <Frag x={40} y={24} w={400} i={0}>
        <div className="px-4 pt-4 pb-1.5">
          <FragHead icon="refresh" accent={A} title="Your flows" meta="Looked after on Evolve" />
          <div className="mt-2 divide-y divide-white/[0.06]">
            {follow.flows.slice(0, 4).map((f) => (
              <Line
                key={f.name}
                icon="spark"
                title={f.name}
                meta={f.runs ?? f.line}
                right={<Tag tone="ok">{f.status.text}</Tag>}
              />
            ))}
          </div>
        </div>
      </Frag>
    </Fit>
  );
}
