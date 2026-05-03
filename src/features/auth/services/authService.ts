import apiClient from "@/services/apiClient";
import type {
  AuthResponse,
  OtpRequestResponse,
  ParentLoginRequestPayload,
  SendOtpPayload,
  StaffLoginCredentials,
  StudentSignupPayload,
  VerifyOtpPayload,
} from "../types";

export const authService = {
  loginSuperAdmin: async (
    credentials: StaffLoginCredentials,
  ): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/api/auth/login-super-admin",
      credentials,
    );
    return data;
  },

  loginStaff: async (
    credentials: StaffLoginCredentials,
  ): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/api/auth/login",
      credentials,
    );
    return data;
  },

  studentSignup: async (
    payload: StudentSignupPayload,
  ): Promise<{ message: string }> => {
    const { data } = await apiClient.post<{ message: string }>(
      "/api/auth/student-signup",
      payload,
    );
    return data;
  },

  sendOtp: async (payload: SendOtpPayload): Promise<OtpRequestResponse> => {
    const { data } = await apiClient.post<OtpRequestResponse>(
      "/api/auth/send-otp",
      payload,
    );
    return data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/api/auth/verify-otp",
      payload,
    );
    return data;
  },

  parentLoginRequest: async (
    payload: ParentLoginRequestPayload,
  ): Promise<OtpRequestResponse> => {
    const { data } = await apiClient.post<OtpRequestResponse>(
      "/api/auth/parent-login-request",
      payload,
    );
    return data;
  },
};
