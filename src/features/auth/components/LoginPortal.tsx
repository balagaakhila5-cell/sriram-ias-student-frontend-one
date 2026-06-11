"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthPortalShell, { UserRole } from "./AuthPortalShell";
import AuthSuccessView from "./AuthSuccessView";
import OtpVerificationForm from "./OtpVerificationForm";
import {
  useParentLoginRequest,
  useSendOtp,
  useStaffLogin,
  useVerifyOtp,
} from "../hooks/useAuth";
import { AUTH_FIELD_LIMITS } from "../constants";
import { setMockStudentAuth } from "../utils/mockAuth";
import {
  PASSWORD_CRITERIA_HINT,
  loginStringNoSpaces,
  passwordSchema,
  stripSpaces,
} from "../utils/passwordValidation";
import {
  assertLoginCredentialAllowed,
  registerAuthCredential,
} from "../utils/registeredAuthCredentials";
import FormFieldLabel from "@/components/common/FormFieldLabel";

type AuthScreen = "form" | "otp" | "success";

const titleByRole: Record<UserRole, string> = {
  student: "Login Portal",
  parent: "Welcome Back !",
  faculty: "Welcome Back !",
};

const studentSchema = z.object({
  identifier: loginStringNoSpaces(
    z
      .string()
      .min(1, "Mobile number or email is required")
      .max(
        AUTH_FIELD_LIMITS.identifierMax,
        `Must be ${AUTH_FIELD_LIMITS.identifierMax} characters or fewer`,
      ),
  ).refine(
    (v) => /^\d{10}$/.test(v) || /.+@.+\..+/.test(v),
    "Enter a valid email or 10-digit mobile",
  ),
});

const mobileSchema = z.object({
  mobile: loginStringNoSpaces(
    z
      .string()
      .min(1, "Mobile number is required")
      .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  ),
});

const facultySchema = z.object({
  email: loginStringNoSpaces(
    z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email")
      .max(
        AUTH_FIELD_LIMITS.emailMax,
        `Email must be ${AUTH_FIELD_LIMITS.emailMax} characters or fewer`,
      ),
  ),
  password: passwordSchema(),
});

