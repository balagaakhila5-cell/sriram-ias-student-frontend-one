"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Fixed label on closed button — e.g. always show "Date" */
  buttonLabel?: string;
  /** NCERT filter bar — pill dropdowns matching Figma */
  variant?: "default" | "filter";
  className?: string;
}

const VARIANT_STYLES = {
  default: {
    root: "max-w-[300px]",
    button:
      "flex h-[58px] w-full items-center justify-between rounded-full border border-[#e7ebf3] bg-[#edf0fb] px-6 text-[18px] font-semibold text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.06)] outline-none transition-all",
    menu: "rounded-[24px] bg-[#edf0fb] py-3 shadow-[0_10px_40px_rgba(0,0,0,0.12)]",
    optionActive: "bg-white text-[#2a9cda] shadow-sm",
    optionIdle: "text-[#111] hover:bg-[#e2e6f4]",
  },
  filter: {
    root: "min-w-[220px] max-w-[400px] flex-1",
    button:
      "flex h-[56px] w-full items-center justify-between gap-3 rounded-full border-0 bg-[#E8EAF6] px-8 text-[17px] font-semibold text-[#1F1F1F] shadow-[0_6px_18px_rgba(0,0,0,0.08)] outline-none transition-all hover:bg-[#dfe3f5]",
    menu: "rounded-[20px] border border-[#dce1f5] bg-[#E8EAF6] py-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)]",
    optionActive: "bg-white text-[#004D71] shadow-sm",
    optionIdle: "text-[#1F1F1F] hover:bg-[#dfe3f5]",
  },
} as const;

/** Approx. max menu height — used to decide whether to open up or down. */
const MENU_MAX_HEIGHT = 300;
const GAP = 10;

type MenuPosition = {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
};

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  buttonLabel,
  variant = "default",
  className = "",
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const styles = VARIANT_STYLES[variant];
  const display = buttonLabel ?? (value?.trim() ? value : placeholder ?? "");

  useEffect(() => {
    if (options.length === 0) setIsOpen(false);
  }, [options.length]);

  const computePosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    // Flip up when there isn't room below and there's more room above.
    const openUp = spaceBelow < MENU_MAX_HEIGHT && rect.top > spaceBelow;
    setPosition({
      left: rect.left,
      width: rect.width,
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + GAP }
        : { top: rect.bottom + GAP }),
    });
  };

  const toggleOpen = () => {
    if (options.length === 0) return;
    if (!isOpen) computePosition();
    setIsOpen((open) => !open);
  };

  // Close on outside click; close on scroll/resize so the fixed menu can't
  // detach from its trigger.
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    const handleDismiss = () => setIsOpen(false);
    const handleScroll = (event: Event) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("resize", handleDismiss);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("resize", handleDismiss);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  return (
    <div className={`relative w-full ${styles.root} ${className}`.trim()}>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleOpen}
        className={`${styles.button} ${
          options.length === 0
            ? "cursor-default hover:!bg-[#E8EAF6]"
            : "cursor-pointer"
        }`}
        aria-expanded={isOpen && options.length > 0}
        aria-haspopup={options.length > 0 ? "listbox" : undefined}
      >
        <span className="min-w-0 flex-1 truncate text-center">{display}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-[#1F1F1F] transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen &&
        options.length > 0 &&
        position &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              left: position.left,
              width: position.width,
              top: position.top,
              bottom: position.bottom,
              zIndex: 9999,
            }}
            className={`overflow-hidden ${styles.menu}`}
          >
            <div
              className="flex max-h-[260px] flex-col overflow-y-auto overscroll-contain px-2"
              onWheel={(event) => event.stopPropagation()}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`rounded-full px-4 py-3 text-center text-[15px] font-bold transition-all ${
                    value === opt ? styles.optionActive : styles.optionIdle
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default CustomDropdown;
