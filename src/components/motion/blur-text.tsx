import { Fragment, type CSSProperties } from 'react';

/**
 * aoutive's headline effect: every character arrives from `blur(10px)`, invisible and a little
 * low, on a stagger. Measured from the template's own animation config — blur 10px, y 10, a
 * springy 0.4s per token — and rebuilt in CSS (`.blur-char`), so it starts at first paint instead
 * of waiting for hydration. The sentence itself is in the accessibility tree once, whole; the
 * animated copy is hidden from it, because a screen reader should not spell a headline out — and
 * its characters are drawn by CSS from `data-c` (`.blur-glyph`), so search engines and answer
 * engines read the headline once too.
 *
 * A newline in `text` is where the line breaks from the `sm` width up; below it the words wrap
 * where they fall, as a phone's narrow column needs.
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
  const lines = text.split('\n');
  return (
    <span className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      <span aria-hidden="true">
        {lines.map((line, l) => {
          const words = line.split(' ');
          return (
            <Fragment key={l}>
              {l > 0 ? (
                <>
                  {' '}
                  <br className="hidden sm:inline" />
                </>
              ) : null}
              {words.map((word, w) => (
                <span key={`${word}-${l}-${w}`}>
                  <span className="inline-block whitespace-nowrap">
                    {[...word].map((char) => {
                      const d = delay + index++ * stagger;
                      return (
                        <span
                          key={d}
                          className="blur-char blur-glyph"
                          data-c={char}
                          style={{ '--d': d } as CSSProperties}
                        />
                      );
                    })}
                  </span>
                  {w < words.length - 1 ? ' ' : null}
                </span>
              ))}
            </Fragment>
          );
        })}
      </span>
    </span>
  );
}
