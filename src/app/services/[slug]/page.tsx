import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Closing } from '@/components/home/closing';
import { FadePanel, MockPanel, MockStage } from '@/components/lab/mock-parts';
import { SERVICE_MOCKS } from '@/components/lab/service-mocks';
import { Pricing } from '@/components/home/pricing';
import { Card, CardBand } from '@/components/pages/cards';
import { FlowStrip } from '@/components/pages/flow-strip';
import { Actions, PageIntro } from '@/components/pages/page-intro';
import type { Crumb } from '@/components/pages/page-trail';
import { BuildCards, FaqBand, HeroWell, Prices, Section } from '@/components/pages/sections';
import { ProductBody, ProductOpening, RelatedIndex } from '@/components/pages/product';
import { ServiceOpening } from '@/components/pages/service-stage';
import { businessColour, stageFor } from '@/components/pages/service-stages';
import { PageStructuredData } from '@/components/seo/page-structured-data';
import { ShowcasePanel } from '@/components/solutions/showcase';
import { type IconName, iconFor } from '@/components/ui/icon';
import { RollLink } from '@/components/ui/roll-link';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { GroupHeroScene } from '@/components/visuals/page-scenes';
import { IsoView } from '@/components/visuals/iso-views';
import {
  evolvePage,
  GROUP_TINT,
  type GroupPage,
  groupPageFor,
  groupPages,
  isLive,
  type ServicePage,
  servicePageFor,
  servicePages,
  solutionPageFor,
} from '@/content/pages';
import { categories, evolve, solutions, startFor, whatsappAbout } from '@/content/site';
import { productFor } from '@/content/products';

/**
 * `/services/[slug]` — the three service groups, their fifteen services, and Evolve. A group page
 * is put together from the home page's sections: the intro, its scene in a tinted well, its
 * services, prices and questions. A service and Evolve are presented as products
 * (`content/products/`): the page's opening with the product at work, then the product's sections,
 * the related index and the closing on its Connect scene.
 */
const GROUP_GLYPH: Record<string, IconName> = {
  'digital-experiences': 'device',
  'business-systems': 'database',
  'automation-ai': 'spark',
};

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
  return [
    ...groupPages.map((page) => page.slug),
    ...servicePages.map((page) => page.slug),
    evolve.slug,
  ].map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

const pageFor = (slug: string) =>
  slug === evolve.slug ? evolvePage : (groupPageFor(slug) ?? servicePageFor(slug));

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
  if (slug === evolve.slug) return <EvolveView />;
  const group = groupPageFor(slug);
  if (group) return <GroupView page={group} />;
  const service = servicePageFor(slug);
  if (service) return <ServiceView page={service} />;
  notFound();
}

function Intro({
  eyebrow,
  title,
  intro,
  interest,
  topic,
  trail,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  interest: string;
  topic: string;
  trail: Crumb[];
}) {
  return (
    <PageIntro eyebrow={eyebrow} title={title} intro={intro} trail={trail}>
      <Actions>
        <RollLink href={startFor(interest)} size="lg">
          Get Started
        </RollLink>
        <RollLink href={whatsappAbout(topic)} variant="kinetic" size="lg" external>
          Ask on WhatsApp
        </RollLink>
      </Actions>
    </PageIntro>
  );
}

// --- a group ---------------------------------------------------------------------------------------

