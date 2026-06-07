import type { AuthUser, ServerRole } from "../types";
import { useAuthStore } from "@/store/authStore";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function setMockAuth(user: AuthUser): void {
  useAuthStore.getState().setAuth(user, `mock-token-${Date.now()}`);
}

export function setMockStudentAuth(input: {
  name: string;
  email?: string;
  mobile?: string;
  identifier?: string;
}): void {
  const { name, email, mobile, identifier } = input;

  setMockAuth({
    id: `mock-${Date.now()}`,
    name,
    role: "student",
    email: email ?? (identifier && isEmail(identifier) ? identifier : undefined),
    mobile:
      mobile ?? (identifier && !isEmail(identifier) ? identifier : undefined),
  });
}

export function setMockParentAuth(input: {
  mobile: string;
  name?: string;
}): void {
  setMockAuth({
    id: `mock-${Date.now()}`,
    name: input.name ?? "Parent",
    role: "parent",
    mobile: input.mobile,
  });
}

export function setMockStaffAuth(input: {
  email: string;
  name?: string;
  role?: ServerRole;
}): void {
  setMockAuth({
    id: `mock-${Date.now()}`,
    name: input.name ?? input.email.split("@")[0],
    role: input.role ?? "employee",
    email: input.email,
  });
}
