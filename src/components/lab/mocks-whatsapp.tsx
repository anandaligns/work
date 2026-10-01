import type { ReactNode } from 'react';

import product from '@/content/products/whatsapp-automation';

import { ToolMark } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import {
  Card,
  deep,
  Face,
  Head,
  markColour,
  onColour,
  Pill,
  Row,
  Tag,
  TintPanel,
  Wires,
} from './light-kit';

/**
 * WhatsApp & Email Automation's mockups for the service page under trial, in the light kit of the
 * Never Miss a Lead v2 page: white cards on the page's pale green, small quiet type, fine dashed
 * wires and one white pill for the outcome. The business is a dental clinic — Priya's Sunday
 * question, Arjun's check-up, Meera's cleaning paid for, Lakshmi handed to Sameer at the desk.
 * Each is laid out on a fixed canvas (`Fit`).
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.dentalclinic!.accent;
export const WHATSAPP_TINT = '#eaf5ee';

/** A mockup on the page's tint, filling whatever it is placed in. */
export function OnTint({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <TintPanel tint={WHATSAPP_TINT} className={`size-full ${className}`}>
      {children}
    </TintPanel>
  );
}

/** A chat bubble: the customer's in grey on the left, the business's in its green on the right. */
function Bubble({
  from,
  time,
  children,
  label,
}: {
  from: 'customer' | 'business';
  time: string;
  children: ReactNode;
  label?: string;
}) {
  const own = from === 'business';
  return (
    <div className={`flex ${own ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-[12px] px-2.5 py-1.5 text-[11px] leading-[1.45] ${own ? 'rounded-br-[4px] text-ink' : 'rounded-bl-[4px] bg-[#f2f3f5] text-ink'}`}
        style={own ? { background: `color-mix(in srgb, ${A} 13%, white)` } : undefined}
      >
        {label ? (
          <span
            className="mb-0.5 flex items-center gap-1 text-[9.5px] font-semibold"
            style={{ color: deep(A) }}
          >
            <Icon name="spark" size={10} strokeWidth={2.2} />
            {label}
          </span>
        ) : null}
        {children}
        <span className="mt-0.5 block text-right text-[9px] text-ink-3">{time}</span>
      </div>
    </div>
  );
}

/** A small round glyph in the page's colour, for a step or a row. */
function Dot({ icon, tone = P }: { icon: IconName; tone?: string }) {
  return (
    <span
      className="grid size-[26px] shrink-0 place-items-center rounded-full"
      style={{ background: `color-mix(in srgb, ${tone} 12%, white)`, color: markColour(tone) }}
    >
      <Icon name={icon} size={13} strokeWidth={2.1} />
    </span>
  );
}

// --- the five features ---------------------------------------------------------------------------

/** Answered in seconds: Priya's Sunday question at 11:52 pm, and tonight's replies beside it. */
export function InstantReplyMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={22} y={24} w={262} i={0}>
        <div className="px-3 pt-3 pb-3">
          <Head
            tool="WhatsApp"
            accent={P}
            title="Priya Sharma"
            meta="Instagram ad · 11:52 pm"
            right={
              <Tag tone="accent" accent={A}>
                New
              </Tag>
            }
          />
          <div className="mt-3 flex flex-col gap-1.5">
            <Bubble from="customer" time="11:52 pm">
              Hi! Saw your ad for teeth cleaning. Are you open on Sundays?
            </Bubble>
            <Bubble from="business" time="11:52 pm" label="Instant reply · 4 s">
              Yes: Sundays from 10 am to 2 pm, and a cleaning takes about 40 minutes. Shall I book
              you in?
            </Bubble>
          </div>
        </div>
      </Card>
      <Card x={292} y={70} w={210} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            Tonight
          </p>
          <p className="mt-1 flex items-baseline gap-1.5 text-[22px] leading-none font-semibold">
            4 s<span className="text-[10px] font-medium text-ink-3">to reply, on average</span>
          </p>
          <div className="mt-2 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Face name="Priya Sharma" tone="#e6f7ee" />}
              title="Priya Sharma"
              meta="11:52 pm"
              right={
                <Tag tone="accent" accent={A}>
                  Replied
                </Tag>
              }
            />
            <Row
              lead={<Face name="Arjun Rao" tone="#e5f3fb" />}
              title="Arjun Rao"
              meta="11:48 pm"
              right={<Tag tone="ok">Booked</Tag>}
            />
            <Row
              lead={<Face name="Meera Pillai" tone="#fff5d6" />}
              title="Meera Pillai"
              meta="10:02 pm"
              right={<Tag tone="ok">Paid</Tag>}
            />
          </div>
        </div>
      </Card>
      <Pill x={56} y={268} i={4} accent={P} icon="clock">
        Answered at 11:52 pm, on a Sunday
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M284 104 C 290 104, 286 124, 292 124']}
        dots={[[284, 104]]}
      />
    </Fit>
  );
}

