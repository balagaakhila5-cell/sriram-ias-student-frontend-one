'use client';

import React, { useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  city: string;
}

const COURSES_BY_CITY: Record<
  string,
  { title: string; img: string; slug: string }[]
> = {
  delhi: [
    {
      title: 'GS Foundation Course',
      img: 'course-1.png',
      slug: '2-years-gs-foundation',
    },
    {
      title: 'Mentorship Course',
      img: 'course-2.png',
      slug: 'stride-mentorship-program',
    },
    {
      title: 'Optional Foundation',
      img: 'course-3.png',
      slug: 'anthropology-optional-foundation',
    },
    {
      title: 'Test Series',
      img: 'course-4.png',
      slug: 'prelims-test-series-mentorship',
    },
  ],
  hyderabad: [
    {
      title: 'GS Foundation Course',
      img: 'course-1.png',
      slug: '2-years-gs-foundation-hyderabad',
    },
    {
      title: 'Mentorship Course',
      img: 'course-2.png',
      slug: 'mentorship-program',
    },
    {
      title: 'Optional Foundation',
      img: 'course-3.png',
      slug: 'psir-optional-foundational',
    },
    {
      title: 'Test Series',
      img: 'course-4.png',
      slug: 'prelims-test-series-2026',
    },
  ],
  pune: [
    {
      title: 'GS Foundation Course',
      img: 'course-1.png',
      slug: '2-years-gs-foundation-pune',
    },
    {
      title: 'Mentorship Course',
      img: 'course-2.png',
      slug: 'mentorship-program',
    },
    {
      title: 'Optional Foundation',
      img: 'course-3.png',
      slug: 'geography-optional',
    },
    {
      title: 'Test Series',
      img: 'course-4.png',
      slug: 'prelims-test-series-2026',
    },
  ],
};

const CoursesInCity: React.FC<Props> = ({ city }) => {
  const cityKey = city.toLowerCase();
  const cityName = cityKey.toUpperCase();
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const courses = useMemo(
    () => COURSES_BY_CITY[cityKey] ?? COURSES_BY_CITY.delhi,
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
      className="relative w-full py-24 bg-white flex flex-col items-center px-6 md:px-12 lg:px-24 overflow-hidden"
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
        className="courses-city-heading text-[32px] md:text-[50px] font-[900] uppercase tracking-wider mb-14 relative z-10 font-['Montserrat']"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-[1400px] relative z-10">
        {courses.map((course) => (
          <div
            key={course.slug}
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
              <h3 className="text-[18px] lg:text-[20px] font-[800] text-center text-[#111] font-['Montserrat'] leading-tight px-2">
                {course.title}
              </h3>

              <Link
                href={`/course/${course.slug}`}
                className="mt-auto bg-[#044062] hover:bg-[#065A8C] text-white font-semibold text-[15px] px-8 py-3 rounded-md transition-colors font-['Montserrat'] shadow-md whitespace-nowrap"
              >
                View Courses
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 font-['Montserrat'] font-semibold text-[16px] md:text-[20px] text-[#4A4A4A] relative z-10">
        For More details contact us at{' '}
        <span className="text-[#111] font-bold border-b-2 border-black pb-0.5 ml-1 inline-block leading-none">
          9811489560
        </span>
      </div>
    </section>
  );
};

export default CoursesInCity;