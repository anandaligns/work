import type { Metadata } from 'next';

import { Closing } from '@/components/home/closing';
import { Band } from '@/components/layout/band';
import { Card, CardBand } from '@/components/pages/cards';
import { PageIntro } from '@/components/pages/page-intro';
import type { IconName } from '@/components/ui/icon';

/**
 * `/about` — what Pixel Kinetix believes, what it is, and who you work with. The founder's bio and
 * photo, and the company's registration details, join this page when they are ready; nothing
 * stands in for them meanwhile.
 */
export const metadata: Metadata = {
  title: 'About',
  description:
    'Pixel Kinetix is a founder-led digital systems company in Bangalore. We design and engineer websites, business software and automation as one connected system.',
  alternates: { canonical: '/about' },
};

const PRINCIPLES: { icon: IconName; name: string; line: string }[] = [
  {
    icon: 'search',
    name: 'Understand before building',
    line: 'We learn how the business actually runs before we choose any technology.',
  },
  {
    icon: 'target',
    name: 'Build only what earns its place',
    line: 'Every screen, integration and automation has a job to do, or it does not get built.',
  },
  {
    icon: 'layers',
    name: 'One system, not five tools',
    line: 'Your website, WhatsApp, payments and data work together, not side by side.',
  },
  {
    icon: 'refresh',
    name: 'Automate what repeats',
    line: 'The replies, reminders and follow-ups nobody should have to type.',
  },
  {
    icon: 'spark',
    name: 'Keep improving',
    line: 'Launch is the start. Evolve keeps the system getting better as the business grows.',
  },
];

export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title={'Technology should fit the business.\nNot the other way around.'}
        intro="Pixel Kinetix is a digital systems company. We design and engineer websites, business software and automation as one connected system."
      />

      <Band id="manifesto" labelledBy="manifesto-heading" className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
              <span className="size-1.5 bg-ink" />
              What we believe
            </p>
            <h2
              id="manifesto-heading"
              className="mt-5 text-h2 tracking-[var(--tracking-heading)] text-ink"
            >
              More technology is rarely the answer.
            </h2>
          </div>
          <div data-reveal="" className="flex flex-col gap-5 text-lead text-ink-2">
            <p>
              Most businesses don’t need more technology. They need the technology they have to work
              together. A website that fills the calendar. A payment that updates the books. An
              enquiry that never waits for a reply.
            </p>
            <p>
              So we start by learning how a business actually runs. Then we engineer the system
              around it, and keep improving it as the business grows.
            </p>
          </div>
        </div>
      </Band>

      <Band id="founder" labelledBy="founder-heading" className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
              <span className="size-1.5 bg-ink" />
              Who you work with
            </p>
            <h2
              id="founder-heading"
              className="mt-5 text-h2 tracking-[var(--tracking-heading)] text-ink"
            >
              Founder-led, from first message to launch.
            </h2>
          </div>
          <div data-reveal="" className="flex flex-col gap-5 text-lead text-ink-2">
            <p>
              You work directly with the engineer who designs your system:{' '}
              <span className="font-medium text-ink">
                Anand M, Founder &amp; Principal Engineer.
              </span>
            </p>
            <p>
              When a project needs extra hands, trusted specialists join, working to our standards,
              with one point of responsibility: us.
            </p>
          </div>
        </div>
      </Band>

      <CardBand id="principles" eyebrow="How we work" title="Five principles behind every build.">
        {PRINCIPLES.map((principle, i) => (
          <Card
            key={principle.name}
            icon={principle.icon}
            name={principle.name}
            line={principle.line}
            index={i}
          />
        ))}
      </CardBand>

      <Closing />
    </>
  );
}
