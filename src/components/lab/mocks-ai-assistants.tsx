import product from '@/content/products/ai-assistants';

import { ToolMark } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import { Card, Face, Head, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Bars, Bubble, Chip, Dot, Stat } from './mock-parts';

/**
 * AI Assistants' mockups, in the light kit, from the page's own sample business — a Law Firm and
 * its assistant: Anjali's question about the consultation fee at 10:52 pm and the consultation it
 * booked, the answer it wouldn't guess, the lead saved with the conversation, the documents it
 * reads, and what people asked this week. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.lawfirm!.accent;

/** A source chip under an answer: the document it came from. */
function Source({ children }: { children: string }) {
  return (
    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/80 px-1.5 py-0.5 text-[8.5px] text-ink-2 ring-1 ring-black/[0.06]">
      <Icon name="file" size={9} />
      {children}
    </span>
  );
}

/** Answers at any hour: the consultation fee at 10:52 pm, and a consultation booked in the same chat. */
export function WidgetMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={18} w={276} i={0}>
        <div className="p-3">
          <Head icon="spark" accent={P} title="Ask the firm" meta="On the website · 10:52 pm" />
          <div className="mt-2.5 flex flex-col gap-1.5">
            <Bubble from="customer" time="10:52 pm" accent={A}>
              How much is a consultation for a property matter?
            </Bubble>
            <Bubble from="business" time="10:52 pm" accent={A}>
              ₹2,000 for 45 minutes, at our office or by video. Shall I book one?
              <Source>Consultation fees 2026</Source>
            </Bubble>
            <Bubble from="customer" time="10:53 pm" accent={A}>
              Yes, Saturday please
            </Bubble>
          </div>
        </div>
      </Card>
      <Card x={314} y={110} w={186} i={2}>
        <div className="p-3">
          <Head
            icon="calendar"
            accent={P}
            title="Booked"
            meta="Sat, 10 am"
            right={<Tag tone="ok">Done</Tag>}
          />
          <p className="mt-2 text-[10px] text-ink-3">Adv. Menon · reminder on WhatsApp</p>
        </div>
      </Card>
      <Pill x={314} y={206} i={4} accent={P} icon="clock">
        Answered at 10:52 pm
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M296 140 C 306 140, 304 140, 314 140']}
        dots={[[296, 140]]}
      />
    </Fit>
  );
}

/** Answers you can trust: from the firm's own documents only, and a lawyer when they don't say. */
export function TrustMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={20} w={272} i={0}>
        <div className="p-3">
          <Head icon="shield" accent={P} title="Try it" meta="Only from your documents" />
          <div className="mt-2.5 flex flex-col gap-1.5">
            <Bubble from="customer" time="now" accent={A}>
              Do you handle property registration?
            </Bubble>
            <Bubble from="business" time="now" accent={A}>
              Yes: sale deeds, registration and title checks, for flats and plots.
              <Source>Practice areas.pdf</Source>
            </Bubble>
            <Bubble from="customer" time="now" accent={A}>
              Will I win my case against the builder?
            </Bubble>
            <Bubble from="business" time="now" accent={A}>
              I can’t advise on that, so I won’t guess. Adv. Menon will call you tomorrow.
            </Bubble>
          </div>
        </div>
      </Card>
      <Card x={310} y={80} w={190} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="wrench" accent={P} title="How it answers" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="Documents only" right={<Tag tone="ok">On</Tag>} />
            <Row title="Says it’s an assistant" right={<Tag tone="ok">On</Tag>} />
            <Row title="English, Hindi, Kannada" meta="Warm and short" />
          </div>
        </div>
      </Card>
      <Pill x={310} y={236} i={4} accent={P} icon="shield">
        It won’t guess
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

/** Leads, not just answers: Anjali saved as a lead, with the conversation and what happened. */
export function LeadMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={270} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head
            icon="person"
            accent={P}
            title="Anjali Rao"
            meta="Property dispute · Whitefield"
            right={<Tag tone="ok">Booked</Tag>}
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Dot icon="chat" tone={P} />}
              title="Asked about fees and the process"
              meta="10:52 pm · from 2 documents"
            />
            <Row
              lead={<Dot icon="calendar" tone={P} />}
              title="Consultation on Saturday"
              meta="10:54 pm · Adv. Menon"
            />
            <Row
              lead={<Dot icon="userCheck" tone={P} />}
              title="Saved as a lead"
              meta="10:54 pm · with the chat"
            />
          </div>
        </div>
      </Card>
      <Card x={308} y={100} w={192} i={2}>
        <div className="p-3">
          <Head tool="Zoho CRM" accent={P} title="New lead" meta="From the website" />
          <p className="mt-2 text-[10px] text-ink-3">Adv. Menon sees it in the morning</p>
        </div>
      </Card>
      <Pill x={40} y={240} i={4} accent={P} icon="target">
        A lead, not just an answer
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M290 120 C 300 120, 298 130, 308 130']}
        dots={[[290, 120]]}
      />
    </Fit>
  );
}

