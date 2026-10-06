import { existsSync } from 'node:fs';
import { join } from 'node:path';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import type { Tint } from '@/content/pages';
import type { ProductPage } from '@/content/products/types';
import { startFor, whatsappAbout } from '@/content/site';

import { Band } from '../layout/band';
import { DeskView, isDesk } from '../screens/desk-views';
import { ScreenView } from '../screens/screen';
import type { Screen } from '../screens/types';
import { Marquee } from '../motion/marquee';
import { Pausable } from '../motion/pause-toggle';
import { ToolMark, logoKey } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { RollLink } from '../ui/roll-link';
import { GRAPHITE } from '../visuals/graphite';
import { CompareTable } from './compare-table';
import { BlurText } from '../motion/blur-text';
import { AppStage, type StageTask } from './app-stage';
import { Actions, PageIntro } from './page-intro';
import { type Crumb, PageTrail } from './page-trail';
import { FaqBand } from './sections';
import {
  BuildFoot,
  Head,
  Industries,
  Photo,
  PointOfView,
  Rich,
  UnderTheHood,
} from './product-parts';
import { Showcase } from '../solutions/showcase';

/**
 * A service, solution or Evolve page presented as a product — Apple's way of explaining iPhone,
 * inside Lightfield's layout. Under the page's opening and its product panel come the highlights,
 * what it is, what it does (a bento), everything included, how it compares, how it's built — with
 * how we build it and what it works with in the same panel — who it's for, the packages, why build
 * it here, and the questions with the small print beside them. Each page has its own accent.
 */

