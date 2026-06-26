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
    <section className="relative w-full min-h-[520px] flex flex-col items-center pt-0 pb-0 overflow-hidden">
      <img
        src="/assets/our-centers/centers-bg.png"
        alt="Background"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 w-full max-w-[1900px] flex flex-col items-center">
        <div className="text-center mt-8 md:mt-10 pt-2">
          <h2 className="global-section-heading normal-case">{heading}</h2>
        </div>

        <p className="text-center text-[#2A3742] font-medium max-w-[800px] mx-auto text-[13px] md:text-[15px] leading-snug px-6 mb-0">
          {subTitle}
        </p>

        <div className="w-full -mt-2 overflow-hidden -translate-y-14 md:-translate-y-16">
          <div className="toppers-track flex w-max gap-0">
            {duplicatedToppers.map((topper, idx) => (
              <div
                key={`${topper.id}-${idx}`}
                className="-ml-20 md:-ml-24 lg:-ml-28 first:ml-0 flex shrink-0 flex-col items-center overflow-visible"
              >
                <TopperPortraitImage
                  img={topper.img}
                  alt={topper.name}
                  y={topper.y}
                  scale={topper.scale}
                  loading={idx < 5 ? 'eager' : 'lazy'}
                />

                <div className="-mt-2 flex min-h-[76px] flex-col items-center justify-start text-center relative z-20 px-1 sm:-mt-1">
                  <h3 className="text-white text-[14px] md:text-[15px] font-bold leading-tight min-h-[20px] max-w-full truncate">
                    {topper.name}
                  </h3>

                  <span className="topper-air-badge mt-1.5">
                    {formatTopperRankLabel(topper.rank, topper.year)}
                  </span>

                  <span className="text-white text-[12px] opacity-90 text-center mt-2">
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
      `}</style>
    </section>
  );
};

export default OurToppers;
