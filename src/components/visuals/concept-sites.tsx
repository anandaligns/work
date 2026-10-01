import type { CSSProperties, ReactNode } from 'react';

import { FamilyArt, type FamilyArtKind } from './concept-art';

/**
 * Concept websites — the colour on a monochrome page.
 *
 * Each one is a real layout at a real size (1280 × 800 on a desktop, 390 × 672 on a phone),
 * rendered once and scaled into its frame with `transform`, so a tile reads like a screenshot
 * rather than a wireframe. The brands are invented and say so wherever they are shown: they are
 * what Pixel Kinetix would make for a clinic, a kitchen, a shop — not a list of clients. Every
 * picture in them is drawn, so the page makes no request to anyone else's server.
 */

export type ArtKind =
  | 'smile'
  | 'bowl'
  | 'house'
  | 'garment'
  | 'book'
  | 'cup'
  | 'scales'
  | 'chart'
  | 'bracket'
  | FamilyArtKind;

export type Brand = {
  id: string;
  name: string;
  kind: string;
  headline: string;
  sub: string;
  cta: string;
  nav: [string, string, string, string];
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  soft: string;
  art: ArtKind;
  /** Text on the accent, where white would be too faint (a light accent). */
  on?: string;
  serif?: boolean;
  cards: [string, string, string];
};

