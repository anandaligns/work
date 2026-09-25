'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

import type { Tint } from '@/content/pages';

import { turn } from '../motion/quarter-turn';
import { KINETIC } from '../ui/brand';
import type { IconName } from '../ui/icon';
import { Box, GlyphBlock, INK, Joint, MarkTop, p, SIGNAL, type Tone } from './iso';
import { ScenePanel } from './scene-panel';

/**
 * The Connect scene — every page's closing picture but About's: the page's own subject, routed
 * through the Pixel Kinetix cube to a finished result. On the left, the subject as a tinted glyph
 * block; in the middle, the black cube with the P on top, its pixel in Kinetic Blue; on the right,
 * a white block with a check and a green signal beside it. Home's is `converge`: three blocks —
 * what customers see, what the team runs on, what runs on its own — meet in the cube, and the
 * result is Evolve's shield.
 *
 * Once, when it is 45% in view: the routes draw in (900ms), a Kinetic Blue dot travels subject →
 * cube → result (1.4s), the pixel makes its quarter-turn as the dot reaches the cube, and the
 * signal pings once. Pointing at it plays the dot again. Nothing loops, so there is no pause
 * button; under reduced motion it is drawn complete and still.
 */
type World = [number, number];

const S = 56;
const H = 26;
const CUBE = 92;
const CUBE_H = 64;
const M: World = [150, 150];
const R: World = [260, 40];
/** A converging scene's three subjects, stacked on the left, and where each meets the bus. */
const SUBJECTS: World[] = [
  [-50, 210],
  [30, 290],
  [110, 370],
];
const L: World = [40, 260];

const ROUTE_DRAW = 900;
const TRAVEL = 1400;

