export type PortalVariant = "student" | "parent";

export interface PortalNavItem {
  label: string;
  href: string;
  /** If true, hide for the given variant. */
  hideFor?: PortalVariant[];
}

const STUDENT_BASE = "/student";

export const studentNavItems: PortalNavItem[] = [
  { label: "Live Class", href: `${STUDENT_BASE}/live-class` },
  { label: "Announcements", href: `${STUDENT_BASE}/announcements` },
  { label: "My Courses", href: `${STUDENT_BASE}/enrollments` },
  { label: "Transactions", href: `${STUDENT_BASE}/transactions` },
  { label: "Test Series - Prelims", href: `${STUDENT_BASE}/test-series-prelims` },
  { label: "Answer Writing  - Mains", href: `${STUDENT_BASE}/answer-writing-mains` },
  { label: "Free Resources", href: `${STUDENT_BASE}/free-resources` },
  { label: "My Bookmarks", href: `${STUDENT_BASE}/bookmarks` },
  { label: "Attendance", href: `${STUDENT_BASE}/attendance` },
  { label: "My Profile", href: `${STUDENT_BASE}/profile` },
  { label: "Important Contacts", href: `${STUDENT_BASE}/important-contacts` },
];
