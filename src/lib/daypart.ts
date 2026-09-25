/**
 * Day or night, by the visitor's own clock — the header's light: Apple's light bar by day, the
 * brand's glassy ink by night. Day runs from 6:00 to 18:00.
 *
 * The same rule runs twice: as the first line of script in the document's body, so the bar paints
 * in the right light before anything else does, and in the header, which re-reads the clock every minute
 * so the bar turns at dusk and dawn without a reload. It lives on `<html data-daypart>`; with no
 * script at all, the bar keeps its ink.
 */
export const DAY_FROM = 6;
export const NIGHT_FROM = 18;

export type Daypart = 'day' | 'night';

export const daypart = (hour = new Date().getHours()): Daypart =>
  hour >= DAY_FROM && hour < NIGHT_FROM ? 'day' : 'night';

export const DAYPART_SCRIPT = `(function(){var h=new Date().getHours();document.documentElement.setAttribute('data-daypart',h>=${DAY_FROM}&&h<${NIGHT_FROM}?'day':'night')})()`;
