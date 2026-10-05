import type { CSSProperties, ReactNode } from 'react';

import { BlurText } from '../motion/blur-text';
import { ModuleField } from '../motion/module-field';
import { Pausable } from '../motion/pause-toggle';
import { type Crumb, PageTrail } from './page-trail';

/**
 * The opening of every page but home: the hero's chip, its blur-in headline and its moving
 * pattern, at a page's scale. A newline in `title` is where the headline breaks on a wide screen.
 * The page's one `h1` is here; every heading after it is an `h2`. Given a `trail`, the page's
 * place in the site sits above the chip as beUI's breadcrumb.
 */
export function PageIntro({
  eyebrow,
  title,
  intro,
  trail,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** The steps after Home, this page last. */
  trail?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-heading"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[3.4375rem] hidden h-[36rem] md:block">
        <Pausable
          label="the moving pattern"
          className="module-field h-full"
          buttonClassName="pointer-events-auto top-4 left-5"
        >
          <ModuleField bottom={520} />
        </Pausable>
      </div>
      <div className="container-fluid relative">
        <div className="mx-auto max-w-4xl text-center">
          {trail ? <PageTrail trail={trail} className="rise-in mb-6" /> : null}
          <p
            className="eyebrow blur-char inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5"
            style={{ '--d': 0 } as CSSProperties}
          >
            <span className="size-1.5 rounded-full bg-signal-green" />
            {eyebrow}
          </p>
          <h1
            id="page-heading"
            className="mt-6 text-title tracking-[var(--tracking-heading)] text-ink"
          >
            <BlurText text={title} delay={120} />
          </h1>
          {intro ? (
            <p
              className="rise-in mx-auto mt-5 max-w-xl text-lead text-ink-2"
              style={{ '--d': 520 } as CSSProperties}
            >
              {intro}
            </p>
          ) : null}
          {children ? (
            <div
              className="rise-in mt-8 flex flex-col items-center gap-6"
              style={{ '--d': 680 } as CSSProperties}
            >
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** A row of the page's actions, centred under its intro. */
export function Actions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center justify-center gap-3">{children}</div>;
}
