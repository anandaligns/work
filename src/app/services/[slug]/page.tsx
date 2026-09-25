import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Card, CardBand } from '@/components/pages/cards';
import { ComingSoon, comingSoonRobots } from '@/components/pages/coming-soon';
import { iconFor } from '@/components/ui/icon';
import { carePlans, categories, evolve, groupIntros, type Offer } from '@/content/site';

/**
 * `/services/[slug]` — a page for each of the three service groups, each of their fifteen
 * services, and Evolve. Every one is a coming-soon page for now (see `ComingSoon`); as a real
 * page is written, it takes over its slug here.
 */
type Entry =
  | { kind: 'group'; slug: string; name: string; line: string; groupSlug: string }
  | { kind: 'service'; slug: string; name: string; line: string; groupSlug: string }
  | { kind: 'evolve'; slug: string; name: string; line: string };

const ENTRIES: Entry[] = [
  ...categories.map((category): Entry => ({
    kind: 'group',
    slug: category.slug,
    name: category.name,
    line: groupIntros[category.slug] ?? category.line,
    groupSlug: category.slug,
  })),
  ...categories.flatMap((category) =>
    category.services.map((service): Entry => ({
      kind: 'service',
      slug: service.anchor,
      name: service.name,
      line: service.summary,
      groupSlug: category.slug,
    })),
  ),
  { kind: 'evolve', slug: evolve.slug, name: evolve.name, line: evolve.summary },
];

const entryFor = (slug: string) => ENTRIES.find((entry) => entry.slug === slug);

const priceOf = (plan: Offer, label: string) =>
  plan.headline.find((price) => price.label === label)?.text ?? '';

export const dynamicParams = false;

export function generateStaticParams() {
  return ENTRIES.map((entry) => ({ slug: entry.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = entryFor((await params).slug);
  if (!entry) return {};
  return {
    title: entry.name,
    description: entry.line,
    alternates: { canonical: `/services/${entry.slug}` },
    robots: comingSoonRobots,
  };
}

export default async function ServicePage({ params }: Props) {
  const entry = entryFor((await params).slug);
  if (!entry) notFound();

  if (entry.kind === 'evolve') {
    return (
      <ComingSoon eyebrow="Services" name={entry.name} line={entry.line}>
        <CardBand
          id="plans"
          eyebrow="Evolve plans"
          title="Three plans. Hosting is included in all of them."
        >
          {carePlans.map((plan, i) => (
            <Card
              key={plan.slug}
              icon={iconFor('evolve')}
              name={plan.name}
              line={`${priceOf(plan, 'Monthly')} a month, or ${priceOf(plan, 'Yearly')} a year`}
              href="/#evolve-plans"
              index={i}
            />
          ))}
        </CardBand>
      </ComingSoon>
    );
  }

  const group = categories.find((category) => category.slug === entry.groupSlug)!;
  const related =
    entry.kind === 'group'
      ? group.services
      : group.services.filter((service) => service.anchor !== entry.slug);

  return (
    <ComingSoon
      eyebrow={entry.kind === 'group' ? 'Services' : group.name}
      name={entry.name}
      line={entry.line}
    >
      <CardBand
        id="related"
        eyebrow={group.name}
        title={entry.kind === 'group' ? group.line : `More in ${group.name}`}
        columns={entry.kind === 'group' ? 3 : 2}
      >
        {related.map((service, i) => (
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
    </ComingSoon>
  );
}
