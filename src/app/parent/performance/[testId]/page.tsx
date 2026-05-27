import { ClipboardCheck } from "lucide-react";
import AnalysisBarChart from "@/features/parentPortal/components/AnalysisBarChart";
import AnalysisDonut from "@/features/parentPortal/components/AnalysisDonut";
import DetailedResultsTable from "@/features/parentPortal/components/DetailedResultsTable";
import MentorReviewCard from "@/features/parentPortal/components/MentorReviewCard";
import GoBackButton from "@/features/studentPortal/components/GoBackButton";
import { getTestResult } from "@/features/parentPortal/data/testResults";

interface PageProps {
  params: Promise<{ testId: string }>;
}

export default async function ParentTestResultPage({ params }: PageProps) {
  const { testId } = await params;
  const result = getTestResult(testId);

  return (
    <div className="space-y-8">
      <GoBackButton href="/parent/performance" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E2EEF7] text-[#1F7AB8]">
              <ClipboardCheck size={16} />
            </span>
            <h2
              className="text-[18px] font-bold text-[#0F2030]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Detailed Results
            </h2>
          </div>

          <DetailedResultsTable result={result} />
        </section>

        <section className="rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E2EEF7] text-[#1F7AB8]">
              <ClipboardCheck size={16} />
            </span>
            <h2
              className="text-[18px] font-bold text-[#0F2030]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Analysis Breakdown
            </h2>
          </div>

          <div className="flex flex-col items-center gap-4">
            <AnalysisDonut
              correct={result.correct}
              incorrect={result.incorrect}
              blank={result.blank}
              centerLabel={String(result.score)}
            />

            <div className="flex items-center gap-4 text-[12px] text-[#1F2A37]">
              <LegendDot color="#3FB75A" label="Correct" />
              <LegendDot color="#E83E4E" label="Incorrect" />
              <LegendDot color="#F2A03F" label="Blank" />
            </div>
          </div>
        </section>
      </div>

      <AnalysisBarChart
        currentValue={result.currentScore}
        previousValue={result.previousScore}
        maxValue={result.maxScore}
      />

      <MentorReviewCard paragraphs={result.mentorReview} />
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-2.5 w-2.5 rounded-sm"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
