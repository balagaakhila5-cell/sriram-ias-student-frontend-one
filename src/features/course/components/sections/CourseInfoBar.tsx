'use client';

import React, { useRef } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  course: CourseData;
}

const CourseInfoBar: React.FC<Props> = ({ course }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.info-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.cta-button',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    },
    { dependencies: [prefersReducedMotion], scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full border border-black/10 px-4 py-6 font-['Montserrat',sans-serif] md:px-8 xl:px-0"
      style={{
        backgroundImage: `url(${course.coursedetailsbg})`,
        backgroundSize: '350px auto',
         backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="flex w-full flex-col items-center justify-between gap-4 xl:flex-row xl:items-center">
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-center xl:gap-6">
            {/* 1. Date Block */}
            <div className="info-item flex min-w-[240px] items-center gap-4">
              <div className="h-12 w-12 shrink-0 md:h-[52px] md:w-[52px]">
                <img
                  src="/assets/course/calendar.png"
                  alt="Calendar"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <span className="whitespace-nowrap text-[18px] font-extrabold leading-tight text-[#000000] md:text-[20px]">
                  {course.startDate || 'Course Starts Soon'}
                </span>
                <span className="mt-1 text-[13px] font-semibold text-[#00000099] md:text-[16px]">
                  Date of Commencement
                </span>
              </div>
            </div>

            {/* 2. Modes Block */}
            <div className="info-item flex min-w-[200px] flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/course/online-icon.png"
                  alt="Online"
                  className="h-8 w-8 object-contain md:h-[42px] md:w-[42px]"
                />
                <span className="text-[16px] font-extrabold uppercase tracking-wide text-[#000000] md:text-[20px]">
                  ONLINE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/course/offline-icon.png"
                  alt="Offline"
                  className="h-8 w-8 object-contain md:h-[42px] md:w-[42px]"
                />
                <span className="text-[16px] font-extrabold uppercase tracking-wide text-[#000000] md:text-[20px]">
                  OFFLINE
                </span>
              </div>
              <span className="mt-2 text-[13px] font-semibold text-[#00000099] md:text-[16px]">
                Modes
              </span>
            </div>

            {/* 3. Duration Block */}
            <div className="info-item flex min-w-[210px] items-center gap-4">
              <div className="h-12 w-12 shrink-0 md:h-[52px] md:w-[52px]">
                <img
                  src="/assets/course/clock.png"
                  alt="Clock"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <span className="whitespace-nowrap text-[18px] font-extrabold leading-tight text-[#000000] md:text-[20px]">
                  {course.duration || '12 Months'}
                </span>
                <span className="mt-1 text-[13px] font-semibold text-[#00000099] md:text-[16px]">
                  Duration
                </span>
              </div>
            </div>

            {/* 4. Fees Block */}
            <div className="info-item flex min-w-[260px] items-start gap-4">
              <div className="mt-1 h-12 w-12 shrink-0 md:h-[52px] md:w-[52px]">
                <img
                  src="/assets/course/money.png"
                  alt="Fees"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="whitespace-nowrap text-[16px] font-extrabold leading-tight text-[#000000] md:text-[18px]">
                  {course.feesOnline || 'Rs.2,10,000'} | ONLINE
                </span>
                <span className="whitespace-nowrap text-[16px] font-extrabold leading-tight text-[#000000] md:text-[18px]">
                  {course.feesOffline || 'Rs.1,75,000'} | OFFLINE
                </span>
                <span className="mt-2 text-[13px] font-semibold text-[#00000099] md:text-[16px]">
                  Fees
                </span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col items-center justify-center gap-3 xl:w-auto xl:items-center">
            <button
              className="cta-button w-[200px] md:w-[170px] h-[44px] md:h-[48px] flex items-center justify-center gap-2 rounded-full text-white font-extrabold text-[13px] md:text-[15px] tracking-wider uppercase transition-transform hover:scale-[1.03]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              BROCHURE
            </button>

            <button
              className="cta-button w-[200px] md:w-[200px] h-[44px] md:h-[48px] rounded-full text-[14px] md:text-[16px] font-extrabold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(90deg, #00679C 0%, #002436 100%)',
                border: '2px solid rgba(236, 255, 92, 0.77)',
              }}
            >
              ENROLL NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseInfoBar;