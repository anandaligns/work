import { mac } from './kit';
import type { ProductPage } from './types';

/**
 * Business Websites, presented as a product: the page's words. Its pictures are its own mockups
 * (`components/lab/mocks-business-websites.tsx`), from its sample business, an Interior Design
 * Studio; the one screen kept here is the studio's site on a laptop, which `/services` borrows for
 * the back of its group's picture. The studio and its sample data are invented, never a client.
 */

/** The studio's site on a laptop, in Chrome. */
const SITE = mac(
  'interiordesignstudio.in',
  'Interior Design Studio · Indiranagar',
  { kind: 'site', brand: 'interiordesign', device: 'desktop' },
  'interiordesign',
);

const page: ProductPage = {
  accent: '#0ea5e9',
  accentDark: '#0369a1',
  sub: 'A website that brings in work: fast on a phone, found on Google, and built to turn a visit into an enquiry you can answer.',

  stage: { back: SITE },

  highlights: {
    heading: 'Business websites at a glance',
    items: [
      { value: '₹12,000', label: 'The Website: up to six pages, logo included.' },
      { value: '10–14 days', label: 'To live, from the day your content is complete.' },
      { value: '₹45,000', label: 'From, for the Connected Website, designed for your brand.' },
      { value: 'Every page', label: 'Set up for search: titles, descriptions, sitemap, schema.' },
    ],
  },

  view: {
    statement: 'Your website is the first meeting, and it happens before anyone calls.',
    body: [
      '**A business website** is where people decide whether to call you. They look you up on their phone, between other things, often after hours — and in a minute or two the site has to answer their first questions, show why you’re the right choice and make the next step obvious.',
      '**There are two ways to get one.** The Website is quick and proven: up to six pages on our tested layouts, live in 10–14 days. The [Connected Website](/solutions/never-miss-a-lead) is designed from scratch for your brand and answers every enquiry the moment it arrives, with [instant WhatsApp replies](/services/whatsapp-automation), booking and a lead dashboard.',
      'Both are set up for search from the first day and looked after on [Evolve](/services/evolve) after launch.',
    ],
    photo: {
      file: 'business-website-interior-studio',
      alt: 'An interior design studio’s meeting table, with a client looking through material samples.',
    },
  },

  features: {
    heading: 'What a business website does',
    intro: 'Five things a website does for a business — from being found to being fast.',
    items: [
      {
        label: 'Found on Google',
        title: 'Found by the people already looking.',
        body: '**Every service gets its own page**, written in the words people search with. Titles, meta descriptions, a sitemap and schema tell Google what each page is, and your Google Business Profile points to the right one.',
        points: [
          'A page per service, not one long list',
          'Set up for search from the first day',
          'Fast on phones, where most searching starts',
        ],
        caption: 'Clicks from Google over three months, and the searches that bring them',
      },
      {
        label: 'Designed to sell',
        title: 'A first impression that does the selling.',
        body: '**The design leads with what the visitor needs**: what you do, how it works, why you. On a phone first, then everywhere else, in your logo and colours, used properly.',
        points: [
          'Mobile-first design',
          'Clear services, process and next step',
          'Your logo and colours, used properly',
        ],
        caption: 'The booking page, on a phone',
      },
      {
        label: 'Every enquiry',
        title: 'Every enquiry reaches you.',
        body: '**A short form, WhatsApp and call buttons** on every page, and every enquiry in one inbox with the page it came from. With the Connected Website, each one also gets an instant reply.',
        points: [
          'Enquiries to one inbox',
          'WhatsApp and call buttons on every page',
          'The source of every enquiry, recorded',
        ],
        caption: 'A consultation request as it reaches the studio, with where it came from',
      },
      {
        label: 'Measured',
        title: 'Know which pages bring work.',
        body: '**Analytics from launch** shows where visitors come from, what they read and which pages turn into enquiries, so every change is based on what people actually do.',
        points: [
          'Google Analytics on every page',
          'Enquiries counted as they arrive',
          'Search Console for how Google sees the site',
        ],
        caption: 'Which pages turn visits into booking requests',
      },
      {
        label: 'Speed',
        title: 'Fast on a phone, even on mobile data.',
        body: '**Lean pages, images sized for phones and a CDN on Evolve** keep every page quick to open — which visitors notice first, and Google measures.',
        points: [
          'Images resized and compressed for phones',
          'Every page tested for speed before launch',
          'Served over a CDN on Evolve',
        ],
        caption: 'Every page tested for speed on a phone before launch',
      },
    ],
  },

  included: {
    heading: 'Business website features',
    intro: 'What every business website we build comes with.',
    items: [
      {
        icon: 'device',
        title: 'Mobile-first design',
        body: 'Designed for phones first, then tablets and desktops.',
      },
      {
        icon: 'search',
        title: 'SEO setup',
        body: 'Titles, meta descriptions, a sitemap and schema on every page.',
      },
      {
        icon: 'file',
        title: 'A page per service',
        body: 'Each service on its own page, in the words people search with.',
      },
      {
        icon: 'whatsapp',
        title: 'WhatsApp and call buttons',
        body: 'On every page, so the next step is one tap away.',
      },
      {
        icon: 'mail',
        title: 'An enquiry form',
        body: 'Short, and sending every enquiry to one inbox with its source.',
      },
      {
        icon: 'chart',
        title: 'Analytics',
        body: 'Google Analytics from launch: visitors, sources and enquiries.',
      },
      {
        icon: 'pin',
        title: 'Google Business Profile',
        body: 'Linked to your site, so maps and search point to the same place.',
      },
      {
        icon: 'gauge',
        title: 'Fast by default',
        body: 'Lean pages and optimised images; served over a CDN on Evolve.',
      },
      {
        icon: 'lock',
        title: 'SSL',
        body: 'The padlock and https on every page, set up at launch.',
      },
      {
        icon: 'globe',
        title: 'Domain and email',
        body: 'Set up for ₹2,000, with the domain’s registration at cost.',
      },
      {
        icon: 'pen',
        title: 'Content writing',
        body: 'Written for you for ₹900 a page, if you’d rather not.',
      },
      {
        icon: 'key',
        title: 'Yours',
        body: 'Your domain and your content, always.',
      },
    ],
  },

  compare: {
    heading: 'Business websites compared',
    intro: 'What a website built to bring in work does that the usual alternatives don’t.',
    us: 'Designed around your customers, and looked after on Evolve.',
    options: [
      {
        label: 'Social page only',
        note: 'A profile on Instagram or Facebook, and nothing else.',
        rows: [
          {
            topic: 'Being found',
            without: 'Found only by people who already follow you',
            with: 'Found on Google by people searching for what you do',
          },
          {
            topic: 'Prices and timings',
            without: 'Prices and timings buried in old posts',
            with: 'Every service, price and timing on its own page',
          },
          {
            topic: 'Enquiries',
            without: 'Enquiries mixed into DMs',
            with: 'Form, WhatsApp and call buttons, every enquiry to one inbox',
          },
          {
            topic: 'Ownership',
            without: 'A page on someone else’s platform',
            with: 'Your domain and your content, always',
          },
        ],
      },
      {
        label: 'DIY builder',
        note: 'A theme you set up yourself on a website builder.',
        rows: [
          {
            topic: 'Design',
            without: 'Templates that look like everyone else’s',
            with: 'Proven layouts, or designed from scratch for your brand',
          },
          {
            topic: 'Search',
            without: 'SEO settings left for you to work out',
            with: 'Titles, descriptions, sitemap and schema set up',
          },
          {
            topic: 'Speed',
            without: 'Heavy themes that load slowly on phones',
            with: 'Lean pages and optimised images',
          },
          {
            topic: 'Support',
            without: 'Nobody to call when something breaks',
            with: 'Looked after on Evolve, with changes every month',
          },
        ],
      },
      {
        label: 'Old website',
        note: 'The site you have, built some years ago.',
        rows: [
          {
            topic: 'On a phone',
            without: 'Hard to use on a phone',
            with: 'Designed for phones first',
          },
          {
            topic: 'On Google',
            without: 'Doesn’t show up for what you do',
            with: 'A page for each service, set up for search',
          },
          {
            topic: 'Enquiries',
            without: 'Enquiries arrive in five places',
            with: 'Form, WhatsApp and call buttons, every enquiry to one inbox',
          },
          {
            topic: 'Results',
            without: 'No idea what’s working',
            with: 'Analytics shows which pages bring enquiries',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How a business website is built',
    blocks: [
      {
        title: 'Fast by default',
        body: 'Lean pages and optimised images; on Evolve, served over a CDN.',
      },
      {
        title: 'Set up for search',
        body: 'Titles, meta descriptions, a sitemap and schema on every page.',
      },
      {
        title: 'Measured',
        body: 'Analytics from launch, so you see where visitors come from and what they do.',
      },
      {
        title: 'Secure',
        body: 'SSL on every page from launch, with backups and updates on Evolve.',
      },
      {
        title: 'Easy to change',
        body: 'Changes to existing pages are part of your Evolve plan: send them by message.',
      },
      { title: 'Yours', body: 'Your domain and your content, always.' },
    ],
  },

  tools: {
    heading: 'Works with Google and the tools you use',
    groups: [
      { name: 'Search', items: ['Google Search Console', 'Google Business Profile'] },
      { name: 'Analytics', items: ['Google Analytics'] },
      { name: 'Contact', items: ['WhatsApp', 'Your business email'] },
    ],
  },

  industries: {
    heading: 'Who a business website is for',
    items: [
      {
        sector: 'Retail',
        text: 'What you stock, where to find you and when you’re open, with directions one tap away.',
      },
      {
        sector: 'Clinics',
        text: 'Treatments, doctors and timings made clear, with a booking button on every page.',
      },
      {
        sector: 'Hospitality',
        text: 'Menus, photos and table bookings that work on a phone at 8 pm.',
      },
      {
        sector: 'Real Estate',
        text: 'Project pages with plans, amenities and a site-visit form for each one.',
      },
      {
        sector: 'Education',
        text: 'Courses, batches and fees laid out for parents, with an enquiry form.',
      },
      {
        sector: 'Professional Services',
        text: 'A page for each service, so clients find the one they need and trust you with it.',
      },
      {
        sector: 'Startups',
        text: 'A launch site that explains the product and collects sign-ups.',
      },
      {
        sector: 'Manufacturing',
        text: 'Products, capabilities and a dealer enquiry form for buyers.',
      },
    ],
  },

  build: {
    heading: 'How we build your website',
    steps: [
      {
        title: 'Content and structure',
        body: 'For the Website, you supply the content in full. For the Connected Website, we shape it with you.',
      },
      {
        title: 'Design',
        body: 'The Website uses proven layouts from our system, with one revision round. The Connected Website is designed from scratch, with three.',
      },
      {
        title: 'Build',
        body: 'Mobile-first, set up for search, with the form, WhatsApp and call buttons.',
      },
      {
        title: 'Launch',
        body: 'Domain, email, SSL and analytics configured and checked; live on your domain once the final payment clears.',
      },
      { title: 'Evolve', body: 'Hosting and monthly changes on a plan.' },
    ],
  },

  price: {
    heading: 'Business website pricing',
    intro:
      'Two packages: quick and proven, or designed for your brand with every enquiry answered.',
    rows: [
      'Pages',
      'Design',
      'Revision rounds',
      'SEO setup',
      'Form, WhatsApp and call buttons',
      'Instant WhatsApp and email replies',
      'Online booking or callbacks',
      'Lead dashboard',
      'Content',
      'Evolve care',
    ],
    packages: [
      {
        name: 'Website',
        summary: 'Up to six pages on proven layouts, logo included, live in two weeks.',
        price: '₹12,000',
        unit: 'One-time',
        timeline: '10–14 days',
        values: [
          'Up to 6',
          'Proven layouts from our system',
          'One',
          true,
          true,
          false,
          false,
          false,
          'Supplied by you in full',
          'Optional, from ₹899 a month',
        ],
        cta: 'Start with the Website',
        interest: 'website',
      },
      {
        name: 'Connected Website',
        summary: 'Designed for your brand, with every enquiry answered, booked and tracked.',
        price: 'From ₹45,000',
        unit: 'One-time',
        timeline: '4–6 weeks',
        values: [
          'Planned with you',
          'From scratch, for your brand',
          'Three',
          true,
          true,
          true,
          true,
          true,
          'Shaped with you',
          '3 months included',
        ],
        cta: 'Start with the Connected Website',
        interest: 'connected-website',
        focal: true,
      },
    ],
    note: 'Extras: content writing ₹900 a page; an extra page during the build ₹1,800; domain and business email setup ₹2,000, with the domain’s registration at cost.',
    notes: [
      'Prices are one-time unless marked as monthly. Climbing search rankings for competitive terms takes ongoing SEO work, which no package includes.',
    ],
  },

  why: {
    heading: 'Why build it with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'Published prices',
        body: '₹12,000 or from ₹45,000, in writing before we start.',
      },
      {
        icon: 'key',
        title: 'Yours to keep',
        body: 'Your domain and your content, always.',
      },
      {
        icon: 'device',
        title: 'Phones first',
        body: 'Designed for the screen most of your visitors use.',
      },
      {
        icon: 'search',
        title: 'Set up for search',
        body: 'Every page ready for Google from the first day.',
      },
      {
        icon: 'refresh',
        title: 'Looked after on Evolve',
        body: 'Hosting, monitoring and monthly changes, from ₹899 a month.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team building for businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'Business website questions',
    items: [
      {
        question: 'How much does a business website cost?',
        answer:
          'The Website is ₹12,000 for up to six pages, logo included, in 10–14 days. The Connected Website is from ₹45,000, designed for your brand, with instant replies, booking, a lead dashboard and three months of Evolve.',
      },
      {
        question: 'Website or Connected Website: which do I need?',
        answer:
          'Need to be online quickly, choose the Website: proven layouts, up to 6 pages, in 10–14 days. Need every enquiry answered, choose the Connected Website: designed for your brand, with instant replies, booking and a lead dashboard.',
      },
      {
        question: 'Will my website show up on Google?',
        answer:
          'Every build includes SEO setup (titles, meta descriptions, a sitemap and schema), so Google can read and list your pages. Climbing higher for competitive searches takes ongoing SEO campaigns, which are not part of any package.',
      },
      {
        question: 'Do you need my content before you start?',
        answer:
          'For the Website, yes: content must be supplied in full before we start. For the Connected Website, we shape it with you. Content writing is ₹900 a page.',
      },
      {
        question: 'Can I add pages later?',
        answer:
          'An extra page during the build is ₹1,800. After launch, a brand-new page is quoted separately; changes to existing pages are part of your Evolve plan.',
      },
      {
        question: 'Do you set up the domain and business email?',
        answer:
          'Yes, for ₹2,000. The domain’s own registration and renewal are passed through at cost.',
      },
      {
        question: 'Is hosting included?',
        answer:
          'Hosting comes with Evolve: all three plans include it, from ₹899 a month. The Connected Website includes its first three months.',
      },
      {
        question: 'Will it work well on phones?',
        answer:
          'Yes. Every site is designed for phones first, then tablets and desktops, and kept lean so it loads quickly on mobile data.',
      },
      {
        question: 'How do I change things after launch?',
        answer:
          'Send the change by message. Changes to existing pages are part of your Evolve plan, and a brand-new page is quoted separately.',
      },
      {
        question: 'How long does it take?',
        answer:
          'The Website takes 10–14 days and the Connected Website 4–6 weeks, counted from the day your content is complete.',
      },
    ],
  },

  notes: [
    'Screens on this page show sample data. The names in them are invented.',
    'Google, Google Analytics, Google Search Console and Google Business Profile are trademarks of Google LLC. WhatsApp is a trademark of Meta Platforms, Inc.',
  ],
};

export default page;
