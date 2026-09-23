'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import {
  carePlans,
  everyWebsiteIncludes,
  largerBuilds,
  type Offer,
  START,
  websitePackages,
} from '@/content/site';

import { Morph } from '../motion/morph';
import { PixelCover } from '../motion/pixel-reveal';
import { Icon } from '../ui/icon';
import { RollLink } from '../ui/roll-link';

/**
 * aoutive's pricing, with Pixel Kinetix's real numbers. Two segments — websites (one-time) and care
 * plans (monthly or yearly) — and every rupee comes from `offers`. The centre card is drawn in ink
 * to give the row a focal point; its label is the price list's own note ("Need to be online
 * quickly"), not a popularity claim nobody has measured.
 */
type Segment = 'websites' | 'care';

const priceOf = (offer: Offer, label: string | null) =>
  offer.headline.find((price) => price.label === label)?.text ?? offer.headline[0]?.text ?? '—';

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Websites · Care plans. One slate thumb under both labels slides to the chosen one and takes its
 * width, rather than the colour jumping from button to button. Its place is measured off the
 * chosen button, and again whenever the group resizes (a font arriving, a narrower screen).
 *
 * The server's HTML paints the chosen button itself, so the control is right before any script
 * runs; the thumb takes over once it has been placed, without animating that first placement.
 * It is a radio group, so the arrow keys move the choice and Tab lands on the chosen one only.
 */
