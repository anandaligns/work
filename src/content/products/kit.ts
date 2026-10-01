import type { BrandId, PhoneScreen, Screen } from '@/components/screens/types';

/**
 * Shorthands for a page's screens: an app on an iPhone, a web app in Safari, a site or software
 * in Chrome on a MacBook, and the two devices together.
 */
export const phone = (view: Omit<PhoneScreen, 'type'>, brand?: BrandId): Screen => ({
  kind: 'mobile',
  brand,
  view: { type: 'screen', ...view },
});

export const safari = (url: string, view: Omit<PhoneScreen, 'type'>, brand?: BrandId): Screen => ({
  kind: 'iphone',
  brand,
  url,
  screen: phone(view, brand),
});

export const mac = (url: string, tab: string, screen: Screen, brand?: BrandId): Screen => ({
  kind: 'macbook',
  brand,
  url,
  tab,
  screen,
});

export const duo = (back: Screen, front: Screen): Screen => ({ kind: 'duo', back, front });

export type Desk = Extract<Screen, { kind: 'desk' }>;
