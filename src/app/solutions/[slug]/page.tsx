import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SolutionPageView } from '@/components/solutions/solution-page';
import { isLive, solutionPageFor, solutionPages } from '@/content/pages';

/**
 * `/solutions/[slug]` — the four solutions, each a goal with the services put together for it,
 * on the solutions' own page (`SolutionPageView`): the opening with the product at work, the
 * figures, the point of view, the system behind it, one customer's story, how it works and what
 * changes beside the product's own windows, the ways in, the questions, the other solutions and
 * the closing — each in its own colour. Lead Automation's earlier pages are kept to compare at
 * `/solutions/never-miss-a-lead-v1` and `-v2`.
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

export default async function SolutionPageRoute({ params }: Props) {
  const { slug } = await params;
  if (!solutionPageFor(slug)) notFound();
  return <SolutionPageView slug={slug} />;
}
