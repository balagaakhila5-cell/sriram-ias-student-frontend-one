import PerformanceResultContent from "@/features/parentPortal/components/performance/PerformanceResultContent";
import GoBackButton from "@/features/studentPortal/components/GoBackButton";
import { getTestResult } from "@/features/parentPortal/data/testResults";
import { resolvePerformanceView } from "@/features/parentPortal/performance/types";

interface PageProps {
  params: Promise<{ testId: string }>;
  searchParams: Promise<{ view?: string }>;
}

export default async function ParentTestResultPage({
  params,
  searchParams,
}: PageProps) {
  const { testId } = await params;
  const { view } = await searchParams;
  const result = getTestResult(testId);
  const activeView = resolvePerformanceView(testId, view);

  return (
    <div className="space-y-8">
      <GoBackButton href="/parent/performance" />
      <PerformanceResultContent activeView={activeView} result={result} />
    </div>
  );
}
