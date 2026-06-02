"use client";

import Image from "next/image";

export const FREE_RESOURCES_COURSE_SLIDES = [
  { image: "/assets/course_image.png" },
  { image: "/assets/free-resources/NCERT/optional-foundation-course.png" },
  { image: "/assets/free-resources/NCERT/mentorship-program.png" },
  { image: "/assets/free-resources/NCERT/test-series.png" },
] as const;

interface FreeResourcesCourseSliderProps {
  className?: string;
  /** Optional wrapper with courses-bg (study-materials / mock-tests sidebar) */
  showBackground?: boolean;
}

/** NCERT-page style course card — hover to slide through course promos */
export default function FreeResourcesCourseSlider({
  className = "",
  showBackground = false,
}: FreeResourcesCourseSliderProps) {
  const card = (
    <div className="free-resources-course-slider course-slider-card">
      <h2 className="course-slider-title">
        <span>Courses</span>
      </h2>

      <div className="course-slider-image-area">
        {FREE_RESOURCES_COURSE_SLIDES.map((course, index) => (
          <div
            key={`${course.image}-${index}`}
            className={`course-slide course-slide-${index + 1}`}
          >
            <Image
              src={course.image}
              alt="Course"
              fill
              sizes="310px"
              className="course-img"
            />
          </div>
        ))}

        <div className="course-dots">
          {FREE_RESOURCES_COURSE_SLIDES.map((_, index) => (
            <span key={index} className={`course-dot-${index + 1}`} />
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
