'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import useInViewport from '@/hooks/useInViewport';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHeroVisible = useInViewport(sectionRef, { threshold: 0.2 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (prefersReducedMotion || !isHeroVisible) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Ignore autoplay rejections so the page stays interactive.
    });
  }, [isHeroVisible, prefersReducedMotion]);

  return (
    <div ref={containerRef}>
      <section ref={sectionRef} className="relative w-full h-[95vh] min-h-[500px] overflow-hidden bg-[#012439]">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src="assets/HOME PAGE_BANNER VIDEO.mp4" type="video/mp4" />
            {/* Fallback image if video fails or while loading */}
            <div className="w-full h-full bg-[#012439]" />
          </video>
          {/* Dark Overlay to make navbar readable */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none">
        </div>
      </section>
    </div>
  );
};

export default Hero;
