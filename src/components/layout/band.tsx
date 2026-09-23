import type { ReactNode } from 'react';

/**
 * A section: edge to edge, with a hairline on top, and its content in the shared container.
 * `contain={false}` hands the full width to the children — for a section that has something
 * meant to bleed past the column, like the Work gallery, and places its own container inside.
 */
export function Band({
  id,
  labelledBy,
  className = '',
  contain = true,
  children,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  contain?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`band ${className}`}>
      {contain ? <div className="contain">{children}</div> : children}
    </section>
  );
}
