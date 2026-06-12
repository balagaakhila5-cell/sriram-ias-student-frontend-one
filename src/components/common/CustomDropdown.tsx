"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const styles = VARIANT_STYLES[variant];
  const display = buttonLabel ?? (value?.trim() ? value : placeholder ?? "");

  const updateMenuPosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setMenuStyle({
      top: rect.bottom + 10,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    if (options.length === 0) setIsOpen(false);
  }, [options.length]);

      {typeof document !== "undefined" && menu
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
};

export default CustomDropdown;
