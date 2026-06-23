'use client';

import React, { useMemo, useRef } from 'react';
import Image from '@/components/common/AppImage';
import Link from '@/components/common/AppLink';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import {
  CENTER_CATEGORIES_BY_CITY,
  formatCenterDisplayName,
  type CenterCity,
} from '@/features/center/data/centerCourseCategories';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  city: string;
}

const CoursesInCity: React.FC<Props> = ({ city }) => {
  const cityKey = city.toLowerCase() as CenterCity;
  const cityName = formatCenterDisplayName(city);
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const courses = useMemo(
    () => CENTER_CATEGORIES_BY_CITY[cityKey] ?? CENTER_CATEGORIES_BY_CITY.delhi,
    [cityKey],
  );
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.courses-city-heading', {
        y: 70,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          once: true,
        },
      });

      gsap.fromTo(
        '.courses-city-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.courses-city-card',
            start: 'top 90%',
            once: true,
          },
        },
      );
    },
    { dependencies: [prefersReducedMotion], scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col items-center overflow-hidden bg-gradient-to-br from-[#EAE8F4] via-[#FFFFFF] to-[#E3F2F9] px-6 pb-16 pt-4 md:px-12 md:pb-20 md:pt-6 lg:px-24"
    >
      <div
        className="pointer-events-none absolute top-[-140px] right-[8%] z-0 h-[260px] w-[260px] rounded-b-full bg-white"
        style={{
          boxShadow: '0px 0px 120px 20px rgba(91, 178, 229, 0.7)',
        }}
      />

      <div
        className="pointer-events-none absolute top-1/2 right-[-160px] z-0 h-[260px] w-[260px] -translate-y-1/2 rounded-l-full bg-white"
        style={{
          boxShadow: '0px 0px 120px 20px rgba(91, 178, 229, 0.7)',
        }}
      />

      <div
        className="pointer-events-none absolute top-[80px] left-[-200px] z-0 h-[190px] w-[450px] opacity-100"
        style={{
          background:
            'linear-gradient(181.87deg, #ACAFFF -157.44%, rgba(181,189,254,0.96) -157.4%, rgba(171,169,213,0.67) 216.94%, rgba(150,143,199,0.8) 216.94%)',
          filter: 'blur(70px)',
          transform: 'rotate(30deg)',
        }}
      />

      <div
        className="pointer-events-none absolute bottom-[80px] left-[-200px] z-0 h-[190px] w-[450px] opacity-100"
        style={{
          background:
            'linear-gradient(181.87deg, #ACAFFF -157.44%, rgba(181,189,254,0.96) -157.4%, rgba(171,169,213,0.67) 216.94%, rgba(150,143,199,0.8) 216.94%)',
          filter: 'blur(70px)',
          transform: 'rotate(150deg)',
        }}
      />

      <h2
        className="courses-city-heading relative z-10 mb-8 font-['Montserrat'] text-[32px] font-[900] uppercase tracking-wider md:text-[50px]"
        style={{
          background:
            'linear-gradient(90deg, #46A1D4 0%, #908CAF 45%, #D47B83 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        COURSES IN{' '}
        <span className="whitespace-nowrap">{cityName}</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1400px] relative z-10">
        {courses.map((course) => (
          <div
            key={course.key}
            className="courses-city-card bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300"
          >
            {/* Image container */}
            <div className="w-full h-[240px] relative">
              <Image
                src={`/assets/our-centers/${course.img}`}
                alt={course.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover rounded-b-[24px]"
                onError={(e: any) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Bottom Card Area */}
            <div className="p-8 flex flex-col items-center gap-6 grow bg-white">
              <h3 className="px-2 text-center font-['Montserrat'] text-[22px] font-[800] leading-tight text-[#111] md:text-[24px] lg:text-[28px]">
                {course.title}
              </h3>

              <Link
                href={`/centers/${cityKey}/courses/${course.key}`}
                className="mt-auto whitespace-nowrap rounded-full bg-[#044062] px-8 py-3 font-['Montserrat'] text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-[#065A8C]"
              >
                View Courses
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesInCity;
