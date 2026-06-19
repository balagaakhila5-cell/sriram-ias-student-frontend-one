'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  COURSE_EXPLORE_BUTTON_CLASS,
  COURSE_EXPLORE_BUTTON_LABEL,
} from '@/components/common/courseExploreButton';

export const DAILY_LEARNING_BANNER_IMAGE =
  '/assets/current-affairs/daily-practice-questions/daily-practice-questions-banner.png';

export const DAILY_LEARNING_CARD_IMAGE = '/assets/blogs/timer-image.png';

export type DailyLearningTopic = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export const DAILY_LEARNING_TOPICS: DailyLearningTopic[] = [
  {
    title: 'Daily Learning',
    description: 'Build daily study habits with curated learning resources.',
    image: DAILY_LEARNING_CARD_IMAGE,
    href: '/current-affairs/daily-learning',
  },
  {
    title: 'Daily Practice Quiz',
    description: 'Attempt daily MCQs and track your prelims readiness.',
    image: '/assets/current-affairs/daily-practice-questions.png',
    href: '/current-affairs/daily-practice-questions',
  },
  {
    title: 'Daily Current Affairs',
    description: 'Stay updated with curated news and analysis every day.',
    image: '/assets/current-affairs/daily-current-affairs.png',
    href: '/current-affairs/daily-current-affairs',
  },
  {
    title: 'Monthly Magazine',
    description: 'Deep-dive compilations for structured revision.',
    image: '/assets/current-affairs/monthly-magazine.png',
    href: '/current-affairs/monthly-magazine',
  },
  {
    title: 'Infographics',
    description: 'Visual summaries for faster recall and revision.',
    image: '/assets/current-affairs/infographics.png',
    href: '/current-affairs/infographics',
  },
  {
    title: 'Study Materials',
    description: 'Access notes and resources for every GS paper.',
    image: '/assets/blogs/book1.png',
    href: '/free_resources/study-materials',
  },
];

const SLIDE_INTERVAL_MS = 5000;

export default function DailyLearningTopicCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const slideCount = DAILY_LEARNING_TOPICS.length;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const width = viewport.offsetWidth;
      if (width > 0) setSlideWidth(width);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (slideWidth <= 0) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [slideCount, slideWidth]);

  const goTo = (index: number) => {
    setActiveIndex((index + slideCount) % slideCount);
  };

  const activeTopic = DAILY_LEARNING_TOPICS[activeIndex];

  return (
    <div className="mx-auto w-full max-w-[720px]">
      <div ref={viewportRef} className="relative w-full overflow-hidden rounded-[16px]">
        <div
          className="flex transition-transform duration-500 ease-in-out will-change-transform"
          style={{
            transform:
              slideWidth > 0
                ? `translateX(-${activeIndex * slideWidth}px)`
                : 'translateX(0)',
          }}
        >
          {DAILY_LEARNING_TOPICS.map((topic) => (
            <article
              key={topic.title}
              className="relative shrink-0 overflow-hidden rounded-[16px]"
              style={{ width: slideWidth > 0 ? slideWidth : '100%' }}
            >
              <Link
                href={topic.href}
                className="group relative block h-[360px] overflow-hidden rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:h-[400px]"
              >
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_35%,rgba(0,0,0,0.88)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <h3 className="text-[28px] font-bold leading-tight sm:text-[32px]">
                    {topic.title}
                  </h3>
                  <p className="mt-2 max-w-[90%] text-[14px] font-medium leading-relaxed text-white/90 sm:text-[15px]">
                    {topic.description}
                  </p>
                  <span className={`mt-5 ${COURSE_EXPLORE_BUTTON_CLASS}`}>
                    {COURSE_EXPLORE_BUTTON_LABEL}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous topic"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#38AEE5] bg-white text-[#3380C4] transition-colors hover:bg-[#38AEE5] hover:text-white"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="flex items-center gap-2">
          {DAILY_LEARNING_TOPICS.map((topic, index) => (
            <button
              key={topic.title}
              type="button"
              aria-label={`Go to ${topic.title}`}
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-[#38AEE5]' : 'w-2.5 bg-[#CBD5E1]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next topic"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#38AEE5] bg-white text-[#3380C4] transition-colors hover:bg-[#38AEE5] hover:text-white"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <p className="mt-3 text-center text-[13px] font-medium text-[#5A6573]">
        Now showing: {activeTopic.title}
      </p>
    </div>
  );
}
