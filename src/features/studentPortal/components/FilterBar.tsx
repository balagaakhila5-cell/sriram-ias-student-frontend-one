"use client";

import CompactDropdown from "./CompactDropdown";

export interface FilterField {
  id: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  /** Fixed closed-button label (e.g. Date dropdown always shows "Date") */
  buttonLabel?: string;
}

interface FilterBarProps {
  filters: FilterField[];
  className?: string;
  layout?: "default" | "dpq" | "centered";
}

const DPQ_ORDER_CLASS: Record<string, string> = {
  year: "order-1",
  month: "order-2",
  date: "order-4 max-lg:order-4 lg:order-3",
  subtopic: "order-3 max-lg:order-3 lg:order-4",
};

export default function FilterBar({
  filters,
  className = "",
  layout = "default",
}: FilterBarProps) {
  const onlySubtopic =
    filters.length === 1 && filters[0]?.id === "subtopic";
  const isDpq = layout === "dpq";
  const isCentered = layout === "centered" || onlySubtopic;

  return (
    <div
      className={`w-full overflow-visible ${
        isCentered ? "flex justify-center" : ""
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 sm:gap-4 ${
          isDpq
            ? "flex-nowrap justify-start overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : isCentered
              ? "flex-wrap justify-center"
              : "flex-wrap justify-start"
        }`}
      >
        {filters.map((f) => (
          <CompactDropdown
            key={f.id}
            className={
              f.className ??
              (isDpq
                ? `relative shrink-0 ${
                    f.id === "subtopic"
                      ? "w-[min(240px,42vw)] sm:w-[260px] lg:w-[280px]"
                      : "w-[120px] sm:w-[140px] md:w-[150px]"
                  } ${DPQ_ORDER_CLASS[f.id] ?? ""}`
                : f.id === "subtopic"
                  ? "w-[min(100%,280px)] sm:w-[300px]"
                  : "w-[200px]")
            }
            options={f.options}
            value={f.value}
            onChange={f.onChange}
            placeholder={f.placeholder}
            buttonLabel={f.buttonLabel}
          />
        ))}
      </div>
    </div>
  );
}
