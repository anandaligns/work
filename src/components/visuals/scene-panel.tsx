import type { ReactNode } from 'react';

import type { Tint } from '@/content/pages';

/**
 * A picture's frame, after the home page's Services panel: one white panel on a hairline, the
 * picture centred on a fine grid that fades out towards the edges. (A page's tint is no longer
 * painted behind it: the pictures below each opening are graphite on white.) The picture only
 * repeats what the page says, so the frame is hidden from assistive tech.
 */
export const TINT_BG: Record<Tint | 'white', string> = {
  violet: 'bg-tint-violet',
  sky: 'bg-tint-sky',
  mint: 'bg-tint-mint',
  butter: 'bg-tint-butter',
  blush: 'bg-tint-blush',
  white: 'bg-white',
};

/** The same tints as colours, for a canvas that covers them (the pixel dissolve). */
export const TINT_HEX: Record<Tint | 'white', string> = {
  violet: '#eceefb',
  sky: '#e5f3fb',
  mint: '#e6f7ee',
  butter: '#fff5d6',
  blush: '#fdecee',
  white: '#ffffff',
};

export function Corners() {
  const mark = 'absolute size-2.5 border-ink';
  return (
    <>
      <span aria-hidden="true" className={`${mark} top-4 left-4 border-t border-l`} />
      <span aria-hidden="true" className={`${mark} top-4 right-4 border-t border-r`} />
      <span aria-hidden="true" className={`${mark} bottom-4 left-4 border-b border-l`} />
      <span aria-hidden="true" className={`${mark} right-4 bottom-4 border-r border-b`} />
    </>
  );
}

export function ScenePanel({
  tint = 'white',
  surface,
  className = '',
  innerClassName = 'h-[19rem] p-10 sm:h-[26rem] sm:p-14',
  children,
}: {
  tint?: Tint | 'white';
  /** A background of the page's own in place of the tint: a service page's soft surface. */
  surface?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <div aria-hidden="true" className={className} data-tint={surface ? undefined : tint}>
      <div className="ground ground--grid relative overflow-hidden rounded-[1.75rem] border border-line">
        <div
          className={`relative grid place-items-center [&_svg]:max-h-full [&_svg]:max-w-[30rem] ${innerClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
