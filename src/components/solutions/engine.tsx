'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/motion/tabs';
import type { EngineNode, EngineTab } from '@/content/lab/never-miss-a-lead';

import { KINETIC, SYMBOL } from '../ui/brand';
import { logoPath } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { moveBetweenTabs } from '../ui/segmented';
import { Box, INK, leftMatrix, Scene } from '../visuals/iso';

/**
 * aoutive's "One AI engine" section, as a solution's one system: the heading and its line, four
 * tabs in two rows of two, and beside them a stack of windows drawn in the isometric kit. The
 * front window shows the open tab's work — where it comes from down the left, our mark in the
 * middle, where it goes down the right, the work running along the wires in Kinetic Orange — and
 * the windows behind it stand for everything else the system keeps running.
 *
 * The tabs take turns on their own, a line under the open one filling as it waits; a pointer
 * resting on them or keyboard focus holds the turn, and choosing one restarts it there. Under
 * reduced motion nothing advances or runs. The picture repeats the tabs' words, so it is hidden
 * from assistive tech. The tabs are beUI's (`@beui/tabs`); the open one's card glides between them.
 */
const DWELL = 7000;

// The window, in world units: its long edge along x, its face towards the lower left.
const W = 300;
const H = 210;
const D = 12;
const BAR = 24;
const TILE = 34;
const MID = 46;
const ROWS = [66, 121, 176];
const CY = 121;
const LEFT = 22;
const RIGHT = W - 22 - TILE;
const BUS_L = 86;
const BUS_R = W - 86;
const GHOSTS = [-192, -128, -64];

function Node({ node, u, v }: { node: EngineNode; u: number; v: number }) {
  const y = v - TILE / 2;
  return (
    <g>
      <rect
        x={u}
        y={y}
        width={TILE}
        height={TILE}
        rx={7}
        fill="#fff"
        stroke={INK}
        strokeWidth={1.1}
      />
      {'logo' in node ? (
        <g transform={`translate(${u + (TILE - 18) / 2} ${v - 9}) scale(0.75)`}>
          <path d={logoPath(node.logo)} fill={INK} />
        </g>
      ) : (
        <g transform={`translate(${u + (TILE - 18) / 2} ${v - 9})`} color={INK}>
          <Icon name={node.icon} size={18} strokeWidth={1.9} />
        </g>
      )}
    </g>
  );
}

