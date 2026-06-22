'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export const DAILY_LEARNING_IMAGE_SLIDES: DailyLearningTopic[] = [
  {
    title: 'NCERT Books',
    description: 'Free NCERT books and resources for foundation building.',
    image: '/assets/free-resources/NCERT/NCERT-books.png',
    href: '/free_resources/ncert-books',
  },
  {
    title: 'Previous Year Question Papers',
    description: 'Access previous year prelims and mains question papers.',
    image: '/assets/free-resources/NCERT/Previous-year-questionpaper.png',
    href: '/free_resources/previous-year',
  },
  {
    title: 'Free Mock Tests',
    description: 'Practice with free mock tests for UPSC prelims.',
    image: '/assets/free-resources/NCERT/free-mocktest.png',
    href: '/free_resources/free-mocktests',
  },
  {
    title: 'Study Materials',
    description: 'Download free study materials for every GS subject.',
    image: '/assets/free-resources/NCERT/studymaterials.png',
    href: '/free_resources/study-materials',
  },
];

const SLIDE_INTERVAL_MS = 5000;

type DailyLearningTopicCarouselProps = {
  topics?: DailyLearningTopic[];
};

export default function DailyLearningTopicCarousel({
  topics = DAILY_LEARNING_TOPICS,
}: DailyLearningTopicCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const slideCount = topics.length;

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
          {topics.map((topic) => (
            <article
              key={topic.href}
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
          {topics.map((topic, index) => (
            <button
              key={topic.href}
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
    </div>
  );
}
