import type { CSSProperties, ReactNode } from 'react';

import { Fit } from '../lab/fit';
import { Card, Head } from '../lab/light-kit';
import { Icon, type IconName } from '../ui/icon';
import { leftMatrix, p, Slab, topMatrix } from './iso';
import { Corners } from './scene-panel';

/**
 * The point of view's picture on every service and solution page, in the home Solutions
 * section's resting picture's way: a soft grey platform in isometric, the thing the page sells
 * laid out on it as a few white pieces in the page's colour, one piece lifted over its dashed
 * slot and floating, a dotted route between them, and a small card naming it. Framed as the
 * home picture is — a grey panel, a white inner panel with corner marks and a fading dot grid.
 *
 * Every scene is drawn on one fixed canvas (`Fit`, 520 × 360) at the iso kit's one angle and
 * one light, so all twenty read as one set. World units: the platform is 300 × 240, x running
 * down-right and y down-left; pieces at the back right sit high on the screen, at the front left
 * low.
 */

const Z = 16;
const GREY = '#dfe2e8';
const INK = '#0b0d12';
const DOT = '#b8bdc8';
const SLOT = { x: 178, y: 30, w: 112, d: 80 };

/** A hex colour mixed toward white (`t` of 1 is white) or black (`k`). */
const mix = (hex: string, t: number) => {
  const n = parseInt(hex.slice(1), 16);
  const to = (c: number) =>
    Math.round(c + (255 - c) * t)
      .toString(16)
      .padStart(2, '0');
  return `#${to((n >> 16) & 255)}${to((n >> 8) & 255)}${to(n & 255)}`;
};
const deepen = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const to = (c: number) =>
    Math.round(c * (1 - k))
      .toString(16)
      .padStart(2, '0');
  return `#${to((n >> 16) & 255)}${to((n >> 8) & 255)}${to(n & 255)}`;
};

/** The page's colour in the steps a scene uses. */
type Tones = { ink: string; top: string; side: string; edge: string; soft: string; deep: string };
const tonesOf = (accent: string): Tones => ({
  ink: accent,
  top: mix(accent, 0.9),
  side: mix(accent, 0.8),
  edge: mix(accent, 0.55),
  soft: mix(accent, 0.72),
  deep: deepen(accent, 0.22),
});

const bar = (u: number, v: number, w: number, fill: string = GREY, h = 6) => (
  <rect x={u} y={v} width={w} height={h} rx={h / 2} fill={fill} />
);

/** A glyph on a rounded chip, in a top face's own coordinates. */
function Glyph({
  u,
  v,
  s,
  icon,
  bg,
  fg,
}: {
  u: number;
  v: number;
  s: number;
  icon: IconName;
  bg: string;
  fg: string;
}) {
  const g = s * 0.62;
  return (
    <g transform={`translate(${u} ${v})`} color={fg}>
      <rect width={s} height={s} rx={s * 0.28} fill={bg} />
      <g transform={`translate(${((s - g) / 2).toFixed(2)} ${((s - g) / 2).toFixed(2)})`}>
        <Icon name={icon} size={g} strokeWidth={2.1 * (24 / g)} />
      </g>
    </g>
  );
}

/** A thin piece lying on the platform, its content drawn on its top face. */
function Sheet({
  x,
  y,
  z = Z,
  w,
  d,
  h = 6,
  r = 10,
  top = '#ffffff',
  side = '#e8eaef',
  stroke = '#d6d9e0',
  children,
}: {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h?: number;
  r?: number;
  top?: string;
  side?: string;
  stroke?: string;
  children?: ReactNode;
}) {
  return (
    <Slab x={x} y={y} z={z} w={w} d={d} h={h} r={r} top={top} side={side} stroke={stroke}>
      {children ? <g transform={topMatrix(x, y, z + h)}>{children}</g> : null}
    </Slab>
  );
}

/** A block with its glyph on top: white with the glyph on the page's tint, or solid colour. */
function Cube({
  x,
  y,
  z = Z,
  s = 38,
  h = 24,
  icon,
  t,
  solid = false,
}: {
  x: number;
  y: number;
  z?: number;
  s?: number;
  h?: number;
  icon: IconName;
  t: Tones;
  solid?: boolean;
}) {
  return (
    <Slab
      x={x}
      y={y}
      z={z}
      w={s}
      d={s}
      h={h}
      r={9}
      top={solid ? t.ink : '#ffffff'}
      side={solid ? t.deep : '#e8eaef'}
      stroke={solid ? t.deep : '#d6d9e0'}
    >
      <g transform={topMatrix(x, y, z + h)}>
        <Glyph
          u={s * 0.18}
          v={s * 0.18}
          s={s * 0.64}
          icon={icon}
          bg={solid ? 'transparent' : t.top}
          fg={solid ? '#ffffff' : t.ink}
        />
      </g>
    </Slab>
  );
}

