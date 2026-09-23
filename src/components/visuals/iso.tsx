import type { ReactNode } from 'react';

import { Icon, type IconName } from '../ui/icon';

/**
 * A small isometric drawing kit — the way aoutive's illustrations are made: white-topped blocks
 * outlined in ink, two grey side faces, the occasional solid-black block with a white glyph on
 * top, thin slabs, and connectors running across the ground plane with a dot at each joint.
 *
 * World axes: x runs down-right, y runs down-left, z runs up. Every shape is described in world
 * units and projected here, so a scene is a list of boxes rather than a hand-drawn path — which is
 * what keeps every illustration on the site at one angle, one stroke and one light.
 */

const C = Math.cos(Math.PI / 6);
const S = 0.5;

export const INK = '#1a1a1a';
const STROKE = 1.25;

export type Tone =
  'white' | 'black' | 'fill' | 'violet' | 'mint' | 'sky' | 'butter' | 'blush' | 'glass';

/** top, left (the +y face), right (the +x face) */
const FACES: Record<Tone, [string, string, string]> = {
  white: ['#ffffff', '#f2f2f2', '#e4e4e4'],
  fill: ['#f5f5f5', '#e9e9e9', '#dcdcdc'],
  black: ['#1a1a1a', '#2c2c2c', '#0e0e0e'],
  violet: ['#efecff', '#dfd9ff', '#cdc4ff'],
  mint: ['#e6f7ee', '#cfeedd', '#b6e3cb'],
  sky: ['#e5f3fb', '#cde8f7', '#b3dbf1'],
  butter: ['#fff5d6', '#ffe9a8', '#fbdc82'],
  blush: ['#fdecee', '#f9d6db', '#f4bdc6'],
  glass: ['rgba(255,255,255,0.25)', 'rgba(240,240,240,0.28)', 'rgba(228,228,228,0.32)'],
};

export const SIGNAL = {
  violet: '#6d5cff',
  green: '#1fb866',
  sky: '#1e9be0',
  amber: '#f0a500',
  rose: '#f0506e',
} as const;

export const p = (x: number, y: number, z = 0): [number, number] => [(x - y) * C, (x + y) * S - z];
const pts = (...points: [number, number, number][]) =>
  points
    .map(([x, y, z]) =>
      p(x, y, z)
        .map((v) => v.toFixed(2))
        .join(','),
    )
    .join(' ');

type BoxProps = {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
  stroke?: string;
  dashed?: boolean;
  children?: ReactNode;
};

/** A rectangular block. Children are drawn after the faces, for glyphs placed with `onTop`. */
export function Box({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  tone = 'white',
  stroke = INK,
  dashed,
  children,
}: BoxProps) {
  const [top, left, right] = FACES[tone];
  const common = {
    stroke,
    strokeWidth: STROKE,
    strokeLinejoin: 'round' as const,
    strokeDasharray: dashed ? '4 4' : undefined,
  };
  return (
    <g>
      <polygon
        points={pts([x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h])}
        fill={left}
        {...common}
      />
      <polygon
        points={pts([x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h])}
        fill={right}
        {...common}
      />
      <polygon
        points={pts([x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h])}
        fill={top}
        {...common}
      />
      {children}
    </g>
  );
}

/** A matrix that maps local 2D (u right, v down) onto the top face of a block at height z. */
export const topMatrix = (x: number, y: number, z: number) => {
  const [X, Y] = p(x, y, z);
  return `matrix(${C} ${S} ${-C} ${S} ${X.toFixed(2)} ${Y.toFixed(2)})`;
};
/** Onto the +y face (facing lower-left): u along x, v down the face. `z` is the face's top edge. */
export const leftMatrix = (x: number, y: number, z: number) => {
  const [X, Y] = p(x, y, z);
  return `matrix(${C} ${S} 0 1 ${X.toFixed(2)} ${Y.toFixed(2)})`;
};
/** Onto the +x face (facing lower-right): u along −y, v down the face. */
export const rightMatrix = (x: number, y: number, z: number) => {
  const [X, Y] = p(x, y, z);
  return `matrix(${C} ${-S} 0 1 ${X.toFixed(2)} ${Y.toFixed(2)})`;
};

/** A glyph lying flat on top of a block, centred, sized to the smaller side. */
export function TopGlyph({
  x,
  y,
  z,
  w,
  d,
  icon,
  color = INK,
  scale = 0.62,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  icon: IconName;
  color?: string;
  scale?: number;
}) {
  const size = Math.min(w, d) * scale;
  return (
    <g transform={topMatrix(x + (w - size) / 2, y + (d - size) / 2, z)} color={color}>
      <Icon name={icon} size={size} strokeWidth={1.9 * (24 / size)} />
    </g>
  );
}

/** A block with a glyph on top — aoutive's icon cube. */
export function GlyphBlock({
  x,
  y,
  z = 0,
  s,
  h,
  icon,
  tone = 'white',
  glyph,
}: {
  x: number;
  y: number;
  z?: number;
  s: number;
  h: number;
  icon: IconName;
  tone?: Tone;
  glyph?: string;
}) {
  const color = glyph ?? (tone === 'black' ? '#ffffff' : INK);
  return (
    <Box x={x} y={y} z={z} w={s} d={s} h={h} tone={tone}>
      <TopGlyph x={x} y={y} z={z + h} w={s} d={s} icon={icon} color={color} />
    </Box>
  );
}

