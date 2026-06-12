"use client";

import { useAuthStore } from "@/store/authStore";
import {
  getRoleBadgeStyles,
  getRoleDisplayLabel,
} from "@/features/auth/utils/roleDisplay";

interface LoggedInUserBadgeProps {
  variant?: "default" | "compact";
  theme?: "light" | "dark";
}

export default function LoggedInUserBadge({
  variant = "default",
  theme = "light",
}: LoggedInUserBadgeProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  if (!isHydrated || !isAuthenticated || !user) return null;

  const roleLabel = getRoleDisplayLabel(user.role);
  const roleBadgeClassName = getRoleBadgeStyles(user.role);
  const isDarkTheme = theme === "dark";

  if (variant === "compact") {
    return (
      <div className="hidden min-w-0 text-right sm:block">
        <p
          className={`truncate text-sm font-semibold ${
            isDarkTheme ? "text-white" : "text-[#021C29]"
          }`}
        >
          {user.name}
        </p>
        <p
          className={`truncate text-xs ${
            isDarkTheme ? "text-white/75" : "text-[#00000080]"
          }`}
        >
          {roleLabel}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 max-w-[min(100%,280px)] items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00679C] text-sm font-bold text-white"
        aria-hidden
      >
        {(user.name.trim()[0] ?? user.email?.[0] ?? "U").toUpperCase()}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#021C29]">
          {user.name}
        </p>
        <span
          className={`mt-0.5 inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${roleBadgeClassName}`}
        >
          {roleLabel}
        </span>
      </div>
    </div>
  );
}
