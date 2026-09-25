import type { ReactNode } from 'react';

import type { GroupSlug, Tint } from '@/content/pages';

import type { IconName } from '../ui/icon';
import {
  Box,
  BrowserFace,
  GlyphBlock,
  INK,
  Joint,
  MarkTop,
  p,
  Route,
  Screen,
  SIGNAL,
  type Tone,
} from './iso';
import {
  GetOnlineScene,
  ManagedScene,
  PageLayout,
  SERVICE_SCENES,
  SOLUTION_SCENES,
} from './scenes';

/**
 * Every page's hero scene, from the same drawing kit as the home page's — no new art, only new
 * arrangements of it. Each reads left to right: the customer's side, one black block (the Pixel
 * Kinetix cube, or the service's own black glyph block), then the business's side. Three to five
 * blocks, one tint (the group's), routes on the ground with a dot at each bend, and at most one
 * chip naming what happened — never a number.
 *
 * A scene here is a plan rather than a drawing: blocks, screens and routes placed by where they
 * stand on the ground, and the picture's extent worked out from them, so no viewBox is set by hand.
 * `at(x, y)` places a thing by where its foot lands on the page — x across, y down — so a row that
 * reads left to right is written as one.
 */

type W = [number, number];
type Face = 'site' | 'products' | 'login' | 'app' | 'phone' | 'chart' | 'table' | 'record';

type Node =
  | { kind: 'block'; c: W; s?: number; h?: number; z?: number; icon: IconName; tone?: Tone }
  | { kind: 'cube'; c: W; s?: number; h?: number }
  | { kind: 'slab'; c: W; w: number; d: number; h: number; z?: number; tone?: Tone }
  | { kind: 'screen'; c: W; w: number; h: number; z?: number; depth?: number; face: Face };

type Link = { from: W; to: W; via?: 'x' | 'y'; dashed?: boolean };

type Plan = {
  nodes: Node[];
  links?: Link[];
  chip?: { at: W; label: string; z?: number };
};

const C = Math.cos(Math.PI / 6);

/** A world point on the ground from where it lands on the page. */
export const at = (sx: number, sy: number): W => {
  const k = 2 * sy;
  const d = sx / C;
  return [(k + d) / 2, (k - d) / 2];
};

const ACCENT: Record<Tint | 'white', string> = {
  violet: SIGNAL.violet,
  sky: SIGNAL.sky,
  mint: SIGNAL.green,
  butter: SIGNAL.amber,
  blush: SIGNAL.rose,
  white: INK,
};
const TINT_FILL: Record<Tint | 'white', string> = {
  violet: '#eceefb',
  sky: '#e5f3fb',
  mint: '#e6f7ee',
  butter: '#fff5d6',
  blush: '#fdecee',
  white: '#f2f2f2',
};

// --- screen faces ---------------------------------------------------------------------------------

const line = (x: number, y: number, w: number, fill = '#d9d9d9', h = 3) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
);

