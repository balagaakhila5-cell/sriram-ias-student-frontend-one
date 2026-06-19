'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { COURSE_EXPLORE_BUTTON_CLASS, COURSE_EXPLORE_BUTTON_LABEL } from '@/components/common/courseExploreButton';

const DAILY_LEARNING_IMAGES = [
  { src: '/assets/blogs/timer-image.png', alt: 'Study desk with books and clock' },
  { src: '/assets/blogs/timer-in-hand.png', alt: 'Daily practice timer' },
  { src: '/assets/blogs/book1.png', alt: 'UPSC study books' },
  { src: '/assets/blogs/book2.png', alt: 'Reading and revision' },
  { src: '/assets/blogs/main-cup.png', alt: 'Focused learning session' },
] as const;

const EXPLORE_HREF = '/current-affairs/daily-learning';
const SLIDE_INTERVAL_MS = 5000;
const SLIDE_COUNT = DAILY_LEARNING_IMAGES.length;

type DailyLearningCardProps = {
  className?: string;
  imageSizes?: string;
};

export default function DailyLearningCard({
  className = '',
  imageSizes = '320px',
}: DailyLearningCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  return (
    <div
      className={`rounded-[10px] bg-[#EEF3FF] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${className}`}
    >
      <h3 className="mb-3 text-center text-[30px] font-extrabold leading-none">
        <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
          Daily Learning
        </span>
      </h3>

      <div
        className="relative h-[225px] overflow-hidden rounded-[8px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out will-change-transform"
          style={{
            width: `${SLIDE_COUNT * 100}%`,
            transform: `translateX(-${(activeIndex * 100) / SLIDE_COUNT}%)`,
          }}
        >
          {DAILY_LEARNING_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className="relative h-full shrink-0"
              style={{ width: `${100 / SLIDE_COUNT}%` }}
              aria-hidden={index !== activeIndex}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={imageSizes}
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center pb-5">
          <Link
            href={EXPLORE_HREF}
            className={`pointer-events-auto ${COURSE_EXPLORE_BUTTON_CLASS}`}
          >
            {COURSE_EXPLORE_BUTTON_LABEL}
          </Link>
        </div>
      </div>
    </div>
  );
}
