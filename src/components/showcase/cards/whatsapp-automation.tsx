'use client';

import { Icon } from '../../ui/icon';
import { Bubble, Chip, Line, Metric, Press, Status, Step } from '../kit';
import { Chat, Sheet } from '../sheet';

/**
 * WhatsApp & Email Automation's five screens, from the page's sample business — a dental clinic:
 * Priya's Sunday question answered in four seconds, Arjun's reminder, the aligner follow-up and
 * its month, Meera's cleaning paid for in the chat, and Lakshmi handed to Sameer.
 */

/** Answered in seconds: Priya's question at 11:52 pm. */
export function Answered() {
  return (
    <Chat name="Dental Clinic" meta="Business account" business>
      <Bubble meta="11:52 pm">Do you open on Sundays?</Bubble>
      <Bubble from="us" meta="11:52 pm · 4 s">
        Yes, 10 am to 2 pm. Shall I book you a check-up?
      </Bubble>
      <div className="flex justify-end gap-1.5">
        <Chip on>Book a slot</Chip>
        <Chip>Call us</Chip>
      </div>
    </Chat>
  );
}

/** Nobody has to remember: Arjun's check-up, reminded an hour before. */
export function Reminder() {
  return (
    <Sheet label="Arjun · 7 pm" badge={<Status tone="accent">Queued</Status>}>
      <Line icon="calendar" title="Confirmed" meta="Sent 11:49 pm" right={<Status>Sent</Status>} />
      <Line
        icon="bell"
        title="Reminder"
        meta="An hour before · 6 pm"
        right={<Status tone="wait">6 pm</Status>}
      />
      <Line
        icon="pin"
        title="Location pin"
        meta="100 Feet Road"
        right={<Status tone="wait">6 pm</Status>}
      />
      <div className="mt-2 flex items-center gap-2.5 rounded-[14px] bg-ink px-3 py-2 text-white">
        <Icon name="whatsapp" size={16} />
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] font-medium">Dental Clinic · 6:00 pm</span>
          <span className="block truncate text-[10px] text-white/60">See you at 7, Arjun</span>
        </span>
      </div>
    </Sheet>
  );
}

/** Follow-ups that know when to stop: the aligner follow-up, and its month. */
export function FollowUp() {
  return (
    <Sheet label="Aligner follow-up" live>
      <div className="flex flex-col gap-1.5">
        <Step icon="chat" title="Day 1 · the plan" meta="Sent · with the price" className="!py-2" />
        <Step icon="repeat" title="Day 4 · a nudge" meta="Sent · if no reply" className="!py-2" />
        <Step
          lit
          icon="check"
          title="Stops on a booking"
          meta="No more messages"
          className="!py-2"
        />
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        <Metric label="Started" value="312" size={18} />
        <Metric label="Replied" value="128" size={18} />
        <Metric label="Booked" value="41" size={18} />
      </div>
    </Sheet>
  );
}

/** Asked for, paid and thanked: Meera's cleaning paid by UPI in the chat. */
export function Paid() {
  return (
    <Chat name="Meera Pillai" meta="Cleaning · Tue 11 am">
      <Bubble from="us" meta="1:30 pm">
        Your cleaning is held for Tuesday, 11 am. Pay to confirm:
      </Bubble>
      <div className="flex justify-end">
        <Press className="w-[9.5rem]">Pay ₹1,500</Press>
      </div>
      <div className="rounded-xl border border-line bg-white px-3 py-2 text-[11.5px]">
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <Icon name="check" size={12} strokeWidth={2.4} className="text-[#136b3d]" />
          ₹1,500 received · UPI
        </span>
        <span className="block text-[10px] text-ink-2">Receipt sent · 1:31 pm</span>
      </div>
    </Chat>
  );
}

/** Automation starts it, your team closes it: Lakshmi handed to Sameer, history and all. */
export function Handover() {
  return (
    <Sheet label="Inbox · 24 today" live foot={['For a person', '3']}>
      <Line face="Priya Sharma" title="Priya Sharma" meta="Sundays?" right={<Status>Bot</Status>} />
      <Line face="Arjun Rao" title="Arjun Rao" meta="Booked · 7 pm" right={<Status>Bot</Status>} />
      <div className="sc-step--lit -mx-1 rounded-xl border border-line px-1">
        <Line
          face="Lakshmi Menon"
          title="Lakshmi M"
          meta="Sent to Sameer"
          right={<Status tone="accent">Person</Status>}
        />
      </div>
    </Sheet>
  );
}
