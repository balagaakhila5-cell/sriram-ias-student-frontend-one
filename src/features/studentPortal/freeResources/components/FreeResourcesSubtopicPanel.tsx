"use client";

import type { FreeResourcesSubtopicId } from "../types";
import MockTestsPanel from "../panels/MockTestsPanel";
import NcertBooksPanel from "../panels/NcertBooksPanel";
import PreviousYearPanel from "../panels/PreviousYearPanel";
import StudyMaterialsPanel from "../panels/StudyMaterialsPanel";

interface FreeResourcesSubtopicPanelProps {
  subtopic: FreeResourcesSubtopicId;
}

export default function FreeResourcesSubtopicPanel({
  subtopic,
}: FreeResourcesSubtopicPanelProps) {
  switch (subtopic) {
    case "free-mocktests":
      return <MockTestsPanel />;
    case "ncert-books":
      return <NcertBooksPanel />;
    case "previous-year":
      return <PreviousYearPanel />;
    case "study-materials":
      return <StudyMaterialsPanel />;
    default:
      return null;
  }
}
