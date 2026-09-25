import type { CSSProperties } from 'react';

import { headings, shownReviews, type Review } from '@/content/site';

import { Band } from '../layout/band';
import { FillText } from '../motion/fill-text';
import { PixelReveal } from '../motion/pixel-reveal';
import { BRANDS, MobileSite, Scaled } from '../visuals/concept-sites';
import { SectionHead } from './section-head';

/**
 * automatix's testimonials, turned light: one featured review — a picture of the client's site on
 * the left, their words large on the right, filling with ink as they scroll in, two facts about
 * the project under a hairline — and a row of three beneath it, divided by hairlines, each with the
 * business's mark, five stars, the words and the name.
 *
 * automatix's marks sit grey until noticed; here each mark is grey at rest and takes the business's
 * own colour when its review is pointed at.
 *
 * Every review shown today is a labelled sample, and only the dev server shows them — see
 * `shownReviews`. With nothing real to show, the section is not rendered.
 */
const STAR =
  'M12 2.8l2.76 5.6 6.18.9-4.47 4.36 1.05 6.15L12 16.9l-5.52 2.91 1.05-6.15L3.06 9.3l6.18-.9z';

function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className={`inline-flex gap-1 ${className}`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`size-[1.15rem] ${i < rating ? 'text-[#d97706]' : 'text-line-2'}`}
        >
          <path d={STAR} fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

function Mark({
  review,
  size = 'md',
  lit = false,
}: {
  review: Review;
  size?: 'md' | 'lg';
  lit?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ '--accent': review.accent } as CSSProperties}
      className={`review-mark ${lit ? 'review-mark--lit' : ''} ${size === 'lg' ? 'size-16 text-2xl' : 'size-8 text-sm'}`}
    >
      {review.business.charAt(0)}
    </span>
  );
}

function SampleTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed border-line-2 bg-white px-2.5 py-0.5 font-tech text-[0.6875rem] tracking-[var(--tracking-label)] text-ink-2 uppercase ${className}`}
    >
      Sample
    </span>
  );
}

function Featured({ review }: { review: Review }) {
  const brand = review.site ? BRANDS[review.site] : undefined;
  return (
    <figure className="group/review mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <div
        data-reveal=""
        className="relative overflow-hidden rounded-[1.75rem] border border-line"
        style={{ background: brand?.soft ?? 'var(--color-fill)' }}
      >
        <PixelReveal
          cover={brand?.soft ?? '#f5f5f5'}
          className="relative grid h-[26rem] place-items-center sm:h-[28rem]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(26_26_26/0.09)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_78%)]"
          />
          {brand ? (
            <div data-parallax="-26" className="relative max-sm:scale-[0.72]">
              <Scaled
                k="0.6"
                className="h-[403px] w-[234px] rotate-[-4deg] rounded-[18px] shadow-[0_40px_70px_-40px_rgb(0_0_0/0.55)] ring-1 ring-black/5 transition-transform duration-700 ease-[var(--ease-premium)] group-hover/review:rotate-0"
              >
                <MobileSite b={brand} />
              </Scaled>
            </div>
          ) : (
            <Mark review={review} size="lg" lit />
          )}
        </PixelReveal>
        <span className="absolute top-4 right-4">{review.sample ? <SampleTag /> : null}</span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/90 py-1.5 pr-4 pl-1.5 text-sm font-medium text-ink shadow-[0_10px_30px_-18px_rgb(0_0_0/0.4)] backdrop-blur">
          <Mark review={review} lit />
          {review.kind}
        </span>
      </div>

      <div>
        <div data-reveal="" className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="inline-flex items-center gap-3">
            <Mark review={review} lit />
            <span className="text-body font-semibold text-ink">{review.business}</span>
          </span>
          <Stars rating={review.rating} />
        </div>
        <blockquote className="mt-7 font-display text-[clamp(1.375rem,1.15rem+0.7vw,1.875rem)] leading-[1.24] font-medium tracking-[-0.025em] text-ink">
          <p>
            <FillText text={`“${review.quote}”`} />
          </p>
        </blockquote>
        <figcaption data-reveal="" className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-lg font-medium tracking-[-0.015em] text-ink">{review.name}</span>
          <span className="text-body text-ink-2">
            {review.role}, {review.business}
          </span>
        </figcaption>
        {review.facts?.length ? (
          <ul
            data-reveal=""
            style={{ ['--i' as string]: 1 }}
            className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8"
          >
            {review.facts.map((fact) => (
              <li key={fact.label} className="flex items-center gap-4">
                <span className="font-display text-[clamp(1.5rem,1.3rem+0.6vw,1.875rem)] leading-none tracking-[var(--tracking-display)] text-ink">
                  {fact.value}
                </span>
                <span className="max-w-[9rem] text-sm leading-snug text-ink-2">{fact.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </figure>
  );
}

export function Reviews() {
  if (!shownReviews.length) return null;
  const [featured, ...rest] = shownReviews;
  const samples = shownReviews.some((review) => review.sample);

  return (
    <Band id="reviews" labelledBy="reviews-heading" className="py-24 lg:py-32">
      <SectionHead
        id="reviews"
        eyebrow="Client reviews"
        heading={headings.reviews}
        align="center"
      />
      {samples ? (
        <p className="mx-auto mt-6 w-fit max-w-full rounded-2xl border border-dashed border-line-2 bg-white px-4 py-2 text-center text-xs leading-relaxed text-ink-2">
          Sample reviews, shown on the dev server only — a production build leaves them out until
          real ones are added in <code className="font-tech">src/content/site.ts</code>.
        </p>
      ) : null}

      {featured ? <Featured review={featured} /> : null}

      {rest.length ? (
        <ul className="mt-20 grid md:grid-cols-3">
          {rest.slice(0, 3).map((review, index) => (
            <li
              key={`${review.business}-${review.name}`}
              data-reveal=""
              style={{ ['--i' as string]: index }}
              className="review-card group/review border-line max-md:border-t max-md:py-10 max-md:first:border-t-0 max-md:first:pt-0 md:border-l md:px-8 md:first:border-l-0 lg:px-10"
            >
              <figure className="flex h-full flex-col items-center text-center">
                <span className="inline-flex items-center gap-2.5">
                  <Mark review={review} />
                  <span className="text-body font-semibold text-ink-2 transition-colors duration-300 group-hover/review:text-ink">
                    {review.business}
                  </span>
                </span>
                <Stars rating={review.rating} className="mt-5" />
                <blockquote className="mt-5 max-w-sm text-body text-ink-2">
                  <p>“{review.quote}”</p>
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <span className="block text-body font-medium text-ink">{review.name}</span>
                  <span className="mt-1 block text-sm text-ink-2">
                    {review.role}, {review.kind}
                  </span>
                  {review.sample ? <SampleTag className="mt-4" /> : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
    </Band>
  );
}
