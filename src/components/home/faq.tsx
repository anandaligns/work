'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { contact, faqGroups, START } from '@/content/site';

import { Morph } from '../motion/morph';
import { Icon } from '../ui/icon';
import { RollLink } from '../ui/roll-link';
import { Segmented } from '../ui/segmented';

/**
 * pk-static's category rail, with automatix's questions beside it.
 *
 * The rail's marker slides between categories as Pricing's thumb does, vertically. On a phone the
 * rail becomes Pricing's segmented control, each category named in a word.
 *
 * The rail item is pk-static's (itself hbranalytics' menu link): a 3px bar at the left edge that
 * grows in, a tinted wash, a darker label and a 4px nudge right, on hover and when active, with the
 * icon lifting with it.
 *
 * The questions are automatix's, measured off its page and turned light: no card at rest — a large
 * question in a muted grey, a chevron at the far end, 18px by 36px of padding, 14px between rows.
 * Pointed at, the row fills and the question darkens; open, it becomes a bordered card on a faint
 * top-to-bottom wash, the chevron turns over, and the answer rises in a beat after the height, on
 * a short spring that overshoots only a little. The height is set in pixels, not released to
 * `auto`, so that spring has something to run between.
 *
 * Every answer is in the server HTML. Before script runs, CSS closes every card but the open one;
 * after, the heights are set in pixels here and nowhere else — React is never handed a `style`
 * for a panel, because re-rendering one would wipe the pixel height mid-flight.
 */
const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function Faq() {
  const ids = useId();
  const [group, setGroup] = useState(0);
  const [open, setOpen] = useState(0);
  const panels = useRef(new Map<string, HTMLDivElement | null>());

  const current = faqGroups[group]!;
  const count = faqGroups.length;
  const choose = (i: number) => {
    setGroup((i + count) % count);
    setOpen(0);
  };

  // The rail's marker — its ink bar and wash — slides to the chosen category rather than jumping,
  // measured off the chosen tab as Pricing's thumb is. Until it is placed, the tab marks itself.
  const rail = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const [placed, setPlaced] = useState(false);
  useIsoLayout(() => {
    const place = () => {
      const chosen = rail.current?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!chosen || !marker.current) return;
      marker.current.style.height = `${chosen.offsetHeight}px`;
      marker.current.style.transform = `translateY(${chosen.offsetTop}px)`;
    };
    place();
    setPlaced(true);
    const observer = new ResizeObserver(place);
    if (rail.current) observer.observe(rail.current);
    return () => observer.disconnect();
  }, [group]);

  // Pin every panel's height to its content: the open one to its scrollHeight, the rest to 0.
  useIsoLayout(() => {
    current.items.forEach((faq, i) => {
      const el = panels.current.get(`${group}-${i}`);
      if (el) el.style.height = i === open ? `${el.scrollHeight}px` : '0px';
    });
  }, [group, open, current.items]);

  useEffect(() => {
    const onResize = () => {
      const el = panels.current.get(`${group}-${open}`);
      if (el) el.style.height = `${el.scrollHeight}px`;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [group, open]);

  return (
    <div className="mt-14">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
        {/* Phones: the categories as Pricing's segmented control, a word each. */}
        <div className="lg:hidden">
          <Segmented
            label="Question categories"
            stretch
            value={current.id}
            options={faqGroups.map((g) => ({ value: g.id, label: g.short }))}
            onChange={(id) => choose(faqGroups.findIndex((g) => g.id === id))}
          />
        </div>

        <div
          ref={rail}
          role="tablist"
          aria-label="Question categories"
          aria-orientation="vertical"
          data-placed={placed || undefined}
          className="faq-rail relative hidden flex-col gap-1 lg:flex"
        >
          <span ref={marker} aria-hidden="true" className="faq-marker" />
          {faqGroups.map((g, i) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              id={`${ids}-tab-${g.id}`}
              aria-selected={i === group}
              aria-controls={`${ids}-panel`}
              tabIndex={i === group ? 0 : -1}
              data-active={i === group || undefined}
              onClick={() => choose(i)}
              onKeyDown={(event) => {
                const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
                if (!keys.includes(event.key)) return;
                event.preventDefault();
                const step = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
                const to = (i + step + count) % count;
                choose(to);
                document.getElementById(`${ids}-tab-${faqGroups[to]!.id}`)?.focus();
              }}
              className="faq-tab shrink-0"
            >
              <span className="faq-tab__icon">
                <Icon name={g.icon} size={20} />
              </span>
              {/* The label takes the slack, so every count sits in one column at the right. */}
              <span className="min-w-0 flex-1 whitespace-nowrap">{g.label}</span>
              <span className="w-5 shrink-0 text-right font-tech text-xs tabular-nums opacity-60">
                {String(g.items.length).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`${ids}-panel`} aria-labelledby={`${ids}-tab-${current.id}`}>
          <Morph id={current.id}>
            <div className="morph-stagger flex flex-col gap-3.5">
              {current.items.map((faq, i) => {
                const expanded = open === i;
                return (
                  <div key={faq.question} className="faq-item" data-open={expanded || undefined}>
                    <h3>
                      <button
                        type="button"
                        id={`${ids}-q-${group}-${i}`}
                        aria-expanded={expanded}
                        aria-controls={`${ids}-a-${group}-${i}`}
                        onClick={() => setOpen(expanded ? -1 : i)}
                        className="flex w-full items-center gap-6 px-5 py-[1.125rem] text-left sm:px-9"
                      >
                        <span className="faq-item__q">{faq.question}</span>
                        <span aria-hidden="true" className="faq-item__chevron">
                          <Icon name="chevron" size={22} strokeWidth={1.8} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`${ids}-a-${group}-${i}`}
                      role="region"
                      aria-labelledby={`${ids}-q-${group}-${i}`}
                      inert={!expanded}
                      ref={(node) => {
                        panels.current.set(`${group}-${i}`, node);
                      }}
                      className="faq-item__panel"
                    >
                      <p className="faq-item__a">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Morph>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
        <p className="max-w-md text-body text-ink-2">Still have a question? Ask us on WhatsApp.</p>
        <div className="flex flex-wrap gap-3">
          <RollLink href={contact.whatsappHref} variant="line" external>
            Ask on WhatsApp
          </RollLink>
          <RollLink href={START.href}>{START.label}</RollLink>
        </div>
      </div>
    </div>
  );
}
