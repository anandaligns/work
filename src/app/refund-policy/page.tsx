import type { Metadata } from 'next';

import { LegalPage } from '@/components/pages/legal';
import { contact } from '@/content/site';

/**
 * `/refund-policy` — how payments, the warranty and Evolve's notice work, as the site already
 * publishes them (the answers in `catalogue.json`), and that each project's signed agreement
 * decides its refunds. Nothing here goes further than those published terms.
 */
export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'How payments, the warranty and cancellations work at Pixel Kinetix.',
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicy() {
  return (
    <LegalPage
      eyebrow="Refund Policy"
      title="Payments and refunds, plainly."
      intro="How paying for a project works, what the warranty puts right, and how to ask about a refund."
      updated="25 September 2026"
      sections={[
        {
          heading: 'Your agreement comes first',
          body: [
            'The refund terms for a project are the ones in its written proposal and agreement. Where anything on this page differs from them, the signed documents apply.',
          ],
        },
        {
          heading: 'How payment works',
          body: [
            'Projects are paid in stages: an advance to start, and the rest at the milestones in your proposal. Work starts once the advance clears, and the site goes live on your domain once the final payment clears.',
          ],
        },
        {
          heading: 'The warranty',
          body: [
            'Every build comes with a warranty: 30 days from launch, and 45 days for Store and Custom. It covers defects in what we built. It does not cover changes you ask for later, edits you make yourself, or a third-party service breaking.',
          ],
        },
        {
          heading: 'Evolve plans',
          body: [
            'Evolve plans run for three months minimum, then month to month. Cancel with 30 days’ notice. You own your domain and your content, always, and get a full export within 10 working days if you leave.',
          ],
        },
        {
          heading: 'Fees paid to others',
          body: [
            'Domain registration and renewal, third-party subscriptions and WhatsApp message charges from Meta are paid to those providers, and follow their own refund terms.',
          ],
        },
        {
          heading: 'Asking about a refund',
          body: [
            `Email ${contact.email} or call ${contact.phone} with your project’s name and what you’d like refunded, and we’ll reply with where it stands under your agreement.`,
          ],
        },
      ]}
    />
  );
}
