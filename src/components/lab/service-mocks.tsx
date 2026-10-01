import type { ComponentType } from 'react';

import { BUSINESS_WEBSITES_MOCKS, BusinessWebsitesHow } from './mocks-business-websites';
import { CUSTOMER_PORTALS_MOCKS, CustomerPortalsHow } from './mocks-customer-portals';
import { E_COMMERCE_MOCKS, ECommerceHow } from './mocks-e-commerce-stores';
import { AI_ASSISTANTS_MOCKS, AiAssistantsHow } from './mocks-ai-assistants';
import { AI_WORKFLOWS_MOCKS, AiWorkflowsHow } from './mocks-ai-workflows';
import { API_INTEGRATIONS_MOCKS, ApiIntegrationsHow } from './mocks-api-integrations';
import { BOOKING_MOCKS, BookingHow } from './mocks-booking-payment-workflows';
import { BUSINESS_PLATFORMS_MOCKS, BusinessPlatformsHow } from './mocks-business-platforms';
import { CRM_MOCKS, CrmHow } from './mocks-crm-systems';
import { CUSTOM_SOFTWARE_MOCKS, CustomSoftwareHow } from './mocks-custom-software';
import { DASHBOARDS_MOCKS, DashboardsHow } from './mocks-dashboards';
import { INTERNAL_TOOLS_MOCKS, InternalToolsHow } from './mocks-internal-tools';
import { MOBILE_APPS_MOCKS, MobileAppsHow } from './mocks-mobile-apps';
import { WEB_APPS_MOCKS, WebAppsHow } from './mocks-web-apps';
import { PlatformMock, WHATSAPP_FEATURE_MOCKS } from './mocks-whatsapp';

/**
 * Each service page's mockups, drawn in the light kit after the WhatsApp page: one per feature,
 * in the order the page lists them, and one for how it's built. Every service is here: its content
 * (`content/products/`) keeps no feature or "how" screens to fall back on.
 */
export const SERVICE_MOCKS: Record<string, { features: ComponentType[]; how: ComponentType }> = {
  'whatsapp-automation': { features: WHATSAPP_FEATURE_MOCKS, how: PlatformMock },
  'business-websites': { features: BUSINESS_WEBSITES_MOCKS, how: BusinessWebsitesHow },
  'e-commerce-stores': { features: E_COMMERCE_MOCKS, how: ECommerceHow },
  'customer-portals': { features: CUSTOMER_PORTALS_MOCKS, how: CustomerPortalsHow },
  'web-apps': { features: WEB_APPS_MOCKS, how: WebAppsHow },
  'mobile-apps': { features: MOBILE_APPS_MOCKS, how: MobileAppsHow },
  dashboards: { features: DASHBOARDS_MOCKS, how: DashboardsHow },
  'internal-tools': { features: INTERNAL_TOOLS_MOCKS, how: InternalToolsHow },
  'crm-systems': { features: CRM_MOCKS, how: CrmHow },
  'custom-software': { features: CUSTOM_SOFTWARE_MOCKS, how: CustomSoftwareHow },
  'business-platforms': { features: BUSINESS_PLATFORMS_MOCKS, how: BusinessPlatformsHow },
  'booking-payment-workflows': { features: BOOKING_MOCKS, how: BookingHow },
  'api-integrations': { features: API_INTEGRATIONS_MOCKS, how: ApiIntegrationsHow },
  'ai-assistants': { features: AI_ASSISTANTS_MOCKS, how: AiAssistantsHow },
  'ai-workflows': { features: AI_WORKFLOWS_MOCKS, how: AiWorkflowsHow },
};
