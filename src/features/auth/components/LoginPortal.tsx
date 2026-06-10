"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  useVerifyFacultyOtp,
  useVerifyOtp,
} from "../hooks/useAuth";
import { setMockStudentAuth } from "../utils/mockAuth";

type AuthScreen = "form" | "otp" | "success";

const titleByRole: Record<UserRole, string> = {
  student: "Login Portal",
  parent: "Welcome Back !",
  faculty: "Welcome Back !",
};

const studentSchema = z.object({
  identifier: z
    .string()
    .min(1, "Mobile number or email is required")
    .refine(
      (v) => /^\d{10}$/.test(v) || /.+@.+\..+/.test(v),
      "Enter a valid email or 10-digit mobile",
    ),
});

const mobileSchema = z.object({
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
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
  const [facultyMobile, setFacultyMobile] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSessionKey, setOtpSessionKey] = useState(0);

  const sendOtp = useSendOtp();
  const parentLoginRequest = useParentLoginRequest();
  const verifyParentOtp = useVerifyOtp();
  const verifyFacultyOtp = useVerifyFacultyOtp();

  const studentForm = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: { identifier: "" },
  });
  const parentForm = useForm({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: "" },
  });
  const facultyForm = useForm({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: "" },
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

  useEffect(() => {
    if (studentScreen !== "success") return;

    const timer = window.setTimeout(() => {
      router.push(redirectTo.startsWith("/") ? redirectTo : "/");
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [redirectTo, studentScreen, router]);

  const isMobileIdentifier = (value: string) => /^\d{10}$/.test(value);

  const otpMessageForIdentifier = (identifier: string) =>
    isMobileIdentifier(identifier)
      ? "OTP received to your mobile number"
      : "OTP received to your email address";

  const dispatchOtp = (
    payload: { mobile?: string; email?: string },
    onSent: () => void,
    useParentRequest = false,
  ) => {
    const mutation = useParentRequest ? parentLoginRequest : sendOtp;
    mutation.mutate(payload, {
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

    dispatchOtp(payload, () => setStudentScreen("otp"));
  });

  const handleStudentResendOtp = () => {
    setOtpError(null);
    const payload = isMobileIdentifier(studentIdentifier)
      ? { mobile: studentIdentifier }
      : { email: studentIdentifier };
    dispatchOtp(payload, () => undefined);
  };

  const handleStudentOtpVerify = (otp: string) => {
    if (otp.length !== 4) {
      setOtpError("Please enter 4 digit OTP");
      return;
    }

    setMockStudentAuth({
      name: studentIdentifier.includes("@")
        ? studentIdentifier.split("@")[0]
        : "Student",
      identifier: studentIdentifier,
    });
    setOtpError(null);
    setStudentScreen("success");
  };

  const onParentSendOtp = parentForm.handleSubmit((values) => {
    const mobile = values.mobile.trim();
    setParentMobile(mobile);
    setOtpError(null);
    dispatchOtp({ mobile }, () => setParentScreen("otp"), true);
  });

  const handleParentResendOtp = () => {
    setOtpError(null);
    dispatchOtp({ mobile: parentMobile }, () => undefined, true);
  };

  const handleParentOtpVerify = (otp: string) => {
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Please enter 6 digit OTP");
      return;
    }

    verifyParentOtp.mutate(
      { mobile: parentMobile, otp },
      {
        onSuccess: () => router.push("/parent"),
        onError: (error) => {
          setOtpError(
            error instanceof Error ? error.message : "OTP verification failed.",
          );
        },
      },
    );
  };

  const onFacultySendOtp = facultyForm.handleSubmit((values) => {
    const mobile = values.mobile.trim();
    setFacultyMobile(mobile);
    setOtpError(null);
    dispatchOtp({ mobile }, () => setFacultyScreen("otp"));
  });

  const handleFacultyResendOtp = () => {
    setOtpError(null);
    dispatchOtp({ mobile: facultyMobile }, () => undefined);
  };

  const handleFacultyOtpVerify = (otp: string) => {
    if (!/^\d{4}$/.test(otp)) {
      setOtpError("Please enter 4 digit OTP");
      return;
    }

    verifyFacultyOtp.mutate(
      { mobile: facultyMobile, otp },
      {
        onSuccess: () => router.push("/employee"),
        onError: (error) => {
          setOtpError(
            error instanceof Error ? error.message : "OTP verification failed.",
          );
        },
      },
    );
  };

  const mutationError =
    role === "parent"
      ? parentScreen === "otp"
        ? verifyParentOtp.error?.message
        : parentLoginRequest.error?.message
      : role === "faculty"
        ? facultyScreen === "otp"
          ? verifyFacultyOtp.error?.message
          : sendOtp.error?.message
        : studentScreen === "otp"
          ? sendOtp.error?.message
          : null;

  const isPending =
    role === "parent"
      ? parentScreen === "otp"
        ? verifyParentOtp.isPending
        : parentLoginRequest.isPending
      : role === "faculty"
        ? facultyScreen === "otp"
          ? verifyFacultyOtp.isPending
          : sendOtp.isPending
        : studentScreen === "form"
          ? sendOtp.isPending
          : false;

  const isResendPending =
    role === "parent"
      ? parentLoginRequest.isPending
      : sendOtp.isPending;

  if (role === "student" && studentScreen === "success") {
    return (
      <AuthPortalShell
        activeRole={role}
        onRoleChange={handleRoleChange}
        loginMode
        title=""
      >
        <AuthSuccessView title="Log In Successful" />
      </AuthPortalShell>
    );
  }

  const activeOtpScreen =
    (role === "student" && studentScreen === "otp") ||
    (role === "parent" && parentScreen === "otp") ||
    (role === "faculty" && facultyScreen === "otp");

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
            inputMode="numeric"
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

      {role === "faculty" && facultyScreen === "form" && (
        <form onSubmit={onFacultySendOtp} className="flex w-full flex-col gap-5">
          <Field
            label="Mobile Number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            error={facultyForm.formState.errors.mobile?.message}
            {...facultyForm.register("mobile")}
          />
          {mutationError && <ErrorText>{mutationError}</ErrorText>}
          <SubmitButton loading={isPending}>Send OTP</SubmitButton>
        </form>
      )}

      {role === "faculty" && facultyScreen === "otp" && (
        <OtpVerificationForm
          otpSessionKey={otpSessionKey}
          message="OTP received to your mobile number"
          onVerify={handleFacultyOtpVerify}
          onResend={handleFacultyResendOtp}
          resendLoading={isResendPending}
          onBack={() => {
            setFacultyScreen("form");
            setOtpError(null);
          }}
          error={otpError ?? mutationError ?? undefined}
        />
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
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, ...rest }, ref) => (
    <label className="flex w-full flex-col gap-2">
      <span className="text-[14px] font-medium text-black/50">{label}</span>
      <input
        ref={ref}
        {...rest}
        className="h-[48px] w-full rounded-[24px] bg-[#CDE7F1] px-5 text-[15px] text-black outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(24,151,216,0.4)]"
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  ),
);
Field.displayName = "Field";

export default LoginPortal;
