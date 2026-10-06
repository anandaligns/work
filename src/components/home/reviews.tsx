import { headings, shownReviews, type Review } from '@/content/site';

import { Band } from '../layout/band';
import { GRAPHITE } from '../visuals/graphite';
import { ReviewRail } from './review-rail';

/**
 * Lightfield's customer section, in our light: the heading on the left and the rail's two arrows on
 * the right, then a row of tall cards that scrolls sideways. Each card sits as the home Services
 * pictures do — white on a hairline, over a fine grid or dots that fade toward its edges — with the
 * words on it in ink: the mark and name at the top, the review large, and who said it at the foot.
 *
 * Every review shown today is a labelled sample, and only the dev server shows them — see
 * `shownReviews`. With nothing real to show, the section is not rendered.
 */

function Card({ review, index }: { review: Review; index: number }) {
  return (
    <li className="w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[calc((100%-2rem)/3)]">
      <figure
        className={`ground ${index % 2 ? 'ground--dots' : 'ground--grid'} relative flex h-full min-h-[27rem] flex-col overflow-hidden rounded-2xl border border-line p-7 text-ink sm:p-8 lg:aspect-[622/707] lg:min-h-0`}
      >
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-[10px] font-display text-[1.0625rem] leading-none text-white"
            style={{ background: GRAPHITE }}
          >
            {review.business.charAt(0)}
          </span>
          <span className="text-[1.1875rem] tracking-[-0.01em]">{review.business}</span>
          {review.sample ? (
            <span className="ml-auto shrink-0 rounded-full border border-dashed border-ink/25 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase">
              Sample
            </span>
          ) : null}
        </div>
        <blockquote className="mt-7 mb-10 text-[clamp(1.125rem,0.98rem+0.5vw,1.4375rem)] leading-[1.4] tracking-[-0.01em] text-ink">
          <p className="-indent-[0.45em]">“{review.quote}”</p>
        </blockquote>
        <figcaption className="mt-auto">
          <span className="block text-[1rem]">{review.name}</span>
          <span className="mt-0.5 block text-[0.9375rem] text-ink-2">
            {review.role}, {review.kind}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export function Reviews() {
  if (!shownReviews.length) return null;
  const samples = shownReviews.some((review) => review.sample);

  return (
    <Band id="reviews" labelledBy="reviews-heading" className="overflow-hidden py-20 lg:py-28">
      <ReviewRail
        head={
          <h2
            id="reviews-heading"
            className="max-w-xl text-h2 tracking-[var(--tracking-heading)] text-ink"
          >
            {headings.reviews.lead} {headings.reviews.fill}
          </h2>
        }
        note={
          samples ? (
            <p className="mt-6 w-fit max-w-full rounded-2xl border border-dashed border-line-2 bg-white px-4 py-2 text-xs leading-relaxed text-ink-2">
              Sample reviews, shown on the dev server only — a production build leaves them out
              until real ones are added in <code className="font-tech">src/content/site.ts</code>.
            </p>
          ) : null
        }
      >
        {shownReviews.map((review, i) => (
          <Card key={`${review.business}-${review.name}`} review={review} index={i} />
        ))}
      </ReviewRail>
    </Band>
  );
}
