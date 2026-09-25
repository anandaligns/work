import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';

import { Closing } from '@/components/home/closing';
import { Band } from '@/components/layout/band';
import { Card, CardBand } from '@/components/pages/cards';
import { FlowStrip } from '@/components/pages/flow-strip';
import { Actions, PageIntro } from '@/components/pages/page-intro';
import { GoodFor, Prices, ProblemCards, Questions, Section } from '@/components/pages/sections';
import { PageStructuredData } from '@/components/seo/page-structured-data';
import { Icon, iconFor, SOLUTION_ICONS } from '@/components/ui/icon';
import { RollLink } from '@/components/ui/roll-link';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { SolutionHeroScene } from '@/components/visuals/page-scenes';
import { ScenePanel } from '@/components/visuals/scene-panel';
import {
  isLive,
  type SolutionPage,
  solutionPageFor,
  solutionPages,
  type Way,
} from '@/content/pages';
import { categories, evolve, solutions, startFor, whatsappAbout } from '@/content/site';

/**
 * `/solutions/[slug]` — the four solutions, each a goal with the services put together for it.
 * The page opens on the solution's scene from the home page's Solutions section, in the same frame;
 * then where things go wrong today, the ways in, how it works, what it costs, who it suits, the
 * services it is built from, questions, the other solutions and its closing.
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
  if (!page || !solution) notFound();
  const path = `/solutions/${slug}`;
  const others = solutionPages.filter((other) => other.slug !== slug);

  return (
    <>
      <PageStructuredData
        name={solution.name}
        description={page.description}
        path={path}
        crumbs={[]}
        faqs={page.faqs}
        from={page.from}
        monthly={page.monthly}
        serviceType={page.keyword}
      />
      <PageIntro eyebrow="Solutions" title={solution.name} intro={page.intro}>
        <Actions>
          <RollLink href={startFor(slug)} size="lg">
            Get Started
          </RollLink>
          <RollLink href={whatsappAbout(solution.name)} variant="line" size="lg" external>
            Ask on WhatsApp
          </RollLink>
        </Actions>
      </PageIntro>

      <div className="container-fluid pb-4">
        <ScenePanel
          tint={page.tint}
          innerClassName="h-[17rem] p-8 sm:h-[24rem] sm:p-12 lg:h-[28rem]"
        >
          <SolutionHeroScene slug={slug} />
        </ScenePanel>
      </div>

      <Section id="problem" eyebrow={solution.name} title={page.problem.heading}>
        <ProblemCards points={page.problem.points} />
      </Section>

      <Ways page={page} />

      <Section id="how" eyebrow={solution.name} title="How it works">
        <FlowStrip steps={page.steps} tint={page.tint} />
      </Section>

      {page.extras?.map((extra, i) => (
        <Section
          key={extra.heading}
          id={`more-${i}`}
          eyebrow={solution.name}
          title={extra.heading}
          intro={extra.body}
        />
      ))}

      {page.prices ? (
        <Section id="price" eyebrow={solution.name} title="Price">
          <Prices cards={page.prices} note={page.priceNote} />
        </Section>
      ) : null}

      <Section id="good-for" eyebrow={solution.name} title="Good for">
        <GoodFor sectors={page.goodFor} />
      </Section>

      <CardBand
        id="built-from"
        eyebrow={solution.name}
        title="The services behind it"
        columns={page.services.length > 3 ? 3 : 2}
      >
        {page.services.map((anchor, i) => {
          const service = services.find((s) => s.anchor === anchor);
          return service ? (
            <Card
              key={anchor}
              icon={iconFor(anchor)}
              name={service.name}
              line={service.summary}
              href={`/services/${anchor}`}
              index={i}
            />
          ) : anchor === evolve.slug ? (
            <Card
              key={anchor}
              icon={iconFor(anchor)}
              name={evolve.name}
              line={evolve.summary}
              href={`/services/${evolve.slug}`}
              index={i}
            />
          ) : null;
        })}
      </CardBand>

      <Section id="questions" eyebrow={solution.name} title="Questions">
        <Questions faqs={page.faqs} />
      </Section>

      <CardBand id="other-solutions" eyebrow="Solutions" title="Other solutions">
        {others.map((other, i) => {
          const s = solutions.find((x) => x.slug === other.slug)!;
          return (
            <Card
              key={other.slug}
              icon={SOLUTION_ICONS[other.slug] ?? 'layers'}
              name={s.name}
              line={s.line}
              href={`/solutions/${other.slug}`}
              index={i}
            />
          );
        })}
      </CardBand>

      <Closing
        heading={page.closing}
        interest={slug}
        topic={solution.name}
        visual={<ConnectScene icon={SOLUTION_ICONS[slug] ?? 'layers'} tint={page.tint} />}
      />
    </>
  );
}

/**
 * The ways in: each a card listing what it includes, its price where it has one, and a button
 * that opens the form on it. With a section heading ("Two ways in") the cards are H3s; without
 * one, each card carries its own H2 — Never Miss a Lead's "The Connected Website" and "Already
 * have a website?".
 */
