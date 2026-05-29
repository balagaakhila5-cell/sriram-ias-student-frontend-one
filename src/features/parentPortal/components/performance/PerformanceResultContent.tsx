import MentorReviewCard from "@/features/parentPortal/components/MentorReviewCard";
import type { TestResultDetail } from "@/features/parentPortal/data/testResults";
import type { PerformanceResultView } from "@/features/parentPortal/performance/types";
import AnalysisBreakdownSection from "./AnalysisBreakdownSection";
import AnalysisDetailsSection from "./AnalysisDetailsSection";
import DetailedResultsSection from "./DetailedResultsSection";
import MainsResultsSection from "./MainsResultsSection";

interface PerformanceResultContentProps {
  activeView: PerformanceResultView;
  result: TestResultDetail;
}

export default function PerformanceResultContent({
  activeView,
  result,
}: PerformanceResultContentProps) {
  if (activeView === "prelims") {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <DetailedResultsSection result={result} />
        <AnalysisBreakdownSection result={result} />
      </div>
    );
  }

  if (activeView === "mains") {
    return (
      <div className="space-y-6">
        <MainsResultsSection result={result} />
        <AnalysisDetailsSection result={result} />
      </div>
    );
  }

  return <MentorReviewCard paragraphs={result.mentorReview} />;
}
