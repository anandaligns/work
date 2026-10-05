import { startFor } from '../site';
import { phone } from '../products/kit';
import product from '../products/keep-it-improving';
import { benefitsOf, desk, screenOf, type SolutionContent } from './solution';

/**
 * Website Care & Hosting in the solution pattern: its sample precision-parts maker's site, told as the
 * night it moves to us and what comes after — the copy tested, the switch at 11 pm, watched from
 * the first day, and a change asked for by message. Every figure is the product page's own, so
 * the company and its data stay the same invented ones; the two new phone screens are drawn from
 * its move and changes screens.
 */

/** The page's colour: the home page's blush promise, its rose. */
const ACCENT = '#f0506e';

const [STATUS, SWITCH] = product.stage?.front ?? [];

/** This afternoon's tests on the copy, before the switch. */
const TESTED = phone({
  title: 'Before the switch',
  sub: 'yourbusiness.in · on our hosting',
  action: 'check',
  grey: true,
  blocks: [
    {
      t: 'stats',
      items: [
        { label: 'Pages checked', value: '46' },
        { label: 'Redirects', value: '112' },
        { label: 'Fixed', value: '3' },
      ],
    },
    {
      t: 'list',
      title: 'Today',
      items: [
        {
          title: 'Contact form tested end to end',
          meta: '4:10 pm · enquiry reached sales@',
          icon: 'mail',
          pill: { text: 'Passed', tone: 'green' },
        },
        {
          title: 'Product pages compared',
          meta: '2:30 pm · all 38 match',
          icon: 'eye',
          pill: { text: 'Passed', tone: 'green' },
        },
        {
          title: 'Old plugin removed',
          meta: '11:05 am · unmaintained since 2021',
          icon: 'shield',
          pill: { text: 'Done', tone: 'green' },
        },
      ],
    },
  ],
});

/** A change, asked for in the portal and followed until it's live. */
const REQUEST = phone({
  back: true,
  title: 'Change the sales phone number',
  sub: 'Contact page · asked today',
  grey: true,
  blocks: [
    {
      t: 'steps',
      items: [
        { title: 'Asked in your portal', meta: 'Today', state: 'done' },
        { title: 'In progress', meta: 'Within your plan’s response time', state: 'now' },
        { title: 'Live on the site', meta: 'Followed until it is', state: 'next' },
      ],
    },
    {
      t: 'note',
      text: 'The fifth of five changes this month. New pages are quoted separately.',
      icon: 'pen',
    },
  ],
});

