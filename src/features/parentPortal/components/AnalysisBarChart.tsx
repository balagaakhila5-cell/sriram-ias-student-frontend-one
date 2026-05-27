import { ClipboardCheck } from "lucide-react";

interface AnalysisBarChartProps {
  currentValue: number;
  previousValue: number;
  maxValue?: number;
}

const TICKS = [720, 480, 360, 120, 0];

export default function AnalysisBarChart({
  currentValue,
  previousValue,
  maxValue = 720,
}: AnalysisBarChartProps) {
  const chartHeight = 320;
  const barWidth = 56;

  const currentHeight = Math.max(
    0,
    (Math.min(currentValue, maxValue) / maxValue) * chartHeight,
  );
  const previousHeight = Math.max(
    0,
    (Math.min(previousValue, maxValue) / maxValue) * chartHeight,
  );

  return (
    <section className="rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="mb-8 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E2EEF7] text-[#1F7AB8]">
          <ClipboardCheck size={16} />
        </span>
        <h2
          className="text-[18px] font-bold text-[#0F2030]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Analysis
        </h2>
      </div>

      <div
        className="flex pt-6"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div
          className="relative shrink-0 pr-3 text-[13px] font-bold text-[#1F2A37]"
          style={{ height: chartHeight, width: 56 }}
        >
          {TICKS.map((tick) => (
            <div
              key={tick}
              className="absolute right-3 -translate-y-1/2"
              style={{ top: chartHeight - (tick / maxValue) * chartHeight }}
            >
              {tick}
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="relative" style={{ height: chartHeight }}>
            {TICKS.map((tick) => (
              <div
                key={tick}
                className="absolute left-0 right-0 border-t border-[#E5E7EB]"
                style={{ top: chartHeight - (tick / maxValue) * chartHeight }}
              />
            ))}

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-24">
              <div className="flex flex-col items-center">
                <span className="mb-2 text-[14px] font-bold text-[#3FB75A]">
                  {currentValue}
                </span>
                <div
                  className="rounded-full"
                  style={{
                    width: barWidth,
                    height: currentHeight,
                    background: "#3FB75A",
                  }}
                />
              </div>

              <div className="flex flex-col items-center">
                <span className="mb-2 text-[14px] font-bold text-[#9FD3AD]">
                  {previousValue}
                </span>
                <div
                  className="rounded-full"
                  style={{
                    width: barWidth,
                    height: previousHeight,
                    background: "#D6ECDC",
                    border: "1.5px solid #C2E1CB",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-24 text-[14px] font-bold text-[#1F2A37]">
            <div style={{ width: barWidth }} className="text-center">
              Current Test
            </div>
            <div style={{ width: barWidth }} className="text-center">
              Previous Test
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
