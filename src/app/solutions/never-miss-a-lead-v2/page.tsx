import type { Metadata } from 'next';

import { Closing } from '@/components/home/closing';
import { SectionHead } from '@/components/home/section-head';
import {
  FirstRepliesMock,
  FollowUpMock,
  ReplyMock,
  SourcesMock,
} from '@/components/lab/mocks-lead';
import { Benefits, SystemRow } from '@/components/lab/soft';
import type { StageTask } from '@/components/pages/app-stage';
import { ProductOpeningFull, RelatedIndex } from '@/components/pages/product';
import { Rich } from '@/components/pages/product-parts';
import { FaqBand } from '@/components/pages/sections';
import { BuiltFrom, Journey, WaysIn } from '@/components/solutions/parts';
import { iconFor, SOLUTION_ICONS } from '@/components/ui/icon';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { lab, product } from '@/content/lab/never-miss-a-lead';
import { solutionPageFor, solutionPages } from '@/content/pages';
import { categories, solutions } from '@/content/site';

/**
 * `/solutions/never-miss-a-lead-v2` — the solution page redesigned, on the site's own light, to
 * read differently from the service pages: the product at work in the opening, one lead's
 * evening, the system behind it in three mockups, the five services built as one, what changes
 * in five boxes, and the ways in. The live `/solutions/lead-automation` is left as it is. Out of
 * search and the sitemap.
 */
export const metadata: Metadata = {
  title: 'Lead Automation (v2)',
  robots: { index: false, follow: false },
};

const SLUG = 'lead-automation';
const A = lab.accent;
const TINT = '#eaf5ee';

const feature = (label: string) => product.features.items.find((i) => i.label === label)!;
const plain = (text: string) => text.replace(/\*\*/g, '');
const desk = (screen: unknown) => screen as StageTask['screen'];

const TASKS: StageTask[] = [
  {
    icon: 'target',
    title: 'New enquiry',
    line: 'Priya Menon · deep cleaning · replied in 8 seconds',
    screen: desk(product.stage?.back),
  },
  {
    icon: 'repeat',
    title: 'Follow-ups',
    line: 'Sending Sana Khan’s second reminder…',
    screen: desk(feature('Nothing slips').screen),
  },
  {
    icon: 'chart',
    title: 'Sources',
    line: 'Counting this month’s bookings by source…',
    screen: desk(feature('Sources').screen),
  },
];

const services = categories.flatMap((category) => category.services);

export default function NeverMissALeadV2() {
  const page = solutionPageFor(SLUG)!;
  const solution = solutions.find((s) => s.slug === SLUG)!;
  const others = solutionPages.filter((other) => other.slug !== SLUG);

  return (
    <>
      <ProductOpeningFull
        title={solution.name}
        intro={page.intro}
        interest={SLUG}
        topic={solution.name}
        accent={A}
        tasks={TASKS}
        note={{ label: 'From', text: '₹45,000 · the Connected Website', href: '#ways-in' }}
      />

      <div className="alt-bands">
        <Journey
          eyebrow={lab.journey.eyebrow}
          heading={lab.journey.heading}
          intro={lab.journey.intro}
          steps={lab.journey.steps}
          accent={A}
        />

        <SystemRow
          tint={TINT}
          head={
            <SectionHead
              id="behind"
              eyebrow="How it works"
              heading={{ lead: 'The system behind', fill: 'every enquiry.' }}
              intro="It works because it’s wired into the rest of your business, not bolted on."
              align="center"
            />
          }
          cards={[
            {
              scene: <SourcesMock />,
              title: 'Every source, one list',
              body: 'Website forms, ads, Instagram and WhatsApp land in one place, each with where it came from.',
              cta: { label: 'CRM-Connected Systems', href: '/services/crm-systems' },
            },
            {
              scene: <ReplyMock />,
              title: 'Answered at once',
              body: 'A reply with the price or the next free slots, on WhatsApp and email, at any hour.',
              cta: { label: 'WhatsApp & Email Automation', href: '/services/whatsapp-automation' },
            },
            {
              scene: <FollowUpMock />,
              title: 'Tracked until it’s closed',
              body: 'A next step, an owner and a date on every lead, with follow-ups until it’s booked or closed.',
              cta: { label: 'Dashboards', href: '/services/dashboards' },
            },
          ]}
        />

        <BuiltFrom
          eyebrow={lab.built.eyebrow}
          heading={lab.built.heading}
          intro={lab.built.intro}
          services={page.services.flatMap((anchor) => {
            const service = services.find((s) => s.anchor === anchor);
            return service
              ? [
                  {
                    name: service.name,
                    line: service.summary,
                    href: `/services/${anchor}`,
                    icon: iconFor(anchor),
                  },
                ]
              : [];
          })}
        />

        <Benefits
          accent={A}
          tint={TINT}
          head={
            <SectionHead
              id="benefits"
              eyebrow="Benefits"
              heading={{ lead: 'What changes', fill: 'when no enquiry waits.' }}
              intro={product.features.intro}
              align="center"
            />
          }
          wide={{
            title: feature('Answered at once').title,
            body: plain(feature('Answered at once').body),
            scene: <FirstRepliesMock />,
          }}
          items={[
            {
              icon: 'calendar',
              title: feature('Booked in the reply').title,
              body: plain(feature('Booked in the reply').body),
            },
            {
              icon: 'repeat',
              title: feature('Nothing slips').title,
              body: plain(feature('Nothing slips').body),
            },
            {
              icon: 'bell',
              title: feature('Team alerts').title,
              body: plain(feature('Team alerts').body),
            },
            {
              icon: 'chart',
              title: feature('Sources').title,
              body: plain(feature('Sources').body),
            },
          ]}
        />

        <WaysIn
          eyebrow={lab.ways.eyebrow}
          heading={lab.ways.heading}
          intro={lab.ways.intro}
          price={product.price}
          accent={A}
        />

        <FaqBand
          eyebrow={solution.name}
          title={product.faqs.heading}
          faqs={product.faqs.items}
          interest={SLUG}
          topic={solution.name}
          after={
            <div className="flex flex-col gap-2 rounded-2xl border border-line p-5 text-xs leading-relaxed text-ink-3">
              {(product.notes ?? []).map((note) => (
                <p key={note}>
                  <Rich text={note} />
                </p>
              ))}
            </div>
          }
        />
      </div>

      <RelatedIndex
        id="other-solutions"
        eyebrow="Solutions"
        heading="Other solutions"
        off
        links={others.map((other) => {
          const s = solutions.find((x) => x.slug === other.slug)!;
          return { name: s.name, line: s.line, href: `/solutions/${other.slug}` };
        })}
      />

      <Closing
        heading={page.closing}
        interest={SLUG}
        topic={solution.name}
        visual={<ConnectScene icon={SOLUTION_ICONS[SLUG] ?? 'target'} tint={page.tint} />}
      />
    </>
  );
}
