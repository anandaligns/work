import type { CSSProperties } from 'react';

/**
 * The home page's own light tints — sky, violet, mint, butter and blush — each with a deeper and
 * a paler step of itself, blurred together into a soft, out-of-focus wash. The review cards and
 * the hero's tiles are drawn on them.
 */
export const TINTS = [
  { base: '#e5f3fb', deep: '#b3dbf1', pale: '#f4fafd', ink: '#1e9be0' },
  { base: '#eceefb', deep: '#c9cdf2', pale: '#f7f8fe', ink: '#6e78ff' },
  { base: '#e6f7ee', deep: '#b6e3cb', pale: '#f4fbf7', ink: '#1fb866' },
  { base: '#fff5d6', deep: '#fbdc82', pale: '#fffbef', ink: '#f0a500' },
  { base: '#fdecee', deep: '#f4bdc6', pale: '#fff6f7', ink: '#f0506e' },
];

const SPOTS = [
  ['24% 16%', '80% 70%', '16% 90%'],
  ['72% 12%', '20% 64%', '86% 94%'],
  ['48% 24%', '88% 56%', '10% 80%'],
  ['18% 32%', '66% 86%', '92% 18%'],
  ['60% 20%', '14% 50%', '80% 88%'],
];

/**
 * `edges` moves the deeper tones out to the sides and corners, for a tile whose middle a phone
 * covers — so the wash still shows around it.
 */
export const wash = (i: number, edges = false): CSSProperties => {
  const t = TINTS[i % TINTS.length]!;
  const spots = edges
    ? (['50% 0%', i % 2 ? '0% 100%' : '100% 100%', i % 2 ? '100% 45%' : '0% 45%'] as const)
    : SPOTS[i % SPOTS.length]!;
  const size = edges ? ['90% 40%', '95% 70%', '70% 55%'] : ['48% 38%', '58% 46%', '42% 34%'];
  return {
    backgroundColor: t.base,
    backgroundImage: [
      `radial-gradient(${size[0]} at ${spots[0]}, ${t.pale}, transparent 72%)`,
      `radial-gradient(${size[1]} at ${spots[1]}, ${t.deep}, transparent 72%)`,
      `radial-gradient(${size[2]} at ${spots[2]}, color-mix(in srgb, ${t.deep} 70%, white), transparent 74%)`,
    ].join(', '),
  };
};