/** A column of a chart, standing on whatever is under it. */
function Column({ x, y, z, h, t, solid = false }: { x: number; y: number; z: number; h: number; t: Tones; solid?: boolean }) {
  return (
    <Slab
      x={x}
      y={y}
      z={z}
      w={13}
      d={13}
      h={h}
      r={3}
      top={solid ? t.ink : t.top}
      side={solid ? t.deep : t.side}
      stroke={solid ? t.deep : t.edge}
    />
  );
}

/** A dotted route across the platform, a dot every `step` units. */
function Dots({ path, step = 15, z = Z }: { path: [number, number][]; step?: number; z?: number }) {
  const dots: [number, number][] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const [x0, y0] = path[i]!;
    const [x1, y1] = path[i + 1]!;
    const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / step));
    for (let k = 0; k < n; k++) dots.push(p(x0 + ((x1 - x0) * k) / n, y0 + ((y1 - y0) * k) / n, z));
  }
  const [lx, ly] = path[path.length - 1]!;
  dots.push(p(lx, ly, z));
  return (
    <g>
      {dots.map(([cx, cy], k) => (
        <circle key={k} cx={cx} cy={cy} r={2.4} fill={DOT} />
      ))}
    </g>
  );
}

/** The dashed slot on the platform that the lifted piece belongs in. */
function Slot({ t, at = SLOT }: { t: Tones; at?: typeof SLOT }) {
  return (
    <rect
      width={at.w}
      height={at.d}
      rx={12}
      transform={topMatrix(at.x, at.y, Z)}
      fill={mix(t.ink, 0.93)}
      stroke={mix(t.ink, 0.45)}
      strokeWidth={1.25}
      strokeDasharray="4 4"
      vectorEffect="non-scaling-stroke"
    />
  );
}

/** The piece that has just happened, floating over its slot on a dashed line, drawn last. */
function Lifted({
  t,
  at = SLOT,
  lift = 62,
  children,
}: {
  t: Tones;
  at?: typeof SLOT;
  lift?: number;
  children: ReactNode;
}) {
  const [x0, y0] = p(at.x + at.w / 2, at.y + at.d / 2, Z + lift);
  const [x1, y1] = p(at.x + at.w / 2, at.y + at.d / 2, Z);
  return (
    <g className="iso-float">
      <line
        x1={x0}
        y1={y0}
        x2={x1}
        y2={y1}
        stroke={t.ink}
        strokeOpacity={0.6}
        strokeWidth={1.25}
        strokeDasharray="3 4"
      />
      <Sheet x={at.x} y={at.y} z={Z + lift} w={at.w} d={at.d} r={12} stroke="#cfd3db">
        {children}
      </Sheet>
    </g>
  );
}

/** The lifted piece's usual face: a glyph, a title line, two lines and a pill. */
function Note({ icon, t, pill = true }: { icon: IconName; t: Tones; pill?: boolean }) {
  return (
    <>
      <Glyph u={12} v={12} s={24} icon={icon} bg={t.top} fg={t.ink} />
      {bar(44, 14, 46, INK, 7)}
      {bar(44, 27, 32)}
      {bar(12, 48, 84)}
      {pill ? <rect x={12} y={60} width={36} height={11} rx={5.5} fill={t.ink} /> : bar(12, 60, 56)}
      <circle cx={96} cy={20} r={5} fill={t.ink} />
    </>
  );
}

/** A stack of thin sheets — documents, records, backups. */
function Stack({
  x,
  y,
  w,
  d,
  n = 3,
  t,
  icon,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  n?: number;
  t: Tones;
  icon: IconName;
}) {
  return (
    <>
      {Array.from({ length: n }, (_, k) => (
        <Sheet key={k} x={x} y={y} z={Z + k * 8} w={w} d={d} h={4} r={8}>
          {k === n - 1 ? (
            <>
              <Glyph u={8} v={8} s={20} icon={icon} bg={t.top} fg={t.ink} />
              {bar(34, 10, w - 46, INK, 6)}
              {bar(34, 21, w - 60)}
              {bar(8, 36, w - 16)}
            </>
          ) : null}
        </Sheet>
      ))}
    </>
  );
}

/** A phone lying on the platform, its notch at the back. */
function Phone({ x, y, w = 62, d = 112, children }: { x: number; y: number; w?: number; d?: number; children?: ReactNode }) {
  return (
    <Sheet x={x} y={y} w={w} d={d} h={8} r={12} stroke="#cdd1d9">
      {bar(w / 2 - 9, 6, 18, '#e1e3e8', 4)}
      {children}
    </Sheet>
  );
}

/** Window dots and a hairline, for a top face that is a browser window. */
const chrome = (w: number) => (
  <>
    {[0, 1, 2].map((k) => (
      <circle key={k} cx={11 + k * 8} cy={8} r={2.4} fill="#d9dce3" />
    ))}
    {bar(42, 5, Math.min(70, w - 56), '#eef0f3', 6)}
    <line x1={0} y1={16} x2={w} y2={16} stroke="#eceef2" strokeWidth={1} />
  </>
);

