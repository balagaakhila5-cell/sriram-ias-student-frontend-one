"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface DemoFormSelectOption {
  value: string;
  label: string;
}

/** Visual presets so the same dropdown fits the modals and the pill-style CTAs. */
export type DemoFormSelectVariant = "modal" | "pill";

interface DemoFormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: DemoFormSelectOption[];
  placeholder: string;
  disabled?: boolean;
  variant?: DemoFormSelectVariant;
  centerText?: boolean;
}

const VARIANTS: Record<
  DemoFormSelectVariant,
  {
    trigger: string;
    placeholder: string;
    menu: string;
    option: string;
    optionSelected: string;
    optionIdle: string;
  }
> = {
  modal: {
    trigger:
      "flex h-9 w-full items-center justify-between rounded-lg border-none bg-[#D7EEF7] px-3 py-2 text-left text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#1897D8]/50 disabled:cursor-not-allowed disabled:opacity-60",
    placeholder: "text-gray-600",
    menu: "max-h-[220px] overflow-y-auto rounded-lg border border-[#c5e3f0] bg-white py-1 shadow-lg",
    option:
      "block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-[#D7EEF7]",
    optionSelected: "font-semibold text-[#005B88]",
    optionIdle: "text-gray-800",
  },
  pill: {
    trigger:
      "flex w-full items-center justify-between rounded-3xl border-none bg-white px-4 py-3.5 text-left text-[16px] font-medium text-gray-800 shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60",
    placeholder: "text-gray-400",
    menu: "max-h-[240px] overflow-y-auto rounded-2xl border border-gray-100 bg-white py-1.5 shadow-xl",
    option:
      "block w-full px-5 py-2.5 text-left text-[15px] font-medium transition-colors hover:bg-blue-50",
    optionSelected: "font-semibold text-[#0A73B7]",
    optionIdle: "text-gray-700",
  },
};

/** Approx. max menu height — used to decide whether to open up or down. */
const MENU_MAX_HEIGHT = 260;
const GAP = 6;

type MenuPosition = {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
};

const DemoFormSelect: React.FC<DemoFormSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  variant = "modal",
  centerText = false,
}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const styles = VARIANTS[variant];

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder;

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
    if (disabled) return;
    if (!open) computePosition();
    setOpen((prev) => !prev);
  };

  // Close on outside click; close on scroll/resize so the fixed menu can't
  // detach from its trigger.
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    const handleDismiss = () => setOpen(false);

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("resize", handleDismiss);
    // capture: true so the modal's own scroll container also dismisses it.
    window.addEventListener("scroll", handleDismiss, true);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("resize", handleDismiss);
      window.removeEventListener("scroll", handleDismiss, true);
    };
  }, [open]);

  return (
    <div className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        className={`${styles.trigger} ${centerText ? "relative justify-center text-center" : ""}`}
      >
        <span
          className={`truncate ${centerText ? "w-full text-center" : ""} ${value ? "" : styles.placeholder}`}
        >
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
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""} ${centerText ? "absolute right-3" : "ml-2"}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open &&
        !disabled &&
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
            className={styles.menu}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`${styles.option} ${
                  value === option.value
                    ? styles.optionSelected
                    : styles.optionIdle
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default DemoFormSelect;
