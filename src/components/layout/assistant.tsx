'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { assistant, contact } from '@/content/site';

import { HOLD_MS, turn } from '../motion/quarter-turn';
import { Icon, type IconName } from '../ui/icon';

/**
 * The AI assistant's launcher, for the lower right of every page — where Call Now used to float.
 * Parked until the assistant works: no page renders it. To bring it back, render `<Assistant />`
 * after the footer in `app/layout.tsx`.
 *
 * A graphite pill: the assistant's face, then "Ask" and its name. Beside the face sits the brand's
 * pixel in Kinetic Orange, which makes the logo's quarter-turn once the page settles and again when
 * the launcher is pointed at. Desktops only: phones and tablets — under 1280px, or any screen
 * driven by touch — don't show it.
 *
 * The assistant is not built yet, so the launcher opens a short note from it — what it will do,
 * and the three ways to reach the team today — over a composer that is not live. The panel is a
 * non-modal dialog: Escape or a click outside closes it, and focus returns to the launcher.
 * The name, role and face are `assistant` in `site.ts`.
 */
const REACH: { icon: IconName; label: string; href: string; external?: boolean }[] = [
  { icon: 'mail', label: 'Mail us', href: `mailto:${contact.email}` },
  { icon: 'whatsapp', label: 'WhatsApp', href: contact.whatsappHref, external: true },
  { icon: 'phone', label: 'Call now', href: contact.phoneHref },
];

export function Assistant() {
  const [open, setOpen] = useState(false);
  const ids = useId();
  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pixel = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    turn(pixel.current, HOLD_MS + 1600);
  }, []);

  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const close = (refocus: boolean) => {
      setOpen(false);
      if (refocus) launcher.current?.focus();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true);
    };
    const onDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !launcher.current?.contains(target)) close(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <aside aria-label={`${assistant.name}, ${assistant.role}`}>
      <div
        id={`${ids}-panel`}
        ref={panel}
        role="dialog"
        aria-labelledby={`${ids}-title`}
        tabIndex={-1}
        inert={!open}
        data-open={open || undefined}
        data-lenis-prevent=""
        className="assist-panel"
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <img
            src={assistant.avatar}
            alt=""
            width={40}
            height={40}
            decoding="async"
            className="size-10 shrink-0 rounded-full"
          />
          <div className="min-w-0 flex-1">
            <p id={`${ids}-title`} className="font-display text-[1.0625rem] font-semibold text-ink">
              {assistant.name}
            </p>
            <p className="text-xs text-ink-2">{assistant.role}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              launcher.current?.focus();
            }}
            className="-mr-2 grid size-10 shrink-0 place-items-center rounded-full text-ink-2 transition-colors hover:bg-fill hover:text-ink"
          >
            <span className="sr-only">Close</span>
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-2.5 px-5 pt-5 pb-4">
          <p className="assist-bubble">
            Hi, I’m {assistant.name}. Soon I’ll answer your questions about our services, prices and
            your project, right here.
          </p>
          <p className="assist-bubble">
            I’m still learning how Pixel Kinetix works. Until then, the team is one tap away.
          </p>
          <ul className="mt-2 grid grid-cols-3 gap-2">
            {REACH.map((way) => (
              <li key={way.label}>
                <a
                  href={way.href}
                  {...(way.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="assist-reach"
                >
                  <Icon name={way.icon} size={18} />
                  {way.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* The composer, shown as it will be; it goes live with the assistant. */}
        <div className="flex items-center gap-2 border-t border-line px-3 py-3">
          <input
            type="text"
            disabled
            aria-label={`Ask ${assistant.name} a question`}
            placeholder={`Ask ${assistant.name} anything`}
            className="h-10 min-w-0 flex-1 rounded-full bg-fill px-4 text-sm text-ink placeholder:text-ink-2 disabled:cursor-not-allowed"
          />
          <span className="shrink-0 rounded-full border border-line px-2.5 py-1 font-tech text-[0.625rem] tracking-[0.12em] text-ink-2 uppercase">
            Coming soon
          </span>
        </div>
      </div>

      <button
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-controls={`${ids}-panel`}
        aria-haspopup="dialog"
        onClick={() => setOpen((was) => !was)}
        onPointerEnter={() => turn(pixel.current)}
        onFocus={() => turn(pixel.current)}
        className="assist-launcher"
      >
        <span className="assist-launcher__face">
          <img src={assistant.avatar} alt="" width={56} height={56} decoding="async" />
          <span ref={pixel} aria-hidden="true" className="assist-launcher__px" />
        </span>
        <span className="assist-launcher__label">Ask {assistant.name}</span>
      </button>
    </aside>
  );
}
