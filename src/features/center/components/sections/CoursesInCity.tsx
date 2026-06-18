'use client';

import React, { useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
      className="relative flex w-full flex-col items-center overflow-hidden bg-white px-6 pb-16 pt-4 md:px-12 md:pb-20 md:pt-6 lg:px-24"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/assets/dropdown-video.mp4" type="video/mp4" />
        </video>

        {/* White Overlay to maintain "totally white" look while showing video */}
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* Background waves decoration placeholder */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top right, rgba(255,255,255,0.8) 30%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(255,255,255,0.8) 20%, transparent 50%)',
        }}
      ></div>

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
        COURSES IN {cityName}
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
                className="mt-auto bg-[#044062] hover:bg-[#065A8C] text-white font-semibold text-[15px] px-8 py-3 rounded-md transition-colors font-['Montserrat'] shadow-md whitespace-nowrap"
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