/** The figures under the hero, in a row between hairlines — where Lightfield puts its logos. */
export function Highlights({ heading, items }: ProductPage['highlights']) {
  return (
    <Band labelledBy="highlights-heading" className="py-10 lg:py-14">
      <h2 id="highlights-heading" className="sr-only">
        {heading}
      </h2>
      <dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className={`${i % 2 ? 'border-l border-line pl-5' : 'pr-5'} lg:px-8 ${i === 0 ? 'lg:pl-0' : 'lg:border-l lg:border-line'}`}
          >
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <span className="block font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-none tracking-[var(--tracking-display)] text-ink">
                {item.value}
              </span>
              <span className="mt-2 block max-w-[16rem] text-sm text-ink-2">{item.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}

/**
 * Everything included, as Apple lists a product's specifications: plain words in three columns
 * between hairlines, a small index on each — no icons, no cards, so it reads as a sheet, not a
 * wall of tiles.
 */
function SpecSheet({
  eyebrow,
  heading,
  intro,
  items,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: { title: string; body: string }[];
}) {
  return (
    <Band id="included" labelledBy="included-heading" className="py-24 lg:py-32">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2.25fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Head id="included" eyebrow={eyebrow} title={heading} intro={intro} />
        </div>
        <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.title}
              data-reveal=""
              style={{ '--i': i % 3 } as CSSProperties}
              className="border-t border-line py-5"
            >
              <dt className="flex items-baseline gap-3">
                <span className="font-tech text-[11px] text-ink-3 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[1rem] font-medium text-ink">{item.title}</span>
              </dt>
              <dd className="mt-1.5 pl-[1.9rem] text-sm leading-[1.55] text-ink-2">
                <Rich text={item.body} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Band>
  );
}

/**
 * Why build it here, on the page's one dark band: numbered columns of plain statements, as
 * Lightfield sets its "01 / 02 / 03" — a change of tone between the product and the price.
 */
function WhyBand({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro?: string;
  items: { title: string; body: string }[];
}) {
  return (
    <Band id="why" labelledBy="why-heading" className="band-night py-24 lg:py-32">
      <p data-reveal="" className="eyebrow inline-flex items-center gap-2 text-white/60">
        <span className="size-1.5 bg-white" />
        Pixel Kinetix
      </p>
      <h2
        id="why-heading"
        className="mt-5 max-w-2xl text-h2 tracking-[var(--tracking-heading)] text-white"
      >
        {heading}
      </h2>
      {intro ? <p className="mt-5 max-w-2xl text-body text-white/65">{intro}</p> : null}
      <ol className="mt-14 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={item.title}
            data-reveal=""
            style={{ '--i': i % 3 } as CSSProperties}
            className="border-t border-white/15 pt-5 pb-10"
          >
            <span className="font-tech text-xs text-white/45 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-[1.0625rem] font-medium text-white">{item.title}</h3>
            <p className="mt-1.5 max-w-xs text-sm leading-[1.55] text-white/65">
              <Rich text={item.body} />
            </p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/**
 * Why build it here, on a service page's one dark band as a grid of boxes, the way Console
 * lays out what it automates: square boxes sharing their hairlines, each its mark in a small
 * outlined square at the top left and its number at the top right, and at its foot a light title
 * and a quiet line. From 1280px the heading sits in a column beside them, so the squares stay a
 * size their words fill. Pointed at, a box lights from its corner, its mark lifts and brightens,
 * and its number and line brighten.
 */
export function WhyGrid({ heading, intro, items }: ProductPage['why']) {
  return (
    <Band id="why" labelledBy="why-heading" className="band-night py-24 lg:py-32">
      <div className="xl:grid xl:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] xl:gap-14">
        <div className="xl:sticky xl:top-28 xl:self-start">
          <p data-reveal="" className="eyebrow inline-flex items-center gap-2 text-white/60">
            <span className="size-1.5 bg-white" />
            Pixel Kinetix
          </p>
          <h2
            id="why-heading"
            className="mt-5 max-w-2xl text-h2 tracking-[var(--tracking-heading)] text-white"
          >
            {heading}
          </h2>
          {intro ? <p className="mt-5 max-w-2xl text-body text-white/65">{intro}</p> : null}
        </div>
        <ul className="why-grid mt-12 xl:mt-0">
          {items.map((item, i) => (
            <li
              key={item.title}
              data-reveal=""
              style={{ '--i': i % 3 } as CSSProperties}
              className="why-grid__cell"
            >
              <span className="flex items-start justify-between">
                <span className="why-grid__mark">
                  <Icon name={item.icon} size={22} strokeWidth={1.6} />
                </span>
                <span className="why-grid__index">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className="block">
                <h3 className="text-[1.375rem] leading-[1.2] font-light tracking-[-0.02em] text-white xl:text-[1.3125rem]">
                  {item.title}
                </h3>
                <p className="why-grid__body mt-2.5 max-w-sm text-body">
                  <Rich text={item.body} />
                </p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}

/** The tools, deduplicated by their logo, in the order the groups list them. */
const toolsOf = (groups: ProductPage['tools']['groups']) => {
  const seen = new Set<string>();
  return groups
    .flatMap((group) => group.items)
    .filter((tool) => {
      const key = logoKey(tool) ?? tool;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

/**
 * What it works with, on a service page, as the home page's industries scroll: two rows moving with the
 * page's scroll in opposite ways — the tools as white chips, each mark on a pale step of its own
 * brand's colour, and under them
 * the jobs they do, as quieter pills with a dot of colour.
 */
function ToolRows({ heading, groups }: ProductPage['tools']) {
  // Each row long enough to be wider than the widest screen, so its loop never shows a gap.
  const fill = <T,>(list: T[], at: number) => {
    const out = [...list];
    while (out.length < at) out.push(...list);
    return out;
  };
  const tools = fill(toolsOf(groups), 9);
  const repeated = fill(
    groups.map((group) => group.name),
    12,
  );
  return (
    <div id="works-with" className="mt-16 border-t border-black/[0.08] pt-12 lg:mt-20 lg:pt-14">
      <h3 id="works-with-heading" className="eyebrow text-center">
        {heading}
      </h3>
      <Pausable label="the tools" className="mt-7" buttonClassName="-top-[3.25rem] right-0">
        <div className="flex flex-col gap-3">
          <Marquee direction="left" speed={40} gap="0.75rem" className="-mt-2 -mb-7 pt-2 pb-7">
            <ul className="flex gap-3">
              {tools.map((tool, i) => (
                <li key={`${tool}-${i}`} className="sector-chip sector-chip--tool">
                  <span className="sector-chip__mark">
                    <ToolMark tool={tool} size={20} />
                  </span>
                  {tool}
                </li>
              ))}
            </ul>
          </Marquee>
          <Marquee direction="right" speed={52} gap="0.75rem" className="-mt-2 -mb-7 pt-2 pb-7">
            <ul className="flex gap-3">
              {repeated.map((job, i) => (
                <li
                  key={`${job}-${i}`}
                  className="sector-need"
                  style={
                    {
                      '--signal': [GRAPHITE, '#6b7080', GRAPHITE, '#a3a8b4', GRAPHITE][i % 5],
                    } as CSSProperties
                  }
                >
                  {job}
                </li>
              ))}
            </ul>
          </Marquee>
        </div>
      </Pausable>
    </div>
  );
}

/**
 * What it works with, as a strip of logos — Lightfield's row of customer logos, here the tools a
 * business already uses — drifting sideways on their own, faded out at both edges and paused while
 * pointed at. It closes the "how it's built" panel, under how we build it.
 */
function ToolStrip({ heading, groups }: ProductPage['tools']) {
  const tools = toolsOf(groups);
  // Enough in one row to be wider than the widest screen, so the loop never shows a gap.
  const row = tools.length < 8 ? [...tools, ...tools] : tools;
  return (
    <div id="works-with" className="mt-16 border-t border-black/[0.08] pt-12 lg:mt-20 lg:pt-14">
      <h3 id="works-with-heading" className="text-center text-sm text-ink-2">
        {heading}
      </h3>
      {/* beUI's marquee (`@beui/marquee`): the logos drift, faded at both edges, held when
          pointed at. */}
      <Marquee speed={row.length * 4} gap="3rem" className="mt-6 py-2">
        <ul className="flex shrink-0 items-center gap-12 sm:gap-16">
          {row.map((tool, i) => (
            <li
              key={`${tool}-${i}`}
              className="flex items-center gap-3 text-[1.0625rem] font-medium whitespace-nowrap text-ink"
            >
              <ToolMark tool={tool} size={30} />
              {tool}
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  );
}

/**
 * Which one is right for you: the packages side by side, Apple's compare columns — each a name,
 * a line, its price and button, then the same rows in the same order, a tick, a dash or a word.
 */
function Packages({
  eyebrow,
  price,
  children,
}: {
  eyebrow: string;
  price: ProductPage['price'];
  /** Anything that prices the product in its own way — Evolve's plans table. */
  children?: ReactNode;
}) {
  const packages = price.packages ?? [];
  const rows = price.rows ?? [];
  const columns = packages.length;
  return (
    <Band id="price" labelledBy="price-heading" className="py-24 lg:py-32">
      <Head id="price" eyebrow={eyebrow} title={price.heading} intro={price.intro} />
      <div
        hidden={!columns}
        className="mt-12 grid grid-cols-1 gap-4 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
        style={{ '--n': columns } as CSSProperties}
      >
        {packages.map((pack, i) => {
          const focal = Boolean(pack.focal);
          return (
            <article
              key={pack.name}
              data-reveal=""
              style={{ '--i': i } as CSSProperties}
              className={`flex flex-col rounded-[var(--radius-panel)] border p-7 lg:p-8 ${
                focal
                  ? 'on-night border-night bg-night text-white'
                  : 'border-line bg-white text-ink'
              }`}
            >
              <h3 className="font-display text-h4 font-medium">{pack.name}</h3>
              <p className={`mt-2 text-sm ${focal ? 'text-white/70' : 'text-ink-2'}`}>
                {pack.summary}
              </p>
              <p className="mt-6 font-display text-[clamp(1.6rem,1.3rem+0.9vw,2rem)] leading-none tracking-[var(--tracking-display)]">
                {pack.price}
              </p>
              <p className={`mt-2 text-xs ${focal ? 'text-white/60' : 'text-ink-2'}`}>
                {[pack.unit, pack.timeline].filter(Boolean).join(' · ')}
              </p>
              <RollLink
                href={startFor(pack.interest)}
                variant={focal ? 'paper' : 'line'}
                className="mt-6 w-full"
              >
                {pack.cta}
              </RollLink>
              <ul
                className={`mt-7 flex flex-col border-t ${focal ? 'border-white/15' : 'border-line'}`}
              >
                {rows.map((row, j) => {
                  const value = pack.values[j];
                  return (
                    <li
                      key={row}
                      className={`flex items-start gap-3 border-b py-3 last:border-b-0 ${focal ? 'border-white/10' : 'border-line'}`}
                    >
                      <span
                        className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${
                          value === false
                            ? focal
                              ? 'bg-white/10 text-white/40'
                              : 'bg-fill text-ink-3'
                            : focal
                              ? 'bg-white text-ink'
                              : 'bg-ink text-white'
                        }`}
                      >
                        <Icon
                          name={value === false ? 'close' : 'check'}
                          size={10}
                          strokeWidth={3}
                        />
                      </span>
                      <span className="min-w-0 text-sm">
                        <span
                          className={
                            value === false
                              ? focal
                                ? 'text-white/45'
                                : 'text-ink-3'
                              : focal
                                ? 'text-white'
                                : 'text-ink'
                          }
                        >
                          {row}
                        </span>
                        {typeof value === 'string' ? (
                          <span
                            className={`block text-xs ${focal ? 'text-white/60' : 'text-ink-2'}`}
                          >
                            {value}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
      {children ? <div className={columns ? 'mt-12' : 'mt-10'}>{children}</div> : null}
      {price.note ? (
        <p className="mt-8 max-w-2xl text-sm text-ink-2">
          <Rich text={price.note} />
        </p>
      ) : null}
      {price.notes?.length ? (
        <div className="mt-8 max-w-4xl border-t border-line pt-5">
          <h3 className="text-xs font-semibold text-ink-2">Notes on charges</h3>
          <ul className="mt-3 flex flex-col gap-2 text-xs leading-[1.6] text-ink-2">
            {price.notes.map((note) => (
              <li key={note}>
                <Rich text={note} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Band>
  );
}

/** The small print, in a quiet box under the page's questions. */
function NotesBox({ notes }: { notes: string[] }) {
  return (
    <aside
      aria-labelledby="notes-heading"
      className="max-w-sm rounded-[14px] border border-line bg-fill px-5 py-5 max-lg:max-w-none sm:px-6"
    >
      <h3 id="notes-heading" className="text-xs font-semibold text-ink-2">
        Notes
      </h3>
      <ol className="mt-3 flex list-decimal flex-col gap-2 pl-4 text-xs leading-[1.6] text-ink-2">
        {notes.map((note) => (
          <li key={note}>
            <Rich text={note} />
          </li>
        ))}
      </ol>
    </aside>
  );
}

export function ProductBody({
  page,
  eyebrow,
  tint,
  priceExtra,
  after,
  interest,
  next,
  compare = false,
  tail,
  view,
}: {
  page: ProductPage;
  /** The point of view's picture in place of its photograph: the page's isometric scene. */
  view?: ReactNode;
  /** After the questions, in the same alternation: the related pages and the closing. */
  tail?: ReactNode;
  /**
   * The comparison table. Off on the service pages, where "why build it here" says it; kept on
   * Lead Automation's v1 snapshot.
   */
  compare?: boolean;
  /** The page's `?interest=`, for "tell us what you need". */
  interest: string;
  /** The small label over each section: the service's name. */
  eyebrow: string;
  /** The page's tint, for the photograph's placeholder until the photograph exists. */
  tint: Tint;
  /** More under the price: Evolve's plans table. */
  priceExtra?: ReactNode;
  /** A section after the price and before "why": Evolve's terms. */
  after?: ReactNode;
  /**
   * A service page's layout: the product's screens on the page's tint with an outcome pill (or its
   * own mockups in their place — the features, in order, and how it's built), "why" as the dark
   * grid of boxes, the tools as the home page's scroll and the industries' marks raised. Given a
   * picture for what's included, that section is Lightfield's split: the features down the left,
   * the picture pinned beside them. With `howSplit`, how it's built is the same split as a
   * solution's benefits — its blocks down the left, its picture beside them — with how we build it
   * and the tools under both.
   */
  next?: { features?: ReactNode[]; how?: ReactNode; included?: ReactNode; howSplit?: boolean };
}) {
  // Everything below the opening is drawn in graphite on white grounds (`visuals/graphite.ts`);
  // the page's own colour stays with its opening.
  const accent = GRAPHITE;
  const wash = 'ground';
  return (
    <div className="alt-bands">
      <Highlights {...page.highlights} />
      <PointOfView
        statement={page.view.statement}
        body={page.view.body}
        photo={view ?? <Photo file={page.view.photo.file} alt={page.view.photo.alt} tint={tint} />}
      />
      <FeatureBento
        eyebrow={eyebrow}
        heading={page.features.heading}
        intro={page.features.intro}
        items={page.features.items}
        accent={accent}
        scenes={next?.features}
        tint={next ? wash : undefined}
      />
      {next?.included ? (
        <Showcase
          id="included"
          eyebrow={eyebrow}
          heading={page.included.heading}
          intro={page.included.intro}
          points={page.included.items}
          accent={accent}
          picture={next.included}
          pinned
        />
      ) : (
        <SpecSheet
          eyebrow={eyebrow}
          heading={page.included.heading}
          intro={page.included.intro}
          items={page.included.items}
        />
      )}
      {compare ? (
        <Band id="compare" labelledBy="compare-heading" className="py-24 lg:py-32">
          <Head
            id="compare"
            eyebrow={eyebrow}
            title={page.compare.heading}
            intro={page.compare.intro}
          />
          <CompareTable
            label={page.compare.heading}
            options={page.compare.options}
            us={page.compare.us}
          />
        </Band>
      ) : null}
      {next?.howSplit && next.how ? (
        <Showcase
          id="how"
          eyebrow={eyebrow}
          heading={page.how.heading}
          intro={page.how.intro}
          points={page.how.blocks.map((block) => ({ ...block, icon: block.icon ?? 'check' }))}
          accent={accent}
          picture={next.how}
          pinned
          after={<BuildFoot build={page.build} after={<ToolRows {...page.tools} />} />}
        />
      ) : next ? (
        <UnderTheHood
          bare
          eyebrow={eyebrow}
          heading={page.how.heading}
          blocks={page.how.blocks}
          scene={
            next.how ??
            (page.how.screen ? (
              <OnWash wash={wash}>
                <ScreenView screen={page.how.screen} size="lg" accent={accent} />
              </OnWash>
            ) : null)
          }
          build={page.build}
          after={<ToolRows {...page.tools} />}
        />
      ) : (
        <UnderTheHood
          eyebrow={eyebrow}
          heading={page.how.heading}
          blocks={page.how.blocks}
          scene={
            page.how.screen ? (
              <ScreenView screen={page.how.screen} size="lg" accent={accent} />
            ) : null
          }
          build={page.build}
          after={<ToolStrip {...page.tools} />}
        />
      )}
      <Industries
        eyebrow={eyebrow}
        heading={page.industries.heading}
        items={page.industries.items}
        raised={Boolean(next)}
      />
      <Packages eyebrow={eyebrow} price={page.price}>
        {priceExtra}
      </Packages>
      {after}
      {next ? (
        <WhyGrid {...page.why} />
      ) : (
        <WhyBand heading={page.why.heading} intro={page.why.intro} items={page.why.items} />
      )}
      <FaqBand
        eyebrow={eyebrow}
        title={page.faqs.heading}
        faqs={page.faqs.items}
        interest={interest}
        topic={eyebrow}
        after={page.notes?.length ? <NotesBox notes={page.notes} /> : undefined}
      />
      {tail}
    </div>
  );
}

// --- the product-page hero ---------------------------------------------------------------------

/** A dark photograph behind the stage, when it exists; until then the gradient carries it. */
function StagePhoto({ file }: { file: string }) {
  if (!existsSync(join(process.cwd(), 'public/photos', `${file}-1600.webp`))) return null;
  return (
    <picture>
      <source type="image/avif" srcSet={`/photos/${file}-1600.avif`} />
      <img
        src={`/photos/${file}-1600.webp`}
        alt=""
        width={1600}
        height={1067}
        className="absolute inset-0 size-full object-cover opacity-45"
      />
    </picture>
  );
}

/**
 * A product page's opening: the page intro — its chip, its blur-in title, its line and actions,
 * over the moving pattern — and under it the wide dark panel with the product at work.
 */
export function ProductOpening({
  page,
  eyebrow,
  title,
  intro,
  interest,
  topic,
  trail,
}: {
  page: ProductPage;
  eyebrow: string;
  title: string;
  intro: string;
  interest: string;
  topic: string;
  trail?: Crumb[];
}) {
  return (
    <>
      <PageIntro eyebrow={eyebrow} title={title} intro={intro} trail={trail}>
        <Actions>
          <RollLink href={startFor(interest)} size="lg">
            Get Started
          </RollLink>
          <RollLink href={whatsappAbout(topic)} variant="line" size="lg" external>
            Ask on WhatsApp
          </RollLink>
        </Actions>
      </PageIntro>
      {page.stage ? (
        <div className="container-fluid pb-4">
          <StagePanel stage={page.stage} accent={page.accent} />
        </div>
      ) : null}
    </>
  );
}

/**
 * The opening under test, after Lightfield's: one screen tall on a quiet grey, the words small and
 * low-key on the left — the title, a line and two actions, with a way on to the solution pinned
 * at the foot — and the product at nearly full size on the right, from just past a third of the
 * way across, running off the screen's edge and fading out at its foot under a chip that says
 * what the system is doing. Below 1024px the words come first and the product under them.
 */
export function ProductOpeningFull({
  title,
  intro,
  interest,
  topic,
  accent,
  tasks,
  note,
  ground = 'grey',
  trail,
}: {
  title: string;
  intro: string;
  interest: string;
  topic: string;
  accent: string;
  tasks: StageTask[];
  /** A way on, pinned at the foot: a dot, a label, a line and a chevron. */
  note?: { label: string; text: string; href: string };
  /**
   * What it stands on: the quiet grey it was drawn on, or white or the site's off-white — the
   * product lifted off either by a soft shadow.
   */
  ground?: 'grey' | 'white' | 'off';
  /** The steps after Home, this page last: beUI's breadcrumb above the headline. */
  trail?: Crumb[];
}) {
  return (
    <section
      aria-labelledby="page-heading"
      className={`relative overflow-hidden lg:h-[100svh] lg:min-h-[640px] ${ground === 'white' ? 'bg-white' : ground === 'off' ? 'bg-[#f5f5f7]' : 'bg-[#ececef]'}`}
    >
      <div className="container-fluid relative pt-28 sm:pt-32 lg:flex lg:h-full lg:items-center lg:pt-0">
        <div className="max-w-md lg:max-w-[min(25rem,31vw)] lg:pb-[4vh]">
          {trail ? <PageTrail trail={trail} align="start" className="rise-in -ml-2 mb-5" /> : null}
          <h1
            id="page-heading"
            className="font-display text-[clamp(1.75rem,1.45rem+0.8vw,2.125rem)] leading-[1.18] font-normal tracking-[-0.03em] text-ink"
          >
            <BlurText text={title} delay={80} />
          </h1>
          <p
            className="rise-in mt-5 text-[1rem] leading-relaxed text-ink-2"
            style={{ '--d': 420 } as CSSProperties}
          >
            {intro}
          </p>
          <div
            className="rise-in mt-7 flex flex-wrap items-center gap-2.5"
            style={{ '--d': 560 } as CSSProperties}
          >
            <RollLink href={startFor(interest)} size="sm">
              Get Started
            </RollLink>
            <RollLink href={whatsappAbout(topic)} variant="line" size="sm" external>
              Ask on WhatsApp
            </RollLink>
          </div>
        </div>
        {note ? (
          <Link
            href={note.href}
            className="rise-in mt-8 inline-flex max-w-full items-center gap-2 rounded-lg bg-black/[0.04] py-2 pr-2.5 pl-3 text-[0.8125rem] transition-colors hover:bg-black/[0.07] lg:absolute lg:bottom-10 lg:left-[var(--gutter)] lg:mt-0"
            style={{ '--d': 700 } as CSSProperties}
          >
            <span className="size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
            <span className="shrink-0 font-semibold text-ink">{note.label}</span>
            <span className="truncate text-ink-2">{note.text}</span>
            <span className="shrink-0 -rotate-90 text-ink-3">
              <Icon name="chevron" size={14} />
            </span>
          </Link>
        ) : null}
      </div>

      <AppStage
        tasks={tasks}
        accent={accent}
        lifted={ground !== 'grey'}
        className="rise-in mt-12 ml-5 h-[440px] sm:ml-6 sm:h-[540px] md:ml-8 lg:absolute lg:top-[16%] lg:right-0 lg:bottom-0 lg:left-[37.5%] lg:mt-0 lg:ml-0 lg:h-auto"
      />
    </section>
  );
}

/** The wide dark panel with the product at work: the software, the phones, the toast. */
export function StagePanel({
  stage,
  accent,
  className = '',
}: {
  stage: NonNullable<ProductPage['stage']>;
  accent: string;
  className?: string;
}) {
  const [first, second] = stage.front ?? [];
  return (
    <div
      aria-hidden="true"
      className={`relative h-[380px] overflow-hidden rounded-[1.5rem] bg-[#0c0d11] sm:h-[460px] md:h-[520px] lg:h-[600px] xl:h-[640px] ${className}`}
      style={{
        backgroundImage: `radial-gradient(70% 60% at 78% 18%, color-mix(in srgb, ${accent} 30%, transparent), transparent 70%), radial-gradient(60% 50% at 10% 100%, rgb(255 255 255 / 0.06), transparent 70%), linear-gradient(160deg, #1a1c23 0%, #0b0c10 100%)`,
      }}
    >
      {stage.photo ? <StagePhoto file={stage.photo.file} /> : null}
      {stage.back ? (
        <div className="absolute top-[12%] left-[5%]">
          <ScreenView screen={stage.back} size="lg" accent={accent} />
        </div>
      ) : null}
      {second ? (
        <div className="absolute right-[26%] -bottom-[16%] hidden origin-bottom-right scale-[0.78] lg:block xl:scale-[0.86]">
          <ScreenView screen={second} size="lg" accent={accent} />
        </div>
      ) : null}
      {first ? (
        <div className="absolute right-[4%] -bottom-[22%] origin-bottom-right scale-[0.6] sm:right-[5%] sm:-bottom-[12%] sm:scale-[0.78] lg:-bottom-[8%] lg:scale-100">
          <ScreenView screen={first} size="lg" accent={accent} />
        </div>
      ) : null}
      {stage.toast ? (
        <div className="stage-toast absolute top-[3.5%] left-[5%] flex max-w-[90%] items-center gap-2.5 rounded-full bg-white/95 py-1.5 pr-4 pl-2 text-ink shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)]">
          <span
            className="grid size-6 shrink-0 place-items-center rounded-full"
            style={{ background: accent }}
          >
            <span className="size-2 animate-pulse rounded-full bg-white" />
          </span>
          <span className="truncate text-[12px] font-semibold">{stage.toast.title}</span>
          {stage.toast.line ? (
            <span className="hidden shrink-0 text-[12px] text-ink-2 sm:inline">
              {stage.toast.line}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

// --- the features, as a bento -----------------------------------------------------------------

/** A product screen on white and a fine grid, as the home page's Services pictures sit. */
function OnWash({ children }: { wash?: string; children: ReactNode }) {
  return (
    <div className="ground ground--grid relative w-full overflow-hidden rounded-[24px] border border-line px-5 py-10 sm:px-10 sm:py-14">
      <div className="relative grid place-items-center">{children}</div>
    </div>
  );
}

/** A screen's colour below the opening: the graphite it is given (`visuals/graphite.ts`). */
const accentOf = (_screen: Screen, fallback: string) => fallback;

/**
 * Where a screen sits in its card: a phone rises from the foot of the card and is cut by it; an
 * admin starts at the top left and runs off the right and bottom edges; anything else is centred
 * near the top and may be cut at the foot — so every card reads as a crop of the real product.
 */
function BentoVisual({
  screen,
  accent,
  wide,
  centre,
  framed = false,
}: {
  screen: Screen;
  accent: string;
  wide: boolean;
  centre: boolean;
  /** On a tinted panel: set in from its top edge. */
  framed?: boolean;
}) {
  const phone = screen.kind === 'mobile' || screen.kind === 'iphone' || screen.kind === 'phone';
  const top = framed ? 'top-8' : 'top-2';
  if (isDesk(screen)) {
    return (
      <div
        className={`absolute ${top} overflow-hidden rounded-t-[10px] shadow-[0_20px_50px_-24px_rgb(11_13_18/0.35)] ring-1 ring-black/[0.08] ${centre ? 'left-1/2 -translate-x-1/2' : 'left-6 sm:left-8'}`}
      >
        <div style={{ '--accent': accentOf(screen, accent) } as CSSProperties}>
          <DeskView screen={screen} frame={wide ? 'wide' : 'hero'} />
        </div>
      </div>
    );
  }
  if (phone) {
    return (
      <div className={`absolute ${top} left-1/2 -translate-x-1/2`}>
        <ScreenView screen={screen} size="lg" accent={accent} />
      </div>
    );
  }
  return (
    <div className={`absolute inset-x-6 ${top} flex justify-center sm:inset-x-10`}>
      <div className={`w-full ${wide ? 'max-w-2xl' : 'max-w-md'}`}>
        <ScreenView screen={screen} size="md" accent={accent} />
      </div>
    </div>
  );
}

/**
 * What it does, as Lightfield lays its features out: quiet grey cards, two by two (an odd last one
 * runs the full width), each a small label, a title, two lines and a short list, with a real crop
 * of the product filling the rest of the card and cut by its edges.
 */
export function FeatureBento({
  eyebrow,
  heading,
  intro,
  items,
  accent,
  scenes,
  tint,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: ProductPage['features']['items'];
  accent: string;
  /** Mockups in place of the product's screens, card by card. */
  scenes?: ReactNode[];
  /** Set each screen on this pale tint, with the feature as an outcome pill over it. */
  tint?: string;
}) {
  return (
    <Band id="changes" labelledBy="changes-heading" className="py-24 lg:py-32">
      <Head id="changes" eyebrow={eyebrow} title={heading} intro={intro} />
      <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map((item, i) => {
          const wide = items.length % 2 === 1 && i === items.length - 1;
          return (
            <article
              key={item.title}
              data-reveal=""
              style={{ '--i': i % 2 } as CSSProperties}
              className={`bento-card flex flex-col overflow-hidden rounded-[14px] ${wide ? 'lg:col-span-2' : ''}`}
            >
              <div
                className={`px-6 pt-7 sm:px-8 sm:pt-8 ${wide ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10' : 'lg:min-h-[16rem]'}`}
              >
                <div>
                  <p className="mb-4 text-xs text-ink-3">{item.label}</p>
                  <h3 className="max-w-md text-[1.0625rem] leading-snug font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-[0.9375rem] leading-[1.55] text-ink-2">
                    <Rich text={item.body} />
                  </p>
                </div>
                <ul className={`mt-4 flex flex-col gap-1.5 ${wide ? 'lg:mt-9' : ''}`}>
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-ink-2">
                      <span className="mt-[3px] text-ink">
                        <Icon name="check" size={13} strokeWidth={2.2} />
                      </span>
                      <Rich text={point} />
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`relative mt-8 overflow-hidden ${wide ? 'h-[22rem] sm:h-[26rem] lg:h-[32rem]' : 'h-[22rem] sm:h-[26rem] lg:h-[28rem]'}`}
              >
                {scenes?.[i] ? (
                  <div className="absolute inset-x-5 top-0 bottom-5 sm:inset-x-8 sm:bottom-8">
                    {scenes[i]}
                  </div>
                ) : item.screen && tint ? (
                  <div className="ground ground--dots absolute inset-x-5 top-0 bottom-5 overflow-hidden rounded-[20px] border border-line sm:inset-x-8 sm:bottom-8">
                    <BentoVisual
                      screen={item.screen}
                      accent={accent}
                      wide={wide}
                      centre={wide}
                      framed
                    />
                    <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-[#e6e7eb] bg-white py-1.5 pr-3.5 pl-1.5 text-[12px] font-medium whitespace-nowrap text-ink shadow-[0_12px_28px_-12px_rgb(11_13_18/0.3)]">
                      <span
                        className="grid size-[22px] place-items-center rounded-full text-white"
                        style={{ background: accent }}
                      >
                        <Icon name="check" size={12} strokeWidth={2.6} />
                      </span>
                      {item.label}
                    </span>
                  </div>
                ) : item.screen ? (
                  <BentoVisual screen={item.screen} accent={accent} wide={wide} centre={wide} />
                ) : null}
              </div>
              <p className="sr-only">{item.caption}</p>
            </article>
          );
        })}
      </div>
    </Band>
  );
}

// --- related pages, as an index --------------------------------------------------------------

/**
 * Where to go next, as an index rather than another row of cards: two columns of hairline rows,
 * each a name and its line, with an arrow that moves when pointed at.
 */
export function RelatedIndex({
  id = 'related',
  eyebrow,
  heading,
  links,
  off = false,
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  links: { name: string; line: string; href: string }[];
  /** Off-white, carrying on the page's alternation after a white section. */
  off?: boolean;
}) {
  return (
    <Band
      id={id}
      labelledBy={`${id}-heading`}
      className={`py-20 lg:py-24 ${off ? 'border-t-transparent bg-[#f5f5f7]' : ''}`}
    >
      <Head id={id} eyebrow={eyebrow} title={heading} />
      <ul className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
        {links.map((link) => (
          <li key={link.href} className="border-t border-line">
            <Link href={link.href} className="group flex items-center justify-between gap-6 py-5">
              <span className="min-w-0">
                <span className="block text-[1.0625rem] font-medium text-ink">{link.name}</span>
                <span className="mt-0.5 block text-sm text-ink-2">{link.line}</span>
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-[transform,background-color,color] duration-300 group-hover:translate-x-1 group-hover:bg-ink group-hover:text-white">
                <Icon name="arrow" size={15} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}
