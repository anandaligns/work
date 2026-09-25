import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Closing } from '@/components/home/closing';
import { Pricing } from '@/components/home/pricing';
import { Card, CardBand } from '@/components/pages/cards';
import { FlowStrip } from '@/components/pages/flow-strip';
import { Actions, PageIntro } from '@/components/pages/page-intro';
import {
  BuildCards,
  GoodFor,
  HeroWell,
  Prices,
  ProblemCards,
  Questions,
  Section,
} from '@/components/pages/sections';
import { PageStructuredData } from '@/components/seo/page-structured-data';
import { type IconName, iconFor, SOLUTION_ICONS } from '@/components/ui/icon';
import { RollLink } from '@/components/ui/roll-link';
import { ConnectScene } from '@/components/visuals/connect-scene';
import {
  EvolveHeroScene,
  GroupHeroScene,
  ServiceHeroScene,
} from '@/components/visuals/page-scenes';
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

/**
 * `/services/[slug]` — the three service groups, their fifteen services, and Evolve. Every page is
 * written out in `content/pages.ts`; this puts each one together from the sections the home page
 * already has: the intro, the page's scene in a tinted well, then its bands, its questions and
 * its closing, ending on its Connect scene.
 */
const GROUP_GLYPH: Record<string, IconName> = {
  'digital-experiences': 'device',
  'business-systems': 'database',
  'automation-ai': 'spark',
};

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
}: {
  eyebrow: string;
  title: string;
  intro: string;
  interest: string;
  topic: string;
}) {
  return (
    <PageIntro eyebrow={eyebrow} title={title} intro={intro}>
      <Actions>
        <RollLink href={startFor(interest)} size="lg">
          Get Started
        </RollLink>
        <RollLink href={whatsappAbout(topic)} variant="line" size="lg" external>
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
        crumbs={[]}
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
      />
      <HeroWell tint={tint}>
        <GroupHeroScene slug={page.slug} />
      </HeroWell>

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

      <Section id="questions" eyebrow={category.name} title="Questions">
        <Questions faqs={page.faqs} />
      </Section>

      <Closing
        heading={page.closing}
        interest={page.slug}
        topic={category.name}
        visual={<ConnectScene icon={GROUP_GLYPH[page.slug]} tint={tint} />}
      />
    </>
  );
}

// --- a service -------------------------------------------------------------------------------------

function ServiceView({ page }: { page: ServicePage }) {
  const category = categories.find((c) => c.slug === page.group)!;
  const service = category.services.find((s) => s.anchor === page.slug)!;
  const tint = GROUP_TINT[page.group];
  const path = `/services/${page.slug}`;
  const solution = solutions.find((s) => s.slug === page.solution);
  const solutionPage = solutionPageFor(page.solution);
  const related = category.services.filter((s) => s.anchor !== page.slug);

  return (
    <>
      <PageStructuredData
        name={service.name}
        description={page.description}
        path={path}
        crumbs={[{ name: category.name, path: `/services/${category.slug}` }]}
        faqs={page.faqs}
        from={page.from}
        serviceType={page.keyword}
      />
      <Intro
        eyebrow={category.name}
        title={service.name}
        intro={page.intro}
        interest={page.slug}
        topic={service.name}
      />
      <HeroWell tint={tint}>
        <ServiceHeroScene slug={page.slug} tint={tint} />
      </HeroWell>

      <Section id="problem" eyebrow={service.name} title="What gets in the way">
        <ProblemCards points={page.problems} />
      </Section>

      <Section id="build" eyebrow={service.name} title="What we build">
        <BuildCards points={page.builds} />
      </Section>

      <Section id="how" eyebrow={service.name} title="How it works">
        <FlowStrip steps={page.steps} tint={tint} />
      </Section>

      <Section id="good-for" eyebrow={service.name} title="Good for">
        <GoodFor sectors={page.goodFor} />
      </Section>

      <Section id="price" eyebrow={service.name} title="Price">
        <Prices cards={page.prices} note={page.priceNote} />
      </Section>

      <Section id="questions" eyebrow={service.name} title="Questions">
        <Questions faqs={page.faqs} />
      </Section>

      <CardBand id="related" eyebrow={category.name} title={`More in ${category.name}`}>
        {related.map((s, i) => (
          <Card
            key={s.anchor}
            icon={iconFor(s.anchor)}
            name={s.name}
            line={s.summary}
            href={`/services/${s.anchor}`}
            index={i}
          />
        ))}
        {solution && solutionPage ? (
          <Card
            icon={SOLUTION_ICONS[solutionPage.slug] ?? 'layers'}
            name={`Solution: ${solution.name}`}
            line={solution.line}
            href={`/solutions/${solution.slug}`}
            index={related.length}
          />
        ) : null}
        <Card
          icon={GROUP_GLYPH[category.slug] ?? 'layers'}
          name={`All of ${category.name}`}
          line={category.line}
          href={`/services/${category.slug}`}
          index={related.length + 1}
        />
      </CardBand>

      <Closing
        heading={page.closing}
        interest={page.slug}
        topic={service.name}
        visual={<ConnectScene icon={iconFor(page.slug)} tint={tint} />}
      />
    </>
  );
}

// --- Evolve ----------------------------------------------------------------------------------------

function EvolveView() {
  const page = evolvePage;
  const path = `/services/${evolve.slug}`;
  return (
    <>
      <PageStructuredData
        name={evolve.name}
        description={page.description}
        path={path}
        crumbs={[]}
        faqs={page.faqs}
        from={page.from}
        monthly={page.monthly}
        serviceType={page.keyword}
      />
      <Intro
        eyebrow={page.chip}
        title={evolve.name}
        intro={page.intro}
        interest={evolve.slug}
        topic={evolve.name}
      />
      <HeroWell tint="butter">
        <EvolveHeroScene />
      </HeroWell>

      <Section id="why" eyebrow={evolve.name} title={page.why.heading} intro={page.why.body} />

      <Section id="includes" eyebrow={evolve.name} title="What every plan includes">
        <BuildCards points={page.includes} />
      </Section>

      <Section id="plans" eyebrow={evolve.name} title="Evolve plans">
        <Pricing only="care" />
      </Section>

      <Section
        id="terms"
        eyebrow={evolve.name}
        title={page.terms.heading}
        intro={page.terms.body}
      />

      <Section id="questions" eyebrow={evolve.name} title="Questions">
        <Questions faqs={page.faqs} />
      </Section>

      <Closing
        heading={page.closing}
        interest={evolve.slug}
        topic={evolve.name}
        visual={<ConnectScene icon="shield" tint="butter" />}
      />
    </>
  );
}
