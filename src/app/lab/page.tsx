import type { Metadata } from 'next';

import {
  PortalScene,
  PromiseScene,
  SERVICE_SCENES,
  SOLUTION_SCENES,
} from '@/components/visuals/scenes';

/**
 * A design tool, not a page: every scene side by side, in the order `scenes.tsx` declares them.
 * `harness/bbox.mjs` measures each one here and writes its viewBox back into the source.
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
    <div className="grid grid-cols-3 gap-4 p-4 pt-28">
      {all.map(([name, Scene]) => (
        <figure key={name} className="rounded-xl border border-line bg-paper p-3">
          <figcaption className="eyebrow mb-2">{name}</figcaption>
          <Scene />
        </figure>
      ))}
    </div>
  );
}