export const BRANDS: Record<string, Brand> = {
  kora: {
    id: 'kora',
    name: 'Kora Dental',
    kind: 'Clinic',
    headline: 'Gentle care for every smile.',
    sub: 'Family dentistry, same-week appointments and a team that explains everything first.',
    cta: 'Book a visit',
    nav: ['Treatments', 'Our team', 'Prices', 'Visit'],
    bg: '#f1faf7',
    ink: '#0d3b34',
    muted: '#4d6f69',
    accent: '#0b7d71',
    soft: '#cfeee6',
    art: 'smile',
    cards: ['Check-ups', 'Aligners', 'Whitening'],
  },
  saffron: {
    id: 'saffron',
    name: 'Saffron & Salt',
    kind: 'Restaurant',
    headline: 'Coastal kitchen, open late.',
    sub: 'Slow curries, fresh catch and a table that is always ready for one more.',
    cta: 'Reserve a table',
    nav: ['Menu', 'Story', 'Private dining', 'Find us'],
    bg: '#fff6ec',
    ink: '#3a1a0b',
    muted: '#7a5a48',
    accent: '#c2410c',
    soft: '#ffdcc2',
    art: 'bowl',
    serif: true,
    cards: ['Tonight', 'Thali Sundays', 'Catering'],
  },
  northfield: {
    id: 'northfield',
    name: 'Northfield Homes',
    kind: 'Real estate',
    headline: 'Homes with room to grow.',
    sub: 'Considered two- and three-bedroom homes, a short walk from everything that matters.',
    cta: 'Schedule a tour',
    nav: ['Residences', 'Floor plans', 'Location', 'Enquire'],
    bg: '#f3f0e8',
    ink: '#1d2a22',
    muted: '#56645a',
    accent: '#2e6a4e',
    soft: '#d9e6dc',
    art: 'house',
    serif: true,
    cards: ['2 BHK', '3 BHK', 'Amenities'],
  },
  loom: {
    id: 'loom',
    name: 'Loom & Thread',
    kind: 'Online store',
    headline: 'Handloom, made to last.',
    sub: 'Everyday pieces woven in small batches. Free returns within fourteen days.',
    cta: 'Shop the edit',
    nav: ['New in', 'Sarees', 'Kurtas', 'Stories'],
    bg: '#fff1f3',
    ink: '#2b0e16',
    muted: '#7b4a57',
    accent: '#be1e4f',
    soft: '#ffd3dd',
    art: 'garment',
    cards: ['Indigo', 'Ivory', 'Rust'],
  },
  brightpath: {
    id: 'brightpath',
    name: 'Brightpath Academy',
    kind: 'Education',
    headline: 'Classes that make it click.',
    sub: 'Small batches for grades 6 to 12, with a mentor who knows every name.',
    cta: 'Book a demo class',
    nav: ['Courses', 'Mentors', 'Results', 'Admissions'],
    bg: '#f1f4ff',
    ink: '#13204a',
    muted: '#4e5a82',
    accent: '#3656d9',
    soft: '#ffd84d',
    art: 'book',
    cards: ['Maths', 'Science', 'English'],
  },
  ember: {
    id: 'ember',
    name: 'Ember Roasters',
    kind: 'Café',
    headline: 'Roasted this week. Poured today.',
    sub: 'Single-estate coffee from the Western Ghats, roasted in small lots.',
    cta: 'Order beans',
    nav: ['Coffee', 'Café', 'Wholesale', 'Journal'],
    bg: '#1b1310',
    ink: '#f7ede3',
    muted: '#bfa895',
    accent: '#f29c1f',
    soft: '#3a2a22',
    art: 'cup',
    serif: true,
    cards: ['Pour-over', 'Espresso', 'Cold brew'],
  },
  meridian: {
    id: 'meridian',
    name: 'Meridian Legal',
    kind: 'Professional services',
    headline: 'Clear counsel for growing businesses.',
    sub: 'Contracts, compliance and disputes — explained plainly, priced up front.',
    cta: 'Book a consultation',
    nav: ['Practice areas', 'People', 'Insights', 'Contact'],
    bg: '#0f1b2d',
    ink: '#f4efe4',
    muted: '#aab3c2',
    accent: '#c9a45c',
    soft: '#1c2b44',
    art: 'scales',
    serif: true,
    cards: ['Corporate', 'Employment', 'Disputes'],
  },
  fieldnote: {
    id: 'fieldnote',
    name: 'Fieldnote',
    kind: 'Startup',
    headline: 'Your field team, finally in sync.',
    sub: 'Visits, notes and follow-ups in one place — built for teams on the move.',
    cta: 'Start free trial',
    nav: ['Product', 'Pricing', 'Customers', 'Docs'],
    bg: '#f6f4ff',
    ink: '#1a1340',
    muted: '#5b5480',
    accent: '#5a45f2',
    soft: '#e2dcff',
    art: 'chart',
    cards: ['Routes', 'Notes', 'Reports'],
  },
  tessel: {
    id: 'tessel',
    name: 'Tessel Components',
    kind: 'Manufacturing',
    headline: 'Precision sheet metal, on time.',
    sub: 'Brackets, enclosures and panels made in Peenya, and shipped to dealers across India.',
    cta: 'Request a quote',
    nav: ['Parts', 'Capabilities', 'Dealers', 'Contact'],
    bg: '#f2f5f8',
    ink: '#16232e',
    muted: '#526577',
    accent: '#4a6a85',
    soft: '#d6e0e9',
    art: 'bracket',
    cards: ['Brackets', 'Enclosures', 'Panels'],
  },
  // The reader's own business, on the service pages: a site for any business, and a store.
  yours: {
    id: 'yours',
    name: 'Your Business',
    kind: 'Your business',
    headline: 'Found, chosen and booked.',
    sub: 'What you do, why you, and one clear next step, on every phone and every search.',
    cta: 'Book a consultation',
    nav: ['Services', 'About', 'Reviews', 'Contact'],
    bg: '#f7f7fc',
    ink: '#11142b',
    muted: '#5b6070',
    accent: '#4b55d6',
    soft: '#e3e6fb',
    art: 'chart',
    cards: ['Services', 'How it works', 'Book a visit'],
  },
  yoursalon: {
    id: 'yoursalon',
    name: 'Your Salon',
    kind: 'Salon & spa · Koramangala',
    headline: 'Your chair is ready.',
    sub: 'Book a stylist, pay a small deposit and get a reminder the day before.',
    cta: 'Book now',
    nav: ['Services', 'Stylists', 'Offers', 'Visit'],
    bg: '#fdf6f9',
    ink: '#2a1020',
    muted: '#7a5a6a',
    accent: '#be185d',
    soft: '#f9dcea',
    art: 'garment',
    cards: ['Haircut & styling', 'Colour', 'Spa'],
  },
  yourstudio: {
    id: 'yourstudio',
    name: 'Your Studio',
    kind: 'Pottery studio · HSR Layout',
    headline: 'Handmade pieces, and a seat at the wheel.',
    sub: 'Shop this week’s pieces, or book a weekend workshop and pay online.',
    cta: 'Book a workshop',
    nav: ['Shop', 'Workshops', 'Gift cards', 'Visit'],
    bg: '#f7f5ef',
    ink: '#23241b',
    muted: '#63665a',
    accent: '#4d7c0f',
    soft: '#e4ecd3',
    art: 'cup',
    cards: ['This week’s pieces', 'Weekend workshops', 'Gift cards'],
  },
  // The service pages' example businesses: one kind of business per page, each in its own colour
  // (the page's business colour), used only in its own website and screens.
  interiordesign: {
    id: 'interiordesign',
    name: 'Interior Design Studio',
    kind: 'Interior design · Indiranagar',
    headline: 'Rooms that feel like you.',
    sub: 'Homes, cafés and offices designed end to end, from the first sketch to the last cushion.',
    cta: 'Book a consultation',
    nav: ['Projects', 'Services', 'Process', 'Contact'],
    bg: '#f6fdfe',
    ink: '#103641',
    muted: '#4b7d92',
    accent: '#22c7e8',
    soft: '#d7f5fb',
    on: '#0b0d12',
    art: 'sofa',
    cards: ['Living rooms', 'Kitchens', 'Offices'],
  },
  fashionstore: {
    id: 'fashionstore',
    name: 'Fashion / Clothing Store',
    kind: 'Hand-block clothing · Online',
    headline: 'Block prints, new this week.',
    sub: 'Kurtas, dresses and sarees printed by hand. Pay online, track on WhatsApp, return in seven days.',
    cta: 'Shop new in',
    nav: ['New in', 'Kurtas', 'Dresses', 'Track order'],
    bg: '#fcf8ff',
    ink: '#2e1d44',
    muted: '#715d96',
    accent: '#a855f7',
    soft: '#efe0fe',
    art: 'hanger',
    cards: ['New in', 'Kurtas', 'Sale'],
  },
  partsdistributor: {
    id: 'partsdistributor',
    name: 'Industrial Parts Distributor',
    kind: 'Bearings and fasteners · Peenya',
    headline: 'Parts on the shelf, prices on account.',
    sub: 'Bearings, belts and fasteners for factories across Karnataka, with your prices, invoices and orders in one portal.',
    cta: 'Open a trade account',
    nav: ['Products', 'Brands', 'Trade accounts', 'Contact'],
    bg: '#fffbf5',
    ink: '#3e2d10',
    muted: '#867154',
    accent: '#f59e0b',
    soft: '#fdeed3',
    on: '#0b0d12',
    art: 'parts',
    cards: ['Bearings', 'Fasteners', 'Transmission'],
  },
  logistics: {
    id: 'logistics',
    name: 'Logistics & Fleet Company',
    kind: 'Deliveries · South India',
    headline: 'Loads moved on time, every time.',
    sub: 'Same-day and scheduled deliveries across South India, with live tracking and proof of delivery.',
    cta: 'Get a quote',
    nav: ['Services', 'Fleet', 'Tracking', 'Contact'],
    bg: '#f7faff',
    ink: '#162744',
    muted: '#526a96',
    accent: '#3b82f6',
    soft: '#dce9fd',
    art: 'van',
    cards: ['Same-day', 'Full truckload', 'Track a load'],
  },
  restaurant: {
    id: 'restaurant',
    name: 'Restaurant / Food Ordering Brand',
    kind: 'South Indian kitchen · Indiranagar',
    headline: 'South Indian classics, made fresh.',
    sub: 'Order ahead on the app and pick up in minutes, or book a table for tonight.',
    cta: 'Order now',
    nav: ['Menu', 'Order', 'Book', 'Visit'],
    bg: '#fff9fa',
    ink: '#40232b',
    muted: '#886576',
    accent: '#fb7185',
    soft: '#fee5e9',
    on: '#0b0d12',
    art: 'plate',
    cards: ['Dosas', 'Meals', 'Order ahead'],
  },
  solarenergy: {
    id: 'solarenergy',
    name: 'Solar Energy Company',
    kind: 'Rooftop solar · 38 sites',
    headline: 'Power from your own roof.',
    sub: 'Rooftop solar for homes, schools and offices, watched every day from the first switch-on.',
    cta: 'Book a survey',
    nav: ['Homes', 'Business', 'Monitoring', 'Contact'],
    bg: '#fffdf6',
    ink: '#403713',
    muted: '#887e57',
    accent: '#facc15',
    soft: '#fef6d5',
    on: '#0b0d12',
    art: 'solar',
    cards: ['Homes', 'Schools', 'Offices'],
  },
  school: {
    id: 'school',
    name: 'School / Education Institute',
    kind: 'CBSE · Classes 1 to 12',
    headline: 'Where every child is known.',
    sub: 'Small sections, teachers who know every name, and parents who always know how the term is going.',
    cta: 'Apply for admission',
    nav: ['Admissions', 'Academics', 'Campus', 'Contact'],
    bg: '#f6fcfb',
    ink: '#0d3333',
    muted: '#47797f',
    accent: '#14b8a6',
    soft: '#d5f2ef',
    on: '#0b0d12',
    art: 'books',
    cards: ['Admissions', 'Academics', 'Sports'],
  },
  realestate: {
    id: 'realestate',
    name: 'Real Estate Agency',
    kind: 'Homes and plots · Bangalore',
    headline: 'Find the home that fits.',
    sub: 'Apartments, villas and plots across Bangalore, with site visits every weekend.',
    cta: 'Book a site visit',
    nav: ['Buy', 'Rent', 'Projects', 'Contact'],
    bg: '#fafaff',
    ink: '#252945',
    muted: '#666c96',
    accent: '#818cf8',
    soft: '#e8eafe',
    on: '#0b0d12',
    art: 'towers',
    cards: ['Apartments', 'Villas', 'Plots'],
  },
  construction: {
    id: 'construction',
    name: 'Construction Company',
    kind: 'Builders · Bangalore',
    headline: 'Built right, handed over on time.',
    sub: 'Homes, schools and commercial buildings, with every site’s progress shared each week.',
    cta: 'Request a quote',
    nav: ['Projects', 'Services', 'Safety', 'Contact'],
    bg: '#fff9f6',
    ink: '#3f2313',
    muted: '#876557',
    accent: '#f97316',
    soft: '#fee6d5',
    on: '#0b0d12',
    art: 'crane',
    cards: ['Residential', 'Commercial', 'Renovation'],
  },
  recruitment: {
    id: 'recruitment',
    name: 'Recruitment Agency Network',
    kind: 'Hiring platform · 12 agencies',
    headline: 'The right people, placed faster.',
    sub: 'Job posts, candidate pipelines and client access for every agency in the network, on one platform.',
    cta: 'Start a free trial',
    nav: ['Platform', 'Pricing', 'Agencies', 'Sign in'],
    bg: '#fcfaff',
    ink: '#332745',
    muted: '#776a97',
    accent: '#c084fc',
    soft: '#f4e9fe',
    on: '#0b0d12',
    art: 'people',
    cards: ['Job posts', 'Pipelines', 'Client access'],
  },
  dentalclinic: {
    id: 'dentalclinic',
    name: 'Dental Clinic',
    kind: 'Dental care · Indiranagar',
    headline: 'Gentle dental care, booked in a minute.',
    sub: 'Check-ups, cleaning and aligners, with evening and Sunday slots, and answers on WhatsApp at any hour.',
    cta: 'Book a visit',
    nav: ['Treatments', 'Doctors', 'Prices', 'Contact'],
    bg: '#f5fcfc',
    ink: '#0b3335',
    muted: '#447982',
    accent: '#09bbaf',
    soft: '#d3f3f1',
    on: '#0b0d12',
    art: 'tooth',
    cards: ['Check-up & cleaning', 'Clear aligners', 'Chat on WhatsApp'],
  },
  salon: {
    id: 'salon',
    name: 'Salon & Beauty Studio',
    kind: 'Hair and beauty · Koramangala',
    headline: 'Walk in tired. Walk out new.',
    sub: 'Cuts, colour and skin care by senior stylists. Book a slot, pay a small deposit, get a reminder.',
    cta: 'Book a slot',
    nav: ['Services', 'Stylists', 'Prices', 'Visit'],
    bg: '#fff9fc',
    ink: '#3e2336',
    muted: '#866584',
    accent: '#f472b6',
    soft: '#fde6f2',
    on: '#0b0d12',
    art: 'scissors',
    cards: ['Haircut & styling', 'Colour', 'Facials'],
  },
  travelagency: {
    id: 'travelagency',
    name: 'Online Travel Agency',
    kind: 'Holidays and flights · Online',
    headline: 'Trips planned, booked and sorted.',
    sub: 'Flights, hotels and holidays in one booking, with every ticket and voucher on WhatsApp.',
    cta: 'Plan a trip',
    nav: ['Holidays', 'Flights', 'Hotels', 'Contact'],
    bg: '#f5fcfd',
    ink: '#0a323d',
    muted: '#43788c',
    accent: '#06b6d4',
    soft: '#d2f2f7',
    on: '#0b0d12',
    art: 'plane',
    cards: ['Holidays', 'Flights', 'Hotels'],
  },
  lawfirm: {
    id: 'lawfirm',
    name: 'Law Firm',
    kind: 'Advocates · Bangalore',
    headline: 'Clear advice, early.',
    sub: 'Property, family and business law, explained plainly, with a consultation booked in a minute.',
    cta: 'Book a consultation',
    nav: ['Practice areas', 'Lawyers', 'Fees', 'Contact'],
    bg: '#fdf8fe',
    ink: '#381a43',
    muted: '#7e5994',
    accent: '#d946ef',
    soft: '#f8defc',
    art: 'gavel',
    cards: ['Property', 'Family', 'Business'],
  },
  accounting: {
    id: 'accounting',
    name: 'Accounting & Tax Firm',
    kind: 'Chartered accountants · Bangalore',
    headline: 'Books, GST and tax, done on time.',
    sub: 'Bookkeeping, GST returns and audits for small businesses, with every document read the day it arrives.',
    cta: 'Talk to us',
    nav: ['Services', 'Clients', 'Team', 'Contact'],
    bg: '#fef6f8',
    ink: '#3a111e',
    muted: '#814d65',
    accent: '#e11d48',
    soft: '#fad6de',
    art: 'ledger',
    cards: ['Bookkeeping', 'GST', 'Audit'],
  },
};

