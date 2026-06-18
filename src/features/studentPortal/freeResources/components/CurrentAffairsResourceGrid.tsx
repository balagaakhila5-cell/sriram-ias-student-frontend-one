"use client";

import { useMemo } from "react";
import {
  listCurrentAffairsDocuments,
  listPortalPracticeTests,
} from "@/features/resources/catalog/currentAffairs";
import type { CurrentAffairsSubtopicId } from "@/features/resources/catalog/types";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import PracticeTestCard from "@/features/resources/components/PracticeTestCard";
import PaginatedPdfGrid from "@/features/resources/components/PaginatedPdfGrid";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import { RESOURCE_EMPTY } from "@/features/resources/components/cardStyles";

interface CurrentAffairsResourceGridProps {
  subtopic: CurrentAffairsSubtopicId;
  year: string;
  month: string;
  date?: string;
  examType?: "prelims" | "mains";
}

export default function CurrentAffairsResourceGrid({
  subtopic,
  year,
  month,
  date,
  examType = "prelims",
}: CurrentAffairsResourceGridProps) {
  const documents = useMemo(
    () => listCurrentAffairsDocuments(subtopic, year, month),
    [subtopic, year, month],
  );

  const practiceCards = useMemo(
    () => listPortalPracticeTests(examType, year, month, date),
    [examType, year, month, date],
  );

  if (subtopic === "daily-practice-questions") {
    if (practiceCards.length === 0) return <EmptyState />;

    return (
      <ResourceCardGrid>
        {practiceCards.map((card) => (
          <PracticeTestCard key={card.id} test={card} variant="portal" />
        ))}
      </ResourceCardGrid>
    );
  }

  if (documents.length === 0) return <EmptyState />;

  return (
    <PaginatedPdfGrid
      items={documents}
      resetKey={`${subtopic}-${year}-${month}-${date ?? ""}`}
      getKey={(item) => item.id}
      renderItem={(item) => (
        <ResourceDocumentCard
          item={item}
          variant="portal"
          singleRowActions
        />
      )}
    />
  );
}

function EmptyState() {
  return (
    <p className={RESOURCE_EMPTY}>No resources found for the selected filters.</p>
  );
}
