import type { Metadata } from 'next';

import { LegalPage } from '@/components/pages/legal';
import { contact } from '@/content/site';

/** `/privacy` — what this site collects (very little) and what happens to a message you send us. */
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Pixel Kinetix handles your information when you visit this site or contact us.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Your information, plainly."
      intro="What this website collects, what happens when you contact us, and what you can ask us to do with it."
      updated="25 September 2026"
      sections={[
        {
          heading: 'What this website collects',
          body: [
            'This website has no forms, no accounts and no advertising trackers, and it sets no cookies of its own.',
            'Like any website, the service that hosts it keeps short-lived technical logs, such as IP addresses and browser types, to keep the site running and secure.',
          ],
        },
        {
          heading: 'When you contact us',
          body: [
            'If you message us on WhatsApp, call or email, we receive what you send: usually your name, your number or email address, and what you tell us about your business.',
            'We use it to reply to you and, if we work together, to deliver your project. We do not sell it, and we do not share it with anyone for marketing.',
            'WhatsApp messages also pass through WhatsApp, which handles them under its own privacy policy.',
          ],
        },
        {
          heading: 'How long we keep it',
          body: [
            'We keep an enquiry for as long as it is useful to your enquiry or to our work together, and delete it sooner if you ask.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'Under India’s Digital Personal Data Protection Act, 2023, you can ask to see the information we hold about you, have it corrected, or have it erased.',
            `To ask, or to raise a concern, email ${contact.email}.`,
          ],
        },
        {
          heading: 'Changes to this page',
          body: [
            'If we add an enquiry form or analytics to this website, this page will be updated to say what they collect before they go live.',
          ],
        },
      ]}
    />
  );
}
