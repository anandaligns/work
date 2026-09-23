import type { SVGProps } from 'react';

/**
 * One icon set: 24 × 24, stroked at 1.5, no fills, `currentColor` throughout. The shapes are the
 * platform's own (`apps/web/src/components/icon.tsx`), so the two sites draw the same marks.
 */
export const PATHS = {
  device: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M10 18h4" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h3l2.6 12h11L21 7H6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14-4.5L3 9" />
      <path d="M4 13a8 8 0 0 0 14 4.5L21 15" />
      <path d="M3 4v5h5" />
      <path d="M21 20v-5h-5" />
    </>
  ),
  custom: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.6" />
      <rect x="3" y="14" width="18" height="6" rx="1.6" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.4 2.9 7.9 7 9 4.1-1.1 7-4.6 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  gauge: (
    <>
      {/* The needle pivots from the hub. The original ported glyph started it at (12,14),
          four units above the centre, so it floated detached inside the dial. */}
      <path d="M3 16a9 9 0 0 1 18 0" />
      <path d="M12 16 17 11" />
      <circle cx="12" cy="16" r="1.4" />
    </>
  ),
  move: (
    <>
      <path d="M3 12h14" />
      <path d="m13 7 5 5-5 5" />
      <path d="M21 4v16" />
    </>
  ),
  spark: <path d="M12 3.5 13.8 10 20.5 12 13.8 14 12 20.5 10.2 14 3.5 12l6.7-2z" />,
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  code: (
    <>
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
      <path d="M13.5 4 10.5 20" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .9 1.6h5.2c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3.5 1.5 6 5.5 6 10l-3 3H9l-3-3c0-4.5 2.5-8.5 6-10z" />
      <circle cx="12" cy="10" r="1.8" />
      <path d="M9 16l-2.5 4 4-1.5M15 16l2.5 4-4-1.5" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  phone: (
    <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z" />
  ),
  chat: (
    <>
      <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4A8 8 0 1 1 20 12z" />
      <path d="M9 11h.01M12 11h.01M15 11h.01" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  store: (
    <>
      <path d="M4 9h16l-1.5-5h-13z" />
      <path d="M5 9v11h14V9M9 20v-6h6v6" />
    </>
  ),
  cloud: <path d="M7 18a4.5 4.5 0 0 1-.4-9 6 6 0 0 1 11.6 1.5A4 4 0 0 1 17.5 18z" />,
  play: <path d="M8 5.5v13l10-6.5z" />,
  pause: <path d="M8 5v14M16 5v14" />,
};

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  ...rest
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}

/** Sub-service anchors to their marks — the same map the platform keeps beside its menu. */
export const SERVICE_ICONS: Record<string, IconName> = {
  'business-websites': 'device',
  'e-commerce-websites': 'cart',
  'landing-pages': 'target',
  'website-redesign': 'refresh',
  'custom-websites': 'custom',
  'managed-hosting': 'server',
  'domain-email-setup': 'mail',
  'security-backups': 'shield',
  'speed-performance': 'gauge',
  'website-migration': 'move',
  'website-updates': 'spark',
  'content-management': 'layers',
  'fixes-technical-support': 'code',
  'security-maintenance': 'lock',
  'monitoring-recovery': 'database',
  'business-online-presence': 'globe',
  'lead-generation-website': 'target',
  'e-commerce-solution': 'cart',
  'booking-appointment-solution': 'calendar',
  'website-modernisation': 'refresh',
  'move-to-better-hosting': 'move',
  'managed-website-solution': 'shield',
};

export const SOLUTION_ICONS: Record<string, IconName> = {
  'get-online': 'globe',
  'sell-and-book-online': 'store',
  'fix-and-improve': 'refresh',
  'managed-website': 'shield',
};

export const iconFor = (anchor: string): IconName => SERVICE_ICONS[anchor] ?? 'spark';
