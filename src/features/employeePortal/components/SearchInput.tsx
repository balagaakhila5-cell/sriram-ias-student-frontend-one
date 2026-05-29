"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search Student",
  className = "",
}: SearchInputProps) {
  return (
    <div
      className={`flex h-[48px] items-center gap-3 rounded-[12px] bg-[#ECF1FF] px-5 ${className}`}
      style={{ border: "1px solid #0000001A" }}
    >
      <Search size={18} className="text-[#00000080]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[16px] font-medium text-[#00000066] outline-none placeholder:text-[#00000066]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      />
    </div>
  );
}
