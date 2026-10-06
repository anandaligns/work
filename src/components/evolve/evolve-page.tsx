import type { CSSProperties } from 'react';

import { FillText } from '@/components/motion/fill-text';
import { evolvePage } from '@/content/pages';
import { productFor } from '@/content/products';
import { contact, evolve, startFor, whatsappAbout } from '@/content/site';

import { Pricing } from '../home/pricing';
import { Band } from '../layout/band';
import { PageTrail } from '../pages/page-trail';
import { FaqBand } from '../pages/sections';
import { PageStructuredData } from '../seo/page-structured-data';
import { PageScreen } from '../showcase/cards';
import { Icon, type IconName } from '../ui/icon';
import { RollLink } from '../ui/roll-link';
import { StatusConsole } from './status-console';

/**
 * `/services/evolve` — the care plan, on a page of its own. Evolve isn't a thing we build once, so
 * its page isn't a service's: it opens on a dark console of a site in our care, live; then the
 * rhythm of a month on the plan, day by day; what the plan covers, each part with its own screen;
 * the three plans; how a change is asked for and done; moving a site in; the terms in four plain
 * lines; the questions; and a dark closing with the console's green light. Every business, figure
 * and time on it is an example.
 */
const A = productFor(evolve.slug)?.accent ?? '#a16207';

export function EvolvePage() {
  const page = evolvePage;
  const product = productFor(evolve.slug)!;
  const path = `/services/${evolve.slug}`;
  return (
    <>
      <PageStructuredData
        name={evolve.name}
        description={page.description}
        path={path}
        crumbs={[{ name: 'Services', path: '/services' }]}
        faqs={product.faqs.items}
        from={page.from}
        monthly={page.monthly}
        serviceType={page.keyword}
      />
      <Hero />
      <div className="alt-bands" style={{ '--accent': A } as CSSProperties}>
        <Rhythm />
        <Covered />
        <Plans />
        <Changes />
        <MoveIn />
        <Terms />
        <FaqBand
          eyebrow={evolve.name}
          title="Evolve questions"
          faqs={product.faqs.items}
          interest={evolve.slug}
          topic={evolve.name}
        />
      </div>
      <Closing />
    </>
  );
}

// --- the opening: a site in our care, live ------------------------------------------------------

const FACTS = [
  { value: '₹899', unit: '/ month', label: 'Plans from' },
  { value: 'Hosting', unit: 'included', label: 'In every plan' },
  { value: '30 days', unit: 'notice', label: 'To cancel' },
];

function Hero() {
  return (
    <section
      aria-labelledby="page-heading"
      className="evolve-hero on-night relative overflow-hidden pt-28 pb-20 text-white sm:pt-32 lg:pb-28"
      style={{ '--accent': A } as CSSProperties}
    >
      <div aria-hidden="true" className="evolve-hero__glow" />
      <div className="container-fluid relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="min-w-0">
          <PageTrail
            trail={[
              { name: 'Services', path: '/services' },
              { name: evolve.name, path: `/services/${evolve.slug}` },
            ]}
            align="start"
            className="rise-in mb-8 [&_*]:!text-white/60"
          />
          <p className="rise-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-white/80 uppercase">
            <span className="evolve-hero__dot" />
            Evolve · care plans
          </p>
          <h1
            id="page-heading"
            className="rise-in mt-7 font-display text-display leading-[1.02] font-medium tracking-[-0.035em]"
            style={{ '--d': 120 } as CSSProperties}
          >
            Your site, looked after.
            <span className="block text-white/45">Every single day.</span>
          </h1>
          <p
            className="rise-in mt-6 max-w-lg text-lead text-white/70"
            style={{ '--d': 260 } as CSSProperties}
          >
            {evolvePage.intro} You run the business; we keep what we built fast, safe and getting
            better.
          </p>
          <div
            className="rise-in mt-9 flex flex-wrap items-center gap-3"
            style={{ '--d': 380 } as CSSProperties}
          >
            <RollLink href={startFor(evolve.slug)} variant="paper" size="lg">
              Start on Evolve
            </RollLink>
            <RollLink href="#plans" variant="ghost" size="lg" arrow={false}>
              See the plans
            </RollLink>
          </div>
          <dl
            className="rise-in mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6"
            style={{ '--d': 480 } as CSSProperties}
          >
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs text-white/45">{fact.label}</dt>
                <dd className="mt-1">
                  <span className="font-display text-xl font-medium">{fact.value}</span>{' '}
                  <span className="text-xs text-white/55">{fact.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rise-in min-w-0" style={{ '--d': 300 } as CSSProperties}>
          <StatusConsole accent={A} />
        </div>
      </div>
    </section>
  );
}

// --- a month on the plan --------------------------------------------------------------------------

type Mark = 'backup' | 'update' | 'change' | 'report';
const MARKS: Record<Mark, { icon: IconName; label: string }> = {
  backup: { icon: 'database', label: 'Backup' },
  update: { icon: 'shield', label: 'Security update' },
  change: { icon: 'pen', label: 'A change, live' },
  report: { icon: 'chart', label: 'Monthly report' },
};
const MONTH: Mark[][] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const marks: Mark[] = ['backup'];
  if (day === 2 || day === 16) marks.push('update');
  if ([3, 8, 12, 19, 24].includes(day)) marks.push('change');
  if (day === 30) marks.push('report');
  return marks;
});

