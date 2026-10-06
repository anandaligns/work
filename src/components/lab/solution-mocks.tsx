import type { ComponentType } from 'react';

import * as Run from '../showcase/business-dashboard-crm';
import * as Lead from '../showcase/lead-automation';
import * as Sell from '../showcase/online-store-and-bookings';
import * as Keep from '../showcase/website-care-hosting';

/**
 * Each solution page's mockups, in its own colour and from its own sample business: the three
 * behind the system, in order, then how it works and what changes — all in the showcase kit
 * (`components/showcase`), as the home Services pictures are drawn. The pictures are client
 * components; their lists are built here, on the server's side of the line.
 */
export const SOLUTION_PAGE_MOCKS: Record<
  string,
  { behind: ComponentType[]; how: ComponentType; benefits: ComponentType }
> = {
  'lead-automation': {
    behind: [Lead.SourcesMock, Lead.ReplyMock, Lead.FollowUpMock],
    how: Lead.SystemMock,
    benefits: Lead.WorkspaceMock,
  },
  'online-store-and-bookings': {
    behind: [Sell.CheckoutMock, Sell.PaidMock, Sell.ToldMock],
    how: Sell.SellHow,
    benefits: Sell.SellBenefits,
  },
  'business-dashboard-crm': {
    behind: [Run.ConnectedMock, Run.OutletsMock, Run.FlagsMock],
    how: Run.RunHow,
    benefits: Run.RunBenefits,
  },
  'website-care-hosting': {
    behind: [Keep.MovedMock, Keep.WatchedMock, Keep.ChangesMock],
    how: Keep.KeepHow,
    benefits: Keep.KeepBenefits,
  },
};
