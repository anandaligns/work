import product from '@/content/products/business-websites';

import { ToolMark } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import { Card, deep, Face, Head, onColour, Pill, Row, Tag, Wires } from './light-kit';
import { Bars, Chip, Dot, Field, Ring, Share, Stat } from './mock-parts';

/**
 * Business Websites' mockups, in the light kit, from the page's own sample business — an Interior
 * Design Studio in Indiranagar: found on Google, a consultation booked from a phone by Nikhil at
 * 9:14 pm, measured and fast. Each is laid out on a fixed canvas (`Fit`).

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.interiordesign!.accent;
/** The deep step of the page's colour, for the link Google shows. */
const DEEP = `color-mix(in srgb, ${A} 80%, #0b0d12)`;

/** Found on Google: the studio at the top of the map results, and the clicks it brings. */
export function SearchMock() {
  const others = [
    { name: 'Nest & Nook Interiors', rating: '4.6', meta: '(98) · 1.2 km · Closes 6 pm' },
    { name: 'Oak Lane Design', rating: '4.5', meta: '(64) · 1.8 km · Closes 6 pm' },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={272} i={0}>
        <div className="p-3">
          <div className="flex items-center gap-2 rounded-full border border-[#e6e7eb] px-2.5 py-1.5">
            <ToolMark tool="Google" size={14} />
            <span className="truncate text-[11px] text-ink-2">interior designer indiranagar</span>
            <span className="ml-auto text-ink-3">
              <Icon name="search" size={12} />
            </span>
          </div>
          <div
            className="mt-2.5 rounded-[10px] border p-2"
            style={{ borderColor: `color-mix(in srgb, ${A} 35%, white)` }}
          >
            <div className="flex items-center gap-2">
              <span className="truncate text-[12px] font-semibold">Interior Design Studio</span>
              <Tag tone="accent" accent={A}>
                Top result
              </Tag>
            </div>
            <p className="mt-0.5 text-[10px] text-ink-3">
              <span className="font-semibold" style={{ color: deep(A) }}>
                4.9 ★★★★★
              </span>{' '}
              (212) · Interior designer · Open till 7 pm
            </p>
          </div>
          <div className="mt-1 divide-y divide-[#f0f0f3]">
            {others.map((o) => (
              <Row key={o.name} muted title={o.name} meta={`${o.rating} ★ ${o.meta}`} />
            ))}
          </div>
        </div>
      </Card>
      <Card x={306} y={86} w={194} i={2}>
        <div className="p-3">
          <Stat label="Clicks from Google" value="3,862" delta="38%" accent={A} />
          <div className="mt-3">
            <Bars values={[30, 36, 34, 44, 52, 58, 64, 72, 80, 92]} accent={A} height={50} />
          </div>
          <p className="mt-2 text-[9.5px] text-ink-3">Before launch → this period</p>
        </div>
      </Card>
      <Pill x={40} y={262} i={4} accent={P} icon="mail">
        118 enquiries from search
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M292 118 C 300 118, 298 132, 306 132']}
        dots={[[292, 118]]}
      />
    </Fit>
  );
}

/** Designed to sell: the consultation page on a phone, a slot chosen, Nikhil's details in, his designer. */
export function BookMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={24} y={18} w={254} i={0}>
        <div className="p-3">
          <Head
            icon="calendar"
            accent={P}
            title="Book a consultation"
            meta="interiordesignstudio.in"
          />
          <div className="mt-3 flex flex-col gap-2">
            <Field label="Project" value="Kitchen · 2 BHK" accent={A} />
            <span className="block">
              <span className="block text-[9.5px] text-ink-3">Day and time · Sat</span>
              <span className="mt-1 flex flex-wrap gap-1.5">
                <Chip accent={A}>10:30 am</Chip>
                <Chip on accent={A}>
                  11:00 am
                </Chip>
                <Chip accent={A}>11:30 am</Chip>
              </span>
            </span>
            <Field label="Name" value="Nikhil Rao" accent={A} />
            <Field label="Phone" value="+91 98450 21784" focus accent={A} />
          </div>
          <span
            className="mt-3 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Request this slot
          </span>
        </div>
      </Card>
      <Card x={300} y={30} w={198} i={2}>
        <div className="p-3">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            From the site
          </p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Stat label="On phones" value="78%" accent={A} size={17} />
            <Stat label="Visit to request" value="2.2%" delta="0.4" accent={A} size={17} />
          </div>
        </div>
      </Card>
      <Card x={300} y={130} w={198} i={3}>
        <div className="p-3">
          <div className="flex items-center gap-2.5">
            <Face name="Kavya Iyer" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-semibold">Kavya</span>
              <span className="block truncate text-[10px] text-ink-3">Senior designer</span>
            </span>
            <Tag tone="ok">Free</Tag>
          </div>
          <div className="mt-2.5 flex items-center justify-between rounded-[8px] bg-[#f4f5f7] px-2 py-1.5 text-[10.5px]">
            <span className="text-ink-2">Sat · 11:00 am, at site</span>
            <span className="font-semibold">Free</span>
          </div>
        </div>
      </Card>
      <Pill x={300} y={250} i={4} accent={P} icon="chat">
        Confirmed on WhatsApp
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M278 100 C 290 100, 288 70, 300 70', 'M278 100 C 290 100, 288 168, 300 168']}
        dots={[[278, 100]]}
      />
    </Fit>
  );
}

