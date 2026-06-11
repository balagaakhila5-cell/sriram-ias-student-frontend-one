"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import {
  getPortalHomeHref,
  getRoleBadgeStyles,
  getRoleDisplayLabel,
} from "@/features/auth/utils/roleDisplay";

export default function LoggedInWelcomeBanner() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  if (!isHydrated || !isAuthenticated || !user) return null;

  const roleLabel = getRoleDisplayLabel(user.role);
  const portalHref = getPortalHomeHref(user.role);

  return (
    <section className="border-b border-[#CDE7F1] bg-[#EBF5FB]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div className="min-w-0">
          <p
            className="text-[15px] font-medium text-[#000000B3]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Welcome back,{" "}
            <span className="font-bold text-[#021C29]">{user.name}</span>
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[12px] font-bold uppercase tracking-wide ${getRoleBadgeStyles(user.role)}`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Logged in as {roleLabel}
            </span>
          </div>
        </div>

        {portalHref !== "/" ? (
          <Link
            href={portalHref}
            className="inline-flex h-[40px] shrink-0 items-center justify-center rounded-full bg-[#00679C] px-5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Go to {roleLabel} Portal
          </Link>
        ) : null}
      </div>
    </section>
  );
}
