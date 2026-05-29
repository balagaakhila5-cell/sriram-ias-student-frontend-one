import AnalysisBarChart from "@/features/parentPortal/components/AnalysisBarChart";
import type { TestResultDetail } from "@/features/parentPortal/data/testResults";

interface AnalysisDetailsSectionProps {
  result: TestResultDetail;
}

export default function AnalysisDetailsSection({
  result,
}: AnalysisDetailsSectionProps) {
  return (
    <AnalysisBarChart
      currentValue={result.currentScore}
      previousValue={result.previousScore}
      maxValue={result.maxScore}
    />
  );
}
