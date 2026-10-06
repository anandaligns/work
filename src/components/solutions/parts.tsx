import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import type { Heading } from '@/content/site';
import { startFor, whatsappAbout } from '@/content/site';
import type { ProductPage } from '@/content/products/types';

import { SectionHead } from '../home/section-head';
import { Band } from '../layout/band';
import { BlurText } from '../motion/blur-text';
import { onColour } from '../lab/light-kit';
import { ScreenView } from '../screens/screen';
import type { Screen } from '../screens/types';
import { Icon, type IconName } from '../ui/icon';
import { RollLink } from '../ui/roll-link';

/**
 * The parts of a solution's page, as a pattern of its own: a solution is a goal, so its page
 * reads as one — the goal and its drawing, where the work goes missing today, the one system
 * behind it, one customer's story told in the product's own screens, the services it's built
 * from, and the ways in.
 */

// --- the opening ---------------------------------------------------------------------------

/**
 * The words on the left — chip, blur-in title, line, actions and four facts in a row — and on the
 * right the solution's drawing, in the home page's frame on the solution's tint.
 */
export function SolutionHero({
  eyebrow,
  title,
  intro,
  interest,
  topic,
  facts,
  tint,
  scene,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  interest: string;
  topic: string;
  facts: { value: string; label: string }[];
  tint: string;
  scene: ReactNode;
}) {
  return (
    <section aria-labelledby="page-heading" className="relative">
      <div className="container-fluid grid items-center gap-14 pt-28 pb-20 sm:pt-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:pb-24">
        <div className="text-center lg:text-left">
          <p
            className="eyebrow blur-char inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5"
            style={{ '--d': 0 } as CSSProperties}
          >
            <span className="size-1.5 rounded-full bg-signal-green" />
            {eyebrow}
          </p>
          <h1
            id="page-heading"
            className="mt-6 text-title tracking-[var(--tracking-heading)] text-ink"
          >
            <BlurText text={title} delay={120} />
          </h1>
          <p
            className="rise-in mx-auto mt-5 max-w-xl text-lead text-ink-2 lg:mx-0 lg:max-w-md"
            style={{ '--d': 520 } as CSSProperties}
          >
            {intro}
          </p>
          <div
            className="rise-in mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{ '--d': 680 } as CSSProperties}
          >
            <RollLink href={startFor(interest)} size="lg">
              Get Started
            </RollLink>
            <RollLink href={whatsappAbout(topic)} variant="line" size="lg" external>
              Ask on WhatsApp
            </RollLink>
          </div>
          <dl
            className="rise-in mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-7 text-left sm:grid-cols-4"
            style={{ '--d': 820 } as CSSProperties}
          >
            {facts.map((fact) => (
              <div key={fact.value} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-xs leading-snug text-ink-2">{fact.label}</dt>
                <dd className="font-display text-[1.375rem] leading-none font-medium tracking-[-0.02em] text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          aria-hidden="true"
          className="rise-in"
          style={{ '--d': 300, '--tint': tint } as CSSProperties}
        >
          <div className="ground ground--dots relative overflow-hidden rounded-[1.75rem] border border-line">
            <div className="relative grid h-[18rem] place-items-center p-8 sm:h-[26rem] sm:p-12 lg:h-[30rem] [&_svg]:max-h-full [&_svg]:max-w-[34rem]">
              {scene}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- where the work goes missing -------------------------------------------------------------

/** Each place the goal slips today, what it looks like now, crossed out, and what replaces it. */
export function Leaks({
  heading,
  intro,
  items,
  accent,
}: {
  heading: Heading;
  intro: string;
  items: { topic: string; without: string; with: string }[];
  accent: string;
}) {
  return (
    <Band id="missing" labelledBy="missing-heading" className="py-24 lg:py-32">
      <SectionHead
        id="missing"
        eyebrow="Where enquiries go missing"
        heading={heading}
        intro={intro}
      />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={item.topic}
            data-reveal=""
            style={{ ['--i' as string]: i }}
            className="bento-card flex flex-col rounded-3xl p-7"
          >
            <p className="eyebrow">{item.topic}</p>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-3 line-through decoration-ink-3/40">
              {item.without}
            </p>
            <span aria-hidden="true" className="my-4 h-px w-10 bg-line-2" />
            <p className="mt-auto flex items-start gap-2.5 font-medium text-ink">
              <span className="mt-[3px] shrink-0" style={{ color: accent }}>
                <Icon name="check" size={16} strokeWidth={2.4} />
              </span>
              {item.with}
            </p>
          </li>
        ))}
      </ul>
    </Band>
  );
}

// --- one customer's story ------------------------------------------------------------------

/**
 * The goal met once, step by step: a line of times across the top, and under each the moment in
 * the product's own screen, rising from the foot of its card. A row on a wide screen; a row that
 * scrolls sideways on a phone.
 */
export function Journey({
  eyebrow,
  heading,
  intro,
  steps,
  accent,
  ground,
}: {
  eyebrow: string;
  heading: Heading;
  intro: string;
  steps: { time: string; title: string; text: string; screen: Screen }[];
  accent: string;
  /** The phones' panel: the page's tint with its dot grid, as the service pages' mockups sit. */
  ground?: string;
}) {
  return (
    <Band id="story" labelledBy="story-heading" className="overflow-hidden py-24 lg:py-32">
      <SectionHead id="story" eyebrow={eyebrow} heading={heading} intro={intro} />
      <ol className="-mx-[var(--gutter)] mt-14 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-reveal=""
            style={{ ['--i' as string]: i }}
            className="relative flex w-[78%] shrink-0 snap-start flex-col sm:w-[46%] lg:w-auto"
          >
            <div className="flex items-center gap-3">
              <span
                className="grid size-7 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold"
                style={{ background: accent, color: onColour(accent) }}
              >
                {i + 1}
              </span>
              <span className="font-tech text-xs font-semibold tracking-[var(--tracking-label)] text-ink uppercase">
                {step.time}
              </span>
              {i < steps.length - 1 ? (
                <span aria-hidden="true" className="h-px flex-1 bg-line-2" />
              ) : null}
            </div>
            <h3 className="mt-5 text-[1.1875rem] leading-snug font-semibold tracking-[-0.01em] text-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{step.text}</p>
            <div
              aria-hidden="true"
              className="ground ground--grid relative mt-6 h-[300px] overflow-hidden rounded-3xl border border-line sm:h-[340px]"
              data-ground={ground ? 'page' : undefined}
            >
              <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <div className="origin-top scale-[0.82]">
                  <ScreenView screen={step.screen} size="lg" accent={accent} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}

// --- what it's built from ------------------------------------------------------------------

/** Across the row from 1024px, one column for each service. */
const COLS: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
};

/** The services behind the goal, joined by pluses, and what they add up to. */
export function BuiltFrom({
  eyebrow,
  heading,
  intro,
  services,
  name,
  line,
}: {
  eyebrow: string;
  heading: Heading;
  intro: string;
  services: { name: string; line: string; href: string; icon: IconName }[];
  /** What they add up to, in a dark bar under the cards; no bar without it. */
  name?: string;
  line?: string;
}) {
  return (
    <Band id="built-from" labelledBy="built-from-heading" className="py-24 lg:py-32">
      <SectionHead id="built-from" eyebrow={eyebrow} heading={heading} intro={intro} />
      <ul
        className={`mt-14 grid gap-3 sm:grid-cols-2 ${COLS[services.length] ?? 'lg:grid-cols-5'}`}
      >
        {services.map((service, i) => (
          <li
            key={service.href}
            className="relative"
            data-reveal=""
            style={{ ['--i' as string]: i }}
          >
            <Link
              href={service.href}
              className="bento-card group flex h-full items-start gap-4 rounded-3xl p-5 transition-transform duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 sm:flex-col sm:gap-0 sm:p-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-ink">
                <Icon name={service.icon} size={20} />
              </span>
              <span className="flex min-w-0 flex-col sm:mt-6">
                <span className="font-semibold text-ink">{service.name}</span>
                <span className="mt-1 text-sm leading-relaxed text-ink-2 sm:mt-2">
                  {service.line}
                </span>
              </span>
              <span className="ml-auto shrink-0 self-center text-ink-3 transition-colors group-hover:text-ink sm:mt-auto sm:ml-0 sm:self-start sm:pt-6">
                <Icon name="arrow" size={16} />
              </span>
            </Link>
            {i < services.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -right-5 z-10 hidden size-7 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-ink lg:grid"
              >
                <Icon name="plus" size={13} strokeWidth={2.2} />
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      {name ? (
        <div className="on-night mt-3 flex flex-col gap-4 rounded-3xl bg-night p-6 text-white sm:flex-row sm:items-center sm:gap-6 sm:p-7">
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 font-display text-2xl leading-none"
          >
            =
          </span>
          <p className="font-display text-[1.375rem] font-medium tracking-[-0.02em]">{name}</p>
          <p className="text-white/65 sm:ml-auto">{line}</p>
        </div>
      ) : null}
    </Band>
  );
}

// --- the ways in ---------------------------------------------------------------------------

/**
 * The packages as two cards, the focal one on ink: each with its price, its time and every row
 * of the comparison it includes — a tick's row as it is, a worded value after its row.
 */
export function WaysIn({
  eyebrow,
  heading,
  intro,
  price,
  accent,
}: {
  eyebrow: string;
  heading: Heading;
  intro?: string;
  price: ProductPage['price'];
  accent: string;
}) {
  const rows = price.rows ?? [];
  return (
    <Band id="ways-in" labelledBy="ways-in-heading" className="py-24 lg:py-32">
      <SectionHead id="ways-in" eyebrow={eyebrow} heading={heading} intro={intro} />
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {(price.packages ?? []).map((pkg) => {
          const dark = pkg.focal;
          const includes = rows.flatMap((row, i) => {
            const value = pkg.values[i];
            if (value === false || value === undefined) return [];
            return [{ row, detail: typeof value === 'string' ? value : undefined }];
          });
          return (
            <article
              key={pkg.name}
              aria-labelledby={`${pkg.interest}-name`}
              className={`flex flex-col rounded-[2rem] p-8 lg:p-10 ${dark ? 'on-night bg-night text-white' : 'border border-line bg-white text-ink'}`}
            >
              <h3
                id={`${pkg.interest}-name`}
                className="font-display text-[1.5rem] font-medium tracking-[-0.02em]"
              >
                {pkg.name}
              </h3>
              <p className={`mt-2 max-w-md ${dark ? 'text-white/70' : 'text-ink-2'}`}>
                {pkg.summary}
              </p>
              <p className="mt-8 font-display text-[2.5rem] leading-none font-medium tracking-[-0.03em]">
                {pkg.price}
              </p>
              <p className={`mt-2 text-sm ${dark ? 'text-white/60' : 'text-ink-3'}`}>
                {[pkg.unit, pkg.timeline].filter(Boolean).join(' · ')}
              </p>
              <ul
                className={`mt-8 flex flex-col gap-3 border-t pt-8 text-[0.9375rem] ${dark ? 'border-white/10' : 'border-line'}`}
              >
                {includes.map(({ row, detail }) => (
                  <li key={row} className="flex items-start gap-3">
                    <span className="mt-[3px] shrink-0" style={{ color: dark ? '#fff' : accent }}>
                      <Icon name="check" size={16} strokeWidth={2.4} />
                    </span>
                    <span>
                      {row}
                      {detail ? (
                        <span className={dark ? 'text-white/55' : 'text-ink-3'}> · {detail}</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <RollLink href={startFor(pkg.interest)} variant={dark ? 'paper' : 'ink'}>
                  {pkg.cta}
                </RollLink>
              </div>
            </article>
          );
        })}
      </div>
      {price.notes?.length ? (
        <div className="mt-6 flex flex-col gap-2 text-sm text-ink-3">
          {price.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      ) : null}
    </Band>
  );
}
