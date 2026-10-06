'use client';

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Transition,
  useReducedMotion,
} from 'motion/react';
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { SPRING_LAYOUT, SPRING_PRESS } from '@/lib/ease';
import { useHoverCapable } from '@/lib/hooks/use-hover-capable';

import { Icon } from '../ui/icon';
import { Corners } from './scene-panel';

/**
 * The point of view's picture on every service and solution page: beUI's Project Folder block
 * (`components/motion/project-folder.tsx`) with its folder taken away — no back, no cover, no title
 * on it — so only its five cards remain, fanned, each a screen from the page's example build. They
 * spread further under the pointer or focus, as the folder's did, and a press opens them as the
 * folder does: each card flies to its place in a grid over a blurred page, with the title and a
 * close button above, and flies back into the fan on close (Escape, the button or the page behind).
 *
 * Each card's screen is drawn on one canvas (240 × 320) and scaled to the card it is in, so it is
 * the same screen in the fan and opened up, and the flight between them is a plain zoom.
 */

export type FanCard = { id: string; content: ReactNode };

const CANVAS_W = 240;
const CANVAS_H = 320;
const MAX_CARDS = 5;
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** A card's place in the fan, as the folder sets it — scaled from its 96 × 160 cards to ours. */
function pose(index: number, count: number, kx: number, ky: number) {
  const offset = index - (count - 1) / 2;
  const distance = Math.abs(offset);
  const lift = Math.max(0, 2 - distance) * 8;
  return {
    x: offset * 44 * kx,
    y: (8 - lift) * ky,
    rotate: offset * 6,
    scale: distance === 0 ? 1.04 : distance === 1 ? 0.95 : 0.88,
    zIndex: 10 - distance,
  };
}

