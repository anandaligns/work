'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/motion/collapsible';
import { SharedLayoutBg } from '@/components/motion/shared-layout-bg';
import { categories, evolve, nav, solutions, START, startFor } from '@/content/site';
import { announceAnchor, useAnchor } from '@/lib/anchor';

import { Icon } from '../ui/icon';
import { Lucide, type LucideName, MENU_ICONS } from '../ui/lucide';
import { Logo } from '../ui/logo';
import { RollLabel, RollLink } from '../ui/roll-link';

type MenuKey = 'services' | 'solutions';

/** The section each nav item stands for on the home page. About and Contact are pages. */
const SECTION_OF: Record<string, string> = {
  Home: 'top',
  Services: 'services',
  Solutions: 'solutions',
  Work: 'work',
  Pricing: 'pricing',
};

/** Off the home page, the nav item whose pages the visitor is on. */
const PAGES_OF: Record<string, string> = {
  Services: '/services',
  Solutions: '/solutions',
  About: '/about',
  Contact: '/contact',
};

/** Every service group, service and Evolve has its own page. */
const serviceHref = (slug: string) => `/services/${slug}`;

/**
 * The header — Apple's global bar, in this site's type.
 *
 * One frosted strip, 70px tall: the lockup — the symbol and the name typed in one lowercase word —
 * on the left, the seven items centred on the page, each in full ink with its words rolling under
 * the pointer, and the call to action on the right. It never changes shape and draws no line
 * under itself. The lockup's pixel turns a quarter each time the reader enters a new section.
 *
 * Services and Solutions open flyouts: full-width sheets of the bar's own light, drawn down from
 * under it while the page behind dims and softens out of focus. Inside is Alia's flat menu: every
 * item a glyph, a name, a line and a tilted arrow that rolls, four to a row, a soft grey behind the
 * one under the pointer, and a foot with the way to everything.
 * They open on hover and on focus, close on Escape with focus handed back to the trigger, and
 * only one is ever open; moving from one to the other swaps the contents in place.
 */
