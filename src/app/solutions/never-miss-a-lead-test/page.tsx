import type { Metadata } from 'next';

import { Closing } from '@/components/home/closing';
import { FaqBand } from '@/components/pages/sections';
import { Rich } from '@/components/pages/product-parts';
import { RelatedIndex } from '@/components/pages/product';
import { SectionHead } from '@/components/home/section-head';
import { Band } from '@/components/layout/band';
import { Engine } from '@/components/solutions/engine';
import { BuiltFrom, Journey, Leaks, SolutionHero, WaysIn } from '@/components/solutions/parts';
import { iconFor, SOLUTION_ICONS } from '@/components/ui/icon';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { SOLUTION_SCENES } from '@/components/visuals/scenes';
import { lab, product } from '@/content/lab/never-miss-a-lead';
import { solutionPageFor, solutionPages } from '@/content/pages';
import { categories, solutions } from '@/content/site';

/**
 * `/solutions/never-miss-a-lead-test` — a trial of a page pattern of the solutions' own, on Never
 * Miss a Lead: told as a goal, not a product. The live `/solutions/lead-automation` is left as
 * it is. Kept out of search and the sitemap until the pattern is approved.
 */
export const metadata: Metadata = {
  title: 'Lead Automation (test)',
  robots: { index: false, follow: false },
};

const SLUG = 'lead-automation';
const services = categories.flatMap((category) => category.services);

export default function NeverMissALeadTest() {
  const page = solutionPageFor(SLUG)!;
  const solution = solutions.find((s) => s.slug === SLUG)!;
  const Scene = SOLUTION_SCENES[SLUG];
  const others = solutionPages.filter((other) => other.slug !== SLUG);

  return (
    <>
      <SolutionHero
        eyebrow="Solutions"
        title={solution.name}
        intro={page.intro}
        interest={SLUG}
        topic={solution.name}
        facts={lab.facts}
        tint={`var(--color-tint-${page.tint})`}
        scene={<Scene />}
      />

      <div className="alt-bands">
        <Leaks
          heading={lab.leaks.heading}
          intro={lab.leaks.intro}
          items={lab.leaks.items}
          accent={lab.accent}
        />

        <Band id="system" labelledBy="system-heading" className="py-24 lg:py-32">
          <Engine
            accent={lab.accent}
            tabs={lab.engine.tabs}
            head={
              <SectionHead
                id="system"
                eyebrow={lab.engine.eyebrow}
                heading={lab.engine.heading}
                intro={lab.engine.intro}
              />
            }
          />
        </Band>

        <Journey
          eyebrow={lab.journey.eyebrow}
          heading={lab.journey.heading}
          intro={lab.journey.intro}
          steps={lab.journey.steps}
          accent={lab.accent}
        />

        <BuiltFrom
          eyebrow={lab.built.eyebrow}
          heading={lab.built.heading}
          intro={lab.built.intro}
          name={solution.name}
          line="One system, one price, one team looking after it."
          services={page.services.flatMap((anchor) => {
            const service = services.find((s) => s.anchor === anchor);
            return service
              ? [
                  {
                    name: service.name,
                    line: service.summary,
                    href: `/services/${anchor}`,
                    icon: iconFor(anchor),
                  },
                ]
              : [];
          })}
        />

        <WaysIn
          eyebrow={lab.ways.eyebrow}
          heading={lab.ways.heading}
          intro={lab.ways.intro}
          price={product.price}
          accent={lab.accent}
        />

        <FaqBand
          eyebrow={solution.name}
          title={product.faqs.heading}
          faqs={product.faqs.items}
          interest={SLUG}
          topic={solution.name}
          after={
            <div className="flex flex-col gap-2 rounded-2xl border border-line p-5 text-xs leading-relaxed text-ink-3">
              {(product.notes ?? []).map((note) => (
                <p key={note}>
                  <Rich text={note} />
                </p>
              ))}
            </div>
          }
        />
      </div>

      <RelatedIndex
        id="other-solutions"
        eyebrow="Solutions"
        heading="Other solutions"
        off
        links={others.map((other) => {
          const s = solutions.find((x) => x.slug === other.slug)!;
          return { name: s.name, line: s.line, href: `/solutions/${other.slug}` };
        })}
      />

      <Closing
        heading={page.closing}
        interest={SLUG}
        topic={solution.name}
        visual={<ConnectScene icon={SOLUTION_ICONS[SLUG] ?? 'target'} tint={page.tint} />}
      />
    </>
  );
}
