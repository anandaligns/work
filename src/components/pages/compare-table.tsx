'use client';

import { type CSSProperties, useId, useState } from 'react';

import { BrandSymbol } from '../ui/brand';
import { Icon } from '../ui/icon';
import { Segmented, segmentTabId } from '../ui/segmented';

type Option = {
  label: string;
  note?: string;
  rows: { topic?: string; without: string; with: string }[];
};

/**
 * The comparison as a table with a raised dark column — the way a pricing page sets its chosen
 * plan apart: what each row is about, the other way in grey, and "With Pixel Kinetix" on night,
 * standing a little proud of the table. Choose what to compare with above it; every comparison is
 * in the HTML from the start and only the chosen one shows.
 */
export function CompareTable({
  label,
  options,
  us = 'Built around your business, and looked after.',
}: {
  label: string;
  options: Option[];
  us?: string;
}) {
  const [chosen, setChosen] = useState('0');
  const ids = useId();
  return (
    <div>
      {options.length > 1 ? (
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:gap-x-4">
          <p className="hidden text-sm text-ink-2 sm:block">Compare with</p>
          <Segmented
            value={chosen}
            onChange={setChosen}
            label={label}
            options={options.map((option, i) => ({ value: String(i), label: option.label }))}
            panel={(value) => `${ids}-option-${value}`}
          />
        </div>
      ) : null}
      {options.map((option, i) => {
        const n = option.rows.length;
        const topics = option.rows.some((row) => row.topic);
        // Side by side from 768px: the topic, the other way, ours. On a phone, one below the
        // other: the other way as a white card, then ours as a dark one.
        const other = topics ? 'md:col-start-2' : 'md:col-start-1';
        const ours = topics ? 'md:col-start-3' : 'md:col-start-2';
        const at = (phone: string, wide: string) =>
          ({ '--r': phone, '--rm': wide }) as CSSProperties;
        return (
          <div
            key={option.label}
            hidden={String(i) !== chosen}
            {...(options.length > 1
              ? {
                  role: 'tabpanel',
                  id: `${ids}-option-${i}`,
                  'aria-labelledby': segmentTabId(`${ids}-option-${i}`, String(i)),
                }
              : {})}
            className={`compare-in relative mt-12 grid grid-cols-1 [grid-template-rows:repeat(var(--rows),auto)] md:rounded-[1.5rem] md:bg-white md:ring-1 md:ring-line md:[grid-template-rows:repeat(var(--rows-md),auto)] ${topics ? 'md:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)_minmax(0,1fr)]' : 'md:grid-cols-2'}`}
            style={{ '--rows': 2 * n + 3, '--rows-md': n + 1 } as CSSProperties}
          >
            {/* the other way's card, on a phone */}
            <div
              aria-hidden="true"
              className="col-start-1 rounded-[1.25rem] bg-white ring-1 ring-line [grid-row:var(--r)] md:hidden"
              style={at(`1 / ${n + 2}`, 'auto')}
            />
            {/* ours: its own dark card on a phone, a raised column from 768px */}
            <div
              aria-hidden="true"
              className={`col-start-1 ${ours} rounded-[1.25rem] bg-night shadow-[0_32px_64px_-32px_rgb(11_13_18/0.65)] [grid-row:var(--r)] md:-my-4 md:[grid-row:var(--rm)]`}
              style={at(`${n + 3} / ${2 * n + 4}`, '1 / -1')}
            />
            <span className="h-4 md:hidden" style={{ gridRow: n + 2 }} />

            {topics ? (
              <div className="hidden px-6 pt-8 pb-6 md:col-start-1 md:row-start-1 md:block lg:px-8">
                <p className="eyebrow text-ink-3">What changes</p>
              </div>
            ) : null}
            <div
              className={`relative col-start-1 ${other} px-5 pt-7 pb-6 [grid-row:var(--r)] sm:px-6 md:[grid-row:var(--rm)] lg:px-8`}
              style={at('1', '1')}
            >
              <span className="grid size-9 place-items-center rounded-full bg-fill text-ink-3">
                <Icon name="close" size={15} />
              </span>
              <p className="mt-4 text-[1.0625rem] font-medium text-ink">{option.label}</p>
              {option.note ? (
                <p className="mt-1 max-w-xs text-sm text-ink-3">{option.note}</p>
              ) : null}
            </div>
            <div
              className={`relative col-start-1 ${ours} px-5 pt-7 pb-6 [grid-row:var(--r)] sm:px-6 md:[grid-row:var(--rm)] lg:px-8`}
              style={at(String(n + 3), '1')}
            >
              <span className="grid size-9 place-items-center rounded-[10px] bg-white">
                <BrandSymbol className="size-[18px]" ink="#0b0d12" />
              </span>
              <p className="mt-4 text-[1.0625rem] font-medium text-white">With Pixel Kinetix</p>
              <p className="mt-1 max-w-xs text-sm text-white/60">{us}</p>
            </div>

            {option.rows.map((row, j) => (
              <div key={row.without} className="contents">
                {topics ? (
                  <p
                    className="hidden border-t border-line px-6 py-5 text-sm font-medium text-ink md:col-start-1 md:block lg:px-8"
                    style={{ gridRow: j + 2 }}
                  >
                    {row.topic}
                  </p>
                ) : null}
                <div
                  className={`relative col-start-1 ${other} border-t border-line px-5 py-5 [grid-row:var(--r)] sm:px-6 md:[grid-row:var(--rm)] lg:px-8`}
                  style={at(String(j + 2), String(j + 2))}
                >
                  {row.topic ? (
                    <p className="mb-2 text-xs font-medium text-ink md:hidden">{row.topic}</p>
                  ) : null}
                  <p className="flex items-start gap-3 text-sm leading-[1.55] text-ink-2">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-fill text-ink-3">
                      <Icon name="close" size={11} strokeWidth={2.2} />
                    </span>
                    {row.without}
                  </p>
                </div>
                <div
                  className={`relative col-start-1 ${ours} border-t border-white/10 px-5 py-5 [grid-row:var(--r)] sm:px-6 md:[grid-row:var(--rm)] lg:px-8`}
                  style={at(String(n + 4 + j), String(j + 2))}
                >
                  {row.topic ? (
                    <p className="mb-2 text-xs font-medium text-white/55 md:hidden">{row.topic}</p>
                  ) : null}
                  <p className="flex items-start gap-3 text-sm leading-[1.55] text-white">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-signal-green text-white">
                      <Icon name="check" size={11} strokeWidth={2.6} />
                    </span>
                    {row.with}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