/**
 * The Pixel Kinetix mark lying on a top face: the three stepped pixels from the logo, scaled to
 * a block of side `s`.
 */
export function MarkTop({
  x,
  y,
  z,
  s,
  color = '#ffffff',
}: {
  x: number;
  y: number;
  z: number;
  s: number;
  color?: string;
}) {
  return (
    <g transform={`${topMatrix(x, y, z)} scale(${(s / 64).toFixed(4)})`}>
      <rect x="12" y="32" width="20" height="20" rx="5" fill={color} />
      <rect x="26" y="20" width="16" height="16" rx="4" fill={color} opacity="0.7" />
      <rect x="38" y="11" width="13" height="13" rx="3.5" fill={color} opacity="0.42" />
    </g>
  );
}

/** The edges of a box that face the viewer, drawn over whatever sits inside it — glass. */
export function FrontEdges({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  color = INK,
}: {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  color?: string;
}) {
  const line = (a: [number, number, number], b: [number, number, number]) => {
    const [x1, y1] = p(...a);
    const [x2, y2] = p(...b);
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.1} />;
  };
  return (
    <g>
      {line([x + w, y + d, z], [x + w, y + d, z + h])}
      {line([x, y + d, z + h], [x + w, y + d, z + h])}
      {line([x + w, y, z + h], [x + w, y + d, z + h])}
      {line([x, y, z + h], [x + w, y, z + h])}
      {line([x, y, z + h], [x, y + d, z + h])}
    </g>
  );
}

/** A line across the ground (or at height z) between two world points. */
export function Wire({
  from,
  to,
  z = 0,
  dashed = false,
  color = INK,
}: {
  from: [number, number];
  to: [number, number];
  z?: number;
  dashed?: boolean;
  color?: string;
}) {
  const [x1, y1] = p(from[0], from[1], z);
  const [x2, y2] = p(to[0], to[1], z);
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={1}
      strokeDasharray={dashed ? '3 4' : undefined}
      strokeLinecap="round"
    />
  );
}

/** An L-shaped connector along x then y, the way aoutive routes its pipes. */
export function Route({
  points,
  z = 0,
  dashed = false,
  color = INK,
}: {
  points: [number, number][];
  z?: number;
  dashed?: boolean;
  color?: string;
}) {
  const d = points
    .map(([x, y], i) => {
      const [X, Y] = p(x, y, z);
      return `${i === 0 ? 'M' : 'L'}${X.toFixed(2)} ${Y.toFixed(2)}`;
    })
    .join(' ');
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1}
      strokeDasharray={dashed ? '3 4' : undefined}
      strokeLinejoin="round"
    />
  );
}

export function Joint({
  at,
  z = 0,
  r = 3,
  fill = INK,
}: {
  at: [number, number];
  z?: number;
  r?: number;
  fill?: string;
}) {
  const [X, Y] = p(at[0], at[1], z);
  return (
    <circle cx={X} cy={Y} r={r} fill={fill} stroke={fill === INK ? 'none' : INK} strokeWidth={1} />
  );
}

/**
 * A screen standing on its long edge, facing lower-left: a thin block whose +y face carries a
 * page layout. `draw` receives the face's width and height in local units.
 */
export function Screen({
  x,
  y,
  z = 0,
  w,
  h,
  depth = 6,
  tone = 'white',
  draw,
}: {
  x: number;
  y: number;
  z?: number;
  w: number;
  h: number;
  depth?: number;
  tone?: Tone;
  draw: (w: number, h: number) => ReactNode;
}) {
  return (
    <Box x={x} y={y} z={z} w={w} d={depth} h={h} tone={tone}>
      <g transform={leftMatrix(x, y + depth, z + h)}>{draw(w, h)}</g>
    </Box>
  );
}

/** A browser layout for a Screen's face: bar, dots, and whatever blocks the caller adds. */
export function BrowserFace({ w, h, children }: { w: number; h: number; children?: ReactNode }) {
  const bar = Math.min(16, h * 0.12);
  return (
    <g>
      <line x1={0} y1={bar} x2={w} y2={bar} stroke={INK} strokeWidth={1} />
      <circle cx={8} cy={bar / 2} r={2.2} fill={SIGNAL.rose} />
      <circle cx={15} cy={bar / 2} r={2.2} fill="#d0d0d0" />
      <circle cx={22} cy={bar / 2} r={2.2} fill="#d0d0d0" />
      <rect x={w * 0.35} y={bar / 2 - 2.5} width={w * 0.45} height={5} rx={2.5} fill="#ececec" />
      <g transform={`translate(0 ${bar})`}>{children}</g>
    </g>
  );
}

/**
 * An SVG sized to its scene. `box` is the viewBox in projected units; the art scales to the
 * container's width and keeps its aspect, crisp at any size.
 */
export function Scene({
  box,
  title,
  className = '',
  children,
}: {
  box: [number, number, number, number];
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={box.join(' ')}
      className={`block h-auto w-full ${className}`}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      {children}
    </svg>
  );
}
