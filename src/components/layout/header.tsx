'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { categories, evolve, nav, solutions, START } from '@/content/site';
import { announceAnchor, useAnchor } from '@/lib/anchor';

import { Icon } from '../ui/icon';
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

/** The Services menu: the three groups' services, each on its own page, and Evolve beneath them. */
const serviceHref = (slug: string) => `/services/${slug}`;
const SERVICE_LINKS = [
  ...categories.map((category) => ({ slug: category.slug, name: category.name })),
  { slug: evolve.slug, name: evolve.name },
];

/**
 * The header — Apple's global bar, in this site's type.
 *
 * One strip of glassy Graphite Ink, 44px on a desktop and 48px on a phone: the lockup, the seven
 * items and the call to action spread evenly along one line, in white. It never changes shape; it
 * frosts the page scrolling under it, and a hairline of light settles beneath it once the page
 * has moved. The lockup's pixel turns a quarter each time the
 * reader enters a new section.
 *
 * Services and Solutions open flyouts: full-width sheets of the bar's own ink, drawn down from
 * under it while the page behind dims and softens out of focus. The first column is the big way in —
 * the three service groups and Evolve, the four solutions — and the columns beside it every item
 * underneath. Services open their own pages; solutions' bundles open their row on the home page.
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
        <div className="container-fluid flex gap-x-16 pt-10 pb-16">
          {key === 'services' ? (
            <>
              <div className="w-[17rem] shrink-0">
                <p className="gnav-flyout__label gnav-flyout__item" style={next()}>
                  Explore services
                </p>
                <ul className="mt-3 flex flex-col">
                  {SERVICE_LINKS.map((link) => (
                    <li key={link.slug} className="gnav-flyout__item" style={next()}>
                      <Link
                        href={serviceHref(link.slug)}
                        className="gnav-flyout__big"
                        aria-current={pathname === serviceHref(link.slug) ? 'page' : undefined}
                        onClick={() => close(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {categories.map((category) => (
                <div key={category.slug} className="min-w-0 flex-1">
                  <p className="gnav-flyout__label gnav-flyout__item" style={next()}>
                    {category.line}
                  </p>
                  <ul className="mt-3 flex flex-col">
                    {category.services.map((service) => {
                      const href = serviceHref(service.anchor);
                      return (
                        <li key={service.anchor} className="gnav-flyout__item" style={next()}>
                          <Link
                            href={href}
                            className="gnav-flyout__small"
                            data-active={pathname === href || undefined}
                            aria-current={pathname === href ? 'page' : undefined}
                            onClick={() => close(false)}
                          >
                            {service.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="w-[17rem] shrink-0">
                <p className="gnav-flyout__label gnav-flyout__item" style={next()}>
                  Explore solutions
                </p>
                <ul className="mt-3 flex flex-col">
                  {solutions.map((solution) => {
                    const href = `/#${solution.bundles[0]?.anchor ?? 'solutions'}`;
                    return (
                      <li key={solution.slug} className="gnav-flyout__item" style={next()}>
                        <Link href={href} className="gnav-flyout__big" onClick={() => pick(href)}>
                          {solution.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="min-w-0 flex-1">
                <p className="gnav-flyout__label gnav-flyout__item" style={next()}>
                  Bundles
                </p>
                <ul className="mt-3 flex flex-col">
                  {solutions.flatMap((solution) =>
                    solution.bundles.map((bundle) => (
                      <li key={bundle.anchor} className="gnav-flyout__item" style={next()}>
                        <Link
                          href={`/#${bundle.anchor}`}
                          className="gnav-flyout__small"
                          data-active={here(`/#${bundle.anchor}`, 'solutions') || undefined}
                          aria-current={
                            here(`/#${bundle.anchor}`, 'solutions') ? 'location' : undefined
                          }
                          onClick={() => pick(`/#${bundle.anchor}`)}
                        >
                          {bundle.name}
                        </Link>
                      </li>
                    )),
                  )}
                </ul>
              </div>
              <div className="min-w-0 flex-1">
                <p className="gnav-flyout__label gnav-flyout__item" style={next()}>
                  Before you choose
                </p>
                <ul className="mt-3 flex flex-col">
                  {[
                    { label: 'See the prices', href: '/#pricing' },
                    { label: 'How a project runs', href: '/#process' },
                    { label: 'Your client portal', href: '/#portal' },
                    { label: 'Questions, answered', href: '/#faq' },
                  ].map((link) => (
                    <li key={link.href} className="gnav-flyout__item" style={next()}>
                      <Link
                        href={link.href}
                        className="gnav-flyout__small"
                        onClick={() => close(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-[15rem] shrink-0">
                <p className="gnav-flyout__label gnav-flyout__item" style={next()}>
                  Not sure which?
                </p>
                <p
                  className="gnav-flyout__item mt-3 text-[0.8125rem] leading-relaxed text-white/60"
                  style={next()}
                >
                  Tell us the problem. We’ll map the right system and quote it in writing.
                </p>
                <div className="gnav-flyout__item mt-4" style={next()}>
                  <RollLink
                    href={START.href}
                    size="xs"
                    variant="paper"
                    onClick={() => close(false)}
                  >
                    {START.label}
                  </RollLink>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <header
      ref={header}
      className="gnav on-night"
      data-scrolled={scrolled || undefined}
      data-flyout={open || undefined}
      data-swap={swap || undefined}
      data-sheet={sheet || undefined}
      onMouseLeave={closeSoon}
    >
      <span aria-hidden="true" className="gnav__bar -z-[1]" />
      <span aria-hidden="true" className="gnav-scrim -z-[2]" />

      <div className="gnav__content container-fluid">
        <Logo turnKey={section} tone="white" />

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
          <RollLink href={START.href} size="xs" variant="paper" className="max-md:hidden">
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
                          className={`shrink-0 text-white/50 transition-transform duration-500 ease-[var(--ease-premium)] ${
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
            <RollLink
              href={START.href}
              variant="paper"
              className="w-full"
              onClick={() => setSheet(false)}
            >
              {START.label}
            </RollLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
