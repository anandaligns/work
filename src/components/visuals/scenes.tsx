import {
  Box,
  BrowserFace,
  FrontEdges,
  MarkTop,
  GlyphBlock,
  INK,
  Joint,
  Route,
  Scene,
  Screen,
  SIGNAL,
  TopGlyph,
  leftMatrix,
  p,
  topMatrix,
} from './iso';

/**
 * Every illustration on the site, drawn from the isometric kit. Word-free by design: the words
 * belong in the copy beside them, where they can be read, translated and edited.
 */

// --- small shared parts ----------------------------------------------------------------------

/** A page layout on a screen face: hero block, two lines, an image and a row of cards. */
function PageLayout({
  w,
  h,
  accent = INK,
  tint = '#eceefb',
}: {
  w: number;
  h: number;
  accent?: string;
  tint?: string;
}) {
  const pad = w * 0.07;
  const inner = w - pad * 2;
  return (
    <g>
      <rect x={pad} y={h * 0.1} width={inner * 0.46} height={h * 0.09} rx={2} fill={INK} />
      <rect x={pad} y={h * 0.24} width={inner * 0.4} height={h * 0.035} rx={1.5} fill="#cfcfcf" />
      <rect x={pad} y={h * 0.3} width={inner * 0.32} height={h * 0.035} rx={1.5} fill="#cfcfcf" />
      <rect
        x={pad}
        y={h * 0.39}
        width={inner * 0.18}
        height={h * 0.08}
        rx={h * 0.04}
        fill={accent}
      />
      <rect
        x={pad + inner * 0.54}
        y={h * 0.09}
        width={inner * 0.46}
        height={h * 0.4}
        rx={3}
        fill={tint}
        stroke={INK}
        strokeWidth={0.8}
      />
      <circle
        cx={pad + inner * 0.68}
        cy={h * 0.22}
        r={h * 0.05}
        fill="#fff"
        stroke={INK}
        strokeWidth={0.8}
      />
      <path
        d={`M${pad + inner * 0.56} ${h * 0.46} l${inner * 0.12} ${-h * 0.12} l${inner * 0.08} ${h * 0.07} l${inner * 0.1} ${-h * 0.14} l${inner * 0.12} ${h * 0.19}`}
        stroke={INK}
        strokeWidth={0.8}
        fill="none"
      />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={pad + i * (inner / 3)}
            y={h * 0.58}
            width={inner / 3 - 5}
            height={h * 0.26}
            rx={2}
            fill="#fff"
            stroke={INK}
            strokeWidth={0.8}
          />
          <rect
            x={pad + i * (inner / 3) + 5}
            y={h * 0.63}
            width={(inner / 3 - 5) * 0.35}
            height={h * 0.05}
            rx={1}
            fill={i === 0 ? accent : '#d9d9d9'}
          />
          <rect
            x={pad + i * (inner / 3) + 5}
            y={h * 0.72}
            width={(inner / 3 - 5) * 0.7}
            height={h * 0.025}
            rx={1}
            fill="#d9d9d9"
          />
        </g>
      ))}
    </g>
  );
}

/** A floating status chip lying on the ground plane: a slab with a coloured dot and a line. */
function Chip({
  x,
  y,
  z = 0,
  w = 70,
  color = SIGNAL.green,
}: {
  x: number;
  y: number;
  z?: number;
  w?: number;
  color?: string;
}) {
  return (
    <Box x={x} y={y} z={z} w={w} d={26} h={6} tone="white">
      <g transform={topMatrix(x, y, z + 6)}>
        <circle cx={13} cy={13} r={4.5} fill={color} />
        <rect x={24} y={9} width={w - 36} height={3.2} rx={1.6} fill={INK} />
        <rect x={24} y={15} width={(w - 36) * 0.6} height={2.6} rx={1.3} fill="#bdbdbd" />
      </g>
    </Box>
  );
}

// --- the three services ------------------------------------------------------------------------