/** The canvas, the platform, the scene on it and the card that names it. */
function Stage({
  id,
  accent,
  icon,
  title,
  meta,
  children,
}: {
  id: string;
  accent: string;
  icon: IconName;
  title: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <Fit w={520} h={360}>
      <svg
        className="frag-in absolute"
        style={{ left: 13, top: 40, '--i': 0 } as CSSProperties}
        width={494}
        height={320}
        viewBox="-222 -44 494 320"
        fill="none"
      >
        <defs>
          <filter id={`iso-soft-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={9} />
          </filter>
        </defs>
        <Slab
          x={0}
          y={0}
          w={300}
          d={240}
          h={Z}
          r={28}
          top="#f6f7f9"
          side="#e9ebf0"
          stroke="#d3d7df"
          shadow={`url(#iso-soft-${id})`}
        />
        {children}
      </svg>
      <Card x={16} y={16} w={248} i={2}>
        <div className="p-2.5">
          <Head icon={icon} accent={accent} title={title} meta={meta} />
        </div>
      </Card>
    </Fit>
  );
}

type Scene = (props: { t: Tones }) => ReactNode;

// --- the fifteen services --------------------------------------------------------------------

const BusinessWebsites: Scene = ({ t }) => (
  <>
    <Sheet x={12} y={40} w={104} d={56} r={9}>
      <Glyph u={10} v={10} s={18} icon="search" bg={t.top} fg={t.ink} />
      {bar(36, 11, 54, t.ink, 7)}
      {bar(36, 23, 40)}
      {bar(10, 36, 84)}
    </Sheet>
    <Slot t={t} />
    <Sheet x={22} y={106} w={152} d={114} r={12}>
      {chrome(152)}
      {bar(14, 28, 84, INK, 9)}
      {bar(14, 42, 60, INK, 9)}
      {bar(14, 58, 94)}
      {bar(14, 70, 74)}
      <rect x={14} y={86} width={46} height={13} rx={6.5} fill={t.ink} />
      <rect x={114} y={28} width={26} height={56} rx={7} fill={t.top} />
      <circle cx={127} cy={46} r={6} fill={t.soft} />
    </Sheet>
    <Dots path={[[180, 168], [236, 168], [236, 118]]} />
    <Lifted t={t}>
      <Note icon="mail" t={t} />
    </Lifted>
  </>
);

const EcommerceStores: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    {[
      [24, 100],
      [84, 100],
      [24, 160],
      [84, 160],
    ].map(([x, y], k) => (
      <Sheet key={k} x={x!} y={y!} w={52} d={52} r={9}>
        <rect x={6} y={6} width={40} height={24} rx={5} fill={k === 1 ? t.soft : t.top} />
        {bar(6, 35, 28, INK, 5)}
        {bar(6, 43, 18, t.ink, 5)}
      </Sheet>
    ))}
    <Dots path={[[144, 186], [196, 186]]} />
    <Cube x={198} y={164} s={44} h={28} icon="cart" t={t} solid />
    <Lifted t={t}>
      <Note icon="receipt" t={t} />
    </Lifted>
  </>
);

const CustomerPortals: Scene = ({ t }) => (
  <>
    <Cube x={40} y={36} s={38} h={22} icon="lock" t={t} />
    <Slot t={t} />
    <Sheet x={20} y={100} w={150} d={118} r={12}>
      <rect x={6} y={6} width={28} height={106} rx={7} fill="#f4f5f8" />
      <circle cx={20} cy={20} r={7} fill={t.soft} />
      {[36, 46, 56, 66].map((v) => (
        <g key={v}>{bar(12, v, 16, GREY, 5)}</g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={42} y={8 + i * 26} width={100} height={20} rx={6} fill="#f8f9fb" />
          {bar(50, 15 + i * 26, 40, INK, 5)}
          <rect x={112} y={13 + i * 26} width={24} height={10} rx={5} fill={i === 0 ? t.ink : t.top} />
        </g>
      ))}
    </Sheet>
    <Stack x={198} y={150} w={74} d={58} t={t} icon="file" />
    <Lifted t={t}>
      <Note icon="calendar" t={t} />
    </Lifted>
  </>
);

const WebApps: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Sheet x={20} y={96} w={164} d={124} r={12}>
      {chrome(164)}
      <rect x={6} y={22} width={28} height={96} rx={7} fill="#f4f5f8" />
      {[0, 1, 2].map((j) => (
        <g key={j}>
          <rect x={40 + j * 41} y={22} width={37} height={96} rx={7} fill="#f8f9fb" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect
                x={44 + j * 41}
                y={28 + k * 26}
                width={29}
                height={20}
                rx={4}
                fill="#ffffff"
                stroke="#e6e8ec"
              />
              {bar(48 + j * 41, 33 + k * 26, 14, j === 1 && k === 0 ? t.ink : INK, 4)}
              {bar(48 + j * 41, 40 + k * 26, 20, GREY, 4)}
            </g>
          ))}
        </g>
      ))}
    </Sheet>
    <Dots path={[[188, 150], [236, 150], [236, 118]]} />
    <Cube x={210} y={168} s={34} h={20} icon="window" t={t} />
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="apps" bg={t.top} fg={t.ink} />
      {bar(44, 14, 46, INK, 7)}
      {bar(44, 27, 30)}
      <rect x={12} y={48} width={30} height={14} rx={7} fill={t.ink} />
      <circle cx={35} cy={55} r={5} fill="#ffffff" />
      {bar(50, 52, 46)}
    </Lifted>
  </>
);

