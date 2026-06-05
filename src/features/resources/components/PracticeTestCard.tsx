"use client";

import Link from "next/link";
import type { CatalogPracticeTest } from "@/features/resources/catalog/types";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import PremiumCardBanner from "./PremiumCardBanner";
import { RESOURCE_CARD_TITLE } from "./cardStyles";

interface PracticeTestCardProps {
  test: CatalogPracticeTest;
  variant?: "public" | "portal";
  className?: string;
}

export default function PracticeTestCard({
  test,
  className = "",
}: PracticeTestCardProps) {
  return (
    <Link
      href={test.attemptPath}
      className={`group relative z-0 flex min-h-[124px] w-full items-stretch overflow-visible rounded-[8px] border border-[#EEEEEE] bg-[#FAF8F3] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300 hover:z-10 hover:translate-x-3 hover:scale-[1.03] hover:border-[#F5E4D4] hover:bg-[#FFF2E6] hover:shadow-[0_12px_28px_rgba(255,165,110,0.16)] motion-reduce:hover:translate-x-0 motion-reduce:hover:scale-100 ${className}`}
    >
      <div className="flex min-w-0 flex-1 items-center pr-4">
        <h3 className={RESOURCE_CARD_TITLE}>{test.title}</h3>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-end gap-2">
        <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[10px] bg-[#EEF4FF] transition-colors duration-300 group-hover:bg-[#D8ECFF]">
          <PremiumCardBanner
            src={test.image || RESOURCE_ASSETS.PRACTICE_TEST}
            alt={test.title}
            fit="cover"
          />
        </div>

        <span className="inline-flex items-center justify-center rounded-[7px] border border-[#57B0F2] bg-transparent px-4 py-1.5 text-[12px] font-semibold text-[#46A7ED] transition-all duration-300 hover:border-[#2AA7DF] hover:bg-[#2AA7DF] hover:text-white">
          Attempt Test
        </span>
      </div>
    </Link>
  );
}
