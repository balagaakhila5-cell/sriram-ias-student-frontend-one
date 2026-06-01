"use client";

import type { FreeResourcesPanelExamType } from "../config";
import type { FreeResourcesSubtopicId } from "../types";
import MockTestsPanel from "../panels/MockTestsPanel";
import NcertBooksPanel from "../panels/NcertBooksPanel";
import PreviousYearPanel from "../panels/PreviousYearPanel";
import StudyMaterialsPanel from "../panels/StudyMaterialsPanel";

interface FreeResourcesSubtopicPanelProps {
  subtopic: FreeResourcesSubtopicId;
  examType: FreeResourcesPanelExamType;
}

export default function FreeResourcesSubtopicPanel({
  subtopic,
  examType,
}: FreeResourcesSubtopicPanelProps) {
  switch (subtopic) {
    case "free-mocktests":
      return (
        <MockTestsPanel
          examType={examType === "interview" ? "prelims" : examType}
        />
      );
    case "ncert-books":
      return <NcertBooksPanel />;
    case "previous-year":
      return (
        <PreviousYearPanel
          examType={examType === "interview" ? "prelims" : examType}
        />
      );
    case "study-materials":
      return <StudyMaterialsPanel examType={examType} />;
    default:
      return null;
  }
}