function Ways({ page }: { page: SolutionPage }) {
  const { heading, cards } = page.ways;
  const Title = heading ? 'h3' : 'h2';
  return (
    <Band id="ways" labelledBy={heading ? 'ways-heading' : undefined} className="py-20 lg:py-28">
      {heading ? (
        <>
          <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
            <span className="size-1.5 bg-ink" />
            What it puts together
          </p>
          <h2
            id="ways-heading"
            className="mt-5 max-w-3xl text-h2 tracking-[var(--tracking-heading)] text-ink"
          >
            {heading}
          </h2>
        </>
      ) : null}
      <ul className={`grid gap-4 lg:grid-cols-2 ${heading ? 'mt-12' : ''}`}>
        {cards.map((way, i) => (
          <WayCard key={way.name} way={way} index={i} Title={Title} />
        ))}
      </ul>
    </Band>
  );
}

function WayCard({ way, index, Title }: { way: Way; index: number; Title: 'h2' | 'h3' }) {
  const focal = Boolean(way.focal);
  const from = way.price?.startsWith('From ');
  const figure = from ? way.price!.slice(5) : way.price;
  return (
    <li
      data-reveal=""
      style={{ '--i': index } as CSSProperties}
      className={`flex flex-col rounded-[var(--radius-panel)] border p-8 lg:p-9 ${
        focal ? 'on-night border-night bg-night text-white' : 'border-line bg-white text-ink'
      }`}
    >
      {way.heading ? (
        <Title className="text-h3 tracking-[var(--tracking-heading)]">{way.heading}</Title>
      ) : (
        <Title className="font-display text-h4 font-medium">{way.name}</Title>
      )}
      {way.intro ? (
        <p className={`mt-3 text-body ${focal ? 'text-white/75' : 'text-ink-2'}`}>{way.intro}</p>
      ) : null}
      {way.heading && !way.intro && !way.heading.includes(way.name) ? (
        <p className={`mt-3 text-body ${focal ? 'text-white/75' : 'text-ink-2'}`}>{way.name}</p>
      ) : null}
      {figure ? (
        <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
          {from ? (
            <span className={`text-sm ${focal ? 'text-white/60' : 'text-ink-2'}`}>From</span>
          ) : null}
          <span className="font-display text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] leading-none tracking-[var(--tracking-display)] whitespace-nowrap">
            {figure}
          </span>
        </p>
      ) : null}
      {way.timeline ? (
        <p
          className={`mt-3 inline-flex items-center gap-2 font-tech text-xs ${focal ? 'text-white/70' : 'text-ink-2'}`}
        >
          <Icon name="calendar" size={13} /> {way.timeline}
        </p>
      ) : null}
      <ul
        className={`mt-7 flex flex-col gap-3 border-t pt-6 text-sm ${focal ? 'border-white/15' : 'border-line'}`}
      >
        {way.lines.map((line) => (
          <li key={line} className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${focal ? 'bg-white text-ink' : 'bg-ink text-white'}`}
            >
              <Icon name="check" size={10} strokeWidth={3} />
            </span>
            <span className={focal ? 'text-white/85' : 'text-ink'}>{line}</span>
          </li>
        ))}
      </ul>
      {way.note ? (
        <p className={`mt-6 text-sm ${focal ? 'text-white/70' : 'text-ink-2'}`}>{way.note}</p>
      ) : null}
      <span aria-hidden="true" className="min-h-7 grow" />
      <RollLink
        href={way.href ?? startFor(way.interest)}
        variant={focal ? 'paper' : 'line'}
        className="w-full"
      >
        {way.cta ?? `Start with ${way.name}`}
      </RollLink>
    </li>
  );
}
