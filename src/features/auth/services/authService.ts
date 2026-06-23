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

interface OtpLoginApiData {
  userId: string;
  flow?: string;
  nextStep?: string;
}

function mapAuthUser(apiUser: StudentAuthApiData['user']): AuthUser {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    mobile: apiUser.mobile,
    role: apiUser.role,
    center: apiUser.center?.centerName ?? undefined,
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
      user: mapAuthUser(apiUser),
    };
  },

  /** Student login — request OTP (POST /api/auth/send-otp) */
  login: async (payload: LoginPayload): Promise<LoginRequestResponse> => {
    const body: Record<string, string> = {};
    if (payload.email) body.email = payload.email.trim().toLowerCase();
    if (payload.mobile) body.mobile = payload.mobile.trim();

    const { data } = await http.post<ApiEnvelope<OtpLoginApiData>>(
      '/auth/send-otp',
      body,
    );

    return {
      userId: data.data.userId,
      message: data.message,
    };
  },

  /** Parent login — request OTP (POST /api/auth/parent-login-request) */
  parentLoginRequest: async (
    payload: LoginPayload,
  ): Promise<LoginRequestResponse> => {
    const body: Record<string, string> = {};
    if (payload.email) body.email = payload.email.trim().toLowerCase();
    if (payload.mobile) body.mobile = payload.mobile.trim();

    const { data } = await http.post<ApiEnvelope<OtpLoginApiData>>(
      '/auth/parent-login-request',
      body,
    );

    return {
      userId: data.data.userId,
      message: data.message,
    };
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    const body: Record<string, string> = { otp: payload.otp.trim() };
    if (payload.userId) body.userId = payload.userId;
    if (payload.email) body.email = payload.email.trim().toLowerCase();
    if (payload.mobile) body.mobile = payload.mobile.trim();

    const { data } = await http.post<ApiEnvelope<StudentAuthApiData>>(
      '/auth/verify-otp',
      body,
    );

    return {
      token: data.data.token,
      user: mapAuthUser(data.data.user),
    };
  },

  sendOtp: async (payload: SendOtpPayload): Promise<OtpRequestResponse> => {
    const body: Record<string, string> = {};
    if (payload.email) body.email = payload.email.trim().toLowerCase();
    if (payload.mobile) body.mobile = payload.mobile.trim();

    const { data } = await http.post<ApiEnvelope<OtpLoginApiData>>(
      '/auth/send-otp',
      body,
    );

    return {
      message: data.message,
      otpRef: data.data.userId,
    };
  },
};
