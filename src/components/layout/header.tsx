'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { categories, evolve, nav, solutions, START } from '@/content/site';
import { announceAnchor, useAnchor } from '@/lib/anchor';

import { Icon, iconFor } from '../ui/icon';
import { Logo } from '../ui/logo';
import { RollLink } from '../ui/roll-link';

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
 * One frosted strip, 44px on a desktop and 48px on a phone: the lockup, the seven items and the
 * call to action spread evenly along one line, in Apple's light bar, its sheets and menus with
 * it. It never changes shape; a hairline settles beneath it once the page has moved. The lockup's pixel
 * turns a quarter each time the reader enters a new section.
 *
 * Services and Solutions open flyouts: full-width sheets of the bar's own light, drawn down from
 * under it while the page behind dims and softens out of focus. Inside is the earlier mega menu's
 * pattern, straight on the sheet and in line with the lockup: a column per service group or
 * solution — its title linking to its page — every item with its icon, a one-line summary and a
 * tilted arrow, and a foot with the way to everything (Evolve under the services). Services open their own pages; solutions' bundles open
 * their row on the home page.
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
  const pick = (href: string) => {
    announceAnchor(href);
    close(false);
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
        {/* Inside the sheet, the earlier mega menu's pattern, straight on the sheet: a column per
            group or solution under its title — linking to its page — and its line, every item an
            icon, a name, a one-line summary and a tilted arrow, and a foot with the way to
            everything. It starts at the page's edge, in line with the lockup. */}
        <div className="container-fluid pt-14 pb-12">
          <div className={`grid gap-x-6 ${key === 'services' ? 'grid-cols-3' : 'grid-cols-4'}`}>
            {key === 'services'
              ? categories.map((category) => (
                  <div key={category.slug} className="gnav-flyout__item min-w-0" style={next()}>
                    <p className="mega-title">
                      <Link
                        href={serviceHref(category.slug)}
                        className="mega-title__name"
                        aria-current={pathname === serviceHref(category.slug) ? 'page' : undefined}
                        onClick={() => close(false)}
                      >
                        {category.name}
                      </Link>
                      <span className="mega-title__line">{category.line}</span>
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {category.services.map((service) => {
                        const href = serviceHref(service.anchor);
                        return (
                          <MenuItem
                            key={service.anchor}
                            href={href}
                            icon={iconFor(service.anchor)}
                            name={service.name}
                            summary={service.summary}
                            active={pathname === href}
                            current="page"
                            onPick={() => close(false)}
                          />
                        );
                      })}
                    </ul>
                  </div>
                ))
              : solutions.map((solution) => (
                  <div key={solution.slug} className="gnav-flyout__item min-w-0" style={next()}>
                    <p className="mega-title">
                      <Link
                        href={`/solutions/${solution.slug}`}
                        className="mega-title__name"
                        aria-current={
                          pathname === `/solutions/${solution.slug}` ? 'page' : undefined
                        }
                        onClick={() => close(false)}
                      >
                        {solution.name}
                      </Link>
                      <span className="mega-title__line">{solution.line}</span>
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {solution.bundles.map((bundle) => (
                        <MenuItem
                          key={bundle.anchor}
                          href={`/#${bundle.anchor}`}
                          icon={iconFor(bundle.anchor)}
                          name={bundle.name}
                          summary={bundle.includes.join(' · ')}
                          active={here(`/#${bundle.anchor}`, 'solutions')}
                          current="location"
                          onPick={() => pick(`/#${bundle.anchor}`)}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
          </div>
          {/* The foot, under a hairline: the way to everything. */}
          <div className="gnav-flyout__item mega-foot" style={next()}>
            {key === 'services' ? (
              <p>
                Underneath all three:{' '}
                <Link
                  href={serviceHref(evolve.slug)}
                  className="mega-foot__link"
                  onClick={() => close(false)}
                >
                  {evolve.name}
                </Link>{' '}
                — {evolve.summary.charAt(0).toLowerCase() + evolve.summary.slice(1)}
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

      <div className="gnav__content container-fluid">
        <Logo turnKey={section} tone="inherit" />

        <nav aria-label="Primary" className="hidden h-full flex-1 lg:block">
          <ul className="flex h-full items-center justify-evenly">
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
                    className="gnav-link"
                    data-active={isCurrent(item.label) || undefined}
                    aria-expanded={open === item.menu}
                    aria-controls={`${ids}-${item.menu}`}
                    onClick={() => show(open === item.menu ? null : item.menu)}
                  >
                    {item.label}
                  </button>
                  {flyout(item.menu)}
                </li>
              ) : (
                <li key={item.label} onMouseEnter={closeSoon}>
                  <Link
                    href={item.href!}
                    className="gnav-link"
                    data-active={isCurrent(item.label) || undefined}
                    aria-current={isCurrent(item.label) ? (home ? 'location' : 'page') : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5" onMouseEnter={closeSoon}>
          <RollLink href={START.href} size="xs" className="nav-btn max-md:hidden">
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
        <nav aria-label="Mobile" className="container-fluid pt-[4.75rem] pb-12">
          <ul className="flex flex-col">
            {nav.map((item, index) => {
              const current = isCurrent(item.label);
              return (
                <li key={item.label} className="m-item" style={{ ['--i' as string]: index }}>
                  {item.menu ? (
                    <>
                      <button
                        type="button"
                        className="sheet-link"
                        data-active={current || undefined}
                        aria-expanded={sheetSection === item.menu}
                        aria-controls={`${ids}-sheet-${item.menu}`}
                        onClick={() =>
                          setSheetSection((was) => (was === item.menu ? null : item.menu))
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
                      </button>
                      <div
                        id={`${ids}-sheet-${item.menu}`}
                        inert={sheetSection !== item.menu}
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-premium)] ${
                          sheetSection === item.menu
                            ? 'grid-rows-[1fr] opacity-100'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
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
                                  {
                                    key: evolve.slug,
                                    name: evolve.name,
                                    items: [
                                      {
                                        key: evolve.slug,
                                        name: 'Hosting, care and improvements',
                                        href: serviceHref(evolve.slug),
                                      },
                                    ],
                                  },
                                ]
                              : solutions.map((solution) => ({
                                  key: solution.slug,
                                  name: solution.name,
                                  items: solution.bundles.map((bundle) => ({
                                    key: bundle.anchor,
                                    name: bundle.name,
                                    href: `/#${bundle.anchor}`,
                                  })),
                                }))
                            ).map((group) => (
                              <div key={group.key}>
                                <p className="gnav-flyout__label">{group.name}</p>
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
                      </div>
                    </>
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
            <RollLink href={START.href} className="nav-btn w-full" onClick={() => setSheet(false)}>
              {START.label}
            </RollLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

/** An item in the mega menu: its icon, name, one-line summary and a tilted arrow that rolls. */
function MenuItem({
  href,
  icon,
  name,
  summary,
  active = false,
  current,
  onPick,
}: {
  href: string;
  icon: Parameters<typeof Icon>[0]['name'];
  name: string;
  summary: string;
  active?: boolean;
  /** How the item marks where the visitor is: a page, or a place on the home page. */
  current: 'page' | 'location';
  onPick: () => void;
}) {
  const arrow = <Icon name="arrow" strokeWidth={1.8} />;
  return (
    <li>
      <Link
        href={href}
        onClick={onPick}
        aria-current={active ? current : undefined}
        className="mega-link roll"
      >
        <span className="mega-link__icon">
          <Icon name={icon} size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="mega-link__name">{name}</span>
          <span className="mega-link__summary">{summary}</span>
        </span>
        {/* The tilted arrow is there at rest; pointing at the row rolls it out and its twin in. */}
        <span aria-hidden="true" className="roll__arrow mega-link__arrow">
          {arrow}
          {arrow}
        </span>
      </Link>
    </li>
  );
}