/** Your knowledge: the documents it reads, and what always goes to a person. */
export function KnowledgeMock() {
  const sources = [
    { t: 'Consultation fees 2026', m: 'PDF · 12 Sep', tag: <Tag tone="ok">In use</Tag> },
    { t: 'Practice areas', m: 'Google Doc · today', tag: <Tag tone="ok">In use</Tag> },
    { t: 'FAQs from the front desk', m: 'Google Sheet · 9 Sep', tag: <Tag tone="ok">In use</Tag> },
    { t: 'Documents to bring', m: 'PDF · Jan 2024', tag: <Tag tone="wait">Check</Tag> },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={290} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="book" accent={P} title="Knowledge" meta="What it reads" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {sources.map((s) => (
              <Row
                key={s.t}
                lead={<Dot icon="file" tone={P} />}
                title={s.t}
                meta={s.m}
                right={s.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={328} y={84} w={172} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="userShare" accent={P} title="Always a person" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="Advice on a case" meta="To a lawyer" />
            <Row title="Court dates" meta="To Adv. Menon" />
          </div>
        </div>
      </Card>
      <Pill x={40} y={270} i={4} accent={P} icon="book">
        It knows what you tell it, nothing else
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

/** Insights: the month's conversations, when people ask, and what they ask most. */
export function InsightsMock() {
  const top = [
    ['Consultation fee', '184'],
    ['Property registration', '131'],
    ['Divorce and custody', '96'],
    ['Rental agreements', '58'],
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={34} w={300} i={0}>
        <div className="p-3.5">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            This month
          </p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Stat label="Conversations" value="1,284" delta="14%" accent={A} />
            <Stat label="Answered alone" value="78%" accent={A} />
            <Stat label="Consultations" value="96" delta="21" accent={A} size={17} />
            <Stat label="To a person" value="212" accent={A} size={17} />
          </div>
        </div>
      </Card>
      <Card x={352} y={54} w={250} i={2}>
        <div className="p-3.5">
          <Head icon="clock" accent={P} title="Questions by time of day" />
          <div className="mt-3">
            <Bars values={[24, 45, 37, 66, 100, 79]} accent={A} height={92} />
          </div>
          <p className="mt-1.5 flex justify-between text-[8.5px] text-ink-3">
            <span>8 am</span>
            <span>8 pm</span>
            <span>11 pm</span>
          </p>
        </div>
      </Card>
      <Card x={626} y={96} w={226} i={3}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head icon="question" accent={P} title="Top questions" meta="This week" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {top.map(([q, n]) => (
              <Row
                key={q}
                title={q!}
                right={<span className="text-[11px] font-semibold tabular-nums">{n}</span>}
              />
            ))}
          </div>
        </div>
      </Card>
      <Pill x={352} y={272} i={4} accent={P} icon="chart">
        What people ask, and when
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

export const AI_ASSISTANTS_MOCKS = [WidgetMock, TrustMock, LeadMock, KnowledgeMock, InsightsMock];

/** How it's built: where it answers and what it connects to, and what reaches a lawyer. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function AiAssistantsHowScene({ box = false }: { box?: boolean }) {
  const channels = [
    { tool: 'WhatsApp', m: 'Your business number' },
    { tool: 'Zoho CRM', m: 'Saves every lead' },
    { tool: 'Google Drive', m: 'Reads 6 documents' },
    { tool: 'Gmail', m: 'Morning summary' },
  ];
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={24} w={320} i={0}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head icon="plug" accent={P} title="Where it answers" meta="assistant.lawfirm.in" />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              {channels.map((c) => (
                <Row
                  key={c.tool}
                  lead={
                    <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#f4f5f7]">
                      <ToolMark tool={c.tool} size={13} />
                    </span>
                  }
                  title={c.tool}
                  meta={c.m}
                  right={<Tag tone="ok">On</Tag>}
                />
              ))}
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={434} y={40} w={300} i={2}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head icon="userShare" accent={P} title="Needs you" meta="Adv. Ravi Menon · Partner" />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              <Row
                lead={<Face name="Farhan Q" />}
                title="Farhan Q"
                meta="Wants a lawyer to call"
                right={
                  <Tag tone="accent" accent={A}>
                    New
                  </Tag>
                }
              />
              <Row
                lead={<Face name="Lakshmi N" />}
                title="Lakshmi N"
                meta="Notice from a tenant"
                right={<Tag tone="wait">1 h</Tag>}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5 pb-1.5">
              <Chip accent={A}>With the whole conversation</Chip>
            </div>
          </div>
        </Card>
        <Pill x={434} y={250} i={4} accent={P}>
          The assistant answers; people decide
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M376 126 H 438 V 256']}
          dots={[
            [376, 126],
            [438, 256],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M344 110 C 389 110, 389 100, 434 100']}
          dots={[
            [344, 110],
            [434, 100],
          ]}
        />
      )}
    </Fit>
  );
}

export function AiAssistantsHow() {
  return <AiAssistantsHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function AiAssistantsHowBox() {
  return <AiAssistantsHowScene box />;
}
