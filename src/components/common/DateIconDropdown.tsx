"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";

interface DateIconDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/** Date filter — calendar icon only; selected date is not shown on the trigger. */
export default function DateIconDropdown({
  options,
  value,
  onChange,
  className = "",
}: DateIconDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={value ? `Selected date: ${value}` : "Select date"}
        className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#e7ebf3] bg-[#edf0fb] text-[#2a9cda] shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all hover:scale-[1.03]"
      >
        <Calendar size={26} strokeWidth={2} aria-hidden />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[24px] bg-[#edf0fb] py-3 shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
          <div className="flex max-h-[260px] flex-col overflow-y-auto px-2">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`rounded-[16px] px-4 py-3.5 text-center text-[15px] font-bold transition-all ${
                  value === opt
                    ? "bg-white text-[#2a9cda] shadow-sm"
                    : "text-[#111] hover:bg-[#e2e6f4]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
