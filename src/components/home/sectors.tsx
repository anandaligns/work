import type { CSSProperties } from 'react';

import { sectorNeeds, sectors } from '@/content/site';

import { Band } from '../layout/band';
import { KineticMarquee } from '../motion/kinetic-marquee';
import { Pausable } from '../motion/pause-toggle';
import { Icon, type IconName } from '../ui/icon';

/**
 * aoutive's "trusted by" strip, told honestly and made to move: the kinds of business this site is
 * built for — not a row of logos belonging to clients nobody has signed yet — in two rows running
 * opposite ways. The first names each business beside a tinted mark; the second says what we most
 * often build for it. Both run with the page's scroll (`KineticMarquee`), turning back when the
 * page does.
 */
const MARKS: Record<string, IconName> = {
  Retail: 'store',
  Clinics: 'medical',
  Hospitality: 'dining',
  'Real Estate': 'home',
  Education: 'school',
  'Professional Services': 'briefcase',
  Startups: 'rocket',
  Manufacturing: 'factory',
};
const TINTS = ['#eceefb', '#e6f7ee', '#e5f3fb', '#fff5d6', '#fdecee'];
const SIGNALS = ['#6e78ff', '#1fb866', '#1e9be0', '#f0a500', '#f0506e'];

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
          <KineticMarquee direction={-1} speed={34}>
            <ul className="flex gap-3 pr-3">
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
          </KineticMarquee>
          <KineticMarquee direction={1} speed={26}>
            <ul className="flex gap-3 pr-3">
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
          </KineticMarquee>
        </div>
      </Pausable>
    </Band>
  );
}
