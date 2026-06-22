'use client';

import React, { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import useInViewport from '@/hooks/useInViewport';

const HERO_VIDEO_SRC = '/assets/HOME PAGE_BANNER VIDEO.mp4';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHeroVisible = useInViewport(sectionRef, { threshold: 0.15 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) {
      return;
    }

    if (!isHeroVisible) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Ignore autoplay rejections so the page stays interactive.
    });
  }, [isHeroVisible, prefersReducedMotion]);

  return (
    <div>
      <section ref={sectionRef} className="relative h-[95vh] min-h-[500px] w-full overflow-hidden bg-[#012439]">
        <div className="absolute inset-0 z-0 h-full">
          {!prefersReducedMotion ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          ) : null}

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="pointer-events-none relative z-10 flex h-full w-full items-center justify-center" />
      </section>
    </div>
  );
};

export default Hero;
