'use client';

import Link from 'next/link';
import { type ComponentType, type CSSProperties, useEffect, useRef, useState } from 'react';

import { BouncyAccordion } from '@/components/motion/bouncy-accordion';
import { headings, solutions } from '@/content/site';
import { useAnchor } from '@/lib/anchor';

import * as Lead from '../showcase/cards/lead-automation';
import * as Run from '../showcase/cards/business-dashboard-crm';
import * as Sell from '../showcase/cards/online-store-and-bookings';
import * as Keep from '../showcase/cards/website-care-hosting';
import { Icon, type IconName, iconFor } from '../ui/icon';
import { Lucide, MENU_ICONS } from '../ui/lucide';
import { ScreenThumb } from '../visuals/project-fan';
import { SectionHead } from './section-head';

/**
 * The four solutions: a list on the left, the open solution's screens on the right.
 *
 * One solution is always open — the first, until the reader opens another, which closes it; the
 * open one can't be shut. Every solution says the same amount (a line under its name, two lines of
 * what it does, its two bundles on a line each, the way to its page), so the list stands at one
 * height whichever is open, and the picture beside it is measured to that height and kept there.
 *
 * It is beUI's bouncy accordion (`@beui/bouncy-accordion`), as the FAQ is. The picture is three of
 * the solution's own screens — the ones its page fans — in its colour, the middle one in front, with
 * the result they add up to; it repeats what the row says, so it is hidden from assistive tech.
 * Below 1024px there is no right: the open card carries its own picture, under its words.
 */

type Copy = {
  /** Two lines of what it does — every solution's the same length. */
  does: string;
  accent: string;
  tint: string;
  screens: [ComponentType, ComponentType, ComponentType];
  result: { icon: IconName; title: string; meta: string };
};

const COPY: Record<string, Copy> = {
  'lead-automation': {
    does: 'Every enquiry from your site, ads and WhatsApp lands in one place and gets a reply in seconds, day or night.',
    accent: '#166534',
    tint: 'var(--color-tint-mint)',
    screens: [Lead.Sources, Lead.Reply, Lead.Record],
    result: { icon: 'check', title: 'Priya answered in 8 s', meta: 'Quote sent on WhatsApp' },
  },
  'online-store-and-bookings': {
    does: 'Sell products and take bookings online, paid upfront, with confirmations and reminders sent on WhatsApp.',
    accent: '#0369a1',
    tint: 'var(--color-tint-sky)',
    screens: [Sell.Checkout, Sell.Shop, Sell.Told],
    result: { icon: 'rupee', title: '₹6,450 paid by UPI', meta: 'A vase and two seats, confirmed' },
  },
  'business-dashboard-crm': {
    does: 'Your leads, sales, bookings and payments in one dashboard, so the whole team works from the same numbers.',
    accent: '#4f46e5',
    tint: 'var(--color-tint-violet)',
    screens: [Run.Outlets, Run.Monday, Run.Flags],
    result: { icon: 'chart', title: 'Sales yesterday ₹1.86 L', meta: 'Up 9% across every outlet' },
  },
  'website-care-hosting': {
    does: 'We host, watch, back up and keep improving your site every month, so it stays fast, safe and up to date.',
    accent: '#be185d',
    tint: 'var(--color-tint-blush)',
    screens: [Keep.Move, Keep.Night, Keep.Changes],
    result: { icon: 'shield', title: 'All systems normal', meta: 'Backed up tonight at 2:00 am' },
  },
};

const copyOf = (slug?: string) => (slug ? COPY[slug] : undefined);

