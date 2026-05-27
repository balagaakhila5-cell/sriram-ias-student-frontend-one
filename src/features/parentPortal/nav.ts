import type { PortalNavItem } from "@/features/studentPortal/nav";

const PARENT_BASE = "/parent";

export const parentNavItems: PortalNavItem[] = [
  { label: "Course Details", href: `${PARENT_BASE}/course-details` },
  { label: "Attendance", href: `${PARENT_BASE}/attendance` },
  { label: "Performance Analytics", href: `${PARENT_BASE}/performance` },
  { label: "Important Contacts", href: `${PARENT_BASE}/important-contacts` },
];
