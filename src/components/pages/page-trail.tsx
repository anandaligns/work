'use client';

import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/motion/breadcrumb';

/** One step of a page's trail: its name and its path. */
export type Crumb = { name: string; path: string };

/**
 * Where a page sits, above its headline: beUI's breadcrumb (`@beui/breadcrumb`), Home first and
 * the page itself last. The same steps as the page's BreadcrumbList data, so what a reader sees
 * and what a search engine reads agree. Four steps fit across a centred opening, three in a split
 * opening's narrow column; a deeper page folds its middle ones into beUI's ellipsis, which opens
 * on hover, click or the down arrow.
 */
export function PageTrail({
  trail,
  align = 'center',
  className = '',
}: {
  /** Every step after Home, the current page last. */
  trail: Crumb[];
  align?: 'center' | 'start';
  className?: string;
}) {
  const steps: Crumb[] = [{ name: 'Home', path: '/' }, ...trail];
  return (
    <Breadcrumb className={`page-trail ${className}`}>
      <BreadcrumbList
        maxItems={align === 'center' ? 4 : 3}
        overflowLabel="Show the pages in between"
        className={align === 'center' ? 'justify-center' : 'justify-start'}
      >
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <BreadcrumbItem key={step.path}>
              {i > 0 ? <BreadcrumbSeparator /> : null}
              {last ? (
                <BreadcrumbPage>{step.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={step.path}
                  render={({ href, ...props }) => <Link href={href ?? step.path} {...props} />}
                >
                  {step.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
