import { httpClient } from "@/lib/httpClient";
import type {
  AuthResponse,
  AuthUser,
  LoginPayload,
  LoginRequestResponse,
  OtpRequestResponse,
  SendOtpPayload,
  ServerRole,
  StaffLoginCredentials,
  StudentSignupPayload,
  StudentSignupResponse,
  VerifyOtpPayload,
  VerifyStudentSignupPayload,
} from "../types";
import {
  assertLoginCredentialAllowed,
  verifyStaffLogin,
} from "../utils/registeredAuthCredentials";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const mockToken = () => `mock-token-${Date.now()}`;

const mockUser = (
  role: AuthUser["role"],
  overrides: Partial<AuthUser> = {},
): AuthUser => ({
  id: `mock-${Date.now()}`,
  name: "User",
  role,
  ...overrides,
});

/**
 * Maps a raw verify-OTP / verify-signup response into our AuthResponse shape.
 *
 * The exact backend payload is not finalised yet, so this tolerates the common
 * shapes: `{ token, user }`, `{ token, student }`, `{ data: { token, user } }`,
 * and token-only responses. This is the single place to adjust once the live
 * response is confirmed.
 */
const normalizeAuthResponse = (
  raw: unknown,
  fallbackRole: ServerRole = "student",
): AuthResponse => {
  const data = (raw ?? {}) as Record<string, unknown>;
  const payload = (data.data ?? data) as Record<string, unknown>;

  const token = (payload.token ??
    payload.accessToken ??
    payload.access_token ??
    "") as string;

  const rawUser = (payload.user ??
    payload.student ??
    payload.parent ??
    payload.profile ??
    null) as Record<string, unknown> | null;

  const user: AuthUser = rawUser
    ? {
        id: String(rawUser._id ?? rawUser.id ?? payload.userId ?? ""),
        name: String(rawUser.name ?? rawUser.fullName ?? ""),
        email: (rawUser.email as string | undefined) ?? undefined,
        mobile: (rawUser.mobile as string | undefined) ?? undefined,
        role: (rawUser.role as ServerRole | undefined) ?? fallbackRole,
        center: (rawUser.center as string | undefined) ?? undefined,
        permissions: (rawUser.permissions as string[] | undefined) ?? undefined,
      }
    : {
        id: String(payload.userId ?? ""),
        name: "",
        role: fallbackRole,
      };

  return { user, token };
};

export const authService = {
  loginSuperAdmin: async (
    credentials: StaffLoginCredentials,
  ): Promise<AuthResponse> => {
    await delay();
    return {
      user: mockUser("super_admin", {
        name: credentials.email.split("@")[0],
        email: credentials.email,
      }),
      token: mockToken(),
    };
  },

  loginStaff: async (
    credentials: StaffLoginCredentials,
  ): Promise<AuthResponse> => {
    await delay();
    assertLoginCredentialAllowed("faculty", { email: credentials.email });
    const account = verifyStaffLogin(credentials);
    return {
      user: mockUser("employee", {
        name: account.name ?? credentials.email.split("@")[0],
        email: credentials.email,
      }),
      token: mockToken(),
    };
  },

  studentSignup: async (
    payload: StudentSignupPayload,
  ): Promise<StudentSignupResponse> => {
    const { data } = await httpClient.post("/api/auth/student-signup", payload);
    return {
      userId: String(data?.userId ?? data?.user?.id ?? data?.user?._id ?? ""),
      message: data?.message,
    };
  },

  verifyStudentSignup: async (
    payload: VerifyStudentSignupPayload,
  ): Promise<AuthResponse> => {
    const { data } = await httpClient.post(
      "/api/auth/verify-student-signup",
      payload,
    );
    return normalizeAuthResponse(data, "student");
  },

  login: async (payload: LoginPayload): Promise<LoginRequestResponse> => {
    const { data } = await httpClient.post("/api/auth/login", payload);
    return {
      userId: data?.userId ? String(data.userId) : undefined,
      message: data?.message,
    };
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    const { data } = await httpClient.post("/api/auth/verify-otp", payload);
    return normalizeAuthResponse(data, "student");
  },

  sendOtp: async (_payload: SendOtpPayload): Promise<OtpRequestResponse> => {
    await delay();
    return { message: "OTP sent successfully." };
  },
};
