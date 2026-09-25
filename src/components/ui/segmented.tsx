'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * A segmented control — Pricing's Websites · Care plans, and the FAQ's categories on a phone. One
 * graphite thumb under the labels slides to the chosen one and takes its width, rather than the
 * colour jumping from button to button. Its place is measured off the chosen button, and again
 * whenever the group resizes (a font arriving, a narrower screen).
 *
 * The server's HTML paints the chosen button itself, so the control is right before any script
 * runs; the thumb takes over once it has been placed, without animating that first placement.
 * It is a radio group, so the arrow keys move the choice and Tab lands on the chosen one only.
 */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
  stretch = false,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
  /** Fill the width, every option an equal share — for a phone. */
  stretch?: boolean;
}) {
  const group = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const [placed, setPlaced] = useState(false);

  useIsoLayout(() => {
    const place = () => {
      const chosen = group.current?.querySelector<HTMLElement>('[aria-checked="true"]');
      if (!chosen || !thumb.current) return;
      thumb.current.style.width = `${chosen.offsetWidth}px`;
      thumb.current.style.transform = `translateX(${chosen.offsetLeft}px)`;
    };
    place();
    setPlaced(true);
    const observer = new ResizeObserver(place);
    if (group.current) observer.observe(group.current);
    return () => observer.disconnect();
  }, [value]);

  const choose = (index: number) => {
    const next = options[(index + options.length) % options.length]!;
    onChange(next.value);
    group.current?.querySelectorAll<HTMLElement>('[role="radio"]')[options.indexOf(next)]?.focus();
  };

  return (
    <div
      ref={group}
      role="radiogroup"
      aria-label={label}
      className={`relative grid-flow-col rounded-full border border-line bg-white p-1 ${
        stretch ? 'grid w-full auto-cols-fr' : 'inline-grid'
      }`}
    >
      <span
        ref={thumb}
        aria-hidden="true"
        className={`seg-thumb ${placed ? 'seg-thumb--placed' : ''}`}
      />
      {options.map((option, i) => {
        const checked = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
              if (!step) return;
              event.preventDefault();
              choose(i + step);
            }}
            className={`relative z-10 rounded-full py-2 text-sm font-medium whitespace-nowrap transition-colors duration-500 ${
              stretch ? 'px-2' : 'px-4'
            } ${
              checked ? 'text-white' : 'text-ink-2 hover:text-ink'
            } ${checked && !placed ? 'bg-graphite' : ''}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
