'use client';

import React, { useRef } from 'react';
import type { CourseData } from '../../types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

interface Props {
  course: CourseData;
}

const stripCityFromTitle = (title: string, city?: CourseData['city']) => {
  if (!city) return title;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  return title.replace(new RegExp(`\\s*-\\s*${cityName}`, 'gi'), '');
};

const titleGradientStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  background:
    'linear-gradient(90deg, rgba(255, 255, 255, 0.8) 12.5%, #7575DF 47.6%, #9E9EFD 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitFontSmoothing: 'antialiased',
};

const lineTextStyle: React.CSSProperties = {
  fontWeight: 1000,
  fontSize: '56px',
  lineHeight: '1.2',
};

const leadingNumberStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '120px',
  lineHeight: '1',
  letterSpacing: '0%',
  paddingRight: '16px',
};

const CourseHero: React.FC<Props> = ({ course }) => {
  const displayTitle = stripCityFromTitle(course.title, course.city);
  const titleLines = displayTitle.split('\n').map((line) => line.trim()).filter(Boolean);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const firstLine = titleLines[0] ?? '';
  const otherLines = titleLines.slice(1);
  const leadingNumberMatch = firstLine.match(/^(\d+)\s*(.*)$/);
  const leadingNumber = leadingNumberMatch?.[1];
  const restOfFirstLine = leadingNumberMatch?.[2]?.trim() ?? '';

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
      className="relative flex w-full items-center"
      style={{ height: '82vh', minHeight: '520px', maxHeight: '720px' }}
    >
      <img
        src="/assets/course_image.png"
        alt={displayTitle}
        className="hero-image absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/75 to-transparent" />

      <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-5xl hero-title-wrapper">
        {leadingNumber ? (
          <h1 className="flex items-center" style={titleGradientStyle}>
            <span className="shrink-0" style={leadingNumberStyle}>
              {leadingNumber}
            </span>
            <span className="block">
              {restOfFirstLine && (
                <span className="block" style={lineTextStyle}>
                  {restOfFirstLine}
                </span>
              )}
              {otherLines.map((line, i) => (
                <span key={i} className="block" style={lineTextStyle}>
                  {line}
                </span>
              ))}
            </span>
          </h1>
        ) : (
          <h1 style={titleGradientStyle}>
            {titleLines.map((line, i) => (
              <span key={i} className="block" style={lineTextStyle}>
                {line}
              </span>
            ))}
          </h1>
        )}
      </div>
    </section>
  );
};

export default CourseHero;
