'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { StatefulButton } from '@/components/motion/button';
import { Input } from '@/components/motion/input';
import { contact, type Interest, interestFor } from '@/content/site';
import { BUDGETS, type Enquiry, type EnquiryErrors, TIMINGS, validateEnquiry } from '@/lib/enquiry';
import { EASE_OUT } from '@/lib/ease';

import {
  Choices,
  Consent,
  Field,
  FieldError,
  Honeypot,
  INPUT_CLASSES,
  origin,
  whatsappWith,
} from '../forms/fields';
import { BrandLockup } from '../ui/brand';
import { Icon, type IconName } from '../ui/icon';

/**
 * Start a project — every Get Started on the site opens it. A full-screen assessment in four steps,
 * one question at a time: what to build, the business, the project's scope and timing, and how to
 * reach you. On a wide screen a dark panel on the left keeps the steps and the answers so far; on a
 * phone the steps become a bar along the top. Back and Continue sit at the foot; Enter continues.
 *
 * Opened from a page it is a modal over that page (`app/@modal/(.)start`) and closing it goes back
 * there; opened at its own address it is the page itself (`app/start`), and closing goes home. Each
 * step is checked before the next, with the same rules the server uses (`lib/enquiry.ts`).
 *
 * While the form has nowhere to send (`live` off — no `LEAD_WEBHOOK_URL`), the last step sends the
 * whole brief as a WhatsApp message instead, already written.
 */
type Fields = Omit<Enquiry, 'source' | 'page' | 'referrer' | 'utm'>;

const EMPTY: Fields = {
  name: '',
  business: '',
  phone: '+91 ',
  email: '',
  city: '',
  does: '',
  need: '',
  interest: '',
  budget: '',
  when: '',
  consent: false,
};

const STEPS: { title: string; label: string; keys: (keyof Fields)[] }[] = [
  { title: 'What would you like to build?', label: 'Your project', keys: ['interest'] },
  { title: 'Tell us about your business', label: 'Your business', keys: ['business', 'does'] },
  { title: 'What should it do, and when?', label: 'Scope and timing', keys: ['need'] },
  {
    title: 'How do we reach you?',
    label: 'Your details',
    keys: ['name', 'phone', 'email', 'consent'],
  },
];

const OPTIONS: { value: Interest; icon: IconName; title: string; line: string }[] = [
  {
    value: 'Website',
    icon: 'globe',
    title: 'A website',
    line: 'Fast, search-ready, built around your customers.',
  },
  {
    value: 'Connected Website',
    icon: 'chat',
    title: 'A website that replies',
    line: 'Every enquiry answered on WhatsApp and email.',
  },
  {
    value: 'Store',
    icon: 'cart',
    title: 'An online store',
    line: 'Products, payments, orders and bookings.',
  },
  {
    value: 'Custom system',
    icon: 'layers',
    title: 'A custom system',
    line: 'Portals, apps, dashboards, CRM and automation.',
  },
  {
    value: 'System Blueprint',
    icon: 'clipboard',
    title: 'Plan it first',
    line: 'A map of the system and a fixed quote.',
  },
  {
    value: 'Evolve',
    icon: 'shield',
    title: 'Care for my site',
    line: 'Hosting, backups, security and monthly changes.',
  },
];

const PROMISES: { icon: IconName; text: string }[] = [
  { icon: 'rupee', text: 'A fixed price in writing before we build' },
  { icon: 'clock', text: 'A reply within one working day' },
  { icon: 'check', text: 'No obligation, and honest advice' },
];

type Sent = 'idle' | 'loading' | 'success' | 'error';

