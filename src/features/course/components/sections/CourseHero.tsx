'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
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

const LINE_FONT_SIZE_PX = 56;
/** Taller than text block — Montserrat digits sit inside the em box (Y top → F bottom). */
const LEADING_NUMBER_HEIGHT_SCALE = 1.18;
/** Base nudge for Montserrat vertical metrics. */
const LEADING_NUMBER_BASE_TOP_OFFSET_PX = -3;

const getLeadingNumberSize = (textLineCount: number, measuredHeight?: number) => {
  const textHeight = measuredHeight ?? LINE_FONT_SIZE_PX * textLineCount;
  return Math.round(textHeight * LEADING_NUMBER_HEIGHT_SCALE);
};

const getLeadingNumberTopOffset = (textLineCount: number, measuredHeight?: number) => {
  const textHeight = measuredHeight ?? LINE_FONT_SIZE_PX * textLineCount;
  const extraHeight = textHeight * (LEADING_NUMBER_HEIGHT_SCALE - 1);
  return Math.round(LEADING_NUMBER_BASE_TOP_OFFSET_PX - extraHeight / 2);
};

const lineTextStyle: React.CSSProperties = {
  fontWeight: 1000,
  fontSize: `${LINE_FONT_SIZE_PX}px`,
  lineHeight: 1.2,
};

/** Tighter lines so the leading digit spans from the first cap (Y) to the last (F). */
const lineTextStyleBesideNumber: React.CSSProperties = {
  fontWeight: 1000,
  fontSize: `${LINE_FONT_SIZE_PX}px`,
  lineHeight: 1,
};

const CourseHero: React.FC<Props> = ({ course }) => {
  const displayTitle = stripCityFromTitle(course.title, course.city);
  const titleLines = displayTitle.split('\n').map((line) => line.trim()).filter(Boolean);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const [textBlockHeight, setTextBlockHeight] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const firstLine = titleLines[0] ?? '';
  const otherLines = titleLines.slice(1);
  const leadingNumberMatch = firstLine.match(/^(\d+)\s*(.*)$/);
  const leadingNumber = leadingNumberMatch?.[1];
  const restOfFirstLine = leadingNumberMatch?.[2]?.trim() ?? '';
  const textLinesBesideNumber = [restOfFirstLine, ...otherLines].filter(Boolean);

  useLayoutEffect(() => {
    if (!leadingNumber || !titleTextRef.current) {
      setTextBlockHeight(0);
      return;
    }

    const measure = () => {
      const height = titleTextRef.current?.offsetHeight ?? 0;
      if (height > 0) setTextBlockHeight(height);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(titleTextRef.current);
    return () => observer.disconnect();
  }, [leadingNumber, displayTitle, textLinesBesideNumber.join('|')]);

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
          <h1
            className="flex items-start"
            style={{
              ...titleGradientStyle,
              gap: '20px',
            }}
          >
            <span
              className="shrink-0 grow-0 leading-none"
              style={{
                fontWeight: 700,
                fontSize: `${getLeadingNumberSize(textLinesBesideNumber.length, textBlockHeight || undefined)}px`,
                lineHeight: 1,
                marginTop: `${getLeadingNumberTopOffset(textLinesBesideNumber.length, textBlockHeight || undefined)}px`,
              }}
            >
              {leadingNumber}
            </span>
            <span ref={titleTextRef} className="min-w-0 leading-none">
              {textLinesBesideNumber.map((line, i) => (
                <span key={i} className="block" style={lineTextStyleBesideNumber}>
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