// --- the pictures ------------------------------------------------------------------------------

function Art({ kind, b }: { kind: ArtKind; b: Brand }) {
  const common = { width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid slice' } as const;
  switch (kind) {
    case 'smile':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill={b.soft} />
          <circle cx="300" cy="70" r="120" fill="#e3f7f1" />
          <circle cx="90" cy="260" r="90" fill="#bfe8dd" />
          <path
            d="M150 110c0-30 25-45 50-35 25-10 50 5 50 35 0 40-15 70-25 90-6 12-16 10-18-4l-7-40-7 40c-2 14-12 16-18 4-10-20-25-50-25-90z"
            fill="#fff"
            stroke={b.ink}
            strokeWidth="3"
          />
          <path d="M265 70c20-25 50-25 60-5-25 5-45 10-60 5z" fill={b.accent} />
          <path d="M268 70c10 20 35 30 55 20" stroke={b.accent} strokeWidth="3" fill="none" />
          <circle cx="120" cy="80" r="6" fill={b.accent} opacity="0.6" />
          <circle cx="330" cy="200" r="10" fill="#fff" />
        </svg>
      );
    case 'bowl':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill="#2b140a" />
          <circle cx="200" cy="160" r="120" fill="#3d1e10" />
          <ellipse cx="200" cy="170" rx="118" ry="100" fill="#f4e6d4" />
          <ellipse cx="200" cy="168" rx="96" ry="80" fill="#e8b04a" />
          <circle cx="170" cy="150" r="22" fill="#d9531e" />
          <circle cx="230" cy="175" r="18" fill="#c2410c" />
          <circle cx="205" cy="130" r="12" fill="#fde68a" />
          <path
            d="M150 190c20-8 40-8 60 4"
            stroke="#4d7c0f"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="248" cy="138" r="7" fill="#4d7c0f" />
          <circle cx="160" cy="200" r="6" fill="#4d7c0f" />
          <path d="M320 40l30 120" stroke="#d6c2a8" strokeWidth="6" strokeLinecap="round" />
          <path d="M340 36l30 120" stroke="#d6c2a8" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'house':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <defs>
            <linearGradient id={`sky-${b.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6d9b8" />
              <stop offset="1" stopColor="#dfe9df" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill={`url(#sky-${b.id})`} />
          <circle cx="310" cy="80" r="34" fill="#f9b572" />
          <path d="M0 240c80-30 140-10 220-25s130-15 180 5v80H0z" fill="#a9c4ad" />
          <rect
            x="95"
            y="120"
            width="190"
            height="125"
            fill="#fbfaf6"
            stroke={b.ink}
            strokeWidth="3"
          />
          <path d="M80 125l110-70 110 70z" fill={b.accent} stroke={b.ink} strokeWidth="3" />
          <rect
            x="120"
            y="150"
            width="50"
            height="40"
            fill="#cfe0f0"
            stroke={b.ink}
            strokeWidth="2.5"
          />
          <rect
            x="210"
            y="150"
            width="50"
            height="40"
            fill="#cfe0f0"
            stroke={b.ink}
            strokeWidth="2.5"
          />
          <rect
            x="172"
            y="195"
            width="36"
            height="50"
            fill="#8a5a3b"
            stroke={b.ink}
            strokeWidth="2.5"
          />
          <circle cx="45" cy="210" r="30" fill="#6f9a73" />
          <rect x="42" y="225" width="6" height="30" fill="#5b4632" />
          <circle cx="350" cy="220" r="24" fill="#6f9a73" />
        </svg>
      );
    case 'garment':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill="#ffe3e9" />
          <circle cx="80" cy="60" r="80" fill="#ffd0db" />
          <path
            d="M160 60l40-20 40 20 40 30-25 30-15-10v130H160V110l-15 10-25-30z"
            fill="#1f3a8a"
            stroke={b.ink}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M160 ${120 + i * 18}h120`}
              stroke="#f8d38a"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
          ))}
          <path d="M200 40v40" stroke="#f8d38a" strokeWidth="3" />
          <rect x="300" y="150" width="70" height="90" rx="8" fill={b.accent} />
          <rect x="310" y="160" width="50" height="8" rx="4" fill="#fff" opacity="0.8" />
          <circle cx="60" cy="220" r="36" fill="#f59e0b" opacity="0.85" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill="#dfe6ff" />
          <circle cx="320" cy="60" r="70" fill={b.soft} />
          <rect
            x="110"
            y="190"
            width="200"
            height="30"
            rx="4"
            fill={b.accent}
            stroke={b.ink}
            strokeWidth="3"
          />
          <rect
            x="125"
            y="160"
            width="175"
            height="30"
            rx="4"
            fill="#ff7a59"
            stroke={b.ink}
            strokeWidth="3"
          />
          <rect
            x="100"
            y="130"
            width="190"
            height="30"
            rx="4"
            fill="#fff"
            stroke={b.ink}
            strokeWidth="3"
          />
          <path d="M140 130v30M270 160v30M140 190v30" stroke={b.ink} strokeWidth="2" />
          <path d="M200 60l60 25-60 25-60-25z" fill={b.ink} />
          <path d="M235 95v25c-20 12-50 12-70 0V95" fill="none" stroke={b.ink} strokeWidth="3" />
          <path d="M260 85v35" stroke={b.soft} strokeWidth="3" />
          <circle cx="60" cy="240" r="26" fill="#fff" opacity="0.7" />
        </svg>
      );
    case 'cup':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill="#2a1c16" />
          <circle cx="200" cy="170" r="130" fill="#35241c" />
          <ellipse cx="200" cy="230" rx="120" ry="24" fill="#4a3226" />
          <path d="M130 130h140l-14 95c-3 15-15 25-30 25h-52c-15 0-27-10-30-25z" fill="#f4e8dc" />
          <path d="M270 150c30 0 38 40 5 50" stroke="#f4e8dc" strokeWidth="10" fill="none" />
          <ellipse cx="200" cy="132" rx="70" ry="12" fill="#6b3f22" />
          <path
            d="M180 100c-10-15 10-25 0-40M205 100c-10-15 10-25 0-40M230 100c-10-15 10-25 0-40"
            stroke={b.accent}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          {[60, 90, 320, 340].map((x, i) => (
            <ellipse
              key={x}
              cx={x}
              cy={60 + i * 50}
              rx="10"
              ry="6"
              fill="#7a4b2a"
              transform={`rotate(30 ${x} ${60 + i * 50})`}
            />
          ))}
        </svg>
      );
    case 'scales':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill="#15243b" />
          <circle cx="200" cy="150" r="120" fill="#1c2e4a" />
          <path
            d="M200 60v170M140 230h120"
            stroke={b.accent}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path d="M110 100h180" stroke={b.accent} strokeWidth="5" strokeLinecap="round" />
          <circle cx="200" cy="60" r="10" fill={b.accent} />
          <path
            d="M110 100l-30 60h60zM290 100l-30 60h60z"
            fill="none"
            stroke={b.accent}
            strokeWidth="3"
          />
          <path d="M78 160a32 12 0 0 0 64 0zM258 160a32 12 0 0 0 64 0z" fill={b.accent} />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill={b.soft} />
          <rect
            x="40"
            y="40"
            width="320"
            height="220"
            rx="16"
            fill="#fff"
            stroke={b.ink}
            strokeWidth="2"
          />
          <rect x="60" y="62" width="90" height="10" rx="5" fill={b.ink} />
          <path
            d="M60 220l50-40 40 20 50-60 50 30 70-60"
            stroke={b.accent}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M60 220l50-40 40 20 50-60 50 30 70-60V240H60z" fill={b.accent} opacity="0.12" />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={230 + i * 38}
              y={60}
              width="30"
              height="16"
              rx="8"
              fill={i === 0 ? b.accent : '#eee'}
            />
          ))}
          <circle cx="320" cy="110" r="7" fill="#1fb866" />
        </svg>
      );
    case 'bracket':
      // A sheet-metal L-bracket with its holes, on the grid of a drawing board.
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill={b.soft} />
          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={`v${i}`}
              d={`M${i * 50} 0V300`}
              stroke="#fff"
              strokeWidth="1"
              opacity="0.6"
            />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={`h${i}`}
              d={`M0 ${i * 50}H400`}
              stroke="#fff"
              strokeWidth="1"
              opacity="0.6"
            />
          ))}
          <path d="M110 90h70v110h110v50H110z" fill="#e9eef3" stroke={b.ink} strokeWidth="3" />
          <path d="M180 200l20-20h110l-20 20z" fill="#cfd9e2" stroke={b.ink} strokeWidth="3" />
          <path d="M180 90l20-20v110l-20 20z" fill="#bccad6" stroke={b.ink} strokeWidth="3" />
          <path d="M110 90l20-20h70l-20 20z" fill="#dde5ec" stroke={b.ink} strokeWidth="3" />
          {[125, 160].map((y) => (
            <circle key={y} cx="145" cy={y} r="9" fill={b.soft} stroke={b.ink} strokeWidth="3" />
          ))}
          {[225, 265].map((x) => (
            <circle key={x} cx={x} cy="225" r="9" fill={b.soft} stroke={b.ink} strokeWidth="3" />
          ))}
          <rect x="300" y="60" width="60" height="18" rx="9" fill={b.accent} />
          <circle cx="330" cy="110" r="7" fill="#1fb866" />
        </svg>
      );
    default:
      return <FamilyArt kind={kind} b={b} />;
  }
}

// --- the layouts -------------------------------------------------------------------------------

export function Wordmark({ b, size = 20 }: { b: Brand; size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.45 }}>
      <span
        style={{
          width: size * 1.2,
          height: size * 1.2,
          borderRadius: size * 0.35,
          background: b.accent,
          display: 'inline-block',
        }}
      />
      <span
        style={{
          fontSize: size,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontFamily: b.serif ? 'Georgia, "Times New Roman", serif' : 'var(--font-display)',
        }}
      >
        {b.name}
      </span>
    </div>
  );
}

function Pill({
  b,
  children,
  ghost = false,
  size = 16,
}: {
  b: Brand;
  children: ReactNode;
  ghost?: boolean;
  size?: number;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${size * 0.7}px ${size * 1.35}px`,
        borderRadius: 999,
        fontSize: size,
        fontWeight: 600,
        background: ghost ? 'transparent' : b.accent,
        color: ghost
          ? b.ink
          : (b.on ?? (b.bg === '#1b1310' || b.bg === '#0f1b2d' ? '#1b1310' : '#fff')),
        border: ghost ? `1.5px solid ${b.ink}33` : 'none',
      }}
    >
      {children}
    </span>
  );
}

