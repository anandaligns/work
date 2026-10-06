'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  type ComponentType,
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { Checkbox } from '@/components/motion/checkbox';
import { contact, type Interest } from '@/content/site';
import { BUDGETS, type Enquiry, TIMINGS, normalisePhone } from '@/lib/enquiry';
import { EASE_OUT } from '@/lib/ease';

import { origin, whatsappWith } from '../forms/fields';
import * as AiAssistants from '../showcase/cards/ai-assistants';
import * as BookingPayments from '../showcase/cards/booking-payment-workflows';
import * as BusinessWebsites from '../showcase/cards/business-websites';
import * as CrmSystems from '../showcase/cards/crm-systems';
import * as CustomSoftware from '../showcase/cards/custom-software';
import * as Dashboards from '../showcase/cards/dashboards';
import * as ECommerce from '../showcase/cards/e-commerce-stores';
import * as Evolve from '../showcase/cards/evolve';
import * as InternalTools from '../showcase/cards/internal-tools';
import * as LeadAutomation from '../showcase/cards/lead-automation';
import * as WebApps from '../showcase/cards/web-apps';
import * as WhatsApp from '../showcase/cards/whatsapp-automation';
import { BrandLockup } from '../ui/brand';
import { Icon } from '../ui/icon';
import { ScreenThumb } from '../visuals/project-fan';

/**
 * Start your project — what every Get Started on the site opens. Its layout and its five steps are
 * the reference the owner chose (a standalone wizard page), in this site's theme: a dark page with
 * a Kinetic Orange glow; the bar with the lockup and the way back; a line of five steps with a
 * diamond travelling along it; and the workspace — a dark story panel on the left that changes
 * with each step (its words, three of the site's own screens behind a gradient, two facts along its
 * foot) beside the light project form on the right: the step's name, its fields, Back and Continue.
 *
 * The steps: the business, the service to start with (cards, each on its service's own screen), the
 * project itself, contact details, and a review with an Edit on every part and the consent. Sent,
 * the workspace gives way to a status card.
 *
 * From 1200px it fits the screen and only the form scrolls; from 768px it is a page that scrolls;
 * below 768px it is an app — the steps along the top, the form a light sheet under them that
 * scrolls, Back and Continue fixed at its foot. The story panel shows from 768px.
 *
 * Fixed from the reference: errors are said under their fields (no alert boxes) and the first one
 * takes the focus; the service cards are real radios, so arrow keys and a screen reader work; the
 * project is really sent (`/api/enquiry`), or, while there is nowhere to send, goes as a WhatsApp
 * message already written; answers are kept for the visit if it is closed by mistake; Escape
 * closes it and focus stays inside while it is open.
 */

type Fields = {
  industry: string;
  business: string;
  team: string;
  service: string;
  need: string;
  budget: string;
  when: string;
  website: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
  consent: boolean;
  marketing: boolean;
};
type Key = keyof Fields;
type Errors = Partial<Record<Key, string>>;

const EMPTY: Fields = {
  industry: '',
  business: '',
  team: '',
  service: '',
  need: '',
  budget: '',
  when: '',
  website: '',
  name: '',
  phone: '+91 ',
  email: '',
  city: 'Bengaluru',
  notes: '',
  consent: false,
  marketing: false,
};

const DRAFT_KEY = 'pk-project-draft';

const INDUSTRIES = [
  'Clinic or healthcare',
  'Salon, spa or fitness',
  'Restaurant or café',
  'Retail or e-commerce',
  'Education or coaching',
  'Real estate',
  'Construction or manufacturing',
  'Logistics or travel',
  'Professional services',
  'Home services',
  'Other',
];
const TEAMS = ['Just me', '2–10 people', '11–50 people', '51–200 people', 'More than 200'];

