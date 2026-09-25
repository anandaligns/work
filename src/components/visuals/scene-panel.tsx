import type { ReactNode } from 'react';

import type { Tint } from '@/content/pages';

/**
 * automatix's frame, as the Solutions picture has it: a padded outer card, the picture in a rounded
 * panel inside it, framed by four corner marks and centred on a dotted grid that fades out towards
 * the edges. The panel takes a page's tint, or stays white. The picture only repeats what the page
 * says, so the frame is hidden from assistive tech.
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
  className = '',
  innerClassName = 'h-[19rem] p-10 sm:h-[26rem] sm:p-14',
  children,
}: {
  tint?: Tint | 'white';
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-[2rem] border border-line bg-fill p-3 sm:p-5 ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.4rem] border border-line ${TINT_BG[tint]}`}
      >
        <Corners />
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(11_13_18/0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" />
        <div
          className={`relative grid place-items-center [&_svg]:max-h-full [&_svg]:max-w-[30rem] ${innerClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
