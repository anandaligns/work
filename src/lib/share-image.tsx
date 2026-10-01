import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';
import type { ReactElement } from 'react';

import { BrandSymbol } from '@/components/ui/brand';
import type { Tint } from '@/content/pages';

import { svgMarkup } from './svg-markup';

/**
 * Every page's share image, 1200 × 630: the page's own scene on its tint, with its label, its name
 * and its line beside it, and the lockup above — the header's: the symbol and the name typed. The scene is the page's hero art as an SVG — the
 * same drawing, not a copy of it — so the two can never drift apart.
 */
export const SHARE_SIZE = { width: 1200, height: 630 };

const TINTS: Record<Tint | 'paper', string> = {
  violet: '#eceefb',
  sky: '#e5f3fb',
  mint: '#e6f7ee',
  butter: '#fff5d6',
  blush: '#fdecee',
  paper: '#f5f5f7',
};

const asImage = (element: ReactElement) =>
  `data:image/svg+xml;base64,${Buffer.from(svgMarkup(element)).toString('base64')}`;

const fonts = async () => {
  const dir = join(process.cwd(), 'src/assets/og');
  const [medium, bold] = await Promise.all([
    readFile(join(dir, 'dm-sans-500.ttf')),
    readFile(join(dir, 'dm-sans-700.ttf')),
  ]);
  return [
    { name: 'DM Sans', data: medium, weight: 500 as const, style: 'normal' as const },
    { name: 'DM Sans', data: bold, weight: 700 as const, style: 'normal' as const },
  ];
};

export async function shareImage({
  eyebrow,
  title,
  line,
  tint,
  scene,
}: {
  eyebrow: string;
  title: string;
  line: string;
  tint: Tint | 'paper';
  scene: ReactElement;
}) {
  const symbol = asImage(<BrandSymbol ink="#0b0d12" />);
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: 64,
        background: TINTS[tint],
        fontFamily: 'DM Sans',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 520,
          paddingRight: 24,
        }}
      >
        {/* The header's lockup at 32px: the name 1.06× the symbol's height, 0.38× of it apart. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={symbol} width={32} height={32} alt="" />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -1,
              color: '#0b0d12',
            }}
          >
            pixelkinetix
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#5b6070',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: title.length > 28 ? 50 : 60,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: '#0b0d12',
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 22, fontSize: 26, lineHeight: 1.35, color: '#5b6070' }}>
            {line}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={asImage(scene)}
          width={560}
          height={420}
          alt=""
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>,
    { ...SHARE_SIZE, fonts: await fonts() },
  );
}
