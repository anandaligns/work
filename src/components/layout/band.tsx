import type { ReactNode } from 'react';

import { BrandPattern } from '../visuals/brand-pattern';

/**
 * A section: edge to edge, with a hairline on top, and its content in the page's one fluid
 * container (`.container-fluid`).
 * `contain={false}` hands the full width to the children — for a section that has something
 * meant to bleed past the column, like the Work gallery, and places its own container inside.
 *
 * `pattern` lays the identity's cover under the whole band — for a Graphite Ink band. `seed`
 * picks the arrangement.
 */
export function Band({
  id,
  labelledBy,
  className = '',
  contain = true,
  pattern,
  seed,
  children,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  contain?: boolean;
  pattern?: boolean;
  seed?: number;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`band ${className}`}>
      {pattern ? <BrandPattern seed={seed} /> : null}
      {contain ? <div className="container-fluid relative">{children}</div> : children}
    </section>
  );
}
