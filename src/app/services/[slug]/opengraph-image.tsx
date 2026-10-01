import {
  EvolveHeroScene,
  GroupHeroScene,
  ServiceHeroScene,
} from '@/components/visuals/page-scenes';
import {
  GROUP_TINT,
  groupPageFor,
  groupPages,
  servicePageFor,
  servicePages,
} from '@/content/pages';
import { categories, evolve } from '@/content/site';
import { productFor } from '@/content/products';
import { SHARE_SIZE, shareImage } from '@/lib/share-image';

/** A service group's, a service's or Evolve's share image: its hero scene on its tint. */
export const size = SHARE_SIZE;
export const contentType = 'image/png';
export const alt = 'Pixel Kinetix';

export function generateStaticParams() {
  return [...groupPages, ...servicePages, { slug: evolve.slug }].map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === evolve.slug) {
    return shareImage({
      eyebrow: 'Services',
      title: evolve.name,
      line: productFor(evolve.slug)!.sub,
      tint: 'butter',
      scene: <EvolveHeroScene />,
    });
  }
  const group = groupPageFor(slug);
  if (group) {
    return shareImage({
      eyebrow: group.chip,
      title: group.h1,
      line: categories.find((c) => c.slug === slug)?.line ?? '',
      tint: GROUP_TINT[group.slug],
      scene: <GroupHeroScene slug={group.slug} />,
    });
  }
  const page = servicePageFor(slug)!;
  const category = categories.find((c) => c.slug === page.group)!;
  const service = category.services.find((s) => s.anchor === slug)!;
  const tint = GROUP_TINT[page.group];
  return shareImage({
    eyebrow: category.name,
    title: service.name,
    line: productFor(slug)!.sub,
    tint,
    scene: <ServiceHeroScene slug={slug} tint={tint} bare />,
  });
}