type StepKey = 'business' | 'service' | 'project' | 'contact' | 'review';
const STEPS: { key: StepKey; label: string; title: string; fields: Key[] }[] = [
  {
    key: 'business',
    label: 'Business',
    title: 'Your business',
    fields: ['industry', 'business', 'team'],
  },
  { key: 'service', label: 'Service', title: 'What to build', fields: ['service'] },
  { key: 'project', label: 'Project', title: 'Project details', fields: ['need'] },
  {
    key: 'contact',
    label: 'Contact',
    title: 'Contact',
    fields: ['name', 'phone', 'email', 'city'],
  },
  { key: 'review', label: 'Review', title: 'Review', fields: ['consent'] },
];

type Card = {
  value: string;
  interest: Interest;
  accent: string;
  Screen: ComponentType;
  from: string[];
};
const SERVICES: Card[] = [
  {
    value: 'Business website',
    interest: 'Website',
    accent: '#0ea5e9',
    Screen: BusinessWebsites.Home,
    from: ['website', 'business-websites'],
  },
  {
    value: 'Online store',
    interest: 'Store',
    accent: '#7c3aed',
    Screen: ECommerce.Product,
    from: ['store', 'e-commerce-stores', 'e-commerce-system', 'online-store-and-bookings'],
  },
  {
    value: 'Bookings & payments',
    interest: 'Connected Website',
    accent: '#ec4899',
    Screen: BookingPayments.Slots,
    from: ['booking-payment-workflows', 'booking-system'],
  },
  {
    value: 'WhatsApp & lead automation',
    interest: 'Connected Website',
    accent: '#16a34a',
    Screen: WhatsApp.Answered,
    from: ['whatsapp-automation', 'lead-automation', 'connected-website', 'lead-follow-up'],
  },
  {
    value: 'Web or mobile app',
    interest: 'Custom system',
    accent: '#2563eb',
    Screen: WebApps.Loads,
    from: ['web-apps', 'mobile-apps', 'customer-portals', 'business-platforms'],
  },
  {
    value: 'Dashboard & CRM',
    interest: 'System Blueprint',
    accent: '#ca8a04',
    Screen: Dashboards.Morning,
    from: [
      'dashboards',
      'crm-systems',
      'internal-tools',
      'business-dashboard-crm',
      'business-dashboard',
      'blueprint',
      'business-systems',
    ],
  },
  {
    value: 'AI assistant & workflows',
    interest: 'Custom system',
    accent: '#c026d3',
    Screen: AiAssistants.Answers,
    from: ['ai-assistants', 'ai-workflows', 'automation-ai'],
  },
  {
    value: 'Custom software',
    interest: 'Custom system',
    accent: '#ea580c',
    Screen: CustomSoftware.Approvals,
    from: ['custom-software', 'api-integrations', 'custom', 'modernise-and-connect'],
  },
  {
    value: 'Care & hosting',
    interest: 'Evolve',
    accent: '#a16207',
    Screen: Evolve.Normal,
    from: [
      'evolve',
      'evolve-plan',
      'essential',
      'standard',
      'complete',
      'website-care-hosting',
      'move-to-better-hosting',
    ],
  },
];
const UNSURE = 'Not sure yet';

const presetFor = (slug?: string) => SERVICES.find((card) => slug && card.from.includes(slug));

const STORY: Record<
  StepKey,
  {
    eyebrow: string;
    title: string;
    text: string;
    screens: [Card['Screen'], Card['Screen'], Card['Screen']];
    accent: string;
  }