/** Every enquiry: one inbox, each with the page it came from, and Nikhil's request as it lands. */
export function MailMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={24} w={250} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head
            icon="mail"
            accent={P}
            title="Enquiries"
            meta="Every page · one inbox"
            right={
              <Tag tone="accent" accent={A}>
                9 new
              </Tag>
            }
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Face name="Nikhil Rao" />}
              title="Nikhil Rao"
              meta="Kitchens page · 9:14 pm"
              right={
                <Tag tone="accent" accent={A}>
                  New
                </Tag>
              }
            />
            <Row
              lead={<Dot icon="chat" tone={P} />}
              title="WhatsApp button"
              meta="Projects page · 7:40 pm"
              right={<Tag>Replied</Tag>}
            />
            <Row
              lead={<Dot icon="phone" tone={P} />}
              title="Call button"
              meta="Contact page · 6:05 pm"
              right={<Tag tone="ok">Booked</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={290} y={96} w={210} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <Dot icon="mail" tone={P} />
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-semibold">New request</span>
              <span className="block truncate text-[9.5px] text-ink-3">Website · 9:14 pm</span>
            </span>
          </div>
          <p className="mt-2 text-[10.5px] leading-[1.45] text-ink-2">
            A new request came in from the Kitchens page.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip accent={A}>Sat · 11:00 am</Chip>
            <Chip accent={A}>Nikhil Rao</Chip>
          </div>
        </div>
      </Card>
      <Pill x={44} y={270} i={4} accent={P}>
        Every enquiry, with the page it came from
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M270 90 C 282 90, 280 124, 290 124']}
        dots={[[270, 90]]}
      />
    </Fit>
  );
}

/** Measured: visitors, requests, and where the visitors come from. */
export function AnalyticsMock() {
  const sources = [
    { label: 'Google search', value: 52 },
    { label: 'Google Maps', value: 19 },
    { label: 'Instagram', value: 13 },
    { label: 'Typed in or saved', value: 10 },
    { label: 'WhatsApp shares', value: 6 },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={30} w={206} i={0}>
        <div className="p-3">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            This month
          </p>
          <div className="mt-2 flex flex-col gap-3">
            <Stat label="Visitors" value="6,412" delta="18%" accent={A} />
            <Stat label="Booking requests" value="142" delta="26%" accent={A} />
          </div>
        </div>
      </Card>
      <Card x={244} y={64} w={256} i={2}>
        <div className="p-3">
          <Head icon="chart" accent={P} title="Where visitors come from" meta="6.4k visitors" />
          <div className="mt-3 flex flex-col gap-2">
            {sources.map((s) => (
              <Share key={s.label} label={s.label} value={s.value} accent={A} />
            ))}
          </div>
        </div>
      </Card>
      <Pill x={40} y={236} i={4} accent={P} icon="trend">
        2.2% of visits become a request
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M226 90 C 236 90, 234 110, 244 110']}
        dots={[[226, 90]]}
      />
    </Fit>
  );
}