function FaceArt({ face, w, h, tint }: { face: Face; w: number; h: number; tint: Tint }) {
  const accent = ACCENT[tint];
  const fill = TINT_FILL[tint];
  const bar = Math.min(16, h * 0.12);
  const H = h - bar;
  const pad = w * 0.07;
  switch (face) {
    case 'site':
      return (
        <BrowserFace w={w} h={h}>
          <PageLayout w={w} h={H} accent={accent} tint={fill} />
        </BrowserFace>
      );
    case 'products': {
      const cw = (w - pad * 2 - 8) / 3;
      const ch = (H - pad * 2 - 6) / 2;
      return (
        <BrowserFace w={w} h={h}>
          {[0, 1].flatMap((r) =>
            [0, 1, 2].map((c) => {
              const x = pad + c * (cw + 4);
              const y = pad * 0.8 + r * (ch + 6);
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={x}
                    y={y}
                    width={cw}
                    height={ch}
                    rx={2}
                    fill="#fff"
                    stroke={INK}
                    strokeWidth={0.8}
                  />
                  <rect x={x + 3} y={y + 3} width={cw - 6} height={ch * 0.5} rx={1.5} fill={fill} />
                  {line(x + 3, y + ch * 0.62, cw * 0.6, INK, 2.6)}
                  {line(x + 3, y + ch * 0.78, cw * 0.35, r + c === 1 ? accent : '#d9d9d9', 2.6)}
                </g>
              );
            }),
          )}
        </BrowserFace>
      );
    }
    case 'login': {
      const pw = w * 0.46;
      const ph = H * 0.74;
      const x = (w - pw) / 2;
      const y = (H - ph) / 2;
      return (
        <BrowserFace w={w} h={h}>
          <rect
            x={x}
            y={y}
            width={pw}
            height={ph}
            rx={4}
            fill="#fff"
            stroke={INK}
            strokeWidth={0.8}
          />
          <circle
            cx={w / 2}
            cy={y + ph * 0.2}
            r={ph * 0.09}
            fill={fill}
            stroke={INK}
            strokeWidth={0.8}
          />
          <rect
            x={x + pw * 0.12}
            y={y + ph * 0.38}
            width={pw * 0.76}
            height={ph * 0.12}
            rx={2}
            fill="#f2f2f2"
            stroke="#cfcfcf"
            strokeWidth={0.6}
          />
          <rect
            x={x + pw * 0.12}
            y={y + ph * 0.56}
            width={pw * 0.76}
            height={ph * 0.12}
            rx={2}
            fill="#f2f2f2"
            stroke="#cfcfcf"
            strokeWidth={0.6}
          />
          <rect
            x={x + pw * 0.12}
            y={y + ph * 0.76}
            width={pw * 0.76}
            height={ph * 0.12}
            rx={ph * 0.06}
            fill={accent}
          />
        </BrowserFace>
      );
    }
    case 'app': {
      const side = w * 0.22;
      const cw = (w - side - pad * 1.5 - 5) / 2;
      const ch = (H - pad * 2.2 - 5) / 2;
      return (
        <BrowserFace w={w} h={h}>
          <rect x={0} y={0} width={side} height={H} fill="#f4f5f8" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              {line(side * 0.18, H * 0.14 + i * H * 0.14, side * 0.62, i === 0 ? INK : '#cfcfcf')}
            </g>
          ))}
          {line(side + pad * 0.6, H * 0.1, w * 0.3, INK, 4)}
          {[0, 1].flatMap((r) =>
            [0, 1].map((c) => {
              const x = side + pad * 0.6 + c * (cw + 5);
              const y = H * 0.24 + r * (ch + 5);
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={x}
                    y={y}
                    width={cw}
                    height={ch}
                    rx={2.5}
                    fill="#fff"
                    stroke={INK}
                    strokeWidth={0.8}
                  />
                  <rect
                    x={x + 4}
                    y={y + 4}
                    width={cw * 0.28}
                    height={ch * 0.3}
                    rx={1.5}
                    fill={r + c === 0 ? accent : fill}
                  />
                  {line(x + 4, y + ch * 0.62, cw * 0.7)}
                </g>
              );
            }),
          )}
        </BrowserFace>
      );
    }
    case 'phone': {
      const inset = w * 0.08;
      return (
        <g>
          <rect
            x={inset}
            y={inset}
            width={w - inset * 2}
            height={h - inset * 2}
            rx={w * 0.14}
            fill="#fff"
            stroke={INK}
            strokeWidth={0.9}
          />
          {line(w * 0.38, inset + 4, w * 0.24, INK, 2.4)}
          <rect
            x={inset * 2.2}
            y={h * 0.14}
            width={w - inset * 4.4}
            height={h * 0.2}
            rx={3}
            fill={fill}
            stroke={INK}
            strokeWidth={0.7}
          />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={inset * 2.2}
                y={h * 0.4 + i * h * 0.15}
                width={w * 0.2}
                height={h * 0.1}
                rx={2}
                fill={i === 0 ? accent : '#e4e4e4'}
              />
              {line(
                inset * 2.2 + w * 0.26,
                h * 0.42 + i * h * 0.15,
                w * 0.42,
                i === 0 ? INK : '#cfcfcf',
                2.4,
              )}
            </g>
          ))}
        </g>
      );
    }
    case 'chart': {
      const bars = [0.35, 0.55, 0.45, 0.7, 0.6, 0.85];
      const bw = (w - pad * 2) / bars.length;
      const base = H * 0.86;
      return (
        <BrowserFace w={w} h={h}>
          {line(pad, H * 0.1, w * 0.32, INK, 4)}
          <line x1={pad} y1={base} x2={w - pad} y2={base} stroke={INK} strokeWidth={0.8} />
          {bars.map((b, i) => (
            <rect
              key={i}
              x={pad + i * bw + bw * 0.2}
              y={base - b * H * 0.55}
              width={bw * 0.6}
              height={b * H * 0.55}
              rx={1.5}
              fill={i === bars.length - 1 ? accent : fill}
              stroke={INK}
              strokeWidth={0.7}
            />
          ))}
          <polyline
            points={bars
              .map((b, i) => `${pad + i * bw + bw / 2},${base - b * H * 0.55 - 10}`)
              .join(' ')}
            stroke={accent}
            strokeWidth={1.2}
            fill="none"
          />
        </BrowserFace>
      );
    }
    case 'table': {
      const main = w * 0.64;
      return (
        <BrowserFace w={w} h={h}>
          <rect x={pad * 0.6} y={H * 0.1} width={main - pad} height={H * 0.1} fill={INK} rx={1.5} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line
                x1={pad * 0.6}
                y1={H * (0.32 + i * 0.13)}
                x2={main - pad * 0.4}
                y2={H * (0.32 + i * 0.13)}
                stroke="#d9d9d9"
                strokeWidth={0.8}
              />
              {line(pad, H * (0.25 + i * 0.13), main * 0.3, i === 1 ? accent : '#cfcfcf', 2.6)}
              {line(pad + main * 0.42, H * (0.25 + i * 0.13), main * 0.25, '#e0e0e0', 2.6)}
            </g>
          ))}
          <rect
            x={main + 2}
            y={H * 0.08}
            width={w - main - pad * 0.7}
            height={H * 0.84}
            rx={3}
            fill={fill}
            stroke={INK}
            strokeWidth={0.8}
          />
          {line(main + 7, H * 0.18, (w - main) * 0.5, INK, 3)}
          {line(main + 7, H * 0.3, (w - main) * 0.6)}
          {line(main + 7, H * 0.4, (w - main) * 0.45)}
          <rect
            x={main + 7}
            y={H * 0.74}
            width={(w - main) * 0.5}
            height={H * 0.1}
            rx={H * 0.05}
            fill={accent}
          />
        </BrowserFace>
      );
    }
    case 'record':
      return (
        <g>
          <circle
            cx={w * 0.2}
            cy={h * 0.28}
            r={h * 0.14}
            fill={fill}
            stroke={INK}
            strokeWidth={0.8}
          />
          {line(w * 0.4, h * 0.2, w * 0.4, INK, 3.4)}
          {line(w * 0.4, h * 0.33, w * 0.28)}
          {line(w * 0.1, h * 0.56, w * 0.8)}
          {line(w * 0.1, h * 0.68, w * 0.6)}
          <rect
            x={w * 0.1}
            y={h * 0.78}
            width={w * 0.22}
            height={h * 0.1}
            rx={h * 0.05}
            fill={accent}
          />
          <rect
            x={w * 0.36}
            y={h * 0.78}
            width={w * 0.22}
            height={h * 0.1}
            rx={h * 0.05}
            fill={fill}
            stroke={INK}
            strokeWidth={0.6}
          />
        </g>
      );
  }
}

