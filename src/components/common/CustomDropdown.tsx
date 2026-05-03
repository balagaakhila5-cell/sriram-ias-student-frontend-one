import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomDropdown = ({ options, value, onChange, placeholder }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-[300px]" ref={dropdownRef}>
      {/* Main Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[58px] w-full items-center justify-between rounded-full border border-[#e7ebf3] bg-[#edf0fb] px-6 text-[18px] font-semibold text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.06)] outline-none transition-all"
      >
        <div className="flex-1 text-center pl-6">{value || placeholder}</div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Floating Options Menu (Matches provided design) */}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-full overflow-hidden rounded-[24px] bg-[#edf0fb] py-3 shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
          <div className="flex max-h-[260px] flex-col overflow-y-auto px-2">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`rounded-[16px] px-4 py-3.5 text-center text-[16px] font-bold transition-all ${
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
};

export default CustomDropdown;