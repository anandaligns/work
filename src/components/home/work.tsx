import { Marquee } from '@/components/motion/marquee';
import { headings, START } from '@/content/site';

import { Band } from '../layout/band';
import { Pausable } from '../motion/pause-toggle';
import { RollLink } from '../ui/roll-link';
import { BRANDS, type Brand, DesktopSite, Scaled } from '../visuals/concept-sites';
import { SectionHead } from './section-head';

/**
 * Work — codify's gallery, at codify's size.
 *
 * One plane, tilted in three axes under a 1600px perspective, straightening as the section arrives
 * (`.tilt-plane`, driven by `ScrollEffects`). Inside it three rows drift sideways in alternate
 * directions. Every card is a concept site at 1280 × 800, scaled to 600 × 375 on a desktop and
 * 320 × 200 on a phone.
 *
 * The section says what these are. They are concept designs, and when real projects complete this
 * is where their case studies go — it does not borrow anyone else's website to look busy.
 *
 * Each card's label names the system behind the concept site — what the website is connected to —
 * rather than the kind of business, which the site itself already shows.
 */
const SYSTEMS: Record<string, string> = {
  interiordesign: 'Website + enquiry inbox',
  fashionstore: 'Store + order updates',
  partsdistributor: 'Customer portal + invoices',
  logistics: 'Dispatch app + proof of delivery',
  restaurant: 'Ordering app + table bookings',
  solarenergy: 'Generation dashboard',
  school: 'Admissions + approvals',
  realestate: 'Lead CRM + site visits',
  construction: 'Projects + purchase approvals',
  recruitment: 'Hiring platform + client access',
  dentalclinic: 'Booking + WhatsApp reminders',
  salon: 'Online booking + deposits',
  travelagency: 'Bookings + supplier sync',
  lawfirm: 'AI assistant + consultations',
  accounting: 'Invoice reading + approvals',
};

/** The fifteen service pages' example businesses, five to a row, each shown once. */
const row = (ids: string[]) => ids.map((id) => BRANDS[id]!);
const ROWS: { brands: Brand[]; duration: number; reverse?: boolean }[] = [
  {
    brands: row(['dentalclinic', 'interiordesign', 'logistics', 'solarenergy', 'lawfirm']),
    duration: 70,
  },
  {
    brands: row(['restaurant', 'realestate', 'school', 'travelagency', 'fashionstore']),
    duration: 90,
    reverse: true,
  },
  {
    brands: row(['salon', 'construction', 'partsdistributor', 'recruitment', 'accounting']),
    duration: 80,
  },
];

function Card({ b }: { b: Brand }) {
  return (
    <div className="relative shrink-0 px-2.5 md:px-3.5">
      <Scaled className="h-[200px] w-[320px] rounded-xl [--k:0.25] md:h-[375px] md:w-[600px] md:rounded-2xl md:[--k:0.46875]">
        <DesktopSite b={b} />
      </Scaled>
      <span className="absolute bottom-3 left-5 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[0.6875rem] font-medium text-white backdrop-blur md:bottom-4 md:left-7">
        <span className="size-1.5 rounded-full bg-white/80" />
        {b.name}
        <span className="hidden md:inline">· {SYSTEMS[b.id] ?? b.kind}</span>
      </span>
    </div>
  );
}

export function Work() {
  return (
    <Band
      id="work"
      labelledBy="work-heading"
      contain={false}
      pattern
      seed={11}
      className="band-night on-night overflow-hidden border-t-0 bg-night text-white"
    >
      {/* The whole band sits on the identity's cover: its modules, tone on tone on the ink. */}
      <Pausable label="the gallery" tone="night" className="pb-24 lg:pb-32">
        <div className="container-fluid relative grid gap-8 pt-24 lg:grid-cols-[1fr_auto] lg:items-end lg:pt-32">
          <SectionHead
            id="work"
            eyebrow="Concept work"
            tone="night"
            heading={headings.work}
            intro="Concept systems for a dental clinic, a restaurant, a logistics company and twelve more: the website customers see, and the automation working behind it. Real client projects appear here as they launch."
          />
          <div data-reveal="">
            <RollLink href={START.href} variant="paper">
              Start your project
            </RollLink>
          </div>
        </div>
        <div className="tilt-stage relative mt-16" aria-hidden="true">
          <div className="tilt-plane flex flex-col gap-5 md:gap-7">
            {ROWS.map((row, i) => (
              // beUI's marquee (`@beui/marquee`), one per row, alternate rows the other way.
              <Marquee
                key={i}
                speed={row.duration}
                direction={row.reverse ? 'right' : 'left'}
                gap="0px"
                fade={false}
              >
                {row.brands.map((b) => (
                  <Card key={b.id} b={b} />
                ))}
              </Marquee>
            ))}
          </div>
        </div>
      </Pausable>
    </Band>
  );
}
