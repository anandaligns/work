import { existsSync } from 'node:fs';
import { join } from 'node:path';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import type { Tint } from '@/content/pages';
import { sectors } from '@/content/site';

import { MARKS, TINTS } from '../home/sectors';
import { Band } from '../layout/band';
import { Icon } from '../ui/icon';
import { TINT_BG } from '../visuals/scene-panel';

/**
 * The parts a product page shares with the rest of the site — words with links and lead-ins, the
 * point of view with its photograph, the section head, how it's built with how we build it, and
 * who it's for — in Lightfield's rhythm and our own type and ink. Every word here is HTML, so it
 * is read and indexed; every screen is decorative.
 */

/**
 * Words that may carry links and lead-ins, written in the content files as `[words](/path)` and
 * `**words**`: a link becomes a quiet underlined link to another page of the site, a lead-in the
 * bold opening of a paragraph, as Apple opens each feature ("**Pro controls.** In the Camera app…").
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          return (
            <Link
              key={i}
              href={link[2]!}
              className="text-ink underline decoration-line-2 underline-offset-[3px] transition-colors hover:decoration-ink"
            >
              {link[1]}
            </Link>
          );
        }
        const bold = /^\*\*([^*]+)\*\*$/.exec(part);
        return bold ? (
          <strong key={i} className="font-semibold text-ink">
            {bold[1]}
          </strong>
        ) : (
          part
        );
      })}
    </>
  );
}

/** The same words with the markup taken out — for structured data and meta. */
export const plain = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');

// --- the point of view ------------------------------------------------------------------------

/**
 * One photograph of the people the page is for, 3:2, rounded, slightly warm. Until the photo is
 * in `public/photos/` — `<file>-800` and `<file>-1600`, in AVIF and WebP — a quiet panel of the
 * page's tint holds its place; on the dev server it shows the file it is waiting for.
 */
