'use client';

import React, { useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import {
  formatCityLabel,
  getCenterCategory,
  getProgramsForCategory,
} from '@/features/center/data/centerCourseCategories';

gsap.registerPlugin(ScrollTrigger);

const PROGRAM_CARD_IMAGE = '/assets/student/course-card.png';

type Props = {
  city: string;
  category: string;
};

const CenterCategoryPrograms: React.FC<Props> = ({ city, category }) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const cityKey = city.toLowerCase();
  const cityLabel = formatCityLabel(cityKey);

  const categoryData = useMemo(
    () => getCenterCategory(cityKey, category),
    [cityKey, category],
  );

  const programs = useMemo(
    () => getProgramsForCategory(cityKey, category),
    [cityKey, category],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.center-programs-heading', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      });

      gsap.fromTo(
        '.center-program-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.center-programs-grid',
            start: 'top 88%',
            once: true,
          },
        },
      );
    },
    { dependencies: [prefersReducedMotion, programs.length], scope: containerRef },
  );

  if (!categoryData) return null;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white px-6 py-20 md:px-12 lg:px-24"
    >
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top right, rgba(70,161,212,0.12) 30%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(212,123,131,0.1) 20%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <Link
          href={`/centers/${cityKey}`}
          className="mb-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#044062] transition hover:text-[#065A8C]"
        >
          <ArrowLeft size={18} />
          Back to {cityLabel} Center
        </Link>

        <h1
          className="center-programs-heading mb-4 text-[28px] font-[900] uppercase tracking-wider md:text-[42px]"
          style={{
            background:
              'linear-gradient(90deg, #46A1D4 0%, #908CAF 45%, #D47B83 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {categoryData.title}
        </h1>

        <p className="mb-12 text-[16px] font-medium text-[#666] md:text-[18px]">
          Programs available at {cityLabel}
        </p>

        <div className="center-programs-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.slug}
              className="center-program-card group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src={PROGRAM_CARD_IMAGE}
                  alt={program.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <h2 className="absolute bottom-4 left-5 right-5 text-[17px] font-extrabold leading-snug text-white md:text-[18px]">
                  {program.title}
                </h2>
              </div>

              <div className="flex flex-col gap-4 p-6">
                {program.startDate ? (
                  <p className="text-[14px] font-semibold text-[#444]">
                    Start Date:{' '}
                    <span className="font-bold text-[#111]">{program.startDate}</span>
                  </p>
                ) : null}

                {program.mode ? (
                  <p className="text-[14px] font-semibold text-[#444]">
                    Mode:{' '}
                    <span className="font-bold text-[#111]">{program.mode}</span>
                  </p>
                ) : null}

                {program.feesOnline ? (
                  <p className="text-[15px] font-bold text-[#044062]">
                    Online Fees: {program.feesOnline}
                  </p>
                ) : null}

                <Link
                  href={`/course/${program.slug}`}
                  className="mt-auto inline-flex h-[44px] items-center justify-center rounded-md bg-[#044062] px-6 text-[15px] font-semibold text-white transition hover:bg-[#065A8C]"
                >
                  View Courses
                </Link>
              </div>
            </article>
          ))}
        </div>

        {programs.length === 0 ? (
          <div className="flex h-[240px] items-center justify-center rounded-2xl bg-[#F8FAFC] text-[16px] font-medium text-[#666]">
            No programs available in this category right now.
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CenterCategoryPrograms;
