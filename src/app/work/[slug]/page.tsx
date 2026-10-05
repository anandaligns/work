import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';

import { Closing } from '@/components/home/closing';
import { Band } from '@/components/layout/band';
import { Card, CardBand } from '@/components/pages/cards';
import { FlowStrip } from '@/components/pages/flow-strip';
import { PageIntro } from '@/components/pages/page-intro';
import { BuildCards, ProblemCards, Section } from '@/components/pages/sections';
import { iconFor } from '@/components/ui/icon';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { caseStudies } from '@/content/cases';
import { categories, SITE_URL } from '@/content/site';

/**
 * `/work/[slug]` — a case study, on the template: the outcome and its facts, how it worked before,
 * what we built and the client's real flow, the system in daily use, what changed, the services
 * used, and the closing. No case is published until its client agrees (see `content/cases.ts`).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const studyFor = (slug: string) => caseStudies.find((study) => study.slug === slug);
const services = categories.flatMap((category) => category.services);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = studyFor((await params).slug);
  if (!study) return {};
  const path = `/work/${study.slug}`;
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: path },
    openGraph: { type: 'article', title: study.title, description: study.description, url: path },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = studyFor((await params).slug);
  if (!study) notFound();
  const url = `${SITE_URL}/work/${study.slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: study.h1,
        description: study.description,
        url,
        datePublished: study.published,
        author: { '@type': 'Person', name: 'Anand M' },
        publisher: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/#work` },
          { '@type': 'ListItem', position: 3, name: study.h1, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
      />
      <PageIntro
        eyebrow="Case study"
        title={study.h1}
        intro={study.summary}
        trail={[{ name: study.h1, path: `/work/${study.slug}` }]}
      >
        <dl className="grid gap-x-10 gap-y-3 text-left text-sm sm:grid-cols-3">
          {[
            ['Industry', study.facts.industry],
            ['What we built', study.facts.built],
            ['Launched', study.facts.month],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="eyebrow">{term}</dt>
              <dd className="mt-1 text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </PageIntro>

      <Section id="before" eyebrow="Case study" title="Before">
        <ProblemCards points={study.before.map((text) => ({ icon: 'clock', text }))} />
      </Section>

      <Section id="built" eyebrow="Case study" title="What we built">
        <BuildCards points={study.built} />
        <div className="mt-14">
          <FlowStrip steps={study.flow} tint={study.tint} />
        </div>
      </Section>

      {study.screens.length ? (
        <Section id="day-to-day" eyebrow="Case study" title="Day to day">
          <ul className="grid gap-8 md:grid-cols-2">
            {study.screens.map((screen, i) => (
              <li key={screen.src} data-reveal="" style={{ '--i': i } as CSSProperties}>
                <figure>
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    width={screen.width}
                    height={screen.height}
                    loading="lazy"
                    className="h-auto w-full rounded-2xl ring-1 ring-black/5 shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)]"
                  />
                  <figcaption className="mt-3 text-sm text-ink-2">{screen.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Band id="changed" labelledBy="changed-heading" className="py-20 lg:py-28">
        <h2 id="changed-heading" className="text-h2 tracking-[var(--tracking-heading)] text-ink">
          What changed
        </h2>
        {study.changed.figures.length ? (
          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {study.changed.figures.map((figure) => (
              <div key={figure.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-body text-ink-2">{figure.label}</dt>
                <dd className="font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none tracking-[var(--tracking-display)] text-ink">
                  {figure.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        {study.changed.words ? (
          <p className="mt-8 max-w-2xl text-lead text-ink-2">{study.changed.words}</p>
        ) : null}
        {study.changed.quote ? (
          <blockquote className="mt-12 max-w-3xl">
            <p className="font-display text-h3 tracking-[var(--tracking-heading)] text-ink">
              “{study.changed.quote.text}”
            </p>
            <footer className="mt-4 text-sm text-ink-2">
              {study.changed.quote.name}, {study.changed.quote.role}
            </footer>
          </blockquote>
        ) : null}
      </Band>

      <CardBand id="services-used" eyebrow="Case study" title="Services used">
        {study.services.map((anchor, i) => {
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
          ) : null;
        })}
      </CardBand>

      <Closing
        heading={{
          lead: 'Want the same for your business?',
          fill: 'Tell us how you work today.',
        }}
        interest={study.slug}
        topic={study.facts.built}
        visual={<ConnectScene icon={study.closingIcon} tint={study.tint} />}
      />
    </>
  );
}