export function DevelopmentScene() {
  return (
    <Scene box={[-86, -153, 430, 400]}>
      <Box x={0} y={0} w={220} d={40} h={8} tone="fill" />
      <Screen
        x={10}
        y={8}
        z={8}
        w={200}
        h={140}
        depth={8}
        draw={(w, h) => (
          <BrowserFace w={w} h={h}>
            <PageLayout w={w} h={h - 16} accent={SIGNAL.violet} />
          </BrowserFace>
        )}
      />
      <Route
        points={[
          [220, 20],
          [290, 20],
          [290, 110],
        ]}
      />
      <Joint at={[220, 20]} />
      <Joint at={[290, 110]} />
      <GlyphBlock x={268} y={-70} s={44} h={24} icon="code" tone="black" />
      <Route
        points={[
          [290, -26],
          [290, 20],
        ]}
        dashed
      />
      <GlyphBlock x={268} y={110} s={44} h={16} icon="layers" tone="violet" />
      <Route
        points={[
          [110, 48],
          [110, 120],
        ]}
        dashed
      />
      <Chip x={64} y={120} w={92} color={SIGNAL.violet} />
    </Scene>
  );
}

export function HostingScene() {
  return (
    <Scene box={[-167, -112, 472, 346]}>
      {/* A rack of three units. */}
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          x={0}
          y={0}
          z={i * 34}
          w={120}
          d={90}
          h={30}
          tone={i === 2 ? 'black' : 'white'}
        >
          {i < 2 ? (
            <g transform={leftMatrix(0, 90, i * 34 + 30)}>
              <circle cx={12} cy={15} r={3} fill={i === 0 ? SIGNAL.green : SIGNAL.sky} />
              <rect x={22} y={13} width={56} height={4} rx={2} fill={INK} />
              <rect
                x={86}
                y={11}
                width={22}
                height={8}
                rx={2}
                fill="#fff"
                stroke={INK}
                strokeWidth={0.8}
              />
            </g>
          ) : null}
          {i === 2 ? (
            <TopGlyph x={0} y={0} z={98} w={120} d={90} icon="server" color="#fff" scale={0.4} />
          ) : null}
        </Box>
      ))}
      <Route
        points={[
          [120, 45],
          [200, 45],
          [200, -60],
        ]}
      />
      <Joint at={[120, 45]} />
      <Joint at={[200, -60]} />
      <GlyphBlock x={180} y={-110} s={46} h={18} icon="globe" tone="sky" />
      <Route
        points={[
          [60, 90],
          [60, 170],
          [150, 170],
        ]}
        dashed
      />
      <GlyphBlock x={150} y={150} s={40} h={14} icon="lock" tone="white" />
      <GlyphBlock x={210} y={150} s={40} h={14} icon="mail" tone="white" />
      <Chip x={-120} y={30} w={90} color={SIGNAL.green} />
    </Scene>
  );
}

export function CareScene() {
  const orbit: {
    at: [number, number];
    icon: 'spark' | 'database' | 'lock' | 'gauge';
    tone: 'white' | 'mint' | 'butter' | 'blush';
  }[] = [
    { at: [-110, -40], icon: 'spark', tone: 'butter' },
    { at: [150, -40], icon: 'database', tone: 'white' },
    { at: [-110, 150], icon: 'lock', tone: 'white' },
    { at: [150, 150], icon: 'gauge', tone: 'mint' },
  ];
  return (
    <Scene box={[-274, -105, 488, 309]}>
      {orbit.map(({ at }) => (
        <Route
          key={at.join()}
          points={[
            [at[0] + 20, at[1] + 20],
            [at[0] + 20, 75],
            [40, 75],
          ]}
        />
      ))}
      <Box x={-20} y={30} w={120} d={90} h={8} tone="fill" />
      <GlyphBlock x={10} y={45} z={8} s={60} h={36} icon="shield" tone="black" />
      {orbit.map(({ at, icon, tone }) => (
        <GlyphBlock key={icon} x={at[0]} y={at[1]} s={40} h={16} icon={icon} tone={tone} />
      ))}
      <Joint at={[40, 75]} r={3.5} />
    </Scene>
  );
}

export const SERVICE_SCENES = {
  'website-development': DevelopmentScene,
  'website-hosting': HostingScene,
  'website-care': CareScene,
} as const;

// --- the four solutions ---------------------------------------------------------------------