function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  const group = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const [placed, setPlaced] = useState(false);

  useIsoLayout(() => {
    const place = () => {
      const chosen = group.current?.querySelector<HTMLElement>('[aria-checked="true"]');
      if (!chosen || !thumb.current) return;
      thumb.current.style.width = `${chosen.offsetWidth}px`;
      thumb.current.style.transform = `translateX(${chosen.offsetLeft}px)`;
    };
    place();
    setPlaced(true);
    const observer = new ResizeObserver(place);
    if (group.current) observer.observe(group.current);
    return () => observer.disconnect();
  }, [value]);

  const choose = (index: number) => {
    const next = options[(index + options.length) % options.length]!;
    onChange(next.value);
    group.current?.querySelectorAll<HTMLElement>('[role="radio"]')[options.indexOf(next)]?.focus();
  };

  return (
    <div
      ref={group}
      role="radiogroup"
      aria-label={label}
      className="relative inline-grid grid-flow-col rounded-full border border-line bg-white p-1"
    >
      <span
        ref={thumb}
        aria-hidden="true"
        className={`seg-thumb ${placed ? 'seg-thumb--placed' : ''}`}
      />
      {options.map((option, i) => {
        const checked = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
              if (!step) return;
              event.preventDefault();
              choose(i + step);
            }}
            className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-500 ${
              checked ? 'text-white' : 'text-ink-2 hover:text-ink'
            } ${checked && !placed ? 'bg-slate' : ''}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function Pricing() {
  const [segment, setSegment] = useState<Segment>('websites');
  // Once the tabs have been used, a new tab's cards dissolve in at once rather than on first sight.
  const [switched, setSwitched] = useState(false);
  const [yearly, setYearly] = useState(false);
  const ids = useId();

  const main = segment === 'websites' ? websitePackages.slice(0, 3) : carePlans;
  const more = segment === 'websites' ? websitePackages.slice(3) : [];

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Segmented
          label="What to price"
          value={segment}
          onChange={(next) => {
            setSwitched(true);
            setSegment(next);
          }}
          options={[
            { value: 'websites', label: 'Websites' },
            { value: 'care', label: 'Care plans' },
          ]}
        />
        {segment === 'care' ? (
          <label
            htmlFor={`${ids}-yearly`}
            className="inline-flex cursor-pointer items-center gap-3 text-sm text-ink-2"
          >
            <button
              id={`${ids}-yearly`}
              type="button"
              role="switch"
              aria-checked={yearly}
              onClick={() => setYearly((y) => !y)}
              className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${yearly ? 'bg-slate' : 'bg-line-2'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-300 ease-[var(--ease-premium)] ${yearly ? 'translate-x-5' : ''}`}
              />
            </button>
            Billed yearly
            <span className="rounded-full bg-tint-mint px-2.5 py-1 text-xs font-semibold text-[#136b3d]">
              2 months free
            </span>
          </label>
        ) : (
          <p className="text-sm text-ink-2">
            One-time payment · hosting is a separate monthly plan
          </p>
        )}
      </div>

      <Morph id={segment} className="mt-6">
        <ul className="grid overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white lg:grid-cols-3">
          {main.map((offer, i) => {
            const focal = i === 1;
            const price =
              segment === 'websites'
                ? priceOf(offer, null)
                : priceOf(offer, yearly ? 'Yearly' : 'Monthly');
            const unit = segment === 'websites' ? 'one-time' : yearly ? '/ year' : '/ month';
            return (
              <li
                key={offer.slug}
                className={`relative flex flex-col border-line p-7 max-lg:border-b max-lg:last:border-b-0 lg:border-r lg:last:border-r-0 ${focal ? 'on-night bg-night text-white' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-h4 font-medium">{offer.name}</h3>
                  {offer.notes[0] && segment === 'websites' ? (
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${focal ? 'bg-white/10 text-white' : 'bg-fill text-ink'}`}
                    >
                      {offer.notes[0]}
                    </span>
                  ) : null}
                </div>
                <p
                  className={`mt-2 min-h-[3rem] text-sm ${focal ? 'text-white/70' : 'text-ink-2'}`}
                >
                  {offer.summary ?? 'Hosting, SSL and a CDN are included in every plan.'}
                </p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span
                    key={price}
                    className="scene-swap font-display text-[2.75rem] leading-none tracking-[var(--tracking-display)]"
                  >
                    {price}
                  </span>
                  <span className={`text-sm ${focal ? 'text-white/60' : 'text-ink-2'}`}>
                    {unit}
                  </span>
                </p>
                {offer.timeline ? (
                  <p
                    className={`mt-3 inline-flex items-center gap-2 font-tech text-xs ${focal ? 'text-white/70' : 'text-ink-2'}`}
                  >
                    <Icon name="calendar" size={13} /> {offer.timeline}
                  </p>
                ) : null}
                <RollLink
                  href={START.href}
                  variant={focal ? 'paper' : 'line'}
                  className="mt-7 w-full"
                >
                  {segment === 'websites' ? 'Start with ' + offer.name : 'Choose ' + offer.name}
                </RollLink>
                <ul
                  className={`mt-7 flex flex-col gap-3 border-t pt-6 text-sm ${focal ? 'border-white/15' : 'border-line'}`}
                >
                  {(offer.features.length
                    ? offer.features
                        .filter((f) => f.label !== 'Timeline')
                        .map((f) => `${f.label}: ${f.value}`)
                    : everyWebsiteIncludes.slice(0, 5)
                  ).map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${focal ? 'bg-white text-ink' : 'bg-ink text-white'}`}
                      >
                        <Icon name="check" size={10} strokeWidth={3} />
                      </span>
                      <span className={focal ? 'text-white/85' : 'text-ink'}>{line}</span>
                    </li>
                  ))}
                </ul>
                {/* First sight: the section's own 1.6s dissolve. A tab switch: the same, in
                    0.7s, so the new prices are readable almost at once. */}
                <PixelCover
                  cover={focal ? '#0f0f10' : '#ffffff'}
                  tone={focal ? 'dark' : 'light'}
                  delay={switched ? i * 60 : i * 110}
                  duration={switched ? 700 : undefined}
                  now={switched}
                />
              </li>
            );
          })}
        </ul>

        {more.length ? (
          <ul className="mt-8 grid gap-6 xl:grid-cols-2 xl:gap-8">
            {more.map((offer, j) => {
              const detail = largerBuilds[offer.slug];
              // "From ₹65,000" set whole at display size outgrows the card's left column, so the
              // "from" moves down into the unit line and the figure stands alone.
              const price = priceOf(offer, null);
              const from = price.startsWith('From ');
              return (
                <li
                  key={offer.slug}
                  className="relative grid gap-8 overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white p-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:p-9"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-h4 font-medium">{offer.name}</h3>
                      {detail ? (
                        <span className="rounded-full bg-fill px-2.5 py-1 text-[0.6875rem] font-semibold whitespace-nowrap text-ink">
                          {detail.tag}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-ink-2">{offer.summary}</p>
                    <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-[clamp(1.9rem,1.2rem+1.6vw,2.5rem)] leading-none tracking-[var(--tracking-display)] whitespace-nowrap">
                        {from ? price.slice(5) : price}
                      </span>
                      <span className="text-sm text-ink-2">
                        {from ? `starting price, ${detail?.unit}` : detail?.unit}
                      </span>
                    </p>
                    {offer.timeline ? (
                      <p className="mt-3 inline-flex items-center gap-2 font-tech text-xs text-ink-2">
                        <Icon name="calendar" size={13} /> {offer.timeline}
                      </p>
                    ) : null}
                    {/* Pushes the button to the foot of the column, never closer than 1.75rem. */}
                    <span aria-hidden="true" className="min-h-7 grow" />
                    <RollLink href={START.href} variant="line" className="w-full">
                      {offer.slug === 'custom' ? 'Ask for a quote' : 'Start with ' + offer.name}
                    </RollLink>
                  </div>
                  <ul className="flex flex-col gap-3 border-line text-sm max-sm:border-t max-sm:pt-6 sm:border-l sm:pl-7">
                    {(detail?.lines ?? []).map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-ink text-white">
                          <Icon name="check" size={10} strokeWidth={3} />
                        </span>
                        <span className="text-ink">{line}</span>
                      </li>
                    ))}
                  </ul>
                  <PixelCover
                    cover="#ffffff"
                    delay={switched ? 180 + j * 60 : 330 + j * 110}
                    duration={switched ? 700 : undefined}
                    now={switched}
                  />
                </li>
              );
            })}
          </ul>
        ) : null}
      </Morph>
    </div>
  );
}
