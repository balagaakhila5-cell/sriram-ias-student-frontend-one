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
  findCredentialByMobile,
  isCredentialAlreadyRegistered,
  registerAuthCredential,
  verifyStaffLogin,
} from "../utils/registeredAuthCredentials";
import { DUPLICATE_SIGNUP_MESSAGE } from "../utils/registeredStudents";

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
  ): Promise<{ message: string }> => {
    await delay();

    if (
      isCredentialAlreadyRegistered({
        email: payload.email,
        mobile: payload.mobile,
      })
    ) {
      throw new Error(DUPLICATE_SIGNUP_MESSAGE);
    }

    return { message: "Signup OTP sent successfully." };
  },

  sendOtp: async (payload: SendOtpPayload): Promise<OtpRequestResponse> => {
    await delay();
    assertLoginCredentialAllowed(payload.role ?? "student", payload);
    return { message: "OTP sent successfully." };
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    await delay();
    assertLoginCredentialAllowed(payload.role ?? "parent", {
      email: payload.email,
      mobile: payload.mobile,
    });
    const credential = payload.mobile
      ? findCredentialByMobile(payload.mobile)
      : undefined;

    return {
      user: mockUser("parent", {
        name: credential?.name ?? "Parent",
        email: payload.email,
        mobile: payload.mobile,
      }),
      token: mockToken(),
    };
  },

  verifyFacultyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    await delay();
    assertLoginCredentialAllowed(payload.role ?? "faculty", {
      email: payload.email,
      mobile: payload.mobile,
    });
    return {
      user: mockUser("employee", {
        name: "Faculty",
        email: payload.email,
        mobile: payload.mobile,
      }),
      token: mockToken(),
    };
  },

  verifyStudentSignup: async (
    payload: VerifyStudentSignupPayload,
  ): Promise<AuthResponse> => {
    await delay();

    const email = payload.email ?? "";
    const mobile = payload.mobile ?? "";
    const name = email.split("@")[0] || "Student";

    assertLoginCredentialAllowed("student", { email, mobile });

    registerAuthCredential("student", {
      name,
      email,
      mobile,
    });

    return {
      user: mockUser("student", {
        name,
        email,
        mobile,
      }),
      token: mockToken(),
    };
  },

  parentLoginRequest: async (
    payload: ParentLoginRequestPayload,
  ): Promise<OtpRequestResponse> => {
    await delay();
    assertLoginCredentialAllowed(payload.role ?? "parent", payload);
    return { message: "OTP sent successfully." };
  },
};
