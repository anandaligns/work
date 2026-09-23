'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { categories, nav, solutions, START } from '@/content/site';
import { announceAnchor, useAnchor } from '@/lib/anchor';

import { Icon, iconFor } from '../ui/icon';
import { Logo } from '../ui/logo';
import { RollLink } from '../ui/roll-link';

type MenuKey = 'services' | 'solutions';

/** The section each nav item stands for on this one-page build. */
const SECTION_OF: Record<string, string> = {
  Home: 'top',
  Services: 'services',
  Solutions: 'solutions',
  Work: 'work',
  Pricing: 'pricing',
  About: 'process',
  Contact: 'start',
};

/**
 * The header.
 *
 * At the top of the page it is a full-width bar inside the frame: the lockup, seven items on the
 * centre line and the call to action. Once the page moves it condenses into a floating pill —
 * narrower, in slate, the type turned light and the call to action turned white, so it holds its
 * own over every section it floats above — which is pk-static's header, rebuilt so the
 * change is one attribute and a CSS transition rather than two headers swapped by opacity. The
 * header is `fixed`, so its size can change without moving a pixel of the page under it.
 *
 * The mega menus open on hover and on focus, close on Escape with focus handed back to the
 * trigger, and only one is ever open. Each item carries its icon, a rolling label and a tilted
 * arrow that arrives on hover.
 */