export function Solutions() {
  const [active, setActive] = useState(0);
  const mountedAt = useRef(0);
  const list = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  // The list's height, once it has settled: every solution says the same amount, so this is the
  // height it keeps, and the picture is held to it. Mid-spring heights are let pass.
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    let timer = 0;
    const settle = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setHeight(Math.round(el.offsetHeight)), 700);
    };
    setHeight(Math.round(el.offsetHeight));
    void document.fonts?.ready.then(settle);
    const observer = new ResizeObserver(settle);
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // Sent here for one of a solution's bundles (from a menu, or a link with its hash): open that
  // solution, and bring the bundle back into view once the rows settle.
  const anchor = useAnchor();
  useEffect(() => {
    const at = solutions.findIndex((s) => s.bundles.some((b) => `#${b.anchor}` === anchor));
    if (at < 0) return;
    setActive(at);
    if (performance.now() - mountedAt.current > 1500) return;
    const timer = window.setTimeout(() => {
      const target = document.getElementById(anchor.slice(1));
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      if (top >= 88 && top <= window.innerHeight * 0.75) return;
      const lenis = (
        window as Window & {
          __lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void };
        }
      ).__lenis;
      if (lenis) lenis.scrollTo(target, { offset: -120 });
      else window.scrollTo({ top: window.scrollY + top - 120 });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [anchor]);

  const current = solutions[active];

  return (
    <div className="mt-14 grid items-start gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-14">
      {/* The open card stands apart from the closed ones by one gap at either end of the list and by
          two in its middle; the end positions take the second gap as padding, so the list's height
          never changes. */}
      <div
        ref={list}
        className="min-w-0 transition-[padding] duration-500"
        style={{ paddingBottom: active === 0 || active === solutions.length - 1 ? '0.75rem' : 0 }}
      >
        <BouncyAccordion
          value={current?.slug ?? solutions[0]!.slug}
          collapsible={false}
          onValueChange={(slug) => {
            // The open one can't be shut: a press on it leaves it open.
            if (!slug) return;
            const at = solutions.findIndex((s) => s.slug === slug);
            if (at >= 0) setActive(at);
          }}
          classNames={SOL_CLASSES}
          items={solutions.map((solution, i) => {
            const copy = copyOf(solution.slug);
            const accent = copy?.accent ?? 'var(--color-ink)';
            return {
              id: solution.slug,
              title: (
                <span className="flex min-w-0 flex-col">
                  <span className="sol-acc__name">{solution.name}</span>
                  <span className="sol-acc__line">{solution.line}</span>
                </span>
              ),
              icon: (
                <span
                  className="sol-acc__mark"
                  style={{ '--tint': copy?.tint, '--accent': accent } as CSSProperties}
                >
                  <Lucide name={MENU_ICONS[solution.slug] ?? 'layers'} size={18} />
                </span>
              ),
              description: (
                <div style={{ '--accent': accent } as CSSProperties}>
                  <p className="sol-acc__does">{copy?.does}</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {solution.bundles.slice(0, 2).map((bundle) => (
                      <li
                        key={bundle.anchor}
                        id={bundle.anchor}
                        className="sol-acc__bundle flex scroll-mt-40 items-center gap-3"
                      >
                        <span className="sol-acc__bundle-mark grid size-8 shrink-0 place-items-center rounded-[9px]">
                          <Icon name={iconFor(bundle.anchor)} size={14} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-ink">
                            {bundle.name}
                          </span>
                          <span className="block truncate text-xs text-ink-2">
                            {bundle.includes.slice(0, 4).join(' · ')}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <Link href={`/solutions/${solution.slug}`} className="sol-acc__cta group">
                      Explore {solution.name}
                      <span className="grid size-6 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                        <Icon name="arrow" size={12} />
                      </span>
                    </Link>
                    <span className="font-mono text-[11px] tracking-[0.14em] text-ink-3">
                      0{i + 1} / 0{solutions.length}
                    </span>
                  </div>
                  {i === active ? <Stage slug={solution.slug} inline /> : null}
                </div>
              ),
            };
          })}
        />
      </div>

      <Stage slug={current?.slug} height={height} />
    </div>
  );
}

/** The site's look on beUI's accordion: white rows on a hairline, a tinted glyph, our type. */
const SOL_CLASSES = {
  root: 'sol-acc',
  item: 'sol-acc__item',
  trigger: 'min-h-0 gap-4 py-5 sm:px-6',
  icon: 'size-10',
  title: 'sol-acc__title whitespace-normal!',
  chevron: 'sol-acc__chevron',
  description: 'pb-2 sm:pr-1 sm:pl-[3.5rem]',
};

/**
 * The picture: three of the solution's screens on its colour — the first and last tilted behind,
 * the middle one in front — and the result card over them. They rise in when the solution opens
 * and drift gently while it stays. Beside the list from 1024px, held to the list's height;
 * `inline`, inside the open card below that.
 */
function Stage({
  slug,
  height,
  inline = false,
}: {
  slug?: string;
  height?: number | null;
  inline?: boolean;
}) {
  const copy = copyOf(slug);
  const box = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const sight = new IntersectionObserver(([entry]) => setPlay(Boolean(entry?.isIntersecting)), {
      threshold: 0.15,
    });
    sight.observe(el);
    return () => sight.disconnect();
  }, []);

  if (!copy) return null;
  const [Left, Middle, Right] = copy.screens;
  const style = {
    '--accent': copy.accent,
    background: `radial-gradient(70% 60% at 50% 18%, color-mix(in srgb, ${copy.accent} 20%, white), transparent 72%), radial-gradient(60% 50% at 90% 100%, color-mix(in srgb, ${copy.accent} 12%, transparent), transparent 70%), color-mix(in srgb, ${copy.accent} 6%, white)`,
    ...(inline || !height ? {} : { height, '--stage-h': `${height}px` }),
  } as CSSProperties;

  return (
    <div
      ref={box}
      aria-hidden="true"
      data-play={play || undefined}
      className={`sol-stage relative overflow-hidden border border-line ${
        inline
          ? 'mt-6 h-[22rem] rounded-2xl sm:h-[26rem] lg:hidden'
          : 'hidden min-h-[34rem] rounded-[1.5rem] lg:sticky lg:top-24 lg:block'
      }`}
      style={style}
    >
      <div key={slug} className="absolute inset-0">
        <span
          className="sol-stage__slot sol-stage__slot--left"
          style={{ '--d': 0 } as CSSProperties}
        >
          <span className="sol-stage__card">
            <ScreenThumb accent={copy.accent} live={play}>
              <Left />
            </ScreenThumb>
          </span>
        </span>
        <span
          className="sol-stage__slot sol-stage__slot--right"
          style={{ '--d': 1 } as CSSProperties}
        >
          <span className="sol-stage__card">
            <ScreenThumb accent={copy.accent} live={play}>
              <Right />
            </ScreenThumb>
          </span>
        </span>
        <span
          className="sol-stage__slot sol-stage__slot--middle"
          style={{ '--d': 2 } as CSSProperties}
        >
          <span className="sol-stage__card">
            <ScreenThumb accent={copy.accent} live={play}>
              <Middle />
            </ScreenThumb>
          </span>
        </span>
        <span className="sol-stage__result" style={{ '--d': 3 } as CSSProperties}>
          <span className="sol-stage__result-mark grid size-9 shrink-0 place-items-center rounded-[10px]">
            <Icon name={copy.result.icon} size={16} strokeWidth={2} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-ink">
              {copy.result.title}
            </span>
            <span className="block truncate text-[11.5px] text-ink-2">{copy.result.meta}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

export function SolutionsHead() {
  return (
    <SectionHead
      id="solutions"
      eyebrow="Solutions"
      heading={headings.solutions}
      intro="Each solution puts the right services together for one goal, so you don’t have to pick them one by one."
      align="center"
    />
  );
}
