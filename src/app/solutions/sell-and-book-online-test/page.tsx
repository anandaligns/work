import type { Metadata } from 'next';

import { Band } from '@/components/layout/band';
import { FeatureSplit } from '@/components/lab/feature-split';
import {
  AdminScene,
  BookingCard,
  StockScene,
  StoreCard,
  UpdatesCard,
  WeekScene,
} from '@/components/lab/scenes-studio';
import { CentreHero, CtaBand, LabHead, SystemCards } from '@/components/lab/sections';
import { RelatedIndex } from '@/components/pages/product';
import { Rich } from '@/components/pages/product-parts';
import { FaqBand } from '@/components/pages/sections';
import { Engine } from '@/components/solutions/engine';
import { Journey, WaysIn } from '@/components/solutions/parts';
import { product, studio } from '@/content/lab/sell-and-book-online';
import { solutionPageFor, solutionPages } from '@/content/pages';
import { solutions } from '@/content/site';

/**
 * `/solutions/sell-and-book-online-test` — a trial of a new solution page pattern on Sell & Book
 * Online: an opening after Alia's, one customer's evening, the system behind it in three cards,
 * the one system in four tabs, and the product's pieces in Alia-style mockups
 * (`components/lab`). The live page is left as it is. Out of search and the sitemap.
 */
export const metadata: Metadata = {
  title: 'Online Store & Bookings (test)',
  robots: { index: false, follow: false },
};

const SLUG = 'online-store-and-bookings';
const A = studio.accent;

const feature = (label: string) => product.features.items.find((i) => i.label === label)!;
const plain = (text: string) => text.replace(/\*\*/g, '');

export default function SellAndBookOnlineTest() {
  const page = solutionPageFor(SLUG)!;
  const solution = solutions.find((s) => s.slug === SLUG)!;
  const others = solutionPages.filter((other) => other.slug !== SLUG);

  return (
    <>
      <CentreHero
        eyebrow="Solutions"
        title={solution.name}
        intro={page.intro}
        interest={SLUG}
        topic={solution.name}
        accent={A}
        tools={studio.tools}
      />

      <div className="alt-bands">
        <Journey
          eyebrow={studio.journey.eyebrow}
          heading={studio.journey.heading}
          intro={studio.journey.intro}
          steps={studio.journey.steps}
          accent={A}
        />

        <SystemCards
          accent={A}
          head={
            <LabHead
              id="behind"
              lead="The system behind"
              fill="every sale."
              sub="Three of our services, built as one and looked after together."
              accent={A}
            />
          }
          cards={[
            {
              scene: <StoreCard />,
              title: 'Sell online',
              body: 'A store with your pieces, stock that stays true, and payment before anything ships.',
              cta: { label: 'E-commerce Stores', href: '/services/e-commerce-stores' },
            },
            {
              scene: <BookingCard />,
              title: 'Take bookings',
              body: 'Sessions, seats and slots booked and paid online, with only what’s free on offer.',
              cta: {
                label: 'Booking & Payment Workflows',
                href: '/services/booking-payment-workflows',
              },
            },
            {
              scene: <UpdatesCard />,
              title: 'Keep them told',
              body: 'Confirmations, reminders and shipping updates on WhatsApp and email, sent on their own.',
              cta: { label: 'WhatsApp & Email Automation', href: '/services/whatsapp-automation' },
            },
          ]}
        />

        <Band id="system" labelledBy="system-heading" className="py-24 lg:py-32">
          <Engine
            accent={A}
            tabs={studio.engine.tabs}
            head={
              <LabHead
                id="system"
                eyebrow={studio.engine.eyebrow}
                lead={studio.engine.heading.lead}
                fill={studio.engine.heading.fill}
                sub={studio.engine.intro}
                accent={A}
                align="left"
              />
            }
          />
        </Band>

        <section
          id="runs"
          aria-labelledby="runs-heading"
          className="band band-night on-night py-24 text-white lg:py-32"
        >
          <div className="container-fluid">
            <LabHead
              id="runs"
              lead="Everything that sold,"
              fill="in one admin."
              sub="Stock and seats that stay true, and the week at a glance, for you and your team."
              accent={A}
              tone="night"
            />
            <div className="mt-14 lg:mt-16">
              <FeatureSplit
                accent={A}
                tone="night"
                items={[
                  {
                    icon: 'store',
                    title: feature('Stock and seats').title,
                    body: plain(feature('Stock and seats').body),
                    scene: <StockScene />,
                  },
                  {
                    icon: 'dashboard',
                    title: feature('One admin').title,
                    body: plain(feature('One admin').body),
                    scene: <AdminScene />,
                  },
                  {
                    icon: 'calendar',
                    title: feature('Your week').title,
                    body: plain(feature('Your week').body),
                    scene: <WeekScene />,
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <WaysIn
          eyebrow="Pricing"
          heading={{ lead: 'Two ways in.', fill: 'One system.' }}
          intro={product.price.intro}
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
        id="other-solutions"
        eyebrow="Solutions"
        heading="Other solutions"
        off
        links={others.map((other) => {
          const s = solutions.find((x) => x.slug === other.slug)!;
          return { name: s.name, line: s.line, href: `/solutions/${other.slug}` };
        })}
      />

      <CtaBand
        lead="See what selling online"
        fill="can do for you."
        sub="Tell us what you sell or book. We’ll map the store, the bookings and the messages, and quote it in writing."
        promises={[
          { icon: 'receipt', title: 'Published prices' },
          { icon: 'key', title: 'Customers stay yours' },
          { icon: 'layers', title: 'One system' },
        ]}
        interest={SLUG}
        topic={solution.name}
        accent={A}
      />
    </>
  );
}
