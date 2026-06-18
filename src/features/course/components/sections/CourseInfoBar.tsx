'use client';

import React, { useRef, useState } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import EnrollAuthModal from './EnrollAuthModal';
import YouTubeVideoModal from '@/components/common/YouTubeVideoModal';

const DEFAULT_DEMO_VIDEO_ID = '8aLYn6C9n8I';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  course: CourseData;
}

const DEFAULT_BROCHURE_URL = '/assets/samples/sriram-sample.pdf';

const getBrochureFileName = (course: CourseData) => {
  const slug = course.slug?.replace(/[^\w-]+/g, '-') ?? 'course';
  return `${slug}-brochure.pdf`;
};

const getFeeDisplay = (fee?: string, fallback?: string) => {
  if (!fee || fee === '—' || fee === '-') return fallback ?? '';
  return fee;
};

const downloadBrochure = (url: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const CourseInfoBar: React.FC<Props> = ({ course }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleBrochureClick = () => {
    const url = course.brochure?.trim() || DEFAULT_BROCHURE_URL;
    downloadBrochure(url, getBrochureFileName(course));
  };

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
    <>
      <section
      ref={containerRef}
      className="relative w-full border border-black/10 px-4 py-5 font-['Montserrat',sans-serif] md:px-8 md:py-6 lg:py-7 xl:px-0"
      style={{
        backgroundImage: `url(${course.coursedetailsbg})`,
        backgroundSize: '320px auto',
        backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1400px] min-h-[88px] md:min-h-[96px]">
        <div className="flex h-full w-full flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:gap-5 xl:gap-6">
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto pb-1 lg:gap-4 xl:gap-5 xl:overflow-visible xl:pb-0">
            {/* Date */}
            <div className="info-item flex shrink-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 md:h-12 md:w-12">
                <img
                  src="/assets/course/calendar.png"
                  alt="Calendar"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex min-w-0 flex-col whitespace-nowrap">
                <span className="text-[17px] font-extrabold leading-tight text-[#000000] md:text-[18px]">
                  {course.startDate || 'Course Starts Soon'}
                </span>
                <span className="mt-0.5 text-[12px] font-semibold text-[#00000099] md:text-[13px]">
                  Date of Commencement
                </span>
              </div>
            </div>

            <div className="hidden h-10 w-px shrink-0 bg-black/10 sm:block" aria-hidden />

            {/* Modes — single line */}
            <div className="info-item flex shrink-0 items-center">
              <div className="flex min-w-0 flex-col">
                <div className="flex items-center gap-3 whitespace-nowrap md:gap-4">
                  <div className="flex items-center gap-1.5">
                    <img
                      src="/assets/course/online-icon.png"
                      alt="Online"
                      className="h-7 w-7 object-contain md:h-9 md:w-9"
                    />
                    <span className="text-[15px] font-extrabold uppercase tracking-wide text-[#000000] md:text-[17px]">
                      ONLINE
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <img
                      src="/assets/course/offline-icon.png"
                      alt="Offline"
                      className="h-7 w-7 object-contain md:h-9 md:w-9"
                    />
                    <span className="text-[15px] font-extrabold uppercase tracking-wide text-[#000000] md:text-[17px]">
                      OFFLINE
                    </span>
                  </div>
                </div>
                <span className="mt-0.5 text-[12px] font-semibold text-[#00000099] md:text-[13px]">
                  Modes
                </span>
              </div>
            </div>

            <div className="hidden h-10 w-px shrink-0 bg-black/10 sm:block" aria-hidden />

            {/* Duration */}
            <div className="info-item flex shrink-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 md:h-12 md:w-12">
                <img
                  src="/assets/course/clock.png"
                  alt="Clock"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex min-w-0 flex-col whitespace-nowrap">
                <span className="text-[17px] font-extrabold leading-tight text-[#000000] md:text-[18px]">
                  {course.duration || '12 Months'}
                </span>
                <span className="mt-0.5 text-[12px] font-semibold text-[#00000099] md:text-[13px]">
                  Duration
                </span>
              </div>
            </div>

            <div className="hidden h-10 w-px shrink-0 bg-black/10 lg:block" aria-hidden />

            {/* Fees */}
            <div className="info-item flex shrink-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 md:h-12 md:w-12">
                <img
                  src="/assets/course/money.png"
                  alt="Fees"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="whitespace-nowrap text-[15px] font-extrabold leading-tight text-[#000000] md:text-[16px]">
                  {getFeeDisplay(course.feesOnline, 'Rs.2,10,000')} | ONLINE
                </span>
                <span className="whitespace-nowrap text-[15px] font-extrabold leading-tight text-[#000000] md:text-[16px]">
                  {getFeeDisplay(course.feesOffline, 'Rs.1,75,000')} | OFFLINE
                </span>
                <span className="mt-0.5 text-[12px] font-semibold text-[#00000099] md:text-[13px]">
                  Fees
                </span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full shrink-0 flex-col items-center justify-center gap-2.5 lg:w-[290px] xl:w-[310px]">
              <button
                type="button"
                onClick={() => setIsEnrollOpen(true)}
                className="cta-button h-[42px] w-full max-w-[290px] cursor-pointer whitespace-nowrap rounded-full px-5 text-[13px] font-extrabold uppercase tracking-wide text-white transition-transform hover:scale-[1.03] md:h-[44px] md:px-6 md:text-[14px]"
                style={{
                  background:
                    'linear-gradient(90deg, #00679C 0%, #002436 100%)',
                  border: '2px solid rgba(236, 255, 92, 0.77)',
                }}
              >
                ENROLL NOW
              </button>

              <div className="flex w-full max-w-[290px] gap-2.5">
                <button
                  type="button"
                  onClick={handleBrochureClick}
                  className="cta-button flex h-[42px] min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[11px] font-extrabold uppercase tracking-wide text-white transition-transform hover:scale-[1.03] md:h-[44px] md:px-4 md:text-[12px]"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  BROCHURE
                </button>

                <button
                  type="button"
                  onClick={() => setIsDemoOpen(true)}
                  className="cta-button flex h-[42px] min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[11px] font-extrabold uppercase tracking-wide text-white transition-transform hover:scale-[1.03] md:h-[44px] md:px-4 md:text-[12px]"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="shrink-0"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  VIEW DEMO
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnrollAuthModal
        open={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />

      <YouTubeVideoModal
        isOpen={isDemoOpen}
        videoId={DEFAULT_DEMO_VIDEO_ID}
        title={`${course.title} Demo`}
        onClose={() => setIsDemoOpen(false)}
      />
    </>
  );
};

export default CourseInfoBar;