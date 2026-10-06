import type { Metadata } from 'next';

import { StartPage } from '@/components/start/start-route';
import { enquiryLive } from '@/lib/enquiry';

/**
 * `/start` — Start a project, at its own address: the four-step flow as the whole page. Every Get
 * Started on the site opens the same flow as a modal over the page it was pressed on
 * (`app/@modal/(.)start`).
 */
export const metadata: Metadata = {
  title: 'Start a Project',
  description:
    'Tell Pixel Kinetix what you want to build in four short steps. A fixed price in writing before we build, and a reply within one working day.',
  alternates: { canonical: '/start' },
};

type Props = { searchParams: Promise<{ interest?: string | string[] }> };

export default async function Start({ searchParams }: Props) {
  const { interest } = await searchParams;
  return (
    <StartPage
      interest={typeof interest === 'string' ? interest : undefined}
      live={enquiryLive()}
    />
  );
}