function GetOnlineScene() {
  // Domain → site → email and SSL: wires run centre to centre along the ground, under the blocks.
  return (
    <Scene box={[-274, -164, 559, 380]}>
      <Route
        points={[
          [-195, 55],
          [25, 55],
          [25, 4],
        ]}
      />
      <Route
        points={[
          [25, 4],
          [181, 4],
          [181, -89],
        ]}
      />
      <Route
        points={[
          [181, 4],
          [181, 181],
        ]}
        dashed
      />
      <Route
        points={[
          [25, 8],
          [25, 180],
        ]}
        dashed
      />
      <GlyphBlock x={-220} y={30} s={50} h={26} icon="globe" tone="black" />
      <Joint at={[25, 55]} />
      <Screen
        x={-60}
        y={0}
        w={170}
        h={120}
        depth={8}
        draw={(w, h) => (
          <BrowserFace w={w} h={h}>
            <PageLayout w={w} h={h - 16} accent={SIGNAL.sky} tint="#e5f3fb" />
          </BrowserFace>
        )}
      />
      <Joint at={[181, 4]} />
      <GlyphBlock x={160} y={-110} s={42} h={16} icon="mail" tone="sky" />
      <GlyphBlock x={160} y={160} s={42} h={16} icon="lock" tone="white" />
      <Chip x={-25} y={170} w={100} color={SIGNAL.green} />
    </Scene>
  );
}

function SellBookScene() {
  const days = Array.from({ length: 12 }, (_, i) => i);
  return (
    <Scene box={[-274, -142, 494, 347]}>
      {/* A calendar slab: twelve day tiles, one booked. */}
      <Box x={-200} y={-40} w={180} d={140} h={8} tone="white">
        <g transform={topMatrix(-200, -40, 8)}>
          {days.map((i) => (
            <rect
              key={i}
              x={14 + (i % 4) * 40}
              y={14 + Math.floor(i / 4) * 40}
              width={32}
              height={32}
              rx={3}
              fill={i === 6 ? SIGNAL.violet : i === 2 ? '#eceefb' : '#f3f3f3'}
              stroke={INK}
              strokeWidth={0.8}
            />
          ))}
        </g>
      </Box>
      <Route
        points={[
          [-20, 30],
          [60, 30],
        ]}
      />
      <Joint at={[-20, 30]} />
      {/* The shop: three product blocks of different heights, and the till. */}
      <GlyphBlock x={60} y={-60} s={48} h={30} icon="cart" tone="black" />
      <Box x={130} y={-60} w={48} d={48} h={18} tone="butter" />
      <Box x={60} y={10} w={48} d={48} h={14} tone="blush" />
      <Box x={130} y={10} w={48} d={48} h={24} tone="white" />
      <Route
        points={[
          [154, 58],
          [154, 150],
        ]}
        dashed
      />
      <Chip x={110} y={150} w={96} color={SIGNAL.green} />
    </Scene>
  );
}

function FixImproveScene() {
  // Before → the fix → after, on one line.
  return (
    <Scene box={[-234, -219, 470, 416]}>
      <Route
        points={[
          [-140, 3],
          [-140, 110],
          [95, 110],
          [95, -16],
        ]}
      />
      <Screen
        x={-210}
        y={0}
        w={140}
        h={100}
        depth={6}
        tone="fill"
        draw={(w) => (
          <g opacity={0.85}>
            <rect x={10} y={12} width={w * 0.7} height={8} fill="#c9c9c9" />
            <rect x={10} y={26} width={w * 0.3} height={22} fill="#dcdcdc" />
            <rect x={w * 0.42} y={26} width={w * 0.5} height={10} fill="#d2d2d2" />
            <rect x={w * 0.42} y={40} width={w * 0.35} height={8} fill="#dcdcdc" />
            <rect x={10} y={56} width={w - 20} height={6} fill="#cfcfcf" />
            <rect x={10} y={68} width={w * 0.8} height={6} fill="#dcdcdc" />
            <rect x={10} y={80} width={w * 0.5} height={6} fill="#cfcfcf" />
          </g>
        )}
      />
      <GlyphBlock x={-40} y={90} s={40} h={16} icon="refresh" tone="butter" />
      <Joint at={[-140, 110]} />
      <Screen
        x={10}
        y={-20}
        w={170}
        h={124}
        depth={8}
        draw={(w, h) => (
          <BrowserFace w={w} h={h}>
            <PageLayout w={w} h={h - 16} accent={SIGNAL.green} tint="#e6f7ee" />
          </BrowserFace>
        )}
      />
      <Route
        points={[
          [180, -16],
          [240, -16],
          [240, 60],
        ]}
        dashed
      />
      <GlyphBlock x={218} y={60} s={44} h={18} icon="gauge" tone="mint" />
    </Scene>
  );
}

