import type { Metadata } from 'next';

import { CompareTable } from '@/components/pages/compare-table';
import { ProductOpeningFull, RelatedIndex } from '@/components/pages/product';
import { Rich } from '@/components/pages/product-parts';
import { FaqBand } from '@/components/pages/sections';
import { Band } from '@/components/layout/band';
import { FeatureSplit } from '@/components/lab/feature-split';
import {
  FlowsCard,
  FollowUpScene,
  HandoverScene,
  InstantScene,
  OfficialScene,
  PaymentScene,
  RecordCard,
  RemindersScene,
  TriggersCard,
} from '@/components/lab/scenes-whatsapp';
import { CtaBand, LabHead, StackMarquee, StatsBand, SystemCards } from '@/components/lab/sections';
import { WaysIn } from '@/components/solutions/parts';
import type { StageTask } from '@/components/pages/app-stage';
import { servicePageFor } from '@/content/pages';
import product from '@/content/products/whatsapp-automation';
import { categories, solutions } from '@/content/site';

/**
 * `/services/whatsapp-automation-test` — a trial of a new service page pattern on WhatsApp &
 * Email Automation, its sections laid out after Alia's and its mockups built from the product's
 * own pieces (`components/lab`). The live page is left as it is. Out of search and the sitemap.
 */
export const metadata: Metadata = {
  title: 'WhatsApp & Email Automation (test)',
  robots: { index: false, follow: false },
};

const SLUG = 'whatsapp-automation';
const A = product.accent;

const feature = (label: string) => product.features.items.find((i) => i.label === label)!;
const desk = (label: string) => feature(label).screen as StageTask['screen'];

const TASKS: StageTask[] = [
  {
    icon: 'chat',
    title: 'New enquiry',
    line: 'Priya Sharma · Instagram ad · answered at 11:52 pm',
    screen: product.stage?.back as StageTask['screen'],
  },
  {
    icon: 'repeat',
    title: 'Quote follow-up',
    line: 'Waiting two days before the next nudge…',
    screen: desk('Follow-up sequences'),
  },
  {
    icon: 'userCheck',
    title: 'Hand-over',
    line: 'Lakshmi’s question, handed to Sameer with the history',
    screen: desk('Team inbox and hand-over'),
  },
];

