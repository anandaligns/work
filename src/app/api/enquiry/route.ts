import { type Enquiry, normalisePhone, validateEnquiry } from '@/lib/enquiry';

/**
 * `POST /api/enquiry` — where the contact form sends. It checks the form again, drops what the
 * hidden honeypot catches, holds any one address to five enquiries in ten minutes, and passes the
 * lead on to `LEAD_WEBHOOK_URL`: the automation that saves it to the dashboard, replies to the
 * visitor on WhatsApp and email, and alerts Pixel Kinetix. `LEAD_WEBHOOK_SECRET`, if set, goes
 * with it as a bearer token.
 *
 * With no webhook set, the dev server logs the lead instead; a production build answers 503, and
 * the contact page does not show the form at all (see `enquiryLive`).
 */
export const dynamic = 'force-dynamic';

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const seen = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (seen.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  seen.set(ip, recent);
  return recent.length > LIMIT;
}

const clip = (value: unknown, max = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  let body: Partial<Enquiry> & { website_url?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'bad-request' }, { status: 400 });
  }

  // A person never sees the honeypot, so anything in it came from a bot: accepted, and dropped.
  if (clip(body.website_url)) return Response.json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return Response.json({ error: 'too-many' }, { status: 429 });

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const utm = Object.fromEntries(
    Object.entries(body.utm ?? {})
      .filter(([key]) => /^utm_[a-z]+$/.test(key))
      .map(([key, value]) => [key, clip(value, 200)]),
  );
  const lead = {
    name: clip(body.name, 120),
    business: clip(body.business, 160),
    phone: normalisePhone(clip(body.phone, 40)),
    email: clip(body.email, 200),
    city: clip(body.city, 120),
    does: clip(body.does),
    need: clip(body.need),
    interest: clip(body.interest, 60) || 'Not sure yet',
    budget: clip(body.budget, 60),
    when: clip(body.when, 60),
    consent: true,
    source: clip(body.source, 120),
    page: clip(body.page, 300),
    referrer: clip(body.referrer, 500),
    utm,
    receivedAt: new Date().toISOString(),
  };

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[enquiry] no LEAD_WEBHOOK_URL set; the lead would have been sent:', lead);
      return Response.json({ ok: true });
    }
    return Response.json({ error: 'not-configured' }, { status: 503 });
  }

  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const sent = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(secret ? { authorization: `Bearer ${secret}` } : {}),
    },
    body: JSON.stringify(lead),
  }).catch(() => null);
  if (!sent?.ok) return Response.json({ error: 'not-sent' }, { status: 502 });
  return Response.json({ ok: true });
}
