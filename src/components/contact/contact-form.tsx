'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { type FormEvent, useId, useRef, useState } from 'react';

import { StatefulButton } from '@/components/motion/button';
import { Input } from '@/components/motion/input';
import { contact, startFor } from '@/content/site';
import { type ContactErrors, type ContactMessage, TOPICS, validateContact } from '@/lib/enquiry';
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
import { Icon } from '../ui/icon';

/**
 * The contact page's form — for anything: a question, a project, help with a site you already have.
 * Name, email, an optional phone, what it's about as a row of pills, the message and the consent box,
 * on beUI's input, checkbox and stateful button. A project is better told through Start a project,
 * so choosing "A new project" offers it. Sent, the card turns into the thanks.
 *
 * While the form has nowhere to send (`live` off), Send opens WhatsApp with the message written.
 */
type Fields = Omit<ContactMessage, 'page' | 'referrer' | 'utm'>;

const EMPTY: Fields = {
  name: '',
  email: '',
  phone: '+91 ',
  topic: 'A question',
  message: '',
  consent: false,
};

const ORDER: (keyof Fields)[] = ['name', 'email', 'phone', 'message', 'consent'];

export function ContactForm({ live }: { live: boolean }) {
  const ids = useId();
  const reduce = useReducedMotion();
  const form = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [left, setLeft] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [done, setDone] = useState(false);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const message = () =>
    [
      `Hi Pixel Kinetix — ${fields.topic.toLowerCase()}.`,
      fields.message.trim(),
      '',
      `${fields.name} · ${fields.email}${fields.phone.trim() !== '+91' ? ` · ${fields.phone}` : ''}`,
    ].join('\n');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContact(fields);
    setErrors(found);
    const first = ORDER.find((key) => found[key]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (!live) {
      window.open(whatsappWith(contact.whatsappHref, message()), '_blank', 'noopener');
      setDone(true);
      return;
    }
    setSent('loading');
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          kind: 'contact',
          ...fields,
          ...origin(),
          website_url: String(data.get('website_url') ?? ''),
        }),
      });
      if (response.status === 422) {
        setErrors(((await response.json()) as { errors?: ContactErrors }).errors ?? {});
        setSent('idle');
        return;
      }
      if (!response.ok) throw new Error(String(response.status));
      setSent('success');
      window.setTimeout(() => setDone(true), 450);
    } catch {
      setSent('error');
    }
  };

  const field = (key: keyof Fields) => ({
    id: `${ids}-${key}`,
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${ids}-${key}-error` : undefined,
  });
  const state = (key: keyof Fields) => ({
    error: Boolean(errors[key]),
    success: Boolean(left[key]) && fields[key] !== EMPTY[key] && !validateContact(fields)[key],
    onBlur: () => setLeft((l) => ({ ...l, [key]: true })),
    classNames: INPUT_CLASSES,
  });

  const first = fields.name.trim().split(/\s+/)[0] ?? '';

  return (
    <AnimatePresence mode="wait" initial={false}>
      {done ? (
        <motion.div
          key="done"
          role="status"
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: EASE_OUT }}
          className="flex flex-col items-start py-6"
        >
          <span className="start__tick grid size-12 place-items-center rounded-full">
            <Icon name="check" size={22} strokeWidth={2.4} />
          </span>
          <p className="mt-6 font-display text-h3 tracking-[var(--tracking-heading)] text-ink">
            {live
              ? `Thank you${first ? `, ${first}` : ''}. We’ve got your message.`
              : 'Your message is ready on WhatsApp.'}
          </p>
          <p className="mt-3 max-w-md text-body text-ink-2">
            {live
              ? 'We reply within one working day, by email or on WhatsApp if you left a number.'
              : 'Press send in WhatsApp and it reaches us. We reply within one working day.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setFields(EMPTY);
              setLeft({});
              setSent('idle');
              setDone(false);
            }}
            className="start__secondary mt-8"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={form}
          noValidate
          onSubmit={submit}
          exit={{ opacity: 0, y: reduce ? 0 : -8 }}
          transition={{ duration: 0.2 }}
          className="enquiry"
        >
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
              <FieldError id={`${ids}-name-error`}>{errors.name}</FieldError>
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
              <FieldError id={`${ids}-email-error`}>{errors.email}</FieldError>
            </Field>
            <Field label="Phone (WhatsApp)" htmlFor={`${ids}-phone`} className="sm:col-span-2">
              <Input
                {...field('phone')}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={(value) => set('phone', value)}
                {...state('phone')}
              />
              <FieldError id={`${ids}-phone-error`}>{errors.phone}</FieldError>
            </Field>
            <div className="enquiry__field sm:col-span-2">
              <span id={`${ids}-topic-label`} className="text-sm font-semibold text-ink">
                What’s it about?
              </span>
              <Choices
                name="topic"
                options={TOPICS}
                value={fields.topic}
                onChange={(value) => set('topic', value || 'A question')}
                labelledBy={`${ids}-topic-label`}
              />
              <AnimatePresence initial={false}>
                {fields.topic === 'A new project' ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: reduce ? 0 : 0.25, ease: EASE_OUT }}
                    className="overflow-hidden text-sm text-ink-2"
                  >
                    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-fill px-3.5 py-2.5">
                      <Icon name="spark" size={14} className="text-kinetic" />
                      Four short steps tell us more, and get a fuller reply.
                      <Link
                        href={startFor('contact')}
                        className="font-semibold text-ink underline underline-offset-2"
                      >
                        Start a project
                      </Link>
                    </span>
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
            <Field label="Message" htmlFor={`${ids}-message`} required className="sm:col-span-2">
              <textarea
                {...field('message')}
                rows={5}
                placeholder="How can we help?"
                value={fields.message}
                onChange={(e) => set('message', e.target.value)}
              />
              <FieldError id={`${ids}-message-error`}>{errors.message}</FieldError>
            </Field>
          </div>

          <Honeypot id={`${ids}-website`} />

          <div className="mt-6">
            <Consent
              id={`${ids}-consent`}
              checked={fields.consent}
              onChange={(checked) => set('consent', checked)}
              error={errors.consent}
            >
              I agree to Pixel Kinetix replying to me by email, phone or WhatsApp, as described in
              the{' '}
              <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
                privacy policy
              </a>
              .
            </Consent>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <StatefulButton
              type="submit"
              state={sent}
              disabled={sent === 'success'}
              loadingText="Sending"
              successText="Sent"
              errorText="Try again"
              icon={<Icon name={live ? 'arrow' : 'whatsapp'} size={16} strokeWidth={1.8} />}
              className="start__primary disabled:opacity-100"
            >
              {live ? 'Send message' : 'Send on WhatsApp'}
            </StatefulButton>
            <p className="text-sm text-ink-2">We reply within one working day.</p>
          </div>
          {sent === 'error' ? (
            <p role="alert" className="enquiry__error mt-4">
              <Icon name="alert" size={14} />
              Your message didn’t send. Please try again, or message us on WhatsApp.
            </p>
          ) : null}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