/** Nobody has to remember: Arjun's check-up, its reminder queued, and the reminder as he sees it. */
export function RemindersMock() {
  const steps = [
    {
      icon: 'check' as IconName,
      title: 'Booking confirmation',
      meta: 'Sent 11:49 pm',
      tag: <Tag tone="ok">Sent</Tag>,
    },
    {
      icon: 'bell' as IconName,
      title: 'Reminder',
      meta: 'An hour before · 6:00 pm',
      tag: (
        <Tag tone="accent" accent={A}>
          Scheduled
        </Tag>
      ),
    },
    {
      icon: 'pin' as IconName,
      title: 'Location pin',
      meta: '100 Feet Road',
      tag: <Tag>Ready</Tag>,
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={26} w={276} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head
            icon="calendar"
            accent={P}
            title="Arjun Rao · 7:00 pm"
            meta="Check-up, booked for tomorrow"
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {steps.map((step) => (
              <Row
                key={step.title}
                lead={<Dot icon={step.icon} />}
                title={step.title}
                meta={step.meta}
                right={step.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={310} y={112} w={192} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <ToolMark tool="WhatsApp" size={16} />
            <span className="text-[10.5px] font-semibold">Dental Clinic</span>
            <span className="ml-auto text-[9.5px] text-ink-3">6:00 pm</span>
          </div>
          <p className="mt-1.5 text-[11px] leading-[1.45] text-ink">
            Reminder: your check-up with Dr Nair is today at 7:00 pm. Tap for the location.
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-[9px] bg-[#f4f5f7] px-2 py-1.5">
            <span style={{ color: deep(A) }}>
              <Icon name="pin" size={13} strokeWidth={2.1} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[10.5px] font-semibold">Dental Clinic</span>
              <span className="block truncate text-[9.5px] text-ink-3">
                100 Feet Road, Indiranagar
              </span>
            </span>
          </div>
        </div>
      </Card>
      <Pill x={62} y={272} i={4} accent={P}>
        Confirmed by Arjun · 6:02 pm
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M296 128 C 306 128, 300 150, 310 150']}
        dots={[[296, 128]]}
      />
    </Fit>
  );
}

/** Follow-ups that know when to stop: the treatment-plan follow-up as a flow, and its month. */
export function FollowUpsMock() {
  const flow = [
    { icon: 'spark' as IconName, title: 'Aligner plan sent', meta: 'After the consultation' },
    { icon: 'clock' as IconName, title: 'Wait 2 days', meta: 'Sends 9 am to 8 pm' },
    { icon: 'chat' as IconName, title: 'Any questions?', meta: 'Template: plan_followup_1' },
    { icon: 'check' as IconName, title: 'Stop', meta: 'When they reply or book' },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={22} y={22} w={226} i={0}>
        <div className="px-3 pt-3 pb-2">
          <Head
            icon="repeat"
            accent={P}
            title="Aligner follow-up"
            right={<Tag tone="ok">Live</Tag>}
          />
          <ol className="relative mt-2.5 flex flex-col gap-2.5">
            <span className="absolute top-3 bottom-3 left-[12.5px] w-px bg-[#e6e7eb]" />
            {flow.map((step) => (
              <li key={step.title} className="relative flex items-center gap-2.5">
                <Dot icon={step.icon} />
                <span className="min-w-0">
                  <span className="block truncate text-[11.5px] font-medium">{step.title}</span>
                  <span className="block truncate text-[10px] text-ink-3">{step.meta}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Card>
      <Card x={272} y={58} w={226} i={2}>
        <div className="p-3">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            Last 30 days
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              ['312', 'started'],
              ['128', 'replied'],
              ['41', 'booked'],
            ].map(([n, label]) => (
              <span key={label}>
                <span className="block text-[17px] leading-none font-semibold">{n}</span>
                <span className="mt-1 block text-[9.5px] text-ink-3">{label}</span>
              </span>
            ))}
          </div>
          <div className="mt-3 flex h-[54px] items-end gap-[5px]">
            {[34, 52, 40, 66, 48, 72, 58, 80, 62, 90].map((h, k) => (
              <span
                key={k}
                className="flex-1 rounded-[3px]"
                style={{
                  height: `${h}%`,
                  background: k === 9 ? A : `color-mix(in srgb, ${A} 22%, white)`,
                }}
              />
            ))}
          </div>
        </div>
      </Card>
      <Pill x={286} y={250} i={4} accent={P} icon="check">
        Stopped when she booked
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M248 90 C 262 90, 258 110, 272 110']}
        dots={[[248, 90]]}
      />
    </Fit>
  );
}

/** Asked for, paid and thanked: Meera's cleaning held, paid by UPI and receipted in the chat. */
export function PaymentMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={22} y={24} w={262} i={0}>
        <div className="p-3">
          <Head tool="WhatsApp" accent={P} title="Meera Pillai" meta="Tuesday · 11:00 am" />
          <div className="mt-3 flex flex-col gap-1.5">
            <Bubble from="business" time="1:30 pm">
              Your cleaning on Tuesday at 11:00 am is held for you. Pay ₹1,500 to confirm it.
              <span
                className="mt-1.5 flex items-center justify-center gap-1.5 rounded-[7px] py-1 text-[10.5px] font-semibold"
                style={{ background: A, color: onColour(A) }}
              >
                Pay ₹1,500
              </span>
            </Bubble>
            <Bubble from="customer" time="1:31 pm">
              Done, paid just now
            </Bubble>
          </div>
        </div>
      </Card>
      <Card x={296} y={128} w={206} i={2}>
        <div className="p-3">
          <Head
            tool="Razorpay"
            accent={P}
            title="Received"
            meta="UPI · 1:31 pm"
            right={<Tag tone="ok">Paid</Tag>}
          />
          <p className="mt-2.5 text-[22px] leading-none font-semibold">₹1,500</p>
          <p className="mt-2 flex items-center gap-1.5 text-[10.5px] text-ink-2">
            <span style={{ color: deep(A) }}>
              <Icon name="check" size={12} strokeWidth={2.4} />
            </span>
            Receipt sent on WhatsApp
          </p>
        </div>
      </Card>
      <Pill x={40} y={272} i={4} accent={P} icon="receipt">
        Reminded the day before, too
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M284 150 C 292 150, 288 172, 296 172']}
        dots={[[284, 150]]}
      />
    </Fit>
  );
}

/** Automation starts it, your team closes it: Lakshmi's question handed to Sameer, history and all. */
export function HandoverMock() {
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={30} w={268} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="chat" accent={P} title="Inbox" meta="All 24 · Unread 3 · Automated 16" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Face name="Priya Sharma" tone="#e6f7ee" />}
              title="Priya Sharma"
              meta="Do you open on Sundays?"
              right={
                <Tag tone="accent" accent={A}>
                  New
                </Tag>
              }
            />
            <Row
              lead={<Face name="Arjun Rao" tone="#e5f3fb" />}
              title="Arjun Rao"
              meta="Booked: tomorrow, 7:00 pm"
              right={<Tag tone="ok">Booked</Tag>}
            />
            <Row
              lead={<Face name="Lakshmi Menon" tone="#fdecee" />}
              title="Lakshmi Menon"
              meta="Can I bring my mother?"
              right={<Tag tone="wait">Sameer</Tag>}
            />
            <Row
              lead={<Face name="Meera Pillai" tone="#fff5d6" />}
              title="Meera Pillai"
              meta="Receipt sent · ₹1,500"
              right={<Tag tone="ok">Paid</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={322} y={44} w={320} i={2}>
        <div className="p-3">
          <Head
            icon="userShare"
            accent={P}
            title="Lakshmi Menon"
            meta="Handed to Sameer · 9:15 pm"
            right={<Tag tone="wait">Needs a person</Tag>}
          />
          <div className="mt-3 flex flex-col gap-1.5">
            <Bubble from="customer" time="9:15 pm">
              Can I bring my mother along? She uses a wheelchair.
            </Bubble>
            <p className="mx-auto rounded-full bg-[#f4f5f7] px-2.5 py-1 text-[9.5px] text-ink-3">
              Automation paused · assigned to Sameer
            </p>
            <Bubble from="business" time="9:21 pm">
              Of course, Lakshmi. We’re on the ground floor, step-free, and Dr Nair can see her too.
            </Bubble>
          </div>
        </div>
      </Card>
      <Card x={668} y={96} w={184} i={3}>
        <div className="p-3">
          <div className="flex items-center gap-2.5">
            <Face name="Sameer K" tone="#eceefb" />
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-semibold">Sameer</span>
              <span className="block truncate text-[10px] text-ink-3">Front desk</span>
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10.5px]">
            <span className="text-ink-2">Open with you</span>
            <Tag tone="accent" accent={A}>
              1
            </Tag>
          </div>
        </div>
      </Card>
      <Pill x={344} y={292} i={4} accent={P} icon="history">
        Handed over with the whole history
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M296 150 C 310 150, 306 120, 322 120', 'M642 130 C 656 130, 652 150, 668 150']}
        dots={[
          [296, 150],
          [642, 130],
        ]}
      />
    </Fit>
  );
}

/** The five, in the order the page lists its features. */
export const WHATSAPP_FEATURE_MOCKS = [
  InstantReplyMock,
  RemindersMock,
  FollowUpsMock,
  PaymentMock,
  HandoverMock,
];

// --- how it's built ------------------------------------------------------------------------------

/**
 * Built on the official platform: where messages come from, your own number on the WhatsApp
 * Business Platform in the middle, and what it's connected to — each tool a card, the wires
 * running through the number.
 */
export function PlatformMock() {
  const from = [
    { tool: 'Your website forms', title: 'Website form', y: 40 },
    { tool: 'Instagram', title: 'Instagram ads', y: 128 },
    { tool: 'Gmail', title: 'Email', y: 216 },
  ];
  const to = [
    { tool: 'Zoho CRM', title: 'Zoho CRM', meta: 'Every chat on file', y: 40 },
    { tool: 'Google Calendar', title: 'Google Calendar', meta: 'Chairs and bookings', y: 128 },
    { tool: 'Razorpay', title: 'Razorpay', meta: 'Links and receipts', y: 216 },
  ];
  return (
    <Fit w={760} h={330}>
      {from.map((s, i) => (
        <Card key={s.title} x={24} y={s.y} w={176} i={i}>
          <div className="p-2.5">
            <Head tool={s.tool} accent={P} title={s.title} />
          </div>
        </Card>
      ))}
      <Card
        x={262}
        y={70}
        w={236}
        i={3}
        className="shadow-[0_1px_2px_rgb(11_13_18/0.04),0_24px_48px_-20px_rgb(11_13_18/0.3)]"
      >
        <div className="p-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className="grid size-10 place-items-center rounded-[12px]"
              style={{ background: `color-mix(in srgb, ${A} 12%, white)` }}
            >
              <ToolMark tool="WhatsApp" size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold">Dental Clinic</span>
              <span className="flex items-center gap-1 text-[10.5px] text-ink-3">
                <span style={{ color: deep(A) }}>
                  <Icon name="check" size={11} strokeWidth={2.6} />
                </span>
                +91 80 •••• 4210 · verified
              </span>
            </span>
          </div>
          <div className="mt-3 rounded-[10px] bg-[#f4f5f7] px-2.5 py-2">
            <p className="text-[10px] text-ink-3">Official WhatsApp Business Platform</p>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5 text-center">
              {[
                ['24', 'chats today'],
                ['16', 'automated'],
                ['3', 'for a person'],
              ].map(([n, label]) => (
                <span key={label}>
                  <span className="block text-[14px] leading-none font-semibold">{n}</span>
                  <span className="mt-0.5 block text-[9px] text-ink-3">{label}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[10.5px] text-ink-2">
            <span className="size-1.5 rounded-full" style={{ background: A }} />
            Templates approved by Meta
          </div>
        </div>
      </Card>
      {to.map((s, i) => (
        <Card key={s.title} x={560} y={s.y} w={176} i={i + 4}>
          <div className="p-2.5">
            <Head tool={s.tool} accent={P} title={s.title} meta={s.meta} />
          </div>
        </Card>
      ))}
      <Wires
        w={760}
        h={330}
        accent={P}
        d={[
          'M200 62 C 232 62, 230 110, 262 110',
          'M200 150 C 232 150, 230 150, 262 150',
          'M200 238 C 232 238, 230 190, 262 190',
          'M498 110 C 530 110, 528 64, 560 64',
          'M498 150 C 530 150, 528 152, 560 152',
          'M498 190 C 530 190, 528 240, 560 240',
        ]}
        dots={[
          [262, 150],
          [498, 150],
        ]}
      />
    </Fit>
  );
}

/** A mockup's frame for a section that sizes its own picture: the tint, at the height given. */
export function TintStage({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <OnTint>{children}</OnTint>
    </div>
  );
}
