"use client";

import { useEffect, useRef, useState } from "react";

interface CompactDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CompactDropdown({
  options,
  value,
  onChange,
  className = "",
}: CompactDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[44px] w-full items-center justify-between rounded-full border border-[#e7ebf3] bg-[#edf0fb] px-4 text-[18px] font-semibold text-[#111] shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <span className="flex-1 truncate text-center">{value}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-[16px] bg-[#edf0fb] py-2 shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
          <div className="flex max-h-[260px] flex-col gap-1 overflow-y-auto px-2">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`rounded-[12px] px-3 py-2 text-center text-[18px] font-semibold transition-all ${
                  value === opt
                    ? "bg-white text-[#2a9cda] shadow-sm"
                    : "text-[#111] hover:bg-[#e2e6f4]"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
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