export function Photo({ file, alt, tint }: { file: string; alt: string; tint: Tint }) {
  const ready = existsSync(join(process.cwd(), 'public/photos', `${file}-1600.webp`));
  if (ready) {
    return (
      <picture>
        <source
          type="image/avif"
          srcSet={`/photos/${file}-800.avif 800w, /photos/${file}-1600.avif 1600w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <img
          src={`/photos/${file}-1600.webp`}
          srcSet={`/photos/${file}-800.webp 800w, /photos/${file}-1600.webp 1600w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={alt}
          width={1600}
          height={1067}
          loading="lazy"
          decoding="async"
          className="aspect-[3/2] h-auto w-full rounded-[var(--radius-panel)] object-cover saturate-[0.9] sepia-[0.08]"
        />
      </picture>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`grid aspect-[3/2] w-full place-items-center rounded-[var(--radius-panel)] border border-line ${TINT_BG[tint]}`}
    >
      <span className="flex flex-col items-center gap-2 text-ink-3">
        <Icon name="eye" size={22} />
        {process.env.NODE_ENV === 'development' ? (
          <span className="font-tech text-xs">{file}</span>
        ) : null}
      </span>
    </div>
  );
}

export function PointOfView({
  statement,
  body,
  photo,
}: {
  statement: string;
  body: string[];
  photo: ReactNode;
}) {
  return (
    <Band labelledBy="view-heading" className="py-24 lg:py-36">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-xl">
          <h2
            id="view-heading"
            className="text-h2 tracking-[var(--tracking-heading)] text-balance text-ink"
          >
            {statement}
          </h2>
          {body.map((paragraph) => (
            <p key={paragraph} data-reveal="" className="mt-6 text-body text-ink-2">
              <Rich text={paragraph} />
            </p>
          ))}
        </div>
        <div data-reveal="">{photo}</div>
      </div>
    </Band>
  );
}

// --- the shared section head ------------------------------------------------------------------------

export function Head({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
        <span className="size-1.5 bg-ink" />
        {eyebrow}
      </p>
      <h2 id={`${id}-heading`} className="mt-5 text-h2 tracking-[var(--tracking-heading)] text-ink">
        {title}
      </h2>
      {intro ? (
        <p data-reveal="" className="mt-5 text-body text-ink-2">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

// --- how it's built -------------------------------------------------------------------------

/**
 * How it's built, as one panel: the blocks that explain it, the system at work on two devices,
 * and at the foot of the same grey panel how we build it and what it works with.
 */
export function UnderTheHood({
  eyebrow,
  heading,
  blocks,
  scene,
  build,
  after,
  bare = false,
}: {
  eyebrow: string;
  heading: string;
  blocks: { title: string; body: string }[];
  scene: ReactNode;
  /** How we build it: the numbered track under the picture. */
  build: { heading: string; steps: { title: string; body: string }[] };
  /** The last thing in the panel: the tools it works with. */
  after?: ReactNode;
  /** On a service page: no panel, so the picture and the tool rows sit on the band, full width. */
  bare?: boolean;
}) {
  return (
    <Band id="how" labelledBy="how-heading" className="py-24 lg:py-32">
      <Head id="how" eyebrow={eyebrow} title={heading} />
      <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block, i) => (
          <div key={block.title} data-reveal="" style={{ '--i': i } as CSSProperties}>
            <dt className="text-h4 font-medium text-ink">{block.title}</dt>
            <dd className="mt-1.5 max-w-sm text-sm text-ink-2">
              <Rich text={block.body} />
            </dd>
          </div>
        ))}
      </dl>
      <div
        data-reveal=""
        className={
          bare
            ? 'mt-14 lg:mt-16'
            : 'how-panel mt-14 rounded-[2rem] px-5 pt-12 pb-16 sm:px-10 lg:pt-16 lg:pb-20'
        }
      >
        <div aria-hidden="true" className="grid grid-cols-1 place-items-center">
          {scene}
        </div>
        <BuildFoot build={build} after={after} inset={!bare} />
      </div>
    </Band>
  );
}

/**
 * How we build it, under a hairline — the heading and the numbered track — and whatever follows it
 * (the tools it works with). Under the picture in how it's built, or under a split section.
 */
export function BuildFoot({
  build,
  after,
  inset = false,
}: {
  build: { heading: string; steps: { title: string; body: string }[] };
  after?: ReactNode;
  /** Inside the grey panel: a little room at the sides. */
  inset?: boolean;
}) {
  return (
    <>
      <div
        className={`mt-16 border-t border-black/[0.08] pt-12 lg:mt-20 lg:pt-14 ${inset ? 'lg:px-4' : ''}`}
      >
        <h3 id="build-heading" className="text-h3 font-medium text-balance text-ink">
          {build.heading}
        </h3>
        <BuildTrack steps={build.steps} nested />
      </div>
      {after}
    </>
  );
}

// --- the industries -------------------------------------------------------------------------------

/**
 * Who it suits, as cards: each industry's mark in its own light tint — the same tint it wears on
 * the home page's strip — then its name and what this service does for it.
 */
export function Industries({
  eyebrow,
  heading,
  items,
  raised = false,
}: {
  eyebrow: string;
  heading: string;
  items: { sector: string; text: string }[];
  /** On a service page: each mark raised off its card on a light shadow, as HBR's are. */
  raised?: boolean;
}) {
  return (
    <Band id="industries" labelledBy="industries-heading" className="py-24 lg:py-32">
      <Head id="industries" eyebrow={eyebrow} title={heading} />
      <ul
        className={`industry-grid mt-12 ${items.length === 6 ? 'lg:grid-cols-3' : ''} ${raised ? 'industry-grid--raised' : ''}`}
      >
        {items.map((item, i) => (
          <li
            key={item.sector}
            data-reveal=""
            style={
              {
                '--i': i,
                '--tint': TINTS[sectors.indexOf(item.sector) % TINTS.length],
              } as CSSProperties
            }
            className="industry-card"
          >
            <span className="industry-card__icon">
              <Icon name={MARKS[item.sector] ?? 'spark'} size={22} />
            </span>
            <h3 className="industry-card__name">{item.sector}</h3>
            <p className="industry-card__text">{item.text}</p>
          </li>
        ))}
      </ul>
    </Band>
  );
}

// --- how we build it ------------------------------------------------------------------------------

/** The numbered track; its step titles sit one level under whatever heading it follows. */
function BuildTrack({
  steps,
  nested = false,
}: {
  steps: { title: string; body: string }[];
  nested?: boolean;
}) {
  const Title = nested ? 'h4' : 'h3';
  return (
    <ol className="build-track mt-14" style={{ '--n': steps.length } as CSSProperties}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal=""
          style={{ '--i': i } as CSSProperties}
          className="build-track__step"
        >
          <span className="build-track__dot">{i + 1}</span>
          <div>
            <Title className="text-h4 font-medium text-ink">{step.title}</Title>
            <p className="mt-1.5 text-sm text-ink-2">
              <Rich text={step.body} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
