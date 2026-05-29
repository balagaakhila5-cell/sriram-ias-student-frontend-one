import { ClipboardCheck } from "lucide-react";
import DetailedResultsTable from "@/features/parentPortal/components/DetailedResultsTable";
import type { TestResultDetail } from "@/features/parentPortal/data/testResults";

interface DetailedResultsSectionProps {
  result: TestResultDetail;
}

export default function DetailedResultsSection({
  result,
}: DetailedResultsSectionProps) {
  return (
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
  );
}
