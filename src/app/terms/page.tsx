import type { Metadata } from 'next';

import { LegalPage } from '@/components/pages/legal';
import { contact } from '@/content/site';

/** `/terms` — the terms of using this website. Project terms live in each client's agreement. */
export const metadata: Metadata = {
  title: 'Terms',
  description: 'The terms of using the Pixel Kinetix website.',
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Using this website."
      intro="The terms of using this site. The terms of a project are the ones in its written proposal and agreement."
      updated="25 September 2026"
      sections={[
        {
          heading: 'Prices and projects',
          body: [
            'The prices on this site are our published prices, in Indian rupees. The GST position is set out in the answers on the home page.',
            'Your project’s scope, price, timeline and terms are the ones in the written proposal and agreement you sign. Where anything on this site differs from them, the signed documents apply.',
          ],
        },
        {
          heading: 'Concept work',
          body: [
            'The businesses shown at the top of the home page and under Concept work are concept designs, made to show how we work. They are not clients.',
          ],
        },
        {
          heading: 'Our content',
          body: [
            'The words, designs and illustrations on this site, and the Pixel Kinetix name and logo, belong to Pixel Kinetix. Please ask before reusing them.',
          ],
        },
        {
          heading: 'Other sites',
          body: [
            'Links to WhatsApp, Instagram and Google Maps open services run by others, under their own terms.',
          ],
        },
        {
          heading: 'Questions',
          body: [`Email ${contact.email} and we’ll answer.`],
        },
      ]}
    />
  );
}
