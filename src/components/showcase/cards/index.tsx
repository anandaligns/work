import type { ComponentType } from 'react';

import { BRANDS } from '../../visuals/concept-sites';
import { ProjectFan } from '../../visuals/project-fan';
import * as AiAssistants from './ai-assistants';
import * as AiWorkflows from './ai-workflows';
import * as ApiIntegrations from './api-integrations';
import * as BookingPaymentWorkflows from './booking-payment-workflows';
import * as BusinessDashboardCrm from './business-dashboard-crm';
import * as BusinessPlatforms from './business-platforms';
import * as BusinessWebsites from './business-websites';
import * as CrmSystems from './crm-systems';
import * as CustomerPortals from './customer-portals';
import * as CustomSoftware from './custom-software';
import * as Dashboards from './dashboards';
import * as ECommerceStores from './e-commerce-stores';
import * as Evolve from './evolve';
import * as InternalTools from './internal-tools';
import * as LeadAutomation from './lead-automation';
import * as MobileApps from './mobile-apps';
import * as OnlineStoreAndBookings from './online-store-and-bookings';
import * as WebApps from './web-apps';
import * as WebsiteCareHosting from './website-care-hosting';
import * as WhatsappAutomation from './whatsapp-automation';

/**
 * Every service and solution page's five screens for its point of view, in the fan
 * (`visuals/project-fan.tsx`). Built here, on the server, from the screens' client modules, so the
 * fan receives them as elements.
 */
