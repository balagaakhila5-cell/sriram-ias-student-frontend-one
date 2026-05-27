import type { TestResultDetail } from "../data/testResults";

interface DetailedResultsTableProps {
  result: TestResultDetail;
}

export default function DetailedResultsTable({
  result,
}: DetailedResultsTableProps) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white">
      <div
        className="grid gap-4 px-6 py-4 text-[15px] font-semibold text-white"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          background: "linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <div>Paper</div>
        <div>Correct</div>
        <div>Incorrect</div>
        <div>Blank</div>
        <div>Score</div>
      </div>

      <div
        className="grid gap-4 px-6 py-5 text-[15px]"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <div className="pr-4 font-bold text-[#1F2A37]">{result.paper}</div>
        <div className="font-bold text-[#3FB75A]">{result.correct}</div>
        <div className="font-bold text-[#E83E4E]">{result.incorrect}</div>
        <div className="font-bold text-[#1F2A37]">{result.blank}</div>
        <div className="font-bold text-[#1F7AB8]">{result.score}</div>
      </div>
    </div>
  );
}
