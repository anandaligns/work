'use client';

import product from '@/content/products/business-websites';

import { ToolMark } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import {
  Bars,
  Card,
  Chip,
  Field,
  Line,
  Meter,
  Metric,
  Mono,
  Panel,
  Press,
  Ring,
  Stage,
  Status,
  Step,
  Toast,
} from './kit';

/**
 * Business Websites, in the showcase kit, from the page's own sample business — an Interior Design
 * Studio in Indiranagar: found on Google, a consultation booked from a phone by Nikhil at 9:14 pm,
 * every enquiry in one inbox, measured, and fast.
 */
const P = product.accent;
const A = BRANDS.interiordesign!.accent;

/** Found on Google: the studio first in the local results, and the clicks and enquiries it brings. */
export function SearchMock() {
  return (
    <Stage w={480} h={340} accent={P} brand={A}>
      <Panel
        x={20}
        y={18}
        w={330}
        label="Google · near Indiranagar"
        foot={['From search', '118 enquiries']}
      >
        <div className="mx-1 mb-2 flex items-center gap-2 rounded-full border border-line px-3 py-2">
          <ToolMark tool="Google" size={15} />
          <span className="flex-1 truncate text-[12.5px] text-ink">
            interior designer indiranagar
            <span className="sc-caret ml-px align-[-2px]" />
          </span>
          <Icon name="search" size={13} className="text-ink-3" />
        </div>
        <div className="flex flex-col gap-2">
          <Step
            lit
            icon="home"
            title="Interior Design Studio"
            meta="4.9 ★ (212) · Open till 7 pm"
            status="Top result"
            tone="accent"
          />
          <Step muted icon="home" title="Nest & Nook Interiors" meta="4.6 ★ (98) · 1.2 km" />
          <Step muted icon="home" title="Oak Lane Design" meta="4.5 ★ (64) · 1.8 km" />
        </div>
      </Panel>
      <Card x={326} y={92} w={164} i={2}>
        <div className="p-2">
          <Metric label="Clicks from Google" value={3862} delta="38%" size={26} />
          <div className="mt-3">
            <Bars values={[30, 36, 34, 44, 52, 58, 64, 80]} height={52} />
          </div>
          <p className="mt-2 text-[10.5px] text-ink-2">Before launch → this month</p>
        </div>
      </Card>
    </Stage>
  );
}

/** Designed to sell: the consultation page on a phone — a slot chosen, Nikhil's details in — and the confirmation. */
export function BookMock() {
  return (
    <Stage w={480} h={340} accent={P} brand={A}>
      <Panel x={22} y={14} w={256} label="Your site · on a phone">
        <div className="px-2 pb-2">
          <p className="text-[15px] font-semibold text-ink">Book a consultation</p>
          <div className="mt-3 flex flex-col gap-2.5">
            <Field label="Project" value="Kitchen · 2 BHK" />
            <span className="block">
              <span className="block text-[11px] text-ink-2">Saturday</span>
              <span className="mt-1 flex gap-1.5">
                <Chip>10:30</Chip>
                <Chip on>11:00 am</Chip>
                <Chip>11:30</Chip>
              </span>
            </span>
            <Field label="Phone" value="+91 98450 21784" focus />
            <Press>Request this slot</Press>
          </div>
        </div>
      </Panel>
      <Card x={300} y={40} w={160} i={2}>
        <div className="grid gap-3 p-2">
          <Metric label="Visits from phones" value={78} suffix="%" size={24} />
          <div>
            <p className="text-[11.5px] text-ink-2">Visit → request</p>
            <p className="mt-1.5 font-display text-[24px] leading-none text-ink">2.2%</p>
          </div>
        </div>
      </Card>
      <Toast
        x={250}
        y={244}
        w={240}
        tool="WhatsApp"
        title="Confirmed on WhatsApp"
        meta="Sat 11:00 · with Kavya"
      />
    </Stage>
  );
}

/** Every enquiry: one inbox, each with the page it came from, and the reply already on its way. */
export function MailMock() {
  return (
    <Stage w={480} h={340} accent={P} brand={A}>
      <Panel x={22} y={22} w={318} label="Enquiries · one inbox" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            face="Nikhil Rao"
            title="Nikhil Rao"
            meta="Kitchens page · 9:14 pm"
            status="New"
            tone="accent"
          />
          <Step
            turn
            n={3}
            i={1}
            tool="WhatsApp"
            title="WhatsApp button"
            meta="Projects page · 7:40 pm"
            status="Replied"
          />
          <Step
            turn
            n={3}
            i={2}
            icon="phone"
            title="Call button"
            meta="Contact page · 6:05 pm"
            status="Booked"
          />
        </div>
      </Panel>
      <Toast
        x={236}
        y={262}
        w={230}
        tool="WhatsApp"
        title="Instant reply sent"
        meta="to Nikhil · 9:14 pm"
      />
    </Stage>
  );
}