export function Header() {
  const ids = useId();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [sheet, setSheet] = useState(false);
  const [sheetSection, setSheetSection] = useState<MenuKey | null>(null);
  const triggers = useRef(new Map<MenuKey, HTMLButtonElement | null>());
  const closeTimer = useRef<number | undefined>(undefined);
  const [section, setSection] = useState<string>('top');
  const burger = useRef<HTMLButtonElement>(null);

  /**
   * The menu item for where the visitor is: the service or bundle they last went to, for as long
   * as they are still in its section. It keeps the hover pill, with its icon in slate.
   */
  const anchor = useAnchor();
  const here = (href: string, menu: MenuKey) =>
    anchor !== '' && href.endsWith(anchor) && section === menu;
  // A menu holding the item where the visitor is keeps its trigger's pill, as when it is open.
  const holdsHere = (menu: MenuKey) =>
    section === menu &&
    (menu === 'services'
      ? categories.some((c) => c.services.some((s) => `#${s.anchor}` === anchor))
      : solutions.some((s) => s.bundles.some((b) => `#${b.anchor}` === anchor)));

  /**
   * Which section is under the header — pk-static's active state, for a one-page site. A section
   * counts as current while it crosses a thin band a third of the way down the viewport.
   */
  useEffect(() => {
    // Every section with an id, in page order; the current one is the last whose top has passed
    // a line 35% down the viewport. Sections with no nav item (the FAQ, the portal) underline
    // nothing, which is honest: the reader is somewhere the menu does not name.
    const ids = [
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
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setSection(current);
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

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback((refocus: boolean) => {
    setOpen((current) => {
      if (refocus && current) triggers.current.get(current)?.focus();
      return null;
    });
  }, []);

  useEffect(() => {
    if (!open && !sheet) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close(true);
      if (sheet) burger.current?.focus();
      setSheet(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
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
    setOpen(key);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  /** A menu's panel, rendered inside its own list item so Tab walks from the trigger into it. */
  const panel = (key: MenuKey) => (
    <div
      key={key}
      id={`${ids}-${key}`}
      hidden={open !== key}
      onMouseEnter={() => openNow(key)}
      className="mega absolute inset-x-0 top-full hidden pt-3 lg:block"
    >
      <div className="mx-auto max-w-[62rem] rounded-[1.25rem] border border-line bg-white p-3 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)]">
        <div className={`grid gap-2 ${key === 'services' ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
          {key === 'services'
            ? categories.map((category) => (
                <div key={category.slug} className="rounded-2xl bg-paper p-3">
                  <p className="mega-title">
                    <span className="mega-title__name">{category.name}</span>
                    <span className="mega-title__line">{category.line}</span>
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {category.services.map((service) => (
                      <MenuItem
                        key={service.anchor}
                        href={`/#${service.anchor}`}
                        icon={iconFor(service.anchor)}
                        name={service.name}
                        summary={service.summary}
                        active={here(`/#${service.anchor}`, 'services')}
                        onPick={() => {
                          announceAnchor(`/#${service.anchor}`);
                          close(false);
                        }}
                      />
                    ))}
                  </ul>
                </div>
              ))
            : solutions.map((solution) => (
                <div key={solution.slug} className="rounded-2xl bg-paper p-3">
                  <p className="mega-title">
                    <span className="mega-title__name">{solution.name}</span>
                    <span className="mega-title__line">{solution.line}</span>
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {solution.bundles.map((bundle) => (
                      <MenuItem
                        key={bundle.anchor}
                        href={`/#${bundle.anchor}`}
                        icon={iconFor(bundle.anchor)}
                        name={bundle.name}
                        summary={bundle.includes.slice(0, 4).join(' · ')}
                        active={here(`/#${bundle.anchor}`, 'solutions')}
                        onPick={() => {
                          announceAnchor(`/#${bundle.anchor}`);
                          close(false);
                        }}
                      />
                    ))}
                  </ul>
                </div>
              ))}
        </div>
        {/* The panel's foot: a strip like the columns above it, with the way to everything. */}
        <div className="mt-2 flex items-center justify-between gap-6 rounded-2xl bg-paper py-3 pr-3 pl-5">
          <p className="text-sm text-ink-2">
            {key === 'services'
              ? 'Build, host and care — from the first page to every update after.'
              : 'Pick a goal — each solution brings the services it needs.'}
          </p>
          <RollLink
            href={key === 'services' ? '/#services' : '/#solutions'}
            size="sm"
            onClick={() => close(false)}
            className="shrink-0"
          >
            {key === 'services' ? 'All services' : 'All solutions'}
          </RollLink>
        </div>
      </div>
    </div>
  );

  return (
    <header
      data-compact={(compact && !sheet) || undefined}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
      onMouseLeave={closeSoon}
    >
      {/* While the phone menu is open, the bar is solid, with a hairline under it. The sheet sits
          beneath the header's own content, so this is a layer of its own — above the sheet, below
          the lockup and the cross — and the menu scrolls under it rather than behind the logo. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border-b border-line bg-paper transition-opacity duration-300 lg:hidden ${
          sheet ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`relative mx-auto flex items-center justify-between gap-4 border transition-[max-width,padding,background-color,border-color,box-shadow,border-radius] duration-700 ease-[var(--ease-premium)] lg:grid lg:grid-cols-[1fr_auto_1fr] ${
          compact && !sheet
            ? 'max-w-[62rem] rounded-full border-white/10 bg-slate/95 px-4 py-3 shadow-[0_18px_50px_-20px_rgb(43_45_66/0.65)] backdrop-blur-md'
            : 'max-w-[80rem] rounded-2xl border-transparent bg-transparent px-3 py-3 sm:px-5'
        }`}
      >
        <div className="flex items-center justify-self-start">
          <Logo tone={compact && !sheet ? 'white' : 'ink'} />
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 lg:gap-1">
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
                      setOpen((current) => (current === item.menu ? null : current));
                    }
                  }}
                >
                  <button
                    type="button"
                    ref={(node) => {
                      triggers.current.set(item.menu, node);
                    }}
                    className="nav-link"
                    data-active={SECTION_OF[item.label] === section || undefined}
                    data-current={holdsHere(item.menu) || undefined}
                    aria-expanded={open === item.menu}
                    aria-controls={`${ids}-${item.menu}`}
                    onClick={() => setOpen((current) => (current === item.menu ? null : item.menu))}
                  >
                    {item.label}
                    <svg viewBox="0 0 24 24" className="chev size-3.5" aria-hidden="true">
                      <path
                        d="m6 9 6 6 6-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {panel(item.menu)}
                </li>
              ) : (
                <li key={item.label} onMouseEnter={closeSoon}>
                  <Link
                    href={item.href!}
                    className="nav-link"
                    data-active={SECTION_OF[item.label] === section || undefined}
                    aria-current={SECTION_OF[item.label] === section ? 'location' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <RollLink
            href={START.href}
            size="sm"
            signal
            variant={compact && !sheet ? 'paper' : 'ink'}
            className="max-md:hidden"
          >
            {START.label}
          </RollLink>
          {/* aoutive's menu control: two 20px bars, 10px apart, that meet and cross on a spring. */}
          <button
            type="button"
            ref={burger}
            className="burger grid size-10 place-items-center lg:hidden"
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
      {/* Full screen, drawn down from under the bar — the lockup and the cross stay where they
          were — with its rows arriving one after another, and the same in reverse on close.
          Every row shares one left edge and ends in the same 2rem circle: a chevron where the
          row opens (Services, Solutions — their lists open in place), a tilted arrow where it
          goes. */}
      <div
        id={`${ids}-sheet`}
        data-open={sheet || undefined}
        inert={!sheet}
        className="m-menu fixed inset-0 -z-10 overflow-y-auto overscroll-contain lg:hidden"
        data-lenis-prevent=""
      >
        <nav aria-label="Mobile" className="px-6 pt-[5.5rem] pb-10 sm:px-9">
          <ul className="flex flex-col">
            {nav.map((item, index) => {
              const current = SECTION_OF[item.label] === section;
              return (
                <li
                  key={item.label}
                  className="m-item border-b border-line py-1.5"
                  style={{ ['--i' as string]: index }}
                >
                  {item.menu ? (
                    <>
                      <button
                        type="button"
                        className="sheet-link"
                        data-active={current || undefined}
                        aria-expanded={sheetSection === item.menu}
                        aria-controls={`${ids}-sheet-${item.menu}`}
                        onClick={() =>
                          setSheetSection((open) => (open === item.menu ? null : item.menu))
                        }
                      >
                        <span className="sheet-link__label">{item.label}</span>
                        <span className="sheet-link__end" aria-hidden="true">
                          <Icon
                            name="chevron"
                            size={16}
                            className={`transition-transform duration-500 ease-[var(--ease-premium)] ${
                              sheetSection === item.menu ? 'rotate-180' : ''
                            }`}
                          />
                        </span>
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
                          <div className="flex flex-col gap-3 pt-2 pb-4">
                            {(item.menu === 'services'
                              ? categories.map((category) => ({
                                  key: category.slug,
                                  name: category.name,
                                  line: category.line,
                                  items: category.services.map((service) => ({
                                    key: service.anchor,
                                    name: service.name,
                                    icon: iconFor(service.anchor),
                                  })),
                                }))
                              : solutions.map((solution) => ({
                                  key: solution.slug,
                                  name: solution.name,
                                  line: solution.line,
                                  items: solution.bundles.map((bundle) => ({
                                    key: bundle.anchor,
                                    name: bundle.name,
                                    icon: iconFor(bundle.anchor),
                                  })),
                                }))
                            ).map((group, g) => (
                              <div key={group.key} className="rounded-2xl bg-fill/70 p-2.5">
                                <p className="flex items-baseline gap-2.5 px-3 pt-2 pb-3">
                                  <span className="font-tech text-[0.6875rem] text-ink-2 tabular-nums">
                                    {String(g + 1).padStart(2, '0')}
                                  </span>
                                  <span className="text-sm font-semibold text-ink">
                                    {group.name}
                                  </span>
                                  <span className="ml-auto text-right text-xs text-ink-2">
                                    {group.line}
                                  </span>
                                </p>
                                <ul className="flex flex-col gap-1">
                                  {group.items.map((entry) => (
                                    <li key={entry.key}>
                                      <Link
                                        href={`/#${entry.key}`}
                                        onClick={() => {
                                          announceAnchor(`/#${entry.key}`);
                                          setSheet(false);
                                        }}
                                        className="sheet-sublink"
                                        data-active={
                                          here(`/#${entry.key}`, item.menu!) || undefined
                                        }
                                        aria-current={
                                          here(`/#${entry.key}`, item.menu!)
                                            ? 'location'
                                            : undefined
                                        }
                                      >
                                        <span className="sheet-sublink__icon">
                                          <Icon name={entry.icon} size={15} />
                                        </span>
                                        <span className="min-w-0 flex-1">{entry.name}</span>
                                        <TiltedArrow />
                                      </Link>
                                    </li>
                                  ))}
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
                      aria-current={current ? 'location' : undefined}
                    >
                      <span className="sheet-link__label">{item.label}</span>
                      <span className="sheet-link__end" aria-hidden="true">
                        <TiltedArrow />
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="m-item mt-8" style={{ ['--i' as string]: nav.length }}>
            <RollLink href={START.href} signal className="w-full" onClick={() => setSheet(false)}>
              {START.label}
            </RollLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

/** The site's tilted arrow — a right arrow turned to point out and up. */
function TiltedArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-3.5 shrink-0 -rotate-45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function MenuItem({
  href,
  icon,
  name,
  summary,
  active = false,
  onPick,
}: {
  href: string;
  icon: Parameters<typeof Icon>[0]['name'];
  name: string;
  summary: string;
  active?: boolean;
  onPick: () => void;
}) {
  return (
    <li className="mega-item">
      <Link
        href={href}
        onClick={onPick}
        aria-current={active ? 'location' : undefined}
        className={`roll group/item flex w-full items-start gap-3 rounded-xl px-2.5 py-2.5 whitespace-normal transition-colors duration-300 ${
          active ? 'bg-slate/[0.07] ring-1 ring-slate/15 ring-inset' : 'hover:bg-white'
        }`}
      >
        <span
          className={`mt-px grid size-5 shrink-0 place-items-center transition-colors duration-300 ${
            active ? 'text-slate' : 'text-ink-2 group-hover/item:text-slate'
          }`}
        >
          <Icon name={icon} size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.8125rem] leading-snug font-semibold text-ink">{name}</span>
          <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-ink-2">{summary}</span>
        </span>
        {/* The tilted arrow is there at rest; hovering the row rolls it out and its twin in. */}
        <span
          className={`roll__arrow mt-1 size-3.5 flex-[0_0_0.875rem] transition-colors duration-300 group-hover/item:text-ink ${active ? 'text-ink' : 'text-ink-3'}`}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </li>
  );
}
