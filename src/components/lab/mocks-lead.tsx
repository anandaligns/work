import product from '@/content/products/never-miss-a-lead';

import { Fit } from './fit';
import { Card, Face, Head, Pill, Row, Tag, Wires } from './light-kit';

/**
 * Never Miss a Lead's mockups for the v2 page, in the light kit, from its own sample business: every
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
