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
import { http } from '@/lib/http';
import type { ApiEnvelope } from '@/lib/apiResult';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

interface StudentSignupApiData {
  userId: string;
  flow?: string;
  nextStep?: string;
  center?: unknown;
}

interface StudentAuthApiData {
  token: string;
  user: {
    id: string;
    name: string;
    email?: string;
    mobile?: string;
    role: ServerRole;
    isActive?: boolean;
    center?: { _id: string; centerName?: string; centerCode?: string } | null;
  };
}

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
    const { data } = await http.post<ApiEnvelope<StudentSignupApiData>>(
      '/auth/student-signup',
      {
        name: payload.name,
        mobile: payload.mobile,
        email: payload.email,
      },
    );

    return {
      userId: data.data.userId,
      message: data.message,
    };
  },

  verifyStudentSignup: async (
    payload: VerifyStudentSignupPayload,
  ): Promise<AuthResponse> => {
    const { data } = await http.post<ApiEnvelope<StudentAuthApiData>>(
      '/auth/verify-student-signup',
      {
        userId: payload.userId,
        otp: payload.otp,
      },
    );

    const apiUser = data.data.user;

    return {
      token: data.data.token,
      user: {
        id: apiUser.id,
        name: apiUser.name,
        email: apiUser.email,
        mobile: apiUser.mobile,
        role: apiUser.role,
        center: apiUser.center?.centerName ?? undefined,
      },
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