function GroupView({ page }: { page: GroupPage }) {
  const category = categories.find((c) => c.slug === page.slug)!;
  const tint = GROUP_TINT[page.slug];
  const path = `/services/${page.slug}`;
  return (
    <>
      <PageStructuredData
        name={category.name}
        description={page.description}
        path={path}
        crumbs={[{ name: 'Services', path: '/services' }]}
        faqs={page.faqs}
        from={page.from}
        serviceType={page.keyword}
      />
      <Intro
        eyebrow={page.chip}
        title={page.h1}
        intro={page.intro}
        interest={page.slug}
        topic={category.name}
        trail={[
          { name: 'Services', path: '/services' },
          { name: category.name, path },
        ]}
      />
      <HeroWell tint={tint}>
        <GroupHeroScene slug={page.slug} />
      </HeroWell>

      <div className="alt-bands">
        <CardBand id="services" eyebrow={category.name} title={page.servicesHeading}>
          {category.services.map((service, i) => (
            <Card
              key={service.anchor}
              icon={iconFor(service.anchor)}
              name={service.name}
              line={service.summary}
              href={`/services/${service.anchor}`}
              index={i}
            />
          ))}
        </CardBand>

        <Section
          id="built"
          eyebrow={category.name}
          title={page.built.heading}
          intro={page.built.body}
        >
          {page.built.steps ? <FlowStrip steps={page.built.steps} tint={tint} /> : null}
          {page.built.points ? <BuildCards points={page.built.points} /> : null}
        </Section>

        <Section id="prices" eyebrow={category.name} title="Prices">
          <Prices cards={page.prices} note={page.priceNote} compact />
        </Section>

        <FaqBand
          eyebrow={category.name}
          title={`${category.name} questions`}
          faqs={page.faqs}
          interest={page.slug}
          topic={category.name}
        />

        <Closing
          heading={page.closing}
          interest={page.slug}
          topic={category.name}
          visual={<ConnectScene icon={GROUP_GLYPH[page.slug]} tint={tint} />}
        />
      </div>
    </>
  );
}

// --- a service -------------------------------------------------------------------------------------

function ServiceView({ page }: { page: ServicePage }) {
  const category = categories.find((c) => c.slug === page.group)!;
  const service = category.services.find((s) => s.anchor === page.slug)!;
  const product = productFor(page.slug)!;
  const tint = GROUP_TINT[page.group];
  const path = `/services/${page.slug}`;
  const groupPath = `/services/${category.slug}`;
  const trail = [
    { name: 'Services', path: '/services' },
    { name: category.name, path: groupPath },
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
        crumbs={[
          { name: 'Services', path: '/services' },
          { name: category.name, path: groupPath },
        ]}
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
        view={<IsoView slug={page.slug} accent={product.accent} />}
        tail={
          <>
            <RelatedIndex
              eyebrow={category.name}
              heading={`More in ${category.name}`}
              links={[
                ...related.map((s) => ({
                  name: s.name,
                  line: s.summary,
                  href: `/services/${s.anchor}`,
                })),
                ...(solution && solutionPage
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

// --- Evolve ----------------------------------------------------------------------------------------

function EvolveView() {
  const page = evolvePage;
  const product = productFor(evolve.slug)!;
  const path = `/services/${evolve.slug}`;
  return (
    <>
      <PageStructuredData
        name={evolve.name}
        description={page.description}
        path={path}
        crumbs={[{ name: 'Services', path: '/services' }]}
        faqs={product.faqs.items}
        from={page.from}
        monthly={page.monthly}
        serviceType={page.keyword}
      />
      <ProductOpening
        page={product}
        eyebrow={page.chip}
        title={evolve.name}
        intro={page.intro}
        interest={evolve.slug}
        topic={evolve.name}
        trail={[
          { name: 'Services', path: '/services' },
          { name: evolve.name, path },
        ]}
      />

      <ProductBody
        page={product}
        interest={evolve.slug}
        eyebrow={evolve.name}
        tint="butter"
        view={<IsoView slug={evolve.slug} accent={product.accent} />}
        priceExtra={<Pricing only="care" />}
        after={
          <Section
            id="terms"
            eyebrow={evolve.name}
            title={page.terms.heading}
            intro={page.terms.body}
          />
        }
        tail={
          <Closing
            heading={page.closing}
            interest={evolve.slug}
            topic={evolve.name}
            visual={<ConnectScene icon="shield" tint="butter" />}
          />
        }
      />
    </>
  );
}
