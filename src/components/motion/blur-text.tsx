import type { CSSProperties } from 'react';

/**
 * aoutive's headline effect: every character arrives from `blur(10px)`, invisible and a little
 * low, on a stagger. Measured from the template's own animation config — blur 10px, y 10, a
 * springy 0.4s per token — and rebuilt in CSS (`.blur-char`), so it starts at first paint instead
 * of waiting for hydration. The sentence itself is in the accessibility tree once, whole; the
 * animated copy is hidden from it, because a screen reader should not spell a headline out.
 */
export function BlurText({
  text,
  delay = 0,
  stagger = 22,
  className = '',
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  let index = 0;
  const words = text.split(' ');
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={`${word}-${w}`}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char) => {
                const d = delay + index++ * stagger;
                return (
                  <span key={d} className="blur-char" style={{ '--d': d } as CSSProperties}>
                    {char}
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </span>
  );
}