export function ProjectFlow({
  interest,
  live,
  modal = false,
  onClose,
}: {
  /** The slug a Get Started carried (`?interest=`). */
  interest?: string;
  /** Can the form send (`enquiryLive`)? If not, the brief goes by WhatsApp. */
  live: boolean;
  modal?: boolean;
  onClose: () => void;
}) {
  const ids = useId();
  const reduce = useReducedMotion();
  const preset = interestFor(interest);
  const [fields, setFields] = useState<Fields>({
    ...EMPTY,
    interest: interest && preset !== 'Not sure yet' ? preset : '',
  });
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [left, setLeft] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState<Sent>('idle');
  const [done, setDone] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const honey = useRef<HTMLDivElement>(null);

  // The page beneath holds still, smooth scrolling and all, while the flow is open.
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    const root = document.documentElement;
    const previous = [document.body.style.overflow, root.style.overflow];
    document.body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';
    lenis?.stop();
    return () => {
      document.body.style.overflow = previous[0] ?? '';
      root.style.overflow = previous[1] ?? '';
      lenis?.start();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Each step opens on its first field.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      body.current
        ?.querySelector<HTMLElement>(
          'input:not([tabindex="-1"]), textarea, [role="radio"][aria-checked="true"], [role="radio"]',
        )
        ?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [step, done]);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const stepErrors = useCallback(
    (at: number) => {
      const found = validateEnquiry({ ...fields, interest: fields.interest || 'Not sure yet' });
      const mine: EnquiryErrors = {};
      for (const key of STEPS[at]!.keys) if (found[key]) mine[key] = found[key];
      if (at === 0 && !fields.interest) mine.interest = 'Please choose one, or Not sure yet.';
      return mine;
    },
    [fields],
  );

  const go = (to: number) => {
    setDirection(to > step ? 1 : -1);
    setStep(to);
    body.current?.scrollTo({ top: 0 });
  };

  const brief = () =>
    [
      'Hi Pixel Kinetix, I’d like to start a project.',
      `• Looking for: ${fields.interest || 'Not sure yet'}`,
      `• Business: ${fields.business}${fields.city ? `, ${fields.city}` : ''}`,
      `• What we do: ${fields.does}`,
      `• The project: ${fields.need}`,
      fields.budget ? `• Budget: ${fields.budget}` : '',
      fields.when ? `• When: ${fields.when}` : '',
      `• ${fields.name} · ${fields.phone} · ${fields.email}`,
    ]
      .filter(Boolean)
      .join('\n');

  const send = async () => {
    if (!live) {
      window.open(whatsappWith(contact.whatsappHref, brief()), '_blank', 'noopener');
      setDone(true);
      return;
    }
    setSent('loading');
    const trap = honey.current?.querySelector<HTMLInputElement>('input')?.value ?? '';
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          kind: 'project',
          ...fields,
          interest: fields.interest || 'Not sure yet',
          source: interest ?? '',
          ...origin(),
          website_url: trap,
        }),
      });
      if (response.status === 422) {
        const found = ((await response.json()) as { errors?: EnquiryErrors }).errors ?? {};
        setErrors(found);
        const at = STEPS.findIndex((s) => s.keys.some((key) => found[key]));
        setSent('idle');
        if (at >= 0) go(at);
        return;
      }
      if (!response.ok) throw new Error(String(response.status));
      setSent('success');
      window.setTimeout(() => setDone(true), 500);
    } catch {
      setSent('error');
    }
  };

  const next = (event?: FormEvent) => {
    event?.preventDefault();
    const found = stepErrors(step);
    setErrors((e) => ({ ...e, ...found }));
    if (Object.keys(found).length) {
      const first = STEPS[step]!.keys.find((key) => found[key]);
      body.current
        ?.querySelector<HTMLElement>(`[name="${first}"], [data-field="${first}"] [role="radio"]`)
        ?.focus();
      return;
    }
    if (step < STEPS.length - 1) go(step + 1);
    else void send();
  };

  const field = (key: keyof Fields) => ({
    id: `${ids}-${key}`,
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${ids}-${key}-error` : undefined,
  });
  const state = (key: keyof Fields) => ({
    error: Boolean(errors[key]),
    success: Boolean(left[key]) && fields[key] !== EMPTY[key] && !validateEnquiry(fields)[key],
    onBlur: () => setLeft((l) => ({ ...l, [key]: true })),
    classNames: INPUT_CLASSES,
  });
  const error = (key: keyof Fields) => (
    <FieldError id={`${ids}-${key}-error`}>{errors[key]}</FieldError>
  );

  const first = fields.name.trim().split(/\s+/)[0] ?? '';
  const progress = done ? 1 : (step + 1) / STEPS.length;
  const slide = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 28 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -28 }),
  };

  const answers: [string, string][] = [
    ['Project', fields.interest],
    ['Business', [fields.business, fields.city].filter(Boolean).join(', ')],
    ['Budget', fields.budget],
    ['When', fields.when],
  ].filter((pair): pair is [string, string] => Boolean(pair[1]));

  return (
    <motion.div
      role={modal ? 'dialog' : undefined}
      aria-modal={modal ? true : undefined}
      aria-labelledby={`${ids}-title`}
      data-lenis-prevent=""
      initial={{ opacity: 0, scale: reduce ? 1 : 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduce ? 0 : 0.35, ease: EASE_OUT }}
      className="start fixed inset-0 z-[90] flex bg-paper"
    >
      {/* The steps, and the answers so far: on the left from 1024px. */}
      <aside className="start__aside hidden w-[22rem] shrink-0 flex-col justify-between p-10 text-white lg:flex xl:w-[26rem]">
        <div>
          <button type="button" onClick={onClose} aria-label="Close" className="inline-block">
            <BrandLockup className="h-7 w-auto" ink="#ffffff" />
          </button>
          <p className="mt-14 font-mono text-[11px] tracking-[0.16em] text-white/50 uppercase">
            Start a project
          </p>
          <p className="mt-3 font-display text-[1.75rem] leading-tight font-medium tracking-[-0.02em]">
            Four short steps.
            <br />A clear next step back.
          </p>
          <ol className="mt-10 flex flex-col gap-1">
            {STEPS.map((s, i) => {
              const now = !done && i === step;
              const past = done || i < step;
              return (
                <li key={s.label}>
                  <button
                    type="button"
                    disabled={!past || done}
                    onClick={() => go(i)}
                    className={`start__step ${now ? 'start__step--now' : past ? 'start__step--done' : ''}`}
                  >
                    <span className="start__dot">
                      {past ? <Icon name="check" size={13} strokeWidth={2.6} /> : i + 1}
                    </span>
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ol>
          {answers.length ? (
            <dl className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm">
              {answers.map(([term, value]) => (
                <div key={term} className="flex justify-between gap-4">
                  <dt className="text-white/50">{term}</dt>
                  <dd className="truncate text-right text-white">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <ul className="flex flex-col gap-3 text-sm text-white/70">
          {PROMISES.map((promise) => (
            <li key={promise.text} className="flex items-center gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                <Icon name={promise.icon} size={13} />
              </span>
              {promise.text}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* The top: where you are, how far along, and the way out. */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line px-5 sm:h-20 sm:px-10">
          <button type="button" onClick={onClose} aria-label="Close" className="lg:hidden">
            <BrandLockup className="h-6 w-auto" ink="var(--color-ink)" />
          </button>
          <p className="hidden font-mono text-[11px] tracking-[0.16em] text-ink-2 uppercase lg:block">
            {done ? 'Sent' : `Step ${step + 1} of ${STEPS.length} · ${STEPS[step]!.label}`}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.16em] text-ink-2 uppercase lg:hidden">
              {done ? 'Sent' : `${step + 1} / ${STEPS.length}`}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        </header>
        <div className="h-[3px] shrink-0 bg-line">
          <motion.div
            className="h-full bg-kinetic"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE_OUT }}
          />
        </div>

        <div ref={body} data-lenis-prevent="" className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[44rem] px-5 py-10 sm:px-10 sm:py-14">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE_OUT }}
                >
                  <span className="start__tick grid size-14 place-items-center rounded-full">
                    <Icon name="check" size={26} strokeWidth={2.4} />
                  </span>
                  <h2
                    id={`${ids}-title`}
                    className="mt-6 text-h2 tracking-[var(--tracking-heading)] text-ink"
                  >
                    {live
                      ? `Thank you${first ? `, ${first}` : ''}. Your project is with us.`
                      : 'Your brief is ready on WhatsApp.'}
                  </h2>
                  <p className="mt-4 max-w-lg text-body text-ink-2">
                    {live
                      ? 'We’ll read it properly and reply within one working day with a clear next step — and tell you honestly if we’re the right fit.'
                      : 'Press send in WhatsApp and it reaches us with everything you told us. We reply within one working day.'}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <button type="button" onClick={onClose} className="start__primary">
                      Back to the site
                    </button>
                    {live ? null : (
                      <a
                        href={whatsappWith(contact.whatsappHref, brief())}
                        target="_blank"
                        rel="noreferrer"
                        className="start__secondary"
                      >
                        Open WhatsApp again
                      </a>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key={step}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
                  noValidate
                  onSubmit={next}
                >
                  <p className="font-mono text-[11px] tracking-[0.16em] text-ink-2 uppercase">
                    {String(step + 1).padStart(2, '0')} · {STEPS[step]!.label}
                  </p>
                  <h2
                    id={`${ids}-title`}
                    className="mt-3 text-h2 tracking-[var(--tracking-heading)] text-ink"
                  >
                    {STEPS[step]!.title}
                  </h2>

                  <div className="mt-9">
                    {step === 0 ? (
                      <div data-field="interest">
                        <div
                          role="radiogroup"
                          aria-labelledby={`${ids}-title`}
                          aria-describedby={errors.interest ? `${ids}-interest-error` : undefined}
                          className="grid gap-3 sm:grid-cols-2"
                        >
                          {OPTIONS.map((option) => {
                            const on = fields.interest === option.value;
                            return (
                              <button
                                key={option.value}
                                type="button"
                                role="radio"
                                aria-checked={on}
                                onClick={() => set('interest', option.value)}
                                onDoubleClick={() => {
                                  set('interest', option.value);
                                  go(1);
                                }}
                                className="start__option"
                              >
                                <span className="start__option-mark">
                                  <Icon name={option.icon} size={18} />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block font-semibold text-ink">
                                    {option.title}
                                  </span>
                                  <span className="mt-0.5 block text-sm leading-snug text-ink-2">
                                    {option.line}
                                  </span>
                                </span>
                                <span className="start__option-check" aria-hidden="true">
                                  {on ? <Icon name="check" size={12} strokeWidth={2.8} /> : null}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          role="radio"
                          aria-checked={fields.interest === 'Not sure yet'}
                          onClick={() => set('interest', 'Not sure yet')}
                          className={`start__unsure ${fields.interest === 'Not sure yet' ? 'start__unsure--on' : ''}`}
                        >
                          <Icon name="question" size={15} />
                          Not sure yet — help me choose
                        </button>
                        {error('interest')}
                      </div>
                    ) : null}

                    {step === 1 ? (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Business name" htmlFor={`${ids}-business`} required>
                          <Input
                            {...field('business')}
                            type="text"
                            autoComplete="organization"
                            value={fields.business}
                            onChange={(value) => set('business', value)}
                            {...state('business')}
                          />
                          {error('business')}
                        </Field>
                        <Field label="City" htmlFor={`${ids}-city`}>
                          <Input
                            {...field('city')}
                            type="text"
                            autoComplete="address-level2"
                            value={fields.city}
                            onChange={(value) => set('city', value)}
                            {...state('city')}
                          />
                        </Field>
                        <Field
                          label="What does your business do?"
                          htmlFor={`${ids}-does`}
                          required
                          className="sm:col-span-2"
                        >
                          <textarea
                            {...field('does')}
                            rows={3}
                            placeholder="We run two dental clinics in Bangalore."
                            value={fields.does}
                            onChange={(e) => set('does', e.target.value)}
                          />
                          {error('does')}
                        </Field>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="flex flex-col gap-7">
                        <Field
                          label="What do you want to build, or what’s slowing you down?"
                          htmlFor={`${ids}-need`}
                          required
                        >
                          <textarea
                            {...field('need')}
                            rows={5}
                            placeholder="We miss enquiries on WhatsApp and book appointments by phone."
                            value={fields.need}
                            onChange={(e) => set('need', e.target.value)}
                          />
                          {error('need')}
                        </Field>
                        <div className="enquiry__field">
                          <span
                            id={`${ids}-budget-label`}
                            className="text-sm font-semibold text-ink"
                          >
                            Budget <span className="font-normal text-ink-2">(optional)</span>
                          </span>
                          <Choices
                            name="budget"
                            options={BUDGETS}
                            value={fields.budget}
                            onChange={(value) => set('budget', value)}
                            labelledBy={`${ids}-budget-label`}
                          />
                        </div>
                        <div className="enquiry__field">
                          <span id={`${ids}-when-label`} className="text-sm font-semibold text-ink">
                            When do you need it?{' '}
                            <span className="font-normal text-ink-2">(optional)</span>
                          </span>
                          <Choices
                            name="when"
                            options={TIMINGS}
                            value={fields.when}
                            onChange={(value) => set('when', value)}
                            labelledBy={`${ids}-when-label`}
                          />
                        </div>
                      </div>
                    ) : null}

                    {step === 3 ? (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Your name"
                          htmlFor={`${ids}-name`}
                          required
                          className="sm:col-span-2"
                        >
                          <Input
                            {...field('name')}
                            type="text"
                            autoComplete="name"
                            value={fields.name}
                            onChange={(value) => set('name', value)}
                            {...state('name')}
                          />
                          {error('name')}
                        </Field>
                        <Field label="Phone (WhatsApp)" htmlFor={`${ids}-phone`} required>
                          <Input
                            {...field('phone')}
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={fields.phone}
                            onChange={(value) => set('phone', value)}
                            {...state('phone')}
                          />
                          {error('phone')}
                        </Field>
                        <Field label="Email" htmlFor={`${ids}-email`} required>
                          <Input
                            {...field('email')}
                            type="email"
                            autoComplete="email"
                            value={fields.email}
                            onChange={(value) => set('email', value)}
                            {...state('email')}
                          />
                          {error('email')}
                        </Field>
                        <div className="sm:col-span-2">
                          <Consent
                            id={`${ids}-consent`}
                            checked={fields.consent}
                            onChange={(checked) => set('consent', checked)}
                            error={errors.consent}
                          >
                            I agree to Pixel Kinetix contacting me by phone, email and WhatsApp
                            about my project, as described in the{' '}
                            <a
                              href="/privacy"
                              className="underline underline-offset-2 hover:text-ink"
                            >
                              privacy policy
                            </a>
                            .
                          </Consent>
                        </div>
                        <div ref={honey}>
                          <Honeypot id={`${ids}-website`} />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <Foot>
                    {step > 0 ? (
                      <button type="button" onClick={() => go(step - 1)} className="start__back">
                        <Icon name="arrow" size={15} className="rotate-180" />
                        Back
                      </button>
                    ) : (
                      <span />
                    )}
                    {step < STEPS.length - 1 ? (
                      <button type="submit" className="start__primary">
                        Continue
                        <Icon name="arrow" size={15} />
                      </button>
                    ) : (
                      <StatefulButton
                        type="submit"
                        state={sent}
                        disabled={sent === 'success'}
                        loadingText="Sending"
                        successText="Sent"
                        errorText="Try again"
                        icon={
                          <Icon name={live ? 'arrow' : 'whatsapp'} size={16} strokeWidth={1.8} />
                        }
                        className="start__primary disabled:opacity-100"
                      >
                        {live ? 'Send my project' : 'Send on WhatsApp'}
                      </StatefulButton>
                    )}
                  </Foot>
                  {sent === 'error' ? (
                    <p role="alert" className="enquiry__error mt-4">
                      <Icon name="alert" size={14} />
                      It didn’t send. Please try again, or{' '}
                      <a
                        href={whatsappWith(contact.whatsappHref, brief())}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-2"
                      >
                        send it on WhatsApp
                      </a>
                      .
                    </p>
                  ) : null}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Foot({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-10 flex items-center justify-between gap-4 border-t border-line bg-paper/90 px-5 pt-4 pb-5 backdrop-blur-md sm:static sm:mx-0 sm:mt-12 sm:bg-transparent sm:px-0 sm:pt-6 sm:pb-0 sm:backdrop-blur-none">
      {children}
    </div>
  );
}
