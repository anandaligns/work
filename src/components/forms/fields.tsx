'use client';

import type { ReactNode } from 'react';

import { Checkbox } from '@/components/motion/checkbox';

import { Icon } from '../ui/icon';

/**
 * The fields the contact form and the Start a project flow share, on beUI's components: its input
 * (`@beui/input` — an error shakes the field and reddens its edge, a field filled in right draws
 * its tick), its select and its checkbox, in the site's look. Errors are said in words under their
 * field, never colour alone.
 */

/** The site's field on beUI's input: 48px, 14px corners, an ink focus ring. */
export const INPUT_CLASSES = {
  root: 'gap-0',
  field:
    'h-12 rounded-[0.875rem] border-line-2 bg-white hover:border-ink-3 data-[state=focused]:border-ink data-[state=focused]:ring-[3px] data-[state=focused]:ring-ink/10 data-[state=error]:border-[#b42318] data-[state=error]:ring-[#b42318]/15',
  input: 'enquiry__be-input px-4 text-ink placeholder:text-ink-3',
  successIcon: 'text-signal-green',
};

export function Field({
  label,
  htmlFor,
  required = false,
  hint,
  className = '',
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
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
      {hint ? <p className="text-xs text-ink-3">{hint}</p> : null}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="enquiry__error">
      <Icon name="alert" size={14} />
      {children}
    </p>
  );
}

/** A row of choices as pills, one of them chosen — a short list read at a glance. */
export function Choices({
  name,
  options,
  value,
  onChange,
  labelledBy,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  labelledBy: string;
}) {
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const on = option === value;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={on}
            name={name}
            onClick={() => onChange(on ? '' : option)}
            className="choice-pill"
          >
            {on ? <Icon name="check" size={13} strokeWidth={2.4} /> : null}
            {option}
          </button>
        );
      })}
    </div>
  );
}

/** The consent box, on beUI's checkbox: its tick draws itself in; the words are its label. */
export function Consent({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="enquiry__consent" data-invalid={error ? true : undefined}>
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5"
        />
        <label htmlFor={id}>{children}</label>
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

/** The honeypot: out of sight and out of the tab order, so only a bot fills it in. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden="true" className="enquiry__trap">
      <label htmlFor={id}>Leave this empty</label>
      <input id={id} name="website_url" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Where a visitor came from: the page, the referrer and any campaign tags. */
export function origin() {
  const params = new URLSearchParams(window.location.search);
  return {
    page: window.location.pathname + window.location.search,
    referrer: document.referrer,
    utm: Object.fromEntries([...params].filter(([key]) => key.startsWith('utm_'))),
  };
}

/** WhatsApp, opened on a message already written: the fallback while the form has nowhere to send. */
export const whatsappWith = (base: string, text: string) =>
  `${base.split('?')[0]}?text=${encodeURIComponent(text)}`;
