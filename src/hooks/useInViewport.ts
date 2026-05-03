'use client';

import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

type UseInViewportOptions = {
  rootMargin?: string;
  once?: boolean;
  threshold?: number | number[];
};

const useInViewport = <T extends Element>(
  ref: RefObject<T | null>,
  options: UseInViewportOptions = {},
) => {
  const { rootMargin = '0px', once = false, threshold = 0.2 } = options;
  const [isInViewport, setIsInViewport] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return typeof IntersectionObserver === 'undefined';
  });

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setIsInViewport(true);

          if (once) {
            observer.disconnect();
          }

          return;
        }

        if (!once) {
          setIsInViewport(false);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, ref, rootMargin, threshold]);

  return isInViewport;
};

export default useInViewport;
