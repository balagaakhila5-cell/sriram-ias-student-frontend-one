"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export type FreeResourcesCourseSlide = {
  title: string;
  slug: string;
  image: string;
};

export const FREE_RESOURCES_COURSE_SLIDES: FreeResourcesCourseSlide[] = [
  {
    title: "NCERT Course",
    slug: "ncert-foundation",
    image: "/assets/course_image.png",
  },
  {
    title: "Optional Foundation",
    slug: "geography-optional-foundation",
    image: "/assets/free-resources/NCERT/optional-foundation-course.png",
  },
  {
    title: "Mentorship Program",
    slug: "stride-mentorship-program",
    image: "/assets/free-resources/NCERT/mentorship-program.png",
  },
  {
    title: "Test Series",
    slug: "prelims-test-series-mentorship",
    image: "/assets/free-resources/NCERT/test-series.png",
  },
];

const AUTO_INTERVAL_MS = 4000;

interface FreeResourcesCourseSliderProps {
  className?: string;
  /** Optional wrapper with courses-bg (study-materials / mock-tests sidebar) */
  showBackground?: boolean;
  /** Smaller card for book details and tight layouts */
  compact?: boolean;
  /** Center course name + action button (NCERT sidebar) */
  centerActions?: boolean;
  /** Hide star icon beside course name (Mains PYQ sidebar) */
  hideStar?: boolean;
  /** CTA label — default Enroll Now; use Explore for PYQ sidebar */
  actionLabel?: string;
}

/** Free Resources sidebar — auto-sliding courses with title + Enroll Now → course page */
export default function FreeResourcesCourseSlider({
  className = "",
  showBackground = false,
  compact = false,
  centerActions = false,
  hideStar = false,
  actionLabel = "Enroll Now",
}: FreeResourcesCourseSliderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = FREE_RESOURCES_COURSE_SLIDES.length;
  const current = FREE_RESOURCES_COURSE_SLIDES[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion || slideCount <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, AUTO_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, slideCount]);

  const card = (
    <div
      className={`free-resources-course-slider course-slider-card fr-course-slider-auto${
        compact ? " course-slider-card--compact" : ""
      }`}
    >
      <h2 className="course-slider-title">
        <span>Courses</span>
      </h2>

      <div className="course-slider-image-area">
        <div
          className="course-slider-track"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {FREE_RESOURCES_COURSE_SLIDES.map((slide) => (
            <div key={slide.slug} className="course-slider-panel">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="310px"
                className="course-img object-cover object-center"
              />
            </div>
          ))}
        </div>

        <div
          className={`course-slider-overlay${
            centerActions ? " course-slider-overlay--centered" : ""
          }`}
        >
          <div
            className={`course-slider-label${
              centerActions ? " course-slider-label--centered" : ""
            }`}
          >
            {!hideStar && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#FFE81C"
                className="shrink-0"
                aria-hidden
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            )}
            <span className="course-slider-course-name">{current.title}</span>
          </div>

          <Link
            href={`/course/${current.slug}`}
            className={`course-slider-enroll${
              centerActions ? " course-slider-enroll--centered" : ""
            }`}
          >
            {actionLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="course-dots" role="tablist" aria-label="Course slides">
          {FREE_RESOURCES_COURSE_SLIDES.map((slide, index) => (
            <button
              key={slide.slug}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${slide.title}`}
              className={index === activeIndex ? "is-active" : undefined}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (showBackground) {
    return (
      <div
        className={`relative isolate w-full overflow-hidden rounded-[22px] bg-white bg-[url('/assets/free-resources/courses-bg.png')] bg-cover bg-center p-4 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] ${className}`}
      >
        {card}
      </div>
    );
  }

  if (className) {
    return <div className={className}>{card}</div>;
  }

  return card;
}
