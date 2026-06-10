"use client";

import { Bookmark } from "lucide-react";
import type { BlogBookmarkInput } from "../types";
import { useBlogBookmarkActions } from "../hooks/useBlogBookmarkActions";

type BlogDetailBookmarkButtonProps = {
  bookmark: BlogBookmarkInput;
};

export default function BlogDetailBookmarkButton({
  bookmark,
}: BlogDetailBookmarkButtonProps) {
  const { isBookmarked, handleBookmark } = useBlogBookmarkActions(
    bookmark,
    "detail",
  );

  return (
    <button
      type="button"
      onClick={handleBookmark}
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this blog"}
      aria-pressed={isBookmarked}
      className="ml-auto flex h-[56px] min-w-[170px] items-center justify-center gap-3 rounded-[10px] bg-white px-7 text-[20px] font-semibold text-[#444] shadow-md transition hover:bg-[#F8FAFC]"
    >
      <Bookmark
        size={25}
        className={isBookmarked ? "fill-[#1F7AB8] text-[#1F7AB8]" : undefined}
      />
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
