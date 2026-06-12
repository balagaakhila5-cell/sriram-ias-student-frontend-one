"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updateMenuPosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const width = Math.min(280, window.innerWidth - 32);
    setMenuStyle({
      top: rect.bottom + 12,
      left: rect.left + rect.width / 2 - width / 2,
      width,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    updateMenuPosition();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        rootRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };

    const onReposition = () => updateMenuPosition();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [isOpen, updateMenuPosition]);

  const menu =
    isOpen && menuStyle ? (
      <div
        ref={menuRef}
        className="fixed z-[9999] overflow-hidden rounded-[24px] bg-[#edf0fb] py-3 shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
        style={{
          top: menuStyle.top,
          left: menuStyle.left,
          width: menuStyle.width,
        }}
      >
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
    ) : null;

  return (
    <div className={`relative ${className}`} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setIsOpen((open) => {
            const next = !open;
            if (next) updateMenuPosition();
            return next;
          });
        }}
        aria-label={value ? `Selected date: ${value}` : "Select date"}
        className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#e7ebf3] bg-[#edf0fb] text-[#2a9cda] shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all hover:scale-[1.03]"
      >
        <Calendar size={26} strokeWidth={2} aria-hidden />
      </button>

      {typeof document !== "undefined" && menu
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
}
