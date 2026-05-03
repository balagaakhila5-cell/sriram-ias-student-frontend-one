"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useAuthStore } from "@/store/authStore";
import type {
  ParentLoginRequestPayload,
  SendOtpPayload,
  StaffLoginCredentials,
  StudentSignupPayload,
  VerifyOtpPayload,
} from "../types";

export function useStaffLogin(variant: "staff" | "super_admin" = "staff") {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (credentials: StaffLoginCredentials) =>
      variant === "super_admin"
        ? authService.loginSuperAdmin(credentials)
        : authService.loginStaff(credentials),
    onSuccess: (data) => setAuth(data.user, data.token),
  });
}

export function useStudentSignup() {
  return useMutation({
    mutationFn: (payload: StudentSignupPayload) =>
      authService.studentSignup(payload),
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => authService.sendOtp(payload),
  });
}

export function useParentLoginRequest() {
  return useMutation({
    mutationFn: (payload: ParentLoginRequestPayload) =>
      authService.parentLoginRequest(payload),
  });
}

export function useVerifyOtp() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
    onSuccess: (data) => setAuth(data.user, data.token),
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const qc = useQueryClient();
  return () => {
    clearAuth();
    qc.clear();
  };
}