// --- the plan, drawn -----------------------------------------------------------------------------

/** Where a node stands: its footprint's origin, size and height. */
function footprint(node: Node): {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
} {
  const [cx, cy] = node.c;
  switch (node.kind) {
    case 'block': {
      const s = node.s ?? 48;
      return { x: cx - s / 2, y: cy - s / 2, z: node.z ?? 0, w: s, d: s, h: node.h ?? 20 };
    }
    case 'cube': {
      const s = node.s ?? 84;
      return { x: cx - s / 2, y: cy - s / 2, z: 0, w: s, d: s, h: node.h ?? 58 };
    }
    case 'slab':
      return {
        x: cx - node.w / 2,
        y: cy - node.d / 2,
        z: node.z ?? 0,
        w: node.w,
        d: node.d,
        h: node.h,
      };
    case 'screen': {
      const depth = node.depth ?? 7;
      return {
        x: cx - node.w / 2,
        y: cy - depth / 2,
        z: node.z ?? 0,
        w: node.w,
        d: depth,
        h: node.h,
      };
    }
  }
}

function route(link: Link): W[] {
  const { from, to } = link;
  if (Math.abs(from[0] - to[0]) < 0.5 || Math.abs(from[1] - to[1]) < 0.5) return [from, to];
  return link.via === 'y' ? [from, [from[0], to[1]], to] : [from, [to[0], from[1]], to];
}

