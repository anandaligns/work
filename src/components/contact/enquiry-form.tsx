'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { StatefulButton } from '@/components/motion/button';
import { contact, INTERESTS, interestFor } from '@/content/site';
import {
  BUDGETS,
  type Enquiry,
  type EnquiryErrors,
  THANKS_NAME_KEY,
  TIMINGS,
  validateEnquiry,
} from '@/lib/enquiry';

import { Icon } from '../ui/icon';

/**
 * The contact page's form: "Tell us about it". Eleven fields, five of them optional, and a consent
 * box that is never ticked for you. "Interested in" opens on whatever the visitor's Get Started
 * carried (`?interest=`, a package, service or solution slug mapped to its package); the slug
 * itself, the page, the referrer and any UTM tags travel hidden, so every lead shows where it
 * came from.
 *
 * Errors are said in words under their field — never colour alone — and the first one takes the
 * focus on Send. A honeypot field no person can see catches bots, with no puzzle for people. On
 * success the first name is left in session storage (not the address bar) for the thanks page.
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
  interest: 'Not sure yet',
  budget: '',
  when: '',
  consent: false,
};

const ORDER: (keyof Fields)[] = [
  'name',
  'business',
  'phone',
  'email',
  'does',
  'need',
  'interest',
  'budget',
  'when',
  'consent',
];

export function EnquiryForm() {
  const ids = useId();
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);
  const hidden = useRef({ source: '', page: '', referrer: '', utm: {} as Record<string, string> });

  // Where the visitor came from: the Get Started's `?interest=`, the page and any campaign tags.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('interest');
    if (slug) setFields((f) => ({ ...f, interest: interestFor(slug) }));
    hidden.current = {
      source: slug ?? '',
      page: window.location.pathname + window.location.search,
      referrer: document.referrer,
      utm: Object.fromEntries([...params].filter(([key]) => key.startsWith('utm_'))),
    };
  }, []);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      ...fields,
      ...hidden.current,
      website_url: String(data.get('website_url') ?? ''),
    };
    const found = validateEnquiry(payload);
    setErrors(found);
    const first = ORDER.find((key) => found[key]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSending(true);
    setFailed(false);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.status === 422) {
        const body = (await response.json()) as { errors?: EnquiryErrors };
        setErrors(body.errors ?? {});
        setSending(false);
        return;
      }
      if (!response.ok) throw new Error(String(response.status));
      try {
        sessionStorage.setItem(THANKS_NAME_KEY, fields.name.trim().split(/\s+/)[0] ?? '');
      } catch {
        // Storage may be off; the thanks page then thanks without a name.
      }
      setSent(true);
      setSending(false);
      router.push('/contact/thanks');
    } catch {
      setFailed(true);
      setSending(false);
    }
  };

  const field = (key: keyof Fields) => ({
    id: `${ids}-${key}`,
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${ids}-${key}-error` : undefined,
  });
  const error = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`${ids}-${key}-error`} className="enquiry__error">
        <Icon name="alert" size={14} />
        {errors[key]}
      </p>
    ) : null;

  return (
    <form ref={form} noValidate onSubmit={submit} className="enquiry">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${ids}-name`} required>
          <input
            {...field('name')}
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => set('name', e.target.value)}
          />
          {error('name')}
        </Field>
        <Field label="Business name" htmlFor={`${ids}-business`} required>
          <input
            {...field('business')}
            type="text"
            autoComplete="organization"
            value={fields.business}
            onChange={(e) => set('business', e.target.value)}
          />
          {error('business')}
        </Field>
        <Field label="Phone (WhatsApp)" htmlFor={`${ids}-phone`} required>
          <input
            {...field('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
          {error('phone')}
        </Field>
        <Field label="Email" htmlFor={`${ids}-email`} required>
          <input
            {...field('email')}
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => set('email', e.target.value)}
          />
          {error('email')}
        </Field>
        <Field label="City" htmlFor={`${ids}-city`}>
          <input
            {...field('city')}
            type="text"
            autoComplete="address-level2"
            value={fields.city}
            onChange={(e) => set('city', e.target.value)}
          />
        </Field>
        <Field label="Interested in" htmlFor={`${ids}-interest`}>
          <Select
            {...field('interest')}
            value={fields.interest}
            onChange={(value) => set('interest', value)}
            options={INTERESTS}
          />
          {error('interest')}
        </Field>
        <Field
          label="What does your business do?"
          htmlFor={`${ids}-does`}
          required
          className="sm:col-span-2"
        >
          <textarea
            {...field('does')}
            rows={2}
            placeholder="We run two dental clinics in Bangalore."
            value={fields.does}
            onChange={(e) => set('does', e.target.value)}
          />
          {error('does')}
        </Field>
        <Field
          label="What’s slowing it down, or what do you want to build?"
          htmlFor={`${ids}-need`}
          required
          className="sm:col-span-2"
        >
          <textarea
            {...field('need')}
            rows={4}
            placeholder="We miss enquiries on WhatsApp and book appointments by phone."
            value={fields.need}
            onChange={(e) => set('need', e.target.value)}
          />
          {error('need')}
        </Field>
        <Field label="Budget" htmlFor={`${ids}-budget`}>
          <Select
            {...field('budget')}
            value={fields.budget}
            onChange={(value) => set('budget', value)}
            options={BUDGETS}
            placeholder="Choose one"
          />
          {error('budget')}
        </Field>
        <Field label="When do you need it?" htmlFor={`${ids}-when`}>
          <Select
            {...field('when')}
            value={fields.when}
            onChange={(value) => set('when', value)}
            options={TIMINGS}
            placeholder="Choose one"
          />
          {error('when')}
        </Field>
      </div>

      {/* The honeypot: out of sight and out of the tab order, so only a bot fills it in. */}
      <div aria-hidden="true" className="enquiry__trap">
        <label htmlFor={`${ids}-website`}>Leave this empty</label>
        <input
          id={`${ids}-website`}
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-6">
        <label htmlFor={`${ids}-consent`} className="enquiry__consent">
          <input
            {...field('consent')}
            type="checkbox"
            checked={fields.consent}
            onChange={(e) => set('consent', e.target.checked)}
          />
          <span>
            I agree to Pixel Kinetix contacting me by phone, email and WhatsApp about my enquiry, as
            described in the{' '}
            <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
              privacy policy
            </a>
            .
          </span>
        </label>
        {error('consent')}
      </div>

      {failed ? (
        <p role="alert" className="enquiry__error mt-6">
          <Icon name="alert" size={14} />
          Your message didn’t send. Please try again, or message us on WhatsApp.
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        {/* beUI's stateful button (`@beui/button`): its label rolls from Send to Sending to Sent, or
            to Try again, on the brand's lit Kinetic Blue. */}
        <StatefulButton
          type="submit"
          state={sending ? 'loading' : sent ? 'success' : failed ? 'error' : 'idle'}
          disabled={sent}
          loadingText="Sending"
          successText="Sent"
          errorText="Try again"
          icon={<Icon name="arrow" size={16} strokeWidth={1.8} />}
          className="h-11 gap-2 rounded-[10px] bg-[image:var(--surface-kinetic)] px-5 text-[0.9375rem] text-white shadow-[#0449ab_0_0_0_1px,rgb(4_40_100/0.4)_0_1px_2px_0,rgb(255_255_255/0.2)_0_0.5px_0_1px_inset] disabled:opacity-100"
        >
          Send
        </StatefulButton>
        <p className="text-sm text-ink-2">
          Prefer WhatsApp?{' '}
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ink underline underline-offset-2"
          >
            Message us
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
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
    <div className={`enquiry__field ${className}`}>
      <label htmlFor={htmlFor}>
        {label}
        {required ? null : <span className="font-normal text-ink-2"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
  ...rest
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  id: string;
  name: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}) {
  return (
    <span className="enquiry__select">
      <select {...rest} value={value} onChange={(e) => onChange(e.target.value)}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Icon name="chevron" size={16} />
    </span>
  );
}
