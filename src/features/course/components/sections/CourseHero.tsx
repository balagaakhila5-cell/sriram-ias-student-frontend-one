'use client';

import React, { useRef } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

interface Props {
  course: CourseData;
}

const CourseHero: React.FC<Props> = ({ course }) => {
  const titleLines = course.title.split('\n');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const firstChar = titleLines[0]?.charAt(0) || '';
  const restOfFirstLine = titleLines[0]?.substring(1).trim() || '';
  const otherLines = titleLines.slice(1);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.hero-image',
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
        },
      );

      gsap.fromTo(
        '.hero-title-wrapper',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
        },
      );
    },
    { dependencies: [prefersReducedMotion], scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full flex items-center"
      style={{ height: '70vh', minHeight: '400px' }}
    >
      {/* Hero image */}
      <img
        src="/assets/course_image.png"
        alt={course.title}
        className="hero-image absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/75 to-transparent" />

      {/* Text Container */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-5xl hero-title-wrapper">
        <h1
          className="flex items-center"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0.8) 12.5%, #7575DF 47.6%, #9E9EFD 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {firstChar && (
            <span
              className="shrink-0"
              style={{
                fontWeight: 700,
                fontSize: '120px',
                lineHeight: '1',
                letterSpacing: '0%',
                paddingRight: '16px',
              }}
            >
              {firstChar}
            </span>
          )}

          <span className="block">
            {restOfFirstLine && (
              <span
                className="block"
                style={{
                  fontWeight: 1000,
                  fontSize: '56px',
                  lineHeight: '1.2',
                }}
              >
                {restOfFirstLine}
              </span>
            )}

            {otherLines.map((line, i) => (
              <span
                key={i}
                className="block"
                style={{
                  fontWeight: 1000,
                  fontSize: '56px',
                  lineHeight: '1.2',
                }}
              >
                {line.trim()}
              </span>
            ))}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default CourseHero;