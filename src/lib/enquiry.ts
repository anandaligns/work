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

/** Where a sent enquiry leaves the first name, for the thanks page — never in the address bar. */
export const THANKS_NAME_KEY = 'pk-enquiry-name';

/**
 * Is the form on? Only once it has somewhere to send to (`LEAD_WEBHOOK_URL`, read at build) — or
 * on the dev server, which logs what it would send. Server components only.
 */
export const enquiryLive = () =>
  Boolean(process.env.LEAD_WEBHOOK_URL) || process.env.NODE_ENV === 'development';

/**
 * Does the automation behind the form reply to the visitor and alert Pixel Kinetix yet? Until it
 * does, no page says a copy is on its way, and the "runs on our own Connected Website" caption
 * stays off.
 */
export const ENQUIRY_AUTOMATION_LIVE = false;
