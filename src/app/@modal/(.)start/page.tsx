import { StartModal } from '@/components/start/start-route';
import { enquiryLive } from '@/lib/enquiry';

/** Start a project, intercepted: opened from any page, it is a modal over that page. */
type Props = { searchParams: Promise<{ interest?: string | string[] }> };

export default async function StartIntercepted({ searchParams }: Props) {
  const { interest } = await searchParams;
  return (
    <StartModal
      interest={typeof interest === 'string' ? interest : undefined}
      live={enquiryLive()}
    />
  );
}
