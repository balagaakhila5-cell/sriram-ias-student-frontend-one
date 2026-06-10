"use client";

import { Bookmark, Share2 } from "lucide-react";
import type { BlogBookmarkInput } from "../types";
import { useBlogBookmarkActions } from "../hooks/useBlogBookmarkActions";

type BlogActionButtonsProps = {
  bookmark: BlogBookmarkInput;
  size?: "sm" | "md";
  className?: string;
};

export default function BlogActionButtons({
  bookmark,
  size = "sm",
  className = "",
}: BlogActionButtonsProps) {
  const { isBookmarked, shareMessage, handleBookmark, handleShare } =
    useBlogBookmarkActions(bookmark, "listing");

  const buttonClass =
    size === "md"
      ? "flex h-[42px] w-[42px] items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
      : "flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60";

  const iconSize = size === "md" ? 25 : 22;
  const shareIconSize = size === "md" ? 23 : 20;

  return (
    <div className={`relative flex gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleBookmark}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this blog"}
        aria-pressed={isBookmarked}
        className={buttonClass}
      >
        <Bookmark
          size={iconSize}
          className={isBookmarked ? "fill-white text-white" : undefined}
        />
      </button>

      <button
        type="button"
        onClick={handleShare}
        aria-label="Share this blog"
        className={buttonClass}
      >
        <Share2 size={shareIconSize} />
      </button>

      {shareMessage ? (
        <span className="absolute right-0 top-full z-20 mt-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          {shareMessage}
        </span>
      ) : null}
    </div>
  );
}
