import type { CSSProperties } from 'react';

import { Marquee } from '@/components/motion/marquee';
import { sectorNeeds, sectors } from '@/content/site';

import { Band } from '../layout/band';
import { Pausable } from '../motion/pause-toggle';
import { Icon, type IconName } from '../ui/icon';
import { GRAPHITE } from '../visuals/graphite';

/**
 * aoutive's "trusted by" strip, told honestly and made to move: the kinds of business this site is
 * built for — not a row of logos belonging to clients nobody has signed yet — in two rows running
 * opposite ways. The first names each business beside a mark on light grey; the second says what we most
 * often build for it. Both drift on beUI's marquee (`@beui/marquee`), faded at the edges and
 * held while pointed at so they can be read.
 */
export const MARKS: Record<string, IconName> = {
  Retail: 'store',
  Clinics: 'medical',
  Hospitality: 'dining',
  'Real Estate': 'home',
  Education: 'school',
  'Professional Services': 'briefcase',
  Startups: 'rocket',
  Manufacturing: 'factory',
};
/** The marks' grounds: light greys, after the home Services pictures — the colour stays out. */
export const TINTS = ['#f1f2f5', '#eceef2', '#f3f4f7', '#eef0f3', '#f0f1f4'];
const SIGNALS = [GRAPHITE, '#6b7080', GRAPHITE, '#a3a8b4', GRAPHITE];

export function Sectors() {
  return (
    <Band labelledBy="sectors-heading" className="py-12">
      <h2 id="sectors-heading" className="eyebrow text-center">
        Built for businesses like yours
      </h2>
      <Pausable
        label="the business types"
        className="mt-7"
        buttonClassName="-top-[3.25rem] right-0"
      >
        <div className="flex flex-col gap-3">
          <Marquee direction="left" speed={40} gap="0.75rem" className="-mt-2 -mb-7 pt-2 pb-7">
            <ul className="flex gap-3">
              {sectors.map((sector, i) => (
                <li
                  key={sector}
                  className="sector-chip"
                  style={{ '--tint': TINTS[i % TINTS.length] } as CSSProperties}
                >
                  <span className="sector-chip__mark">
                    <Icon name={MARKS[sector] ?? 'spark'} size={18} />
                  </span>
                  {sector}
                </li>
              ))}
            </ul>
          </Marquee>
          <Marquee direction="right" speed={52} gap="0.75rem" className="-mt-2 -mb-7 pt-2 pb-7">
            <ul className="flex gap-3">
              {sectors.map((sector, i) => (
                <li
                  key={sector}
                  className="sector-need"
                  style={{ '--signal': SIGNALS[(i + 2) % SIGNALS.length] } as CSSProperties}
                >
                  {sectorNeeds[sector] ?? sector}
                </li>
              ))}
            </ul>
          </Marquee>
        </div>
      </Pausable>
    </Band>
  );
}
