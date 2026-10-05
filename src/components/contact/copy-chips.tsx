'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { ExpandableChip } from '@/components/motion/expandable-control';

/**
 * The address and the number, to take away: beUI's expandable chips (`@beui/expandable-control`).
 * Tap one and it grows a copy action beside it on beUI's continuity spring; the action copies,
 * shows a tick for a moment, and the chip folds back. A polite live line says what was copied.
 */
export function CopyChips({ items }: { items: { label: string; value: string; name: string }[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async (item: { value: string; name: string }) => {
    try {
      await navigator.clipboard.writeText(item.value);
      setCopied(item.name);
    } catch {
      setCopied(null);
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {items.map((item) => (
          <ExpandableChip
            key={item.name}
            label={item.label}
            actionLabel={`Copy the ${item.name}`}
            actionIcon={
              copied === item.name ? (
                <Check className="size-4 text-signal-green" />
              ) : (
                <Copy className="size-4" />
              )
            }
            collapseOnAction={false}
            onAction={() => copy(item)}
            className="border-line bg-white font-tech text-ink"
            labelClassName="text-sm"
          />
        ))}
      </div>
      <p aria-live="polite" className="min-h-5 text-xs text-ink-2">
        {copied ? `The ${copied} is copied.` : ''}
      </p>
    </div>
  );
}
