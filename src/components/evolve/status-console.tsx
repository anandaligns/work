'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';

import { Icon, type IconName } from '../ui/icon';

/**
 * Evolve's opening picture: the care plan's own console for a site on it, live. All systems
 * normal, ninety days of uptime as bars (one slow day, one six-minute outage), the response time
 * coming down since the move, the three checks, and "last checked" counting up and starting again
 * every minute, as the monitor does. A change done and last night's backup float beside it. It is
 * an example — the site, figures and times are illustrative — and it holds still off screen and
 * under reduced motion.
 */
const DAYS = Array.from({ length: 60 }, (_, i) => (i === 41 ? 'down' : i === 17 ? 'slow' : 'up'));
const RESPONSE = [420, 400, 380, 350, 330, 310, 300, 290, 280, 270, 262, 255, 250, 246, 242, 240];

const CHECKS: { icon: IconName; title: string; meta: string }[] = [
  { icon: 'lock', title: 'SSL certificate', meta: 'Valid for 84 more days' },
  { icon: 'database', title: 'Last backup', meta: 'Today, 2:00 am · 1.2 GB' },
  { icon: 'shield', title: 'Security updates', meta: 'Applied Tuesday' },
];

function Spark({ values }: { values: number[] }) {
  const most = Math.max(...values);
  const least = Math.min(...values);
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      // Faster is lower on the chart's own terms but reads better falling: high values at the top.
      const y = 6 + ((most - v) / (most - least)) * 28;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-10 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="evolve-spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,40 ${points} 100,40`} fill="url(#evolve-spark)" />
      <polyline
        points={points}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        className="evolve-console__line"
      />
    </svg>
  );
}

export function StatusConsole({ accent }: { accent: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [seconds, setSeconds] = useState(12);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const sight = new IntersectionObserver(([entry]) => setPlay(Boolean(entry?.isIntersecting)));
    sight.observe(el);
    return () => sight.disconnect();
  }, []);

  useEffect(() => {
    if (!play || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setSeconds((s) => (s >= 59 ? 1 : s + 1)), 1000);
    return () => window.clearInterval(timer);
  }, [play]);

  return (
    <div
      ref={box}
      aria-hidden="true"
      data-play={play || undefined}
      className="evolve-console relative"
      style={{ '--accent': accent } as CSSProperties}
    >
      <div className="evolve-console__card relative z-[1] rounded-[1.5rem] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
              <Icon name="globe" size={15} />
            </span>
            <span className="truncate text-[0.9375rem] font-semibold text-white">
              yourbusiness.in
            </span>
          </span>
          <span className="evolve-console__ok inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap">
            <span className="evolve-console__pulse" />
            All systems normal
          </span>
        </div>

        <div className="mt-7 flex items-end justify-between gap-4">
          <span>
            <span className="block font-mono text-[10.5px] tracking-[0.16em] text-white/45 uppercase">
              Uptime · 90 days
            </span>
            <span className="mt-1 block font-display text-[2.5rem] leading-none tracking-[-0.03em] text-white">
              99.98%
            </span>
          </span>
          <span className="text-right text-xs text-white/50">
            1 outage · 6 min
            <br />
            fixed and noted
          </span>
        </div>
        <div className="mt-4 grid grid-cols-[repeat(60,minmax(0,1fr))] gap-[2px]">
          {DAYS.map((day, i) => (
            <span
              key={i}
              className={`evolve-console__day h-7 rounded-[2px] evolve-console__day--${day}`}
              style={{ '--i': i } as CSSProperties}
            />
          ))}
        </div>

        <div className="mt-6 grid gap-5 border-t border-white/10 pt-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <span className="flex items-baseline justify-between">
              <span className="font-mono text-[10.5px] tracking-[0.16em] text-white/45 uppercase">
                Response time
              </span>
              <span className="text-sm font-semibold text-white">240 ms</span>
            </span>
            <div className="mt-2">
              <Spark values={RESPONSE} />
            </div>
            <span className="text-xs text-white/45">420 ms before the move</span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {CHECKS.map((check) => (
              <li key={check.title} className="flex items-center gap-3">
                <span className="evolve-console__tick grid size-7 shrink-0 place-items-center rounded-full">
                  <Icon name="check" size={12} strokeWidth={2.6} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.8125rem] font-medium text-white">
                    {check.title}
                  </span>
                  <span className="block truncate text-xs text-white/50">{check.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-white/45 uppercase">
          <Icon name="refresh" size={12} className="evolve-console__spin" />
          Last checked {seconds} s ago
        </p>
      </div>

      <div className="evolve-console__float evolve-console__float--a">
        <span className="evolve-console__float-mark grid size-9 place-items-center rounded-[10px]">
          <Icon name="pen" size={15} />
        </span>
        <span>
          <span className="block text-[13px] font-semibold text-ink">Change done</span>
          <span className="block text-[11.5px] text-ink-2">Diwali banner · live</span>
        </span>
      </div>
      <div className="evolve-console__float evolve-console__float--b">
        <span className="evolve-console__float-mark grid size-9 place-items-center rounded-[10px]">
          <Icon name="database" size={15} />
        </span>
        <span>
          <span className="block text-[13px] font-semibold text-ink">Backed up</span>
          <span className="block text-[11.5px] text-ink-2">Tonight, 2:00 am</span>
        </span>
      </div>
    </div>
  );
}
