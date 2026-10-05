import type { Metadata } from 'next';

import { Closing } from '@/components/home/closing';
import { ProductBody, ProductOpening, RelatedIndex } from '@/components/pages/product';
import { SOLUTION_ICONS } from '@/components/ui/icon';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { solutionPageFor, solutionPages } from '@/content/pages';
import { productFor } from '@/content/products';
import { categories, evolve, solutions } from '@/content/site';

/**
 * `/solutions/never-miss-a-lead-v1` — Lead Automation as the live page stood before the
 * redesign (the product page every solution shared, from `solutions/[slug]`), kept to compare
 * against. The live `/solutions/lead-automation` is now a page of its own. Out of search and the
 * sitemap.
 */
export const metadata: Metadata = {
  title: 'Lead Automation (v1)',
  robots: { index: false, follow: false },
};

const SLUG = 'lead-automation';
const services = categories.flatMap((category) => category.services);

export default function NeverMissALeadV1() {
  const page = solutionPageFor(SLUG)!;
  const solution = solutions.find((s) => s.slug === SLUG)!;
  const product = productFor(SLUG)!;
  const others = solutionPages.filter((other) => other.slug !== SLUG);

  return (
    <>
      <ProductOpening
        page={product}
        eyebrow="Solutions"
        title={solution.name}
        intro={page.intro}
        interest={SLUG}
        topic={solution.name}
      />

      <ProductBody
        page={product}
        interest={SLUG}
        eyebrow={solution.name}
        tint={page.tint}
        compare
      />

      <RelatedIndex
        id="built-from"
        eyebrow={solution.name}
        heading="The services behind it"
        off
        links={page.services.flatMap((anchor) => {
          const service = services.find((s) => s.anchor === anchor);
          if (service)
            return [{ name: service.name, line: service.summary, href: `/services/${anchor}` }];
          if (anchor === evolve.slug)
            return [{ name: evolve.name, line: evolve.summary, href: `/services/${evolve.slug}` }];
          return [];
        })}
      />

      <RelatedIndex
        id="other-solutions"
        eyebrow="Solutions"
        heading="Other solutions"
        links={others.map((other) => {
          const s = solutions.find((x) => x.slug === other.slug)!;
          return { name: s.name, line: s.line, href: `/solutions/${other.slug}` };
        })}
      />

      <Closing
        heading={page.closing}
        interest={SLUG}
        topic={solution.name}
        visual={<ConnectScene icon={SOLUTION_ICONS[SLUG] ?? 'layers'} tint={page.tint} />}
      />
    </>
  );
}
