import type { Metadata } from 'next';

import { EnquiryForm } from '@/components/contact/enquiry-form';
import { NextSteps } from '@/components/contact/next-steps';
import { Band } from '@/components/layout/band';
import { Card, CardBand } from '@/components/pages/cards';
import { Actions, PageIntro } from '@/components/pages/page-intro';
import { Questions, Section } from '@/components/pages/sections';
import { Icon } from '@/components/ui/icon';
import { RollLink } from '@/components/ui/roll-link';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { contact } from '@/content/site';
import { ENQUIRY_AUTOMATION_LIVE, enquiryLive } from '@/lib/enquiry';

/**
 * `/contact` — where every "Get Started" leads. Under the headline, the three quickest ways in:
 * email first in Kinetic Blue, WhatsApp in its own green and Call Now with its phone ringing.
 * Then the enquiry form, "Tell us about it", with what happens next beside it; the ways to reach
 * us; and three questions.
 *
 * The form shows only once it has somewhere to send to (`enquiryLive`). Until then the page keeps
 * the four things to put in a first message, so nothing on it goes nowhere.
 */
const live = enquiryLive();

export const metadata: Metadata = {
  title: 'Contact: Start a Project in Bangalore',
  description: `Tell Pixel Kinetix what’s slowing your business down. ${
    live ? 'Fill in a short form, message us on WhatsApp or call' : 'Message us on WhatsApp or call'
  } ${contact.phone}. Kalyan Nagar, Bangalore.`,
  alternates: { canonical: '/contact' },
};

const FAQS = [
  {
    question: 'Is the first conversation free?',
    answer:
      'Yes. The first conversation is free. For bigger projects, a System Blueprint is the paid next step.',
  },
  {
    question: 'What should I put in my first message?',
    answer:
      'What your business does, what’s slowing it down or what you want to build, the tools you use today, and when you’d like it working.',
  },
  {
    question: 'Where are you based?',
    answer: 'Kalyan Nagar, HRBR Layout, Bangalore. We work with businesses across India.',
  },
];

const ASKS = [
  'What your business does, and where',
  'What’s slowing it down, or what you want to build',
  'The tools you use today, if any',
  'When you’d like it working',
];

export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title={'Tell us what’s slowing\nyour business down.'}
        intro="Mail us, message us on WhatsApp or call. We’ll reply with a clear next step, and tell you honestly if we’re the right fit."
      >
        <Actions>
          <RollLink
            href={`mailto:${contact.email}`}
            variant="kinetic"
            size="lg"
            arrow={false}
            className="max-sm:w-full max-sm:max-w-[18rem]"
            icon={<Icon name="mail" size={19} strokeWidth={1.8} />}
          >
            Mail us
          </RollLink>
          <RollLink
            href={contact.whatsappHref}
            variant="whatsapp"
            size="lg"
            arrow={false}
            className="max-sm:w-full max-sm:max-w-[18rem]"
            external
            icon={<Icon name="whatsapp" size={19} strokeWidth={1.8} />}
          >
            Chat on WhatsApp
          </RollLink>
          <RollLink
            href={contact.phoneHref}
            size="lg"
            arrow={false}
            className="max-sm:w-full max-sm:max-w-[18rem]"
            shake
            icon={<Icon name="phone" size={18} strokeWidth={1.8} />}
          >
            Call Now
          </RollLink>
        </Actions>
      </PageIntro>

      {live ? (
        <Band id="form" labelledBy="form-heading" className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
            <div>
              <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
                <span className="size-1.5 bg-ink" />
                Enquiry
              </p>
              <h2
                id="form-heading"
                className="mt-5 text-h2 tracking-[var(--tracking-heading)] text-ink"
              >
                Tell us about it
              </h2>
              <div className="mt-10 rounded-[var(--radius-panel)] border border-line bg-white p-6 sm:p-9">
                <EnquiryForm />
              </div>
            </div>
            <div className="flex flex-col gap-10 lg:pt-24">
              <NextSteps />
              <figure>
                <ConnectScene icon="file" result={{ icon: 'chat', tone: 'white' }} />
                {ENQUIRY_AUTOMATION_LIVE ? (
                  <figcaption className="mt-3 text-sm text-ink-2">
                    This form runs on our own Connected Website.
                  </figcaption>
                ) : null}
              </figure>
            </div>
          </div>
        </Band>
      ) : null}

      <CardBand id="reach" eyebrow="Reach us" title="Whichever suits you." columns={4}>
        <Card
          icon="whatsapp"
          name="WhatsApp"
          line="The quickest way to start. Tell us about the business in a message."
          href={contact.whatsappHref}
          external
          index={0}
        />
        <Card icon="phone" name="Call" line={contact.phone} href={contact.phoneHref} index={1} />
        <Card
          icon="mail"
          name="Email"
          line={contact.email}
          href={`mailto:${contact.email}`}
          index={2}
        />
        <Card
          icon="pin"
          name="Visit"
          line={contact.locality.split(' · ').join(', ')}
          href={contact.mapsHref}
          external
          index={3}
        />
      </CardBand>

      {live ? null : (
        <Band id="first-message" labelledBy="first-message-heading" className="py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
                <span className="size-1.5 bg-ink" />
                Your first message
              </p>
              <h2
                id="first-message-heading"
                className="mt-5 text-h2 tracking-[var(--tracking-heading)] text-ink"
              >
                Four things help us reply with a real next step.
              </h2>
            </div>
            <ul data-reveal="" className="flex flex-col divide-y divide-line border-y border-line">
              {ASKS.map((ask, i) => (
                <li key={ask} className="flex items-center gap-5 py-5 text-lead text-ink">
                  <span className="font-tech text-xs text-ink-2">0{i + 1}</span>
                  {ask}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-12 inline-flex items-center gap-2 text-sm text-ink-2">
            <Icon name="check" size={14} />
            Not sure what you need? That’s fine. Tell us the problem and we’ll map it with you.
          </p>
        </Band>
      )}

      <Section id="questions" eyebrow="Contact" title="Questions">
        <Questions faqs={FAQS} />
      </Section>
    </>
  );
}