function chipWidth(label: string) {
  return 30 + label.length * 5.8;
}

function PlanScene({ plan, tint, bare = false }: { plan: Plan; tint: Tint; bare?: boolean }) {
  const routes = (plan.links ?? []).map((link) => ({ link, points: route(link) }));
  const feet = plan.nodes.map(footprint);

  const xs: number[] = [];
  const ys: number[] = [];
  feet.forEach(({ x, y, z, w, d, h }) => {
    for (const dx of [0, w])
      for (const dy of [0, d])
        for (const dz of [z, z + h]) {
          const [sx, sy] = p(x + dx, y + dy, dz);
          xs.push(sx);
          ys.push(sy);
        }
  });
  routes.forEach(({ points }) =>
    points.forEach(([x, y]) => {
      const [sx, sy] = p(x, y);
      xs.push(sx);
      ys.push(sy);
    }),
  );
  let chip: ReactNode = null;
  if (plan.chip && !bare) {
    const [cx, cy] = p(plan.chip.at[0], plan.chip.at[1], plan.chip.z ?? 34);
    const cw = chipWidth(plan.chip.label);
    xs.push(cx - cw / 2, cx + cw / 2);
    ys.push(cy - 12, cy + 12);
    chip = (
      <g transform={`translate(${(cx - cw / 2).toFixed(1)} ${cy.toFixed(1)})`}>
        <rect
          x={0}
          y={-11}
          width={cw}
          height={22}
          rx={11}
          fill="#fff"
          stroke={INK}
          strokeWidth={1}
        />
        <circle cx={11} cy={0} r={3.5} fill={SIGNAL.green} />
        <text
          x={20}
          y={3.8}
          fill={INK}
          fontSize={10.5}
          fontWeight={600}
          style={{ fontFamily: 'var(--font-tech)' }}
        >
          {plan.chip.label}
        </text>
      </g>
    );
  }
  const pad = 14;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const box = [minX, minY, Math.max(...xs) + pad - minX, Math.max(...ys) + pad - minY];

  // Back to front: what stands further up the page is drawn first.
  const order = plan.nodes
    .map((node, i) => ({ node, foot: feet[i]! }))
    .sort(
      (a, b) =>
        a.foot.x +
        a.foot.w / 2 +
        a.foot.y +
        a.foot.d / 2 -
        (b.foot.x + b.foot.w / 2 + b.foot.y + b.foot.d / 2),
    );

  return (
    <svg
      viewBox={box.map((v) => v.toFixed(1)).join(' ')}
      className="block h-auto w-full"
      aria-hidden="true"
      fill="none"
    >
      {routes.map(({ link, points }) => (
        <Route key={points.map((pt) => pt.join()).join(';')} points={points} dashed={link.dashed} />
      ))}
      {routes.map(({ points }) =>
        points.length === 3 ? <Joint key={`j${points[1]!.join()}`} at={points[1]!} /> : null,
      )}
      {order.map(({ node, foot }, i) => {
        switch (node.kind) {
          case 'block':
            return (
              <GlyphBlock
                key={i}
                x={foot.x}
                y={foot.y}
                z={foot.z}
                s={foot.w}
                h={foot.h}
                icon={node.icon}
                tone={node.tone}
              />
            );
          case 'cube':
            return (
              <Box key={i} x={foot.x} y={foot.y} w={foot.w} d={foot.d} h={foot.h} tone="black">
                <MarkTop x={foot.x} y={foot.y} z={foot.h} s={foot.w} />
              </Box>
            );
          case 'slab':
            return (
              <Box
                key={i}
                x={foot.x}
                y={foot.y}
                z={foot.z}
                w={foot.w}
                d={foot.d}
                h={foot.h}
                tone={node.tone}
              />
            );
          case 'screen':
            return (
              <Screen
                key={i}
                x={foot.x}
                y={foot.y}
                z={foot.z}
                w={foot.w}
                h={foot.h}
                depth={foot.d}
                draw={(w, h) => <FaceArt face={node.face} w={w} h={h} tint={tint} />}
              />
            );
        }
      })}
      {chip}
    </svg>
  );
}

