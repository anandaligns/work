import { INTERESTS } from '@/content/site';

/**
 * The contact form's fields and their rules — one set, used by the form as it is filled in and
 * again by the server before anything is sent on. Errors are said in words, under the field.
 */
export const BUDGETS = [
  'Under ₹15,000',
  '₹15,000–50,000',
  '₹50,000–1,50,000',
  'Above ₹1,50,000',
  'Not sure yet',
] as const;

export const TIMINGS = ['This month', 'In 1–3 months', 'Later', 'Just exploring'] as const;

export type Enquiry = {
  name: string;
  business: string;
  phone: string;
  email: string;
  city: string;
  does: string;
  need: string;
  interest: string;
  budget: string;
  when: string;
  consent: boolean;
  /** Hidden: the page the visitor came from, the slug its button carried, and campaign tags. */
  source: string;
  page: string;
  referrer: string;
  utm: Record<string, string>;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

/** An Indian mobile by default (+91 and ten digits from 6 to 9); any international number too. */
export function normalisePhone(raw: string): string | null {
  const compact = raw.replace(/[\s\-().]/g, '');
  if (/^\+91[6-9]\d{9}$/.test(compact)) return compact;
  if (/^0?[6-9]\d{9}$/.test(compact)) return `+91${compact.slice(-10)}`;
  if (/^91[6-9]\d{9}$/.test(compact)) return `+${compact}`;
  if (/^\+(?!91)\d{8,15}$/.test(compact)) return compact;
  return null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(form: Partial<Enquiry>): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
  if (!text(form.name)) errors.name = 'Please add your name.';
  if (!text(form.business)) errors.business = 'Please add your business’s name.';
  // The field opens on "+91 ", so a prefix alone is a number not given.
  if (!text(form.phone) || text(form.phone) === '+91')
    errors.phone = 'Please add a phone number so we can reach you.';
  else if (!normalisePhone(text(form.phone)))
    errors.phone = 'Please check the number: an Indian mobile has 10 digits.';
  if (!text(form.email)) errors.email = 'Please add an email address.';
  else if (!EMAIL.test(text(form.email))) errors.email = 'Please check the email address.';
  if (!text(form.does)) errors.does = 'Please tell us what your business does.';
  if (!text(form.need))
    errors.need = 'Please tell us what’s slowing it down, or what you want to build.';
  if (form.interest && !(INTERESTS as readonly string[]).includes(form.interest))
    errors.interest = 'Please choose one of the options.';
  if (form.budget && !(BUDGETS as readonly string[]).includes(form.budget))
    errors.budget = 'Please choose one of the options.';
  if (form.when && !(TIMINGS as readonly string[]).includes(form.when))
    errors.when = 'Please choose one of the options.';
  if (form.consent !== true)
    errors.consent = 'Please tick the box so we can contact you about your enquiry.';
  return errors;
}

/**
 * The contact page's general form: who you are, how to reach you, what it's about and the message.
 * A project goes through the Start a project flow instead (`components/start/`), which sends an
 * `Enquiry`.
 */
export const TOPICS = [
  'A question',
  'A new project',
  'Help with my current site',
  'Something else',
] as const;

export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
  page: string;
  referrer: string;
  utm: Record<string, string>;
};

export type ContactErrors = Partial<Record<keyof ContactMessage, string>>;

export function validateContact(form: Partial<ContactMessage>): ContactErrors {
  const errors: ContactErrors = {};
  const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
  if (!text(form.name)) errors.name = 'Please add your name.';
  if (!text(form.email)) errors.email = 'Please add an email address.';
  else if (!EMAIL.test(text(form.email))) errors.email = 'Please check the email address.';
  // The phone is optional here; a prefix alone is no number at all.
  const phone = text(form.phone);
  if (phone && phone !== '+91' && !normalisePhone(phone))
    errors.phone = 'Please check the number: an Indian mobile has 10 digits.';
  if (form.topic && !(TOPICS as readonly string[]).includes(form.topic))
    errors.topic = 'Please choose one of the options.';
  if (text(form.message).length < 10) errors.message = 'Please tell us a little more.';
  if (form.consent !== true)
    errors.consent = 'Please tick the box so we can reply to your message.';
  return errors;
}

/**
 * Is the form on? Only once it has somewhere to send to (`LEAD_WEBHOOK_URL`, read at build) — or
 * on the dev server, which logs what it would send. Server components only.
 */
export const enquiryLive = () =>
  Boolean(process.env.LEAD_WEBHOOK_URL) || process.env.NODE_ENV === 'development';
