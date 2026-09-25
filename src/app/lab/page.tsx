import type { Metadata } from 'next';

import { GROUP_TINT, servicePages } from '@/content/pages';
import { ConnectScene } from '@/components/visuals/connect-scene';
import {
  EvolveHeroScene,
  ServiceHeroScene,
  SolutionHeroScene,
} from '@/components/visuals/page-scenes';
import { TINT_BG } from '@/components/visuals/scene-panel';
import {
  PortalScene,
  PromiseScene,
  SERVICE_SCENES,
  SOLUTION_SCENES,
} from '@/components/visuals/scenes';

/**
 * A design tool, not a page: every scene side by side, in the order `scenes.tsx` declares them,
 * then every page's hero scene on its tint and a Connect scene. `harness/bbox.mjs` measures the
 * home scenes here and writes their viewBoxes back into the source; the page scenes size
 * themselves.
 */
export const metadata: Metadata = { title: 'Scene lab', robots: { index: false } };

export default function Lab() {
  const all = [
    ...Object.entries(SERVICE_SCENES),
    ...Object.entries(SOLUTION_SCENES),
    ['portal', PortalScene] as const,
    ['promise-0', () => <PromiseScene index={0} />] as const,
    ['promise-1', () => <PromiseScene index={1} />] as const,
    ['promise-2', () => <PromiseScene index={2} />] as const,
    ['promise-3', () => <PromiseScene index={3} />] as const,
  ];
  return (
    <div className="flex flex-col gap-10 p-4 pt-28">
      <div className="grid grid-cols-3 gap-4">
        {all.map(([name, Scene]) => (
          <figure key={name} className="rounded-xl border border-line bg-paper p-3">
            <figcaption className="eyebrow mb-2">{name}</figcaption>
            <Scene />
          </figure>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {servicePages.map((page) => (
          <figure key={page.slug} className={`rounded-xl p-6 ${TINT_BG[GROUP_TINT[page.group]]}`}>
            <figcaption className="eyebrow mb-2">{page.slug}</figcaption>
            <ServiceHeroScene slug={page.slug} tint={GROUP_TINT[page.group]} />
          </figure>
        ))}
        {['never-miss-a-lead', 'keep-it-improving'].map((slug) => (
          <figure key={slug} className="rounded-xl bg-fill p-6">
            <figcaption className="eyebrow mb-2">{slug}</figcaption>
            <SolutionHeroScene slug={slug} />
          </figure>
        ))}
        <figure className="rounded-xl bg-tint-butter p-6">
          <figcaption className="eyebrow mb-2">evolve</figcaption>
          <EvolveHeroScene />
        </figure>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ConnectScene icon="globe" tint="violet" />
        <ConnectScene
          converge={[
            { icon: 'device', tone: 'violet' },
            { icon: 'database', tone: 'sky' },
            { icon: 'spark', tone: 'mint' },
          ]}
          result={{ icon: 'shield', tone: 'butter' }}
        />
        <ConnectScene icon="move" tint="blush" />
      </div>
    </div>
  );
}
