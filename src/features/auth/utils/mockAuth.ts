import type { AuthUser } from "../types";
import { useAuthStore } from "@/store/authStore";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function setMockStudentAuth(input: {
  name: string;
  email?: string;
  mobile?: string;
  identifier?: string;
}): void {
  const { name, email, mobile, identifier } = input;

  const user: AuthUser = {
    id: `mock-${Date.now()}`,
    name,
    role: "student",
    email: email ?? (identifier && isEmail(identifier) ? identifier : undefined),
    mobile:
      mobile ?? (identifier && !isEmail(identifier) ? identifier : undefined),
  };

  useAuthStore.getState().setAuth(user, `mock-token-${Date.now()}`);
}
