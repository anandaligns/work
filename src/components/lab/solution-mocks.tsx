import type { ComponentType } from 'react';

import { FollowUpMock, ReplyMock, SourcesMock, SystemMock, WorkspaceMock } from './mocks-lead';
import { KEEP_BEHIND, KeepBenefits, KeepHow } from './mocks-keep';
import { RUN_BEHIND, RunBenefits, RunHow } from './mocks-run';
import { SELL_BEHIND, SellBenefits, SellHow } from './mocks-sell';

/**
 * Each solution page's mockups, in its own colour and from its own sample business: the three
 * behind the system, in order, then how it works and what changes, after Lightfield's windows.
 */
export const SOLUTION_PAGE_MOCKS: Record<
  string,
  { behind: ComponentType[]; how: ComponentType; benefits: ComponentType }
> = {
  'lead-automation': {
    behind: [SourcesMock, ReplyMock, FollowUpMock],
    how: SystemMock,
    benefits: WorkspaceMock,
  },
  'online-store-and-bookings': { behind: SELL_BEHIND, how: SellHow, benefits: SellBenefits },
  'business-dashboard-crm': { behind: RUN_BEHIND, how: RunHow, benefits: RunBenefits },
  'website-care-hosting': { behind: KEEP_BEHIND, how: KeepHow, benefits: KeepBenefits },
};
