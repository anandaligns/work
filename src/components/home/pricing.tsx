'use client';

import { useEffect, useId, useState } from 'react';

import {
  carePlans,
  everyWebsiteIncludes,
  largerBuilds,
  type Offer,
  startFor,
  websitePackages,
} from '@/content/site';
import { ANCHOR_EVENT, announceAnchor } from '@/lib/anchor';

import { Morph } from '../motion/morph';
import { PixelCover } from '../motion/pixel-reveal';
import { Icon } from '../ui/icon';
import { RollLink } from '../ui/roll-link';
import { Segmented } from '../ui/segmented';

/**
 * aoutive's pricing, with Pixel Kinetix's real numbers. Two segments — Build (one-time) and Evolve
 * plans (monthly or yearly) — and every rupee comes from `offers`. The centre card is drawn in ink
 * to give the row a focal point; its label is the price list's own note ("Start here."), not a
 * popularity claim nobody has measured.
 *
 * `/#evolve-plans` lands on the row of tabs with the Evolve plans open — the link under the
 * Services cards goes there. `only="care"` is the Evolve page's table: the plans alone, with their
 * yearly switch and no Build tab. Every button carries its package's `?interest=`.
 */
type Segment = 'websites' | 'care';

export const EVOLVE_PLANS_HREF = '/#evolve-plans';

/** A link to the Evolve plans that opens their tab — usable from a server component. */
export function EvolvePlansLink({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  return (
    <RollLink
      href={EVOLVE_PLANS_HREF}
      variant="line"
      className={className}
      onClick={() => announceAnchor(EVOLVE_PLANS_HREF)}
    >
      {children}
    </RollLink>
  );
}

const priceOf = (offer: Offer, label: string | null) =>
  offer.headline.find((price) => price.label === label)?.text ?? offer.headline[0]?.text ?? '—';

export function Pricing({ only }: { only?: Segment } = {}) {
  const [segment, setSegment] = useState<Segment>(only ?? 'websites');
  // Once the tabs have been used, a new tab's cards dissolve in at once rather than on first sight.
  const [switched, setSwitched] = useState(false);
  const [yearly, setYearly] = useState(false);
  const ids = useId();
  // Sent to the Evolve plans — on arrival with the hash, and on every click of a link to them,
  // even a second one after the visitor has gone back to Build.
  useEffect(() => {
    const openEvolve = () => {
      setSwitched(true);
      setSegment('care');
    };
    if (window.location.hash === '#evolve-plans') openEvolve();
    const onAnchor = (event: Event) => {
      if ((event as CustomEvent<string>).detail === '#evolve-plans') openEvolve();
    };
    const onHash = () => {
      if (window.location.hash === '#evolve-plans') openEvolve();
    };
    window.addEventListener(ANCHOR_EVENT, onAnchor);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener(ANCHOR_EVENT, onAnchor);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  const main = segment === 'websites' ? websitePackages.slice(0, 3) : carePlans;
  const more = segment === 'websites' ? websitePackages.slice(3) : [];

  return (
    <div className={only ? '' : 'mt-12'}>
      <div
        id="evolve-plans"
        className="flex flex-wrap items-center justify-center gap-4 sm:justify-between"
      >
        {only ? null : (
          <Segmented
            label="What to price"
            value={segment}
            onChange={(next) => {
              setSwitched(true);
              setSegment(next);
            }}
            options={[
              { value: 'websites', label: 'Build' },
              { value: 'care', label: 'Evolve plans' },
            ]}
          />
        )}
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
              className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${yearly ? 'bg-graphite' : 'bg-line-2'}`}
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
          <p className="text-sm text-ink-2">One-time payment · Evolve is a separate monthly plan</p>
        )}
      </div>

      <Morph id={segment} className="mt-6">
        <ul className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white lg:grid-cols-3">
          {main.map((offer, i) => {
            const focal = i === 1;
            const headline =
              segment === 'websites'
                ? priceOf(offer, null)
                : priceOf(offer, yearly ? 'Yearly' : 'Monthly');
            // A starting price keeps its "from" small, ahead of the figure, so the figure itself
            // stays at the size of its neighbours.
            const from = headline.startsWith('From ');
            const price = from ? headline.slice(5) : headline;
            const unit = segment === 'websites' ? 'one-time' : yearly ? '/ year' : '/ month';
            return (
              <li
                key={offer.slug}
                className={`relative flex min-w-0 flex-col border-line p-5 max-lg:border-b max-lg:last:border-b-0 sm:p-7 lg:border-r lg:last:border-r-0 ${focal ? 'on-night bg-night text-white' : ''}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
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
                <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {from ? (
                    <span className={`text-sm ${focal ? 'text-white/60' : 'text-ink-2'}`}>
                      From
                    </span>
                  ) : null}
                  <span
                    key={price}
                    className="scene-swap font-display text-[2.5rem] leading-none tracking-[var(--tracking-display)]"
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
                {/* A label can't wrap and still roll, so the narrowest phones get a short one. */}
                <RollLink
                  href={startFor(segment === 'websites' ? offer.slug : 'evolve')}
                  variant={focal ? 'paper' : 'line'}
                  className="mt-7 w-full max-[359px]:hidden"
                >
                  {segment === 'websites' ? 'Start with ' + offer.name : 'Choose ' + offer.name}
                </RollLink>
                <RollLink
                  href={startFor(segment === 'websites' ? offer.slug : 'evolve')}
                  variant={focal ? 'paper' : 'line'}
                  className="mt-7 w-full min-[360px]:hidden"
                >
                  {segment === 'websites' ? 'Get started' : 'Choose'}
                </RollLink>
                <ul
                  className={`mt-7 flex flex-col gap-3 border-t pt-6 text-sm ${focal ? 'border-white/15' : 'border-line'}`}
                >
                  {(offer.features.length
                    ? [
                        ...offer.features
                          .filter((f) => f.label !== 'Timeline')
                          .map((f) => `${f.label}: ${f.value}`),
                        ...(segment === 'care'
                          ? [`Extra change: ${priceOf(offer, 'Extra change')}`]
                          : []),
                      ]
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
                  cover={focal ? '#0b0d12' : '#ffffff'}
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
          <ul className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
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
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-display text-h4 font-medium">{offer.name}</h3>
                      {detail ? (
                        <span className="rounded-full bg-fill px-2.5 py-1 text-[0.6875rem] font-semibold whitespace-nowrap text-ink">
                          {detail.tag}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-ink-2">{offer.summary}</p>
                    <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] leading-none tracking-[var(--tracking-display)] whitespace-nowrap">
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
                    <RollLink href={startFor(offer.slug)} variant="line" className="w-full">
                      {offer.slug === 'custom'
                        ? 'Ask for a quote'
                        : offer.slug === 'blueprint'
                          ? 'Book a Blueprint'
                          : 'Start with ' + offer.name}
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