export default function WhatsAppAutomationTest() {
  const page = servicePageFor(SLUG)!;
  const category = categories.find((c) => c.slug === page.group)!;
  const service = category.services.find((s) => s.anchor === SLUG)!;
  const solution = solutions.find((s) => s.slug === page.solution);
  const related = category.services.filter((s) => s.anchor !== SLUG);
  const official = product.included.items[0]!;

  return (
    <>
      <ProductOpeningFull
        title={service.name}
        intro={page.intro}
        interest={SLUG}
        topic={service.name}
        accent={A}
        tasks={TASKS}
        note={
          solution
            ? { label: 'Solution', text: solution.name, href: `/solutions/${solution.slug}` }
            : undefined
        }
      />

      <div className="alt-bands">
        <StatsBand
          heading={product.highlights.heading}
          items={product.highlights.items}
          accent={A}
        />

        <Band id="jobs" labelledBy="jobs-heading" className="py-24 lg:py-32">
          <LabHead
            id="jobs"
            lead="Answered, reminded,"
            fill="followed up."
            sub={product.features.intro}
            accent={A}
          />
          <div className="mt-14 lg:mt-16">
            <FeatureSplit
              accent={A}
              items={[
                {
                  icon: 'chat',
                  title: feature('Instant replies').title,
                  body: plain(feature('Instant replies').body),
                  scene: <InstantScene />,
                },
                {
                  icon: 'bell',
                  title: feature('Reminders and confirmations').title,
                  body: plain(feature('Reminders and confirmations').body),
                  scene: <RemindersScene />,
                },
                {
                  icon: 'repeat',
                  title: feature('Follow-up sequences').title,
                  body: plain(feature('Follow-up sequences').body),
                  scene: <FollowUpScene />,
                },
              ]}
            />
          </div>
        </Band>

        <section
          id="team"
          aria-labelledby="team-heading"
          className="band band-night on-night py-24 text-white lg:py-32"
        >
          <div className="container-fluid">
            <LabHead
              id="team"
              lead="Paid, handed over,"
              fill="and on the record."
              sub="Payments, hand-overs and the platform underneath — the parts that keep a conversation honest."
              accent={A}
              tone="night"
            />
            <div className="mt-14 lg:mt-16">
              <FeatureSplit
                accent={A}
                tone="night"
                flip
                items={[
                  {
                    icon: 'rupee',
                    title: feature('Payments and receipts').title,
                    body: plain(feature('Payments and receipts').body),
                    scene: <PaymentScene />,
                  },
                  {
                    icon: 'people',
                    title: feature('Team inbox and hand-over').title,
                    body: plain(feature('Team inbox and hand-over').body),
                    scene: <HandoverScene />,
                  },
                  {
                    icon: 'shield',
                    title: 'Official, never grey.',
                    body: official.body,
                    scene: <OfficialScene />,
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <SystemCards
          accent={A}
          head={
            <LabHead
              id="behind"
              lead="The system behind"
              fill="every message."
              sub="It works because it’s wired into the rest of your business, not bolted on."
              accent={A}
            />
          }
          cards={[
            {
              scene: <TriggersCard />,
              title: 'Triggers from your tools',
              body: 'Forms, ad leads, bookings and payments start each flow through your tools’ APIs and webhooks. Nothing is copied by hand.',
              cta: { label: 'API Integrations', href: '/services/api-integrations' },
            },
            {
              scene: <RecordCard />,
              title: 'One record per customer',
              body: 'Every message, hand-over and booking lands on the customer’s record, so anyone on the team can pick it up.',
              cta: { label: 'CRM-Connected Systems', href: '/services/crm-systems' },
            },
            {
              scene: <FlowsCard />,
              title: 'Looked after, every month',
              body: 'Templates, flows and rules changed by message as your business changes, on an Evolve plan.',
              cta: { label: 'Evolve', href: '/services/evolve' },
            },
          ]}
        />

        <Band id="compare" labelledBy="compare-heading" className="py-24 lg:py-32">
          <LabHead
            id="compare"
            lead="Not all WhatsApp tools"
            fill="are built the same."
            sub={product.compare.intro}
            accent={A}
          />
          <div className="mt-14">
            <CompareTable
              label={product.compare.heading}
              options={product.compare.options}
              us={product.compare.us}
            />
          </div>
        </Band>

        <StackMarquee
          head={
            <LabHead
              id="stack"
              lead="Fits in with"
              fill="the tools you already use."
              sub={product.tools.intro}
              accent={A}
            />
          }
          tools={product.tools.groups.flatMap((group) => group.items)}
          cta={{ label: 'Ask about your tools', href: '/contact' }}
        />

        <WaysIn
          eyebrow="Pricing"
          heading={{ lead: 'Two ways in.', fill: 'One system.' }}
          intro={product.price.intro}
          price={product.price}
          accent={A}
        />

        <FaqBand
          eyebrow={service.name}
          title={product.faqs.heading}
          faqs={product.faqs.items}
          interest={SLUG}
          topic={service.name}
          after={
            product.notes?.length ? (
              <div className="flex flex-col gap-2 rounded-2xl border border-line p-5 text-xs leading-relaxed text-ink-3">
                {product.notes.map((note) => (
                  <p key={note}>
                    <Rich text={note} />
                  </p>
                ))}
              </div>
            ) : undefined
          }
        />
      </div>

      <RelatedIndex
        eyebrow={category.name}
        heading={`More in ${category.name}`}
        links={related.map((s) => ({
          name: s.name,
          line: s.summary,
          href: `/services/${s.anchor}`,
        }))}
      />

      <CtaBand
        lead="See what WhatsApp automation"
        fill="can do for you."
        sub="Tell us how your customers reach you today. We’ll map the replies, reminders and follow-ups, and quote it in writing."
        promises={[
          { icon: 'shield', title: 'Official, never grey' },
          { icon: 'key', title: 'Your number, yours to keep' },
          { icon: 'refresh', title: 'Looked after on Evolve' },
        ]}
        interest={SLUG}
        topic={service.name}
        accent={A}
      />
    </>
  );
}

/** A feature's body without its bold marks, for a card's short line. */
function plain(text: string) {
  return text.replace(/\*\*/g, '');
}
