import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Closing } from '@/components/home/closing';
import { FadePanel, MockPanel, MockStage } from '@/components/lab/mock-parts';
import { SERVICE_MOCKS } from '@/components/lab/service-mocks';
import { EvolvePage } from '@/components/evolve/evolve-page';
import { ProductBody, ProductOpening } from '@/components/pages/product';
import { Related } from '@/components/pages/related';
import { ServiceOpening } from '@/components/pages/service-stage';
import { businessColour, stageFor } from '@/components/pages/service-stages';
import { PageStructuredData } from '@/components/seo/page-structured-data';
import { PageFan } from '@/components/showcase/cards';
import { ShowcasePanel } from '@/components/solutions/showcase';
import { iconFor } from '@/components/ui/icon';
import { ConnectScene } from '@/components/visuals/connect-scene';
import {
  evolvePage,
  GROUP_TINT,
  isLive,
  type ServicePage,
  servicePageFor,
  servicePages,
  solutionPageFor,
} from '@/content/pages';
import { SOLUTION_CONTENT } from '@/content/lab/solutions';
import { categories, evolve, solutions } from '@/content/site';
import { productFor } from '@/content/products';

/**
 * `/services/[slug]` — the fifteen services and Evolve. A service is presented as a product
 * (`content/products/`): the page's opening with the product at work, then the product's sections,
 * the related cards and the closing on its Connect scene. Evolve, a care plan rather than a
 * service, has its own page (`components/evolve/`). The three group pages are gone: their
 * addresses lead to their group on `/services` (`next.config.ts`).
 */
/**
 * A service page's own mockups, on its tint, when it has them (`SERVICE_MOCKS`): the panel in the
 * page's accent, the business's screens inside it in the business's colour.
 */
function mocksFor(slug: string, accent: string) {
  const set = SERVICE_MOCKS[slug];
  if (!set) return {};
  const How = set.how;
  const HowBox = set.howBox;
  const Included = set.included;
  const business = businessColour(slug);
  /** The split sections' panels start as strong as the solutions' (their home-page tints). */
  const light = `color-mix(in srgb, ${accent} 12%, white)`;
  return {
    included: Included ? (
      <ShowcasePanel className="lg:aspect-[900/780]">
        <FadePanel accent={accent} business={business} light={light}>
          <Included />
        </FadePanel>
      </ShowcasePanel>
    ) : undefined,
    features: set.features.map((Mock, i) => (
      <MockPanel key={i} accent={accent} business={business}>
        <Mock />
      </MockPanel>
    )),
    how: HowBox ? (
      <ShowcasePanel className="lg:aspect-[4/3]">
        <FadePanel accent={accent} business={business} light={light}>
          <HowBox />
        </FadePanel>
      </ShowcasePanel>
    ) : (
      <MockStage accent={accent} business={business} className="h-[20rem] max-w-4xl sm:h-[24rem]">
        <How />
      </MockStage>
    ),
    howSplit: Boolean(HowBox),
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [...servicePages.map((page) => page.slug), evolve.slug].map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

const pageFor = (slug: string) => (slug === evolve.slug ? evolvePage : servicePageFor(slug));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pageFor(slug);
  if (!page) return {};
  const path = `/services/${slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { title: page.title, description: page.description, url: path },
    robots: isLive(slug) ? undefined : { index: false, follow: true },
  };
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  if (slug === evolve.slug) return <EvolvePage />;
  const service = servicePageFor(slug);
  if (service) return <ServiceView page={service} />;
  notFound();
}

// --- a service -------------------------------------------------------------------------------------

function ServiceView({ page }: { page: ServicePage }) {
  const category = categories.find((c) => c.slug === page.group)!;
  const service = category.services.find((s) => s.anchor === page.slug)!;
  const product = productFor(page.slug)!;
  const tint = GROUP_TINT[page.group];
  const path = `/services/${page.slug}`;
  const trail = [
    { name: 'Services', path: '/services' },
    { name: service.name, path },
  ];
  const solution = solutions.find((s) => s.slug === page.solution);
  const solutionPage = solutionPageFor(page.solution);
  const related = category.services.filter((s) => s.anchor !== page.slug);
  const stage = stageFor(page.slug);

  return (
    <>
      <PageStructuredData
        name={service.name}
        description={page.description}
        path={path}
        crumbs={[{ name: 'Services', path: '/services' }]}
        faqs={product.faqs.items}
        from={page.from}
        serviceType={page.keyword}
      />
      {stage ? (
        <ServiceOpening
          eyebrow={category.name}
          title={service.name}
          intro={page.intro}
          interest={page.slug}
          topic={service.name}
          stage={stage}
          trail={trail}
        />
      ) : (
        <ProductOpening
          page={product}
          eyebrow={category.name}
          title={service.name}
          intro={page.intro}
          interest={page.slug}
          topic={service.name}
          trail={trail}
        />
      )}

      <ProductBody
        page={product}
        interest={page.slug}
        eyebrow={service.name}
        tint={tint}
        next={mocksFor(page.slug, product.accent)}
        view={<PageFan slug={page.slug} name={service.name} accent={product.accent} />}
        tail={
          <>
            <Related
              eyebrow={category.name}
              heading={`More in ${category.name}`}
              all={{ label: 'All services', href: `/services#${category.slug}` }}
              items={related.map((s) => ({
                slug: s.anchor,
                kind: category.name,
                name: s.name,
                line: s.summary ?? '',
                href: `/services/${s.anchor}`,
                accent: productFor(s.anchor)?.accent ?? product.accent,
              }))}
              feature={
                solution && solutionPage
                  ? {
                      slug: solution.slug,
                      kind: 'Part of a solution',
                      name: solution.name,
                      line: solution.line,
                      href: `/solutions/${solution.slug}`,
                      accent: SOLUTION_CONTENT[solution.slug]?.accent ?? product.accent,
                    }
                  : undefined
              }
            />

            <Closing
              heading={page.closing}
              interest={page.slug}
              topic={service.name}
              visual={
                <ConnectScene
                  icon={iconFor(page.slug)}
                  tint={tint}
                  accent={product.accent}
                  accentDark={product.accentDark}
                />
              }
            />
          </>
        }
      />
    </>
  );
}
