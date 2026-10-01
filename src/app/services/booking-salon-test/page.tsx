import type { Metadata } from 'next';

import { Closing } from '@/components/home/closing';
import { ProductBody, ProductOpeningFull, RelatedIndex } from '@/components/pages/product';
import { iconFor } from '@/components/ui/icon';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { GROUP_TINT, servicePageFor } from '@/content/pages';
import { categories, solutions } from '@/content/site';
import salon, { tasks } from '@/content/lab/booking-salon';

/**
 * `/services/booking-salon-test` — a trial of the full-width dark opening on Booking & Payment
 * Workflows, with the salon example. The rest of the page is the service page as it is. Kept out
 * of search and the sitemap until the opening is approved for every product page.
 */
export const metadata: Metadata = {
  title: 'Booking & Payment Workflows (test)',
  robots: { index: false, follow: false },
};

const SLUG = 'booking-payment-workflows';

export default function BookingSalonTest() {
  const page = servicePageFor(SLUG)!;
  const category = categories.find((c) => c.slug === page.group)!;
  const service = category.services.find((s) => s.anchor === SLUG)!;
  const tint = GROUP_TINT[page.group];
  const groupPath = `/services/${category.slug}`;
  const solution = solutions.find((s) => s.slug === page.solution);
  const related = category.services.filter((s) => s.anchor !== SLUG);

  return (
    <>
      <ProductOpeningFull
        title={service.name}
        intro={page.intro}
        interest={SLUG}
        topic={service.name}
        accent={salon.accent}
        tasks={tasks}
        note={
          solution
            ? { label: 'Solution', text: solution.name, href: `/solutions/${solution.slug}` }
            : undefined
        }
      />

      <ProductBody page={salon} interest={SLUG} eyebrow={service.name} tint={tint} />

      <RelatedIndex
        eyebrow={category.name}
        heading={`More in ${category.name}`}
        off
        links={[
          ...related.map((s) => ({ name: s.name, line: s.summary, href: `/services/${s.anchor}` })),
          ...(solution
            ? [
                {
                  name: `Solution: ${solution.name}`,
                  line: solution.line,
                  href: `/solutions/${solution.slug}`,
                },
              ]
            : []),
          { name: `All of ${category.name}`, line: category.line, href: groupPath },
        ]}
      />

      <Closing
        heading={page.closing}
        interest={SLUG}
        topic={service.name}
        visual={<ConnectScene icon={iconFor(SLUG)} tint={tint} />}
      />
    </>
  );
}
