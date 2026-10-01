import type { Metadata } from 'next';

import { Closing } from '@/components/home/closing';
import { Actions, PageIntro } from '@/components/pages/page-intro';
import { type ZigRow, ZigZag } from '@/components/pages/zigzag';
import { RollLink } from '@/components/ui/roll-link';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { solutionPageFor } from '@/content/pages';
import { categories, evolve, solutions, startFor, whatsappAbout } from '@/content/site';
import { productFor } from '@/content/products';

/**
 * `/solutions` — every solution: the page intro, then the four goals as alternating rows (each
 * with the services behind it as points and a crop of its product), then the closing.
 */
export const metadata: Metadata = {
  title: 'Solutions: Leads, Selling Online, One System, Care',
  description:
    'Four goals, each met with the services put together for it: never miss a lead, sell and book online, run the business in one place, and keep it improving.',
  alternates: { canonical: '/solutions' },
  openGraph: { title: 'Solutions: Leads, Selling Online, One System, Care', url: '/solutions' },
};

const HIGHLIGHT: Record<string, string> = {
  'never-miss-a-lead': 'a Lead',
  'sell-and-book-online': 'Book Online',
  'run-it-in-one-place': 'One Place',
  'keep-it-improving': 'Improving',
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
      solution.slug === 'keep-it-improving'
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
      accent: product.accent,
      visual: {
        back: product.stage?.back!,
        backAccent: product.accent,
        front: product.stage?.front?.[0],
        frontAccent: product.accent,
      },
    };
  });

  return (
    <>
      <PageIntro
        eyebrow="Solutions"
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

      <ZigZag id="solutions-list" label="The four solutions" rows={rows} />

      <Closing
        interest="solutions"
        topic="a solution"
        visual={<ConnectScene icon="target" tint="mint" />}
      />
    </>
  );
}