function ManagedScene() {
  const ring: {
    at: [number, number];
    icon: 'server' | 'database' | 'lock' | 'spark' | 'gauge' | 'mail';
    tone: 'white' | 'sky' | 'mint' | 'butter' | 'violet';
  }[] = [
    { at: [-150, -90], icon: 'server', tone: 'white' },
    { at: [40, -150], icon: 'database', tone: 'sky' },
    { at: [190, -40], icon: 'lock', tone: 'white' },
    { at: [190, 130], icon: 'gauge', tone: 'mint' },
    { at: [0, 190], icon: 'spark', tone: 'butter' },
    { at: [-170, 90], icon: 'mail', tone: 'violet' },
  ];
  return (
    <Scene box={[-271, -148, 515, 358]}>
      {ring.map(({ at }) => (
        <Route
          key={at.join()}
          points={[
            [at[0] + 18, at[1] + 18],
            [at[0] + 18, 20],
            [20, 20],
          ]}
          dashed={at[1] > 100}
        />
      ))}
      {ring.map(({ at }) => (
        <Joint key={`j${at.join()}`} at={[at[0] + 18, 20]} r={2.6} />
      ))}
      <GlyphBlock x={-15} y={-15} s={70} h={40} icon="shield" tone="black" />
      {ring.map(({ at, icon, tone }) => (
        <GlyphBlock key={icon} x={at[0]} y={at[1]} s={36} h={14} icon={icon} tone={tone} />
      ))}
    </Scene>
  );
}

export const SOLUTION_SCENES = {
  'get-online': GetOnlineScene,
  'sell-and-book-online': SellBookScene,
  'fix-and-improve': FixImproveScene,
  'managed-website': ManagedScene,
} as const;

// --- the portal ----------------------------------------------------------------------------

/**
 * aoutive's integration cube, as the client portal: a glass box with the mark inside, and the
 * five things the portal actually holds wired to it — the project, files, the agreement,
 * invoices and requests.
 */
export function PortalScene() {
  const glass = 150;
  const spokes: {
    at: [number, number];
    icon: 'device' | 'file' | 'pen' | 'receipt' | 'chat';
    tone: 'white' | 'violet' | 'mint' | 'butter' | 'sky';
  }[] = [
    { at: [-250, 10], icon: 'device', tone: 'white' },
    { at: [-200, -150], icon: 'file', tone: 'violet' },
    { at: [260, -60], icon: 'pen', tone: 'white' },
    { at: [300, 110], icon: 'receipt', tone: 'mint' },
    { at: [60, 290], icon: 'chat', tone: 'butter' },
  ];
  return (
    <Scene box={[-280, -207, 609, 470]}>
      {spokes.map(({ at }) => (
        <Route
          key={at.join()}
          points={[
            [at[0] + 22, at[1] + 22],
            [at[0] + 22, 75],
            [75, 75],
          ]}
        />
      ))}
      {/* A black-rimmed floor, a glass box on it, the mark on a black block inside. */}
      <Box x={-24} y={-24} w={glass + 48} d={glass + 48} h={6} tone="black" />
      <Box x={-18} y={-18} z={6} w={glass + 36} d={glass + 36} h={6} tone="white" />
      <Box x={0} y={0} z={12} w={glass} d={glass} h={glass} tone="glass" stroke="#c4c4c4" />
      <Box x={30} y={30} z={12} w={90} d={90} h={62} tone="black">
        <MarkTop x={30} y={30} z={74} s={90} />
      </Box>
      <FrontEdges x={0} y={0} z={12} w={glass} d={glass} h={glass} color={INK} />
      {spokes.map(({ at, icon, tone }) => (
        <GlyphBlock key={icon} x={at[0]} y={at[1]} s={44} h={18} icon={icon} tone={tone} />
      ))}
      {spokes.map(({ at }) => (
        <Joint key={`j${at.join()}`} at={[at[0] + 22, 75]} r={3} />
      ))}
    </Scene>
  );
}

