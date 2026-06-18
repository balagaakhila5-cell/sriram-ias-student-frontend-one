'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import useInViewport from '@/hooks/useInViewport';

gsap.registerPlugin(ScrollTrigger);

const HERO_POSTER = '/assets/course/course-hero-bg.jpg';
const HERO_VIDEO_SRC = '/assets/HOME PAGE_BANNER VIDEO.mp4';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHeroVisible = useInViewport(sectionRef, { threshold: 0.15 });
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !isHeroVisible) {
      return;
    }

    let idleCallback: number | undefined;

    if (typeof window.requestIdleCallback === 'function') {
      idleCallback = window.requestIdleCallback(() => setShouldLoadVideo(true), {
        timeout: 1200,
      });
    } else {
      idleCallback = window.setTimeout(() => setShouldLoadVideo(true), 600);
    }

    return () => {
      if (typeof window.cancelIdleCallback === 'function' && idleCallback !== undefined) {
        window.cancelIdleCallback(idleCallback);
      } else if (idleCallback !== undefined) {
        window.clearTimeout(idleCallback);
      }
    };
  }, [isHeroVisible, prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) {
      return;
    }

    if (prefersReducedMotion || !isHeroVisible) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Ignore autoplay rejections so the page stays interactive.
    });
  }, [isHeroVisible, prefersReducedMotion, shouldLoadVideo]);

  return (
    <div ref={containerRef}>
      <section ref={sectionRef} className="relative w-full h-[95vh] min-h-[500px] overflow-hidden bg-[#012439]">
        <div className="absolute inset-0 z-0 h-full">
          <img
            src={HERO_POSTER}
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {shouldLoadVideo && !prefersReducedMotion ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={HERO_POSTER}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          ) : null}

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none" />
      </section>
    </div>
  );
};

export default Hero;
