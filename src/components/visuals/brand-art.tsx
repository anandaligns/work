/**
 * The identity's website hero art, as the identity draws it (`pixel-kinetix-brand-identity.html`,
 * the website application): a square of Graphite Ink laid out in modules, six of them turning a
 * quarter at a time on an 8s rhythm a beat apart — two in Kinetic Orange — and the symbol in white
 * at the centre, its pixel making the quarter-turn.
 *
 * CSS does the moving (`.pk-art` in globals.css), so it runs before script and stops under reduced
 * motion; a `Pausable` around it stops it on request.
 */
const INK = '#0B0D12';
const MODULE = '#171B28';
const KINETIC = '#FF3D00';

type Piece = { d: string; fill: string; delay?: number };

const PIECES: Piece[] = [
  { d: 'M100,100 L0,100 A100,100 0 0 1 100,0 Z', fill: MODULE },
  { d: 'M100,0 h100 v100 h-100 Z', fill: MODULE },
  { d: 'M200,100 L200,0 A100,100 0 0 1 300,100 Z', fill: KINETIC, delay: 1.3 },
  { d: 'M400,0 L400,100 A100,100 0 0 1 300,0 Z', fill: MODULE },
  { d: 'M0,100 h100 v100 h-100 Z', fill: MODULE },
  { d: 'M300,100 L400,100 A100,100 0 0 1 300,200 Z', fill: MODULE, delay: 2.6 },
  { d: 'M100,200 L100,300 A100,100 0 0 1 0,200 Z', fill: KINETIC, delay: 3.9 },
  { d: 'M300,200 h100 v100 h-100 Z', fill: MODULE },
  { d: 'M0,400 L0,300 A100,100 0 0 1 100,400 Z', fill: MODULE, delay: 5.2 },
  { d: 'M100,300 L200,300 A100,100 0 0 1 100,400 Z', fill: MODULE },
  { d: 'M200,300 h100 v100 h-100 Z', fill: '#FFFFFF' },
  { d: 'M400,400 L300,400 A100,100 0 0 1 400,300 Z', fill: MODULE, delay: 6.5 },
];

export function BrandArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={`pk-art ${className}`}>
      <rect width="400" height="400" fill={INK} />
      {PIECES.map((piece) => (
        <path
          key={piece.d}
          d={piece.d}
          fill={piece.fill}
          className={piece.delay === undefined ? undefined : 'pk-art__spin'}
          style={piece.delay === undefined ? undefined : { animationDelay: `${piece.delay}s` }}
        />
      ))}
      <path fill="#FFFFFF" d="M100,100 H207.41 A92.59,92.59 0 0 1 300,192.59 H192.59 V300 H100 Z" />
      <path className="pk-art__px" fill={KINETIC} d="M207.41,207.41 H300 V300 H207.41 Z" />
    </svg>
  );
}