const screen = (w: World): [number, number] => p(w[0], w[1]);
const pathOf = (points: World[]) =>
  points
    .map((w, i) => {
      const [x, y] = screen(w);
      return `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');

type Subject = { icon: IconName; tone: Tone };

export function ConnectScene({
  icon = 'spark',
  tint = 'white',
  converge,
  result,
}: {
  icon?: IconName;
  /** The panel's tint, and the subject block's. */
  tint?: Tint | 'white';
  /** Several subjects meeting in the cube, in place of one. */
  converge?: Subject[];
  /** The result block: a white check unless given. */
  result?: Subject;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const running = useRef(false);

  const subjects: Subject[] = converge ?? [{ icon, tone: tint === 'white' ? 'white' : tint }];
  const count = subjects.length;
  const legs = useMemo<World[][]>(
    () =>
      converge
        ? SUBJECTS.slice(0, count).map((at) => [at, [M[0], at[1]], M])
        : [[L, [L[0], M[1]], M]],
    [converge, count],
  );
  const out = useMemo<World[]>(() => [M, [R[0], M[1]], R], []);
  const joints: World[] = [...legs.map((leg) => leg[1]!), out[1]!];
  const blocks = converge ? SUBJECTS.slice(0, subjects.length) : [L];
  const finish = result ?? { icon: 'check' as IconName, tone: 'white' as Tone };

  // The picture's extent, from the blocks it holds.
  const corners = [
    ...blocks.map((c) => [c[0] - S / 2, c[1] - S / 2, S, H] as const),
    [M[0] - CUBE / 2, M[1] - CUBE / 2, CUBE, CUBE_H] as const,
    [R[0] - S / 2, R[1] - S / 2, S, H] as const,
  ].flatMap(([x, y, s, h]) =>
    [0, s].flatMap((dx) => [0, s].flatMap((dy) => [0, h].map((dz) => p(x + dx, y + dy, dz)))),
  );
  const [signalX, signalY] = p(R[0] + S / 2, R[1] - S / 2, H + 6);
  const xs = [...corners.map((c) => c[0]), signalX + 14];
  const ys = corners.map((c) => c[1]);
  const pad = 18;
  const box = [
    Math.min(...xs) - pad,
    Math.min(...ys) - pad,
    Math.max(...xs) - Math.min(...xs) + pad * 2,
    Math.max(...ys) - Math.min(...ys) + pad * 2,
  ];

  const travel = useCallback((dots: SVGCircleElement[], paths: World[][], ms: number) => {
    const lines = paths.map((points) => points.map(screen));
    const lengths = lines.map((line) =>
      line.slice(1).map((pt, i) => Math.hypot(pt[0] - line[i]![0], pt[1] - line[i]![1])),
    );
    return new Promise<void>((resolve) => {
      const start = performance.now();
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        lines.forEach((line, k) => {
          const segments = lengths[k]!;
          let left = eased * segments.reduce((a, b) => a + b, 0);
          let i = 0;
          while (i < segments.length - 1 && left > segments[i]!) left -= segments[i++]!;
          const [ax, ay] = line[i]!;
          const [bx, by] = line[i + 1]!;
          const f = segments[i] ? Math.min(1, left / segments[i]!) : 1;
          dots[k]?.setAttribute('cx', (ax + (bx - ax) * f).toFixed(2));
          dots[k]?.setAttribute('cy', (ay + (by - ay) * f).toFixed(2));
        });
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });
  }, []);

  const play = useCallback(async () => {
    const root = svg.current;
    if (!root || running.current) return;
    running.current = true;
    const dots = [...root.querySelectorAll<SVGCircleElement>('[data-dot]')];
    const pixel = root.querySelector('[data-turn]');
    const legLength = (leg: World[]) =>
      leg
        .map(screen)
        .slice(1)
        .reduce((sum, pt, i, all) => {
          const prev = i ? all[i - 1]! : screen(leg[0]!);
          return sum + Math.hypot(pt[0] - prev[0], pt[1] - prev[1]);
        }, 0);
    const inShare = legLength(legs[0]!) / (legLength(legs[0]!) + legLength(out));
    const inMs = TRAVEL * inShare;

    dots.forEach((dot) => dot.setAttribute('opacity', '1'));
    await travel(dots.slice(0, legs.length), legs, inMs);
    turn(pixel);
    dots.slice(1).forEach((dot) => dot.setAttribute('opacity', '0'));
    await travel(dots.slice(0, 1), [out], TRAVEL - inMs);
    dots[0]?.setAttribute('opacity', '0');
    root.removeAttribute('data-ping');
    void root.getBoundingClientRect();
    root.setAttribute('data-ping', '');
    running.current = false;
  }, [legs, out, travel]);

  useEffect(() => {
    const root = svg.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.setAttribute('data-armed', '');
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        root.setAttribute('data-drawn', '');
        window.setTimeout(play, ROUTE_DRAW);
      },
      { threshold: 0.45 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [play]);

  return (
    <div
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse' && svg.current?.hasAttribute('data-drawn')) void play();
      }}
    >
      <ScenePanel tint={tint} innerClassName="h-[18rem] p-6 sm:h-[22rem] sm:p-8">
        <svg
          ref={svg}
          viewBox={box.map((v) => v.toFixed(1)).join(' ')}
          className="connect block h-auto w-full"
          aria-hidden="true"
          fill="none"
        >
          {[...legs, out].map((leg) => (
            <path
              key={leg.map((w) => w.join()).join(';')}
              d={pathOf(leg)}
              pathLength={1}
              className="connect__route"
              stroke={INK}
              strokeWidth={1}
              strokeLinejoin="round"
            />
          ))}
          <g className="connect__joints">
            {joints.map((at) => (
              <Joint key={at.join()} at={at} />
            ))}
          </g>
          {/* The dots run on the ground, so the blocks pass over them. */}
          {legs.map((leg) => {
            const [cx, cy] = screen(leg[0]!);
            return (
              <circle
                key={`dot-${leg[0]!.join()}`}
                data-dot=""
                cx={cx}
                cy={cy}
                r={5}
                fill={KINETIC}
                opacity={0}
              />
            );
          })}
          {blocks.map((c, i) => (
            <GlyphBlock
              key={c.join()}
              x={c[0] - S / 2}
              y={c[1] - S / 2}
              s={S}
              h={H}
              icon={subjects[i]!.icon}
              tone={subjects[i]!.tone}
            />
          ))}
          <Box x={M[0] - CUBE / 2} y={M[1] - CUBE / 2} w={CUBE} d={CUBE} h={CUBE_H} tone="black">
            <MarkTop x={M[0] - CUBE / 2} y={M[1] - CUBE / 2} z={CUBE_H} s={CUBE} />
          </Box>
          <GlyphBlock
            x={R[0] - S / 2}
            y={R[1] - S / 2}
            s={S}
            h={H}
            icon={finish.icon}
            tone={finish.tone}
          />
          <g transform={`translate(${(signalX + 6).toFixed(2)} ${signalY.toFixed(2)})`}>
            <circle className="connect__ping" r={5} fill={SIGNAL.green} />
            <circle r={5} fill={SIGNAL.green} stroke="#fff" strokeWidth={1.5} />
          </g>
        </svg>
      </ScenePanel>
    </div>
  );
}
