"use client";

import { useEffect, useRef, useState } from "react";
import { Bookmark, Share2 } from "lucide-react";
import type { BlogBookmarkInput } from "../types";
import { useBlogBookmarkActions } from "../hooks/useBlogBookmarkActions";

type BlogActionButtonsProps = {
  bookmark: BlogBookmarkInput;
  size?: "sm" | "md";
  className?: string;
};

const SHARE_OPTIONS = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "facebook", label: "Facebook" },
  { id: "email", label: "Email" },
  { id: "copy", label: "Copy Link" },
] as const;

export default function BlogActionButtons({
  bookmark,
  size = "sm",
  className = "",
}: BlogActionButtonsProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const {
    isBookmarked,
    shareMessage,
    handleBookmark,
    shareOnWhatsApp,
    shareOnFacebook,
    shareViaEmail,
    copyShareLink,
  } = useBlogBookmarkActions(bookmark, "listing");

  const buttonClass =
    size === "md"
      ? "flex h-[42px] w-[42px] items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
      : "flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60";

  const iconSize = size === "md" ? 25 : 22;
  const shareIconSize = size === "md" ? 23 : 20;

  useEffect(() => {
    if (!shareOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!shareMenuRef.current?.contains(event.target as Node)) {
        setShareOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [shareOpen]);

  const handleShareOption = (option: (typeof SHARE_OPTIONS)[number]["id"]) => {
    if (option === "whatsapp") shareOnWhatsApp();
    if (option === "facebook") shareOnFacebook();
    if (option === "email") shareViaEmail();
    if (option === "copy") void copyShareLink();
    setShareOpen(false);
  };

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
          fill={isBookmarked ? "currentColor" : "none"}
          className={isBookmarked ? "fill-white text-white" : "text-white"}
        />
      </button>

      <div ref={shareMenuRef} className="relative">
        <button
          type="button"
          onClick={() => setShareOpen((open) => !open)}
          aria-label="Share this blog"
          aria-expanded={shareOpen}
          className={buttonClass}
        >
          <Share2 size={shareIconSize} />
        </button>

        {shareOpen ? (
          <div className="absolute right-0 top-full z-30 mt-2 min-w-[148px] overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-[0_12px_32px_rgba(0,0,0,0.16)]">
            {SHARE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleShareOption(option.id)}
                className="block w-full px-4 py-2.5 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-[#EAF7FF]"
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {shareMessage ? (
        <span className="absolute right-0 top-full z-20 mt-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          {shareMessage}
        </span>
      ) : null}
    </div>
  );
}
