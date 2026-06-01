"use client";

import type { StudyMaterialsExamType } from "../config";
import type { PyqPaperFilter } from "../resourceFilters";
import type { FreeResourcesSubtopicId } from "../types";
import MockTestsPanel from "../panels/MockTestsPanel";
import NcertBooksPanel from "../panels/NcertBooksPanel";
import PreviousYearPanel from "../panels/PreviousYearPanel";
import StudyMaterialsPanel from "../panels/StudyMaterialsPanel";

interface FreeResourcesSubtopicPanelProps {
  subtopic: FreeResourcesSubtopicId;
  studyExamType: StudyMaterialsExamType;
  mockExamType: "prelims" | "mains";
  paper: PyqPaperFilter;
  pyqYear: string;
  ncertClass: string;
}

export default function FreeResourcesSubtopicPanel({
  subtopic,
  studyExamType,
  mockExamType,
  paper,
  pyqYear,
  ncertClass,
}: FreeResourcesSubtopicPanelProps) {
  switch (subtopic) {
    case "free-mocktests":
      return <MockTestsPanel examType={mockExamType} />;
    case "ncert-books":
      return <NcertBooksPanel ncertClass={ncertClass} />;
    case "previous-year":
      return <PreviousYearPanel paper={paper} pyqYear={pyqYear} />;
    case "study-materials":
      return <StudyMaterialsPanel examType={studyExamType} />;
    default:
      return null;
  }
}
