import Link from 'next/link';
import type { CSSProperties } from 'react';

import { Band } from '../layout/band';
import { ScreenView } from '../screens/screen';
import type { Screen } from '../screens/types';
import { Icon } from '../ui/icon';
import { GRAPHITE } from '../visuals/graphite';

/**
 * The index of a family of pages — every service group, or every solution — as alternating rows:
 * a large faint number, the name with one word in a lighter grey, a paragraph, a checked list of
 * what's inside with links, and an outline button, beside a crop of the product itself. Rows swap
 * sides one after another from 1200px, and stack below it with the picture under the words.
 *
 * Everything is graphite, after the home Services pictures: the crop sits white on a hairline,
 * over a fine grid that fades toward its edges, and the product in it is drawn in graphite too.
 */
export type ZigRow = {
  id: string;
  name: string;
  /** The words of the name drawn in a lighter grey. */
  highlight: string;
  text: string;
  points: { name: string; line: string; href: string }[];
  cta: { label: string; href: string };
  visual: { back: Screen; front?: Screen };
};

const MUTED = '#8a8f9c';

function Name({ name, highlight, accent }: { name: string; highlight: string; accent: string }) {
  const at = name.indexOf(highlight);
  if (at < 0) return <>{name}</>;
  return (
    <>
      {name.slice(0, at)}
      <span style={{ color: accent }}>{highlight}</span>
      {name.slice(at + highlight.length)}
    </>
  );
}

/** A crop of the product: the software on a grid ground, a phone over its lower right. */
function Peek({ visual, index }: { visual: ZigRow['visual']; index: number }) {
  return (
    <div
      aria-hidden="true"
      className={`zig-peek ground ${index % 2 ? 'ground--dots' : 'ground--grid'} relative h-[300px] overflow-hidden rounded-[1.75rem] border border-line sm:h-[360px] min-[1200px]:h-[400px]`}
    >
      <div className="absolute top-[10%] left-[6%]">
        <ScreenView screen={visual.back} size="lg" accent={GRAPHITE} />
      </div>
      {visual.front ? (
        <div className="absolute right-[5%] -bottom-[34%] origin-bottom-right scale-[0.58] sm:-bottom-[26%] sm:scale-[0.68] min-[1200px]:scale-[0.72]">
          <ScreenView screen={visual.front} size="lg" accent={GRAPHITE} />
        </div>
      ) : null}
    </div>
  );
}

export function ZigZag({
  id,
  label,
  rows,
}: {
  id: string;
  /** What the rows are, for assistive tech. */
  label: string;
  rows: ZigRow[];
}) {
  return (
    <Band id={id} labelledBy={`${id}-heading`} className="zig-band py-24 lg:py-32">
      <h2 id={`${id}-heading`} className="sr-only">
        {label}
      </h2>
      <div className="flex flex-col gap-20 min-[1200px]:gap-[120px]">
        {rows.map((row, i) => (
          <article
            key={row.id}
            id={row.id}
            data-reveal=""
            aria-labelledby={`${row.id}-name`}
            className={`group flex flex-col gap-8 min-[1200px]:items-center min-[1200px]:gap-[60px] ${i % 2 ? 'min-[1200px]:flex-row-reverse' : 'min-[1200px]:flex-row'}`}
            style={{ '--accent': GRAPHITE } as CSSProperties}
          >
            <div className="min-w-0 flex-1">
              <span
                aria-hidden="true"
                className="-mb-[15px] block font-display text-[64px] leading-none font-extrabold"
                style={{ color: `color-mix(in srgb, ${GRAPHITE} 8%, transparent)` }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 id={`${row.id}-name`} className="text-h3 font-medium tracking-[-0.02em] text-ink">
                <Name name={row.name} highlight={row.highlight} accent={MUTED} />
              </h3>
              <p className="mt-4 max-w-xl text-body text-ink-2">{row.text}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {row.points.map((point) => (
                  <li key={point.href} className="flex items-start gap-3 text-[0.9375rem]">
                    <span className="mt-[3px] shrink-0" style={{ color: GRAPHITE }}>
                      <Icon name="check" size={16} strokeWidth={2.4} />
                    </span>
                    <span>
                      <Link
                        href={point.href}
                        className="font-medium text-ink underline decoration-transparent underline-offset-[3px] transition-colors hover:decoration-current"
                      >
                        {point.name}
                      </Link>
                      <span className="text-ink-3"> — {point.line}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Link href={row.cta.href} className="zig-button mt-8">
                {row.cta.label}
                <Icon name="arrow" size={15} />
              </Link>
            </div>
            <div className="w-full min-w-0 flex-1 transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02]">
              <Peek visual={row.visual} index={i} />
            </div>
          </article>
        ))}
      </div>
    </Band>
  );
}