/** Speed: the homepage tested on a phone, what keeps it fast, and every page passed. */
export function SpeedMock() {
  const why = [
    { icon: 'scan' as const, title: 'Images sized for phones', meta: 'WebP and AVIF, 62% smaller' },
    { icon: 'cloud' as const, title: 'Served from a CDN', meta: 'Closest server to each visitor' },
    {
      icon: 'code' as const,
      title: 'No heavy page builder',
      meta: 'Only the code each page needs',
    },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={34} w={284} i={0}>
        <div className="p-3.5">
          <Head
            icon="gauge"
            accent={P}
            title="Homepage, tested on a phone"
            meta="Today, 10:12 am"
          />
          <div className="mt-4 grid grid-cols-4 gap-2">
            <Ring value={98} label="Performance" accent={A} />
            <Ring value={100} label="Accessibility" accent={A} />
            <Ring value={100} label="Best practices" accent={A} />
            <Ring value={100} label="SEO" accent={A} />
          </div>
        </div>
      </Card>
      <Card x={336} y={58} w={272} i={2}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head icon="spark" accent={P} title="What keeps it fast" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {why.map((w) => (
              <Row
                key={w.title}
                lead={<Dot icon={w.icon} tone={P} />}
                title={w.title}
                meta={w.meta}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={632} y={112} w={220} i={3}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="file" accent={P} title="Every page, checked" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {[
              ['/', '1.1 s · 412 KB'],
              ['/services/kitchens', '0.9 s · 318 KB'],
              ['/book', '0.8 s · 204 KB'],
            ].map(([path, time]) => (
              <Row key={path} title={path!} meta={time} right={<Tag tone="ok">Passed</Tag>} />
            ))}
          </div>
        </div>
      </Card>
      <Pill x={330} y={288} i={4} accent={P} icon="gauge">
        Fast on a phone, even on mobile data
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M312 96 C 324 96, 324 110, 336 110', 'M608 150 C 620 150, 620 160, 632 160']}
        dots={[
          [312, 96],
          [608, 150],
        ]}
      />
    </Fit>
  );
}

export const BUSINESS_WEBSITES_MOCKS = [SearchMock, BookMock, MailMock, AnalyticsMock, SpeedMock];

/** How it's built: the page as you edit it, and the result Google shows for it. */
/** The page in the site's editor: its title, its address and the price it shows. */
function EditorCard({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <Card x={x} y={y} w={w} i={0}>
      <div className="p-3.5">
        <Head
          icon="pen"
          accent={P}
          title="Modular kitchens"
          meta="Saved 2 min ago"
          right={<Tag tone="ok">Live</Tag>}
        />
        <div className="mt-3 flex flex-col gap-2">
          <Field label="Page title" value="Modular kitchens in Indiranagar" accent={A} />
          <Field label="Address" value="/services/kitchens" accent={A} />
          <Field label="Price shown" value="From ₹3.5 L" accent={A} />
        </div>
      </div>
    </Card>
  );
}

/** The same page as Google shows it: the address, the title, the description, its setup. */
function ResultCard({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <Card x={x} y={y} w={w} i={2}>
      <div className="p-3.5">
        <div className="flex items-center gap-2">
          <ToolMark tool="Google" size={16} />
          <span className="text-[10.5px] text-ink-3">
            interiordesignstudio.in › services › kitchens
          </span>
        </div>
        <p className="mt-1.5 text-[14px] font-medium" style={{ color: DEEP }}>
          Modular kitchens in Indiranagar · Interior Design Studio
        </p>
        <p className="mt-1 text-[11px] leading-[1.5] text-ink-2">
          Kitchens designed around how you cook, fitted in 45 days. A free site visit, booked
          online.
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <Chip accent={A}>Sitemap</Chip>
          <Chip accent={A}>Schema</Chip>
          <Chip accent={A}>Description</Chip>
        </div>
      </div>
    </Card>
  );
}

export function BusinessWebsitesHow() {
  return (
    <Fit w={760} h={330}>
      <EditorCard x={24} y={28} w={300} />
      <ResultCard x={372} y={60} w={364} />
      <Pill x={400} y={236} i={4} accent={P}>
        You edit the page; Google reads it right
      </Pill>
      <Wires
        w={760}
        h={330}
        accent={P}
        d={['M324 120 C 348 120, 348 130, 372 130']}
        dots={[
          [324, 120],
          [372, 130],
        ]}
      />
    </Fit>
  );
}

/**
 * The same picture for a box beside the blocks (a split section): the editor at the top left,
 * the page as Google shows it lower down on the right, the wire from one to the other and the
 * outcome under them — on a 760 × 560 canvas.
 */
export function BusinessWebsitesHowBox() {
  return (
    <Fit w={760} h={560} max={1.25}>
      <EditorCard x={56} y={44} w={330} />
      <ResultCard x={336} y={276} w={380} />
      <Pill x={356} y={470} i={4} accent={P}>
        You edit the page; Google reads it right
      </Pill>
      <Wires
        w={760}
        h={560}
        accent={P}
        d={['M221 262 V 342 H 336']}
        dots={[
          [221, 262],
          [336, 342],
        ]}
      />
    </Fit>
  );
}
