"use client";

import type { ReactNode } from "react";

type EmptyStateProps = {
  title?: string;
  message?: string;
  action?: ReactNode;
};

export default function EmptyState({
  title = "No records found",
  message = "Try changing filters or check back later.",
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-[20px] border border-dashed border-[#c9d8e8] bg-white/80 px-6 py-12 text-center">
      <h3 className="text-[18px] font-bold text-[#1f2a37]">{title}</h3>
      <p className="mt-2 text-[15px] font-medium text-[#667788]">{message}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
