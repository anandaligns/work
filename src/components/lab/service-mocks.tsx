import type { ComponentType } from 'react';

import { SERVICE_DASHBOARDS } from './service-dashboards';
import {
  AI_ASSISTANTS_MOCKS,
  AI_WORKFLOWS_MOCKS,
  API_INTEGRATIONS_MOCKS,
  BOOKING_MOCKS,
  BUSINESS_PLATFORMS_MOCKS,
  BUSINESS_WEBSITES_MOCKS,
  CRM_MOCKS,
  CUSTOMER_PORTALS_MOCKS,
  CUSTOM_SOFTWARE_MOCKS,
  DASHBOARDS_MOCKS,
  E_COMMERCE_MOCKS,
  INTERNAL_TOOLS_MOCKS,
  MOBILE_APPS_MOCKS,
  WEB_APPS_MOCKS,
  WHATSAPP_FEATURE_MOCKS,
} from '../showcase/sets';
import { BusinessWebsitesHow, BusinessWebsitesHowBox } from '../showcase/business-websites';
import { CustomerPortalsHow, CustomerPortalsHowBox } from '../showcase/customer-portals';
import { ECommerceHow, ECommerceHowBox } from '../showcase/e-commerce-stores';
import { AiAssistantsHow, AiAssistantsHowBox } from '../showcase/ai-assistants';
import { AiWorkflowsHow, AiWorkflowsHowBox } from '../showcase/ai-workflows';
import { ApiIntegrationsHow, ApiIntegrationsHowBox } from '../showcase/api-integrations';
import { BookingHow, BookingHowBox } from '../showcase/booking-payment-workflows';
import { BusinessPlatformsHow, BusinessPlatformsHowBox } from '../showcase/business-platforms';
import { CrmHow, CrmHowBox } from '../showcase/crm-systems';
import { CustomSoftwareHow, CustomSoftwareHowBox } from '../showcase/custom-software';
import { DashboardsHow, DashboardsHowBox } from '../showcase/dashboards';
import { InternalToolsHow, InternalToolsHowBox } from '../showcase/internal-tools';
import { MobileAppsHow, MobileAppsHowBox } from '../showcase/mobile-apps';
import { WebAppsHow, WebAppsHowBox } from '../showcase/web-apps';
import { PlatformMock, PlatformMockBox } from '../showcase/whatsapp-automation';

/**
 * Each service page's mockups, drawn in the light kit after the WhatsApp page: one per feature,
 * in the order the page lists them, and one for how it's built — and, where a page has one, the
 * dashboard beside what's included, after Lightfield's. Every service is here: its content
 * (`content/products/`) keeps no feature or "how" screens to fall back on.
 */
const MOCKS: Record<
  string,
  {
    features: ComponentType[];
    how: ComponentType;
    /** The dashboard beside what's included. */
    included?: ComponentType;
    /** How it's built laid out for a box beside its blocks: that section becomes a split. */
    howBox?: ComponentType;
  }
> = {
  'whatsapp-automation': {
    features: WHATSAPP_FEATURE_MOCKS,
    how: PlatformMock,
    howBox: PlatformMockBox,
  },
  'business-websites': {
    features: BUSINESS_WEBSITES_MOCKS,
    how: BusinessWebsitesHow,
    howBox: BusinessWebsitesHowBox,
  },
  'e-commerce-stores': { features: E_COMMERCE_MOCKS, how: ECommerceHow, howBox: ECommerceHowBox },
  'customer-portals': {
    features: CUSTOMER_PORTALS_MOCKS,
    how: CustomerPortalsHow,
    howBox: CustomerPortalsHowBox,
  },
  'web-apps': { features: WEB_APPS_MOCKS, how: WebAppsHow, howBox: WebAppsHowBox },
  'mobile-apps': { features: MOBILE_APPS_MOCKS, how: MobileAppsHow, howBox: MobileAppsHowBox },
  dashboards: { features: DASHBOARDS_MOCKS, how: DashboardsHow, howBox: DashboardsHowBox },
  'internal-tools': {
    features: INTERNAL_TOOLS_MOCKS,
    how: InternalToolsHow,
    howBox: InternalToolsHowBox,
  },
  'crm-systems': { features: CRM_MOCKS, how: CrmHow, howBox: CrmHowBox },
  'custom-software': {
    features: CUSTOM_SOFTWARE_MOCKS,
    how: CustomSoftwareHow,
    howBox: CustomSoftwareHowBox,
  },
  'business-platforms': {
    features: BUSINESS_PLATFORMS_MOCKS,
    how: BusinessPlatformsHow,
    howBox: BusinessPlatformsHowBox,
  },
  'booking-payment-workflows': { features: BOOKING_MOCKS, how: BookingHow, howBox: BookingHowBox },
  'api-integrations': {
    features: API_INTEGRATIONS_MOCKS,
    how: ApiIntegrationsHow,
    howBox: ApiIntegrationsHowBox,
  },
  'ai-assistants': {
    features: AI_ASSISTANTS_MOCKS,
    how: AiAssistantsHow,
    howBox: AiAssistantsHowBox,
  },
  'ai-workflows': { features: AI_WORKFLOWS_MOCKS, how: AiWorkflowsHow, howBox: AiWorkflowsHowBox },
};

/** With each page's dashboard beside what's included (`service-dashboards`). */
export const SERVICE_MOCKS: typeof MOCKS = Object.fromEntries(
  Object.entries(MOCKS).map(([slug, set]) => [
    slug,
    { ...set, included: set.included ?? SERVICE_DASHBOARDS[slug] },
  ]),
);
