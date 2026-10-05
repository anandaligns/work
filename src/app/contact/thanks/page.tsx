import type { Metadata } from 'next';

import { NextSteps } from '@/components/contact/next-steps';
import { ThanksHeading } from '@/components/contact/thanks-heading';
import { Band } from '@/components/layout/band';
import { RollLink } from '@/components/ui/roll-link';
import { ENQUIRY_AUTOMATION_LIVE } from '@/lib/enquiry';

/**
 * `/contact/thanks` — where the form lands. It only makes sense after the form, so it stays out of
 * search (`noindex`) and out of the sitemap. It says the message is with us — and that a copy is
 * on its way only once the automation sends one — then what happens next, and two ways on.
 */
export const metadata: Metadata = {
  title: 'Thanks',
  robots: { index: false, follow: false },
};

export default function Thanks() {
  return (
    <>
      <section aria-labelledby="page-heading" className="pt-28 pb-16 sm:pt-32 lg:pb-24">
        <div className="container-fluid">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5">
              <span className="size-1.5 rounded-full bg-signal-green" />
              Message sent
            </p>
            <ThanksHeading />
            <p className="mx-auto mt-5 max-w-xl text-lead text-ink-2">
              {ENQUIRY_AUTOMATION_LIVE
                ? 'Your message is with us, and a copy is on its way to your email and WhatsApp.'
                : 'Your message is with us.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <RollLink href="/" size="lg">
                Back to home
              </RollLink>
              <RollLink href="/#process" variant="kinetic" size="lg">
                See how a project runs
              </RollLink>
            </div>
          </div>
        </div>
      </section>
      <Band className="py-20 lg:py-28">
        <div className="mx-auto max-w-xl">
          <NextSteps headingLevel="h2" />
        </div>
      </Band>
    </>
  );
}