const MobileApps: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Phone x={30} y={108}>
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}${c}`}
            x={9 + c * 16}
            y={20 + r * 16}
            width={12}
            height={12}
            rx={3.5}
            fill={r === 1 && c === 1 ? t.ink : (r + c) % 2 ? t.top : t.soft}
          />
        )),
      )}
      {bar(9, 90, 44)}
    </Phone>
    <Phone x={110} y={108}>
      {bar(8, 18, 30, INK, 7)}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={8} y={32 + i * 20} width={46} height={15} rx={5} fill="#f6f7f9" />
          <rect x={11} y={35 + i * 20} width={9} height={9} rx={2.5} fill={t.top} />
          {bar(24, 37 + i * 20, 24, GREY, 4)}
        </g>
      ))}
      <rect x={8} y={94} width={46} height={11} rx={5.5} fill={t.ink} />
    </Phone>
    <Dots path={[[180, 164], [228, 164], [228, 118]]} />
    <Lifted t={t}>
      <Note icon="bell" t={t} pill={false} />
    </Lifted>
  </>
);

const Dashboards: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Sheet x={20} y={98} w={170} d={112} r={12}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={10 + i * 52} y={10} width={44} height={24} rx={5} fill="#f6f7f9" />
          {bar(16 + i * 52, 16, 20, GREY, 4)}
          {bar(16 + i * 52, 24, 28, i === 0 ? t.ink : INK, 5)}
        </g>
      ))}
      {[52, 70, 88].map((v) => (
        <line key={v} x1={10} y1={v} x2={160} y2={v} stroke="#eef0f3" strokeWidth={1} />
      ))}
    </Sheet>
    {[18, 30, 24, 42, 34, 56].map((h, i) => (
      <Column key={i} x={34 + i * 24} y={152} z={Z + 6} h={h} t={t} solid={i === 5} />
    ))}
    <Sheet x={210} y={150} w={64} d={64} r={10}>
      <circle cx={32} cy={32} r={19} stroke={t.top} strokeWidth={9} />
      <circle
        cx={32}
        cy={32}
        r={19}
        stroke={t.ink}
        strokeWidth={9}
        strokeDasharray="72 120"
        transform="rotate(-90 32 32)"
      />
    </Sheet>
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="trend" bg={t.top} fg={t.ink} />
      {bar(44, 14, 30, GREY, 5)}
      {bar(44, 24, 48, INK, 9)}
      <polyline
        points="12,66 28,58 42,62 58,50 74,54 98,40"
        stroke={t.ink}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Lifted>
  </>
);

const InternalTools: Scene = ({ t }) => (
  <>
    <Cube x={40} y={36} s={36} h={22} icon="wrench" t={t} />
    <Slot t={t} />
    <Sheet x={20} y={96} w={166} d={124} r={12}>
      <rect x={8} y={8} width={150} height={14} rx={5} fill="#f4f5f8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={17} cy={36 + i * 18} r={5} fill={t.soft} />
          {bar(28, 33 + i * 18, 50, INK, 5)}
          {bar(86, 33 + i * 18, 28, GREY, 5)}
          <rect
            x={128}
            y={31 + i * 18}
            width={22}
            height={10}
            rx={5}
            fill={i % 2 ? t.ink : '#e3e5ea'}
          />
          <circle cx={i % 2 ? 145 : 133} cy={36 + i * 18} r={3.6} fill="#ffffff" />
        </g>
      ))}
    </Sheet>
    <Dots path={[[190, 160], [236, 160], [236, 118]]} />
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="check" bg={t.top} fg={t.ink} />
      {bar(44, 14, 46, INK, 7)}
      {bar(44, 27, 32)}
      <rect x={12} y={50} width={40} height={13} rx={6.5} fill={t.ink} />
      <rect x={58} y={50} width={36} height={13} rx={6.5} fill="#eceef2" />
    </Lifted>
  </>
);

const CrmSystems: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    {[0, 1, 2].map((j) => (
      <g key={j}>
        <Sheet x={20 + j * 54} y={96} w={46} d={124} h={4} r={9} top="#f8f9fb">
          {bar(6, 6, 20, j === 2 ? t.ink : GREY, 5)}
        </Sheet>
        {[0, 1, 2].slice(0, 3 - j).map((k) => (
          <Sheet key={k} x={23 + j * 54} y={110 + k * 34} z={Z + 4} w={40} d={28} h={4} r={7}>
            <circle cx={9} cy={9} r={5} fill={j === 2 ? t.ink : t.soft} />
            {bar(17, 6, 18, INK, 4)}
            {bar(17, 13, 14, GREY, 4)}
            {bar(5, 19, 28, GREY, 4)}
          </Sheet>
        ))}
      </g>
    ))}
    <Dots path={[[214, 196], [184, 196]]} />
    <Cube x={214} y={180} s={32} h={18} icon="whatsapp" t={t} />
    <Dots path={[[214, 152], [184, 152]]} />
    <Cube x={214} y={136} s={32} h={18} icon="globe" t={t} />
    <Lifted t={t}>
      <circle cx={26} cy={26} r={13} fill={t.ink} />
      {bar(46, 16, 44, INK, 7)}
      {bar(46, 29, 30)}
      <rect x={12} y={50} width={30} height={11} rx={5.5} fill={t.top} />
      <rect x={46} y={50} width={24} height={11} rx={5.5} fill={t.top} />
      {bar(12, 66, 70)}
    </Lifted>
  </>
);

const CustomSoftware: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Dots path={[[70, 140], [100, 140]]} />
    <Dots path={[[50, 160], [50, 182]]} />
    <Dots path={[[122, 166], [122, 182]]} />
    <Dots path={[[70, 202], [100, 202]]} />
    <Cube x={30} y={120} s={40} h={24} icon="database" t={t} />
    <Cube x={100} y={120} s={44} h={32} icon="code" t={t} solid />
    <Cube x={30} y={182} s={40} h={24} icon="receipt" t={t} />
    <Cube x={100} y={182} s={40} h={24} icon="tasks" t={t} />
    <Dots path={[[146, 140], [236, 140], [236, 116]]} />
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="layers" bg={t.top} fg={t.ink} />
      {bar(44, 14, 46, INK, 7)}
      {bar(44, 27, 32)}
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={12 + k * 22} y={50} width={16} height={16} rx={4} fill={k === 3 ? t.ink : t.top} />
      ))}
    </Lifted>
  </>
);

const BusinessPlatforms: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    {[0, 1, 2].map((k) => (
      <Sheet
        key={k}
        x={30}
        y={96}
        z={Z + k * 20}
        w={140}
        d={112}
        h={6}
        r={14}
        top={k === 1 ? t.top : '#ffffff'}
        side={k === 1 ? t.side : '#e8eaef'}
        stroke={k === 1 ? t.edge : '#d6d9e0'}
      >
        {k === 2
          ? [0, 1].map((r) =>
              [0, 1].map((c) => (
                <g key={`${r}${c}`}>
                  <rect x={10 + c * 64} y={10 + r * 48} width={56} height={40} rx={7} fill="#f6f7f9" />
                  <circle cx={22 + c * 64} cy={22 + r * 48} r={6} fill={r + c === 0 ? t.ink : t.soft} />
                  {bar(32 + c * 64, 19 + r * 48, 26, INK, 5)}
                  {bar(16 + c * 64, 34 + r * 48, 40, GREY, 4)}
                </g>
              )),
            )
          : null}
      </Sheet>
    ))}
    <Dots path={[[174, 186], [204, 186]]} />
    <Cube x={204} y={170} s={30} h={18} icon="people" t={t} />
    <Cube x={246} y={170} s={30} h={18} icon="briefcase" t={t} />
    <Lifted t={t}>
      <Note icon="layers" t={t} />
    </Lifted>
  </>
);

const WhatsappAutomation: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Phone x={30} y={104} w={66} d={116}>
      <rect x={6} y={18} width={40} height={13} rx={6} fill="#f1f2f5" />
      <rect x={20} y={36} width={40} height={18} rx={6} fill={t.top} />
      {bar(25, 42, 26, t.ink, 4)}
      <rect x={6} y={60} width={34} height={12} rx={6} fill="#f1f2f5" />
      <rect x={22} y={78} width={38} height={14} rx={6} fill={t.top} />
      {bar(27, 83, 22, t.ink, 4)}
    </Phone>
    <Dots path={[[100, 140], [126, 140]]} />
    <Dots path={[[100, 190], [126, 190]]} />
    <Cube x={126} y={122} s={34} h={20} icon="bell" t={t} />
    <Cube x={126} y={172} s={34} h={20} icon="clock" t={t} />
    <Dots path={[[164, 140], [236, 140], [236, 116]]} />
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="whatsapp" bg={t.ink} fg="#ffffff" />
      {bar(44, 14, 46, INK, 7)}
      {bar(44, 27, 32)}
      <rect x={12} y={46} width={84} height={22} rx={8} fill={t.top} />
      {bar(18, 54, 50, t.ink, 5)}
      <path d="M80 57l3 3 5-6M86 57l3 3 5-6" stroke={t.ink} strokeWidth={1.6} fill="none" />
    </Lifted>
  </>
);

const BookingPayments: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Sheet x={24} y={98} w={132} d={118} r={12}>
      {bar(10, 9, 50, INK, 7)}
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect
            key={`${r}${c}`}
            x={10 + c * 23}
            y={26 + r * 22}
            width={19}
            height={17}
            rx={4}
            fill={r === 1 && c === 3 ? t.ink : (r === 2 && c === 1) || (r === 0 && c === 4) ? t.top : '#f4f5f8'}
          />
        )),
      )}
    </Sheet>
    <Dots path={[[160, 178], [186, 178]]} />
    <Sheet x={186} y={150} w={88} d={58} h={5} r={9} top={t.ink} side={t.deep} stroke={t.deep}>
      <rect x={10} y={10} width={15} height={11} rx={2.5} fill="#ffffff" opacity={0.55} />
      {bar(10, 32, 46, '#ffffff', 5)}
      {bar(10, 42, 28, '#ffffff', 4)}
    </Sheet>
    <Lifted t={t}>
      <Note icon="check" t={t} />
    </Lifted>
  </>
);

const ApiIntegrations: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Dots path={[[70, 82], [134, 82], [134, 122]]} />
    <Dots path={[[70, 196], [110, 196], [110, 166]]} />
    <Dots path={[[160, 196], [196, 196]]} />
    <Cube x={36} y={64} s={34} h={20} icon="card" t={t} />
    <Cube x={110} y={120} s={48} h={32} icon="plug" t={t} solid />
    <Cube x={36} y={178} s={34} h={20} icon="database" t={t} />
    <Cube x={196} y={180} s={34} h={20} icon="receipt" t={t} />
    <Dots path={[[160, 136], [236, 136], [236, 116]]} />
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="refresh" bg={t.top} fg={t.ink} />
      {bar(44, 14, 46, INK, 7)}
      {bar(44, 27, 32)}
      {bar(12, 50, 34, t.ink, 6)}
      {bar(54, 50, 42)}
      {bar(12, 62, 60)}
    </Lifted>
  </>
);

const AiAssistants: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Sheet x={24} y={98} w={140} d={120} r={12}>
      <rect x={58} y={12} width={72} height={16} rx={7} fill="#f1f2f5" />
      <rect x={8} y={36} width={110} height={36} rx={8} fill={t.top} />
      <Glyph u={13} v={41} s={14} icon="spark" bg={t.ink} fg="#ffffff" />
      {bar(32, 43, 74, t.ink, 4)}
      {bar(32, 51, 60, t.edge, 4)}
      {bar(32, 59, 44, t.edge, 4)}
      <rect x={8} y={78} width={62} height={14} rx={7} fill="#f6f7f9" />
      {bar(14, 83, 40, GREY, 4)}
      <rect x={8} y={98} width={36} height={12} rx={6} fill="#ffffff" stroke={t.edge} />
      <rect x={48} y={98} width={44} height={12} rx={6} fill="#ffffff" stroke={t.edge} />
    </Sheet>
    <Dots path={[[194, 176], [168, 176]]} />
    <Stack x={194} y={150} w={72} d={56} t={t} icon="book" />
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="spark" bg={t.ink} fg="#ffffff" />
      {bar(44, 14, 46, INK, 7)}
      {bar(44, 27, 32)}
      {bar(12, 48, 84)}
      {bar(12, 60, 60)}
    </Lifted>
  </>
);

const AiWorkflows: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Sheet x={24} y={98} z={Z} w={84} d={112} h={4} r={8} />
    <Sheet x={24} y={98} z={Z + 6} w={84} d={112} h={4} r={8}>
      {bar(10, 10, 36, INK, 7)}
      {bar(10, 24, 60)}
      {bar(10, 34, 52)}
      {bar(10, 44, 64)}
      {bar(10, 60, 40)}
      {bar(10, 70, 56)}
      <line x1={10} y1={86} x2={74} y2={86} stroke="#eceef2" />
      {bar(10, 94, 24, INK, 6)}
      {bar(48, 94, 26, t.ink, 6)}
    </Sheet>
    <Dots path={[[110, 150], [122, 150]]} />
    <Cube x={122} y={134} s={30} h={22} icon="spark" t={t} solid />
    <Dots path={[[154, 150], [162, 150]]} />
    <Sheet x={162} y={128} w={112} d={92} r={12}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          {bar(10, 10 + i * 20, 24, GREY, 4)}
          <rect x={40} y={7 + i * 20} width={62} height={12} rx={4} fill={i === 2 ? t.top : '#f6f7f9'} />
          <rect x={40} y={7 + i * 20} width={3} height={12} rx={1.5} fill={t.ink} />
          {bar(48, 11 + i * 20, 30, INK, 4)}
        </g>
      ))}
    </Sheet>
    <Lifted t={t}>
      <Note icon="alert" t={t} />
    </Lifted>
  </>
);

/** Evolve and Website Care & Hosting: the servers, kept up, safe and backed up. */
const Care: Scene = ({ t }) => (
  <>
    <Cube x={40} y={36} s={34} h={20} icon="history" t={t} />
    <Slot t={t} />
    {[0, 1, 2].map((k) => {
      const z = Z + k * 20;
      return (
        <g key={k}>
          <Sheet x={30} y={110} z={z} w={104} d={72} h={14} r={10}>
            {k === 2 ? (
              <>
                <Glyph u={10} v={10} s={22} icon="server" bg={t.top} fg={t.ink} />
                {bar(40, 13, 44, INK, 6)}
                {bar(40, 24, 30)}
                {bar(10, 46, 84)}
              </>
            ) : null}
          </Sheet>
          <g transform={leftMatrix(30, 182, z + 14)}>
            <circle cx={14} cy={7} r={2.6} fill={t.ink} />
            <rect x={24} y={5} width={34} height={4} rx={2} fill="#cfd3db" />
          </g>
        </g>
      );
    })}
    <Dots path={[[138, 176], [188, 176]]} />
    <Cube x={188} y={150} s={44} h={28} icon="shield" t={t} solid />
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="gauge" bg={t.top} fg={t.ink} />
      {bar(44, 14, 46, INK, 7)}
      {bar(44, 27, 32)}
      {Array.from({ length: 12 }, (_, k) => (
        <rect key={k} x={12 + k * 7.4} y={50} width={5} height={14} rx={1.5} fill={k === 8 ? t.soft : t.ink} />
      ))}
    </Lifted>
  </>
);

// --- the four solutions ----------------------------------------------------------------------

const LeadAutomation: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    {(['globe', 'target', 'whatsapp'] as const).map((icon, k) => (
      <g key={icon}>
        <Dots path={[[58, 113 + k * 48], [96, 113 + k * 48]]} />
        <Cube x={24} y={96 + k * 48} s={34} h={20} icon={icon} t={t} />
      </g>
    ))}
    <Sheet x={96} y={98} w={110} d={122} r={12}>
      {bar(10, 10, 40, INK, 7)}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={8} y={26 + i * 23} width={94} height={18} rx={6} fill="#f8f9fb" />
          <circle cx={18} cy={35 + i * 23} r={5} fill={t.soft} />
          {bar(28, 32 + i * 23, 34, INK, 5)}
          <rect x={70} y={30 + i * 23} width={26} height={10} rx={5} fill={i === 0 ? t.ink : t.top} />
        </g>
      ))}
    </Sheet>
    <Dots path={[[210, 190], [230, 190]]} />
    <Cube x={230} y={174} s={32} h={20} icon="bell" t={t} solid />
    <Lifted t={t}>
      <Note icon="userCheck" t={t} />
    </Lifted>
  </>
);

const StoreAndBookings: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    {[
      [24, 98],
      [76, 98],
      [24, 150],
      [76, 150],
    ].map(([x, y], k) => (
      <Sheet key={k} x={x!} y={y!} w={46} d={46} r={8}>
        <rect x={5} y={5} width={36} height={21} rx={4} fill={k === 2 ? t.soft : t.top} />
        {bar(5, 30, 24, INK, 4)}
        {bar(5, 37, 16, t.ink, 4)}
      </Sheet>
    ))}
    <Dots path={[[126, 170], [168, 170]]} />
    <Sheet x={168} y={146} w={96} d={72} r={10}>
      {bar(8, 8, 36, INK, 6)}
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}${c}`}
            x={8 + c * 21}
            y={20 + r * 16}
            width={17}
            height={12}
            rx={3}
            fill={r === 1 && c === 2 ? t.ink : '#f4f5f8'}
          />
        )),
      )}
    </Sheet>
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="rupee" bg={t.top} fg={t.ink} />
      {bar(44, 14, 46, INK, 7)}
      {bar(44, 27, 32)}
      <rect x={12} y={48} width={84} height={20} rx={7} fill={t.top} />
      <Glyph u={16} v={51} s={14} icon="whatsapp" bg={t.ink} fg="#ffffff" />
      {bar(36, 55, 50, t.ink, 5)}
    </Lifted>
  </>
);

