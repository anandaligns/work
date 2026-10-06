'use client';

import { useId, useState } from 'react';

import { BouncyAccordion } from '@/components/motion/bouncy-accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/motion/tabs';
import { contact, faqGroups, START } from '@/content/site';

import { Morph } from '../motion/morph';
import { Icon } from '../ui/icon';
import { RollLink } from '../ui/roll-link';
import { moveBetweenTabs, Segmented } from '../ui/segmented';

/**
 * pk-static's category rail, with automatix's questions beside it.
 *
 * The rail is beUI's tabs: its marker glides between categories on beUI's spring, vertically, as
 * Pricing's pill does across. On a phone the rail becomes Pricing's segmented control, each
 * category named in a word.
 *
 * The rail item is pk-static's (itself hbranalytics' menu link): a 3px bar at the left edge that
 * grows in, a tinted wash, a darker label and a 4px nudge right, on hover and when active, with the
 * icon lifting with it.
 *
 * The questions are beUI's bouncy accordion in automatix's type: a large question in a muted grey,
 * a plus at the far end, 18px by 36px of padding. At rest they sit together in one container;
 * the one asked springs apart into its own card, the plus turns over into a minus, and the answer
 * fades in as the height settles (see `FaqList`).
 *
 * Under the rail, in the column's empty space, a small card with the ways to ask; on a phone it
 * follows the questions.
 *
 * Every answer of every shelf is in the server HTML — the shelves not chosen sit `hidden` — so all
 * of them are on the page and in its FAQPage data.
 */
export type FaqEntry = { question: string; answer: string };

/**
 * The accordion alone: one shelf of questions, all closed until one is asked. The home FAQ shows
 * one per shelf; an inner page shows one with no rail.
 *
 * It is beUI's bouncy accordion (`@beui/bouncy-accordion`): at rest the questions sit together as
 * one rounded container, a hairline between rows; asked, a question springs out of the group as a
 * card of its own — the rows above and below rounding off and gliding apart on its weighted
 * spring — and its answer fades in as the height settles. One open at a time. beUI's chevron is
 * drawn over as HBR's +/− (`.faq-acc__toggle`): two thin bars that turn half over with beUI's spin,
 * the upright one folding flat, so the plus lands as a minus. The answers are always in the HTML —
 * a closed one is a clipped, inert region — so every one is on the page and in its FAQPage data.
 */
export function FaqList({ items, initial = -1 }: { items: FaqEntry[]; initial?: number }) {
  return (
    <div className="morph-stagger">
      <BouncyAccordion
        defaultValue={initial >= 0 ? `q${initial}` : null}
        items={items.map((faq, i) => ({
          id: `q${i}`,
          title: faq.question,
          description: faq.answer,
        }))}
        classNames={FAQ_CLASSES}
      />
    </div>
  );
}

/** The site's look on beUI's accordion: white rows on a hairline, our type, our +/−. */
const FAQ_CLASSES = {
  root: 'faq-acc',
  item: 'faq-acc__item',
  trigger: 'faq-acc__trigger min-h-0 gap-6 py-[1.125rem] sm:px-9',
  title: 'faq-acc__q whitespace-normal!',
  chevron: 'faq-acc__toggle',
  description: 'faq-acc__a',
};

export function Faq() {
  const ids = useId();
  const [group, setGroup] = useState(faqGroups[0]!.id);
  const panelId = (id: string) => `${ids}-panel-${id}`;
  const tabId = (id: string) => `${ids}-tab-${id}`;

  return (
    // beUI's tabs (`@beui/tabs`) hold the chosen shelf. From 1024px their list is the rail —
    // the underline variant, stood on end, its indicator restyled as the rail's ink bar and wash
    // so it glides up and down between categories. On a phone the categories are the segmented
    // control, a second set of beUI tabs on the same choice.
    <Tabs value={group} onValueChange={setGroup} variant="underline" className="mt-14">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        {/* Phones: the categories as Pricing's segmented control, a word each. */}
        <div className="lg:hidden">
          <Segmented
            label="Question categories"
            stretch
            value={group}
            options={faqGroups.map((g) => ({ value: g.id, label: g.short }))}
            onChange={setGroup}
          />
        </div>

        {/* From 1024px: the rail, and under it the way to ask — in the column's empty space. */}
        <div className="hidden flex-col gap-8 lg:flex">
          <TabsList
            aria-label="Question categories"
            aria-orientation="vertical"
            className="faq-rail w-full flex-col items-stretch gap-1 border-b-0"
          >
            {faqGroups.map((g) => (
              <TabsTrigger
                key={g.id}
                value={g.id}
                id={tabId(g.id)}
                aria-controls={panelId(g.id)}
                tabIndex={g.id === group ? 0 : -1}
                data-active={g.id === group || undefined}
                onKeyDown={moveBetweenTabs}
                indicatorClassName="faq-indicator top-0 h-auto -z-10 rounded-r-[12px] bg-ink/5"
                className="faq-tab mb-0 min-h-0 w-full gap-[0.85rem] py-[11px] pr-5 pl-5 text-[0.9375rem] hover:pl-6 data-[active]:pl-6 data-[active]:font-semibold"
              >
                <span className="faq-tab__icon">
                  <Icon name={g.icon} size={20} />
                </span>
                {/* The label takes the slack, so every count sits in one column at the right. */}
                <span className="min-w-0 flex-1 whitespace-nowrap">{g.label}</span>
                <span className="w-5 shrink-0 text-right font-tech text-xs tabular-nums opacity-60">
                  {String(g.items.length).padStart(2, '0')}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <AskCard />
        </div>

        {/* Every shelf is in the HTML; beUI keeps the ones not chosen mounted and `hidden`. */}
        <Morph id={group}>
          {faqGroups.map((g) => (
            <TabsContent key={g.id} value={g.id} className="mt-0">
              <div role="tabpanel" id={panelId(g.id)} aria-labelledby={tabId(g.id)}>
                <FaqList items={g.items} />
              </div>
            </TabsContent>
          ))}
        </Morph>
      </div>

      {/* Phones: the way to ask, after the questions. */}
      <div className="mt-10 lg:hidden">
        <AskCard />
      </div>
    </Tabs>
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
