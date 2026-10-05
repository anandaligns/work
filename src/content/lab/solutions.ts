import { content as keepItImproving } from './keep-it-improving';
import { content as neverMissALead } from './never-miss-a-lead';
import { content as runItInOnePlace } from './run-it-in-one-place';
import { content as sellAndBookOnline } from './sell-and-book-online';
import type { SolutionContent } from './solution';

/** Every solution page's own words, by its slug (`components/solutions/solution-page`). */
export const SOLUTION_CONTENT: Record<string, SolutionContent> = {
  'lead-automation': neverMissALead,
  'online-store-and-bookings': sellAndBookOnline,
  'business-dashboard-crm': runItInOnePlace,
  'website-care-hosting': keepItImproving,
};
