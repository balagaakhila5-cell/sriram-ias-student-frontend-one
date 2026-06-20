'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  containerRef: React.RefObject<HTMLElement | null>;
  prefersReducedMotion: boolean;
}

const JoinCtaAnimatedBackground: React.FC<Props> = ({
  containerRef,
  prefersReducedMotion,
}) => {
  const waveRef = useRef<HTMLDivElement>(null);
  const centerWaveRef = useRef<SVGGElement>(null);
  const bottomWaveRef = useRef<SVGPathElement>(null);
  const hasPlayedRef = useRef(false);
  const driftTweenRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const wave = waveRef.current;
    if (!wave || prefersReducedMotion) return;

    gsap.set(wave, { scaleX: 0, transformOrigin: 'left center' });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const section = containerRef.current;
    const wave = waveRef.current;
    const centerWave = centerWaveRef.current;
    const bottomWave = bottomWaveRef.current;
    if (!section || !wave) return;

    const startCenterMotion = () => {
      if (prefersReducedMotion) return;

      driftTweenRef.current?.kill();
      gsap.set(wave, { scaleX: 1, xPercent: 0, y: 0, transformOrigin: 'left center' });

      if (centerWave) {
        gsap.set(centerWave, { scale: 1, x: 0, y: 0, rotation: 0, svgOrigin: '720 320' });
      }
      if (bottomWave) {
        gsap.set(bottomWave, { scale: 1, x: 0, y: 0, rotation: 0, svgOrigin: '1100 520' });
      }

      if (!centerWave && !bottomWave) return;

      driftTweenRef.current = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut', duration: 6 },
      });

      if (centerWave) {
        driftTweenRef.current.to(
          centerWave,
          { scale: 1.1, y: 28, x: 12, rotation: 0.6, svgOrigin: '720 320' },
          0,
        );
      }

      if (bottomWave) {
        driftTweenRef.current.to(
          bottomWave,
          { scale: 1.09, y: 22, x: -10, rotation: -0.4, svgOrigin: '1100 520' },
          0,
        );
      }
    };

    const showGreen = () => {
      gsap.set(wave, { scaleX: 1, xPercent: 0, y: 0, transformOrigin: 'left center' });
      startCenterMotion();
    };

    const revealGreen = () => {
      if (hasPlayedRef.current) return;
      hasPlayedRef.current = true;

      gsap.to(wave, {
        scaleX: 1,
        duration: 3,
        ease: 'none',
        transformOrigin: 'left center',
        onComplete: startCenterMotion,
      });
    };

    if (prefersReducedMotion) {
      showGreen();
      hasPlayedRef.current = true;
      return;
    }

    const isSectionVisible = () => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
    };

    const tryReveal = () => {
      if (isSectionVisible()) revealGreen();
    };

    tryReveal();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealGreen();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);

    const pollTimer = window.setInterval(() => {
      if (hasPlayedRef.current) {
        window.clearInterval(pollTimer);
        return;
      }
      tryReveal();
    }, 200);

    const failSafeTimer = window.setTimeout(() => {
      if (!hasPlayedRef.current) showGreen();
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearInterval(pollTimer);
      window.clearTimeout(failSafeTimer);
      driftTweenRef.current?.kill();
    };
  }, [containerRef, prefersReducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        ref={waveRef}
        className="join-cta-bg-wave absolute inset-0 h-full w-full origin-left"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g ref={centerWaveRef} className="join-cta-center-wave">
            <path
              className="cta-bg-shape"
              d="M-100,350 C200,250 450,50 900,100 C1250,140 1450,-50 1550,-100 L1550,150 C1350,300 1050,350 750,250 C400,100 150,350 -100,450 Z"
              fill="#B8B850"
              fillOpacity="0.3"
            />
          </g>
          <path
            ref={bottomWaveRef}
            className="cta-bg-shape"
            d="M700,650 C800,450 1100,400 1550,550 L1550,650 Z"
            fill="#B8B850"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
};

export default JoinCtaAnimatedBackground;
