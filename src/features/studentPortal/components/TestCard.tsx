"use client";

import Link from "@/components/common/AppLink";
import { useEffect, useState } from "react";
import { ArrowRight, Bookmark } from "lucide-react";
import type { TestItem } from "../data/tests";
import {
  isTestBookmarked,
  TEST_BOOKMARKS_UPDATED_EVENT,
  toggleTestBookmark,
} from "../utils/testBookmarks";

interface TestCardProps {
  test: TestItem;
  /** Override the default Attempt Test href. */
  attemptHref?: string;
  /** Override the default action button label */
  actionLabel?: string;
  /** @deprecated Bookmark state is read from persistent storage. */
  bookmarked?: boolean;
  /** Toggle bookmark callback */
  onToggleBookmark?: () => void;
}

export default function TestCard({
  test,
  attemptHref,
  actionLabel = "Attempt Test",
  bookmarked: _bookmarkedOverride,
  onToggleBookmark,
}: TestCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const sync = () => setBookmarked(isTestBookmarked(test.id));

    sync();
    window.addEventListener(TEST_BOOKMARKS_UPDATED_EVENT, sync);
    return () => window.removeEventListener(TEST_BOOKMARKS_UPDATED_EVENT, sync);
  }, [test.id]);

  const handleBookmark = () => {
    toggleTestBookmark(test);
    onToggleBookmark?.();
  };

  return (
    <article className="group relative flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:translate-x-2 hover:bg-[#EEF7FD] hover:shadow-[0_10px_24px_rgba(31,122,184,0.18)]">
      <button
        type="button"
        onClick={handleBookmark}
        className="absolute right-4 top-4 transition-all duration-300"
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark this test"}
        aria-pressed={bookmarked}
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

      <div className="relative min-w-0 flex-1 pr-6 text-center">
        <h4 className="px-8 text-center text-[17px] font-bold leading-[1.35] text-[#000000] sm:text-[18px]">
          {test.title}
        </h4>

        <Link
          href={
            attemptHref ??
            `/current-affairs/daily-practice-questions/${test.attemptSlug}`
          }
          className="absolute bottom-0 right-0 inline-flex items-center gap-2 rounded-full border border-[#57B0F2] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#46A7ED] transition-all duration-300 group-hover:border-[#2AA7DF] group-hover:bg-[#2AA7DF] group-hover:text-white"
        >
          {actionLabel}
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
