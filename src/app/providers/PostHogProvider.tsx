'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize once on mount
    if (typeof window !== 'undefined' && !(posthog as any).__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'always',
        loaded: (ph) => {
          (ph as any).__loaded = true;
        }
      });
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
