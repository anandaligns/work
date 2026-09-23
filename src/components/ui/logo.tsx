import Link from 'next/link';

/**
 * pk-static's lockup, as it is: the slate tile with three rounded pixels stepping up and out, and
 * the wordmark beside it. Inline so it paints with the first byte of HTML rather than after a
 * second request.
 */
export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      <rect width="64" height="64" rx="16" fill="#2B2D42" />
      <rect x="12" y="32" width="20" height="20" rx="5" fill="#fff" />
      <rect x="26" y="20" width="16" height="16" rx="4" fill="#fff" opacity="0.7" />
      <rect x="38" y="11" width="13" height="13" rx="3.5" fill="#fff" opacity="0.42" />
    </svg>
  );
}

export function Logo({
  tone = 'ink',
  hideWordBelow,
}: {
  tone?: 'ink' | 'white';
  hideWordBelow?: 'sm';
}) {
  return (
    <Link
      href="/"
      aria-label="Pixel Kinetix home"
      className="group inline-flex items-center gap-2.5"
    >
      {/* On a slate ground the slate tile keeps its edge with a faint light ring; the mark itself
          is unchanged. */}
      <LogoMark
        className={`size-8 rounded-[25%] transition-[transform,box-shadow] duration-500 ease-[var(--ease-premium)] group-hover:-rotate-6 ${
          tone === 'white' ? 'ring-1 ring-white/25' : ''
        }`}
      />
      <span
        className={`font-sans text-[1.0625rem] font-semibold tracking-[-0.025em] transition-colors duration-500 ${
          tone === 'white' ? 'text-white' : 'text-ink'
        } ${hideWordBelow === 'sm' ? 'max-sm:sr-only' : ''}`}
      >
        Pixel Kinetix
      </span>
    </Link>
  );
}
