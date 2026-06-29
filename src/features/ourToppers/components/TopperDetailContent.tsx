"use client";

import { useState } from "react";
import Link from "@/components/common/AppLink";
import {
  formatTopperRankLabel,
  topperImageSrc,
} from "@/data/ourToppers";
import type { PortalTopper } from "@/features/ourToppers/types/portalTopper";

const FALLBACK_TOPPER_IMAGE = "/assets/student/course-card.png";

type TopperDetailContentProps = {
  topper: PortalTopper;
};

export default function TopperDetailContent({ topper }: TopperDetailContentProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const imageUrl = topper.image?.url?.trim() ?? "";
  const imageSrc = hasImageError || !imageUrl
    ? FALLBACK_TOPPER_IMAGE
    : topperImageSrc(imageUrl);

  return (
    <div className="mx-auto w-full max-w-[980px] px-4 py-10 md:py-14">
      <Link
        href="/our-toppers-gallery"
        className="mb-8 inline-flex items-center text-[14px] font-bold text-[#1F7AB8] hover:underline"
      >
        Back to Our Toppers
      </Link>

      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
        <div className="relative flex w-full max-w-[320px] shrink-0 flex-col items-center">
          {topper.isTop10 ? (
            <span className="topper-top10-badge relative z-20 mb-3">
              Top 10
            </span>
          ) : null}

          <div className="relative flex h-[320px] w-[240px] items-end justify-center overflow-visible bg-transparent sm:h-[380px] sm:w-[280px] md:h-[440px] md:w-[320px]">
            <img
              src={imageSrc}
              alt={`${topper.studentName} ${topper.rank}`}
              loading="eager"
              onError={() => setHasImageError(true)}
              className="h-full w-full bg-transparent object-contain object-bottom"
            />
          </div>
        </div>

        <div className="flex w-full max-w-[520px] flex-col items-center text-center md:items-start md:text-left">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-[#1F7AB8]">
            Our Topper
          </p>

          <h1 className="mt-2 text-[28px] font-extrabold uppercase leading-tight text-[#111] sm:text-[34px]">
            {topper.studentName}
          </h1>

          {topper.studentId ? (
            <p className="mt-3 text-[15px] font-semibold text-[#4b5563]">
              Student ID:{" "}
              <span className="font-bold text-[#111]">{topper.studentId}</span>
            </p>
          ) : null}

          <span className="topper-air-badge mt-5 shadow-sm">
            {formatTopperRankLabel(topper.rank, topper.year)}
          </span>

          {topper.courseOrProgram ? (
            <p className="mt-5 text-[16px] font-semibold leading-relaxed text-[#374151]">
              {topper.courseOrProgram}
            </p>
          ) : null}

          {topper.year != null ? (
            <p className="mt-3 text-[15px] font-medium text-[#6b7280]">
              Year {topper.year}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
