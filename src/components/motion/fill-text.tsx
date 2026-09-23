import type { CSSProperties } from 'react';

/**
 * The half of a heading that fills with ink as it scrolls into view — aoutive's two-tone titles.
 *
 * Every character carries its index; the heading carries `--p`, its progress through the
 * viewport, written by `ScrollEffects`. Each character mixes ink over grey by how far `--p` has
 * passed it, so one custom property per heading drives every letter and nothing re-renders.
 * Without script `--p` stays at 1 and the heading is simply ink.
 */
export function FillText({ text }: { text: string }) {
  const chars = [...text];
  return (
    <span data-fill="" style={{ '--n': chars.length } as CSSProperties}>
      {chars.map((char, i) => (
        <span key={i} className="fill-char" style={{ '--i': i } as CSSProperties}>
          {char}
        </span>
      ))}
    </span>
  );
}
