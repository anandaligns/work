import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Closing } from '@/components/home/closing';
import { ProductBody, ProductOpening, RelatedIndex } from '@/components/pages/product';
import { PageStructuredData } from '@/components/seo/page-structured-data';
import { SOLUTION_ICONS } from '@/components/ui/icon';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { isLive, solutionPageFor, solutionPages } from '@/content/pages';
import { categories, evolve, solutions } from '@/content/site';
import { productFor } from '@/content/products';

/**
 * `/solutions/[slug]` — the four solutions, each a goal with the services put together for it,
 * presented as products like the services (`content/products/`): the page's opening with the
 * product at work, then the product's sections with its ways in as the packages, the services
 * behind it, the other solutions and its closing.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return solutionPages.map((page) => ({ slug: page.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = solutionPageFor(slug);
  if (!page) return {};
  const path = `/solutions/${slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { title: page.title, description: page.description, url: path },
    robots: isLive(slug) ? undefined : { index: false, follow: true },
  };
}

const services = categories.flatMap((category) => category.services);

export default async function SolutionPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = solutionPageFor(slug);
  const solution = solutions.find((s) => s.slug === slug);
  const product = productFor(slug);
  if (!page || !solution || !product) notFound();
  const path = `/solutions/${slug}`;
  const others = solutionPages.filter((other) => other.slug !== slug);

  return (
    <>
      <PageStructuredData
        name={solution.name}
        description={page.description}
        path={path}
        crumbs={[{ name: 'Solutions', path: '/#solutions' }]}
        faqs={product.faqs.items}
        from={page.from}
        monthly={page.monthly}
        serviceType={page.keyword}
      />
      <ProductOpening
        page={product}
        eyebrow="Solutions"
        title={solution.name}
        intro={page.intro}
        interest={slug}
        topic={solution.name}
      />

      <ProductBody page={product} interest={slug} eyebrow={solution.name} tint={page.tint} />

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
        interest={slug}
        topic={solution.name}
        visual={<ConnectScene icon={SOLUTION_ICONS[slug] ?? 'layers'} tint={page.tint} />}
      />
    </>
  );
}
