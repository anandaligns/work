'use client';

import { Icon } from '../../ui/icon';
import { Bars, Bubble, Line, Metric, Status, Thinking, Track } from '../kit';
import { Chat, Sheet } from '../sheet';

/**
 * AI Assistants' five screens, from the page's sample business — a Law Firm and its assistant:
 * Anjali's question about the fee at 10:52 pm, the answer it wouldn't guess, her lead saved with
 * the conversation, the documents it reads, and the month.
 */

/** Answers at any hour: the consultation fee at 10:52 pm, from the firm's own document. */
export function Answers() {
  return (
    <Chat name="Law Firm" meta="AI assistant · website">
      <Bubble meta="10:52 pm">What does a first consultation cost?</Bubble>
      <Thinking>Reading 2 documents…</Thinking>
      <Bubble from="us" meta="10:52 pm">
        ₹2,000 for 45 minutes, set off against the fee if you go ahead. Shall I book one?
      </Bubble>
      <span className="flex items-center gap-1 self-end text-[10px] text-ink-2">
        <Icon name="file" size={10} /> Consultation fees 2026
      </span>
    </Chat>
  );
}

/** Answers you can trust: the firm's documents only, and a lawyer when they don't say. */
export function Trust() {
  return (
    <Chat name="Law Firm" meta="AI assistant · website">
      <Bubble meta="9:14 pm">Will I win my case against the builder?</Bubble>
      <Bubble from="us" meta="9:14 pm">
        That needs a lawyer’s view of your papers, so I won’t guess. Adv. Menon can call you
        tomorrow — shall I ask?
      </Bubble>
      <span className="self-center rounded-full bg-white px-2.5 py-1 text-[10px] text-ink-2">
        Case advice always goes to a person
      </span>
    </Chat>
  );
}

/** Leads, not just answers: Anjali saved as a lead, with the conversation. */
export function Lead() {
  return (
    <Sheet label="Anjali Rao" badge={<Status>Booked</Status>}>
      <Track
        steps={[
          { title: 'Asked about fees', meta: '10:52 pm · 2 documents', done: true },
          { title: 'Consultation, Saturday', meta: '10:54 pm · Adv. Menon', done: true },
          { title: 'Saved as a lead', meta: 'With the chat', done: true },
          { title: 'In the CRM', meta: 'Seen in the morning', done: true },
        ]}
      />
    </Sheet>
  );
}

/** Your knowledge: the documents it reads, kept up to date. */
export function Knowledge() {
  return (
    <Sheet label="What it reads" foot={['Languages', 'EN · HI · KN']}>
      <Line icon="file" title="Consultation fees 2026" meta="PDF · 12 Sep" />
      <Line tool="Google Drive" title="Practice areas" meta="Google Doc · today" />
      <Line tool="Google Sheets" title="Front-desk FAQs" meta="Sheet · 9 Sep" />
      <Line icon="file" title="Documents to bring" meta="PDF · Jan 2024" />
    </Sheet>
  );
}

/** Insights: the month's conversations, and when people ask. */
export function Month() {
  return (
    <Sheet label="This month" live>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        <Metric label="Conversations" value="1,284" size={20} />
        <Metric label="Answered alone" value="78%" size={20} />
        <Metric label="Consultations" value="96" delta="22%" size={20} />
        <Metric label="To a person" value="212" size={20} />
      </div>
      <p className="mt-3 text-[11px] text-ink-2">By time of day · most after 8 pm</p>
      <div className="mt-1.5">
        <Bars values={[8, 14, 22, 19, 16, 24, 38, 46, 30]} now={7} height={44} />
      </div>
    </Sheet>
  );
}
