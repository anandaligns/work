import { ToolMark } from '../ui/brand-logos';
import { Fit } from './fit';
import { Card, deep, Face, Head, onColour, Pill, Row, Tag, Wires } from './light-kit';
import { Chip, Dot, Stat } from './mock-parts';
import { GRAPHITE } from '../visuals/graphite';

/**
 * Mobile Apps' mockups, in the light kit, from the page's own sample business — a South Indian
 * restaurant's own app: the week's thali and the regulars' usual, three notifications, a table
 * for four on Saturday, the app under the restaurant's own store accounts, and tonight's kitchen.
 * Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = GRAPHITE;
/** The business's own colour: everything inside its screens. */
const A = GRAPHITE;

/** Regulars: the week's special and the usual, ordered again in a tap. */
export function RegularsMock() {
  const usual = [
    { t: 'Masala dosa', v: '₹120' },
    { t: 'Filter coffee', v: '₹60' },
    { t: 'Idli, 2 pcs', v: '₹70' },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={20} w={260} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head
            icon="dining"
            accent={P}
            title="Good evening, Arjun"
            meta="Restaurant / Food Ordering Brand"
          />
          <div
            className="mt-2.5 rounded-[10px] p-2.5"
            style={{ background: `color-mix(in srgb, ${A} 9%, white)` }}
          >
            <p
              className="text-[9.5px] font-semibold tracking-[0.06em] uppercase"
              style={{ color: deep(A) }}
            >
              This week
            </p>
            <p className="mt-0.5 text-[12.5px] font-semibold">Mangalorean thali</p>
            <p className="text-[10px] text-ink-2">₹420 · pre-order by Saturday</p>
          </div>
          <div className="mt-1 divide-y divide-[#f0f0f3]">
            {usual.map((u) => (
              <Row
                key={u.t}
                lead={<Dot icon="dining" tone={P} />}
                title={u.t}
                meta={u.v}
                right={
                  <span
                    className="grid size-5 place-items-center rounded-full text-[12px] leading-none font-semibold"
                    style={{ background: A, color: onColour(A) }}
                  >
                    +
                  </span>
                }
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={300} y={96} w={200} i={2}>
        <div className="p-3">
          <Head icon="repeat" accent={P} title="Order again" meta="S-2210 · Arjun Rao" />
          <p className="mt-2 text-[20px] leading-none font-semibold">₹180</p>
          <p className="mt-1.5 text-[10px] text-ink-3">Pickup 7:10 pm</p>
        </div>
      </Card>
      <Pill x={300} y={214} i={4} accent={P} icon="check">
        Back in two taps
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M280 130 C 290 130, 290 126, 300 126']}
        dots={[[280, 130]]}
      />
    </Fit>
  );
}

/** Notifications: the order ready, the table confirmed, the birthday points — on the lock screen. */
export function NotificationsMock() {
  const notes = [
    { text: 'Your order is ready. Pick up at the counter.', time: 'now' },
    { text: 'Table for 4 tomorrow at 8 pm. See you then!', time: '6:00 pm' },
    { text: '100 birthday points added. Happy birthday!', time: '9:00 am' },
  ];
  return (
    <Fit w={520} h={340}>
      <div className="absolute top-[26px] left-[110px] text-center">
        <p className="text-[34px] leading-none font-semibold tracking-[-0.03em] text-ink/80">
          9:41
        </p>
        <p className="mt-1 text-[10.5px] text-ink-3">Saturday</p>
      </div>
      {notes.map((n, i) => (
        <Card key={n.text} x={40 + i * 14} y={100 + i * 64} w={300} i={i}>
          <div className="flex items-start gap-2.5 p-2.5">
            <span
              className="grid size-7 shrink-0 place-items-center rounded-[8px]"
              style={{ background: A, color: onColour(A) }}
            >
              <span className="text-[11px] font-bold">Y</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between">
                <span className="text-[10.5px] font-semibold">
                  Restaurant / Food Ordering Brand
                </span>
                <span className="text-[9.5px] text-ink-3">{n.time}</span>
              </span>
              <span className="mt-0.5 block text-[10.5px] leading-[1.4] text-ink-2">{n.text}</span>
            </span>
          </div>
        </Card>
      ))}
      <Pill x={316} y={44} i={4} accent={P} icon="bell">
        Straight to their phone
      </Pill>
    </Fit>
  );
}

/** Bookings: party size, the slots really free, and the reminder the day before. */
export function BookingMock() {
  const times = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30'];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={24} w={256} i={0}>
        <div className="p-3">
          <Head icon="calendar" accent={P} title="Book a table" meta="Saturday · a table for 4" />
          <p className="mt-3 text-[9.5px] text-ink-3">Guests</p>
          <div className="mt-1 flex gap-1.5">
            <Chip accent={A}>2</Chip>
            <Chip on accent={A}>
              4
            </Chip>
            <Chip accent={A}>6</Chip>
          </div>
          <p className="mt-2.5 text-[9.5px] text-ink-3">Free at</p>
          <div className="mt-1 grid grid-cols-3 gap-1.5">
            {times.map((t) => (
              <Chip key={t} on={t === '8:00'} accent={A}>
                {t} pm
              </Chip>
            ))}
          </div>
          <span
            className="mt-3 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Confirm · Sat, 8:00 pm
          </span>
        </div>
      </Card>
      <Card x={296} y={110} w={204} i={2}>
        <div className="flex items-start gap-2.5 p-2.5">
          <Dot icon="bell" tone={P} />
          <span className="min-w-0">
            <span className="block text-[10.5px] font-semibold">The day before · 6:00 pm</span>
            <span className="mt-0.5 block text-[10.5px] leading-[1.4] text-ink-2">
              Table for 4 tomorrow at 8 pm. See you then!
            </span>
          </span>
        </div>
      </Card>
      <Pill x={296} y={214} i={4} accent={P} icon="calendar">
        A table in two taps
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M276 150 C 286 150, 286 140, 296 140']}
        dots={[[276, 150]]}
      />
    </Fit>
  );
}

/** Yours: the app published under the restaurant's own App Store and Google Play accounts. */
export function YoursMock() {
  const stores = [
    { tool: 'App Store', label: 'App Store', meta: 'Your own account' },
    { tool: 'Google Play', label: 'Google Play', meta: 'Your own account' },
  ];
  return (
    <Fit w={520} h={340}>
      {stores.map((s, i) => (
        <Card key={s.tool} x={20} y={34 + i * 92} w={250} i={i}>
          <div className="flex items-center gap-2.5 p-3">
            <span className="grid size-10 place-items-center rounded-[12px] bg-[#f4f5f7]">
              <ToolMark tool={s.tool} size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-semibold">{s.label}</span>
              <span className="block truncate text-[10px] text-ink-3">{s.meta}</span>
            </span>
            <Tag tone="ok">Live</Tag>
          </div>
        </Card>
      ))}
      <Card x={292} y={86} w={208} i={2}>
        <div className="p-3">
          <Stat label="Both apps" value="iOS + Android" accent={A} size={16} />
          <p className="mt-2 text-[10px] text-ink-3">Usually from one codebase</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip accent={A}>Store review planned</Chip>
          </div>
        </div>
      </Card>
      <Pill x={40} y={236} i={4} accent={P} icon="key">
        Published under your name
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M270 58 C 282 58, 280 110, 292 110', 'M270 150 C 282 150, 280 124, 292 124']}
        dots={[
          [270, 58],
          [270, 150],
        ]}
      />
    </Fit>
  );
}

/** One system: tonight's kitchen, the app's orders in the same list as the counter's. */
export function KitchenMock() {
  const orders = [
    {
      who: 'Arjun Rao',
      id: 'S-2210 · just now',
      dish: 'Masala dosa, filter coffee',
      tag: (
        <Tag tone="accent" accent={A}>
          New
        </Tag>
      ),
    },
    {
      who: 'Farah Khan',
      id: 'S-2209',
      dish: 'Mangalorean thali',
      tag: <Tag tone="wait">Preparing</Tag>,
    },
    { who: 'Meera Pillai', id: 'S-2208', dish: 'Masala dosa', tag: <Tag tone="ok">Ready</Tag> },
    { who: 'Table 4', id: 'S-2207', dish: 'Idli, vada, coffee', tag: <Tag>Served</Tag> },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={34} w={270} i={0}>
        <div className="p-3.5">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            Tonight
          </p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Stat label="Orders" value="103" accent={A} />
            <Stat label="Takings" value="₹41,200" accent={A} />
            <Stat label="Average prep" value="12 min" accent={A} size={17} />
            <Stat label="From the app" value="37%" accent={A} size={17} />
          </div>
        </div>
      </Card>
      <Card x={326} y={46} w={330} i={2}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head icon="dining" accent={P} title="Kitchen" meta="App, website and counter" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {orders.map((o) => (
              <Row
                key={o.id}
                lead={<Face name={o.who} />}
                title={`${o.who} · ${o.id}`}
                meta={o.dish}
                right={o.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={684} y={120} w={168} i={3}>
        <div className="p-3">
          <Head icon="bell" accent={P} title="Ready" meta="S-2208 · Meera" />
          <p className="mt-2 text-[10px] leading-[1.4] text-ink-2">
            Her phone buzzes: pick up at the counter.
          </p>
        </div>
      </Card>
      <Pill x={326} y={290} i={4} accent={P} icon="layers">
        One list for the app, the site and the counter
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M298 100 C 312 100, 312 110, 326 110', 'M656 160 C 670 160, 670 150, 684 150']}
        dots={[
          [298, 100],
          [656, 160],
        ]}
      />
    </Fit>
  );
}

export const MOBILE_APPS_MOCKS = [
  RegularsMock,
  NotificationsMock,
  BookingMock,
  YoursMock,
  KitchenMock,
];

/** How it's built: one codebase for both apps, on the same system as the website. */
/**
 * How it's built: the website and both apps from one codebase. Drawn wide (760 × 330), or for a
 * box beside its blocks (760 × 470), the same columns spread down the taller frame.
 */
function MobileAppsHowScene({ box = false }: { box?: boolean }) {
  const at = box
    ? { site: 216, hub: 186, apps: [96, 336], pill: [228, 432], h: 470 }
    : { site: 120, hub: 96, apps: [40, 200], pill: [250, 262], h: 330 };
  const mid = at.hub + 44;
  return (
    <Fit w={760} h={at.h} max={box ? 1.25 : 1.15}>
      <Card
        x={278}
        y={at.hub}
        w={204}
        i={0}
        className="shadow-[0_1px_2px_rgb(11_13_18/0.04),0_24px_48px_-20px_rgb(11_13_18/0.3)]"
      >
        <div className="p-3.5">
          <Head icon="code" accent={P} title="One codebase" meta="Two apps, one system" />
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip accent={A}>Menu</Chip>
            <Chip accent={A}>Orders</Chip>
            <Chip accent={A}>Bookings</Chip>
            <Chip accent={A}>Rewards</Chip>
          </div>
        </div>
      </Card>
      {[
        { tool: 'App Store', title: 'iPhone app', meta: 'Home · Orders · Book', y: at.apps[0]! },
        { tool: 'Google Play', title: 'Android app', meta: 'Same app, same day', y: at.apps[1]! },
      ].map((s, i) => (
        <Card key={s.title} x={548} y={s.y} w={188} i={i + 2}>
          <div className="p-2.5">
            <Head tool={s.tool} accent={P} title={s.title} meta={s.meta} />
          </div>
        </Card>
      ))}
      <Card x={24} y={at.site} w={196} i={1}>
        <div className="p-2.5">
          <Head icon="globe" accent={P} title="The website" meta="Same menu as the app" />
        </div>
      </Card>
      <Pill x={at.pill[0]!} y={at.pill[1]!} i={4} accent={P}>
        Built once, on the system you already run
      </Pill>
      <Wires
        w={760}
        h={at.h}
        accent={P}
        d={[
          `M220 ${at.site + 30} C 250 ${at.site + 30}, 248 ${mid}, 278 ${mid}`,
          `M482 ${mid - 10} C 516 ${mid - 10}, 514 ${at.apps[0]! + 24}, 548 ${at.apps[0]! + 24}`,
          `M482 ${mid + 10} C 516 ${mid + 10}, 514 ${at.apps[1]! + 24}, 548 ${at.apps[1]! + 24}`,
        ]}
        dots={[
          [278, mid],
          [482, mid],
        ]}
      />
    </Fit>
  );
}

export function MobileAppsHow() {
  return <MobileAppsHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function MobileAppsHowBox() {
  return <MobileAppsHowScene box />;
}
