'use client';

import product from '@/content/products/ai-assistants';

import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import {
  Bars,
  Bubble,
  Chip,
  Line,
  Metric,
  Money,
  Panel,
  Stage,
  Status,
  Step,
  Thinking,
  Toast,
} from './kit';

/**
 * AI Assistants, in the showcase kit, from the page's own sample business — a Law Firm and its
 * assistant: Anjali's question about the consultation fee at 10:52 pm and the consultation it
 * booked, the answer it wouldn't guess, the lead saved with the conversation, the documents it
 * reads, and what people asked this week.
 */
const P = product.accent;
const A = BRANDS.lawfirm!.accent;

/** Where an answer came from: the firm's own document. */
function Source({ children }: { children: string }) {
  return (
    <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-white/80 px-1.5 py-0.5 text-[10.5px] text-ink-2">
      <Icon name="file" size={10} />
      {children}
    </span>
  );
}

/** Answers at any hour: the consultation fee at 10:52 pm, and a consultation booked in the same chat. */
export function WidgetMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={300}
        label="Ask the firm · website"
        badge={<Status tone="accent">10:52 pm</Status>}
      >
        <div className="flex flex-col gap-2 px-1 pb-2">
          <Bubble meta="10:52 pm" i={1}>
            How much is a consultation for a property matter?
          </Bubble>
          <Thinking i={2}>Reading 2 documents…</Thinking>
          <Bubble from="us" meta="10:52 pm" i={3}>
            ₹2,000 for 45 minutes, at our office or by video. Shall I book one?
            <Source>Consultation fees 2026</Source>
          </Bubble>
          <Bubble meta="10:53 pm" i={4}>
            Yes, Saturday please
          </Bubble>
        </div>
      </Panel>
      <Toast
        x={282}
        y={250}
        w={210}
        icon="calendar"
        title="Booked · Sat 10 am"
        meta="Adv. Menon · reminder sent"
        tone="ok"
      />
    </Stage>
  );
}

/** Answers you can trust: from the firm's own documents only, and a lawyer when they don't say. */
export function TrustMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={300}
        label="Only your documents"
        badge={
          <Status tone="accent" icon="shield">
            It won’t guess
          </Status>
        }
      >
        <div className="flex flex-col gap-2 px-1 pb-2">
          <Bubble i={1}>Do you handle property registration?</Bubble>
          <Bubble from="us" i={2}>
            Yes: sale deeds, registration and title checks, for flats and plots.
            <Source>Practice areas.pdf</Source>
          </Bubble>
          <Bubble i={3}>Will I win my case against the builder?</Bubble>
          <Bubble from="us" i={4}>
            I can’t advise on that, so I won’t guess. Adv. Menon will call you tomorrow.
          </Bubble>
        </div>
      </Panel>
      <Panel x={300} y={120} w={190} label="How it answers" i={2}>
        <div className="px-1.5">
          <Line icon="file" title="Documents only" right={<Status>On</Status>} />
          <Line icon="spark" title="Says it’s AI" right={<Status>On</Status>} />
          <Line icon="chat" title="EN · HI · KN" meta="Warm and short" />
        </div>
      </Panel>
    </Stage>
  );
}

/** Leads, not just answers: Anjali saved as a lead, with the conversation and what happened. */
export function LeadMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={310}
        label="Anjali Rao · Whitefield"
        badge={<Status>Booked</Status>}
        foot={['Matter', 'Property dispute']}
      >
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            icon="chat"
            title="Asked about fees and process"
            meta="10:52 pm · from 2 documents"
          />
          <Step
            turn
            n={3}
            i={1}
            icon="calendar"
            title="Consultation on Saturday"
            meta="10:54 pm · Adv. Menon"
          />
          <Step
            turn
            n={3}
            i={2}
            icon="userCheck"
            title="Saved as a lead"
            meta="10:54 pm · with the chat"
            status="New"
            tone="accent"
          />
        </div>
      </Panel>
      <Toast
        x={300}
        y={50}
        w={190}
        tool="Zoho"
        title="New lead in the CRM"
        meta="Seen in the morning"
      />
    </Stage>
  );
}

