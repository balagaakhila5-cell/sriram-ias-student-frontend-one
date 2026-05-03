'use client';

import { startTransition, useEffect, useState } from 'react';

const useScrollThreshold = (threshold: number) => {
  const [isPastThreshold, setIsPastThreshold] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.scrollY > threshold;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let frameId = 0;
    let lastValue = window.scrollY > threshold;

    const updateScrollState = () => {
      frameId = 0;
      const nextValue = window.scrollY > threshold;

      if (nextValue === lastValue) {
        return;
      }

      lastValue = nextValue;
      startTransition(() => {
        setIsPastThreshold(nextValue);
      });
    };

    const handleScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [threshold]);

  return isPastThreshold;
};

export default useScrollThreshold;
