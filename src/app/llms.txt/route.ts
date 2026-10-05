import { isLive, servicePageFor, solutionPageFor } from '@/content/pages';
import {
  carePlans,
  categories,
  contact,
  evolve,
  faqs,
  groupIntros,
  SITE_URL,
  solutions,
  websitePackages,
} from '@/content/site';

/**
 * `/llms.txt` — the site in plain Markdown for AI assistants and answer engines (llmstxt.org):
 * who Pixel Kinetix is, where it works, what it builds and for what price, each page's address
 * and one line on it, and the questions people ask most. Built from the same content as the
 * pages, so it never says anything they don't.
 */
export const dynamic = 'force-static';

const line = (name: string, path: string, text: string) => `- [${name}](${SITE_URL}${path}): ${text}`;

function body() {
  const out: string[] = [
    '# Pixel Kinetix',
    '',
    '> Pixel Kinetix is a Bangalore company that designs and builds websites, business software and automation for businesses in Bangalore and across India — and connects them, so enquiries, bookings, payments and customer records flow into one system. Every package has a published price.',
    '',
    `- Based in: ${contact.locality}, India. Works with businesses across India.`,
    `- Contact: ${contact.phone} (call or WhatsApp), ${contact.email}.`,
    '- How it works: a free first conversation, a fixed written quote, work starts once the advance is paid, and every build can be hosted and looked after afterwards on an Evolve care plan.',
    '',
    '## Solutions (start here if you know the problem, not the product)',
    '',
  ];
  for (const solution of solutions) {
    if (!isLive(solution.slug)) continue;
    const page = solutionPageFor(solution.slug);
    out.push(line(solution.name, `/solutions/${solution.slug}`, page?.description ?? solution.line));
  }
  out.push('', '## Services', '');
  for (const category of categories) {
    out.push(`### ${category.name}`, '', groupIntros[category.slug] ?? category.line, '');
    out.push(line(category.name, `/services/${category.slug}`, 'All five services in this group.'));
    for (const service of category.services) {
      if (!isLive(service.anchor)) continue;
      const page = servicePageFor(service.anchor);
      out.push(line(service.name, `/services/${service.anchor}`, page?.description ?? service.summary));
    }
    out.push('');
  }
  out.push(
    '## Prices',
    '',
    ...websitePackages.map(
      (offer) =>
        `- ${offer.name}: ${offer.headline[0]?.text ?? 'Quoted'}${offer.timeline ? `, ${offer.timeline}` : ''}${offer.summary ? ` — ${offer.summary}` : ''}.`,
    ),
    ...carePlans.map(
      (plan) =>
        `- ${evolve.name} ${plan.name} care plan: ${plan.headline.map((price) => `${price.text}${price.label ? ` ${price.label.toLowerCase()}` : ''}`).join(', ')}.`,
    ),
    '',
    `- [All prices](${SITE_URL}/#pricing): every package and care plan, with what each includes.`,
    line(evolve.name, `/services/${evolve.slug}`, evolve.summary),
    '',
    '## Company',
    '',
    line('About', '/about', 'Who builds the systems, and the principles behind every build.'),
    line('Contact', '/contact', 'Start a project, ask on WhatsApp, call or email.'),
    line('Privacy', '/privacy', 'How information is handled.'),
    line('Terms', '/terms', 'The terms of using the website.'),
    line('Refund policy', '/refund-policy', 'Payments, the warranty and cancellations.'),
    '',
    '## Frequently asked',
    '',
  );
  for (const faq of faqs.slice(0, 12)) out.push(`### ${faq.question}`, '', faq.answer, '');
  return out.join('\n');
}

export function GET() {
  return new Response(body(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
