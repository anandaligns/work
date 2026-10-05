'use client';

import type { KeyboardEvent } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/motion/tabs';

/**
 * The arrow keys for a row or column of beUI tabs, which leave them to the page: an arrow moves to
 * the next tab and chooses it, Home and End go to the ends, and Tab lands on the chosen one only
 * (each trigger takes `tabIndex={chosen ? 0 : -1}`).
 */
export function moveBetweenTabs(event: KeyboardEvent<HTMLButtonElement>) {
  const tab = event.currentTarget;
  const tabs = Array.from(
    tab.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
  );
  const at = tabs.indexOf(tab);
  const count = tabs.length;
  const step: Record<string, number> = {
    ArrowRight: 1,
    ArrowDown: 1,
    ArrowLeft: -1,
    ArrowUp: -1,
    Home: -at,
    End: count - 1 - at,
  };
  if (at < 0 || !(event.key in step)) return;
  event.preventDefault();
  const next = tabs[(at + step[event.key]! + count) % count];
  next?.focus();
  next?.click();
}

/** The id of the tab that chooses `value`, for its panel's `aria-labelledby`. */
export const segmentTabId = (panel: string, value: string) => `${panel}-tab-${value}`;

/**
 * A segmented control — Pricing's Build · Evolve plans, a comparison's options, and the FAQ's
 * categories on a phone — on beUI's tabs (`@beui/tabs`, the pill variant). One graphite pill under
 * the labels glides to the chosen one on beUI's spring and takes its width, and the chosen label
 * turns white exactly where the pill covers it, so a label the pill is crossing is half white.
 * Where the options don't fit, the row scrolls sideways under faded edges with an arrow at each
 * end, rather than running off the screen.
 *
 * The server's HTML already has the pill under the chosen option, so the control is right before
 * any script runs. Given `panel`, each tab names the panel it controls; that panel takes
 * `role="tabpanel"` and `aria-labelledby={segmentTabId(panel, value)}`.
 */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
  stretch = false,
  panel,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
  /** Fill the width, every option an equal share — for a phone. */
  stretch?: boolean;
  /** The id of the panel an option controls. */
  panel?: (value: T) => string;
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onChange(next as T)}
      variant="pill"
      className={stretch ? 'w-full' : 'max-w-full'}
    >
      <TabsList
        aria-label={label}
        className={`border border-line bg-white p-1 ${stretch ? 'grid w-full auto-cols-fr grid-flow-col' : ''}`}
        wrapperClassName={stretch ? '' : 'w-auto'}
      >
        {options.map((option) => {
          const chosen = option.value === value;
          return (
            <TabsTrigger
              key={option.value}
              value={option.value}
              id={panel ? segmentTabId(panel(option.value), option.value) : undefined}
              aria-controls={panel?.(option.value)}
              tabIndex={chosen ? 0 : -1}
              onKeyDown={moveBetweenTabs}
              indicatorClassName="bg-graphite shadow-[0_10px_22px_-12px_rgb(11_13_18/0.7)]"
              className={`py-2 text-ink-2 transition-colors duration-300 hover:text-ink ${
                stretch ? 'w-full px-2' : 'px-4'
              }`}
            >
              {option.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