/** One screen on its canvas, scaled to whatever card it sits in (its layout box, not its flight). */
function Canvas({ children }: { children: ReactNode }) {
  const box = useRef<HTMLSpanElement>(null);
  const [k, setK] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      if (el.offsetWidth) setK(el.offsetWidth / CANVAS_W);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={box} className="absolute inset-0 block">
      <span
        className="absolute top-0 left-0 block origin-top-left"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${k ?? 0})`,
          visibility: k ? undefined : 'hidden',
        }}
      >
        {children}
      </span>
    </span>
  );
}

export function ProjectFan({
  title,
  note,
  cards,
  accent,
  brand,
}: {
  /** The overlay's heading, and the fan's name for a screen reader. */
  title: string;
  /** The line under the heading. */
  note: string;
  cards: FanCard[];
  /** The page's colour, for the screens' tiles, lit edges and charts. */
  accent: string;
  /** The business's own colour inside its screens; the page's if not given. */
  brand?: string;
}) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const group = useId();
  const titleId = `${group}-title`;
  const hovered = useRef(false);
  const focused = useRef(false);
  const restoring = useRef(false);
  const fanRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const [play, setPlay] = useState(false);
  const items = cards.slice(0, MAX_CARDS);
  const transition: Transition = reduce ? { duration: 0 } : SPRING_LAYOUT;
  const colours = { '--sc-accent': accent, '--sc-brand': brand ?? accent } as CSSProperties;

  const finishClose = useCallback(() => {
    setClosing(false);
    restoring.current = true;
    requestAnimationFrame(() => fanRef.current?.focus());
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    setOpen(false);
    setExpanded(false);
  }, []);

  useEffect(() => setMounted(true), []);

  // The fan's room, measured; the screens move only while it is on screen.
  useEffect(() => {
    const el = fanRef.current;
    if (!el) return;
    const measure = () => {
      if (el.offsetWidth && el.offsetHeight) setBox({ w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    const size = new ResizeObserver(measure);
    size.observe(el);
    const sight = new IntersectionObserver(([entry]) => setPlay(Boolean(entry?.isIntersecting)), {
      threshold: 0.2,
    });
    sight.observe(el);
    return () => {
      size.disconnect();
      sight.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!closing) return;
    if (reduce) {
      finishClose();
      return;
    }
    // Should the flight home not report back, the overlay still clears.
    const fallback = window.setTimeout(finishClose, 1200);
    return () => window.clearTimeout(fallback);
  }, [closing, finishClose, reduce]);

  useEffect(() => {
    if (!expanded) return;
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    // The page holds still behind it: smooth scrolling stopped, and the native scroller (the root,
    // when motion is reduced and there is no smooth scrolling) locked as well as the body.
    const root = document.documentElement;
    const previousOverflow = [document.body.style.overflow, root.style.overflow];
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    document.body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';
    lenis?.stop();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.tabIndex >= 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow[0] ?? '';
      root.style.overflow = previousOverflow[1] ?? '';
      lenis?.start();
      document.removeEventListener('keydown', onKey);
    };
  }, [close, expanded]);

  const openUp = () => {
    if (!items.length) return;
    setClosing(false);
    setExpanded(true);
    setOpen(true);
  };

  // The cards: as wide as the room allows with the fan spread, and tall enough to stand in it.
  const cw = box ? Math.round(Math.min(box.w * (canHover ? 0.28 : 0.31), box.h * 0.5)) : 0;
  const ch = Math.round((cw * CANVAS_H) / CANVAS_W);
  const kx = cw / 96;
  const ky = ch / 160;
  const spread = (open || expanded) && !reduce;

  const overlay =
    expanded || closing ? (
      <>
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.button
              key="fan-backdrop"
              type="button"
              tabIndex={-1}
              aria-label={`Close ${title}`}
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.18 }}
              className={`fixed inset-0 z-[70] cursor-default bg-background/80 backdrop-blur-xl ${closing ? 'pointer-events-none' : ''}`}
            />
          ) : null}
        </AnimatePresence>

        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-hidden={expanded ? undefined : 'true'}
          data-lenis-prevent=""
          data-play=""
          className="sc sc--still pointer-events-none fixed inset-x-4 inset-y-6 z-[70] flex items-start justify-center overflow-y-auto sm:inset-x-6 sm:inset-y-8 sm:items-center"
          style={colours}
        >
          <div
            className={`pointer-events-auto relative w-full max-w-[78rem] ${closing ? 'pointer-events-none' : ''}`}
          >
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  key="fan-head"
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.18 }}
                  className="mb-6 flex items-center justify-between gap-4"
                >
                  <div>
                    <h2 id={titleId} className="text-[1.25rem] font-medium text-ink">
                      {title}
                    </h2>
                    <p className="mt-1 text-[0.875rem] text-ink-2">{note}</p>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label={`Close ${title}`}
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-white/60 text-ink-2 backdrop-blur-xl transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="grid grid-cols-2 place-items-center gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {expanded
                ? items.map((card) => (
                    <motion.div
                      key={card.id}
                      layoutId={`fan-${card.id}`}
                      transition={transition}
                      className="relative aspect-[3/4] w-full max-w-60 overflow-hidden border border-line bg-white shadow-[0_30px_60px_-34px_rgb(11_13_18/0.45)]"
                      style={{ borderRadius: 16 }}
                    >
                      <Canvas>{card.content}</Canvas>
                    </motion.div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </>
    ) : null;

  return (
    <LayoutGroup id={group}>
      <div className="rounded-[2rem] border border-line bg-fill p-3 sm:p-5">
        <div className="relative rounded-[1.2rem] border border-line bg-white sm:rounded-[1.4rem]">
          <Corners />
          <motion.button
            ref={fanRef}
            type="button"
            aria-label={`${title}: open the five screens`}
            aria-haspopup="dialog"
            aria-expanded={expanded}
            tabIndex={expanded ? -1 : undefined}
            data-play={play || undefined}
            onPointerEnter={() => {
              if (!canHover) return;
              hovered.current = true;
              setOpen(true);
            }}
            onPointerLeave={() => {
              if (!canHover) return;
              hovered.current = false;
              if (!expanded && !closing) setOpen(focused.current);
            }}
            onFocus={() => {
              if (restoring.current) {
                restoring.current = false;
                focused.current = false;
                return;
              }
              focused.current = true;
              setOpen(true);
            }}
            onBlur={() => {
              focused.current = false;
              if (!expanded && !closing) setOpen(hovered.current);
            }}
            onClick={openUp}
            whileTap={reduce ? undefined : { scale: 0.985 }}
            transition={reduce ? { duration: 0 } : SPRING_PRESS}
            className="sc sc--still relative block aspect-[4/3] w-full cursor-pointer rounded-[1.2rem] outline-none select-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 sm:aspect-[3/2] sm:rounded-[1.4rem]"
            style={colours}
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="absolute top-1/2 left-1/2 block h-0 w-0">
                <AnimatePresence initial={false}>
                  {!expanded && cw
                    ? items.map((card, index) => {
                        const at = pose(index, items.length, kx, ky);
                        return (
                          <motion.span
                            key={card.id}
                            layoutId={`fan-${card.id}`}
                            initial={false}
                            animate={
                              spread
                                ? {
                                    x: at.x * 1.4,
                                    y: at.y - 8 * ky,
                                    rotate: at.rotate * 1.3,
                                    scale: at.scale * 1.02,
                                  }
                                : { x: at.x, y: at.y, rotate: at.rotate, scale: at.scale }
                            }
                            transition={transition}
                            onLayoutAnimationComplete={() => {
                              if (closing && index === 0) finishClose();
                            }}
                            className="absolute top-0 left-0 block overflow-hidden border border-line bg-white shadow-[0_22px_44px_-26px_rgb(11_13_18/0.5)]"
                            style={{
                              width: cw,
                              height: ch,
                              marginLeft: -cw / 2,
                              marginTop: -ch / 2,
                              zIndex: at.zIndex,
                              borderRadius: Math.round(cw * 0.066),
                            }}
                          >
                            <Canvas>{card.content}</Canvas>
                          </motion.span>
                        );
                      })
                    : null}
                </AnimatePresence>
              </span>
            </span>
          </motion.button>
        </div>
      </div>

      {mounted ? createPortal(overlay, document.body) : null}
    </LayoutGroup>
  );
}
