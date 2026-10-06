'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { ProjectFlow } from './project-flow';

/** Opened from a page: a modal over it, and closing goes back to it. */
export function StartModal({ interest, live }: { interest?: string; live: boolean }) {
  const router = useRouter();
  const close = useCallback(() => router.back(), [router]);
  return <ProjectFlow modal interest={interest} live={live} onClose={close} />;
}

/** Opened at its own address: the page itself, and closing goes back if it can, or home. */
export function StartPage({ interest, live }: { interest?: string; live: boolean }) {
  const router = useRouter();
  const close = useCallback(() => {
    const fromHere = document.referrer.startsWith(window.location.origin);
    if (fromHere && window.history.length > 1) router.back();
    else router.push('/');
  }, [router]);
  return <ProjectFlow interest={interest} live={live} onClose={close} />;
}
