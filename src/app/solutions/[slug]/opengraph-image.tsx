import { SolutionHeroScene } from '@/components/visuals/page-scenes';
import { solutionPageFor, solutionPages } from '@/content/pages';
import { solutions } from '@/content/site';
import { SHARE_SIZE, shareImage } from '@/lib/share-image';

/** A solution's share image: its scene on its tint. */
export const size = SHARE_SIZE;
export const contentType = 'image/png';
export const alt = 'Pixel Kinetix';

export function generateStaticParams() {
  return solutionPages.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = solutionPageFor(slug)!;
  const solution = solutions.find((s) => s.slug === slug)!;
  return shareImage({
    eyebrow: 'Solutions',
    title: solution.name,
    line: solution.line,
    tint: page.tint,
    scene: <SolutionHeroScene slug={slug} />,
  });
}
