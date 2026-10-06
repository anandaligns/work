'use client';

import type { CSSProperties } from 'react';

import product from '@/content/products/whatsapp-automation';

import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import {
  Bars,
  Bubble,
  Card,
  Line,
  Metric,
  Panel,
  Press,
  Stage,
  Status,
  Step,
  Toast,
  ToolTile,
  Track,
  Typing,
} from './kit';

/**
 * WhatsApp & Email Automation, in the showcase kit, from the page's own sample business — a dental
 * clinic: Priya's Sunday question answered in four seconds, Arjun's check-up reminded, the aligner
 * follow-up that stops when she books, Meera's cleaning paid for in the chat, and Lakshmi handed to
 * Sameer at the desk.
 */
const P = product.accent;
const A = BRANDS.dentalclinic!.accent;

/** Answered in seconds: Priya's Sunday question at 11:52 pm, and tonight's replies beside it. */
export function InstantReplyMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={290}
        label="Priya · Instagram ad"
        badge={<Status tone="accent">11:52 pm</Status>}
      >
        <div className="flex flex-col gap-2 px-1 pb-2">
          <Bubble meta="11:52 pm" i={1}>
            Hi! Saw your ad for teeth cleaning. Are you open on Sundays?
          </Bubble>
          <Bubble from="us" meta="Instant reply · 4 s" i={3}>
            Yes — Sundays 10 am to 2 pm, and a cleaning takes about 40 minutes. Shall I book you in?
          </Bubble>
          <Typing i={5} />
        </div>
      </Panel>
      <Panel x={286} y={110} w={214} label="Tonight" live i={2} foot={['Reply time', '4 s']}>
        <div className="px-1.5">
          <Line
            face="Priya Sharma"
            title="Priya"
            meta="11:52 pm"
            right={<Status tone="accent">Replied</Status>}
          />
          <Line face="Arjun Rao" title="Arjun" meta="11:48 pm" right={<Status>Booked</Status>} />
          <Line face="Meera Pillai" title="Meera" meta="10:02 pm" right={<Status>Paid</Status>} />
        </div>
      </Panel>
    </Stage>
  );
}

/** Nobody has to remember: Arjun's check-up, its reminders queued, and the reminder as he sees it. */
export function RemindersMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={300} label="Arjun Rao · check-up 7 pm" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            icon="check"
            title="Booking confirmation"
            meta="Sent 11:49 pm"
            status="Sent"
          />
          <Step
            turn
            n={3}
            i={1}
            icon="bell"
            title="Reminder"
            meta="An hour before · 6:00 pm"
            status="Scheduled"
            tone="accent"
          />
          <Step
            turn
            n={3}
            i={2}
            icon="pin"
            title="Location pin"
            meta="100 Feet Road"
            status="Ready"
            tone="muted"
          />
        </div>
      </Panel>
      <Card x={276} y={200} w={214} i={3}>
        <div className="p-2">
          <div className="flex items-center gap-2">
            <ToolTile tool="WhatsApp" size={26} />
            <span className="text-[12px] font-semibold text-ink">Dental Clinic</span>
            <span className="ml-auto text-[10.5px] text-ink-2">6:00 pm</span>
          </div>
          <p className="mt-2 text-[12px] leading-snug text-ink">
            Reminder: your check-up with Dr Nair is today at 7:00 pm. Tap for the location.
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
            <Icon name="check" size={12} strokeWidth={2.4} /> Confirmed by Arjun · 6:02
          </p>
        </div>
      </Card>
    </Stage>
  );
}

/** Follow-ups that know when to stop: the treatment-plan follow-up as a flow, and its month. */
export function FollowUpsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={240} label="Aligner follow-up" badge={<Status>Live</Status>}>
        <Track
          steps={[
            { title: 'Aligner plan sent', meta: 'After the consultation', done: true },
            { title: 'Wait 2 days', meta: 'Sends 9 am to 8 pm', done: true },
            { title: 'Any questions?', meta: 'plan_followup_1', done: true },
            { title: 'Stop', meta: 'When they reply or book' },
          ]}
        />
      </Panel>
      <Panel x={244} y={90} w={240} label="Last 30 days" i={2}>
        <div className="grid grid-cols-3 gap-2 px-3 pb-3">
          <Metric label="Started" value={312} size={20} />
          <Metric label="Replied" value={128} size={20} />
          <Metric label="Booked" value={41} size={20} />
        </div>
        <div className="px-3 pb-2">
          <Bars values={[34, 52, 40, 66, 48, 72, 58, 80, 62, 90]} height={52} />
        </div>
      </Panel>
    </Stage>
  );
}

