import type { Ref } from 'react';

/**
 * The Pixel Kinetix mark, drawn from the identity's own geometry (`logo/*.svg`).
 *
 * The symbol is one letter and one pixel locked into a square: a P reduced to a stem and one
 * quarter-circle bowl, and the pixel beside it, 0.16 of a stem away. On a 216 grid the stem is
 * 100, the gap 16, the bowl's radius 100. The wordmark is always one colour — ink on light, white
 * on dark; the blue lives only in the pixel.
 */
export const SYMBOL = {
  size: 216,
  p: 'M0,0 H116 A100,100 0 0 1 216,100 H100 V216 H0 Z',
  pixel: 'M116,116 H216 V216 H116 Z',
} as const;

/** The horizontal lockup: the symbol 140 tall, the wordmark's cap height the same, 0.44 x-height
 *  apart. ViewBox `0 -140 1256.12 142`. */
const LOCKUP = {
  viewBox: '0 -140 1256.12 142',
  p: 'M0,-140 H75.19 A64.81,64.81 0 0 1 140,-75.19 H64.81 V0 H0 Z',
  pixel: 'M75.19,-64.81 H140 V0 H75.19 Z',
  wordmark: 'translate(184 0) scale(2.19)',
} as const;

/** The wordmark's glyphs at cap height 63.97, baseline y = 0. `true` marks an even-odd counter. */
const WORDMARK: [string, boolean][] = [
  [
    'M0 -63.97H30.84A20.99 20.99 0 0 1 30.84 -21.99H12V0H0ZM12 -53.11H28.64A10.28 10.28 0 0 1 28.64 -32.55H12Z',
    true,
  ],
  ['M56.03 -45.62L68.03 -45.62L68.03 0L56.03 0Z', false],
  ['M55.48 -57.42A6.55 6.55 0 1 0 68.58 -57.42A6.55 6.55 0 1 0 55.48 -57.42Z', false],
  ['M110.43 -45.62L124.83 -45.62L86.51 0L72.11 0Z', false],
  ['M72.11 -45.62L86.51 -45.62L124.83 0L110.43 0Z', false],
  [
    'M170.42 -19.08A24.4 23.91 0 1 0 169.21 -14.62H156.63A12.82 14 0 0 1 134.04 -19.08ZM134.14 -27.26A12.82 14 0 0 1 158.56 -27.26Z',
    true,
  ],
  ['M175.61 -63.97L187.61 -63.97L187.61 0L175.61 0Z', false],
  ['M211.21 -63.97L223.21 -63.97L223.21 0L211.21 0Z', false],
  ['M250.44 -63.97L266.04 -63.97L217.21 -11.07L217.21 -27.97Z', false],
  ['M227.52 -30.69L235.98 -39.85L266.39 0L250.94 0Z', false],
  ['M269.82 -45.62L281.82 -45.62L281.82 0L269.82 0Z', false],
  ['M269.27 -57.42A6.55 6.55 0 1 0 282.37 -57.42A6.55 6.55 0 1 0 269.27 -57.42Z', false],
  [
    'M289.1 0V-45.43H300.7V-39.89C302.84 -41.71 304.92 -43.73 307.51 -44.93C315.89 -48.82 327.5 -46.21 331.97 -37.73C334.62 -32.7 334.29 -27.12 334.29 -21.62V0H322.69V-20.62C322.69 -24.54 323.05 -29.07 320.67 -32.45C316.9 -37.81 306.76 -37.76 302.94 -32.51C300.4 -29.01 300.82 -24.71 300.7 -20.62V0Z',
    false,
  ],
  [
    'M386.95 -19.08A24.4 23.91 0 1 0 385.74 -14.62H373.16A12.82 14 0 0 1 350.57 -19.08ZM350.67 -27.26A12.82 14 0 0 1 375.09 -27.26Z',
    true,
  ],
  [
    'M394.24 -58.35H406.24V-45.62H417.69V-35.87H406.24V-13.67A3.5 3.5 0 0 0 409.74 -10.17H417.64V0H406.84A12.6 14.12 0 0 1 394.24 -14.12V-35.87H387.44V-45.62H394.24Z',
    false,
  ],
  ['M422.92 -45.62L434.92 -45.62L434.92 0L422.92 0Z', false],
  ['M422.37 -57.42A6.55 6.55 0 1 0 435.47 -57.42A6.55 6.55 0 1 0 422.37 -57.42Z', false],
  ['M475.48 -45.62L489.88 -45.62L451.56 0L437.16 0Z', false],
  ['M437.16 -45.62L451.56 -45.62L489.88 0L475.48 0Z', false],
];

export const KINETIC = '#FF3D00';

function Glyphs({ fill }: { fill: string }) {
  return (
    <>
      {WORDMARK.map(([d, evenodd]) => (
        <path key={d} d={d} fill={fill} fillRule={evenodd ? 'evenodd' : undefined} />
      ))}
    </>
  );
}

/** The symbol alone. `pixelRef` hands the pixel to whatever turns it. */
export function BrandSymbol({
  className = '',
  ink = 'currentColor',
  pixel = KINETIC,
  pixelRef,
  title,
}: {
  className?: string;
  ink?: string;
  pixel?: string;
  pixelRef?: Ref<SVGPathElement>;
  title?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${SYMBOL.size} ${SYMBOL.size}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={SYMBOL.p} fill={ink} />
      <path ref={pixelRef} className="pk-px" d={SYMBOL.pixel} fill={pixel} />
    </svg>
  );
}

/** The horizontal lockup. */
export function BrandLockup({
  className = '',
  ink = 'currentColor',
  pixel = KINETIC,
  pixelRef,
}: {
  className?: string;
  ink?: string;
  pixel?: string;
  pixelRef?: Ref<SVGPathElement>;
}) {
  return (
    <svg viewBox={LOCKUP.viewBox} className={className} aria-hidden="true" focusable="false">
      <path d={LOCKUP.p} fill={ink} />
      <path ref={pixelRef} className="pk-px" d={LOCKUP.pixel} fill={pixel} />
      <g transform={LOCKUP.wordmark}>
        <Glyphs fill={ink} />
      </g>
    </svg>
  );
}

/** The wordmark alone, one colour. ViewBox `0 -63.97 489.88 64.89`. */
export function BrandWordmark({ className = '', ink = 'currentColor' }) {
  return (
    <svg viewBox="0 -63.97 489.88 64.89" className={className} aria-hidden="true" focusable="false">
      <Glyphs fill={ink} />
    </svg>
  );
}