/** Your knowledge: the documents it reads, and what always goes to a person. */
export function KnowledgeMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={320} label="Knowledge · what it reads" live>
        <div className="flex flex-col gap-2">
          <Step icon="file" title="Consultation fees 2026" meta="PDF · 12 Sep" status="In use" />
          <Step
            tool="Google Drive"
            title="Practice areas"
            meta="Google Doc · today"
            status="In use"
          />
          <Step
            tool="Google Sheets"
            title="Front-desk FAQs"
            meta="Google Sheet · 9 Sep"
            status="In use"
          />
          <Step
            lit
            icon="file"
            title="Documents to bring"
            meta="PDF · Jan 2024"
            status="Check"
            tone="wait"
          />
        </div>
      </Panel>
      <Panel x={312} y={170} w={180} label="Always a person" i={3}>
        <div className="px-1.5">
          <Line icon="userShare" title="Case advice" meta="To a lawyer" />
          <Line icon="calendar" title="Court dates" meta="To Adv. Menon" />
        </div>
      </Panel>
    </Stage>
  );
}

/** Insights: the month's conversations, when people ask, and what they ask most. */
export function InsightsMock() {
  const top = [
    ['Consultation fee', '184'],
    ['Property registration', '131'],
    ['Divorce and custody', '96'],
    ['Rental agreements', '58'],
  ] as const;
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={40} w={290} label="This month" live>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-3 pb-3">
          <Metric label="Conversations" value={1284} delta="14%" size={26} />
          <Metric label="Answered alone" value={78} suffix="%" size={26} />
          <Metric label="Consultations" value={96} delta="21" size={22} />
          <Metric label="To a person" value={212} size={22} />
        </div>
      </Panel>
      <Panel x={326} y={20} w={270} label="By time of day" i={1}>
        <div className="px-3 pb-2">
          <Bars
            values={[24, 45, 37, 66, 100, 79]}
            labels={['8a', '11a', '2p', '5p', '8p', '11p']}
            now={4}
            height={120}
          />
        </div>
      </Panel>
      <Panel x={612} y={50} w={270} label="Top questions · week" i={2}>
        <div className="px-2">
          {top.map(([question, n]) => (
            <Line key={question} icon="question" title={question} right={<Money>{n}</Money>} />
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

/** How it's built: where it answers and what it connects to, and what reaches a lawyer. */
export function AiAssistantsHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel x={40} y={30} w={340} label="Where it answers · connects" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            tool="WhatsApp"
            title="WhatsApp"
            meta="Your business number"
            status="On"
          />
          <Step turn n={4} i={1} tool="Zoho" title="Zoho CRM" meta="Saves every lead" status="On" />
          <Step
            turn
            n={4}
            i={2}
            tool="Google Drive"
            title="Google Drive"
            meta="Reads 6 documents"
            status="On"
          />
          <Step turn n={4} i={3} tool="Gmail" title="Gmail" meta="Morning summary" status="On" />
        </div>
      </Panel>
      <Panel
        x={360}
        y={280}
        w={300}
        label="Needs you · Adv. Menon"
        badge={<Status tone="accent">2</Status>}
        i={2}
      >
        <div className="flex flex-col gap-2">
          <Step
            face="Farhan Q"
            title="Farhan Q"
            meta="Wants a lawyer to call"
            status="New"
            tone="accent"
          />
          <Step
            face="Lakshmi N"
            title="Lakshmi N"
            meta="Notice from a tenant"
            status="1 h"
            tone="wait"
          />
        </div>
        <div className="px-2 pt-2.5 pb-1">
          <Chip on>With the whole conversation</Chip>
        </div>
      </Panel>
    </Stage>
  );
}

export const AiAssistantsHow = AiAssistantsHowBox;
