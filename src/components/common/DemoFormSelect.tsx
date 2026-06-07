"use client";

import React, { useEffect, useRef, useState } from "react";

export interface DemoFormSelectOption {
  value: string;
  label: string;
}

interface DemoFormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: DemoFormSelectOption[];
  placeholder: string;
  disabled?: boolean;
}

const DemoFormSelect: React.FC<DemoFormSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setOpen((prev) => !prev);
        }}
        className="flex h-9 w-full items-center justify-between rounded-lg border-none bg-[#D7EEF7] px-3 py-2 text-left text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#1897D8]/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className={`truncate ${value ? "" : "text-gray-600"}`}>
          {selectedLabel}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-[200] max-h-[220px] w-full overflow-y-auto rounded-lg border border-[#c5e3f0] bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-[#D7EEF7] ${
                value === option.value
                  ? "font-semibold text-[#005B88]"
                  : "text-gray-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoFormSelect;