const RHYTHM: { when: string; title: string; text: string; icon: IconName }[] = [
  {
    when: 'Every minute',
    title: 'Watched',
    text: 'Uptime is checked around the clock. If the site goes down, we’re on it within your plan’s time.',
    icon: 'gauge',
  },
  {
    when: 'Every night',
    title: 'Backed up',
    text: 'The whole site and its data, kept 30 to 90 days, restored on request.',
    icon: 'database',
  },
  {
    when: 'Every fortnight',
    title: 'Updated',
    text: 'Security updates for the framework, the packages and the server, tested before they go live.',
    icon: 'shield',
  },
  {
    when: 'Every month',
    title: 'Improved',
    text: 'Your changes, done within your plan’s time — and a report of what changed and what to do next.',
    icon: 'trend',
  },
];

function Rhythm() {
  return (
    <Band id="rhythm" labelledBy="rhythm-heading" className="py-20 lg:py-28">
      <SectionHead
        id="rhythm"
        eyebrow="A month on Evolve"
        title="Nothing to remember. It just happens."
        intro="What the plan does on its own, from the minute to the month — here on the Standard plan."
      />
      <div className="mt-12 rounded-[1.5rem] border border-line bg-white p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-display text-h3 font-medium text-ink">September</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-2">
            {(Object.keys(MARKS) as Mark[]).map((mark) => (
              <li key={mark} className="inline-flex items-center gap-1.5">
                <span className={`evolve-mark evolve-mark--${mark}`}>
                  <Icon name={MARKS[mark].icon} size={10} />
                </span>
                {MARKS[mark].label}
              </li>
            ))}
          </ul>
        </div>
        <ol className="mt-6 grid grid-cols-6 gap-1.5 sm:grid-cols-10 lg:grid-cols-15">
          {MONTH.map((marks, i) => (
            <li
              key={i}
              data-reveal=""
              className={`evolve-day ${marks.length > 1 ? 'evolve-day--busy' : ''}`}
              style={{ '--i': i % 10 } as CSSProperties}
            >
              <span className="font-mono text-[10px] text-ink-3">{i + 1}</span>
              <span className="flex flex-wrap gap-0.5">
                {marks.map((mark) => (
                  <span
                    key={mark}
                    className={`evolve-mark evolve-mark--${mark}`}
                    title={MARKS[mark].label}
                  >
                    <Icon name={MARKS[mark].icon} size={10} />
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RHYTHM.map((beat, i) => (
          <li
            key={beat.when}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className="rounded-[1.25rem] border border-line bg-white p-6"
          >
            <span className="evolve-chip grid size-10 place-items-center rounded-xl">
              <Icon name={beat.icon} size={18} />
            </span>
            <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-ink-2 uppercase">
              {beat.when}
            </p>
            <p className="mt-1 font-display text-h3 font-medium text-ink">{beat.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{beat.text}</p>
          </li>
        ))}
      </ul>
    </Band>
  );
}

// --- what the plan covers -------------------------------------------------------------------------

const COVERED: {
  title: string;
  text: string;
  at: number;
  /** A wide tile's figure, beside its screen. */
  stat?: { value: string; label: string };
}[] = [
  {
    title: 'Hosting, SSL and a CDN',
    text: 'Fast, secure hosting is part of every plan — nothing extra to buy or renew.',
    at: 2,
    stat: { value: '99.98%', label: 'Uptime, last 90 days' },
  },
  { title: 'Changes, asked in your portal', text: 'Text, photos, prices, a new section.', at: 0 },
  { title: 'Monitoring', text: 'Ninety days at a glance, every incident noted.', at: 1 },
  {
    title: 'Backups, every night',
    text: 'The whole site and its data, restorable on request.',
    at: 3,
    stat: { value: '60 days', label: 'Of backups kept, on Standard' },
  },
  {
    title: 'A monthly report',
    text: 'The speed, what changed, and what we suggest next.',
    at: 4,
    stat: { value: '38 → 96', label: 'Speed score since the move' },
  },
];

function Covered() {
  return (
    <Band id="covered" labelledBy="covered-heading" className="py-20 lg:py-28">
      <SectionHead
        id="covered"
        eyebrow="What’s covered"
        title="Everything your site needs after launch."
        intro="One plan for the hosting, the safety and the improvements — for everything we build."
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {COVERED.map((item, i) => (
          <li
            key={item.title}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className={`evolve-tile group flex flex-col overflow-hidden rounded-[1.25rem] border border-line bg-white ${item.stat ? 'lg:col-span-2' : ''}`}
          >
            <span
              aria-hidden="true"
              className={`evolve-tile__ground relative block h-56 overflow-hidden ${item.stat ? 'evolve-tile__ground--wide' : ''}`}
            >
              <span className="evolve-tile__screen absolute top-6 block aspect-[3/4] w-[11rem] overflow-hidden rounded-[13px] border border-line bg-white">
                <PageScreen slug={evolve.slug} accent={A} at={item.at} />
              </span>
              {item.stat ? (
                <span className="evolve-tile__stat absolute top-1/2 right-[8%] hidden -translate-y-1/2 text-right sm:block">
                  <span className="block font-display text-[2.5rem] leading-none font-medium tracking-[-0.03em] text-ink">
                    {item.stat.value}
                  </span>
                  <span className="mt-2 block text-sm text-ink-2">{item.stat.label}</span>
                </span>
              ) : null}
            </span>
            <span className="px-6 pt-5 pb-6">
              <span className="block text-[1.0625rem] font-medium text-ink">{item.title}</span>
              <span className="mt-1 block text-sm text-ink-2">{item.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </Band>
  );
}

// --- the plans ------------------------------------------------------------------------------------

function Plans() {
  return (
    <Band id="plans" labelledBy="plans-heading" className="scroll-mt-20 py-20 lg:py-28">
      <SectionHead
        id="plans"
        eyebrow="Plans"
        title="Three plans. Hosting in all of them."
        intro="Pay monthly, or yearly and get two months free. Extra changes are priced per change."
      />
      <div className="mt-10">
        <Pricing only="care" />
      </div>
    </Band>
  );
}

// --- how a change is done -------------------------------------------------------------------------

const STEPS: { icon: IconName; title: string; text: string; time: string }[] = [
  {
    icon: 'chat',
    title: 'Ask',
    text: 'In your portal or on WhatsApp — a sentence and a photo is enough.',
    time: 'Mon, 10:12 am',
  },
  {
    icon: 'wrench',
    title: 'We do it',
    text: 'Picked up within your plan’s time, checked on a phone before it goes live.',
    time: 'Mon, 1:30 pm',
  },
  {
    icon: 'check',
    title: 'It’s live',
    text: 'You’re told it’s done, and it’s noted in the month’s report.',
    time: 'Mon, 1:40 pm',
  },
];

function Changes() {
  return (
    <Band id="changes" labelledBy="changes-heading" className="py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <SectionHead
            id="changes"
            eyebrow="Changes"
            title="Changes by message, not meetings."
            intro="Ask on Monday morning, see it live the same afternoon — within the time your plan sets."
          />
          <ol className="mt-10 flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                data-reveal=""
                style={{ '--i': i } as CSSProperties}
                className="flex gap-4"
              >
                <span className="evolve-chip grid size-11 shrink-0 place-items-center rounded-xl">
                  <Icon name={step.icon} size={18} />
                </span>
                <span>
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-h3 font-medium text-ink">{step.title}</span>
                    <span className="font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase">
                      {step.time}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-2">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div aria-hidden="true" data-reveal="" className="evolve-chat rounded-[1.5rem] p-5 sm:p-7">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <span className="grid size-10 place-items-center rounded-full bg-ink font-semibold text-white">
              PK
            </span>
            <span>
              <span className="block text-[0.9375rem] font-semibold text-ink">Pixel Kinetix</span>
              <span className="block text-xs text-ink-2">Your Evolve team · Standard plan</span>
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <p className="evolve-bubble evolve-bubble--them">
              Can you add our Diwali timings to the home page? Closed on the 1st, open till 9 pm the
              rest of the week.
              <span className="evolve-bubble__time">Mon 10:12 am</span>
            </p>
            <p className="evolve-bubble evolve-bubble--us">
              On it — it’ll be live this afternoon.
              <span className="evolve-bubble__time">Mon 10:20 am</span>
            </p>
            <p className="evolve-bubble evolve-bubble--us">
              Done. The banner is live on the home page, on phones too.
              <span className="evolve-bubble__time">Mon 1:40 pm</span>
            </p>
            <span className="mt-1 inline-flex items-center gap-2 self-start rounded-full bg-tint-mint px-3 py-1.5 text-xs font-semibold text-[#136b3d]">
              <Icon name="check" size={12} strokeWidth={2.4} />3 of 5 changes left this month
            </span>
          </div>
        </div>
      </div>
    </Band>
  );
}

// --- moving a site in -----------------------------------------------------------------------------

const MOVE: { title: string; text: string }[] = [
  { title: 'We check it', text: 'The site, the domain, the hosting and who has access.' },
  { title: 'We recover access', text: 'Starting with the domain registrar, so it stays yours.' },
  { title: 'We copy and test', text: 'Every page on our hosting, fixed where it was broken.' },
  {
    title: 'We switch at night',
    text: 'The domain moves while your customers sleep. Email untouched.',
  },
];

function MoveIn() {
  return (
    <Band id="move" labelledBy="move-heading" className="py-20 lg:py-28">
      <SectionHead
        id="move"
        eyebrow="Already have a site?"
        title="Move it to us in one night."
        intro="Built somewhere else? We look after sites we didn’t build too — moved, tested and on a plan."
      />
      <ol className="evolve-move mt-12 grid gap-4 md:grid-cols-4">
        {MOVE.map((step, i) => (
          <li
            key={step.title}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className="relative rounded-[1.25rem] border border-line bg-white p-6"
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-ink-3">0{i + 1}</span>
            <p className="mt-3 font-display text-h3 font-medium text-ink">{step.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <RollLink href="/solutions/website-care-hosting" variant="line">
          See Website Care & Hosting
        </RollLink>
      </div>
    </Band>
  );
}

// --- the terms ------------------------------------------------------------------------------------

const TERMS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'calendar',
    title: 'Three months, then monthly',
    text: 'A three-month minimum, then month to month.',
  },
  { icon: 'clock', title: '30 days’ notice', text: 'Cancel any time with a month’s notice.' },
  { icon: 'key', title: 'Yours, always', text: 'Your domain and your content belong to you.' },
  { icon: 'download', title: 'A full export', text: 'Within 10 working days if you ever leave.' },
];

function Terms() {
  return (
    <Band id="terms" labelledBy="terms-heading" className="py-20 lg:py-28">
      <SectionHead id="terms" eyebrow="The terms" title="Plain terms, no lock-in." />
      <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {TERMS.map((term) => (
          <li key={term.title} className="bg-white p-6">
            <Icon name={term.icon} size={20} className="text-[var(--accent)]" />
            <p className="mt-4 font-medium text-ink">{term.title}</p>
            <p className="mt-1 text-sm text-ink-2">{term.text}</p>
          </li>
        ))}
      </ul>
    </Band>
  );
}

// --- the closing ----------------------------------------------------------------------------------

function Closing() {
  const closing = evolvePage.closing;
  return (
    <section
      aria-labelledby="evolve-closing-heading"
      className="evolve-closing on-night relative overflow-hidden py-24 text-white lg:py-32"
      style={{ '--accent': A } as CSSProperties}
    >
      <div aria-hidden="true" className="evolve-hero__glow" />
      <div className="container-fluid relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80">
          <span className="evolve-hero__dot" />
          All systems normal
        </span>
        <h2
          id="evolve-closing-heading"
          className="mx-auto mt-8 max-w-3xl font-display text-title tracking-[var(--tracking-heading)]"
        >
          {closing.lead} <FillText text={closing.fill} />
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lead text-white/65">
          Tell us what you have. We’ll tell you which plan fits — or if you don’t need one.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <RollLink href={startFor(evolve.slug)} variant="paper" size="lg">
            Start on Evolve
          </RollLink>
          <RollLink href={whatsappAbout(evolve.name)} variant="ghost" size="lg" external>
            Ask on WhatsApp
          </RollLink>
        </div>
        <p className="mt-6 text-sm text-white/45">
          Or call{' '}
          <a href={contact.phoneHref} className="text-white/80 underline underline-offset-2">
            {contact.phone}
          </a>
        </p>
      </div>
    </section>
  );
}

// --- a section's head -----------------------------------------------------------------------------

function SectionHead({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
        <span className="size-1.5 bg-[var(--accent)]" />
        {eyebrow}
      </p>
      <h2 id={`${id}-heading`} className="mt-5 text-h2 tracking-[var(--tracking-heading)] text-ink">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-body text-ink-2">{intro}</p> : null}
    </div>
  );
}
