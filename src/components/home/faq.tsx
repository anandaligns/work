'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/motion/collapsible';
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
 * question in a muted grey, a plus at the far end, 18px by 36px of padding, 14px between rows.
 * Pointed at, the row fills and the question darkens; open, it becomes a bordered card on a faint
 * top-to-bottom wash, the plus turns over into a minus, and the answer rises in a beat after the
 * height. The opening itself is beUI's Collapsible (see `FaqList`).
 *
 * Under the rail, in the column's empty space, a small card with the ways to ask; on a phone it
 * follows the questions.
 *
 * Every answer of every shelf is in the server HTML — the shelves not chosen sit `hidden` — so all
 * of them are on the page and in its FAQPage data.
 */
const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export type FaqEntry = { question: string; answer: string };

/**
 * The accordion alone: one shelf of questions, the `initial` one open (−1 for none). The home FAQ
 * shows one per shelf; an inner page shows one with no rail.
 *
 * Each question is beUI's Collapsible (`@beui/collapsible`): the card springs open on beUI's
 * layout spring while the rows under it glide down to make room, and the answer fades in once the
 * height has started to move. One open at a time, so the shelf drives every row's `open`. The
 * answers are always in the HTML — a closed one is a clipped, inert region — so every one is on
 * the page and in its FAQPage data.
 */
export function FaqList({ items, initial = 0 }: { items: FaqEntry[]; initial?: number }) {
  const [open, setOpen] = useState(initial);

  return (
    <div className="morph-stagger flex flex-col gap-3.5">
      {items.map((faq, i) => {
        const expanded = open === i;
        return (
          <Collapsible
            key={faq.question}
            open={expanded}
            onOpenChange={(next) => setOpen(next ? i : -1)}
            className="faq-item"
            data-open={expanded || undefined}
          >
            <h3>
              <CollapsibleTrigger
                render={
                  <button
                    type="button"
                    className="flex w-full items-center gap-6 px-5 py-[1.125rem] text-left sm:px-9"
                  />
                }
              >
                <span className="faq-item__q">{faq.question}</span>
                {/* HBR's toggle: a plus that turns half over into a minus as the answer opens. */}
                <span aria-hidden="true" className="faq-item__toggle" />
              </CollapsibleTrigger>
            </h3>
            <CollapsibleContent>
              <p className="faq-item__a">{faq.answer}</p>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}

export function Faq() {
  const ids = useId();
  const [group, setGroup] = useState(0);

  const current = faqGroups[group]!;
  const count = faqGroups.length;
  const choose = (i: number) => setGroup((i + count) % count);

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

  return (
    <div className="mt-14">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
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

        {/* From 1024px: the rail, and under it the way to ask — in the column's empty space. */}
        <div className="hidden flex-col gap-8 lg:flex">
          <div
            ref={rail}
            role="tablist"
            aria-label="Question categories"
            aria-orientation="vertical"
            data-placed={placed || undefined}
            className="faq-rail relative flex flex-col gap-1"
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
          <AskCard />
        </div>

        <div role="tabpanel" id={`${ids}-panel`} aria-labelledby={`${ids}-tab-${current.id}`}>
          <Morph id={current.id}>
            <FaqList key={current.id} items={current.items} />
          </Morph>
          {/* The other shelves, closed and hidden, so every answer is in the page's HTML. */}
          {faqGroups.map((g) =>
            g.id === current.id ? null : (
              <div key={g.id} hidden>
                <FaqList items={g.items} initial={-1} />
              </div>
            ),
          )}
        </div>
      </div>

      {/* Phones: the way to ask, after the questions. */}
      <div className="mt-10 lg:hidden">
        <AskCard />
      </div>
    </div>
  );
}

/**
 * Still have a question: a small card with the two ways on — WhatsApp, about the page's topic when
 * it has one, and Get Started, with the page's interest.
 */
export function AskCard({
  whatsapp = contact.whatsappHref,
  start = START.href,
}: {
  whatsapp?: string;
  start?: string;
}) {
  return (
    <div className="rounded-[16px] border border-line bg-white p-5">
      <p className="text-h4 font-medium text-ink">Still have a question?</p>
      <p className="mt-1 text-sm text-ink-2">Ask us on WhatsApp, or tell us what you need.</p>
      <div className="mt-4 grid gap-2.5">
        <RollLink href={whatsapp} variant="line" size="sm" external className="w-full">
          Ask on WhatsApp
        </RollLink>
        <RollLink href={start} size="sm" className="w-full">
          {START.label}
        </RollLink>
      </div>
    </div>
  );
}
