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
} from '../types';
import {
  assertLoginCredentialAllowed,
  verifyStaffLogin,
} from '../utils/registeredAuthCredentials';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const mockToken = () => `mock-token-${Date.now()}`;

const mockUser = (
  role: AuthUser['role'],
  overrides: Partial<AuthUser> = {},
): AuthUser => ({
  id: `mock-${Date.now()}`,
  name: 'User',
  role,
  ...overrides,
});

const pendingSignups = new Map<string, StudentSignupPayload>();

function assertValidOtp(otp: string) {
  if (!/^\d{6}$/.test(otp.trim())) {
    throw new Error('Invalid OTP. Please enter the 6-digit code.');
  }
}

export const authService = {
  loginSuperAdmin: async (
    credentials: StaffLoginCredentials,
  ): Promise<AuthResponse> => {
    await delay();
    return {
      user: mockUser('super_admin', {
        name: credentials.email.split('@')[0],
        email: credentials.email,
      }),
      token: mockToken(),
    };
  },

  loginStaff: async (
    credentials: StaffLoginCredentials,
  ): Promise<AuthResponse> => {
    await delay();
    assertLoginCredentialAllowed('faculty', { email: credentials.email });
    const account = verifyStaffLogin(credentials);
    return {
      user: mockUser('employee', {
        name: account.name ?? credentials.email.split('@')[0],
        email: credentials.email,
      }),
      token: mockToken(),
    };
  },

  studentSignup: async (
    payload: StudentSignupPayload,
  ): Promise<StudentSignupResponse> => {
    await delay();
    const userId = `mock-student-${Date.now()}`;
    pendingSignups.set(userId, payload);
    return {
      userId,
      message: 'OTP sent successfully. Please check your email.',
    };
  },

  verifyStudentSignup: async (
    payload: VerifyStudentSignupPayload,
  ): Promise<AuthResponse> => {
    await delay();
    assertValidOtp(payload.otp);
    const signup = pendingSignups.get(payload.userId);

    return {
      user: mockUser('student', {
        id: payload.userId,
        name: signup?.name ?? 'Student',
        email: signup?.email,
        mobile: signup?.mobile,
      }),
      token: mockToken(),
    };
  },

  login: async (payload: LoginPayload): Promise<LoginRequestResponse> => {
    await delay();
    const identifier = payload.mobile ?? payload.email ?? 'user';
    return {
      userId: `mock-login-${identifier}`,
      message: 'OTP sent successfully.',
    };
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    await delay();
    assertValidOtp(payload.otp);

    const fallbackRole: ServerRole = payload.email ? 'employee' : 'student';

    return {
      user: mockUser(fallbackRole, {
        id: payload.userId ?? `mock-${Date.now()}`,
        email: payload.email,
        mobile: payload.mobile,
        name: payload.email?.split('@')[0] ?? payload.mobile ?? 'User',
      }),
      token: mockToken(),
    };
  },

  sendOtp: async (_payload: SendOtpPayload): Promise<OtpRequestResponse> => {
    await delay();
    return { message: 'OTP sent successfully.' };
  },
};
