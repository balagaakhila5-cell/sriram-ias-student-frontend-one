import React from "react";

export function RequiredMark({ className = "text-[#E53935]" }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {" "}
      *
    </span>
  );
}

type FormFieldLabelProps = {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  htmlFor?: string;
};

export default function FormFieldLabel({
  children,
  required = false,
  className = "",
  htmlFor,
}: FormFieldLabelProps) {
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={className}>
        {children}
        {required && <RequiredMark />}
      </label>
    );
  }

  return (
    <span className={className}>
      {children}
      {required && <RequiredMark />}
    </span>
  );
}
