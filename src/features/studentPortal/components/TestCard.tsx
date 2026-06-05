"use client";

import Link from "next/link";
import { RESOURCE_CARD_TITLE } from "@/features/resources/components/cardStyles";
import { useEffect, useState } from "react";
import { ArrowRight, Bookmark } from "lucide-react";
import type { TestItem } from "../data/tests";

interface TestCardProps {
  test: TestItem;
  /** Override the default Attempt Test href. */
  attemptHref?: string;
  /** Override the default action button label */
  actionLabel?: string;
  /** Bookmark state from parent */
  bookmarked?: boolean;
  /** Toggle bookmark callback */
  onToggleBookmark?: () => void;
}

export default function TestCard({
  test,
  attemptHref,
  actionLabel = "Attempt Test",
  bookmarked: initialBookmarked = false,
  onToggleBookmark,
}: TestCardProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  useEffect(() => {
    setBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  const handleBookmark = () => {
    const updatedBookmark = !bookmarked;
    setBookmarked(updatedBookmark);
    onToggleBookmark?.();

    const savedBookmarks = JSON.parse(
      localStorage.getItem("bookmarkedTests") || "[]",
    );

    const alreadyExists = savedBookmarks.some(
      (item: TestItem) => item.id === test.id,
    );

    const updatedBookmarks = alreadyExists
      ? savedBookmarks.filter((item: TestItem) => item.id !== test.id)
      : [...savedBookmarks, test];

    localStorage.setItem(
      "bookmarkedTests",
      JSON.stringify(updatedBookmarks),
    );
  };

  return (
    <article className="relative flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:translate-x-2 hover:bg-[#EEF7FD] hover:shadow-[0_10px_24px_rgba(31,122,184,0.18)]">
      <button
        type="button"
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

      <div
        className="flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-[14px]"
        style={{
          background: "linear-gradient(135deg, #DCEEF7 0%, #B5DAEE 100%)",
        }}
      >
        <img
          src="/assets/student/test-image.png"
          alt="test"
          className="h-[100px] w-[100px] object-contain"
        />
      </div>

      <div className="min-w-0 flex-1 pr-6">
        <h4 className={RESOURCE_CARD_TITLE}>{test.title}</h4>

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