export const content: SolutionContent = {
  accent: ACCENT,
  tint: '#fdecee',
  tasks: [
    {
      icon: 'move',
      title: 'The move',
      line: 'Switching yourbusiness.in tonight at 11 pm…',
      screen: desk(product.stage?.back),
    },
    {
      icon: 'key',
      title: 'Access',
      line: 'Writing every login down in your portal…',
      screen: desk(screenOf(product, 'Access')),
    },
    {
      icon: 'gauge',
      title: 'Speed',
      line: 'Performance 38 before the move, 94 after',
      screen: desk(screenOf(product, 'Faster')),
    },
  ],
  note: { label: 'From', text: '₹899 a month · Evolve', href: '#ways-in' },
  behind: {
    heading: { lead: 'The system behind', fill: 'a looked-after site.' },
    intro:
      'It works because the move, the hosting and the changes are one plan, not three people to chase.',
    cards: [
      {
        title: 'Moved, tested first',
        body: 'Copied to our hosting and checked page by page before the domain switches.',
        cta: { label: 'See the ways in', href: '#ways-in' },
      },
      {
        title: 'Watched from the first day',
        body: 'Monitoring, nightly backups and security updates, from the day it moves.',
        cta: { label: 'Evolve', href: '/services/evolve' },
      },
      {
        title: 'Changes by message',
        body: 'Products, people and offers updated in a sentence, sent from your portal.',
        cta: { label: 'Talk to us', href: startFor('website-care-hosting') },
      },
    ],
  },
  journey: {
    eyebrow: 'One night’s move',
    heading: { lead: 'From stuck', fill: 'to looked after, overnight.' },
    intro: 'yourbusiness.in moves to us tonight. Here is what happens, and what comes after.',
    steps: [
      {
        time: '4:10 pm',
        title: 'The copy is tested',
        text: 'Every page checked on our hosting, and the contact form tested end to end.',
        screen: TESTED,
      },
      {
        time: '11:00 pm',
        title: 'The domain switches',
        text: 'At a quiet hour, with nothing to do on your side and email working as before.',
        screen: SWITCH!,
      },
      {
        time: 'From tomorrow',
        title: 'Watched and backed up',
        text: 'Monitoring, a nightly backup at 2:00 am and security updates, from the first day.',
        screen: STATUS!,
      },
      {
        time: 'Any day',
        title: 'A change, by message',
        text: 'A new sales number, asked for in the portal and followed until it’s live.',
        screen: REQUEST,
      },
    ],
  },
  system: {
    heading: { lead: 'How moving and', fill: 'looking after work.' },
    intro: 'In the move, and on every Evolve plan after it.',
    points: [
      {
        icon: 'search',
        title: 'A check first',
        body: 'The site, domain, hosting and access reviewed before anything moves.',
      },
      {
        icon: 'key',
        title: 'Access recovered',
        body: 'Starting with your domain registrar, then the admin and accounts, each recorded.',
      },
      {
        icon: 'move',
        title: 'The move',
        body: 'Copied, tested on our hosting, then switched, to keep any downtime short.',
      },
      {
        icon: 'mail',
        title: 'Email untouched',
        body: 'Your business email keeps working through the move.',
      },
      { icon: 'link', title: 'Redirects', body: 'Old addresses sent to the right new pages.' },
      {
        icon: 'server',
        title: 'Managed hosting',
        body: 'With SSL and a CDN, monitoring, and nightly backups kept 30, 60 or 90 days by plan.',
      },
      {
        icon: 'shield',
        title: 'Security updates',
        body: 'Monthly, fortnightly or weekly by plan.',
      },
      {
        icon: 'pen',
        title: 'Changes by message',
        body: '2, 5 or 12 a month on [Evolve](/services/evolve), asked for and tracked in your portal.',
      },
      {
        icon: 'globe',
        title: 'Redesign later',
        body: 'Quoted on its own, or as part of Modernise & Connect.',
      },
    ],
  },
  benefits: {
    heading: { lead: 'What changes', fill: 'when someone looks after it.' },
    intro: product.features.intro,
    points: benefitsOf(product, {
      'Moved properly': 'move',
      Access: 'key',
      'Watched and backed up': 'shield',
      'Changes by message': 'pen',
      Faster: 'gauge',
    }),
  },
  built: {
    heading: { lead: 'Built on Evolve,', fill: 'with a redesign when you’re ready.' },
    intro:
      'Website Care & Hosting is a move to our hosting and an Evolve plan after it. A new website can follow whenever you’re ready.',
    services: ['evolve', 'business-websites'],
  },
  ways: {
    heading: { lead: 'Two ways in.', fill: 'Moved once, then looked after.' },
    intro: product.price.intro,
  },
  why: {
    heading: 'Why move to Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'Published prices',
        body: 'The move, the plans and speed work, priced on this page.',
      },
      {
        icon: 'key',
        title: 'Yours, always',
        body: 'Your domain and content, with a full export if you leave.',
      },
      {
        icon: 'calendar',
        title: 'No long lock-in',
        body: 'Three months minimum, then monthly, with 30 days’ notice to cancel.',
      },
      {
        icon: 'globe',
        title: 'Any site, not just ours',
        body: 'A site we didn’t build is moved to us, then looked after like our own.',
      },
      {
        icon: 'people',
        title: 'A team, not one person',
        body: 'Nobody gets stuck when someone is away.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team looking after businesses across India.',
      },
    ],
  },
};

export { product };
