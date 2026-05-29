import type { MainsResultRow } from "../data/testResults";

interface MainsResultsTableProps {
  rows: MainsResultRow[];
}

const GRID_COLUMNS = "2fr 1fr 1fr 1fr";

export default function MainsResultsTable({ rows }: MainsResultsTableProps) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white">
      <div
        className="grid gap-4 px-6 py-4 text-[15px] font-semibold text-white"
        style={{
          gridTemplateColumns: GRID_COLUMNS,
          background: "linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <div>Paper</div>
        <div>Attempted</div>
        <div>Unattempted</div>
        <div>Score</div>
      </div>

      {rows.map((row, index) => (
        <div
          key={row.paper}
          className="grid gap-4 px-6 py-5 text-[15px]"
          style={{
            gridTemplateColumns: GRID_COLUMNS,
            fontFamily: "Montserrat, sans-serif",
            borderBottom:
              index < rows.length - 1 ? "1px solid #E5E7EB" : undefined,
          }}
        >
          <div className="pr-4 font-bold text-[#1F2A37]">{row.paper}</div>
          <div className="font-bold text-[#3FB75A]">{row.attempted}</div>
          <div className="font-bold text-[#E83E4E]">
            {String(row.unattempted).padStart(2, "0")}
          </div>
          <div className="font-bold text-[#1F7AB8]">{row.score}</div>
        </div>
      ))}
    </div>
  );
}
