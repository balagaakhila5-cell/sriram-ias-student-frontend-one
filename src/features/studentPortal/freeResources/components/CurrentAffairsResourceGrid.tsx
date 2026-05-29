"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  listCurrentAffairsDocuments,
  listPracticeTests,
} from "@/features/resources/catalog/currentAffairs";
import type { CurrentAffairsSubtopicId } from "@/features/resources/catalog/types";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import { matchesYearMonth } from "../filterResources";

interface CurrentAffairsResourceGridProps {
  subtopic: CurrentAffairsSubtopicId;
  year: string;
  month: string;
}

export default function CurrentAffairsResourceGrid({
  subtopic,
  year,
  month,
}: CurrentAffairsResourceGridProps) {
  const documents = useMemo(
    () => listCurrentAffairsDocuments(subtopic, year, month),
    [subtopic, year, month],
  );

  const practiceCards = useMemo(
    () =>
      listPracticeTests(year, month).filter((item) => item.subtopic === subtopic),
    [subtopic, year, month],
  );

  if (subtopic === "daily-practice-questions") {
    if (practiceCards.length === 0) return <EmptyState />;

    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {practiceCards.map((card) => (
          <Link
            key={card.id}
            href={card.attemptPath}
            className="group flex min-h-[128px] items-center gap-4 rounded-[18px] border border-[#ECECEC] bg-[#F8F6F2] px-5 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#FEF2E5] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
          >
            <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                width={88}
                height={88}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-extrabold leading-snug text-[#111] md:text-[16px]">
                {card.title}
              </h3>
              <span className="mt-3 inline-flex rounded-[8px] border-[1.5px] border-[#58b7ea] bg-white px-4 py-1.5 text-[14px] font-bold text-[#2a9cda]">
                Attempt Test
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  if (documents.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {documents.map((item) => (
        <ResourceDocumentCard key={item.id} item={item} variant="portal" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <p className="rounded-[14px] bg-[#FAF8F3] px-6 py-10 text-center text-[15px] font-semibold text-[#5A6573]">
      No resources found for the selected filters.
    </p>
  );
}
