'use client';

import { useEffect, useState } from 'react';

import { THANKS_NAME_KEY } from '@/lib/enquiry';

/**
 * "Thanks, {first name}." — the name the form left in session storage, read once and cleared, so a
 * reload or a shared link simply says "Thanks."
 */
export function ThanksHeading() {
  const [name, setName] = useState('');

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(THANKS_NAME_KEY);
      if (stored) setName(stored);
      sessionStorage.removeItem(THANKS_NAME_KEY);
    } catch {
      // Storage off: the heading thanks without a name.
    }
  }, []);

  return (
    <h1 id="page-heading" className="mt-6 text-display tracking-[var(--tracking-display)] text-ink">
      {name ? `Thanks, ${name}.` : 'Thanks.'}
    </h1>
  );
}
