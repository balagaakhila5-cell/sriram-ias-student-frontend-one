'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { useCategories, useCourses } from '@/features/course/hooks/useCourses';
import { findStaticMatch } from '@/features/course/adapters/courseAdapter';
import type { CourseSummary } from '@/features/course/services/coursesService';

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_TABS = [
  'GS Foundation',
  'Mentorship',
  'Optional Foundation',
  'Test Series',
  'CSAT',
  'Enrichment Courses',
];

const TAB_ORDER = [
  'GS Foundation',
  'Mentorship',
  'Optional Foundation',
  'Test Series',
  'CSAT',
  'Enrichment Courses',
];

const formatFee = (fee?: number) =>
  typeof fee === 'number' ? `Rs. ${fee.toLocaleString('en-IN')} /-` : 'Rs. —';

const getCategoryName = (c: CourseSummary): string | undefined =>
  typeof c.category === 'string' ? c.category : c.category?.name;

const getCenterName = (c: CourseSummary): string | undefined =>
  typeof c.center === 'string' ? c.center : c.center?.name;

const ExploreCourses: React.FC = () => {
  const { data: categories } = useCategories();
  const { data: allCourses } = useCourses();

  const tabs = useMemo(() => {
    const list = Array.isArray(categories) ? categories : [];
    const names = list.map((c) => c.name).filter(Boolean);

    if (names.length === 0) return FALLBACK_TABS;

    const orderedTabs = TAB_ORDER.filter((tab) => names.includes(tab));
    const remainingTabs = names.filter((tab) => !TAB_ORDER.includes(tab));

    return [...orderedTabs, ...remainingTabs];
  }, [categories]);

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

  const visibleCourses = useMemo(() => {
    const courses = Array.isArray(allCourses) ? allCourses : [];
    return courses.filter((c) => getCategoryName(c) === activeTab);
  }, [allCourses, activeTab]);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.from(headerRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
      force3D: true,
      scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
    });

    gsap.from(tabsRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.5,
      force3D: true,
      scrollTrigger: { trigger: tabsRef.current, start: 'top 90%', once: true },
    });
  }, { dependencies: [prefersReducedMotion], scope: sectionRef });

  useGSAP(() => {
    if (prefersReducedMotion) return;

    if (gridRef.current && gridRef.current.children.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
        },
      );
    }
  }, { scope: sectionRef, dependencies: [activeTab, prefersReducedMotion, visibleCourses.length] });

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
    <section ref={sectionRef} className="relative py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        <div ref={headerRef} className="text-center">
          <h2 className="global-section-heading">EXPLORE OUR COURSES</h2>
        </div>

        <div ref={tabsRef} className="w-full bg-[#F5F5F5] rounded-full p-2 flex relative overflow-x-auto scrollbar-hide">
          <div
            ref={indicatorRef}
            className="absolute top-2 bottom-2 left-0 btn-gradient rounded-full shadow-md z-0 will-change-transform"
            style={{ width: '0px' }}
          />

          {tabs.map((tab, idx) => (
            <button
              key={tab}
              ref={(el) => { buttonRefs.current[idx] = el; }}
              onClick={() => handleTabClick(tab, idx)}
              className={`relative px-8 py-3 rounded-full font-medium text-sm md:text-base transition-colors duration-300 whitespace-nowrap flex-1 text-center z-10 ${
                activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCourses.length > 0 ? (
              visibleCourses.map((course) => {
                const staticMatch = findStaticMatch(course);
                const href = `/course/${staticMatch?.slug ?? course.slug ?? course._id}`;
                const image = course.banner ?? staticMatch?.heroImage ?? '/assets/course_image.png';
                const center = getCenterName(course) ?? staticMatch?.city ?? 'Delhi';
                const fee = formatFee(course.onlineFees);

                return (
                  <Link
                    href={href}
                    key={course._id}
                    className="group relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-500 bg-white rounded-lg cursor-pointer w-full block"
                  >
                    <div className="aspect-[16/9] overflow-hidden w-full bg-gray-100 relative">
                      <Image
                        src={image}
                        alt={course.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 p-5 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0 z-10">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                        <h3 className="relative text-[#FFE81C] font-bold text-base leading-tight drop-shadow-md">
                          {course.title}
                        </h3>
                      </div>

                      <div
                        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 flex flex-col justify-between p-5"
                        style={{ background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.95) 100%)' }}
                      >
                        <div className="relative z-30 space-y-3">
                          <div className="border-b border-white/20 pb-4">
                            <div className="flex items-start gap-2">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFE81C" className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                              </svg>
                              <span className="text-[#FFE81C] text-[15px] md:text-base font-bold leading-snug">
                                {course.title}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-white text-sm md:text-base font-medium">
                            <div className="flex items-center gap-1.5">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                              </svg>
                              <span className="capitalize">{center}</span>
                            </div>
                          </div>

                          <p className="text-[#FFE81C] text-1xl md:text-1xl">{fee}</p>
                        </div>

                        <div className="relative z-30 mt-2">
                          <span className="inline-block bg-white text-black px-9 py-1 rounded-xl text-base shadow-lg">
                            Explore
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400">
                {allCourses ? 'No courses available in this category.' : 'Loading courses...'}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCourses;