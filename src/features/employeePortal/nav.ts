import type { PortalNavItem } from "@/features/studentPortal/nav";

const EMPLOYEE_BASE = "/employee";

export const employeeNavItems: PortalNavItem[] = [
  { label: "My Classes", href: `${EMPLOYEE_BASE}/my-classes` },
  { label: "Student List", href: `${EMPLOYEE_BASE}/student-list` },
  { label: "Student Feedback", href: `${EMPLOYEE_BASE}/student-feedback` },
  { label: "Attendance", href: `${EMPLOYEE_BASE}/attendance` },
  { label: "Content Upload", href: `${EMPLOYEE_BASE}/content-upload` },
  { label: "Copy Checking", href: `${EMPLOYEE_BASE}/copy-checking` },
  { label: "Holidays", href: `${EMPLOYEE_BASE}/holidays` },
  { label: "Important Contacts", href: `${EMPLOYEE_BASE}/important-contacts` },
];