/** The front window's face: the open tab's work, wired through our mark. */
function Face({ tab }: { tab: EngineTab }) {
  const size = MID * 0.56;
  const inset = (MID - size) / 2;
  const mx = W / 2 - MID / 2;
  const my = CY - MID / 2;
  const into = ROWS.map((v) => `M${LEFT + TILE} ${v} H${BUS_L} V${CY} H${mx}`);
  const out = ROWS.map((v) => `M${mx + MID} ${CY} H${BUS_R} V${v} H${RIGHT}`);
  return (
    <g>
      {[...into, ...out].map((d) => (
        <path key={d} d={d} fill="none" stroke={INK} strokeWidth={0.9} strokeLinejoin="round" />
      ))}
      {into.map((d, i) => (
        <path
          key={`in-${d}`}
          d={d}
          fill="none"
          stroke={KINETIC}
          strokeWidth={1.8}
          strokeLinecap="round"
          className="engine-flow"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
      {out.map((d, i) => (
        <path
          key={`out-${d}`}
          d={d}
          fill="none"
          stroke={KINETIC}
          strokeWidth={1.8}
          strokeLinecap="round"
          className="engine-flow"
          style={{ animationDelay: `${1.1 + i * 0.25}s` }}
        />
      ))}
      {tab.from.map((node, i) => (
        <Node key={`f${i}`} node={node} u={LEFT} v={ROWS[i]!} />
      ))}
      {tab.to.map((node, i) => (
        <Node key={`t${i}`} node={node} u={RIGHT} v={ROWS[i]!} />
      ))}
      <rect x={mx} y={my} width={MID} height={MID} rx={10} fill={INK} />
      <g
        transform={`translate(${mx + inset} ${my + inset}) scale(${(size / SYMBOL.size).toFixed(4)})`}
      >
        <path d={SYMBOL.p} fill="#fff" />
        <path d={SYMBOL.pixel} fill={KINETIC} />
      </g>
      {[
        ...ROWS.map((v) => [LEFT + TILE, v]),
        ...ROWS.map((v) => [RIGHT, v]),
        [mx, CY],
        [mx + MID, CY],
      ].map(([u, v]) => (
        <circle key={`${u}-${v}`} cx={u} cy={v} r={2.4} fill="#fff" stroke={INK} strokeWidth={1} />
      ))}
    </g>
  );
}

/** A window's bar: a rim under three outlined dots. */
function Bar({ tone }: { tone: string }) {
  return (
    <g>
      <rect x={0} y={0} width={W} height={BAR} fill={tone === INK ? '#efefef' : '#f7f7f8'} />
      <line x1={0} y1={BAR} x2={W} y2={BAR} stroke={tone} strokeWidth={1} />
      {[14, 27, 40].map((u) => (
        <circle key={u} cx={u} cy={BAR / 2} r={4} fill="#fff" stroke={tone} strokeWidth={1} />
      ))}
    </g>
  );
}

function EngineScene({ tab, index }: { tab: EngineTab; index: number }) {
  const ghost = '#d6d8de';
  return (
    <Scene box={[-34, -330, 490, 500]}>
      {GHOSTS.map((y) => (
        <Box key={y} x={0} y={y} w={W} d={D} h={H} tone="white" stroke={ghost}>
          <g transform={leftMatrix(0, y + D, H)}>
            <Bar tone={ghost} />
            {[70, 100, 130, 160].map((v, i) => (
              <rect
                key={v}
                x={W - 120 + (i % 2) * 20}
                y={v}
                width={80 - (i % 2) * 20}
                height={7}
                rx={3.5}
                fill="#eceef1"
              />
            ))}
          </g>
        </Box>
      ))}
      <Box x={0} y={0} w={W} d={D} h={H} tone="frame">
        <g transform={leftMatrix(0, D, H)}>
          <Bar tone={INK} />
          <g key={index} className="engine-swap">
            <Face tab={tab} />
          </g>
        </g>
      </Box>
    </Scene>
  );
}

export function Engine({
  head,
  tabs,
  accent,
}: {
  /** The section's heading and line, above the tabs. */
  head: ReactNode;
  tabs: EngineTab[];
  accent: string;
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const reduce = useRef(false);
  const remaining = useRef(DWELL);
  const paused = hovered || focused;

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // A new tab gets the whole dwell; declared before the clock so it runs first.
  useEffect(() => {
    remaining.current = DWELL;
  }, [active, cycle]);

  // The clock runs on what is left of the dwell, and a pause banks what has been spent.
  useEffect(() => {
    if (paused || reduce.current) return;
    const started = performance.now();
    const timer = window.setTimeout(
      () => setActive((i) => (i + 1) % tabs.length),
      remaining.current,
    );
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [active, paused, cycle, tabs.length]);

  const choose = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <div
      className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      data-paused={paused || undefined}
    >
      <div className="lg:col-start-1 lg:row-start-1">{head}</div>

      <div aria-hidden="true" className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(11_13_18/0.1)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_72%)]" />
        <div className="relative mx-auto max-w-[36rem]">
          <EngineScene tab={tabs[active]!} index={active} />
        </div>
      </div>

      {/* beUI's tabs (`@beui/tabs`, the underline variant laid out as a grid): the white card is
          the indicator, and it glides from one tab to the next as they take their turns. */}
      <Tabs
        value={String(active)}
        onValueChange={(value) => choose(Number(value))}
        variant="underline"
        className="lg:col-start-1 lg:row-start-2"
      >
        <TabsList
          aria-label="What the system does"
          className="grid w-full items-stretch gap-2 border-b-0 p-1 pb-6 sm:grid-cols-2"
          wrapperClassName="-m-1 -mb-6"
          onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={(event) => setFocused(event.target.matches(':focus-visible'))}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          {tabs.map((tab, i) => {
            const on = i === active;
            return (
              <TabsTrigger
                key={tab.title}
                value={String(i)}
                tabIndex={on ? 0 : -1}
                onKeyDown={moveBetweenTabs}
                indicatorClassName="engine-card top-0 h-auto -z-10 rounded-2xl shadow-[0_1px_2px_rgb(11_13_18/0.05),0_16px_36px_-22px_rgb(11_13_18/0.25)]"
                className={`mb-0 flex h-full min-h-0 flex-col items-start justify-start rounded-2xl p-6 text-left whitespace-normal transition-[background-color] duration-500 lg:p-7 ${
                  on ? '' : 'hover:bg-black/[0.025]'
                }`}
              >
                <span
                  className={`block font-display text-[1.25rem] leading-tight font-medium tracking-[-0.02em] transition-colors duration-500 ${on ? 'text-ink' : 'text-ink-3'}`}
                >
                  {tab.title}
                </span>
                <span
                  className={`mt-3 block text-[0.9375rem] leading-relaxed transition-colors duration-500 ${on ? 'text-ink-2' : 'text-ink-3'}`}
                >
                  {tab.text}
                </span>
                {on ? (
                  <span
                    aria-hidden="true"
                    key={`${active}-${cycle}`}
                    className="engine-progress absolute right-6 bottom-0 left-6 h-[2px] lg:right-7 lg:left-7"
                    style={{ background: accent, '--dwell': `${DWELL}ms` } as CSSProperties}
                  />
                ) : null}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
}