// --- the promises ----------------------------------------------------------------------------

export function PromiseScene({ index }: { index: number }) {
  switch (index) {
    case 3:
      // The warranty: the launched site on the left, wired to a shield, a fix on call beneath it.
      return (
        <Scene box={[-150, -75, 309, 193]}>
          <Route
            points={[
              [80, -16],
              [20, -16],
              [20, 90],
            ]}
          />
          <Route
            points={[
              [104, 8],
              [104, 44],
            ]}
            dashed
          />
          <Screen
            x={-60}
            y={90}
            w={104}
            h={76}
            depth={6}
            draw={(w, h) => (
              <BrowserFace w={w} h={h}>
                <PageLayout w={w} h={h - 16} accent={SIGNAL.green} tint="#e6f7ee" />
              </BrowserFace>
            )}
          />
          <Joint at={[20, -16]} />
          <GlyphBlock x={80} y={-40} s={48} h={28} icon="shield" tone="black" />
          <GlyphBlock x={84} y={44} s={40} h={14} icon="refresh" tone="mint" />
        </Scene>
      );
    case 0:
      // A price, fixed in writing: a document slab, and the total set on a black block beside it.
      return (
        <Scene box={[-202, -100, 326, 189]}>
          <Box x={-120} y={-40} w={130} d={100} h={6} tone="white">
            <g transform={topMatrix(-120, -40, 6)}>
              <rect x={12} y={12} width={60} height={6} rx={3} fill={INK} />
              {[26, 36, 46, 56].map((y) => (
                <rect
                  key={y}
                  x={12}
                  y={y}
                  width={y === 56 ? 50 : 96}
                  height={3.5}
                  rx={1.75}
                  fill="#cfcfcf"
                />
              ))}
              <rect
                x={12}
                y={70}
                width={106}
                height={16}
                rx={3}
                fill="#f3f3f3"
                stroke={INK}
                strokeWidth={0.8}
              />
              <rect x={76} y={75} width={36} height={6} rx={3} fill={INK} />
            </g>
          </Box>
          <Route
            points={[
              [10, 10],
              [70, 10],
            ]}
          />
          <Joint at={[10, 10]} />
          <GlyphBlock x={70} y={-12} s={46} h={26} icon="receipt" tone="black" />
          <Chip x={-100} y={90} w={84} color={SIGNAL.green} />
          <Route
            points={[
              [-58, 60],
              [-58, 90],
            ]}
            dashed
          />
        </Scene>
      );
    case 1:
      // A timeline: four stepping blocks, the last one tinted, climbing to the right.
      return (
        <Scene box={[-139, -94, 248, 218]}>
          {[0, 1, 2, 3].map((i) => (
            <Box
              key={i}
              x={-120 + i * 55}
              y={-20}
              w={44}
              d={44}
              h={10 + i * 14}
              tone={i === 3 ? 'violet' : 'white'}
            />
          ))}
          <Route
            points={[
              [-98, 40],
              [67, 40],
            ]}
            dashed
          />
          <GlyphBlock x={70} y={70} s={40} h={14} icon="calendar" tone="black" />
        </Scene>
      );
    default:
      // A request: a message tile, a reply, and the change landing on a small screen.
      return (
        <Scene box={[-167, -124, 293, 258]}>
          <Route
            points={[
              [-127, 3],
              [35, 3],
              [35, -37],
            ]}
          />
          <Route
            points={[
              [35, 3],
              [120, 3],
              [120, 60],
            ]}
            dashed
          />
          <GlyphBlock x={-150} y={-20} s={46} h={18} icon="chat" tone="white" />
          <Joint at={[35, 3]} />
          <Screen
            x={-20}
            y={-40}
            w={110}
            h={80}
            depth={6}
            draw={(w, h) => (
              <BrowserFace w={w} h={h}>
                <PageLayout w={w} h={h - 16} accent={SIGNAL.amber} tint="#fff5d6" />
              </BrowserFace>
            )}
          />
          <GlyphBlock x={100} y={60} s={40} h={16} icon="spark" tone="mint" />
        </Scene>
      );
  }
}
