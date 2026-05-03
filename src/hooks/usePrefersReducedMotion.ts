'use client';

import { useEffect, useState } from 'react';

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

const getInitialValue = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(MEDIA_QUERY).matches;
};

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialValue);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);

      return () => {
        mediaQuery.removeEventListener('change', updatePreference);
      };
    }

    mediaQuery.addListener(updatePreference);

    return () => {
      mediaQuery.removeListener(updatePreference);
    };
  }, []);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
