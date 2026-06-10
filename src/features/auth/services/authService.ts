import type {
  AuthResponse,
  AuthUser,
  OtpRequestResponse,
  ParentLoginRequestPayload,
  SendOtpPayload,
  StaffLoginCredentials,
  StudentSignupPayload,
  VerifyOtpPayload,
} from "../types";
import {
  DUPLICATE_SIGNUP_MESSAGE,
  isStudentAlreadyRegistered,
  registerStudent,
} from "../utils/registeredStudents";

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
    return {
      user: mockUser("employee", {
        name: credentials.email.split("@")[0],
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
      isStudentAlreadyRegistered({
        email: payload.email,
        mobile: payload.mobile,
      })
    ) {
      throw new Error(DUPLICATE_SIGNUP_MESSAGE);
    }

    return { message: "Signup OTP sent successfully." };
  },

  sendOtp: async (_payload: SendOtpPayload): Promise<OtpRequestResponse> => {
    await delay();
    return { message: "OTP sent successfully." };
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    await delay();
    return {
      user: mockUser("parent", {
        name: "Parent",
        email: payload.email,
        mobile: payload.mobile,
      }),
      token: mockToken(),
    };
  },

  verifyFacultyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    await delay();
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
    payload: VerifyOtpPayload,
  ): Promise<AuthResponse> => {
    await delay();

    const email = payload.email ?? "";
    const mobile = payload.mobile ?? "";
    const name = email.split("@")[0] || "Student";

    registerStudent({
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
    _payload: ParentLoginRequestPayload,
  ): Promise<OtpRequestResponse> => {
    await delay();
    return { message: "OTP sent successfully." };
  },
};
