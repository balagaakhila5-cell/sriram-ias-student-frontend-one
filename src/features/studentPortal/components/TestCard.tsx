"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, ClipboardCheck } from "lucide-react";
import type { TestItem } from "../data/tests";

interface TestCardProps {
  test: TestItem;
  /** Override the default Attempt Test href. */
  attemptHref?: string;
  /** Override the default action button label (default "Attempt Test"). */
  actionLabel?: string;
}

export default function TestCard({
  test,
  attemptHref,
  actionLabel = "Attempt Test",
}: TestCardProps) {
  const [bookmarked, setBookmarked] = useState(!!test.bookmarked);

  return (
    <article className="relative flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)]">
      <button
        type="button"
        aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        onClick={(e) => {
          e.preventDefault();
          setBookmarked((v) => !v);
        }}
        className="absolute right-3 top-3 text-[#1F2A37]"
      >
        <Bookmark size={18} className={bookmarked ? "fill-current" : ""} />
      </button>

      <div
        className="flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-[14px] text-[#1F7AB8]"
        style={{
          background:
            "linear-gradient(135deg, #DCEEF7 0%, #B5DAEE 100%)",
        }}
      >
        <ClipboardCheck size={48} strokeWidth={1.6} />
      </div>

      <div className="min-w-0 flex-1 pr-6">
        <h4
          className="text-[15px] font-semibold leading-snug text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
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
