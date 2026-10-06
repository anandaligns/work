import type { Metadata } from 'next';

import { Closing } from '@/components/home/closing';
import { Actions, PageIntro } from '@/components/pages/page-intro';
import { type ZigRow, ZigZag } from '@/components/pages/zigzag';
import { RollLink } from '@/components/ui/roll-link';
import { WebPageStructuredData } from '@/components/seo/web-page-data';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { solutionPageFor } from '@/content/pages';
import { categories, evolve, solutions, startFor, whatsappAbout } from '@/content/site';
import { productFor } from '@/content/products';

/**
 * `/solutions` — every solution: the page intro, then the four goals as alternating rows (each
 * with the services behind it as points and a crop of its product), then the closing.
 */
const SOLUTIONS_TITLE = 'Solutions: Leads, Online Sales, CRM & Care';
const SOLUTIONS_DESCRIPTION =
  'Four ready-made systems with published prices: lead automation, an online store or bookings, a business dashboard and CRM, and website care and hosting.';

export const metadata: Metadata = {
  title: SOLUTIONS_TITLE,
  description: SOLUTIONS_DESCRIPTION,
  alternates: { canonical: '/solutions' },
  openGraph: { title: SOLUTIONS_TITLE, description: SOLUTIONS_DESCRIPTION, url: '/solutions' },
};

const HIGHLIGHT: Record<string, string> = {
  'lead-automation': 'Automation',
  'online-store-and-bookings': 'Bookings',
  'business-dashboard-crm': 'Dashboard & CRM',
  'website-care-hosting': 'Care & Hosting',
};

const services = categories.flatMap((category) => category.services);

export default function SolutionsPage() {
  const rows: ZigRow[] = solutions.map((solution) => {
    const page = solutionPageFor(solution.slug)!;
    const product = productFor(solution.slug)!;
    const behind = page.services.flatMap((anchor) => {
      const service = services.find((s) => s.anchor === anchor);
      if (service)
        return [{ name: service.name, line: service.summary, href: `/services/${anchor}` }];
      if (anchor === evolve.slug)
        return [{ name: evolve.name, line: evolve.summary, href: `/services/${evolve.slug}` }];
      return [];
    });
    const points =
      solution.slug === 'website-care-hosting'
        ? [
            {
              name: 'Move to Better Hosting',
              line: 'Your site moved to managed hosting, tested before the switch.',
              href: `/solutions/${solution.slug}#price`,
            },
            ...behind,
          ]
        : behind;
    return {
      id: solution.slug,
      name: solution.name,
      highlight: HIGHLIGHT[solution.slug] ?? solution.name,
      text: page.intro,
      points,
      cta: { label: `See ${solution.name}`, href: `/solutions/${solution.slug}` },
      visual: { back: product.stage?.back!, front: product.stage?.front?.[0] },
    };
  });

  return (
    <>
      <WebPageStructuredData
        type="CollectionPage"
        name="Solutions"
        description={SOLUTIONS_DESCRIPTION}
        path="/solutions"
        items={solutions.map((solution) => ({
          name: solution.name,
          path: `/solutions/${solution.slug}`,
          description: solutionPageFor(solution.slug)?.description ?? solution.line,
        }))}
      />
      <PageIntro
        eyebrow="Solutions"
        trail={[{ name: 'Solutions', path: '/solutions' }]}
        title={'Tell us the problem.\nWe’ll build the system.'}
        intro="Start from the goal. Each solution puts the right services together for it, priced in writing before we begin."
      >
        <Actions>
          <RollLink href={startFor('solutions')} size="lg">
            Get Started
          </RollLink>
          <RollLink href={whatsappAbout('a solution')} variant="line" size="lg" external>
            Ask on WhatsApp
          </RollLink>
        </Actions>
      </PageIntro>

      <div className="alt-bands">
        <ZigZag id="solutions-list" label="The four solutions" rows={rows} />

        <Closing
          interest="solutions"
          topic="a solution"
          visual={<ConnectScene icon="target" tint="mint" />}
        />
      </div>
    </>
  );
}
