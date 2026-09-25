/**
 * The identity's cover, as a still ground for a Graphite Ink band: the pixel (a square) and the
 * quarter-turn (a quarter-disc), tiled tone on tone on the ink.
 *
 * Drawn once, on the server, from a seeded generator (the identity's own rule: about a third
 * squares, the rest quarter-discs facing any of four ways), into one SVG tile that repeats — so
 * cells keep their size however tall the section is.
 */
const TONE = '#12151e';

const TILE_COLS = 16;
const TILE_ROWS = 12;

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (v: number) => String(Math.round(v * 100) / 100);

/** A quarter-disc filling the cell at (x, y), pivoting on corner k: TL, TR, BR, BL. */
function quarter(x: number, y: number, c: number, k: number) {
  const pivot = [
    [x, y],
    [x + c, y],
    [x + c, y + c],
    [x, y + c],
  ][k]!;
  const d1 = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ][k]!;
  const d2 = [-d1[1]!, d1[0]!];
  const [px, py] = pivot as [number, number];
  return `M${f(px)},${f(py)}L${f(px + c * d1[0]!)},${f(py + c * d1[1]!)}A${c},${c} 0 0 1 ${f(px + c * d2[0]!)},${f(py + c * d2[1]!)}Z`;
}

function tile(seed: number, cell: number, density: number) {
  const rnd = seeded(seed);
  const parts: string[] = [];
  for (let r = 0; r < TILE_ROWS; r++) {
    for (let c = 0; c < TILE_COLS; c++) {
      if (rnd() > density) continue;
      const x = c * cell;
      const y = r * cell;
      parts.push(
        rnd() < 0.34
          ? `M${x},${y}h${cell}v${cell}h${-cell}Z`
          : quarter(x, y, cell, Math.floor(rnd() * 4)),
      );
    }
  }
  return parts.join('');
}

export function BrandPattern({
  seed = 7,
  cell = 96,
  density = 0.55,
  className = '',
}: {
  seed?: number;
  cell?: number;
  density?: number;
  className?: string;
}) {
  const id = `pk-pattern-${seed}`;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id={id}
            x="50%"
            width={TILE_COLS * cell}
            height={TILE_ROWS * cell}
            patternUnits="userSpaceOnUse"
          >
            <path d={tile(seed, cell, density)} fill={TONE} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
