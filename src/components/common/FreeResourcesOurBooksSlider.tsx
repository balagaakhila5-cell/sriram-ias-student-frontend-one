"use client";

import Image from "next/image";
import Link from "next/link";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";
import { COURSE_EXPLORE_BUTTON_CLASS } from "@/components/common/courseExploreButton";

export const FREE_RESOURCES_OUR_BOOKS_IMAGES = [
  "/assets/free-resources/NCERT/prelims-revision.png",
  "/assets/free-resources/NCERT/History.jpg.jpeg",
  "/assets/free-resources/NCERT/Modern-history.jpg.jpeg",
  "/assets/free-resources/NCERT/Medieval-history.jpg.jpeg",
  "/assets/free-resources/NCERT/Art-&-Culture.jpg.jpeg",
  "/assets/free-resources/NCERT/geo.jpg.jpeg",
  "/assets/free-resources/NCERT/Environment.jpg.jpeg",
  "/assets/free-resources/NCERT/sci-&-tech.jpg.jpeg",
] as const;

interface FreeResourcesOurBooksSliderProps {
  className?: string;
  booksHref?: string;
  /** Use red gradient heading (NCERT free resources page) */
  gradientTitle?: boolean;
}

/** Sidebar Our Books — book covers auto-rotate without hover */
export default function FreeResourcesOurBooksSlider({
  className = "",
  booksHref = "/books",
  gradientTitle = false,
}: FreeResourcesOurBooksSliderProps) {
  return (
    <Link
      href={booksHref}
      className={`free-resources-our-books-slider our-books-card block ${className}`.trim()}
    >
      <h2 className="our-books-title">
        {gradientTitle ? (
          <span className={RESOURCE_PAGE_HEADING_GRADIENT}>Our Books</span>
        ) : (
          "Our Books"
        )}
      </h2>

      <div className="our-books-image-area">
        {FREE_RESOURCES_OUR_BOOKS_IMAGES.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`our-books-slide our-books-slide-${index + 1}`}
          >
            <Image
              src={image}
              alt="Our Books"
              fill
              sizes="(max-width: 640px) 100vw, 340px"
              className="our-books-img"
            />
          </div>
        ))}

        <div className="our-books-dots">
          {FREE_RESOURCES_OUR_BOOKS_IMAGES.map((_, index) => (
            <span key={index} className={`dot-${index + 1}`} />
          ))}
        </div>

        <span className={`buy-now-btn ${COURSE_EXPLORE_BUTTON_CLASS}`}>
          Buy Now <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
