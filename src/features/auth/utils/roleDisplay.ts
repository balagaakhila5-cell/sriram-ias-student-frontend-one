import type { ServerRole, UserRole } from "../types";

export function getRoleDisplayLabel(role: ServerRole | UserRole): string {
  switch (role) {
    case "parent":
      return "Parent";
    case "employee":
    case "faculty":
      return "Faculty";
    case "student":
      return "Student";
    case "super_admin":
      return "Super Admin";
    case "center_admin":
      return "Center Admin";
    default:
      return "User";
  }
}

export function getRoleBadgeStyles(role: ServerRole | UserRole) {
  switch (role) {
    case "parent":
      return "bg-[#E8F7EE] text-[#1F7A4D] border-[#B8E6CB]";
    case "employee":
    case "faculty":
      return "bg-[#F3ECFA] text-[#6B3FA0] border-[#DBC8F0]";
    case "student":
      return "bg-[#E6F4FB] text-[#0A73B7] border-[#B8DCEC]";
    default:
      return "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]";
  }
}

export function getPortalHomeHref(role: ServerRole): string {
  if (role === "parent") return "/parent/course-details";
  if (role === "employee") return "/employee/my-classes";
  if (role === "student") return "/student/live-class";
  return "/";
}
