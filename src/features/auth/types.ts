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
  centerId?: string;
}

export interface StudentSignupResponse {
  userId: string;
  message?: string;
}

export interface VerifyStudentSignupPayload {
  userId: string;
  otp: string;
}

export interface LoginPayload {
  mobile?: string;
  email?: string;
}

export interface LoginRequestResponse {
  userId?: string;
  message?: string;
}

export interface SendOtpPayload {
  email?: string;
  mobile?: string;
  role?: UserRole;
}

export interface VerifyOtpPayload {
  userId?: string;
  email?: string;
  mobile?: string;
  otp: string;
  role?: UserRole;
}

export interface ParentLoginRequestPayload {
  mobile?: string;
  email?: string;
  role?: UserRole;
  studentEmail?: string;
  studentMobile?: string;
  parentEmail?: string;
  parentMobile?: string;
}

export interface OtpRequestResponse {
  message: string;
  otpRef?: string;
}