/** Measured: visitors and requests this month, and where the visitors come from. */
export function AnalyticsMock() {
  const sources = [
    ['Google search', 52],
    ['Google Maps', 19],
    ['Instagram', 13],
    ['Typed in or saved', 10],
    ['WhatsApp shares', 6],
  ] as const;
  return (
    <Stage w={480} h={340} accent={P} brand={A}>
      <Panel x={24} y={16} w={432} label="This month" live foot={['Visit → request', '2.2%']}>
        <div className="grid grid-cols-2 gap-4 px-3 pb-3">
          <Metric label="Visitors" value={6412} delta="18%" />
          <Metric label="Booking requests" value={142} delta="26%" />
        </div>
        <div className="mx-1 rounded-xl border border-line px-3 py-3">
          <Mono>Where visitors come from</Mono>
          <div className="mt-3 flex flex-col gap-2">
            {sources.map(([label, value], i) => (
              <Meter key={label} label={label} value={value} i={i} />
            ))}
          </div>
        </div>
      </Panel>
    </Stage>
  );
}

/** Speed: the homepage tested on a phone, what keeps it fast, and every page passed. */
export function SpeedMock() {
  return (
    <Stage w={900} h={330} accent={P} brand={A}>
      <Panel
        x={24}
        y={52}
        w={296}
        label="Tested on a phone"
        badge={<Status>Passed</Status>}
        foot={['Tested', 'Today 10:12']}
      >
        <div className="grid grid-cols-4 gap-1 px-1 pb-2">
          <Ring value={98} label="Speed" i={0} size={54} />
          <Ring value={100} label="Access" i={1} size={54} />
          <Ring value={100} label="Practice" i={2} size={54} />
          <Ring value={100} label="SEO" i={3} size={54} />
        </div>
      </Panel>
      <Panel x={336} y={22} w={290} label="What keeps it fast" i={1}>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            icon="scan"
            title="Images sized for phones"
            meta="WebP and AVIF, 62% smaller"
          />
          <Step
            turn
            n={3}
            i={1}
            icon="cloud"
            title="Served from a CDN"
            meta="Closest server to each visitor"
          />
          <Step
            turn
            n={3}
            i={2}
            icon="code"
            title="No heavy page builder"
            meta="Only the code each page needs"
          />
        </div>
      </Panel>
      <Panel x={642} y={72} w={272} label="Every page, checked" i={2}>
        <div className="px-2">
          <Line icon="file" title="/" meta="1.1 s · 412 KB" right={<Status>Passed</Status>} />
          <Line
            icon="file"
            title="/services/kitchens"
            meta="0.9 s · 318 KB"
            right={<Status>Passed</Status>}
          />
          <Line icon="file" title="/book" meta="0.8 s · 204 KB" right={<Status>Passed</Status>} />
        </div>
      </Panel>
    </Stage>
  );
}

/** How it's built: the page as you edit it, and the same page as Google shows it. */
export function BusinessWebsitesHowBox() {
  return (
    <Stage w={760} h={560} accent={P} brand={A}>
      <Panel
        x={52}
        y={40}
        w={360}
        label="Editor · Modular kitchens"
        badge={<Status>Live</Status>}
        foot={['Saved', '2 min ago']}
      >
        <div className="flex flex-col gap-2.5 px-2 pb-2">
          <Field label="Page title" value="Modular kitchens in Indiranagar" focus />
          <Field label="Address" value="/services/kitchens" />
          <Field label="Price shown" value="From ₹3.5 L" />
        </div>
      </Panel>
      <Card x={292} y={346} w={420} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <ToolMark tool="Google" size={16} />
            <span className="text-[11.5px] text-ink-2">
              interiordesignstudio.in › services › kitchens
            </span>
          </div>
          <p
            className="mt-2 text-[17px] leading-snug font-medium"
            style={{ color: `color-mix(in srgb, ${A} 80%, #0b0d12)` }}
          >
            Modular kitchens in Indiranagar · Interior Design Studio
          </p>
          <p className="mt-1.5 text-[12.5px] leading-normal text-ink-2">
            Kitchens designed around how you cook, fitted in 45 days. A free site visit, booked
            online.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Status>Sitemap</Status>
            <Status>Schema</Status>
            <Status>Description</Status>
          </div>
        </div>
      </Card>
      <Toast
        x={424}
        y={236}
        w={250}
        icon="globe"
        title="Published to the site"
        meta="Google reads it right"
      />
    </Stage>
  );
}

export const BusinessWebsitesHow = BusinessWebsitesHowBox;