const CARDS: Record<string, readonly [string, ComponentType][]> = {
  'business-websites': [
    ['found', BusinessWebsites.Found],
    ['book', BusinessWebsites.Book],
    ['home', BusinessWebsites.Home],
    ['inbox', BusinessWebsites.Inbox],
    ['measured', BusinessWebsites.Measured],
  ],
  'e-commerce-stores': [
    ['checkout', ECommerceStores.Checkout],
    ['stock', ECommerceStores.Stock],
    ['product', ECommerceStores.Product],
    ['shipped', ECommerceStores.Shipped],
    ['orders', ECommerceStores.Orders],
  ],
  'customer-portals': [
    ['sign-in', CustomerPortals.SignIn],
    ['invoices', CustomerPortals.Invoices],
    ['order', CustomerPortals.Order],
    ['quote', CustomerPortals.Quote],
    ['documents', CustomerPortals.Documents],
  ],
  'web-apps': [
    ['pickup', WebApps.Pickup],
    ['job', WebApps.Job],
    ['loads', WebApps.Loads],
    ['team', WebApps.Team],
    ['today', WebApps.Today],
  ],
  'mobile-apps': [
    ['lock', MobileApps.Lock],
    ['table', MobileApps.Table],
    ['usual', MobileApps.Usual],
    ['stores', MobileApps.Stores],
    ['kitchen', MobileApps.Kitchen],
  ],
  dashboards: [
    ['sources', Dashboards.Sources],
    ['region', Dashboards.Region],
    ['morning', Dashboards.Morning],
    ['flags', Dashboards.Flags],
    ['targets', Dashboards.Targets],
  ],
  'internal-tools': [
    ['tasks', InternalTools.Tasks],
    ['admission', InternalTools.Admission],
    ['approve', InternalTools.Approve],
    ['roles', InternalTools.Roles],
    ['class', InternalTools.Class],
  ],
  'crm-systems': [
    ['record', CrmSystems.Record],
    ['follow-ups', CrmSystems.FollowUps],
    ['new-lead', CrmSystems.NewLead],
    ['farah', CrmSystems.Farah],
    ['funnelled', CrmSystems.Funnelled],
  ],
  'custom-software': [
    ['projects', CustomSoftware.Projects],
    ['week', CustomSoftware.Week],
    ['approvals', CustomSoftware.Approvals],
    ['diary', CustomSoftware.Diary],
    ['phases', CustomSoftware.Phases],
  ],
  'business-platforms': [
    ['members', BusinessPlatforms.Members],
    ['billing', BusinessPlatforms.Billing],
    ['signup', BusinessPlatforms.Signup],
    ['admin', BusinessPlatforms.Admin],
    ['retention', BusinessPlatforms.Retention],
  ],
  'whatsapp-automation': [
    ['reminder', WhatsappAutomation.Reminder],
    ['follow-up', WhatsappAutomation.FollowUp],
    ['answered', WhatsappAutomation.Answered],
    ['paid', WhatsappAutomation.Paid],
    ['handover', WhatsappAutomation.Handover],
  ],
  'booking-payment-workflows': [
    ['calendar', BookingPaymentWorkflows.Calendar],
    ['deposit', BookingPaymentWorkflows.Deposit],
    ['slots', BookingPaymentWorkflows.Slots],
    ['confirmed', BookingPaymentWorkflows.Confirmed],
    ['changes', BookingPaymentWorkflows.Changes],
  ],
  'api-integrations': [
    ['settled', ApiIntegrations.Settled],
    ['failures', ApiIntegrations.Failures],
    ['booking', ApiIntegrations.Booking],
    ['packages', ApiIntegrations.Packages],
    ['keys', ApiIntegrations.Keys],
  ],
  'ai-assistants': [
    ['lead', AiAssistants.Lead],
    ['knowledge', AiAssistants.Knowledge],
    ['answers', AiAssistants.Answers],
    ['trust', AiAssistants.Trust],
    ['month', AiAssistants.Month],
  ],
  'ai-workflows': [
    ['reading', AiWorkflows.Reading],
    ['exceptions', AiWorkflows.Exceptions],
    ['scan', AiWorkflows.Scan],
    ['approval', AiWorkflows.Approval],
    ['summary', AiWorkflows.Summary],
  ],
  evolve: [
    ['requests', Evolve.Requests],
    ['watched', Evolve.Watched],
    ['normal', Evolve.Normal],
    ['backups', Evolve.Backups],
    ['report', Evolve.Report],
  ],
  'lead-automation': [
    ['sources', LeadAutomation.Sources],
    ['follow-ups', LeadAutomation.FollowUps],
    ['reply', LeadAutomation.Reply],
    ['record', LeadAutomation.Record],
    ['week', LeadAutomation.Week],
  ],
  'online-store-and-bookings': [
    ['checkout', OnlineStoreAndBookings.Checkout],
    ['paid', OnlineStoreAndBookings.Paid],
    ['shop', OnlineStoreAndBookings.Shop],
    ['told', OnlineStoreAndBookings.Told],
    ['left', OnlineStoreAndBookings.Left],
  ],
  'business-dashboard-crm': [
    ['connected', BusinessDashboardCrm.Connected],
    ['outlets', BusinessDashboardCrm.Outlets],
    ['monday', BusinessDashboardCrm.Monday],
    ['flags', BusinessDashboardCrm.Flags],
    ['whitefield', BusinessDashboardCrm.Whitefield],
  ],
  'website-care-hosting': [
    ['move', WebsiteCareHosting.Move],
    ['watched', WebsiteCareHosting.Watched],
    ['night', WebsiteCareHosting.Night],
    ['changes', WebsiteCareHosting.Changes],
    ['ask', WebsiteCareHosting.Ask],
  ],
};

/** Each service's sample business, whose own colour its screens carry (its buttons, its chosen slot). */
const BUSINESS: Record<string, string> = {
  'business-websites': 'interiordesign',
  'e-commerce-stores': 'fashionstore',
  'customer-portals': 'partsdistributor',
  'web-apps': 'logistics',
  'mobile-apps': 'restaurant',
  dashboards: 'solarenergy',
  'internal-tools': 'school',
  'crm-systems': 'realestate',
  'custom-software': 'construction',
  'business-platforms': 'recruitment',
  'whatsapp-automation': 'dentalclinic',
  'booking-payment-workflows': 'salon',
  'api-integrations': 'travelagency',
  'ai-assistants': 'lawfirm',
  'ai-workflows': 'accounting',
};

/** A page's five screens, fanned, opening on a press. */
export function PageFan({
  slug,
  name,
  accent,
}: {
  slug: string;
  /** The page's name, for the overlay's heading. */
  name: string;
  /** The page's colour. */
  accent: string;
}) {
  const cards = CARDS[slug];
  if (!cards) return null;
  const business = BUSINESS[slug];
  const brand = business ? BRANDS[business]?.accent : undefined;
  return (
    <ProjectFan
      title={name}
      note="Five screens from an example build"
      accent={accent}
      brand={brand}
      cards={cards.map(([id, Screen]) => ({ id, content: <Screen /> }))}
    />
  );
}
