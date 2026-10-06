import { Closing } from '@/components/home/closing';
import { SectionHead } from '@/components/home/section-head';
import { FadePanel, groundOf, surfaceOf } from '@/components/lab/mock-parts';
import { SOLUTION_PAGE_MOCKS } from '@/components/lab/solution-mocks';
import { SystemRow } from '@/components/lab/soft';
import { Highlights, ProductOpeningFull, RelatedIndex, WhyGrid } from '@/components/pages/product';
import { Industries, PointOfView, Rich } from '@/components/pages/product-parts';
import { FaqBand } from '@/components/pages/sections';
import { PageStructuredData } from '@/components/seo/page-structured-data';
import { iconFor, SOLUTION_ICONS } from '@/components/ui/icon';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { IsoView } from '@/components/visuals/iso-views';
import { SOLUTION_CONTENT } from '@/content/lab/solutions';
import { solutionPageFor, solutionPages } from '@/content/pages';
import { productFor } from '@/content/products';
import { categories, evolve, solutions } from '@/content/site';

import { BuiltFrom, Journey, WaysIn } from './parts';
import { Showcase, ShowcasePanel } from './showcase';

/**
 * A solution's page, in the pattern set on Lead Automation: the opening on white with the
 * product at work and the figures under it, then — white and grey in turn — the point of view
 * with its photograph, the system behind it in three mockups, one customer's story, two of
 * Lightfield's split sections (how it works, with everything that's in it, beside the system's
 * own screen; and what changes, beside the business's workspace), the services it's built from,
 * who it suits, the ways in, why build it here on the page's one dark band, and the questions;
 * then the other solutions and the closing. The opening is off-white and the figures white, and
 * the sections under them go off-white and white in turn.
 *
 * The words are the solution's own (`content/lab/solutions`), the figures, point of view,
 * packages and questions its product file's, and the mockups `SOLUTION_PAGE_MOCKS`'s — each in
 * the solution's colour, on its tint.
 */
const services = categories.flatMap((category) => category.services);

/** A service the solution is built from, as `BuiltFrom` shows it — Evolve among them. */
const serviceCard = (anchor: string) => {
  if (anchor === evolve.slug)
    return [
      {
        name: evolve.name,
        line: evolve.summary,
        href: `/services/${anchor}`,
        icon: iconFor(anchor),
      },
    ];
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
};

export function SolutionPageView({ slug }: { slug: string }) {
  const page = solutionPageFor(slug)!;
  const solution = solutions.find((s) => s.slug === slug)!;
  const product = productFor(slug)!;
  const c = SOLUTION_CONTENT[slug]!;
  const mocks = SOLUTION_PAGE_MOCKS[slug]!;
  const A = c.accent;
  const ground = c.tint ? groundOf(c.tint) : surfaceOf(A);
  const others = solutionPages.filter((other) => other.slug !== slug);
  const How = mocks.how;
  const Benefits = mocks.benefits;

  return (
    <>
      <PageStructuredData
        name={solution.name}
        description={page.description}
        path={`/solutions/${slug}`}
        crumbs={[{ name: 'Solutions', path: '/solutions' }]}
        faqs={product.faqs.items}
        from={page.from}
        monthly={page.monthly}
        serviceType={page.keyword}
      />

      <ProductOpeningFull
        title={solution.name}
        intro={page.intro}
        interest={slug}
        topic={solution.name}
        accent={A}
        tasks={c.tasks}
        note={c.note}
        ground="off"
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: solution.name, path: `/solutions/${slug}` },
        ]}
      />

      {/* Off-white opening, white figures, then off-white and white in turn down the page. */}
      <div className="bg-white">
        <Highlights {...product.highlights} />
      </div>

      <div className="alt-bands">
        <PointOfView
          statement={product.view.statement}
          body={product.view.body}
          photo={<IsoView slug={slug} accent={A} />}
        />

        <SystemRow
          tint={ground}
          accent={A}
          head={
            <SectionHead
              id="behind"
              eyebrow="How it works"
              heading={c.behind.heading}
              intro={c.behind.intro}
              align="center"
            />
          }
          cards={c.behind.cards.map((card, i) => {
            const Scene = mocks.behind[i]!;
            return { ...card, scene: <Scene /> };
          })}
        />

        <Journey
          eyebrow={c.journey.eyebrow}
          heading={c.journey.heading}
          intro={c.journey.intro}
          steps={c.journey.steps}
          accent={A}
          ground={ground}
        />

        <Showcase
          id="how"
          eyebrow="How it works"
          heading={c.system.heading}
          intro={c.system.intro}
          points={c.system.points}
          accent={A}
          pinned
          picture={
            <ShowcasePanel className="lg:aspect-[900/780]">
              <FadePanel accent={A} light={c.tint}>
                <How />
              </FadePanel>
            </ShowcasePanel>
          }
        />

        <Showcase
          id="benefits"
          eyebrow="Benefits"
          heading={c.benefits.heading}
          intro={c.benefits.intro}
          points={c.benefits.points}
          accent={A}
          picture={
            <ShowcasePanel>
              <FadePanel accent={A} light={c.tint}>
                <Benefits />
              </FadePanel>
            </ShowcasePanel>
          }
        />

        <BuiltFrom
          eyebrow="Built from"
          heading={c.built.heading}
          intro={c.built.intro}
          services={(c.built.services ?? page.services).flatMap(serviceCard)}
        />

        <Industries
          eyebrow={solution.name}
          heading={product.industries.heading}
          items={product.industries.items}
          raised
        />

        <WaysIn
          eyebrow="Pricing"
          heading={c.ways.heading}
          intro={c.ways.intro}
          price={product.price}
          accent={A}
        />

        <WhyGrid {...c.why} />

        <FaqBand
          eyebrow={solution.name}
          title={product.faqs.heading}
          faqs={product.faqs.items}
          interest={slug}
          topic={solution.name}
          after={
            product.notes?.length ? (
              <div className="flex flex-col gap-2 rounded-2xl border border-line p-5 text-xs leading-relaxed text-ink-3">
                {product.notes.map((note) => (
                  <p key={note}>
                    <Rich text={note} />
                  </p>
                ))}
              </div>
            ) : undefined
          }
        />

        <RelatedIndex
          id="other-solutions"
          eyebrow="Solutions"
          heading="Other solutions"
          links={others.map((other) => {
            const s = solutions.find((x) => x.slug === other.slug)!;
            return { name: s.name, line: s.line, href: `/solutions/${other.slug}` };
          })}
        />

        <Closing
          heading={page.closing}
          interest={slug}
          topic={solution.name}
          visual={<ConnectScene icon={SOLUTION_ICONS[slug] ?? 'target'} tint={page.tint} />}
        />
      </div>
    </>
  );
}
