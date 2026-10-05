import type { ComponentType } from 'react';

import { SERVICE_DASHBOARDS } from './service-dashboards';
import {
  BUSINESS_WEBSITES_MOCKS,
  BusinessWebsitesHow,
  BusinessWebsitesHowBox,
} from './mocks-business-websites';
import {
  CUSTOMER_PORTALS_MOCKS,
  CustomerPortalsHow,
  CustomerPortalsHowBox,
} from './mocks-customer-portals';
import { E_COMMERCE_MOCKS, ECommerceHow, ECommerceHowBox } from './mocks-e-commerce-stores';
import { AI_ASSISTANTS_MOCKS, AiAssistantsHow, AiAssistantsHowBox } from './mocks-ai-assistants';
import { AI_WORKFLOWS_MOCKS, AiWorkflowsHow, AiWorkflowsHowBox } from './mocks-ai-workflows';
import {
  API_INTEGRATIONS_MOCKS,
  ApiIntegrationsHow,
  ApiIntegrationsHowBox,
} from './mocks-api-integrations';
import { BOOKING_MOCKS, BookingHow, BookingHowBox } from './mocks-booking-payment-workflows';
import {
  BUSINESS_PLATFORMS_MOCKS,
  BusinessPlatformsHow,
  BusinessPlatformsHowBox,
} from './mocks-business-platforms';
import { CRM_MOCKS, CrmHow, CrmHowBox } from './mocks-crm-systems';
import {
  CUSTOM_SOFTWARE_MOCKS,
  CustomSoftwareHow,
  CustomSoftwareHowBox,
} from './mocks-custom-software';
import { DASHBOARDS_MOCKS, DashboardsHow, DashboardsHowBox } from './mocks-dashboards';
import {
  INTERNAL_TOOLS_MOCKS,
  InternalToolsHow,
  InternalToolsHowBox,
} from './mocks-internal-tools';
import { MOBILE_APPS_MOCKS, MobileAppsHow, MobileAppsHowBox } from './mocks-mobile-apps';
import { WEB_APPS_MOCKS, WebAppsHow, WebAppsHowBox } from './mocks-web-apps';
import { PlatformMock, PlatformMockBox, WHATSAPP_FEATURE_MOCKS } from './mocks-whatsapp';

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
