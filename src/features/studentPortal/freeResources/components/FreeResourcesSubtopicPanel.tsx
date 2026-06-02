"use client";

import type { StudyMaterialsExamType } from "../config";
import type { FreeResourcesSubtopicId } from "../types";
import MockTestsPanel from "../panels/MockTestsPanel";
import NcertBooksPanel from "../panels/NcertBooksPanel";
import PreviousYearPanel from "../panels/PreviousYearPanel";
import StudyMaterialsPanel from "../panels/StudyMaterialsPanel";

interface FreeResourcesSubtopicPanelProps {
  subtopic: FreeResourcesSubtopicId;
  studyExamType: StudyMaterialsExamType;
  mockExamType: "prelims" | "mains";
  pyqYear: string;
  pyqSelectPaper: string;
  pyqExamType: "prelims" | "mains";
  ncertClass: string;
}

export default function FreeResourcesSubtopicPanel({
  subtopic,
  studyExamType,
  mockExamType,
  pyqYear,
  pyqSelectPaper,
  pyqExamType,
  ncertClass,
}: FreeResourcesSubtopicPanelProps) {
  switch (subtopic) {
    case "free-mocktests":
      return <MockTestsPanel examType={mockExamType} />;
    case "ncert-books":
      return <NcertBooksPanel ncertClass={ncertClass} />;
    case "previous-year":
      return (
        <PreviousYearPanel
          pyqYear={pyqYear}
          selectPaper={pyqSelectPaper}
          examType={pyqExamType}
        />
      );
    case "study-materials":
      return <StudyMaterialsPanel examType={studyExamType} />;
    default:
      return null;
  }
}
