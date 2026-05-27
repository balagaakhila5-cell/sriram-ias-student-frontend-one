"use client";

import CompactDropdown from "./CompactDropdown";

export interface FilterField {
  id: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

interface FilterBarProps {
  filters: FilterField[];
  className?: string;
}

export default function FilterBar({ filters, className = "" }: FilterBarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {filters.map((f) => (
        <CompactDropdown
          key={f.id}
          className="w-[200px]"
          options={f.options}
          value={f.value}
          onChange={f.onChange}
        />
      ))}
    </div>
  );
}
