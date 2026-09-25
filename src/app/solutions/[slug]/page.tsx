import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Card, CardBand } from '@/components/pages/cards';
import { ComingSoon, comingSoonRobots } from '@/components/pages/coming-soon';
import { iconFor } from '@/components/ui/icon';
import { solutions } from '@/content/site';

/**
 * `/solutions/[slug]` — a page for each of the four solutions. Coming-soon pages for now, each
 * already listing what the solution puts together, word for word from the catalogue.
 */
const solutionFor = (slug: string) => solutions.find((solution) => solution.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solution = solutionFor((await params).slug);
  if (!solution) return {};
  return {
    title: solution.name,
    description: [solution.line, solution.positioning].filter(Boolean).join(' '),
    alternates: { canonical: `/solutions/${solution.slug}` },
    robots: comingSoonRobots,
  };
}

export default async function SolutionPage({ params }: Props) {
  const solution = solutionFor((await params).slug);
  if (!solution) notFound();

  return (
    <ComingSoon
      eyebrow="Solutions"
      name={solution.name}
      line={[solution.line, solution.positioning].filter(Boolean).join(' ')}
    >
      <CardBand
        id="bundles"
        eyebrow="What it puts together"
        title={solution.bundles.length === 2 ? 'Two ways in.' : 'Ways in.'}
        columns={2}
      >
        {solution.bundles.map((bundle, i) => (
          <Card
            key={bundle.anchor}
            icon={iconFor(bundle.anchor)}
            name={bundle.name}
            href={`/#${bundle.anchor}`}
            index={i}
          >
            <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-sm text-ink-2">
              {bundle.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-ink-3" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </CardBand>
    </ComingSoon>
  );
}
