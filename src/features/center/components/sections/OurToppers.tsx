'use client';

import React, { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import {
  getTopperLayout,
  OUR_TOPPERS,
  OUR_TOPPERS_SUBTITLE,
  topperImageSrc,
} from '@/data/ourToppers';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  city?: string;
}

const OurToppers: React.FC<Props> = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const displayToppers = useMemo(
    () =>
      OUR_TOPPERS.map((topper, index) => ({
        ...topper,
        description: topper.course,
        ...getTopperLayout(index),
      })),
    [],
  );

  const duplicatedToppers = useMemo(
    () => [...displayToppers, ...displayToppers],
    [displayToppers],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.our-toppers-heading', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          once: true,
        },
      });
    },
    { dependencies: [prefersReducedMotion], scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex w-full min-h-[480px] flex-col items-center overflow-hidden pb-0 pt-0 md:min-h-[520px]"
    >
      <img
        src="/assets/our-centers/centers-bg.png"
        alt="Background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex w-full max-w-[1900px] flex-col items-center">
        <div className="our-toppers-heading mt-6 text-center md:mt-8">
          <h2 className="global-section-heading">OUR TOPPERS</h2>
        </div>

        <p className="our-toppers-heading mx-auto mb-0 max-w-[800px] px-6 text-center text-[13px] font-medium leading-snug text-[#2A3742] md:text-[15px]">
          {OUR_TOPPERS_SUBTITLE}
        </p>

        <div className="w-full -mt-2 overflow-hidden -translate-y-10 md:-translate-y-14">
          <div className="course-toppers-track flex w-max gap-0">
            {duplicatedToppers.map((topper, idx) => (
              <div
                key={`${topper.name}-${idx}`}
                className="-ml-16 flex shrink-0 flex-col items-center overflow-visible first:ml-0 md:-ml-20 lg:-ml-24"
              >
                <div className="relative flex h-[320px] w-full items-end justify-center overflow-visible sm:h-[360px] lg:h-[400px]">
                  <img
                    src={topperImageSrc(topper.img)}
                    alt={topper.name}
                    loading={idx < 6 ? 'eager' : 'lazy'}
                    className="pointer-events-none block h-[320px] w-auto max-w-[340px] select-none object-contain object-bottom sm:h-[360px] sm:max-w-[380px] lg:h-[400px] lg:max-w-[420px]"
                    style={{
                      transform: `translateY(${topper.y - 28}px) scale(${topper.scale})`,
                      transformOrigin: 'bottom center',
                    }}
                  />
                </div>

                <div className="relative z-20 mt-2 flex min-h-[76px] flex-col items-center justify-start px-1 text-center sm:mt-3">
                  <h3 className="max-w-full truncate text-[14px] font-bold leading-tight text-white md:text-[15px]">
                    {topper.name}
                  </h3>

                  <span className="topper-air-badge mt-1.5">
                    {topper.rank}
                  </span>

                  <span className="mt-2.5 text-center text-[12px] text-white opacity-90">
                    {topper.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .course-toppers-track {
          animation: courseToppersScroll 55s linear infinite;
          will-change: transform;
        }

        .course-toppers-track:hover {
          animation-play-state: paused;
        }

        @keyframes courseToppersScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .course-toppers-track {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default OurToppers;
