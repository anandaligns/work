import type { Metadata } from 'next';
import Link from 'next/link';

import { CopyChips } from '@/components/contact/copy-chips';
import { ContactForm } from '@/components/contact/contact-form';
import { Band } from '@/components/layout/band';
import { Card, CardBand } from '@/components/pages/cards';
import { Actions, PageIntro } from '@/components/pages/page-intro';
import { FaqBand } from '@/components/pages/sections';
import { Icon } from '@/components/ui/icon';
import { RollLink } from '@/components/ui/roll-link';
import { WebPageStructuredData } from '@/components/seo/web-page-data';
import { contact, startFor } from '@/content/site';
import { enquiryLive } from '@/lib/enquiry';

/**
 * `/contact` — for anything. Under the headline, the three quickest ways in: email first in Kinetic
 * Orange, WhatsApp in its own green and Call Now with its phone ringing; under them the address and
 * the number as beUI's expandable chips, each opening onto a copy action. Then the general form,
 * "Send us a message", beside what to expect and the way into Start a project (every Get Started on
 * the site opens that); the ways to reach us; and three questions.
 *
 * Until the form has somewhere to send to (`enquiryLive`), it sends by WhatsApp, already written.
 */
const live = enquiryLive();

const CONTACT_DESCRIPTION = `Send Pixel Kinetix a message, chat on WhatsApp or call ${contact.phone}. Kalyan Nagar, Bangalore.`;

export const metadata: Metadata = {
  title: 'Contact Pixel Kinetix, Bangalore',
  description: CONTACT_DESCRIPTION,
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

const REPLIES = [
  'A person reads every message',
  'A reply within one working day',
  'Honest advice, even if we’re not the fit',
];

export default function Contact() {
  return (
    <>
      <WebPageStructuredData
        type="ContactPage"
        name="Contact Pixel Kinetix"
        description={CONTACT_DESCRIPTION}
        path="/contact"
      />
      <PageIntro
        eyebrow="Contact"
        trail={[{ name: 'Contact', path: '/contact' }]}
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
        <CopyChips
          items={[
            { label: contact.email, value: contact.email, name: 'email address' },
            { label: contact.phone, value: contact.phone, name: 'phone number' },
          ]}
        />
      </PageIntro>

      <div className="alt-bands">
        <Band id="form" labelledBy="form-heading" className="py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div className="flex flex-col">
              <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
                <span className="size-1.5 bg-ink" />
                Message
              </p>
              <h2
                id="form-heading"
                className="mt-5 text-h2 tracking-[var(--tracking-heading)] text-ink"
              >
                Send us a message
              </h2>
              <p className="mt-5 max-w-md text-body text-ink-2">
                A question, a quote, help with a site you already have — write to us here and a
                person replies within one working day.
              </p>
              <ul className="mt-8 flex flex-col gap-3 text-[0.9375rem] text-ink">
                {REPLIES.map((reply) => (
                  <li key={reply} className="flex items-center gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-fill text-ink">
                      <Icon name="check" size={12} strokeWidth={2.4} />
                    </span>
                    {reply}
                  </li>
                ))}
              </ul>
              <Link
                href={startFor('contact')}
                className="contact-start group mt-10 flex items-center gap-4 rounded-[1.25rem] p-5 text-white lg:mt-auto"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-kinetic">
                  <Icon name="rocket" size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Starting a project?</span>
                  <span className="block text-sm text-white/65">
                    Four short steps, and a fuller first reply.
                  </span>
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrow" size={15} />
                </span>
              </Link>
            </div>
            <div className="rounded-[var(--radius-panel)] border border-line bg-white p-6 shadow-[0_30px_60px_-44px_rgb(11_13_18/0.35)] sm:p-9">
              <ContactForm live={live} />
            </div>
          </div>
        </Band>

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

        <FaqBand eyebrow="Contact" title="Questions" faqs={FAQS} />
      </div>
    </>
  );
}
