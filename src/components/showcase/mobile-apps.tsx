'use client';

import type { CSSProperties } from 'react';

import product from '@/content/products/mobile-apps';

import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import {
  Card,
  Chip,
  Line,
  Metric,
  Money,
  Panel,
  Phone,
  Press,
  Stage,
  Step,
  Toast,
  ToolTile,
} from './kit';

/**
 * Mobile Apps, in the showcase kit, from the page's own sample business — a South Indian
 * restaurant's own app: the week's thali and the regulars' usual, three notifications, a table for
 * four on Saturday, the app under the restaurant's own store accounts, and tonight's kitchen.
 */
const P = product.accent;
const A = BRANDS.restaurant!.accent;

/** The restaurant's mark, as its app icon. */
function AppIcon({ size = 28 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[8px] text-[12px] font-bold text-white"
      style={{ width: size, height: size, background: A }}
    >
      R
    </span>
  );
}

/** Regulars: the week's special and the usual, ordered again in a tap. */
export function RegularsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Phone x={30} y={10} w={236}>
        <div className="px-3.5 pb-4">
          <p className="text-[15px] font-semibold">Good evening, Arjun</p>
          <div
            className="mt-2.5 rounded-xl p-3 text-white"
            style={{
              background: `linear-gradient(135deg, ${A}, color-mix(in srgb, ${A} 70%, #0b0d12))`,
            }}
          >
            <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase opacity-80">
              This week
            </p>
            <p className="mt-1 text-[14px] font-semibold">Mangalorean thali</p>
            <p className="text-[11px] opacity-85">₹420 · pre-order by Saturday</p>
          </div>
          <p className="mt-3 text-[11.5px] text-ink-2">Your usual</p>
          <Line icon="dining" title="Masala dosa" right={<Money>₹120</Money>} />
          <Line icon="dining" title="Filter coffee" right={<Money>₹60</Money>} />
          <Press className="mt-2">Order again · ₹180</Press>
        </div>
      </Phone>
      <Toast
        x={240}
        y={262}
        w={230}
        icon="repeat"
        title="Order S-2210 placed"
        meta="Pickup 7:10 pm · two taps"
      />
    </Stage>
  );
}

