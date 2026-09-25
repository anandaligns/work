import type { Metadata } from 'next';

import { LegalPage } from '@/components/pages/legal';
import { contact } from '@/content/site';

/**
 * `/grievance` — how to raise a complaint about our work, this website or your information, and
 * what to put in it. No response times are promised here until the business sets them.
 */
export const metadata: Metadata = {
  title: 'Grievance',
  description: 'How to raise a grievance with Pixel Kinetix, and what happens next.',
  alternates: { canonical: '/grievance' },
};

export default function Grievance() {
  return (
    <LegalPage
      eyebrow="Grievance"
      title="Raise a concern."
      intro="If something about our work, this website or how we handled your information has gone wrong, tell us and it reaches the people who can put it right."
      updated="25 September 2026"
      sections={[
        {
          heading: 'How to raise it',
          body: [
            `Email ${contact.email} with “Grievance” in the subject line, or call ${contact.phone}.`,
          ],
        },
        {
          heading: 'What to include',
          body: [
            'Your name and how to reach you; the project, page or message it concerns; what went wrong, and what you would like us to do; and any documents or screenshots that help.',
          ],
        },
        {
          heading: 'What happens next',
          body: [
            'We confirm we have received it, look into it, and reply with what we found and what we will do about it.',
          ],
        },
        {
          heading: 'Your information',
          body: [
            'For a concern about your personal data, including your rights under India’s Digital Personal Data Protection Act, 2023, see our Privacy Policy.',
          ],
        },
      ]}
    />
  );
}