const LoginPortal: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [role, setRole] = useState<UserRole>("student");
  const [studentScreen, setStudentScreen] = useState<AuthScreen>("form");
  const [parentScreen, setParentScreen] = useState<AuthScreen>("form");
  const [facultyScreen, setFacultyScreen] = useState<AuthScreen>("form");
  const [studentIdentifier, setStudentIdentifier] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSessionKey, setOtpSessionKey] = useState(0);

  const sendOtp = useSendOtp();
  const parentLoginRequest = useParentLoginRequest();
  const verifyParentOtp = useVerifyOtp();
  const staffLogin = useStaffLogin("staff");

  const studentForm = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: { identifier: "" },
  });
  const parentForm = useForm({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: "" },
  });
  const facultyForm = useForm({
    resolver: zodResolver(facultySchema),
    defaultValues: { email: "", password: "" },
  });

  const resetOtpFlow = () => {
    setOtpError(null);
    setOtpSessionKey((current) => current + 1);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setStudentScreen("form");
    setParentScreen("form");
    setFacultyScreen("form");
    setOtpError(null);
    parentForm.reset();
    facultyForm.reset();
  };

  const showSuccessScreen =
    (role === "student" && studentScreen === "success") ||
    (role === "parent" && parentScreen === "success") ||
    (role === "faculty" && facultyScreen === "success");

  useEffect(() => {
    if (!showSuccessScreen) return;

    const destination =
      role === "parent"
        ? "/parent"
        : role === "faculty"
          ? "/employee"
          : redirectTo.startsWith("/")
            ? redirectTo
            : "/";

    const timer = window.setTimeout(() => {
      router.push(destination);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [redirectTo, role, router, showSuccessScreen]);

  const isMobileIdentifier = (value: string) => /^\d{10}$/.test(value);

  const otpMessageForIdentifier = (identifier: string) =>
    isMobileIdentifier(identifier)
      ? "OTP received to your mobile number"
      : "OTP received to your email address";

  const dispatchOtp = (
    payload: { mobile?: string; email?: string },
    onSent: () => void,
    options: { useParentRequest?: boolean; role: UserRole } = {
      role: "student",
    },
  ) => {
    const mutation = options.useParentRequest ? parentLoginRequest : sendOtp;
    mutation.mutate({ ...payload, role: options.role }, {
      onSuccess: () => {
        resetOtpFlow();
        onSent();
      },
      onError: (error) => {
        setOtpError(
          error instanceof Error ? error.message : "Failed to send OTP.",
        );
      },
    });
  };

  const onStudentSubmit = studentForm.handleSubmit((values) => {
    const identifier = values.identifier.trim();
    setStudentIdentifier(identifier);
    setOtpError(null);

    const payload = isMobileIdentifier(identifier)
      ? { mobile: identifier }
      : { email: identifier };

    dispatchOtp(payload, () => setStudentScreen("otp"), { role: "student" });
  });

  const handleStudentResendOtp = () => {
    setOtpError(null);
    const payload = isMobileIdentifier(studentIdentifier)
      ? { mobile: studentIdentifier }
      : { email: studentIdentifier };
    dispatchOtp(payload, () => undefined, { role: "student" });
  };

  const handleStudentOtpVerify = (otp: string) => {
    if (otp.length !== 4) {
      setOtpError("Please enter 4 digit OTP");
      return;
    }

    const isEmailLogin = studentIdentifier.includes("@");
    const studentName = isEmailLogin
      ? studentIdentifier.split("@")[0]
      : "Student";
    const loginPayload = isEmailLogin
      ? { email: studentIdentifier }
      : { mobile: studentIdentifier };

    try {
      assertLoginCredentialAllowed("student", loginPayload);
      registerAuthCredential("student", {
        name: studentName,
        email: isEmailLogin ? studentIdentifier : undefined,
        mobile: isEmailLogin ? undefined : studentIdentifier,
      });

      setMockStudentAuth({
        name: studentName,
        identifier: studentIdentifier,
      });
      setOtpError(null);
      setStudentScreen("success");
    } catch (error) {
      setOtpError(
        error instanceof Error
          ? error.message
          : "This email or mobile is already used in another portal.",
      );
    }
  };

  const onParentSendOtp = parentForm.handleSubmit((values) => {
    const mobile = values.mobile.trim();
    setParentMobile(mobile);
    setOtpError(null);
    dispatchOtp({ mobile }, () => setParentScreen("otp"), {
      useParentRequest: true,
      role: "parent",
    });
  });

  const handleParentResendOtp = () => {
    setOtpError(null);
    dispatchOtp({ mobile: parentMobile }, () => undefined, {
      useParentRequest: true,
      role: "parent",
    });
  };

  const handleParentOtpVerify = (otp: string) => {
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Please enter 6 digit OTP");
      return;
    }

    verifyParentOtp.mutate(
      { mobile: parentMobile, otp, role: "parent" },
      {
        onSuccess: () => {
          setOtpError(null);
          setParentScreen("success");
        },
        onError: (error) => {
          setOtpError(
            error instanceof Error ? error.message : "OTP verification failed.",
          );
        },
      },
    );
  };

  const onFacultySubmit = facultyForm.handleSubmit((values) => {
    const email = values.email.trim();
    const password = stripSpaces(values.password).slice(
      0,
      AUTH_FIELD_LIMITS.passwordMax,
    );

    try {
      assertLoginCredentialAllowed("faculty", { email });
    } catch (error) {
      facultyForm.setError("email", {
        message:
          error instanceof Error
            ? error.message
            : "This email is registered in another portal.",
      });
      return;
    }

    staffLogin.mutate(
      { email, password },
      {
        onSuccess: () => {
          facultyForm.clearErrors();
          setFacultyScreen("success");
        },
      },
    );
  });

  const mutationError =
    role === "parent"
      ? parentScreen === "otp"
        ? verifyParentOtp.error?.message
        : parentLoginRequest.error?.message
      : role === "faculty"
        ? staffLogin.error?.message
        : sendOtp.error?.message ?? null;

  const isPending =
    role === "parent"
      ? parentScreen === "otp"
        ? verifyParentOtp.isPending
        : parentLoginRequest.isPending
      : role === "faculty"
        ? staffLogin.isPending
        : studentScreen === "form"
          ? sendOtp.isPending
          : false;

  const isResendPending =
    role === "parent"
      ? parentLoginRequest.isPending
      : sendOtp.isPending;

  if (showSuccessScreen) {
    return (
      <AuthPortalShell
        activeRole={role}
        onRoleChange={handleRoleChange}
        loginMode
        title=""
      >
        <AuthSuccessView title="Logged In Successfully" />
      </AuthPortalShell>
    );
  }

  const activeOtpScreen =
    (role === "student" && studentScreen === "otp") ||
    (role === "parent" && parentScreen === "otp");

  const portalTitle = activeOtpScreen
    ? "OTP Verification"
    : titleByRole[role];

  return (
    <AuthPortalShell
      activeRole={role}
      onRoleChange={handleRoleChange}
      loginMode
      title={portalTitle}
    >
      {role === "student" && studentScreen === "form" && (
        <form onSubmit={onStudentSubmit} className="flex w-full flex-col gap-5">
          <Field
            label="Mobile Number / Email Id"
            type="text"
            required
            noSpaces
            placeholder="Enter your mobile number or email id"
            maxLength={AUTH_FIELD_LIMITS.identifierMax}
            error={studentForm.formState.errors.identifier?.message}
            {...studentForm.register("identifier")}
          />
          {mutationError && <ErrorText>{mutationError}</ErrorText>}
          <SubmitButton loading={isPending} variant="student">
            Send OTP
          </SubmitButton>
          <StudentSignupFooter />
        </form>
      )}

      {role === "student" && studentScreen === "otp" && (
        <OtpVerificationForm
          otpSessionKey={otpSessionKey}
          message={otpMessageForIdentifier(studentIdentifier)}
          onVerify={handleStudentOtpVerify}
          onResend={handleStudentResendOtp}
          resendLoading={isResendPending}
          onBack={() => {
            setStudentScreen("form");
            setOtpError(null);
          }}
          error={otpError ?? undefined}
        />
      )}

      {role === "parent" && parentScreen === "form" && (
        <form onSubmit={onParentSendOtp} className="flex w-full flex-col gap-5">
          <Field
            label="Mobile Number"
            type="tel"
            required
            noSpaces
            inputMode="numeric"
            placeholder="Enter your mobile number"
            maxLength={10}
            error={parentForm.formState.errors.mobile?.message}
            {...parentForm.register("mobile")}
          />
          {mutationError && <ErrorText>{mutationError}</ErrorText>}
          <SubmitButton loading={isPending}>Send OTP</SubmitButton>
        </form>
      )}

      {role === "parent" && parentScreen === "otp" && (
        <OtpVerificationForm
          otpLength={6}
          otpSessionKey={otpSessionKey}
          message="OTP received to your mobile number"
          onVerify={handleParentOtpVerify}
          onResend={handleParentResendOtp}
          resendLoading={isResendPending}
          onBack={() => {
            setParentScreen("form");
            setOtpError(null);
          }}
          error={otpError ?? mutationError ?? undefined}
        />
      )}

      {role === "faculty" && (
        <form onSubmit={onFacultySubmit} className="flex w-full flex-col gap-5">
          <Field
            label="Email ID"
            type="email"
            required
            noSpaces
            placeholder="Enter your email id"
            maxLength={AUTH_FIELD_LIMITS.emailMax}
            error={facultyForm.formState.errors.email?.message}
            {...facultyForm.register("email")}
          />
          <Field
            label="Password"
            type="password"
            required
            noSpaces
            placeholder="Enter your password"
            maxLength={AUTH_FIELD_LIMITS.passwordMax}
            autoComplete="current-password"
            hint={PASSWORD_CRITERIA_HINT}
            error={facultyForm.formState.errors.password?.message}
            {...facultyForm.register("password")}
          />
          {mutationError && <ErrorText>{mutationError}</ErrorText>}
          <SubmitButton loading={isPending}>Login</SubmitButton>
        </form>
      )}
    </AuthPortalShell>
  );
};

const StudentSignupFooter = () => (
  <p className="mt-2 text-center text-[13px] text-gray-600">
    Don&apos;t have an account?{" "}
    <Link
      href="/signup"
      className="font-semibold text-[#0A73B7] hover:underline"
    >
      Sign up
    </Link>
  </p>
);

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm text-red-600">{children}</p>
);

