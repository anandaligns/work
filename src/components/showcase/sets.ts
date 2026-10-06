import * as AiWorkflows from './ai-workflows';
import * as AiAssistants from './ai-assistants';
import * as ApiIntegrations from './api-integrations';
import * as BookingPaymentWorkflows from './booking-payment-workflows';
import * as WhatsappAutomation from './whatsapp-automation';
import * as WebApps from './web-apps';
import * as MobileApps from './mobile-apps';
import * as InternalTools from './internal-tools';
import * as ECommerceStores from './e-commerce-stores';
import * as Dashboards from './dashboards';
import * as CustomerPortals from './customer-portals';
import * as CustomSoftware from './custom-software';
import * as CrmSystems from './crm-systems';
import * as BusinessWebsites from './business-websites';
import * as BusinessPlatforms from './business-platforms';
/**
 * Each service page's mockups, in the order its features are listed. The pictures are client
 * components (they move on screen); the lists of them live here, on the server's side of the line,
 * because only the components themselves can cross it.
 */

export const BUSINESS_PLATFORMS_MOCKS = [
  BusinessPlatforms.SignupMock,
  BusinessPlatforms.MembersMock,
  BusinessPlatforms.BillingMock,
  BusinessPlatforms.AdminMock,
  BusinessPlatforms.GrowthMock,
];

export const BUSINESS_WEBSITES_MOCKS = [
  BusinessWebsites.SearchMock,
  BusinessWebsites.BookMock,
  BusinessWebsites.MailMock,
  BusinessWebsites.AnalyticsMock,
  BusinessWebsites.SpeedMock,
];

export const CRM_MOCKS = [
  CrmSystems.RecordMock,
  CrmSystems.RoutingMock,
  CrmSystems.FollowUpsMock,
  CrmSystems.ChatMock,
  CrmSystems.ReportsMock,
];

export const CUSTOM_SOFTWARE_MOCKS = [
  CustomSoftware.OrdersMock,
  CustomSoftware.ApprovalsMock,
  CustomSoftware.ReportsMock,
  CustomSoftware.PhasesMock,
  CustomSoftware.PlanMock,
];

export const CUSTOMER_PORTALS_MOCKS = [
  CustomerPortals.ProgressMock,
  CustomerPortals.PaymentsMock,
  CustomerPortals.RequestsMock,
  CustomerPortals.ProjectsMock,
  CustomerPortals.DocumentsMock,
];

export const DASHBOARDS_MOCKS = [
  Dashboards.DigestMock,
  Dashboards.SourcesMock,
  Dashboards.FiltersMock,
  Dashboards.FlagsMock,
  Dashboards.TargetsMock,
];

export const E_COMMERCE_MOCKS = [
  ECommerceStores.CheckoutMock,
  ECommerceStores.StockMock,
  ECommerceStores.ShippedMock,
  ECommerceStores.OrdersMock,
  ECommerceStores.SalesMock,
];

export const INTERNAL_TOOLS_MOCKS = [
  InternalTools.TasksMock,
  InternalTools.ApproveMock,
  InternalTools.HistoryMock,
  InternalTools.RolesMock,
  InternalTools.ScheduleMock,
];

export const MOBILE_APPS_MOCKS = [
  MobileApps.RegularsMock,
  MobileApps.NotificationsMock,
  MobileApps.BookingMock,
  MobileApps.YoursMock,
  MobileApps.KitchenMock,
];

export const WEB_APPS_MOCKS = [
  WebApps.InstallMock,
  WebApps.ReorderMock,
  WebApps.FlowMock,
  WebApps.RolesMock,
  WebApps.RoutesMock,
];

export const WHATSAPP_FEATURE_MOCKS = [
  WhatsappAutomation.InstantReplyMock,
  WhatsappAutomation.RemindersMock,
  WhatsappAutomation.FollowUpsMock,
  WhatsappAutomation.PaymentMock,
  WhatsappAutomation.HandoverMock,
];

export const BOOKING_MOCKS = [
  BookingPaymentWorkflows.BookMock,
  BookingPaymentWorkflows.PayMock,
  BookingPaymentWorkflows.ConfirmedMock,
  BookingPaymentWorkflows.CancellationsMock,
  BookingPaymentWorkflows.ChartMock,
];

export const API_INTEGRATIONS_MOCKS = [
  ApiIntegrations.MappingMock,
  ApiIntegrations.ReconMock,
  ApiIntegrations.ErrorsMock,
  ApiIntegrations.SheetMock,
  ApiIntegrations.RequestsMock,
];

export const AI_ASSISTANTS_MOCKS = [
  AiAssistants.WidgetMock,
  AiAssistants.TrustMock,
  AiAssistants.LeadMock,
  AiAssistants.KnowledgeMock,
  AiAssistants.InsightsMock,
];

export const AI_WORKFLOWS_MOCKS = [
  AiWorkflows.QueueMock,
  AiWorkflows.ExceptionsMock,
  AiWorkflows.ApproveMock,
  AiWorkflows.ScanMock,
  AiWorkflows.SummaryMock,
];
