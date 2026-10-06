import product from '@/content/products/never-miss-a-lead';

import { ToolMark } from '../ui/brand-logos';
import { Bleed, Fit } from './fit';
import { Card, Face, Head, Pill, Row, Tag, Wires } from './light-kit';
import {
  Bar,
  Between,
  ChatHead,
  Check,
  Choice,
  Col,
  Composer,
  Figure,
  FlowStep,
  Grid,
  Label,
  Message,
  More,
  Notice,
  Pane,
  Segments,
  SideList,
  type SideItem,
  StepMark,
  SystemNote,
  Tabs,
  FilterRow,
  Tile,
  Title,
  ViewChip,
} from './window-kit';

/**
 * Lead Automation's mockups for the v2 page, in the light kit, from its own sample business: every
 * source landing in one list, the quote that answered Priya in eight seconds, and today's
 * follow-ups with a next step on each. Each is laid out on a 480 × 340 canvas.
 */

const A = product.accent;

export function SourcesMock() {
  const sources = [
    { tool: 'Your website forms', title: 'Website form', y: 26 },
    { tool: 'Google Ads', title: 'Google Ads', y: 96 },
    { tool: 'Instagram', title: 'Instagram', y: 166 },
    { tool: 'WhatsApp', title: 'WhatsApp', y: 236 },
  ];
  return (
    <Fit w={480} h={340}>
      {sources.map((s, i) => (
        <Card key={s.title} x={22} y={s.y} w={164} i={i}>
          <div className="p-2.5">
            <Head tool={s.tool} accent={A} title={s.title} />
          </div>
        </Card>
      ))}
      <Card x={226} y={58} w={232} i={4}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head
            icon="target"
            accent={A}
            title="Every enquiry"
            meta="From every source"
            right={
              <Tag tone="accent" accent={A}>
                New · 5
              </Tag>
            }
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Face name="Priya Menon" tone="#e6f7ee" />}
              title="Priya Menon"
              meta="Website form · 8 s"
              right={
                <Tag tone="accent" accent={A}>
                  New
                </Tag>
              }
            />
            <Row
              lead={<Face name="Rahul Bose" tone="#e5f3fb" />}
              title="Rahul Bose"
              meta="Google Ads · 5 s"
              right={<Tag tone="ok">Booked</Tag>}
            />
            <Row
              lead={<Face name="Sana Khan" tone="#fdecee" />}
              title="Sana Khan"
              meta="Instagram · 6 s"
              right={<Tag>Replied</Tag>}
            />
          </div>
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={[
          'M186 52 C 210 52, 202 158, 226 158',
          'M186 122 C 210 122, 202 158, 226 158',
          'M186 192 C 210 192, 202 158, 226 158',
          'M186 262 C 210 262, 202 158, 226 158',
        ]}
        dots={[
          [186, 52],
          [186, 122],
          [186, 192],
          [186, 262],
          [226, 158],
        ]}
      />
      <Pill x={306} y={282} i={6} accent={A}>
        64 of 64 answered
      </Pill>
    </Fit>
  );
}