/** Notifications: the order ready, the table confirmed, the birthday points — on the lock screen. */
export function NotificationsMock() {
  const notes = [
    ['Your order is ready. Pick up at the counter.', 'now'],
    ['Table for 4 tomorrow at 8 pm. See you then!', '6:00 pm'],
    ['100 birthday points added. Happy birthday!', '9:00 am'],
  ] as const;
  return (
    <Stage w={500} accent={P} brand={A}>
      <Phone x={120} y={10} w={260} dark>
        <div className="px-3 pb-5">
          <p className="mt-2 text-center text-[40px] leading-none font-semibold tracking-[-0.03em]">
            9:41
          </p>
          <p className="mt-1 text-center text-[11px] opacity-70">Saturday, 5 October</p>
          <div className="mt-5 flex flex-col gap-2">
            {notes.map(([text, time], i) => (
              <div
                key={text}
                className="sc-pop flex items-start gap-2.5 rounded-2xl bg-white/90 p-2.5 text-ink"
                style={{ '--i': i * 2 } as CSSProperties}
              >
                <AppIcon />
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between gap-2 text-[11px] font-semibold">
                    <span className="truncate">Restaurant</span>
                    <span className="font-normal text-ink-2">{time}</span>
                  </span>
                  <span className="block text-[11.5px] leading-snug">{text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Phone>
    </Stage>
  );
}

/** Bookings: party size, the slots really free, and the reminder the day before. */
export function BookingMock() {
  const times = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30'];
  return (
    <Stage w={500} accent={P} brand={A}>
      <Phone x={24} y={10} w={244}>
        <div className="px-3.5 pb-4">
          <p className="text-[15px] font-semibold">Book a table</p>
          <p className="text-[11.5px] text-ink-2">Saturday</p>
          <p className="mt-3 text-[11px] text-ink-2">Guests</p>
          <div className="mt-1 flex gap-1.5">
            <Chip>2</Chip>
            <Chip on>4</Chip>
            <Chip>6</Chip>
          </div>
          <p className="mt-3 text-[11px] text-ink-2">Free at</p>
          <div className="mt-1 grid grid-cols-3 gap-1.5">
            {times.map((t) => (
              <Chip key={t} on={t === '8:00'}>
                {t} pm
              </Chip>
            ))}
          </div>
          <Press className="mt-4">Confirm · Sat 8:00 pm</Press>
        </div>
      </Phone>
      <Toast
        x={238}
        y={150}
        w={240}
        icon="bell"
        title="Table for 4 tomorrow, 8 pm"
        meta="Reminder sent the day before"
      />
    </Stage>
  );
}

/** Yours: the app published under the restaurant's own App Store and Google Play accounts. */
export function YoursMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={300}
        label="Published · your accounts"
        foot={['Both apps', 'iOS + Android']}
      >
        <div className="flex flex-col gap-2">
          <Step
            tool="App Store"
            title="App Store"
            meta="Your own developer account"
            status="Live"
          />
          <Step
            tool="Google Play"
            title="Google Play"
            meta="Your own developer account"
            status="Live"
          />
        </div>
      </Panel>
      <Card x={290} y={140} w={190} i={2}>
        <div className="flex items-center gap-3 p-2">
          <AppIcon size={44} />
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold text-ink">Restaurant</span>
            <span className="block text-[11px] text-ink-2">Food & drink · 4.8 ★</span>
          </span>
        </div>
        <p className="flex items-center gap-1.5 px-2 pb-1 text-[11.5px] text-ink-2">
          <Icon name="key" size={13} /> Published under your name
        </p>
      </Card>
    </Stage>
  );
}

/** One system: tonight's kitchen, the app's orders in the same list as the counter's. */
export function KitchenMock() {
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={40} w={280} label="Tonight" live>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-3 pb-3">
          <Metric label="Orders" value={103} size={26} />
          <Metric label="Takings" value={41200} prefix="₹" size={26} />
          <Metric label="Average prep" value="12 min" size={22} />
          <Metric label="From the app" value={37} suffix="%" size={22} />
        </div>
      </Panel>
      <Panel x={316} y={20} w={340} label="Kitchen · app, site, counter" i={1}>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            face="Arjun Rao"
            title="Arjun · S-2210"
            meta="Masala dosa, filter coffee"
            status="New"
            tone="accent"
          />
          <Step
            turn
            n={4}
            i={1}
            face="Farah Khan"
            title="Farah · S-2209"
            meta="Mangalorean thali"
            status="Preparing"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={2}
            face="Meera Pillai"
            title="Meera · S-2208"
            meta="Masala dosa"
            status="Ready"
          />
          <Step
            turn
            n={4}
            i={3}
            icon="dining"
            title="Table 4 · S-2207"
            meta="Idli, vada, coffee"
            status="Served"
            tone="muted"
          />
        </div>
      </Panel>
      <Toast x={640} y={170} w={240} icon="bell" title="S-2208 ready" meta="Meera’s phone buzzes" />
    </Stage>
  );
}

/** How it's built: one codebase for both apps, on the same system as the website. */
export function MobileAppsHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel x={200} y={200} w={340} label="One codebase" live foot={['Built once', 'Both stores']}>
        <div className="flex flex-wrap gap-1.5 px-2 pb-2">
          <Chip>Menu</Chip>
          <Chip>Orders</Chip>
          <Chip>Bookings</Chip>
          <Chip>Rewards</Chip>
        </div>
      </Panel>
      <Card x={40} y={40} w={240} i={1}>
        <div className="flex items-center gap-3 p-2">
          <span className="sc-tile sc-tile--accent grid size-9 place-items-center rounded-[10px]">
            <Icon name="globe" size={16} />
          </span>
          <span>
            <span className="block text-[13.5px] font-medium text-ink">The website</span>
            <span className="block text-[11.5px] text-ink-2">Same menu as the app</span>
          </span>
        </div>
      </Card>
      <Card x={440} y={60} w={240} i={2}>
        <div className="flex items-center gap-3 p-2">
          <ToolTile tool="App Store" />
          <span>
            <span className="block text-[13.5px] font-medium text-ink">iPhone app</span>
            <span className="block text-[11.5px] text-ink-2">Home · Orders · Book</span>
          </span>
        </div>
      </Card>
      <Card x={440} y={420} w={240} i={3}>
        <div className="flex items-center gap-3 p-2">
          <ToolTile tool="Google Play" />
          <span>
            <span className="block text-[13.5px] font-medium text-ink">Android app</span>
            <span className="block text-[11.5px] text-ink-2">Same app, same day</span>
          </span>
        </div>
      </Card>
    </Stage>
  );
}

export const MobileAppsHow = MobileAppsHowBox;