export function Header() {
  const ids = useId();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [swap, setSwap] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [sheetSection, setSheetSection] = useState<MenuKey | null>(null);
  const [section, setSection] = useState<string>('top');
  const openRef = useRef<MenuKey | null>(null);
  const triggers = useRef(new Map<MenuKey, HTMLButtonElement | null>());
  const closeTimer = useRef<number | undefined>(undefined);
  const header = useRef<HTMLElement>(null);
  const burger = useRef<HTMLButtonElement>(null);

  /**
   * The menu item for where the visitor is: the service or bundle they last went to, for as long
   * as they are still in its section.
   */
  const anchor = useAnchor();
  const here = (href: string, menu: MenuKey) =>
    anchor !== '' && href.endsWith(anchor) && section === menu;

  /** The nav item for where the visitor is: a section on the home page, a page anywhere else. */
  const pathname = usePathname();
  const home = pathname === '/';
  // On a service or solution page, Get Started tells the form which one.
  const start = startFor(/^\/(?:services|solutions)\/([a-z0-9-]+)$/.exec(pathname)?.[1]);
  const isCurrent = (label: string) => {
    if (home) return SECTION_OF[label] === section;
    const root = PAGES_OF[label];
    return root !== undefined && (pathname === root || pathname.startsWith(`${root}/`));
  };

  /**
   * Which section is under the header, for a one-page site: the last section whose top has
   * passed a line 35% down the viewport. Sections with no nav item (the FAQ, the portal) mark
   * nothing, which is honest: the reader is somewhere the menu does not name.
   */
  useEffect(() => {
    const sectionIds = [
      'services',
      'solutions',
      'work',
      'promises',
      'process',
      'portal',
      'pricing',
      'reviews',
      'faq',
      'start',
    ];
    let queued = false;
    const measure = () => {
      queued = false;
      const line = window.innerHeight * 0.35;
      let current = 'top';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setSection(current);
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const show = useCallback((key: MenuKey | null) => {
    // Straight from one open menu to the other, the sheet stays down and only its contents change.
    setSwap(key !== null && openRef.current !== null && openRef.current !== key);
    openRef.current = key;
    setOpen(key);
  }, []);

  const close = useCallback(
    (refocus: boolean) => {
      if (refocus && openRef.current) triggers.current.get(openRef.current)?.focus();
      show(null);
    },
    [show],
  );

  useEffect(() => {
    if (!open && !sheet) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close(true);
      if (sheet) burger.current?.focus();
      setSheet(false);
    };
    // A tap or click anywhere outside the header closes an open flyout.
    const onPointer = (event: PointerEvent) => {
      if (open && !header.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, sheet, close]);

  // The open sheet holds the page still — Lenis included — and a desktop-wide window closes it.
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    document.documentElement.style.overflow = sheet ? 'hidden' : '';
    if (sheet) lenis?.stop();
    else lenis?.start();
    if (!sheet) return;
    const wide = window.matchMedia('(min-width: 1024px)');
    const onWide = () => wide.matches && setSheet(false);
    wide.addEventListener('change', onWide);
    return () => wide.removeEventListener('change', onWide);
  }, [sheet]);

  const openNow = (key: MenuKey) => {
    window.clearTimeout(closeTimer.current);
    if (openRef.current !== key) show(key);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => show(null), 160);
  };

  /** A flyout, rendered inside its trigger's list item so Tab walks from the trigger into it. */
  const flyout = (key: MenuKey) => {
    let i = 0;
    const next = () => ({ ['--i' as string]: i++ });
    return (
      <div
        id={`${ids}-${key}`}
        data-open={open === key || undefined}
        inert={open !== key}
        onMouseEnter={() => openNow(key)}
        className="gnav-flyout max-lg:hidden"
      >
        {/* Inside the sheet, Alia's flat menu, in line with the lockup: every item its glyph and
            name on one line, its summary under it and a tilted arrow. The services stand in their
            three groups of five, a column each under the group's name and line; the solutions
            four to a row. Evolve isn't a service but the care plan for all of them, so it is a
            line in the foot, beside the way to everything. */}
        <div className="container-fluid pt-10 pb-10">
          {key === 'services' ? (
            /* One grid for the three columns, each a subgrid of its rows, so a row stands at one
               height across the menu and the three groups end level, however a line wraps. */
            <div className="-mx-3 grid grid-cols-3 grid-rows-[auto_repeat(5,auto)] gap-x-6 gap-y-1">
              {categories.map((category, c) => (
                <div key={category.slug} className="row-span-6 grid min-w-0 grid-rows-subgrid">
                  <p className="gnav-flyout__item mega-title" style={{ ['--i' as string]: c }}>
                    <Link
                      href={serviceHref(category.slug)}
                      onClick={() => close(false)}
                      className="mega-title__name"
                    >
                      {category.name}
                    </Link>
                    <span className="mega-title__line">{category.line}</span>
                  </p>
                  <SharedLayoutBg
                    as="ul"
                    inset={0}
                    className="row-span-5 grid grid-rows-subgrid"
                    pillClassName={MENU_PILL}
                  >
                    {category.services.map((service, r) => (
                      <FlatItem
                        key={service.anchor}
                        href={serviceHref(service.anchor)}
                        icon={MENU_ICONS[service.anchor] ?? 'sparkles'}
                        name={service.name}
                        summary={service.summary}
                        active={pathname === serviceHref(service.anchor)}
                        // Row by row across the three columns, as the flat grid staggered.
                        style={{ ['--i' as string]: categories.length + r * categories.length + c }}
                        onPick={() => close(false)}
                      />
                    ))}
                  </SharedLayoutBg>
                </div>
              ))}
            </div>
          ) : (
            <SharedLayoutBg
              as="ul"
              inset={0}
              className="-mx-3 grid grid-cols-4 gap-6"
              pillClassName={MENU_PILL}
            >
              {solutions.map((solution) => (
                <FlatItem
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  icon={MENU_ICONS[solution.slug] ?? 'layers'}
                  name={solution.name}
                  summary={`${solution.line} With ${solution.bundles.map((bundle) => bundle.name).join(' or ')}.`}
                  active={pathname === `/solutions/${solution.slug}`}
                  style={next()}
                  onPick={() => close(false)}
                />
              ))}
            </SharedLayoutBg>
          )}
          {/* The foot, under a hairline: the way to everything. */}
          <div
            className="gnav-flyout__item mega-foot mt-8 px-0"
            style={key === 'services' ? { ['--i' as string]: 18 } : next()}
          >
            {key === 'services' ? (
              <p>
                Need it hosted and looked after?{' '}
                <Link
                  href={serviceHref(evolve.slug)}
                  onClick={() => close(false)}
                  className="mega-foot__link"
                >
                  Evolve care plans
                </Link>{' '}
                keep everything we build fast, safe and improving.
              </p>
            ) : (
              <p>Tell us the problem. We’ll map the right system and quote it in writing.</p>
            )}
            <RollLink
              href={key === 'services' ? '/#services' : '/#solutions'}
              size="sm"
              onClick={() => close(false)}
              className="nav-btn shrink-0"
            >
              {key === 'services' ? 'All services' : 'All solutions'}
            </RollLink>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header
      ref={header}
      className="gnav"
      data-scrolled={scrolled || undefined}
      data-flyout={open || undefined}
      data-swap={swap || undefined}
      data-sheet={sheet || undefined}
      onMouseLeave={closeSoon}
    >
      <span aria-hidden="true" className="gnav__bar -z-[1]" />
      <span aria-hidden="true" className="gnav-scrim -z-[2]" />

      <div className="gnav__content container-fluid lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-items-start">
        <Logo turnKey={section} tone="inherit" />

        <nav aria-label="Primary" className="hidden h-full flex-1 lg:block lg:justify-self-center">
          <ul className="flex h-full items-center justify-center gap-1 xl:gap-6">
            {nav.map((item) =>
              item.menu ? (
                <li
                  key={item.label}
                  onMouseEnter={() => openNow(item.menu)}
                  onFocus={(event) => {
                    // Focus arriving from outside the item opens it; focus moving within it —
                    // including Escape handing focus back to the trigger — does not.
                    if (!event.currentTarget.contains(event.relatedTarget)) openNow(item.menu);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      if (openRef.current === item.menu) show(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    ref={(node) => {
                      triggers.current.set(item.menu, node);
                    }}
                    className="gnav-link roll"
                    data-active={isCurrent(item.label) || undefined}
                    aria-expanded={open === item.menu}
                    aria-controls={`${ids}-${item.menu}`}
                    onClick={() => show(open === item.menu ? null : item.menu)}
                  >
                    <RollLabel arrow={false}>{item.label}</RollLabel>
                  </button>
                  {flyout(item.menu)}
                </li>
              ) : (
                <li key={item.label} onMouseEnter={closeSoon}>
                  <Link
                    href={item.href!}
                    className="gnav-link roll"
                    data-active={isCurrent(item.label) || undefined}
                    aria-current={isCurrent(item.label) ? (home ? 'location' : 'page') : undefined}
                  >
                    <RollLabel arrow={false}>{item.label}</RollLabel>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 lg:justify-self-end" onMouseEnter={closeSoon}>
          <RollLink href={start} size="xs" className="nav-btn max-md:hidden">
            {START.label}
          </RollLink>
          {/* aoutive's menu control — Apple's too: two bars that meet and cross. */}
          <button
            type="button"
            ref={burger}
            className="burger -mr-2.5 grid size-11 place-items-center lg:hidden"
            data-open={sheet || undefined}
            aria-expanded={sheet}
            aria-controls={`${ids}-sheet`}
            onClick={() => {
              // Opening, the list holding the active item is already open, so it can be seen.
              if (!sheet) {
                const holder = (['services', 'solutions'] as const).find(
                  (menu) => section === menu && anchor !== '',
                );
                setSheetSection(holder ?? null);
              }
              setSheet((current) => !current);
            }}
          >
            <span className="sr-only">{sheet ? 'Close menu' : 'Menu'}</span>
            <span className="burger__bar burger__bar--top" aria-hidden="true" />
            <span className="burger__bar burger__bar--bottom" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ---- Phone menu ------------------------------------------------------------------ */}
      {/* Apple's: the sheet drawn down under the bar, the items large and bold, arriving one
          after another. Services and Solutions open their lists in place. */}
      <div
        id={`${ids}-sheet`}
        data-open={sheet || undefined}
        inert={!sheet}
        className="m-menu fixed inset-0 -z-10 overflow-y-auto overscroll-contain lg:hidden"
        data-lenis-prevent=""
      >
        <nav aria-label="Mobile" className="container-fluid pt-[5.3125rem] pb-12">
          <ul className="flex flex-col">
            {nav.map((item, index) => {
              const current = isCurrent(item.label);
              return (
                <li key={item.label} className="m-item" style={{ ['--i' as string]: index }}>
                  {item.menu ? (
                    // beUI's collapsible (`@beui/collapsible`): the list springs open in place.
                    <Collapsible
                      open={sheetSection === item.menu}
                      onOpenChange={(next) => setSheetSection(next ? item.menu! : null)}
                    >
                      <CollapsibleTrigger
                        render={
                          <button
                            type="button"
                            className="sheet-link"
                            data-active={current || undefined}
                          />
                        }
                      >
                        <span className="sheet-link__label">{item.label}</span>
                        <Icon
                          name="chevron"
                          size={18}
                          className={`shrink-0 text-[var(--nav-fg-3)] transition-transform duration-500 ease-[var(--ease-premium)] ${
                            sheetSection === item.menu ? 'rotate-180' : ''
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div>
                          <div className="flex flex-col gap-5 pt-2 pb-5">
                            {(item.menu === 'services'
                              ? [
                                  ...categories.map((category) => ({
                                    key: category.slug,
                                    name: category.name,
                                    items: category.services.map((service) => ({
                                      key: service.anchor,
                                      name: service.name,
                                      href: serviceHref(service.anchor),
                                    })),
                                  })),
                                  // Evolve is the care plan for all of it, not a service.
                                  {
                                    key: evolve.slug,
                                    name: 'Hosting & care',
                                    items: [
                                      {
                                        key: evolve.slug,
                                        name: 'Evolve care plans',
                                        href: serviceHref(evolve.slug),
                                      },
                                    ],
                                  },
                                ]
                              : [
                                  {
                                    key: 'solutions',
                                    name: '',
                                    items: solutions.map((solution) => ({
                                      key: solution.slug,
                                      name: solution.name,
                                      href: `/solutions/${solution.slug}`,
                                    })),
                                  },
                                ]
                            ).map((group) => (
                              <div key={group.key}>
                                {group.name ? (
                                  <p className="gnav-flyout__label">{group.name}</p>
                                ) : null}
                                <ul className="mt-1.5 flex flex-col">
                                  {group.items.map((entry) => {
                                    const active =
                                      pathname === entry.href || here(entry.href, item.menu!);
                                    return (
                                      <li key={entry.key}>
                                        <Link
                                          href={entry.href}
                                          onClick={() => {
                                            announceAnchor(entry.href);
                                            setSheet(false);
                                          }}
                                          className="sheet-sublink"
                                          data-active={active || undefined}
                                          aria-current={
                                            active ? (home ? 'location' : 'page') : undefined
                                          }
                                        >
                                          {entry.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={() => setSheet(false)}
                      className="sheet-link"
                      data-active={current || undefined}
                      aria-current={current ? (home ? 'location' : 'page') : undefined}
                    >
                      <span className="sheet-link__label">{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="m-item mt-10" style={{ ['--i' as string]: nav.length }}>
            <RollLink href={start} className="nav-btn w-full" onClick={() => setSheet(false)}>
              {START.label}
            </RollLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * An item in the mega menu: its icon, name, one-line summary and a tilted arrow that rolls. A
 * solution also lists its two ways in as points under a hairline — each bundle's name and what it
 * includes — inside the one link to the solution's page.
 */
/** The soft grey under the pointer, gliding from item to item (`@beui/shared-layout-bg`). */
const MENU_PILL = 'rounded-[6px] bg-[rgb(11_13_18/0.05)]';

/**
 * An item of the flat menu under test, to Alia's measure: a 12px box, the 18px glyph and the name
 * (16/20) on one line 8px apart, the summary (15/20) 6px under it; the box fills its row, so the
 * soft grey behind it under the pointer — or where the visitor is — is one height across a row.
 * The grid is pulled out by the box's padding, so the words line up with the lockup.
 */
function FlatItem({
  href,
  icon,
  name,
  summary,
  active,
  style,
  onPick,
  className = '',
  onMouseEnter,
  children,
}: {
  href: string;
  icon: LucideName;
  name: string;
  summary: string;
  active: boolean;
  style: CSSProperties;
  onPick: () => void;
  /** From beUI's shared-layout-bg, which hands each row its hover and the pill to hold. */
  className?: string;
  onMouseEnter?: () => void;
  children?: ReactNode;
}) {
  return (
    <li
      className={`gnav-flyout__item flex min-w-0 ${className}`}
      style={style}
      onMouseEnter={onMouseEnter}
    >
      {children}
      <Link
        href={href}
        onClick={onPick}
        aria-current={active ? 'page' : undefined}
        className="flat-link relative z-10 flex w-full flex-col gap-1.5 rounded-[6px] p-3 aria-[current=page]:bg-[rgb(11_13_18/0.05)]"
      >
        <span className="flex items-center gap-2 text-[var(--nav-fg)]">
          <Lucide name={icon} size={17} />
          <span className="text-h4 font-medium">{name}</span>
          {/* The tilted arrow is there at rest; pointing at the item rolls it out and its twin in. */}
          <span aria-hidden="true" className="roll__arrow mega-link__arrow mt-0 ml-auto">
            <Lucide name="arrowRight" />
            <Lucide name="arrowRight" />
          </span>
        </span>
        <span className="text-sm text-[var(--nav-fg-2)]">{summary}</span>
      </Link>
    </li>
  );
}