export function DesktopSite({
  b,
  height = 800,
  variant = 'split',
}: {
  b: Brand;
  height?: number;
  variant?: 'split' | 'poster';
}) {
  const display = b.serif ? 'Georgia, "Times New Roman", serif' : 'var(--font-display)';
  if (variant === 'poster') {
    // The picture fills the frame and the words sit in a card at the lower left, so the middle
    // third — all a closed hero tile shows — is the picture.
    return (
      <div
        style={{
          position: 'relative',
          width: 1280,
          height,
          background: b.bg,
          color: b.ink,
          fontFamily: 'var(--font-sans)',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <Art kind={b.art} b={b} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 32,
            right: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 22px',
            borderRadius: 18,
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Wordmark b={b} size={20} />
          <div style={{ display: 'flex', gap: 30, fontSize: 15, color: b.muted }}>
            {b.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Pill b={b} size={15}>
            {b.cta}
          </Pill>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 32,
            bottom: 28,
            width: 400,
            padding: 30,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.92)',
            boxShadow: '0 30px 60px -30px rgba(0,0,0,0.35)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '6px 14px',
              borderRadius: 999,
              background: b.soft,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {b.kind}
          </div>
          <div
            style={{
              marginTop: 16,
              fontFamily: display,
              fontSize: 44,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
            }}
          >
            {b.headline}
          </div>
          <div style={{ marginTop: 20 }}>
            <Pill b={b} size={16}>
              {b.cta}
            </Pill>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 32, bottom: 28, display: 'flex', gap: 12 }}>
          {b.cards.map((card, i) => (
            <div
              key={card}
              style={{
                padding: '14px 20px',
                borderRadius: 16,
                background: i === 0 ? b.accent : 'rgba(255,255,255,0.9)',
                color: i === 0 ? (b.on ?? '#fff') : b.ink,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: display,
              }}
            >
              {card}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        width: 1280,
        height,
        background: b.bg,
        color: b.ink,
        fontFamily: 'var(--font-sans)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 64px',
        }}
      >
        <Wordmark b={b} size={22} />
        <div style={{ display: 'flex', gap: 36, fontSize: 16, color: b.muted }}>
          {b.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <Pill b={b}>{b.cta}</Pill>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.05fr',
          gap: 56,
          padding: '48px 64px 0',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              padding: '8px 16px',
              borderRadius: 999,
              background: b.soft,
              color: b.ink,
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 26,
            }}
          >
            {b.kind}
          </div>
          <div
            style={{
              fontFamily: display,
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              fontWeight: b.serif ? 400 : 700,
            }}
          >
            {b.headline}
          </div>
          <div
            style={{ marginTop: 26, fontSize: 20, lineHeight: 1.55, color: b.muted, maxWidth: 480 }}
          >
            {b.sub}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
            <Pill b={b} size={18}>
              {b.cta}
            </Pill>
            <Pill b={b} size={18} ghost>
              Learn more
            </Pill>
          </div>
        </div>
        <div
          style={{
            height: 470,
            borderRadius: 28,
            overflow: 'hidden',
            boxShadow: '0 30px 60px -30px rgba(0,0,0,0.35)',
          }}
        >
          <Art kind={b.art} b={b} />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          padding: '48px 64px',
        }}
      >
        {b.cards.map((card, i) => (
          <div
            key={card}
            style={{
              height: 150,
              borderRadius: 20,
              background: i === 0 ? b.accent : b.soft,
              color:
                i === 0
                  ? (b.on ?? (b.bg === '#1b1310' || b.bg === '#0f1b2d' ? '#1b1310' : '#fff'))
                  : b.ink,
              padding: 26,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: display,
            }}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileSite({ b }: { b: Brand }) {
  const display = b.serif ? 'Georgia, "Times New Roman", serif' : 'var(--font-display)';
  return (
    <div
      style={{
        width: 390,
        height: 672,
        background: b.bg,
        color: b.ink,
        fontFamily: 'var(--font-sans)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 22px 16px',
        }}
      >
        <Wordmark b={b} size={b.name.length > 22 ? 14 : 17} />
        <span style={{ display: 'grid', gap: 5 }}>
          <span style={{ width: 22, height: 2, background: b.ink, display: 'block' }} />
          <span style={{ width: 22, height: 2, background: b.ink, display: 'block' }} />
        </span>
      </div>
      <div style={{ margin: '4px 18px 0', height: 280, borderRadius: 24, overflow: 'hidden' }}>
        <Art kind={b.art} b={b} />
      </div>
      <div style={{ padding: '24px 22px 0' }}>
        <div
          style={{
            fontFamily: display,
            fontSize: 38,
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            fontWeight: b.serif ? 400 : 700,
          }}
        >
          {b.headline}
        </div>
        <div style={{ marginTop: 14, fontSize: 15, lineHeight: 1.5, color: b.muted }}>{b.sub}</div>
        <div style={{ marginTop: 22 }}>
          <Pill b={b} size={15}>
            {b.cta}
          </Pill>
        </div>
      </div>
    </div>
  );
}

/**
 * A concept site scaled into a frame of known size. `k` is the scale from the design size, fixed
 * per breakpoint by the caller's CSS (`--k`), so there is no measuring in script.
 */
export function Scaled({
  k,
  children,
  className = '',
}: {
  k?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={k ? ({ '--k': k } as CSSProperties) : undefined}
    >
      <div className="screen" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
