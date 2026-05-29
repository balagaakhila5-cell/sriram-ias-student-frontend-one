"use client";

import Link from "next/link";
<<<<<<< HEAD
import { useEffect, useState } from "react";

import {
  ArrowRight,
  Bookmark,
} from "lucide-react";
=======
import { ArrowRight, Bookmark } from "lucide-react";
>>>>>>> updates

import type { TestItem } from "../data/tests";

interface TestCardProps {

  test: TestItem;

  /** Override the default Attempt Test href. */
  attemptHref?: string;

  /** Override the default action button label */
  actionLabel?: string;

<<<<<<< HEAD
  /** Bookmark state from parent */
  bookmarked?: boolean;

  /** Toggle bookmark callback */
=======
  /** Bookmark state */
  bookmarked?: boolean;

  /** Toggle bookmark */
>>>>>>> updates
  onToggleBookmark?: () => void;
}

export default function TestCard({

  test,

  attemptHref,

  actionLabel = "Attempt Test",
<<<<<<< HEAD

  bookmarked: initialBookmarked = false,

  onToggleBookmark,

}: TestCardProps) {

  const [bookmarked, setBookmarked] =
    useState(initialBookmarked);

  useEffect(() => {
    setBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  const handleBookmark = () => {

    const updatedBookmark =
      !bookmarked;

    setBookmarked(updatedBookmark);

    onToggleBookmark?.();

    const savedBookmarks = JSON.parse(
      localStorage.getItem(
        "bookmarkedTests"
      ) || "[]"
    );

    const alreadyExists =
      savedBookmarks.some(
        (item: TestItem) =>
          item.id === test.id
      );

    let updatedBookmarks;

    if (alreadyExists) {

      updatedBookmarks =
        savedBookmarks.filter(
          (item: TestItem) =>
            item.id !== test.id
        );

    } else {

      updatedBookmarks = [
        ...savedBookmarks,
        test,
      ];
    }

    localStorage.setItem(
      "bookmarkedTests",
      JSON.stringify(updatedBookmarks)
    );
  };

  return (

    <article className="relative flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:translate-x-2 hover:bg-[#EEF7FD] hover:shadow-[0_10px_24px_rgba(31,122,184,0.18)]">

      {/* BOOKMARK */}
      <button
        onClick={handleBookmark}
        className="absolute right-4 top-4 transition-all duration-300"
      >

        <Bookmark
          size={20}
          className={
            bookmarked
              ? "fill-[#009FEE] text-[#009FEE]"
              : "text-[#009FEE]"
          }
        />

      </button>

=======
  bookmarked = false,
  onToggleBookmark,
}: TestCardProps) {

  return (
    <article className="relative flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:translate-x-2 hover:bg-[#EEF7FD] hover:shadow-[0_10px_24px_rgba(31,122,184,0.18)]">

      {/* BOOKMARK */}
      <button
  onClick={() => {
    onToggleBookmark?.();

    const savedBookmarks = JSON.parse(
      localStorage.getItem("bookmarkedTests") || "[]"
    );

    const alreadyExists = savedBookmarks.some(
      (item: TestItem) => item.id === test.id
    );

    let updatedBookmarks;

    if (alreadyExists) {
      updatedBookmarks = savedBookmarks.filter(
        (item: TestItem) => item.id !== test.id
      );
    } else {
      updatedBookmarks = [...savedBookmarks, test];
    }

    localStorage.setItem(
      "bookmarkedTests",
      JSON.stringify(updatedBookmarks)
    );
  }}
  className="absolute right-4 top-4 transition-all duration-300"
>
  <Bookmark
    size={20}
    className={
      bookmarked
        ? "fill-[#009FEE] text-[#009FEE]"
        : "text-[#009FEE]"
    }
  />
</button>

>>>>>>> updates
      {/* IMAGE */}
      <div
        className="flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-[14px]"
        style={{
          background:
            "linear-gradient(135deg, #DCEEF7 0%, #B5DAEE 100%)",
        }}
      >
<<<<<<< HEAD

=======
>>>>>>> updates
        <img
          src="/assets/student/test-image.png"
          alt="test"
          className="h-[100px] w-[100px] object-contain"
        />
<<<<<<< HEAD

=======
>>>>>>> updates
      </div>

      {/* CONTENT */}
      <div className="min-w-0 flex-1 pr-6">

        <h4
          className="text-[15px] font-semibold leading-snug text-[#000000]"
          style={{
            fontFamily:
              "Montserrat, sans-serif",
          }}
        >
          {test.title}
        </h4>

        <Link
          href={
            attemptHref ??
            `/current-affairs/daily-practice-questions/${test.attemptSlug}`
          }
          className="mt-3 inline-flex items-center gap-2 rounded-md border border-[#A8CEE6] bg-white px-3 py-1.5 text-[13px] font-extrabold text-[#009FEECC]"
        >

          {actionLabel}

          <ArrowRight size={14} />

        </Link>

      </div>

    </article>
  );
}