/** Asked for, paid and thanked: Meera's cleaning held, paid by UPI and receipted in the chat. */
export function PaymentMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={290} label="Meera · cleaning, Tue 11 am" live>
        <div className="flex flex-col gap-2 px-1 pb-2">
          <Bubble from="us" meta="1:30 pm" i={1}>
            Your cleaning on Tuesday at 11:00 am is held for you. Pay ₹1,500 to confirm it.
            <Press className="mt-2">Pay ₹1,500</Press>
          </Bubble>
          <Bubble meta="1:31 pm" i={3}>
            Done, paid just now
          </Bubble>
        </div>
      </Panel>
      <Toast
        x={262}
        y={214}
        w={230}
        tool="Razorpay"
        title="₹1,500 received · UPI"
        meta="Receipt sent on WhatsApp"
      />
    </Stage>
  );
}

/** Automation starts it, your team closes it: Lakshmi's question handed to Sameer, history and all. */
export function HandoverMock() {
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={30} w={290} label="Inbox · 24 today" live>
        <div className="flex flex-col gap-2">
          <Step
            face="Priya Sharma"
            title="Priya Sharma"
            meta="Do you open on Sundays?"
            status="New"
            tone="accent"
          />
          <Step face="Arjun Rao" title="Arjun Rao" meta="Booked: tomorrow 7 pm" status="Booked" />
          <Step
            lit
            face="Lakshmi Menon"
            title="Lakshmi Menon"
            meta="Can I bring my mother?"
            status="Sameer"
            tone="wait"
          />
          <Step
            face="Meera Pillai"
            title="Meera Pillai"
            meta="Receipt sent · ₹1,500"
            status="Paid"
          />
        </div>
      </Panel>
      <Panel
        x={326}
        y={20}
        w={330}
        label="Lakshmi · handed to Sameer"
        badge={<Status tone="wait">Needs a person</Status>}
        i={2}
      >
        <div className="flex flex-col gap-2 px-1 pb-2">
          <Bubble meta="9:15 pm" i={2}>
            Can I bring my mother along? She uses a wheelchair.
          </Bubble>
          <p
            className="sc-rise mx-auto rounded-full bg-fill px-3 py-1 text-[11px] text-ink-2"
            style={{ '--i': 3 } as CSSProperties}
          >
            Automation paused · assigned to Sameer
          </p>
          <Bubble from="us" meta="9:21 pm · Sameer" i={4}>
            Of course, Lakshmi. We’re on the ground floor, step-free, and Dr Nair can see her too.
          </Bubble>
        </div>
      </Panel>
      <Toast
        x={640}
        y={250}
        w={230}
        icon="userShare"
        title="With the whole history"
        meta="Sameer · 1 open with you"
      />
    </Stage>
  );
}

/**
 * Built on the official platform: where messages come from, the clinic's own number on the WhatsApp
 * Business Platform in the middle, and what it's connected to.
 */
export function PlatformMockBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel x={20} y={110} w={210} label="From" i={0}>
        <div className="flex flex-col gap-2">
          <Step turn n={3} i={0} icon="globe" title="Website form" />
          <Step turn n={3} i={1} tool="Instagram" title="Instagram ads" />
          <Step turn n={3} i={2} tool="Gmail" title="Email" />
        </div>
      </Panel>
      <Panel
        x={262}
        y={60}
        w={236}
        label="Your number"
        badge={<Status>Verified</Status>}
        i={1}
        foot={['Templates', 'Meta-approved']}
      >
        <div className="flex items-center gap-3 px-2 pb-3">
          <ToolTile tool="WhatsApp" size={44} />
          <span>
            <span className="block text-[13.5px] font-medium text-ink">WhatsApp Business</span>
            <span className="block text-[11.5px] text-ink-2">+91 80 •••• 4210</span>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 px-2 pb-1">
          <Metric label="Chats today" value={24} size={20} />
          <Metric label="Automated" value={16} size={20} />
          <Metric label="For a person" value={3} size={20} />
        </div>
      </Panel>
      <Panel x={530} y={150} w={210} label="To" i={2}>
        <div className="flex flex-col gap-2">
          <Step turn n={3} i={0} tool="Zoho" title="Zoho CRM" meta="Every chat on file" />
          <Step turn n={3} i={1} tool="Google Calendar" title="Calendar" meta="Chairs, bookings" />
          <Step turn n={3} i={2} tool="Razorpay" title="Razorpay" meta="Links, receipts" />
        </div>
      </Panel>
    </Stage>
  );
}

export const PlatformMock = PlatformMockBox;
