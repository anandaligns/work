import { Actions, PageIntro } from '@/components/pages/page-intro';
import { RollLink } from '@/components/ui/roll-link';
import { START } from '@/content/site';

/** Any address the site does not have. Next marks the response 404 and `noindex` itself. */

export default function NotFound() {
  return (
    <PageIntro
      eyebrow="Page not found"
      title="This page moved or never existed."
      intro="Try one of these instead."
    >
      <Actions>
        <RollLink href="/" size="lg">
          Home
        </RollLink>
        <RollLink href="/#pricing" variant="line" size="lg">
          See plans and prices
        </RollLink>
        <RollLink href={START.href} variant="line" size="lg">
          {START.label}
        </RollLink>
      </Actions>
    </PageIntro>
  );
}
