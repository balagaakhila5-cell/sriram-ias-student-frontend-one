'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { refreshScrollAnimations } from '@/utils/gsapNavigation';

gsap.registerPlugin(ScrollTrigger);

export default function GsapSetup() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.defaults({
      ease: 'power3.out',
      overwrite: 'auto',
    });

    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
    });

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;
    refreshScrollAnimations();
  }, [pathname]);

  return null;
}
