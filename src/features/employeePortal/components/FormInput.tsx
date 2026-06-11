import type { ReactNode } from "react";

interface FormInputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  rightIcon?: ReactNode;
  rows?: number;
  className?: string;
}

export default function FormInput({
  label,
  placeholder,
  required,
  type = "text",
  value,
  onChange,
  rightIcon,
  rows,
  className = "",
}: FormInputProps) {
  return (
    <label className={`flex w-full min-w-0 max-w-full flex-col gap-2 ${className}`}>
      {label && (
        <span
          className="text-[15px] font-semibold text-[#1F2A37]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {label}
          {required && <span className="text-[#E16165]"> *</span>}
        </span>
      )}
      <div className="relative min-w-0 max-w-full">
        {rows ? (
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="box-border w-full min-w-0 max-w-full resize-y overflow-x-hidden overflow-y-auto break-words rounded-[10px] bg-[#D7E5F4] px-4 py-3 text-[15px] font-medium text-[#1F2A37] outline-none placeholder:text-[#00000066]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="box-border h-[44px] w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden text-ellipsis whitespace-nowrap rounded-[10px] bg-[#D7E5F4] px-4 text-[15px] font-medium text-[#1F2A37] outline-none placeholder:text-[#00000066]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          />
        )}
        {rightIcon && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </span>
        )}
      </div>
    </label>
  );
}