const SubmitButton: React.FC<{
  loading?: boolean;
  variant?: "student";
  children: React.ReactNode;
}> = ({ loading, variant, children }) => (
  <button
    type="submit"
    disabled={loading}
    className={`mt-4 flex h-[43px] items-center justify-center rounded-[24px] text-[18px] font-medium text-white shadow-[0px_4px_20px_rgba(0,103,156,0.35)] transition-opacity hover:opacity-95 disabled:opacity-60 ${
      variant === "student" ? "mx-auto w-[233px]" : "w-full"
    }`}
    style={{
      background:
        "linear-gradient(90deg, rgba(24,151,216,0.85) 0%, #021C29 100%)",
    }}
  >
    {loading ? "Please wait..." : children}
  </button>
);

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  noSpaces?: boolean;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  (
    { label, error, hint, required, type, maxLength, noSpaces, onChange, ...rest },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const resolvedMaxLength =
      maxLength ??
      (isPasswordField ? AUTH_FIELD_LIMITS.passwordMax : undefined);
    const inputType = isPasswordField && showPassword ? "text" : type;

    return (
      <label className="flex w-full min-w-0 max-w-full flex-col gap-2">
        <FormFieldLabel
          required={required}
          className="text-[14px] font-medium text-black/50"
        >
          {label}
        </FormFieldLabel>
        <div className="relative w-full">
          <input
            ref={ref}
            type={inputType}
            {...rest}
            maxLength={resolvedMaxLength}
            onChange={(event) => {
              let nextValue = event.target.value;

              if (noSpaces) {
                nextValue = stripSpaces(nextValue);
              }

              if (resolvedMaxLength && nextValue.length > resolvedMaxLength) {
                nextValue = nextValue.slice(0, resolvedMaxLength);
              }

              if (nextValue !== event.target.value) {
                event.target.value = nextValue;
              }

              onChange?.(event);
            }}
            className={`h-[48px] w-full min-w-0 max-w-full rounded-[24px] bg-[#CDE7F1] px-5 text-[15px] text-black placeholder:text-black/40 outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(24,151,216,0.4)] ${
              isPasswordField ? "pr-12" : ""
            }`}
          />
          {isPasswordField ? (
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#0A73B7] transition-colors hover:bg-[#B8DCEC]/60"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff size={20} strokeWidth={2} aria-hidden />
              ) : (
                <Eye size={20} strokeWidth={2} aria-hidden />
              )}
            </button>
          ) : null}
        </div>
        {hint && !error ? (
          <span className="text-xs leading-relaxed text-black/45">{hint}</span>
        ) : null}
        {error && <span className="text-xs text-red-600">{error}</span>}
      </label>
    );
  },
);
Field.displayName = "Field";

export default LoginPortal;
