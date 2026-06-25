'use client';

import React, { useMemo } from 'react';
import { useHomepage } from '@/features/homepage/hooks/useHomepage';
import {
  buildHomepageDisplayToppers,
  formatTopperRankLabel,
} from '@/data/ourToppers';
import TopperPortraitImage from '@/components/common/TopperPortraitImage';

const OurToppers: React.FC = () => {
  const { data: homepage } = useHomepage();
  const section = homepage?.section3;

  const displayToppers = useMemo(
    () => buildHomepageDisplayToppers(section?.toppers ?? []),
    [section?.toppers],
  );

  const duplicatedToppers = useMemo(
    () => [...displayToppers, ...displayToppers],
    [displayToppers],
  );

  const heading = section?.title ?? "Our Toppers'";
  const subTitle =
    section?.subTitle ??
    'Driven by a commitment to success, we stand behind our toppers with constant support, expert mentorship, and personalized attention.';

  return (
    <section className="relative flex min-h-[520px] w-full flex-col items-center overflow-hidden pb-0 pt-0">
      <img
        src="/assets/our-centers/centers-bg.png"
        alt="Background"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex w-full max-w-[1900px] flex-col items-center">
        <div className="mt-8 pt-2 text-center md:mt-10">
          <h2 className="global-section-heading normal-case">{heading}</h2>
        </div>

        <p className="mx-auto mb-0 max-w-[800px] px-6 text-center text-[13px] font-medium leading-snug text-[#2A3742] md:text-[15px]">
          {subTitle}
        </p>

        <div className="w-full -mt-2 overflow-hidden -translate-y-14 md:-translate-y-16">
          <div className="toppers-track flex w-max gap-0">
            {duplicatedToppers.map((topper, idx) => (
              <div
                key={`${topper.id}-${idx}`}
                className="-ml-20 flex shrink-0 flex-col items-center overflow-visible first:ml-0 md:-ml-24 lg:-ml-28"
              >
                <TopperPortraitImage
                  img={topper.img}
                  alt={topper.name}
                  y={topper.y}
                  scale={topper.scale}
                  loading={idx < 5 ? 'eager' : 'lazy'}
                />

                <div className="relative z-20 -mt-2 flex min-h-[76px] flex-col items-center justify-start px-1 text-center sm:-mt-1">
                  <h3 className="min-h-[20px] max-w-[220px] truncate text-[14px] font-bold leading-tight text-white md:text-[15px]">
                    {topper.name}
                  </h3>

                  <span className="topper-air-badge mt-1.5">
                    {formatTopperRankLabel(topper.rank, topper.year)}
                  </span>

                  <span className="mt-2 max-w-[220px] truncate text-center text-[12px] text-white opacity-90">
                    {topper.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .toppers-track {
          animation: toppersScroll 55s linear infinite;
          will-change: transform;
        }

        .toppers-track:hover {
          animation-play-state: paused;
        }

        @keyframes toppersScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .toppers-track {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default OurToppers;
