export type UserRole = "student" | "parent" | "faculty";

export type ServerRole =
  | "super_admin"
  | "center_admin"
  | "employee"
  | "student"
  | "parent";

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  role: ServerRole;
  center?: string;
  permissions?: string[];
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface StaffLoginCredentials {
  email: string;
  password: string;
}

export interface StudentSignupPayload {
  name: string;
  mobile: string;
  email: string;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
}

export interface SendOtpPayload {
  email?: string;
  mobile?: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ParentLoginRequestPayload {
  studentEmail?: string;
  studentMobile?: string;
  parentEmail?: string;
  parentMobile?: string;
}

export interface OtpRequestResponse {
  message: string;
  // Some backends return a reference id; keep optional.
  otpRef?: string;
}
