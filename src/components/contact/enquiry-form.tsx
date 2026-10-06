'use client';

import { useRouter } from 'next/navigation';
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  Alert,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
} from '@/components/motion/alert';
import { StatefulButton } from '@/components/motion/button';
import { Checkbox } from '@/components/motion/checkbox';
import { Input } from '@/components/motion/input';
import {
  Select as BeSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/motion/select';
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
  // Fields the visitor has left; a left field that now reads right shows beUI's drawn tick.
  const [left, setLeft] = useState<Partial<Record<keyof Fields, boolean>>>({});
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
      (
        form.current?.querySelector<HTMLElement>(`[name="${first}"]`) ??
        form.current?.querySelector<HTMLElement>(`[data-field="${first}"] button`) ??
        document.getElementById(`${ids}-${first}`)
      )?.focus();
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
  // beUI's input (`@beui/input`): an error shakes the field and reddens its edge (the words stay
  // ours, under it); a field filled in right, once left, draws its tick.
  const state = (key: keyof Fields) => ({
    error: Boolean(errors[key]),
    success: Boolean(left[key]) && fields[key] !== EMPTY[key] && !validateEnquiry(fields)[key],
    onBlur: () => setLeft((l) => ({ ...l, [key]: true })),
    classNames: INPUT_CLASSES,
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
        {/* beUI's checkbox (`@beui/checkbox`): its tick draws itself in. The words are its label. */}
        <div className="enquiry__consent" data-invalid={errors.consent ? true : undefined}>
          <Checkbox
            id={`${ids}-consent`}
            checked={fields.consent}
            onCheckedChange={(checked) => set('consent', checked)}
            aria-describedby={errors.consent ? `${ids}-consent-error` : undefined}
            className="mt-0.5"
          />
          <label htmlFor={`${ids}-consent`}>
            I agree to Pixel Kinetix contacting me by phone, email and WhatsApp about my enquiry, as
            described in the{' '}
            <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
              privacy policy
            </a>
            .
          </label>
        </div>
        {error('consent')}
      </div>

      {/* beUI's alert (`@beui/alert`), announced at once, springing in and out. */}
      <Alert
        variant="destructive"
        open={failed}
        onOpenChange={setFailed}
        className="mt-6 rounded-[0.875rem] border border-[#b42318]/25"
      >
        <AlertIcon />
        <AlertContent>
          <AlertDescription>
            Your message didn’t send. Please try again, or message us on WhatsApp.
          </AlertDescription>
        </AlertContent>
        <AlertClose aria-label="Dismiss" />
      </Alert>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        {/* beUI's stateful button (`@beui/button`): its label rolls from Send to Sending to Sent, or
            to Try again, in the site's graphite. */}
        <StatefulButton
          type="submit"
          state={sending ? 'loading' : sent ? 'success' : failed ? 'error' : 'idle'}
          disabled={sent}
          loadingText="Sending"
          successText="Sent"
          errorText="Try again"
          icon={<Icon name="arrow" size={16} strokeWidth={1.8} />}
          className="h-11 gap-2 rounded-[10px] bg-[image:linear-gradient(rgb(40_40_40)_0%,rgb(23_23_22)_67%)] px-5 text-[0.9375rem] text-white shadow-[rgb(36_38_40)_0_0_0_1px,rgb(27_28_29/0.48)_0_1px_2px_0,rgb(255_255_255/0.12)_0_0.5px_0_1px_inset] disabled:opacity-100"
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

/** The site's field on beUI's input: 48px, 14px corners, the ink focus ring of the selects. */
const INPUT_CLASSES = {
  root: 'gap-0',
  field:
    'h-12 rounded-[0.875rem] border-line-2 bg-white hover:border-ink-3 data-[state=focused]:border-ink data-[state=focused]:ring-[3px] data-[state=focused]:ring-ink/10 data-[state=error]:border-[#b42318] data-[state=error]:ring-[#b42318]/15',
  input: 'enquiry__be-input px-4 text-ink placeholder:text-ink-3',
  successIcon: 'text-signal-green',
};

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
      <label id={`${htmlFor}-label`} htmlFor={htmlFor}>
        {label}
        {required ? null : <span className="font-normal text-ink-2"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

/**
 * A choice from a short list, on beUI's select (`@beui/select`): the panel unfolds out of the field
 * and the options rise in. beUI names its own trigger, so the field's label is tied to it here, and
 * so are an error and its invalid state.
 */
function Select({
  value,
  onChange,
  options,
  placeholder,
  id,
  name,
  ...aria
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
  const wrap = useRef<HTMLDivElement>(null);
  const invalid = aria['aria-invalid'];
  const describedBy = aria['aria-describedby'];
  useLayoutEffect(() => {
    const trigger = wrap.current?.querySelector('button[aria-haspopup="listbox"]');
    if (!trigger) return;
    trigger.setAttribute('aria-labelledby', `${id}-label ${trigger.id}`);
    if (invalid) trigger.setAttribute('aria-invalid', 'true');
    else trigger.removeAttribute('aria-invalid');
    if (describedBy) trigger.setAttribute('aria-describedby', describedBy);
    else trigger.removeAttribute('aria-describedby');
  }, [id, invalid, describedBy]);
  return (
    <div ref={wrap} data-field={name}>
      <BeSelect value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 border-line-2 bg-white px-4 text-base text-ink hover:border-ink-3 focus-visible:border-ink focus-visible:ring-[3px] focus-visible:ring-ink/10 aria-[invalid]:border-[#b42318]">
          <SelectValue placeholder={placeholder ?? 'Choose one'} />
        </SelectTrigger>
        <SelectContent className="border-line-2 bg-white">
          {options.map((option) => (
            <SelectItem key={option} value={option} className="py-2 text-[0.9375rem]">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </BeSelect>
    </div>
  );
}
