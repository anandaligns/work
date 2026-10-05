import aiAssistants from './ai-assistants';
import aiWorkflows from './ai-workflows';
import apiIntegrations from './api-integrations';
import bookingPaymentWorkflows from './booking-payment-workflows';
import businessPlatforms from './business-platforms';
import businessWebsites from './business-websites';
import crmSystems from './crm-systems';
import customSoftware from './custom-software';
import customerPortals from './customer-portals';
import dashboards from './dashboards';
import eCommerceStores from './e-commerce-stores';
import evolve from './evolve';
import internalTools from './internal-tools';
import keepItImproving from './keep-it-improving';
import mobileApps from './mobile-apps';
import neverMissALead from './never-miss-a-lead';
import runItInOnePlace from './run-it-in-one-place';
import sellAndBookOnline from './sell-and-book-online';
import webApps from './web-apps';
import whatsappAutomation from './whatsapp-automation';
import type { ProductPage } from './types';

export type { ProductPage } from './types';

/**
 * The service, solution and Evolve pages presented as products (Apple's way of explaining
 * iPhone, in Lightfield's layout).
 */
const products: Record<string, ProductPage> = {
  'ai-assistants': aiAssistants,
  'ai-workflows': aiWorkflows,
  'api-integrations': apiIntegrations,
  'booking-payment-workflows': bookingPaymentWorkflows,
  'business-platforms': businessPlatforms,
  'business-websites': businessWebsites,
  'crm-systems': crmSystems,
  'custom-software': customSoftware,
  'customer-portals': customerPortals,
  dashboards: dashboards,
  'e-commerce-stores': eCommerceStores,
  evolve: evolve,
  'internal-tools': internalTools,
  'website-care-hosting': keepItImproving,
  'mobile-apps': mobileApps,
  'lead-automation': neverMissALead,
  'business-dashboard-crm': runItInOnePlace,
  'online-store-and-bookings': sellAndBookOnline,
  'web-apps': webApps,
  'whatsapp-automation': whatsappAutomation,
};

export const productFor = (slug: string): ProductPage | undefined => products[slug];
