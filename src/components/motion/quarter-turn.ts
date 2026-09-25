/**
 * The brand's one motion: the pixel's quarter-turn.
 *
 * From the identity's motion spec (`source/motion.py`): the pixel rests, then turns 90° on its
 * centre over 1.2s on `cubic-bezier(.7, 0, .2, 1)`, and rests again. While it turns it shrinks by
 * 1 / (cos θ + sin θ) — exactly enough for a turned square to stay inside its own cell — so it
 * never touches the P. A square turned 90° is itself, so every frame at rest is the true logo.
 *
 * `pose` is the maths, shared with the hero's canvas; `turn` plays it once on any element through
 * the Web Animations API (the element needs `.pk-px`, which pivots it on its own centre). Nothing
 * turns under reduced motion.
 */
export const TURN_MS = 1200;
export const HOLD_MS = 800;

/** CSS `cubic-bezier(.7, 0, .2, 1)`: eased progress for a time fraction `x`. */
export function brandEase(x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 40; i++) {
    const t = (lo + hi) / 2;
    const bx = 3 * (1 - t) ** 2 * t * 0.7 + 3 * (1 - t) * t ** 2 * 0.2 + t ** 3;
    if (bx < x) lo = t;
    else hi = t;
  }
  const t = (lo + hi) / 2;
  return 3 * (1 - t) * t ** 2 + t ** 3;
}

/** The pixel's pose at progress `p` through a turn: angle in radians, and the scale that keeps
 *  it inside its cell. */
export function pose(p: number) {
  const theta = (Math.PI / 2) * brandEase(p);
  return { theta, scale: 1 / (Math.cos(theta) + Math.sin(theta)) };
}

/** The turn as keyframes, sampled as the identity's own animated SVGs are (36 steps). */
const STEPS = 36;
export const TURN_FRAMES: Keyframe[] = Array.from({ length: STEPS + 1 }, (_, j) => {
  const { theta, scale } = pose(j / STEPS);
  return {
    offset: j / STEPS,
    transform: `rotate(${((theta * 180) / Math.PI).toFixed(3)}deg) scale(${scale.toFixed(4)})`,
  };
});

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Play one quarter-turn on `el`, unless it is already turning. */
export function turn(el: Element | null | undefined, delay = 0) {
  if (!el || typeof (el as HTMLElement).animate !== 'function' || prefersReducedMotion()) return;
  if (el.getAnimations().some((a) => a.id === 'pk-turn' && a.playState !== 'finished')) return;
  const animation = el.animate(TURN_FRAMES, { duration: TURN_MS, delay, easing: 'linear' });
  animation.id = 'pk-turn';
}
