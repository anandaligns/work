import { Band } from '../layout/band';
import { WebPageStructuredData } from '../seo/web-page-data';
import { PageIntro } from './page-intro';

/**
 * A plain-language policy page: the intro, then short sections in one readable column. Written
 * for the site as it stands — no forms, no analytics — and to be revised, and reviewed by a
 * lawyer, before either is added.
 */
export type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  path,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  /** The page's own address, for its structured data. */
  path?: string;
}) {
  return (
    <>
      {path ? <WebPageStructuredData name={eyebrow} description={intro} path={path} /> : null}
      <PageIntro
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        trail={path ? [{ name: eyebrow, path }] : undefined}
      />
      <div className="alt-bands">
        <Band className="py-20 lg:py-28">
          <div className="mx-auto flex max-w-2xl flex-col gap-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-h4 font-medium text-ink">{section.heading}</h2>
                <div className="mt-3 flex flex-col gap-3 text-body text-ink-2">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            <p className="border-t border-line pt-6 font-tech text-xs text-ink-2">
              Last updated {updated}
            </p>
          </div>
        </Band>
      </div>
    </>
  );
}
