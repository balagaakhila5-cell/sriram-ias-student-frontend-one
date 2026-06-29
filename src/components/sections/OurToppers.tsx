'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useHomepage } from '@/features/homepage/hooks/useHomepage';
import { useDisplayedToppers } from '@/features/ourToppers/hooks/useDisplayedToppers';
import {
  formatTopperRankLabel,
  mapDisplayedToppersToCarousel,
} from '@/data/ourToppers';
import { getOurToppersErrorMessage } from '@/features/ourToppers/utils/ourToppersErrors';
import TopperPortraitImage from '@/components/common/TopperPortraitImage';
import { toast } from '@/store/toastStore';

function OurToppersSkeleton() {
  return (
    <div className="flex w-max gap-8 px-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex w-[180px] shrink-0 flex-col items-center gap-3"
        >
          <div className="h-[360px] w-[140px] animate-pulse rounded-full bg-white/20" />
          <div className="h-3 w-24 animate-pulse rounded bg-white/20" />
          <div className="h-4 w-28 animate-pulse rounded bg-white/20" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-white/20" />
          <div className="h-3 w-32 animate-pulse rounded bg-white/20" />
        </div>
      ))}
    </div>
  );
}

const OurToppers: React.FC = () => {
  const { data: homepage } = useHomepage();
  const section = homepage?.section3;
  const { data, isLoading, isError, error } = useDisplayedToppers();
  const errorToastShown = useRef(false);

  const displayToppers = useMemo(
    () => mapDisplayedToppersToCarousel(data?.toppers ?? []),
    [data?.toppers],
  );

  const carouselToppers = useMemo(
    () =>
      displayToppers.length > 0
        ? [...displayToppers, ...displayToppers]
        : [],
    [displayToppers],
  );

  const carouselDurationSeconds = useMemo(() => {
    const uniqueCount = Math.max(displayToppers.length, 1);
    return Math.max(28, uniqueCount * 14);
  }, [displayToppers.length]);

  useEffect(() => {
    if (!isError || errorToastShown.current) return;
    errorToastShown.current = true;
    toast(getOurToppersErrorMessage(error), 'error');
  }, [isError, error]);

  useEffect(() => {
    if (!isError) {
      errorToastShown.current = false;
    }
  }, [isError]);

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
          {isLoading ? (
            <OurToppersSkeleton />
          ) : isError ? (
            <p className="px-6 py-16 text-center text-base font-semibold text-white/90">
              {getOurToppersErrorMessage(error)}
            </p>
          ) : displayToppers.length === 0 ? (
            <p className="px-6 py-16 text-center text-base font-semibold text-white/90">
              No active toppers to display. In Admin → Marketing → Rank Management, ensure rankers are set to Active.
            </p>
          ) : (
            <div
              className="toppers-track flex w-max gap-0"
              style={
                {
                  '--toppers-scroll-duration': `${carouselDurationSeconds}s`,
                } as React.CSSProperties
              }
            >
              {carouselToppers.map((topper, idx) => (
                <div
                  key={`${topper.id}-${idx}`}
                  className="-ml-20 flex shrink-0 flex-col items-center overflow-visible first:ml-0 md:-ml-24 lg:-ml-28"
                >
                  {topper.isTop10 && (
                    <span className="topper-top10-badge relative z-30 mb-1">
                      Top 10
                    </span>
                  )}

                  <TopperPortraitImage
                    img={topper.img}
                    alt={topper.name}
                    y={topper.y}
                    scale={topper.scale}
                    loading={idx < displayToppers.length ? 'eager' : 'lazy'}
                  />

                  <div className="-mt-2 flex min-h-[96px] flex-col items-center justify-start text-center relative z-20 px-1 sm:-mt-1">
                    <h3 className="text-white text-[14px] md:text-[15px] font-bold leading-tight min-h-[20px] max-w-full truncate">
                      {topper.name}
                    </h3>

                    {topper.studentId ? (
                      <p className="mt-1 text-[11px] font-medium text-white/80">
                        {topper.studentId}
                      </p>
                    ) : null}

                    <span className="topper-air-badge mt-1.5">
                      {formatTopperRankLabel(topper.rank, topper.year)}
                    </span>

                    {topper.course ? (
                      <span className="text-white text-[12px] opacity-90 text-center mt-2 max-w-[180px] truncate">
                        {topper.course}
                      </span>
                    ) : null}

                    {topper.year ? (
                      <span className="text-white text-[11px] opacity-80 text-center mt-1">
                        Year {topper.year}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .toppers-track {
          animation: toppersScroll var(--toppers-scroll-duration, 55s) linear infinite;
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