export function ReplyMock() {
  const fields = [
    ['Service', 'Deep cleaning'],
    ['Home', '3 BHK · HSR Layout'],
    ['Price', '₹6,499 incl. GST'],
  ];
  return (
    <Fit w={480} h={340}>
      <Card x={22} y={30} w={196} i={0}>
        <div className="p-3.5">
          <Head
            tool="Your website forms"
            accent={A}
            title="New enquiry"
            meta="Priya Menon · 9:02 pm"
          />
          <p className="mt-2.5 rounded-lg bg-[#f5f5f7] px-2.5 py-2 text-[11px] leading-snug text-ink-2">
            Deep cleaning for a 3 BHK in HSR Layout, this weekend.
          </p>
        </div>
      </Card>
      <Card x={250} y={30} w={208} i={2}>
        <div className="p-3.5">
          <Head tool="WhatsApp" accent={A} title="Your quote, Priya" meta="Sent at 9:02 pm" />
          <div className="mt-2.5 divide-y divide-[#f0f0f3] border-y border-[#f0f0f3]">
            {fields.map(([k, v]) => (
              <p key={k} className="flex items-center justify-between py-[7px] text-[11px]">
                <span className="text-ink-3">{k}</span>
                <span className="font-medium">{v}</span>
              </p>
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <span
              className="rounded-lg py-[7px] text-center text-[11px] font-semibold text-white"
              style={{ background: A }}
            >
              Book a slot
            </span>
            <span className="rounded-lg bg-[#f2f2f4] py-[7px] text-center text-[11px] font-semibold">
              Call us
            </span>
          </div>
        </div>
      </Card>
      <Card x={250} y={252} w={208} i={4}>
        <div className="p-2.5">
          <Head
            tool="Gmail"
            accent={A}
            title="And by email"
            meta="The same quote"
            right={<Tag tone="ok">Sent</Tag>}
          />
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M218 89 H 250', 'M234 89 V 279 H 250']}
        dots={[
          [218, 89],
          [250, 89],
          [250, 279],
        ]}
      />
      <Pill x={22} y={188} i={5} accent={A}>
        Replied in 8 seconds
      </Pill>
    </Fit>
  );
}

export function FollowUpMock() {
  return (
    <Fit w={480} h={340}>
      <Card x={22} y={26} w={292} i={0}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head
            icon="repeat"
            accent={A}
            title="Follow-ups"
            meta="Due today · 7"
            right={<Tag>This week</Tag>}
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Face name="Sana Khan" tone="#fdecee" />}
              title="Sana Khan · sofa"
              meta="Second reminder, then a call · Ravi"
              right={<Tag tone="wait">Due</Tag>}
            />
            <Row
              lead={<Face name="Neha Gupta" tone="#fff5d6" />}
              title="Neha Gupta · move-in"
              meta="Call: asked about a Sunday · Anita"
              right={
                <Tag tone="accent" accent={A}>
                  Person
                </Tag>
              }
            />
            <Row
              lead={<Face name="Meera S" tone="#eceefb" />}
              title="Meera S · kitchen"
              meta="Quote viewed, no reply · tomorrow"
              right={<Tag>Automatic</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={232} y={242} w={226} i={3}>
        <div className="p-2.5">
          <Head
            icon="check"
            accent={A}
            title="Vikram J · villa"
            meta="Chose another date"
            right={<Tag tone="ok">Closed</Tag>}
          />
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M168 226 C 168 258, 200 269, 232 269']}
        dots={[
          [168, 226],
          [232, 269],
        ]}
      />
      <Pill x={22} y={290} i={5} accent={A}>
        A next step on every lead
      </Pill>
    </Fit>
  );
}

/** For the wide benefit: tonight's first replies, every one in seconds. */
export function FirstRepliesMock() {
  return (
    <Fit w={360} h={240} max={1.35}>
      <Card x={20} y={20} w={320} i={0}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head
            icon="clock"
            accent={A}
            title="First replies tonight"
            meta="Website, ads and WhatsApp"
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Face name="Priya Menon" tone="#e6f7ee" />}
              title="Priya Menon"
              meta="Website form · 9:02 pm"
              right={<Tag tone="ok">8 s</Tag>}
            />
            <Row
              lead={<Face name="Rahul Bose" tone="#e5f3fb" />}
              title="Rahul Bose"
              meta="Google Ads · 8:41 pm"
              right={<Tag tone="ok">5 s</Tag>}
            />
            <Row
              lead={<Face name="Sana Khan" tone="#fdecee" />}
              title="Sana Khan"
              meta="Instagram · 7:15 pm"
              right={<Tag tone="ok">6 s</Tag>}
            />
          </div>
        </div>
      </Card>
    </Fit>
  );
}

// --- the workspace, for the benefits ---------------------------------------------------------

/**
 * The benefits' picture, after Lightfield's chat over its workspace: Priya's conversation
 * floating at the front — her website enquiry, the quote that went back in eight seconds, the
 * slot she chose and the booking — and behind it the business's workspace, today's enquiries down
 * the left with hers open on the right: where it came from, the next steps and who has it. The
 * workspace runs off the panel's right and bottom edges (`Bleed`), on a 900 × 820 canvas.
 */

const face = (name: string) => <Face name={name} tone={`color-mix(in srgb, ${A} 12%, white)`} />;
const lead = (name: string, meta: string, tool: string, open = false): SideItem => ({
  lead: face(name),
  title: name,
  meta,
  mark: <ToolMark tool={tool} size={13} />,
  open,
});

export function WorkspaceMock() {
  return (
    <Bleed w={900} h={820}>
      <Pane x={232} y={262} w={720} h={640} i={0}>
        <div className="flex h-full">
          <SideList
            icon="target"
            title="Every enquiry"
            count="Today · 12"
            groups={[
              {
                title: 'Follow-ups due',
                count: '7',
                items: [
                  lead('Sana Khan', 'Sofa · second reminder', 'Instagram'),
                  lead('Neha Gupta', 'Move-in · asked about a Sunday', 'Google Maps'),
                  lead('Karthik R', 'Termites · inspection report', 'Google'),
                  lead('Meera S', 'Kitchen · quote viewed', 'Your website forms'),
                  lead('Vikram J', 'Villa · chose another date', 'WhatsApp'),
                ],
              },
              {
                title: 'New tonight',
                count: '5',
                items: [
                  lead('Priya Menon', 'Deep cleaning · 3 BHK', 'Your website forms', true),
                  lead('Rahul Bose', 'Termite treatment', 'Google Ads'),
                  lead('Sana Khan', 'Sofa cleaning', 'Instagram'),
                  lead('Arun Pillai', 'Cockroach control', 'WhatsApp'),
                  lead('Neha Gupta', 'Move-in cleaning', 'Google Maps'),
                ],
              },
            ]}
          />
          <div className="min-w-0 flex-1">
            <Bar icon="layers">
              <span className="text-ink-2">Leads</span>
              <span className="text-ink-3">/</span>
              <span className="font-semibold">Priya Menon</span>
              <More />
            </Bar>
            <div className="px-7 pt-6">
              <Title
                tile={<Tile initials="PM" accent={A} />}
                title="Priya Menon"
                after={<Tag tone="ok">Booked</Tag>}
              />
              <div className="mt-7">
                <Label>Asked for</Label>
                <p className="mt-1.5 w-[440px] text-[15px] leading-[1.5]">
                  Deep cleaning for a 3 BHK in HSR Layout, with an inspection this weekend.
                </p>
              </div>
              <div className="mt-6">
                <Label>Came from</Label>
                <div className="mt-2 flex flex-col gap-2.5 text-[13px] whitespace-nowrap">
                  <span className="flex items-center gap-2.5">
                    <ToolMark tool="Google" size={15} />
                    Google search
                    <span className="text-ink-3">“deep cleaning hsr”</span>
                  </span>
                  <span className="flex items-center gap-2.5">
                    <ToolMark tool="Your website forms" size={15} />
                    The website’s quote form
                    <span className="text-ink-3">9:01 pm</span>
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Label>Next steps</Label>
                <ul className="mt-1">
                  <Check done title="Quote sent" meta="WhatsApp and email · 8 s" accent={A} />
                  <Check done title="Inspection booked" meta="Saturday, 10:30 am" accent={A} />
                  <Check done={false} title="Reminder" meta="The evening before" accent={A} />
                </ul>
              </div>
              <div className="mt-6 w-[470px] rounded-[14px] border border-[#e4e6eb] p-4">
                <Label>Assigned to — by area</Label>
                <div className="mt-2.5 flex items-center gap-2.5">
                  {face('Anita')}
                  <span className="text-[13px] font-semibold">Anita · HSR team</span>
                </div>
                <p className="mt-2.5 text-[12.5px] leading-[1.55] text-ink-2">
                  Alerted at 9:02 pm, with the whole enquiry and the reply that had already gone
                  out. Call or WhatsApp in one tap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Pane>
      <Pane x={36} y={36} w={428} h={524} i={2} float>
        <div className="flex h-full flex-col">
          <ChatHead tool="WhatsApp" title="Priya Menon" meta="WhatsApp · +91 98860 •• 102" />
          <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-4 pt-3.5">
            <Notice tool="Your website forms" meta="Website enquiry · 9:01 pm">
              Deep cleaning · 3 BHK · HSR Layout. An inspection this weekend.
            </Notice>
            <SystemNote accent={A}>Instant reply · 8 seconds</SystemNote>
            <Message own time="9:02 pm" accent={A}>
              Thanks for asking, Priya. A deep clean for a 3 BHK is <b>₹6,499 incl. GST</b>: 5–6
              hours, a team of 3. Pick a slot for the inspection:
            </Message>
            <div className="flex justify-end gap-1.5">
              <Choice on accent={A}>
                Sat 10:30 am
              </Choice>
              <Choice accent={A}>Sat 4:00 pm</Choice>
              <Choice accent={A}>Sun 11:00 am</Choice>
            </div>
            <Message time="9:06 pm" accent={A}>
              Saturday 10:30, please.
            </Message>
            <Message own time="9:06 pm" accent={A}>
              Booked for Saturday, 10:30 am, with Anita from the HSR team. A reminder comes the
              evening before.
            </Message>
          </div>
          <Composer accent={A} />
        </div>
      </Pane>
    </Bleed>
  );
}

// --- the system, for how it works --------------------------------------------------------------

/**
 * How it works, after Lightfield's list behind its sequence: every enquiry down the left, each
 * with a dot if it came in tonight and a bar of four for how far it has got (asked, replied,
 * booked, closed), and in front the system's own screen — this week's figures, what it does in a
 * sentence, and its steps: the instant reply on WhatsApp, the same quote by email, the alert to
 * the area's team and the follow-up. Both windows run off the panel's right and bottom edges
 * (`Bleed`), on a 900 × 780 canvas.
 */

const STAGES: { name: string; done: number; tone?: 'wait' | 'closed'; fresh?: boolean }[] = [
  { name: 'Priya Menon', done: 2, fresh: true },
  { name: 'Rahul Bose', done: 3, fresh: true },
  { name: 'Sana Khan', done: 2, fresh: true },
  { name: 'Arun Pillai', done: 3, fresh: true },
  { name: 'Neha Gupta', done: 2, tone: 'wait', fresh: true },
  { name: 'Karthik R', done: 3 },
  { name: 'Meera S', done: 2 },
  { name: 'Vikram J', done: 4, tone: 'closed' },
];

export function SystemMock() {
  return (
    <Bleed w={900} h={780}>
      <Pane x={56} y={168} w={520} h={700} i={0}>
        <Bar icon="people">
          <span className="font-semibold">Every enquiry</span>
          <ViewChip />
        </Bar>
        <FilterRow />
        <Grid
          cols="1fr 96px 1fr"
          head={[
            <Col key="c" icon="people">
              Contact
            </Col>,
            <Col key="s" icon="chart">
              Stage
            </Col>,
            'Source',
          ]}
          rows={STAGES.map((stage) => [
            <>
              {face(stage.name)}
              <span className="truncate text-[12.5px] font-medium">{stage.name}</span>
              {stage.fresh ? (
                <span
                  className="mr-2 ml-auto size-[5px] shrink-0 rounded-full"
                  style={{ background: A }}
                />
              ) : null}
            </>,
            <Segments
              key="s"
              done={stage.done}
              colour={stage.tone === 'wait' ? '#f0b429' : stage.tone === 'closed' ? '#b9bdc7' : A}
            />,
            null,
          ])}
        />
      </Pane>
      <Pane x={356} y={44} w={640} h={800} i={2}>
        <Bar icon="spark">
          <span className="font-semibold">New enquiry, answered</span>
          <More />
          <Tabs items={['Overview', 'Enquiries', 'Replies', 'Who gets told']} />
        </Bar>
        <div className="px-8 pt-7">
          <Title tile={<Tile icon="spark" accent={A} />} title="New enquiry, answered" />
          <div className="mt-7">
            <Label>This week</Label>
            <div className="mt-2.5 flex gap-2.5">
              <Figure value="64" label="Enquiries" />
              <Figure value="64" share="100%" label="Replied in under a minute" />
              <Figure value="23" share="36%" label="Inspections booked" />
              <Figure value="2" label="Waiting on a person" />
            </div>
          </div>
          <div className="mt-7">
            <Label>What it does</Label>
            <p className="mt-1.5 w-[560px] text-[15.5px] leading-[1.55]">
              Answer every enquiry at once with the price or the next free slots, on WhatsApp and
              email, at any hour. Anything that needs a person goes to the right one, by area or
              service.
            </p>
          </div>
          <div className="mt-7">
            <Label>Steps</Label>
            <div className="mt-2.5">
              <FlowStep
                n={1}
                lead={<StepMark tool="WhatsApp" />}
                title="Instant reply"
                line="the quote, with a booking link"
              />
              <Between>Immediately</Between>
              <FlowStep n={2} lead={<StepMark tool="Gmail" />} title="The same quote by email" />
              <Between>If it needs a person</Between>
              <FlowStep
                n={3}
                lead={<StepMark icon="bell" />}
                title="Alert the area’s team"
                line="HSR and Koramangala: Anita"
              />
              <Between>If there’s no reply</Between>
              <FlowStep
                n={4}
                lead={<StepMark icon="repeat" />}
                title="Follow up"
                line="stops on a reply or a booking"
              />
            </div>
          </div>
        </div>
      </Pane>
    </Bleed>
  );
}