> = {
  business: {
    eyebrow: 'Start with your business',
    title: 'Tell us what you run.',
    text: 'A few details help us shape the right system for you from the very first conversation.',
    screens: [BusinessWebsites.Inbox, BusinessWebsites.Home, Dashboards.Morning],
    accent: '#ff3d00',
  },
  service: {
    eyebrow: 'Choose your priority',
    title: 'What should we build first?',
    text: 'Pick the closest. You can explain exactly what you need in the next step.',
    screens: [ECommerce.Product, WhatsApp.Answered, WebApps.Loads],
    accent: '#ff3d00',
  },
  project: {
    eyebrow: 'Shape the project',
    title: 'Tell us what should change.',
    text: 'What’s slowing you down, or what you want to build. Budget and timing help us plan it honestly.',
    screens: [CustomSoftware.Phases, InternalTools.Approve, CrmSystems.Funnelled],
    accent: '#ff3d00',
  },
  contact: {
    eyebrow: 'Stay connected',
    title: 'Where should we reach you?',
    text: 'Only the essentials. A person from our team replies with the clearest next step.',
    screens: [LeadAutomation.Sources, LeadAutomation.Reply, LeadAutomation.Record],
    accent: '#ff3d00',
  },
  review: {
    eyebrow: 'One final check',
    title: 'Review your project.',
    text: 'Confirm the details below. Sending your brief is free, with no payment and no commitment.',
    screens: [Evolve.Requests, InternalTools.Approve, BookingPayments.Deposit],
    accent: '#ff3d00',
  },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function check(fields: Fields, keys: Key[]): Errors {
  const errors: Errors = {};
  const text = (key: Key) => String(fields[key] ?? '').trim();
  for (const key of keys) {
    if (key === 'industry' && !text('industry')) errors.industry = 'Please choose your industry.';
    if (key === 'business' && !text('business'))
      errors.business = 'Please add your business’s name.';
    if (key === 'team' && !text('team')) errors.team = 'Please choose your team’s size.';
    if (key === 'service' && !text('service'))
      errors.service = 'Please choose one, or Not sure yet.';
    if (key === 'need' && text('need').length < 10)
      errors.need = 'Please tell us a little more about the project.';
    if (key === 'name' && !text('name')) errors.name = 'Please add your name.';
    if (key === 'phone') {
      if (!text('phone') || text('phone') === '+91')
        errors.phone = 'Please add a phone number so we can reach you.';
      else if (!normalisePhone(text('phone')))
        errors.phone = 'Please check the number: an Indian mobile has 10 digits.';
    }
    if (key === 'email') {
      if (!text('email')) errors.email = 'Please add an email address.';
      else if (!EMAIL.test(text('email'))) errors.email = 'Please check the email address.';
    }
    if (key === 'city' && !text('city')) errors.city = 'Please add your city.';
    if (key === 'consent' && !fields.consent)
      errors.consent = 'Please tick the box so we can contact you about your project.';
  }
  return errors;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export function ProjectStart({
  interest,
  live,
  onClose,
}: {
  /** The slug a Get Started carried (`?interest=`). */
  interest?: string;
  /** Can it send (`enquiryLive`)? If not, the brief goes by WhatsApp. */
  live: boolean;
  onClose: () => void;
}) {
  const ids = useId();
  const reduce = useReducedMotion();
  const preset = presetFor(interest);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const statusHeading = useRef<HTMLHeadingElement>(null);
  const [fields, setFields] = useState<Fields>({ ...EMPTY, service: preset?.value ?? '' });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<'sent' | 'whatsapp' | 'failed' | null>(null);
  const [restored, setRestored] = useState(false);

  // The answers so far are kept for the visit, so closing it by mistake loses nothing.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) {
        const draft = JSON.parse(saved) as { fields?: Partial<Fields>; step?: number };
        setFields((f) => ({
          ...f,
          ...draft.fields,
          service: preset?.value ?? draft.fields?.service ?? f.service,
        }));
        if (typeof draft.step === 'number') setStep(Math.min(Math.max(draft.step, 0), 3));
      }
    } catch {
      // Storage may be off; it simply starts afresh.
    }
    setRestored(true);
    // On open only: the preset is the one it opened with.
  }, []);
  useEffect(() => {
    // Not before the draft is back, or the empty form would be kept over it.
    if (!restored || result === 'sent' || result === 'whatsapp') return;
    try {
      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ fields: { ...fields, consent: false }, step }),
      );
    } catch {
      // Nothing to keep it in.
    }
  }, [fields, step, result, restored]);

  // The page beneath holds still, smooth scrolling and all.
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    const html = document.documentElement;
    const previous = [document.body.style.overflow, html.style.overflow];
    document.body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    lenis?.stop();
    return () => {
      document.body.style.overflow = previous[0] ?? '';
      html.style.overflow = previous[1] ?? '';
      lenis?.start();
    };
  }, []);

  // Escape closes; Tab stays inside.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !root.current) return;
      const focusable = Array.from(root.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Each step opens at its top, its name announced.
  useEffect(() => {
    stage.current?.scrollTo({ top: 0 });
    root.current?.scrollTo({ top: 0 });
    const frame = requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [step]);

  // Sent, the status card takes the focus.
  const done = result === 'sent' || result === 'whatsapp';
  useEffect(() => {
    if (done) statusHeading.current?.focus({ preventScroll: true });
  }, [done]);

  const set = <K extends Key>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const go = useCallback((to: number) => setStep(to), []);

  const card = SERVICES.find((c) => c.value === fields.service);
  const brief = () =>
    [
      'Hi Pixel Kinetix, I’d like to start a project.',
      `• Business: ${fields.business} (${fields.industry}, ${fields.team})`,
      `• Service: ${fields.service}`,
      `• Project: ${fields.need.trim()}`,
      fields.budget ? `• Budget: ${fields.budget}` : '',
      fields.when ? `• When: ${fields.when}` : '',
      fields.website ? `• Current website: ${fields.website}` : '',
      fields.notes ? `• Also: ${fields.notes.trim()}` : '',
      `• ${fields.name} · ${fields.phone} · ${fields.email} · ${fields.city}`,
    ]
      .filter(Boolean)
      .join('\n');

  const send = async () => {
    if (!live) {
      window.open(whatsappWith(contact.whatsappHref, brief()), '_blank', 'noopener');
      finish('whatsapp');
      return;
    }
    setSending(true);
    const payload: Partial<Enquiry> & { kind: string; website_url: string } = {
      kind: 'project',
      name: fields.name,
      business: fields.business,
      phone: fields.phone,
      email: fields.email,
      city: fields.city,
      does: `${fields.industry} · ${fields.team}`,
      need: fields.need,
      interest: card?.interest ?? UNSURE,
      budget: fields.budget,
      when: fields.when,
      consent: fields.consent,
      industry: fields.industry,
      team: fields.team,
      service: fields.service,
      website: fields.website,
      notes: fields.notes,
      marketing: fields.marketing,
      source: interest ?? '',
      ...origin(),
      website_url: '',
    };
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(String(response.status));
      finish('sent');
    } catch {
      setResult('failed');
    } finally {
      setSending(false);
    }
  };

  const finish = (how: 'sent' | 'whatsapp') => {
    setResult(how);
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      // Nothing was kept.
    }
  };

  const next = (event: FormEvent) => {
    event.preventDefault();
    const found = check(fields, STEPS[step]!.fields);
    setErrors(found);
    const first = STEPS[step]!.fields.find((key) => found[key]);
    if (first) {
      root.current
        ?.querySelector<HTMLElement>(`[name="${first}"], [data-field="${first}"] [role="checkbox"]`)
        ?.focus();
      return;
    }
    if (step < STEPS.length - 1) go(step + 1);
    else void send();
  };

  const field = (key: Key) => ({
    id: `${ids}-${key}`,
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${ids}-${key}-error` : undefined,
  });
  const error = (key: Key) =>
    errors[key] ? (
      <p id={`${ids}-${key}-error`} className="pstart__error">
        <Icon name="alert" size={13} />
        {errors[key]}
      </p>
    ) : null;

  const now = STEPS[step]!;
  const story = STORY[now.key];
  const percent = (step / (STEPS.length - 1)) * 100;
  const firstName = fields.name.trim().split(/\s+/)[0] ?? '';
  // Each step slides in as it opens. Entrance only: a step left behind goes at once, so a quick
  // jump (a draft coming back, an Edit) can never leave the form between two steps.
  const slide = {
    initial: { opacity: 0, x: reduce ? 0 : 18 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: reduce ? 0 : 0.28, ease: EASE_OUT },
  };

  return (
    <motion.div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Start your project"
      data-lenis-prevent=""
      className="pstart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.3 }}
    >
      <span aria-hidden="true" className="pstart__glow" />

      <header className="pstart__nav pstart-wrap">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close and go back"
          className="pstart__logo"
        >
          <BrandLockup className="h-full w-auto" ink="#ffffff" />
        </button>
        <button type="button" onClick={onClose} className="pstart__back-link">
          Back to the site <span aria-hidden="true">←</span>
        </button>
      </header>

      {done ? (
        <section className="pstart-wrap pstart__done" aria-live="polite">
          <div className="pstart__status" role="status">
            <span className="pstart__status-mark" aria-hidden="true">
              <Icon name="check" size={24} strokeWidth={2.6} />
            </span>
            <h2 ref={statusHeading} tabIndex={-1}>
              {result === 'sent'
                ? `Thank you${firstName ? `, ${firstName}` : ''}. Your project is underway.`
                : 'Your project brief is ready on WhatsApp.'}
            </h2>
            <p>
              {result === 'sent'
                ? 'We’ll read your brief properly and reply within one working day with the clearest next step — and tell you honestly if we’re the right fit.'
                : 'Press send in WhatsApp and it reaches us with everything you told us. We reply within one working day.'}
            </p>
            <div className="pstart__status-actions">
              <a
                className="pstart-btn pstart-btn--whatsapp"
                href={whatsappWith(
                  contact.whatsappHref,
                  result === 'sent'
                    ? 'Hi Pixel Kinetix, I’ve just sent a project brief and would like to continue here.'
                    : brief(),
                )}
                target="_blank"
                rel="noreferrer"
              >
                <Roll>{result === 'sent' ? 'Continue on WhatsApp' : 'Open WhatsApp again'}</Roll>
              </a>
              <button type="button" onClick={onClose} className="pstart-btn pstart-btn--quiet">
                <Roll>Back to the site</Roll>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="pstart__wizard pstart-wrap" aria-labelledby={`${ids}-intro`}>
          <header className="pstart__intro">
            <p className="pstart__kicker">
              <span aria-hidden="true">✦</span>Start your project
            </p>
            <h1 id={`${ids}-intro`}>
              Your project, <em>mapped out simply.</em>
            </h1>
            <p>Five short steps. Clear answers. A plan shaped around your business.</p>
          </header>

          <nav className="pstart__progress" aria-label="Your project’s steps">
            <div className="pstart__track" aria-hidden="true">
              <span className="pstart__fill" style={{ width: `${percent}%` }} />
              <i className="pstart__dot" style={{ left: `${percent}%` }} />
            </div>
            <ol>
              {STEPS.map((s, i) => (
                <li
                  key={s.key}
                  className={i === step ? 'is-current' : i < step ? 'is-complete' : ''}
                >
                  <button
                    type="button"
                    disabled={i > step}
                    aria-current={i === step ? 'step' : undefined}
                    onClick={() => i < step && go(i)}
                  >
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="pstart__workspace">
            <aside className="pstart__story" aria-hidden="true">
              <AnimatePresence initial={false}>
                <motion.span
                  key={now.key}
                  className="pstart__visual"
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE_OUT }}
                >
                  {story.screens.map((Screen, k) => (
                    <span key={k} className={`pstart__screen pstart__screen--${k}`}>
                      <ScreenThumb accent={story.accent}>
                        <Screen />
                      </ScreenThumb>
                    </span>
                  ))}
                </motion.span>
              </AnimatePresence>
              <div className="pstart__story-copy">
                <p>{story.eyebrow}</p>
                <h3>{story.title}</h3>
                <span>{story.text}</span>
              </div>
              <ul>
                <li>
                  <strong>1 working day</strong>
                  <span>Typical reply</span>
                </li>
                <li>
                  <strong>No obligation</strong>
                  <span>A fixed price in writing first</span>
                </li>
              </ul>
            </aside>

            <form className="pstart__form" noValidate onSubmit={next}>
              <header>
                <span>
                  Step {step + 1} of {STEPS.length}
                </span>
                <h2 ref={heading} tabIndex={-1}>
                  {now.title}
                </h2>
              </header>

              <div ref={stage} className="pstart__stage" data-lenis-prevent="">
                <motion.div key={now.key} {...slide}>
                  {now.key === 'business' ? (
                    <>
                      <div className="pstart__grid pstart__grid--three">
                        <Labelled label="Industry" htmlFor={`${ids}-industry`} required>
                          <select
                            {...field('industry')}
                            value={fields.industry}
                            onChange={(e) => set('industry', e.target.value)}
                          >
                            <option value="" disabled>
                              Select industry
                            </option>
                            {INDUSTRIES.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                          {error('industry')}
                        </Labelled>
                        <Labelled label="Business name" htmlFor={`${ids}-business`} required>
                          <input
                            {...field('business')}
                            autoComplete="organization"
                            placeholder="Your business"
                            value={fields.business}
                            onChange={(e) => set('business', e.target.value)}
                          />
                          {error('business')}
                        </Labelled>
                        <Labelled label="Team size" htmlFor={`${ids}-team`} required>
                          <select
                            {...field('team')}
                            value={fields.team}
                            onChange={(e) => set('team', e.target.value)}
                          >
                            <option value="" disabled>
                              Select size
                            </option>
                            {TEAMS.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                          {error('team')}
                        </Labelled>
                      </div>
                      <div className="pstart__note">
                        <span>Every business. Every size.</span>
                        <strong>We plan your system around how you already work.</strong>
                        <p>
                          Not sure which industry fits? Choose the closest and tell us more in the
                          project details.
                        </p>
                      </div>
                    </>
                  ) : null}

                  {now.key === 'service' ? (
                    <>
                      {preset && fields.service === preset.value ? (
                        <div className="pstart__chosen">
                          <i aria-hidden="true">
                            <Icon name="check" size={15} strokeWidth={2.6} />
                          </i>
                          <span>Chosen for you</span>
                          <strong>{preset.value}</strong>
                        </div>
                      ) : null}
                      <fieldset
                        data-field="service"
                        aria-describedby={errors.service ? `${ids}-service-error` : undefined}
                      >
                        <legend>Choose what you need first</legend>
                        <div className="pstart__services">
                          {SERVICES.map(({ value, accent, Screen }) => {
                            const on = fields.service === value;
                            return (
                              <label
                                key={value}
                                className={`pstart-svc ${on ? 'is-selected' : ''}`}
                              >
                                <input
                                  type="radio"
                                  name="service"
                                  value={value}
                                  checked={on}
                                  onChange={() => set('service', value)}
                                />
                                <span className="pstart-svc__screen" aria-hidden="true">
                                  <ScreenThumb accent={accent}>
                                    <Screen />
                                  </ScreenThumb>
                                </span>
                                <span className="pstart-svc__name">
                                  <strong>{value}</strong>
                                </span>
                                <i aria-hidden="true">
                                  <Icon name="check" size={13} strokeWidth={2.8} />
                                </i>
                              </label>
                            );
                          })}
                        </div>
                        <label
                          className={`pstart__unsure ${fields.service === UNSURE ? 'is-selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={UNSURE}
                            checked={fields.service === UNSURE}
                            onChange={() => set('service', UNSURE)}
                          />
                          <Icon name="question" size={15} />
                          Not sure yet — help me choose
                        </label>
                        {error('service')}
                      </fieldset>
                    </>
                  ) : null}

                  {now.key === 'project' ? (
                    <div className="pstart__stack">
                      <Labelled
                        label="What should it do, or what’s slowing you down?"
                        htmlFor={`${ids}-need`}
                        required
                      >
                        <textarea
                          {...field('need')}
                          rows={4}
                          placeholder="We miss enquiries on WhatsApp and book appointments by phone."
                          value={fields.need}
                          onChange={(e) => set('need', e.target.value)}
                        />
                        {error('need')}
                      </Labelled>
                      <Pills
                        id={`${ids}-budget`}
                        label="Budget"
                        options={BUDGETS}
                        value={fields.budget}
                        onChange={(value) => set('budget', value)}
                      />
                      <Pills
                        id={`${ids}-when`}
                        label="When do you need it?"
                        options={TIMINGS}
                        value={fields.when}
                        onChange={(value) => set('when', value)}
                      />
                      <Labelled label="Your current website" htmlFor={`${ids}-website`}>
                        <input
                          {...field('website')}
                          type="url"
                          inputMode="url"
                          autoComplete="url"
                          placeholder="yourbusiness.in"
                          value={fields.website}
                          onChange={(e) => set('website', e.target.value)}
                        />
                      </Labelled>
                    </div>
                  ) : null}

                  {now.key === 'contact' ? (
                    <>
                      <div className="pstart__grid">
                        <Labelled label="Full name" htmlFor={`${ids}-name`} required>
                          <input
                            {...field('name')}
                            autoComplete="name"
                            placeholder="Your name"
                            value={fields.name}
                            onChange={(e) => set('name', e.target.value)}
                          />
                          {error('name')}
                        </Labelled>
                        <Labelled label="Phone (WhatsApp)" htmlFor={`${ids}-phone`} required>
                          <input
                            {...field('phone')}
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={fields.phone}
                            onChange={(e) => set('phone', e.target.value)}
                          />
                          {error('phone')}
                        </Labelled>
                        <Labelled label="Email address" htmlFor={`${ids}-email`} required>
                          <input
                            {...field('email')}
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={fields.email}
                            onChange={(e) => set('email', e.target.value)}
                          />
                          {error('email')}
                        </Labelled>
                        <Labelled label="City" htmlFor={`${ids}-city`} required>
                          <input
                            {...field('city')}
                            autoComplete="address-level2"
                            placeholder="Bengaluru"
                            value={fields.city}
                            onChange={(e) => set('city', e.target.value)}
                          />
                          {error('city')}
                        </Labelled>
                      </div>
                      <Labelled
                        label="Anything else we should know?"
                        htmlFor={`${ids}-notes`}
                        className="pstart__notes"
                      >
                        <textarea
                          {...field('notes')}
                          rows={3}
                          placeholder="The tools you use today, a deadline, a site you like."
                          value={fields.notes}
                          onChange={(e) => set('notes', e.target.value)}
                        />
                      </Labelled>
                      <div className="pstart__assurance">
                        <strong>Your details stay private.</strong>
                        <p>We use them only to reply about this project.</p>
                      </div>
                    </>
                  ) : null}

                  {now.key === 'review' ? (
                    <div className="pstart__review">
                      <Review
                        title="Business & service"
                        onEdit={() => go(0)}
                        rows={[
                          ['Business', fields.business],
                          ['Industry', fields.industry],
                          ['Team', fields.team],
                          ['Service', fields.service],
                        ]}
                      />
                      <Review
                        title="Project"
                        onEdit={() => go(2)}
                        rows={[
                          ['Brief', fields.need],
                          ['Budget', fields.budget || 'Not given'],
                          ['When', fields.when || 'Not given'],
                          ['Website', fields.website || 'None'],
                        ]}
                      />
                      <Review
                        title="Contact"
                        onEdit={() => go(3)}
                        rows={[
                          ['Name', fields.name],
                          ['Phone', fields.phone],
                          ['Email', fields.email],
                          ['City', fields.city],
                          ['Notes', fields.notes || 'None added'],
                        ]}
                      />
                      <fieldset className="pstart__consent" data-field="consent">
                        <legend>Your consent</legend>
                        <div
                          className="pstart__consent-row"
                          data-invalid={errors.consent ? true : undefined}
                        >
                          <Checkbox
                            id={`${ids}-consent`}
                            checked={fields.consent}
                            onCheckedChange={(checked) => set('consent', checked)}
                            aria-describedby={errors.consent ? `${ids}-consent-error` : undefined}
                          />
                          <label htmlFor={`${ids}-consent`}>
                            I agree that Pixel Kinetix may use these details to reply about my
                            project, prepare a quote and contact me by phone, WhatsApp or email, as
                            in the{' '}
                            <a href="/privacy" target="_blank" rel="noreferrer">
                              privacy policy
                            </a>
                            .<em> *</em>
                          </label>
                        </div>
                        {error('consent')}
                        <div className="pstart__consent-row">
                          <Checkbox
                            id={`${ids}-marketing`}
                            checked={fields.marketing}
                            onCheckedChange={(checked) => set('marketing', checked)}
                          />
                          <label htmlFor={`${ids}-marketing`}>
                            I’d also like occasional updates and offers from Pixel Kinetix. I can
                            stop them at any time.<small> (optional)</small>
                          </label>
                        </div>
                      </fieldset>
                      <p className="pstart__small">
                        Sending your brief is free: no payment and no commitment.
                      </p>
                      {result === 'failed' ? (
                        <div className="pstart__failed" role="alert">
                          <strong>It didn’t send.</strong>
                          <p>
                            Please try again, or{' '}
                            <a
                              href={whatsappWith(contact.whatsappHref, brief())}
                              target="_blank"
                              rel="noreferrer"
                            >
                              send it on WhatsApp
                            </a>
                            .
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </motion.div>
              </div>

              <footer className="pstart__actions">
                {step > 0 ? (
                  <button type="button" className="pstart__back" onClick={() => go(step - 1)}>
                    Back
                  </button>
                ) : null}
                <button
                  type="submit"
                  className="pstart-btn pstart-btn--accent"
                  aria-busy={sending || undefined}
                  disabled={sending}
                >
                  <Roll>
                    {sending
                      ? 'Sending…'
                      : step < STEPS.length - 1
                        ? 'Continue'
                        : live
                          ? 'Create my project'
                          : 'Send on WhatsApp'}
                  </Roll>
                  <span className="pstart-btn__arrow" aria-hidden="true">
                    {sending ? (
                      <span className="pstart__spinner" />
                    ) : (
                      <Icon name="arrow" size={18} />
                    )}
                  </span>
                </button>
              </footer>
            </form>
          </div>
        </section>
      )}

      <footer className="pstart__footer pstart-wrap">
        <span>© {new Date().getFullYear()} Pixel Kinetix</span>
        <a href={contact.mapsHref} target="_blank" rel="noreferrer">
          Kalyan Nagar, Bengaluru
        </a>
      </footer>
    </motion.div>
  );
}

/** The reference's button: the label rolls up to its twin on hover. */
function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="pstart-btn__text">
      <span className="pstart-btn__label">{children}</span>
      <span className="pstart-btn__label" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

function Labelled({
  label,
  htmlFor,
  required = false,
  className = '',
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`pstart__field ${className}`}>
      <label htmlFor={htmlFor}>
        {label}
        {required ? ' *' : <small> (optional)</small>}
      </label>
      {children}
    </div>
  );
}

/** A short list as pills, one chosen or none. */
function Pills({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="pstart__field">
      <span id={`${id}-label`} className="pstart__label">
        {label}
        <small> (optional)</small>
      </span>
      <div role="radiogroup" aria-labelledby={`${id}-label`} className="pstart__pills">
        {options.map((option) => {
          const on = option === value;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(on ? '' : option)}
              className="pstart__pill"
            >
              {on ? <Icon name="check" size={12} strokeWidth={2.6} /> : null}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Review({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: [string, string][];
  onEdit: () => void;
}) {
  return (
    <section>
      <header>
        <h3>{title}</h3>
        <button type="button" onClick={onEdit}>
          Edit
        </button>
      </header>
      <dl>
        {rows.map(([term, value]) => (
          <div key={term} className={term === 'Brief' || term === 'Notes' ? 'is-wide' : ''}>
            <dt>{term}</dt>
            <dd>{value || '—'}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