const DashboardAndCrm: Scene = ({ t }) => (
  <>
    <Slot t={t} />
    <Sheet x={20} y={96} w={136} d={100} r={12}>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={10 + i * 62} y={10} width={54} height={22} rx={5} fill="#f6f7f9" />
          {bar(16 + i * 62, 15, 22, GREY, 4)}
          {bar(16 + i * 62, 23, 32, i === 0 ? t.ink : INK, 5)}
        </g>
      ))}
    </Sheet>
    {[20, 34, 26, 46, 58].map((h, i) => (
      <Column key={i} x={32 + i * 24} y={148} z={Z + 6} h={h} t={t} solid={i === 4} />
    ))}
    <Dots path={[[160, 180], [180, 180]]} />
    <Stack x={180} y={150} w={86} d={60} t={t} icon="people" />
    <Lifted t={t}>
      <Glyph u={12} v={12} s={24} icon="chart" bg={t.top} fg={t.ink} />
      {bar(44, 14, 30, GREY, 5)}
      {bar(44, 24, 48, INK, 9)}
      <circle cx={20} cy={58} r={8} fill={t.soft} />
      {bar(34, 52, 40, INK, 5)}
      {bar(34, 60, 28)}
    </Lifted>
  </>
);

/** Each page's scene: its drawing, its glyph and the card's two lines. */
const SCENES: Record<string, { scene: Scene; icon: IconName; title: string; meta: string }> = {
  'business-websites': {
    scene: BusinessWebsites,
    icon: 'globe',
    title: 'Your business website',
    meta: 'Search-ready from day one',
  },
  'e-commerce-stores': {
    scene: EcommerceStores,
    icon: 'cart',
    title: 'Online store',
    meta: 'Paid orders, stock in sync',
  },
  'customer-portals': {
    scene: CustomerPortals,
    icon: 'lock',
    title: 'Customer portal',
    meta: 'Orders and files, signed in',
  },
  'web-apps': { scene: WebApps, icon: 'window', title: 'Web app', meta: 'Runs in the browser' },
  'mobile-apps': {
    scene: MobileApps,
    icon: 'device',
    title: 'Mobile app',
    meta: 'iOS and Android',
  },
  dashboards: {
    scene: Dashboards,
    icon: 'dashboard',
    title: 'Live dashboard',
    meta: 'Leads, bookings, payments',
  },
  'internal-tools': {
    scene: InternalTools,
    icon: 'wrench',
    title: 'Internal tool',
    meta: 'Approvals in one click',
  },
  'crm-systems': {
    scene: CrmSystems,
    icon: 'people',
    title: 'Customer records',
    meta: 'One record per customer',
  },
  'custom-software': {
    scene: CustomSoftware,
    icon: 'code',
    title: 'Custom software',
    meta: 'Built around your process',
  },
  'business-platforms': {
    scene: BusinessPlatforms,
    icon: 'layers',
    title: 'Business platform',
    meta: 'Many teams, one system',
  },
  'whatsapp-automation': {
    scene: WhatsappAutomation,
    icon: 'whatsapp',
    title: 'Automatic replies',
    meta: 'Sent the moment they ask',
  },
  'booking-payment-workflows': {
    scene: BookingPayments,
    icon: 'calendar',
    title: 'Booked and paid',
    meta: 'Confirmed on its own',
  },
  'api-integrations': {
    scene: ApiIntegrations,
    icon: 'plug',
    title: 'Connected tools',
    meta: 'Payments, CRM, accounting',
  },
  'ai-assistants': {
    scene: AiAssistants,
    icon: 'spark',
    title: 'AI assistant',
    meta: 'Answers from your own info',
  },
  'ai-workflows': {
    scene: AiWorkflows,
    icon: 'fileSpark',
    title: 'AI workflow',
    meta: 'Reads, enters, flags',
  },
  evolve: { scene: Care, icon: 'refresh', title: 'Evolve care', meta: 'Hosted, backed up, improving' },
  'lead-automation': {
    scene: LeadAutomation,
    icon: 'target',
    title: 'Every enquiry caught',
    meta: 'Site, ads and WhatsApp',
  },
  'online-store-and-bookings': {
    scene: StoreAndBookings,
    icon: 'store',
    title: 'Sell and take bookings',
    meta: 'Paid, then updated on WhatsApp',
  },
  'business-dashboard-crm': {
    scene: DashboardAndCrm,
    icon: 'chart',
    title: 'One place for it all',
    meta: 'Every number, every customer',
  },
  'website-care-hosting': {
    scene: Care,
    icon: 'shield',
    title: 'Looked after',
    meta: 'Fast, safe, backed up',
  },
};

export const hasIsoView = (slug: string) => slug in SCENES;

/** A page's scene in the home picture's frame, 3:2 as the photograph it stands in for. */
export function IsoView({ slug, accent }: { slug: string; accent: string }) {
  const entry = SCENES[slug];
  if (!entry) return null;
  const Scene = entry.scene;
  return (
    <div aria-hidden="true" data-nosnippet="" className="rounded-[2rem] border border-line bg-fill p-3 sm:p-5">
      <div className="relative overflow-hidden rounded-[1.2rem] border border-line bg-white sm:rounded-[1.4rem]">
        <Corners />
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(11_13_18/0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" />
        <div className="relative aspect-[3/2]">
          <Stage
            id={slug}
            accent={accent}
            icon={entry.icon}
            title={entry.title}
            meta={entry.meta}
          >
            <Scene t={tonesOf(accent)} />
          </Stage>
        </div>
      </div>
    </div>
  );
}
