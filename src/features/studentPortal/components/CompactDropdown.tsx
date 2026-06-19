"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CompactDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /** Shown when value and buttonLabel are empty */
  placeholder?: string;
  /** Fixed label on the closed button (e.g. always show "Date") */
  buttonLabel?: string;
}

export default function CompactDropdown({
  options,
  value,
  onChange,
  className = "",
  placeholder,
  buttonLabel,
}: CompactDropdownProps) {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const display = buttonLabel ?? value ?? placeholder ?? "";

  const updateMenuPosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setMenuStyle({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();

    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        rootRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const onReposition = (event: Event) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      updateMenuPosition();
    };

    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open, updateMenuPosition]);

  const menu =
    open && menuStyle ? (
      <div
        ref={menuRef}
        className="fixed z-[9999] overflow-hidden rounded-[16px] bg-[#edf0fb] py-2 shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
        style={{
          top: menuStyle.top,
          left: menuStyle.left,
          width: menuStyle.width,
        }}
      >
        <div
          className="flex max-h-[260px] flex-col gap-1 overflow-y-auto overscroll-contain px-2"
          onWheel={(event) => event.stopPropagation()}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`rounded-[12px] px-3 py-2 text-left text-[16px] font-semibold transition-all md:text-[17px] ${
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
    ) : null;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setOpen((current) => {
            const next = !current;
            if (next) updateMenuPosition();
            return next;
          });
        }}
        className="flex h-[44px] w-full items-center justify-between rounded-full border border-[#e7ebf3] bg-[#edf0fb] px-4 text-[16px] font-semibold text-[#111] shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all md:text-[17px]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span
          className={`flex-1 truncate text-left ${
            buttonLabel || (!value && placeholder) ? "text-[#111]" : ""
          }`}
        >
          {display}
        </span>
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

      {typeof document !== "undefined" && menu
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
}
