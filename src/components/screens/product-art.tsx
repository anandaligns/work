import type { ReactNode } from 'react';

import type { ProductArt as Kind } from './types';

/**
 * A store's products, drawn in SVG to read like product photographs at thumbnail size: a block-
 * printed kurta on a hanger, a folded handloom saree, a canvas tote, a stole, a cushion, a
 * glazed mug and a vase — each on a soft studio backdrop with its shadow. Nothing is loaded.
 */

let serial = 0;
const uid = () => `pa${(serial++).toString(36)}`;

export function ProductArt({ kind, className = '' }: { kind: Kind; className?: string }) {
  const id = uid();
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}bg`} cx="0.5" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#fbf7f2" />
          <stop offset="1" stopColor="#efe6dc" />
        </radialGradient>
        <linearGradient id={`${id}sh`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${id}dots`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" fill="#fff" opacity="0.55" />
        </pattern>
        <pattern id={`${id}stripe`} width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M0 0h5" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width="120" height="120" fill={`url(#${id}bg)`} />
      <ellipse cx="60" cy="106" rx="38" ry="5" fill={`url(#${id}sh)`} />
      {ART[kind](id)}
    </svg>
  );
}

const ART: Record<Kind, (id: string) => ReactNode> = {
  kurta: (id) => (
    <g>
      <path d="M60 14v6" stroke="#8a7a68" strokeWidth="1.4" />
      <path d="M44 22c6-3 26-3 32 0" stroke="#8a7a68" strokeWidth="1.6" fill="none" />
      <path d="M48 24 36 30l-8 26 9 3 6-17v58h34V42l6 17 9-3-8-26-12-6-6 7h-12Z" fill="#b4532a" />
      <path
        d="M48 24 36 30l-8 26 9 3 6-17v58h34V42l6 17 9-3-8-26-12-6-6 7h-12Z"
        fill={`url(#${id}dots)`}
      />
      <path d="M54 31v22" stroke="#7c3316" strokeWidth="1.2" />
      <circle cx="54" cy="36" r="1" fill="#f3d9c4" />
      <circle cx="54" cy="42" r="1" fill="#f3d9c4" />
      <circle cx="54" cy="48" r="1" fill="#f3d9c4" />
      <path d="M43 92h34" stroke="#7c3316" strokeWidth="2.2" />
      <path d="M43 88h34" stroke="#f3d9c4" strokeOpacity="0.6" strokeWidth="0.8" />
    </g>
  ),
  saree: (id) => (
    <g>
      <rect x="22" y="70" width="76" height="22" rx="3" fill="#6d2a47" />
      <rect x="22" y="70" width="76" height="22" rx="3" fill={`url(#${id}stripe)`} />
      <rect x="22" y="86" width="76" height="6" fill="#d4a23c" />
      <rect x="26" y="50" width="68" height="22" rx="3" fill="#0f5c63" />
      <rect x="26" y="50" width="68" height="22" rx="3" fill={`url(#${id}dots)`} />
      <rect x="26" y="66" width="68" height="6" fill="#d4a23c" />
      <rect x="30" y="30" width="60" height="22" rx="3" fill="#c2410c" />
      <rect x="30" y="46" width="60" height="6" fill="#e9c46a" />
      <path d="M30 34h60" stroke="#fff" strokeOpacity="0.25" />
    </g>
  ),
  tote: (id) => (
    <g>
      <path d="M46 40c0-14 28-14 28 0" stroke="#6b4f33" strokeWidth="3" fill="none" />
      <path d="M32 40h56l-4 58H36Z" fill="#e8dcc7" />
      <path d="M32 40h56l-4 58H36Z" fill={`url(#${id}sh)`} opacity="0.5" />
      <rect x="44" y="58" width="32" height="24" rx="3" fill="#b4532a" />
      <path d="M50 70h20M60 62v16" stroke="#f3d9c4" strokeWidth="1.4" />
    </g>
  ),
  stole: (id) => (
    <g>
      <path d="M40 18c10 4 30 4 40 0l-6 80H46Z" fill="#3f6b4c" />
      <path d="M40 18c10 4 30 4 40 0l-6 80H46Z" fill={`url(#${id}stripe)`} />
      <path d="M46 98v8M52 98v8M58 98v8M64 98v8M70 98v8" stroke="#3f6b4c" strokeWidth="1.4" />
      <path d="M44 40h32M45 60h30" stroke="#e9c46a" strokeWidth="2" />
    </g>
  ),
  cushion: (id) => (
    <g>
      <path
        d="M24 34c12 4 60 4 72 0 4 14 4 42 0 56-12-4-60-4-72 0-4-14-4-42 0-56Z"
        fill="#d97757"
      />
      <path
        d="M24 34c12 4 60 4 72 0 4 14 4 42 0 56-12-4-60-4-72 0-4-14-4-42 0-56Z"
        fill={`url(#${id}dots)`}
      />
      <circle cx="60" cy="62" r="12" fill="none" stroke="#fff4ea" strokeWidth="2" />
      <circle cx="60" cy="62" r="4" fill="#fff4ea" />
    </g>
  ),
  mug: () => (
    <g>
      <path d="M36 40h40v44a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8Z" fill="#2f5d7c" />
      <path d="M76 50h6a10 10 0 0 1 0 20h-6" stroke="#2f5d7c" strokeWidth="5" fill="none" />
      <path d="M36 40h40v10H36Z" fill="#6c9ab8" />
      <path d="M44 40v48" stroke="#fff" strokeOpacity="0.2" strokeWidth="4" />
    </g>
  ),
  vase: () => (
    <g>
      <path
        d="M50 22h20v8c0 6 14 12 14 32 0 18-10 32-24 32S36 80 36 62c0-20 14-26 14-32Z"
        fill="#c98a5a"
      />
      <path d="M40 58h40" stroke="#8a5530" strokeWidth="3" />
      <path d="M52 30c-4 12-8 20-8 34" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" />
    </g>
  ),
};
