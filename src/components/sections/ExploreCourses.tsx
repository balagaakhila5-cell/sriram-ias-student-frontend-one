'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from '@/components/common/AppImage';
import Link from '@/components/common/AppLink';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  COURSE_EXPLORE_BUTTON_CLASS,
  COURSE_EXPLORE_BUTTON_LABEL,
} from '@/components/common/courseExploreButton';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { useExploreCoursesCatalog } from '@/features/homepage/hooks/useExploreCoursesCatalog';
import { findStaticMatch } from '@/features/course/adapters/courseAdapter';
import type { FlatExploreCourseCard } from '@/features/homepage/adapters/homepageAdapter';

gsap.registerPlugin(ScrollTrigger);

const EXPLORE_COURSE_CARD_IMAGE = '/assets/student/course-card.png';

const FALLBACK_TABS = [
  'GS Foundation',
  'Mentorship',
  'Optional Foundation',
  'Test Series',
  'CSAT',
  'Enrichment Course',
] as const;

type ExploreCardCourse = Pick<
  FlatExploreCourseCard,
  'batchId' | 'slug' | 'courseName' | 'thumbnail' | 'centerName' | 'prices'
> & {
  _id: string;
  title: string;
  onlineFees?: number;
  offlineFees?: number;
  center?: string;
};

const formatFee = (fee?: number) =>
  typeof fee === 'number' && fee > 0
    ? `Rs. ${fee.toLocaleString('en-IN')}`
    : 'Contact us';

const toExploreCard = (course: FlatExploreCourseCard): ExploreCardCourse => ({
  _id: `${course.batchId}-${course.slug}`,
  batchId: course.batchId,
  slug: course.slug,
  courseName: course.courseName,
  thumbnail: course.thumbnail,
  centerName: course.centerName,
  prices: course.prices,
  title: course.courseName,
  onlineFees: course.prices.online,
  offlineFees: course.prices.offline,
  center: course.centerName,
});

const ExploreCourses: React.FC = () => {
  const { programs, getCoursesForProgram, isLoading, hasApiData } =
    useExploreCoursesCatalog();

  const tabs = hasApiData ? programs : [...FALLBACK_TABS];

  const [activeTab, setActiveTab] = useState<string>('GS Foundation');

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (tabs.length > 0 && !tabs.includes(activeTab)) {
      setActiveTab(tabs[0]);
    }
  }, [tabs, activeTab]);

  const visibleCourses = useMemo((): ExploreCardCourse[] => {
    if (!hasApiData) return [];
    return getCoursesForProgram(activeTab).map(toExploreCard);
  }, [activeTab, getCoursesForProgram, hasApiData]);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from(headerRef.current, {
        y: 100,
        opacity: 0,
        immediateRender: false,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
        force3D: true,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(tabsRef.current, {
        y: 50,
        opacity: 0,
        immediateRender: false,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
        force3D: true,
        scrollTrigger: {
          trigger: tabsRef.current,
          start: 'top 90%',
          once: true,
        },
      });
    },
    { dependencies: [prefersReducedMotion], scope: sectionRef },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      if (gridRef.current && gridRef.current.children.length > 0) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 40, opacity: 0, immediateRender: false },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }
    },
    {
      scope: sectionRef,
      dependencies: [activeTab, prefersReducedMotion, visibleCourses.length],
    },
  );

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab === activeTab);
    const activeButton = buttonRefs.current[activeIndex];
    const indicator = indicatorRef.current;

    if (activeButton && indicator) {
      gsap.set(indicator, {
        x: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  const handleTabClick = (tab: string, idx: number) => {
    setActiveTab(tab);

    const activeButton = buttonRefs.current[idx];
    const indicator = indicatorRef.current;

    if (activeButton && indicator) {
      gsap.killTweensOf(indicator);
      gsap.to(indicator, {
        x: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        duration: prefersReducedMotion ? 0 : 0.35,
        ease: 'power3.out',
        overwrite: true,
      });
    }
  };

  return (
    <section
      id="explore-courses"
      ref={sectionRef}
      className="relative scroll-mt-8 bg-white px-4 pt-20 pb-8 md:px-8 lg:px-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl space-y-12">
        <div ref={headerRef} className="text-center">
          <h2 className="global-section-heading">EXPLORE OUR COURSES</h2>
        </div>

        <div
          ref={tabsRef}
          className="relative mx-auto w-fit max-w-full overflow-x-auto rounded-full bg-[#F5F5F5] p-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="relative inline-flex gap-1">
            <div
              ref={indicatorRef}
              className="btn-gradient absolute bottom-2 left-0 top-2 z-0 rounded-full shadow-md will-change-transform"
              style={{ width: '0px' }}
            />

            {tabs.map((tab, idx) => (
              <button
                key={tab}
                type="button"
                ref={(el) => {
                  buttonRefs.current[idx] = el;
                }}
                onClick={() => handleTabClick(tab, idx)}
                className={`relative z-10 whitespace-nowrap rounded-full px-4 py-3 text-center text-[11px] font-medium leading-tight transition-colors duration-300 sm:px-5 sm:text-sm md:text-base ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px]">
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visibleCourses.length > 0 ? (
              visibleCourses.map((course) => {
                const staticMatch = findStaticMatch({
                  title: course.title,
                  slug: course.slug,
                });
                const href = `/course/${course.slug || staticMatch?.slug || course._id}`;
                const center = course.center ?? course.centerName ?? 'New Delhi';
                const fee = formatFee(course.onlineFees);
                const cardImage =
                  course.thumbnail?.trim() || EXPLORE_COURSE_CARD_IMAGE;

                return (
                  <Link
                    href={href}
                    key={course._id}
                    className="group relative block w-full cursor-pointer overflow-hidden rounded-lg bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={cardImage}
                        alt={course.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 z-10 flex items-end justify-center p-5 pb-6 text-center transition-opacity duration-300 group-hover:opacity-0 sm:pb-7">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                        <h3 className="relative max-w-[92%] font-bold text-base leading-snug text-[#FFE81C] drop-shadow-md sm:text-lg md:text-xl">
                          {course.title}
                        </h3>
                      </div>

                      <div
                        className="absolute inset-0 z-20 grid translate-y-full grid-rows-[auto_1fr_auto] overflow-hidden p-4 transition-transform duration-500 ease-out group-hover:translate-y-0 sm:p-5"
                        style={{
                          background:
                            'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.95) 100%)',
                        }}
                      >
                        <h3 className="text-center text-[15px] font-bold leading-snug text-[#FFE81C] sm:text-base md:text-lg">
                          {course.title}
                        </h3>

                        <div className="flex flex-col items-center justify-center gap-2 text-center">
                          <p className="text-sm font-medium capitalize text-white sm:text-base">
                            {center}
                          </p>

                          <div className="inline-flex w-fit max-w-full flex-col items-center">
                            <p className="text-lg font-semibold text-[#FFE81C] sm:text-xl md:text-2xl">
                              {fee}
                              <span className="text-[#FFE81C]">*</span>
                            </p>
                            <p className="mt-0.5 whitespace-nowrap text-[9px] text-white/60 sm:text-[10px]">
                              * Excluding GST
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center pt-1">
                          <span className={COURSE_EXPLORE_BUTTON_CLASS}>
                            {COURSE_EXPLORE_BUTTON_LABEL}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400">
                {isLoading
                  ? 'Loading courses...'
                  : hasApiData
                    ? `No courses available under ${activeTab}.`
                    : 'No courses available in this category.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCourses;
