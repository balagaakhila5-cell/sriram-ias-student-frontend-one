"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import type { ServerRole } from "@/features/auth/types";

const PORTAL_ALLOWED_ROLES: Record<string, ServerRole[]> = {
  student: ["student"],
  parent: ["parent"],
  employee: ["employee", "center_admin", "super_admin"],
};

interface PortalRoleGuardProps {
  portal: keyof typeof PORTAL_ALLOWED_ROLES;
  children: React.ReactNode;
}

export default function PortalRoleGuard({
  portal,
  children,
}: PortalRoleGuardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const allowedRoles = PORTAL_ALLOWED_ROLES[portal];
  const hasAccess =
    Boolean(user) && allowedRoles.includes(user!.role as ServerRole);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated || !user) {
      router.replace(`/login?redirect=/${portal}`);
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace("/login");
    }
  }, [allowedRoles, isAuthenticated, isHydrated, portal, router, user]);

  if (!isHydrated || !isAuthenticated || !user || !hasAccess) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-6">
        <p className="text-center text-[16px] font-medium text-[#00000080]">
          Checking access...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
