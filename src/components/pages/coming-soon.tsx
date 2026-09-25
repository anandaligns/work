import type { ReactNode } from 'react';

import { START, whatsappAbout } from '@/content/site';

import { RollLink } from '../ui/roll-link';
import { Actions, PageIntro } from './page-intro';

/**
 * The page a service or solution has until its own is written. Everything on the menus is on sale
 * now, so nothing links to a dead end: the page names the thing, says what it is in a line, says
 * plainly that the full page is on its way, and hands over to a conversation about it.
 *
 * These pages are `noindex` and stay out of the sitemap until their real content replaces them —
 * a thin page does a site's search standing no good.
 */
export function ComingSoon({
  eyebrow,
  name,
  line,
  children,
}: {
  eyebrow: string;
  name: string;
  line: string;
  children?: ReactNode;
}) {
  return (
    <>
      <PageIntro eyebrow={eyebrow} title={name} intro={line}>
        <p className="inline-flex items-center gap-2.5 rounded-full bg-fill px-4 py-2 text-sm text-ink-2">
          <span className="signal" aria-hidden="true" />
          This page is on its way. The service is available now.
        </p>
        <Actions>
          <RollLink href={START.href} size="lg">
            {`Talk to us about ${name}`}
          </RollLink>
          <RollLink href={whatsappAbout(name)} variant="line" size="lg" external>
            Ask on WhatsApp
          </RollLink>
        </Actions>
      </PageIntro>
      {children}
    </>
  );
}

/** The robots rule every coming-soon page carries. */
export const comingSoonRobots = { index: false, follow: true };