// --- the fifteen services ---------------------------------------------------------------------

const PLANS: Record<string, Plan> = {
  // A browser showing a site; from its enquiry button a route to a white chat block, then on to
  // the black P cube. "New enquiry" on the route.
  'business-websites': {
    nodes: [
      { kind: 'screen', c: at(-150, 150), w: 190, h: 130, face: 'site' },
      { kind: 'block', c: at(40, 185), icon: 'chat' },
      { kind: 'cube', c: at(190, 150) },
    ],
    links: [
      { from: at(-150, 150), to: at(40, 185) },
      { from: at(40, 185), to: at(190, 150), via: 'y' },
    ],
    chip: { at: at(-40, 205), label: 'New enquiry', z: 0 },
  },
  // A browser with a product grid; the cart routes to the payment, then to the stock.
  'e-commerce-stores': {
    nodes: [
      { kind: 'screen', c: at(-170, 140), w: 170, h: 118, face: 'products' },
      { kind: 'block', c: at(-10, 185), icon: 'cart', tone: 'black' },
      { kind: 'block', c: at(100, 150), icon: 'receipt', tone: 'violet' },
      { kind: 'block', c: at(210, 185), icon: 'database' },
    ],
    links: [
      { from: at(-170, 140), to: at(-10, 185) },
      { from: at(-10, 185), to: at(100, 150), via: 'y' },
      { from: at(100, 150), to: at(210, 185) },
    ],
    chip: { at: at(45, 110), label: 'Order paid', z: 0 },
  },
  // A screen with a login panel, a lock block in front, routes fanning out to documents,
  // invoices and bookings.
  'customer-portals': {
    nodes: [
      { kind: 'screen', c: at(-150, 120), w: 170, h: 120, face: 'login' },
      { kind: 'block', c: at(-10, 185), s: 54, h: 26, icon: 'lock', tone: 'black' },
      { kind: 'block', c: at(150, 95), s: 42, h: 16, icon: 'file', tone: 'violet' },
      { kind: 'block', c: at(190, 170), s: 42, h: 16, icon: 'receipt' },
      { kind: 'block', c: at(150, 245), s: 42, h: 16, icon: 'calendar' },
    ],
    links: [
      { from: at(-150, 120), to: at(-10, 185) },
      { from: at(-10, 185), to: at(150, 95), via: 'y' },
      { from: at(-10, 185), to: at(190, 170), via: 'y' },
      { from: at(-10, 185), to: at(150, 245) },
    ],
  },
  // An app in a browser and the same app on a phone beside it, one cloud beneath routed to both.
  'web-apps': {
    nodes: [
      { kind: 'screen', c: at(-110, 110), w: 180, h: 124, face: 'app' },
      { kind: 'screen', c: at(130, 120), w: 56, h: 104, face: 'phone' },
      { kind: 'block', c: at(10, 215), s: 56, h: 26, icon: 'cloud', tone: 'black' },
    ],
    links: [
      { from: at(10, 215), to: at(-110, 110), via: 'y' },
      { from: at(10, 215), to: at(130, 120) },
    ],
  },
  // Two phones standing side by side, a device block in front, a route from each phone to a
  // cloud block.
  'mobile-apps': {
    nodes: [
      { kind: 'screen', c: at(-150, 110), w: 60, h: 112, face: 'phone' },
      { kind: 'screen', c: at(-40, 110), w: 60, h: 112, face: 'phone' },
      { kind: 'block', c: at(-95, 205), s: 54, h: 24, icon: 'device', tone: 'black' },
      { kind: 'block', c: at(150, 160), s: 50, h: 22, icon: 'cloud', tone: 'violet' },
    ],
    links: [
      { from: at(-150, 110), to: at(150, 160) },
      { from: at(-40, 110), to: at(150, 160) },
    ],
  },

  // A large screen with bars and a line; leads, bookings and payments routed in through the
  // dashboard block. "Updated just now".
  dashboards: {
    nodes: [
      { kind: 'block', c: at(-230, 110), s: 42, h: 16, icon: 'chat' },
      { kind: 'block', c: at(-230, 190), s: 42, h: 16, icon: 'calendar', tone: 'sky' },
      { kind: 'block', c: at(-230, 270), s: 42, h: 16, icon: 'receipt' },
      { kind: 'block', c: at(-60, 190), s: 54, h: 26, icon: 'dashboard', tone: 'black' },
      { kind: 'screen', c: at(130, 150), w: 190, h: 130, face: 'chart' },
    ],
    links: [
      { from: at(-230, 110), to: at(-60, 190) },
      { from: at(-230, 190), to: at(-60, 190) },
      { from: at(-230, 270), to: at(-60, 190), via: 'y' },
      { from: at(-60, 190), to: at(130, 150) },
    ],
    chip: { at: at(140, 250), label: 'Updated just now', z: 0 },
  },
  // A screen with a table and a side panel; the tool block and a check block in front.
  'internal-tools': {
    nodes: [
      { kind: 'screen', c: at(20, 110), w: 200, h: 132, face: 'table' },
      { kind: 'block', c: at(-150, 210), s: 52, h: 24, icon: 'wrench', tone: 'black' },
      { kind: 'block', c: at(170, 215), s: 46, h: 18, icon: 'check', tone: 'sky' },
    ],
    links: [
      { from: at(-150, 210), to: at(20, 110) },
      { from: at(170, 215), to: at(20, 110), via: 'y' },
    ],
  },
  // The customer's record above one database; the website, WhatsApp and calls routed into it.
  'crm-systems': {
    nodes: [
      { kind: 'block', c: at(-220, 110), s: 44, h: 16, icon: 'globe' },
      { kind: 'block', c: at(-220, 190), s: 44, h: 16, icon: 'chat' },
      { kind: 'block', c: at(-220, 270), s: 44, h: 16, icon: 'phone' },
      { kind: 'block', c: at(40, 200), s: 70, h: 30, icon: 'database', tone: 'black' },
      { kind: 'screen', c: at(160, 120), w: 110, h: 84, face: 'record' },
    ],
    links: [
      { from: at(-220, 110), to: at(40, 200), via: 'y' },
      { from: at(-220, 190), to: at(40, 200) },
      { from: at(-220, 270), to: at(40, 200) },
      { from: at(40, 200), to: at(160, 120), via: 'y' },
    ],
  },
  // Three stacked slabs with the black code block on top; routes out to a file and a gauge.
  'custom-software': {
    nodes: [
      { kind: 'slab', c: at(-60, 190), w: 120, d: 120, h: 16, tone: 'white' },
      { kind: 'slab', c: at(-60, 190), w: 120, d: 120, h: 16, z: 16, tone: 'sky' },
      { kind: 'slab', c: at(-60, 190), w: 120, d: 120, h: 16, z: 32, tone: 'white' },
      { kind: 'block', c: at(-60, 190), s: 56, h: 26, z: 48, icon: 'code', tone: 'black' },
      { kind: 'block', c: at(150, 120), s: 46, h: 18, icon: 'file' },
      { kind: 'block', c: at(170, 240), s: 46, h: 18, icon: 'gauge', tone: 'sky' },
    ],
    links: [
      { from: at(-60, 190), to: at(150, 120), via: 'y' },
      { from: at(-60, 190), to: at(170, 240) },
    ],
  },
  // One black cloud in the centre; three identical screens around it, one per customer, each on
  // its own route with a small lock.
  'business-platforms': {
    nodes: [
      { kind: 'block', c: at(0, 170), s: 66, h: 30, icon: 'cloud', tone: 'black' },
      { kind: 'screen', c: at(-190, 90), w: 90, h: 64, face: 'app' },
      { kind: 'screen', c: at(190, 90), w: 90, h: 64, face: 'app' },
      { kind: 'screen', c: at(0, 320), w: 90, h: 64, face: 'app' },
      { kind: 'block', c: at(-95, 130), s: 30, h: 12, icon: 'lock', tone: 'sky' },
      { kind: 'block', c: at(95, 130), s: 30, h: 12, icon: 'lock', tone: 'sky' },
      { kind: 'block', c: at(0, 250), s: 30, h: 12, icon: 'lock', tone: 'sky' },
    ],
    links: [
      { from: at(0, 170), to: at(-190, 90), via: 'y' },
      { from: at(0, 170), to: at(190, 90) },
      { from: at(0, 170), to: at(0, 320) },
    ],
  },

  // The website form into the black P cube; from the cube, WhatsApp and email. "Reply sent".
  'whatsapp-automation': {
    nodes: [
      { kind: 'block', c: at(-200, 160), s: 50, h: 22, icon: 'globe' },
      { kind: 'cube', c: at(0, 165) },
      { kind: 'block', c: at(190, 110), s: 50, h: 22, icon: 'chat', tone: 'mint' },
      { kind: 'block', c: at(190, 235), s: 50, h: 22, icon: 'mail' },
    ],
    links: [
      { from: at(-200, 160), to: at(0, 165) },
      { from: at(0, 165), to: at(190, 110), via: 'y' },
      { from: at(0, 165), to: at(190, 235) },
    ],
    chip: { at: at(110, 80), label: 'Reply sent', z: 0 },
  },
  // A calendar, a receipt and a check along one route. "Booked · paid".
  'booking-payment-workflows': {
    nodes: [
      { kind: 'block', c: at(-190, 160), s: 54, h: 24, icon: 'calendar', tone: 'mint' },
      { kind: 'block', c: at(0, 160), s: 58, h: 28, icon: 'receipt', tone: 'black' },
      { kind: 'block', c: at(190, 160), s: 54, h: 24, icon: 'check' },
    ],
    links: [
      { from: at(-190, 160), to: at(0, 160) },
      { from: at(0, 160), to: at(190, 160), via: 'y' },
    ],
    chip: { at: at(-95, 230), label: 'Booked · paid', z: 0 },
  },
  // The black connection block in the centre; payments, CRM, accounting and email around it.
  'api-integrations': {
    nodes: [
      { kind: 'block', c: at(0, 170), s: 64, h: 30, icon: 'plug', tone: 'black' },
      { kind: 'block', c: at(-190, 110), s: 44, h: 16, icon: 'receipt' },
      { kind: 'block', c: at(-170, 240), s: 44, h: 16, icon: 'database', tone: 'mint' },
      { kind: 'block', c: at(170, 100), s: 44, h: 16, icon: 'file' },
      { kind: 'block', c: at(190, 235), s: 44, h: 16, icon: 'mail' },
    ],
    links: [
      { from: at(-190, 110), to: at(0, 170) },
      { from: at(-170, 240), to: at(0, 170), via: 'y' },
      { from: at(0, 170), to: at(170, 100), via: 'y' },
      { from: at(0, 170), to: at(190, 235) },
    ],
  },
  // The customer's question into the black spark; it draws on a stack of your information.
  'ai-assistants': {
    nodes: [
      { kind: 'block', c: at(-200, 170), s: 52, h: 22, icon: 'chat', tone: 'mint' },
      { kind: 'block', c: at(0, 170), s: 62, h: 30, icon: 'spark', tone: 'black' },
      { kind: 'block', c: at(190, 170), s: 50, h: 12, icon: 'file' },
      { kind: 'block', c: at(190, 170), s: 50, h: 12, z: 12, icon: 'file' },
      { kind: 'block', c: at(190, 170), s: 50, h: 12, z: 24, icon: 'file' },
    ],
    links: [
      { from: at(-200, 170), to: at(0, 170) },
      { from: at(0, 170), to: at(190, 170), via: 'y' },
    ],
    chip: { at: at(-100, 245), label: 'Answered from your price list', z: 0 },
  },
  // Three documents into the black spark; out come the data, entered, and what needs attention.
  'ai-workflows': {
    nodes: [
      { kind: 'block', c: at(-220, 100), s: 40, h: 14, icon: 'file' },
      { kind: 'block', c: at(-220, 175), s: 40, h: 14, icon: 'file' },
      { kind: 'block', c: at(-220, 250), s: 40, h: 14, icon: 'file' },
      { kind: 'block', c: at(-20, 175), s: 62, h: 30, icon: 'spark', tone: 'black' },
      { kind: 'block', c: at(170, 110), s: 48, h: 20, icon: 'database', tone: 'mint' },
      { kind: 'block', c: at(190, 235), s: 48, h: 20, icon: 'bulb' },
    ],
    links: [
      { from: at(-220, 100), to: at(-20, 175) },
      { from: at(-220, 175), to: at(-20, 175) },
      { from: at(-220, 250), to: at(-20, 175), via: 'y' },
      { from: at(-20, 175), to: at(170, 110), via: 'y' },
      { from: at(-20, 175), to: at(190, 235) },
    ],
    chip: { at: at(200, 300), label: 'Needs attention', z: 0 },
  },
};

