'use client';

import { Icon } from '../../ui/icon';
import { Line, Metric, Money, Press, Status, Step } from '../kit';
import { App, Picture, Sheet, Slot } from '../sheet';

/**
 * Mobile Apps' five screens, from the page's sample business — a South Indian restaurant's own app:
 * the week's thali and Arjun's usual, the lock screen's notifications, a table for four on
 * Saturday, the app under the restaurant's own store accounts, and tonight's kitchen.
 */

/** Regulars: the week's special, and the usual ordered again in a tap. */
export function Usual() {
  return (
    <App title="Good evening, Arjun" sub="Restaurant · Jayanagar" icon="dining">
      <div className="sc-tile--accent rounded-xl p-3">
        <p className="text-[10px] font-medium tracking-[0.12em] uppercase opacity-80">This week</p>
        <p className="mt-1 text-[14px] font-semibold">Mangalorean thali</p>
        <p className="text-[10.5px] opacity-80">₹420 · pre-order by Saturday</p>
      </div>
      <p className="mt-2.5 text-[11px] text-ink-2">Your usual</p>
      <Line icon="dining" title="Masala dosa" right={<Money>₹120</Money>} />
      <Line icon="dining" title="Filter coffee" right={<Money>₹60</Money>} />
      <Press className="mt-1">Order again · ₹180</Press>
    </App>
  );
}

/** Notifications: the order ready, the table confirmed, the points — on the lock screen. */
export function Lock() {
  const notes: [string, string, string][] = [
    ['Your order is ready', 'S-2210 · at the counter', 'now'],
    ['Table for 4 confirmed', 'Saturday, 8:00 pm', '2h'],
    ['Happy birthday, Arjun', '200 points added', '1d'],
  ];
  return (
    <App title="" dark className="justify-start">
      <p className="text-center font-display text-[44px] leading-none text-white">7:08</p>
      <p className="mt-1 text-center text-[10.5px] text-white/60">Friday, 4 October</p>
      <div className="mt-4 flex flex-col gap-1.5">
        {notes.map(([title, meta, when], i) => (
          <div
            key={title}
            className={`flex items-center gap-2.5 rounded-[14px] bg-white/12 px-2.5 py-2 backdrop-blur ${i === 0 ? 'sc-pop' : ''}`}
          >
            <span className="sc-chip--on grid size-7 shrink-0 place-items-center rounded-[8px]">
              <Icon name="dining" size={13} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11.5px] font-medium text-white">{title}</span>
              <span className="block truncate text-[10px] text-white/60">{meta}</span>
            </span>
            <span className="self-start text-[9.5px] text-white/50">{when}</span>
          </div>
        ))}
      </div>
    </App>
  );
}

/** Bookings: party size, the slots really free, and the confirmation. */
export function Table() {
  return (
    <App title="Book a table" sub="Saturday, 5 October" icon="calendar">
      <span className="text-[11px] text-ink-2">Guests</span>
      <div className="mt-1 grid grid-cols-5 gap-1.5">
        <Slot>2</Slot>
        <Slot>3</Slot>
        <Slot on>4</Slot>
        <Slot>5</Slot>
        <Slot>6+</Slot>
      </div>
      <span className="mt-3 block text-[11px] text-ink-2">Free at</span>
      <div className="mt-1 grid grid-cols-3 gap-1.5">
        <Slot off>7:00</Slot>
        <Slot>7:30</Slot>
        <Slot on>8:00</Slot>
        <Slot>8:30</Slot>
        <Slot off>9:00</Slot>
        <Slot>9:30</Slot>
      </div>
      <Press className="mt-3">Confirm · Sat 8:00 pm</Press>
    </App>
  );
}

/** Yours: published under the restaurant's own App Store and Google Play accounts. */
export function Stores() {
  return (
    <Sheet label="Published" badge={<Status>Live</Status>}>
      <div className="flex items-center gap-3">
        <Picture h={52} icon="dining" className="w-[52px] shrink-0" />
        <span>
          <span className="block text-[14px] font-semibold text-ink">Restaurant</span>
          <span className="block text-[11px] text-ink-2">Food & drink · 4.8 ★</span>
        </span>
      </div>
      <div className="mt-2">
        <Line tool="App Store" title="App Store" meta="Your developer account" />
        <Line tool="Google Play" title="Google Play" meta="Your developer account" />
      </div>
      <p className="mt-1 text-[10.5px] leading-snug text-ink-2">
        The listing, the reviews and the code are the restaurant’s.
      </p>
    </Sheet>
  );
}

/** One system: tonight's kitchen, the app's orders in the counter's list. */
export function Kitchen() {
  return (
    <Sheet label="Kitchen · tonight" live foot={['Average prep', '12 min']}>
      <Metric label="Orders" value="103" delta="37 from the app" size={22} />
      <div className="mt-2.5 flex flex-col gap-1.5">
        <Step
          turn
          n={3}
          i={0}
          face="Arjun"
          title="Arjun · S-2210"
          meta="Dosa, coffee"
          className="!py-2"
        />
        <Step turn n={3} i={1} face="Farah" title="Farah · S-2209" meta="Thali" className="!py-2" />
        <Step turn n={3} i={2} icon="dining" title="Table 4" meta="Idli, vada" className="!py-2" />
      </div>
    </Sheet>
  );
}
