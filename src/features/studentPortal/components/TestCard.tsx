"use client";


import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

  return (
    <article className="relative flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:translate-x-2 hover:bg-[#EEF7FD] hover:shadow-[0_10px_24px_rgba(31,122,184,0.18)]">

    <div
  className="flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-[14px]"
  style={{
    background:
      "linear-gradient(135deg, #DCEEF7 0%, #B5DAEE 100%)",
  }}
>
  <img
    src="/assets/student/test-image.png"
    alt="test"
    className="h-[100px] w-[100px] object-contain"
  />
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