/** A service's hero scene, on its group's tint. */
/** `bare` leaves the chip off — for a share image, drawn without the site's fonts. */
export function ServiceHeroScene({
  slug,
  tint,
  bare,
}: {
  slug: string;
  tint: Tint;
  bare?: boolean;
}) {
  const plan = PLANS[slug];
  return plan ? <PlanScene plan={plan} tint={tint} bare={bare} /> : null;
}

/** A group's hero: its Services card scene, drawn larger. */
export function GroupHeroScene({ slug }: { slug: GroupSlug }) {
  const Scene = SERVICE_SCENES[slug];
  return <Scene />;
}

/** A solution's hero: its Solutions scene — the chat swapped in, or the site being moved in. */
export function SolutionHeroScene({ slug }: { slug: string }) {
  if (slug === 'never-miss-a-lead') return <GetOnlineScene subject="chat" />;
  if (slug === 'keep-it-improving') return <ManagedScene incoming />;
  const Scene = SOLUTION_SCENES[slug as keyof typeof SOLUTION_SCENES];
  return Scene ? <Scene /> : null;
}

/** Evolve's hero: Keep It Improving's shielded cube and its nodes. */
export function EvolveHeroScene() {
  return <ManagedScene />;
}

/** Every service scene, for the lab. */
export const SERVICE_PLAN_SLUGS = Object.keys(PLANS);
