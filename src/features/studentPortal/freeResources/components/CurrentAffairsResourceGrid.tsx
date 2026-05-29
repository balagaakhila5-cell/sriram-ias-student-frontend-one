"use client";

import { useMemo } from "react";
import {
  listCurrentAffairsDocuments,
  listPracticeTests,
} from "@/features/resources/catalog/currentAffairs";
import type { CurrentAffairsSubtopicId } from "@/features/resources/catalog/types";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import PracticeTestCard from "@/features/resources/components/PracticeTestCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import { RESOURCE_EMPTY } from "@/features/resources/components/cardStyles";

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
      <ResourceCardGrid>
        {practiceCards.map((card) => (
          <PracticeTestCard key={card.id} test={card} variant="portal" />
        ))}
      </ResourceCardGrid>
    );
  }

  if (documents.length === 0) return <EmptyState />;

  return (
    <ResourceCardGrid>
      {documents.map((item) => (
        <ResourceDocumentCard
          key={item.id}
          item={item}
          variant="portal"
          singleRowActions
        />
      ))}
    </ResourceCardGrid>
  );
}

function EmptyState() {
  return <p className={RESOURCE_EMPTY}>No resources found for the selected filters.</p>;
}
