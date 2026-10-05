'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';

import { type Desk, DeskView } from '../screens/desk-views';
import { Icon, type IconName } from '../ui/icon';

/**
 * Lightfield's opening picture: the product itself at nearly full size, running off the right of
 * the screen and fading out at the foot, with a chip over it saying what the system is doing
 * right now. Every few seconds the chip moves on to the next task and the window to the screen
 * that task is done on. Under reduced motion the first task stays. It repeats what the page
 * says, so it is hidden from assistive tech.
 */
const DWELL = 4500;

export type StageTask = { icon: IconName; title: string; line: string; screen: Desk };

export function AppStage({
  tasks,
  accent,
  lifted = false,
  className = '',
}: {
  tasks: StageTask[];
  accent: string;
  /** On a white ground: the chip and the window lifted off it by a soft shadow. */
  lifted?: boolean;
  className?: string;
}) {
  const lift = lifted
    ? 'shadow-[0_1px_2px_rgb(11_13_18/0.04),0_24px_60px_-28px_rgb(11_13_18/0.22)]'
    : '';
  const [at, setAt] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  // The tasks turn over only while the stage is on screen.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    const run = (on: boolean) => {
      window.clearInterval(timer);
      if (on) timer = window.setInterval(() => setAt((i) => (i + 1) % tasks.length), DWELL);
    };
    run(true);
    const el = root.current;
    const io =
      el && 'IntersectionObserver' in window
        ? new IntersectionObserver((entries) => run(entries.some((e) => e.isIntersecting)))
        : null;
    if (el) io?.observe(el);
    return () => {
      window.clearInterval(timer);
      io?.disconnect();
    };
  }, [tasks.length]);

  const task = tasks[at]!;
  return (
    <div
      ref={root}
      aria-hidden="true"
      className={`overflow-hidden [mask-image:linear-gradient(to_bottom,#000_58%,transparent_96%)] ${className}`}
    >
      <div
        className={`flex w-fit max-w-full items-center gap-3 rounded-xl border border-black/[0.07] bg-white py-2.5 pr-3.5 pl-3.5 text-[0.8125rem] ${lift}`}
      >
        <span key={`i${at}`} className="view-swap shrink-0 text-ink">
          <Icon name={task.icon} size={15} />
        </span>
        <span key={`t${at}`} className="view-swap flex min-w-0 items-baseline gap-2">
          <span className="shrink-0 font-semibold text-ink">{task.title}</span>
          <span className="truncate text-ink-3">{task.line}</span>
        </span>
        <span className="ml-4 size-3.5 shrink-0 animate-spin rounded-full border-[1.5px] border-line-2 border-t-ink-3 motion-reduce:animate-none sm:ml-10" />
      </div>
      <div
        className={`mt-3 w-fit overflow-hidden rounded-[14px] border border-black/[0.07] bg-white ${lift}`}
        style={{ '--accent': accent } as CSSProperties}
      >
        <div key={at} className="view-swap">
          <DeskView screen={task.screen} frame="stage" />
        </div>
      </div>
    </div>
  );
}
