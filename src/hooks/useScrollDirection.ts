'use client';

import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down';

const SCROLL_DELTA_THRESHOLD = 5;

const useScrollDirection = (onDirectionChange?: (direction: ScrollDirection) => void) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const onDirectionChangeRef = useRef(onDirectionChange);

  useEffect(() => {
    onDirectionChangeRef.current = onDirectionChange;
  }, [onDirectionChange]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let lastScrollY = window.scrollY;
    let lastDirection: ScrollDirection | null = null;
    let frameId = 0;

    const updateScrollDirection = () => {
      frameId = 0;
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < SCROLL_DELTA_THRESHOLD) {
        return;
      }

      const nextDirection: ScrollDirection = scrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = scrollY > 0 ? scrollY : 0;

      if (nextDirection === lastDirection) {
        return;
      }

      lastDirection = nextDirection;
      setScrollDirection(nextDirection);
      onDirectionChangeRef.current?.(nextDirection);
    };

    const onScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateScrollDirection);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return scrollDirection;
};

export default useScrollDirection;
