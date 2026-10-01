import type { CSSProperties, ReactNode } from 'react';

import { startFor, whatsappAbout } from '@/content/site';

import { Band } from '../layout/band';
import { BlurText } from '../motion/blur-text';
import { ToolMark, logoKey } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';
import { RollLink } from '../ui/roll-link';
import { GlowPanel, lit } from './kit';

/**
 * The sections of the pages under test, laid out after Alia's: a centred heading set big and
 * bold with its last words in the page's colour; the numbers on the night; the system behind it
 * in three cards; the tools in one moving row; and the closing on the night with three promises.
 * Our colours throughout — the night, white, our greys and the page's accent.
 */

/** A section's heading, centred, big and bold, its `fill` in the page's colour. */
export function LabHead({
  id,
  eyebrow,
  lead,
  fill,
  sub,
  accent,
  tone = 'paper',
  align = 'center',
  as: Tag = 'h2',
}: {
  id: string;
  eyebrow?: string;
  lead: string;
  fill?: string;
  sub?: string;
  accent: string;
  tone?: 'paper' | 'night';
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
}) {
  const night = tone === 'night';
  const centred = align === 'center';
  return (
    <div className={centred ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {eyebrow ? (
        <p
          data-reveal=""
          className={`eyebrow inline-flex items-center gap-2 ${night ? 'text-white/65' : ''}`}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ background: night ? lit(accent) : accent }}
          />
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={`${id}-heading`}
        className={`mt-5 font-display text-[clamp(2.25rem,1.45rem+2.6vw,3.75rem)] leading-[1.03] font-bold tracking-[-0.04em] text-balance ${night ? 'text-white' : 'text-ink'}`}
      >
        {lead}
        {fill ? (
          <>
            {' '}
            <span style={{ color: night ? lit(accent) : accent }}>{fill}</span>
          </>
        ) : null}
      </Tag>
      {sub ? (
        <p
          data-reveal=""
          className={`mt-5 text-body ${centred ? 'mx-auto max-w-xl' : 'max-w-lg'} ${night ? 'text-white/65' : 'text-ink-2'}`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

/** A band on the night, lit softly from one corner in the page's colour. */
export function NightBand({
  id,
  accent,
  className = '',
  children,
}: {
  id: string;
  accent: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`band band-night on-night relative overflow-hidden text-white ${className}`}
      style={{
        backgroundImage: `radial-gradient(45% 60% at 12% 30%, color-mix(in srgb, ${accent} 20%, transparent), transparent 72%), linear-gradient(180deg, #11131a 0%, #0b0d12 100%)`,
      }}
    >
      <div className="container-fluid relative">{children}</div>
    </section>
  );
}

/** The numbers, big, on the night. */
export function StatsBand({
  heading,
  items,
  accent,
}: {
  heading: string;
  items: { value: string; label: string }[];
  accent: string;
}) {
  return (
    <NightBand id="at-a-glance" accent={accent} className="py-20 lg:py-24">
      <h2
        id="at-a-glance-heading"
        className="text-center font-display text-[clamp(1.375rem,1.1rem+0.8vw,1.75rem)] font-medium tracking-[-0.02em] text-white/90"
      >
        {heading}
      </h2>
      <dl className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.value}
            data-reveal=""
            style={{ ['--i' as string]: i }}
            className="flex flex-col-reverse items-center gap-3 text-center"
          >
            <dt className="max-w-[15rem] text-sm leading-relaxed text-white/60">{item.label}</dt>
            <dd
              className="font-display text-[clamp(1.875rem,1.3rem+1.7vw,3rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap"
              style={{ color: lit(accent) }}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </NightBand>
  );
}

/**
 * The system behind it: three cards, each a dark panel with its piece of the product, a name, a
 * line and the way on — full width, as Alia sets them.
 */
export function SystemCards({
  id = 'behind',
  head,
  cards,
  accent,
}: {
  id?: string;
  head: ReactNode;
  cards: { scene: ReactNode; title: string; body: string; cta: { label: string; href: string } }[];
  accent: string;
}) {
  return (
    <Band id={id} labelledBy={`${id}-heading`} className="py-24 lg:py-32">
      {head}
      <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6 lg:mt-16">
        {cards.map((card, i) => (
          <li
            key={card.title}
            data-reveal=""
            style={{ ['--i' as string]: i }}
            className="flex flex-col"
          >
            <GlowPanel
              accent={accent}
              corner={i % 2 ? 'right' : 'left'}
              className="h-[300px] rounded-[22px] lg:h-[340px]"
            >
              {card.scene}
            </GlowPanel>
            <h3 className="mt-7 font-display text-[1.75rem] leading-tight font-medium tracking-[-0.03em] text-ink">
              {card.title}
            </h3>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">{card.body}</p>
            <div className="mt-auto pt-7">
              <RollLink href={card.cta.href} className="w-full">
                {card.cta.label}
              </RollLink>
            </div>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/** The tools it works with, big, in one moving row with fading edges. */
export function StackMarquee({
  head,
  tools,
  cta,
}: {
  head: ReactNode;
  tools: string[];
  cta?: { label: string; href: string; external?: boolean };
}) {
  const seen = new Set<string>();
  const unique = tools.filter((tool) => {
    const key = logoKey(tool) ?? tool;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const row = unique.length < 8 ? [...unique, ...unique] : unique;
  const list = (copy: boolean) => (
    <ul
      aria-hidden={copy || undefined}
      className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20"
    >
      {row.map((tool, i) => (
        <li
          key={`${tool}-${i}`}
          className="flex items-center gap-3.5 font-display text-[1.375rem] font-bold tracking-[-0.02em] whitespace-nowrap text-ink sm:text-[1.625rem]"
        >
          <ToolMark tool={tool} size={34} />
          {tool}
        </li>
      ))}
    </ul>
  );
  return (
    <Band id="stack" labelledBy="stack-heading" className="overflow-hidden py-24 lg:py-28">
      {head}
      <div
        className="marquee -mx-[var(--gutter)] mt-12"
        style={{ '--marquee-duration': `${row.length * 4}s` } as CSSProperties}
      >
        <div className="marquee__track py-3">
          {list(false)}
          {list(true)}
        </div>
      </div>
      {cta ? (
        <div className="mt-12 flex justify-center">
          <RollLink href={cta.href} external={cta.external}>
            {cta.label}
          </RollLink>
        </div>
      ) : null}
    </Band>
  );
}

/** The closing, on the night: the ask with its last words in the page's colour, three promises. */
export function CtaBand({
  lead,
  fill,
  sub,
  promises,
  interest,
  topic,
  accent,
}: {
  lead: string;
  fill: string;
  sub: string;
  promises: { icon: IconName; title: string }[];
  interest: string;
  topic: string;
  accent: string;
}) {
  return (
    <NightBand id="start-here" accent={accent} className="py-24 lg:py-32">
      <LabHead id="start-here" lead={lead} fill={fill} sub={sub} accent={accent} tone="night" />
      <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-4">
        {promises.map((promise) => (
          <li
            key={promise.title}
            className="flex items-center gap-3 text-[1rem] font-medium text-white"
          >
            <span
              className="grid size-9 place-items-center rounded-full text-[#0b0d12]"
              style={{ background: lit(accent) }}
            >
              <Icon name={promise.icon} size={16} />
            </span>
            {promise.title}
          </li>
        ))}
      </ul>
      <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
        <RollLink href={startFor(interest)} variant="paper" size="lg">
          Get Started
        </RollLink>
        <RollLink href={whatsappAbout(topic)} variant="ghost" size="lg" external>
          Ask on WhatsApp
        </RollLink>
      </div>
    </NightBand>
  );
}

/**
 * A solution's opening, after Alia's: the night lit from a lower corner in the page's colour, a
 * big bold centred title, a line, two actions, and the tools it works with moving along the foot.
 */
export function CentreHero({
  eyebrow,
  title,
  intro,
  interest,
  topic,
  accent,
  tools,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  interest: string;
  topic: string;
  accent: string;
  tools: string[];
}) {
  const row = [...tools, ...tools];
  const list = (copy: boolean) => (
    <ul aria-hidden={copy || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {row.map((tool, i) => (
        <li
          key={`${tool}-${i}`}
          className="flex items-center gap-3 font-display text-[1.25rem] font-bold tracking-[-0.02em] whitespace-nowrap text-white/80"
        >
          <span className="grid size-9 place-items-center rounded-[10px] bg-white">
            <ToolMark tool={tool} size={20} />
          </span>
          {tool}
        </li>
      ))}
    </ul>
  );
  return (
    <section
      aria-labelledby="page-heading"
      className="on-night relative mt-[3.4375rem] overflow-hidden bg-night text-white"
      style={{
        backgroundImage: `radial-gradient(70% 90% at 0% 100%, color-mix(in srgb, ${accent} 60%, transparent), transparent 62%), radial-gradient(50% 55% at 100% 0%, color-mix(in srgb, ${accent} 16%, transparent), transparent 70%), linear-gradient(160deg, #171b28 0%, #0b0d12 70%)`,
      }}
    >
      <div className="container-fluid relative flex min-h-[80svh] flex-col items-center justify-center pt-20 pb-16 text-center">
        <p
          className="eyebrow blur-char inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-white/80"
          style={{ '--d': 0 } as CSSProperties}
        >
          <span className="size-1.5 rounded-full" style={{ background: lit(accent) }} />
          {eyebrow}
        </p>
        <h1
          id="page-heading"
          className="mt-7 max-w-4xl font-display text-[clamp(3rem,1.8rem+4.6vw,5.75rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance"
        >
          <BlurText text={title} delay={120} />
        </h1>
        <p
          className="rise-in mt-7 max-w-xl text-lead text-white/70"
          style={{ '--d': 520 } as CSSProperties}
        >
          {intro}
        </p>
        <div
          className="rise-in mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ '--d': 680 } as CSSProperties}
        >
          <RollLink href={startFor(interest)} variant="paper" size="lg">
            Get Started
          </RollLink>
          <RollLink href={whatsappAbout(topic)} variant="ghost" size="lg" external>
            Ask on WhatsApp
          </RollLink>
        </div>
      </div>
      <div className="relative pb-14">
        <p className="text-center font-tech text-[11px] font-semibold tracking-[0.16em] text-white/55 uppercase">
          Works with the tools you already use
        </p>
        <div
          className="marquee mt-6"
          style={{ '--marquee-duration': `${row.length * 3.5}s` } as CSSProperties}
        >
          <div className="marquee__track py-2">
            {list(false)}
            {list(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
