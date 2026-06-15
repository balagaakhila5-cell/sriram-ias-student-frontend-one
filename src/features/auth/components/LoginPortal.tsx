"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthPortalShell, { UserRole } from "./AuthPortalShell";
import AuthSuccessView from "./AuthSuccessView";
import OtpVerificationForm from "./OtpVerificationForm";
import { useLoginRequest, useStaffLogin, useVerifyOtp } from "../hooks/useAuth";

const isEmail = (value: string) => /.+@.+\..+/.test(value);

type StudentScreen = "form" | "otp" | "success";

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

const parentSchema = z.object({
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  otp: z.string().optional(),
});

const facultySchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPortal: React.FC = () => {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("student");
  const [parentOtpSent, setParentOtpSent] = useState(false);
  const [studentScreen, setStudentScreen] = useState<StudentScreen>("form");
  const [studentIdentifier, setStudentIdentifier] = useState("");
  const [studentUserId, setStudentUserId] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  const studentLoginRequest = useLoginRequest();
  const verifyStudentOtp = useVerifyOtp();
  const parentLoginRequest = useLoginRequest();
  const verifyParentOtp = useVerifyOtp();
  const staffLogin = useStaffLogin("staff");

  const studentForm = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: { identifier: "" },
  });
  const parentForm = useForm({
    resolver: zodResolver(parentSchema),
    defaultValues: { mobile: "", otp: "" },
  });
  const facultyForm = useForm({
    resolver: zodResolver(facultySchema),
    defaultValues: { email: "", password: "" },
  });

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setStudentScreen("form");
    setStudentUserId(null);
    setOtpError(null);
    setParentOtpSent(false);
    parentForm.reset();
    studentLoginRequest.reset();
    verifyStudentOtp.reset();
    parentLoginRequest.reset();
    verifyParentOtp.reset();
  };

  useEffect(() => {
    if (studentScreen !== "success") return;

    const timer = window.setTimeout(() => {
      router.push("/");
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [studentScreen, router]);

  const onStudentSubmit = studentForm.handleSubmit((values) => {
    const identifier = values.identifier.trim();
    setStudentIdentifier(identifier);
    setOtpError(null);
    studentLoginRequest.mutate(
      isEmail(identifier) ? { email: identifier } : { mobile: identifier },
      {
        onSuccess: (res) => {
          setStudentUserId(res.userId ?? null);
          setStudentScreen("otp");
        },
      },
    );
  });

  const handleStudentOtpVerify = (otp: string) => {
    if (otp.length !== 6) {
      setOtpError("Please enter 6 digit OTP");
      return;
    }

    setOtpError(null);
    verifyStudentOtp.mutate(
      {
        otp,
        ...(studentUserId ? { userId: studentUserId } : {}),
        ...(isEmail(studentIdentifier)
          ? { email: studentIdentifier }
          : { mobile: studentIdentifier }),
      },
      { onSuccess: () => setStudentScreen("success") },
    );
  };

  const onParentSendOtp = parentForm.handleSubmit((values) => {
    parentLoginRequest.mutate(
      { mobile: values.mobile.trim() },
      { onSuccess: () => setParentOtpSent(true) },
    );
  });

  const onParentVerifyOtp = parentForm.handleSubmit((values) => {
    const otp = values.otp?.trim() ?? "";
    if (!/^\d{6}$/.test(otp)) {
      parentForm.setError("otp", { message: "Please enter 6 digit OTP" });
      return;
    }

    verifyParentOtp.mutate(
      { mobile: values.mobile.trim(), otp },
      { onSuccess: () => router.push("/parent") },
    );
  });

  const onFacultySubmit = facultyForm.handleSubmit((values) => {
    staffLogin.mutate(values, {
      onSuccess: () => router.push("/employee"),
    });
  });

  const mutationError =
    role === "parent"
      ? parentOtpSent
        ? verifyParentOtp.error?.message
        : parentLoginRequest.error?.message
      : role === "faculty"
        ? staffLogin.error?.message
        : null;

  const isPending =
    role === "parent"
      ? parentOtpSent
        ? verifyParentOtp.isPending
        : parentLoginRequest.isPending
      : role === "faculty"
        ? staffLogin.isPending
        : false;

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

  const studentTitle =
    studentScreen === "otp" ? "OTP Verification" : titleByRole.student;

  return (
    <AuthPortalShell
      activeRole={role}
      onRoleChange={handleRoleChange}
      loginMode
      title={role === "student" ? studentTitle : titleByRole[role]}
    >
      {role === "student" && studentScreen === "form" && (
        <form onSubmit={onStudentSubmit} className="flex w-full flex-col gap-5">
          <Field
            label="Mobile Number / Email Id"
            type="text"
            error={studentForm.formState.errors.identifier?.message}
            {...studentForm.register("identifier")}
          />
          {studentLoginRequest.error && (
            <ErrorText>{studentLoginRequest.error.message}</ErrorText>
          )}
          <SubmitButton loading={studentLoginRequest.isPending} variant="student">
            Send OTP
          </SubmitButton>
          <StudentSignupFooter />
        </form>
      )}

      {role === "student" && studentScreen === "otp" && (
        <OtpVerificationForm
          onVerify={handleStudentOtpVerify}
          onBack={() => {
            setStudentScreen("form");
            setOtpError(null);
            verifyStudentOtp.reset();
          }}
          loading={verifyStudentOtp.isPending}
          error={otpError ?? verifyStudentOtp.error?.message ?? undefined}
        />
      )}

      {role === "parent" && (
        <form
          onSubmit={parentOtpSent ? onParentVerifyOtp : onParentSendOtp}
          className="flex w-full flex-col gap-5"
        >
          <Field
            label="Mobile Number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            error={parentForm.formState.errors.mobile?.message}
            {...parentForm.register("mobile")}
          />
          {parentOtpSent && (
            <Field
              label="OTP"
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              error={parentForm.formState.errors.otp?.message}
              {...parentForm.register("otp")}
            />
          )}
          {mutationError && <ErrorText>{mutationError}</ErrorText>}
          <SubmitButton loading={isPending}>
            {parentOtpSent ? "Verify OTP" : "Send OTP"}
          </SubmitButton>
        </form>
      )}

      {role === "faculty" && (
        <form onSubmit={onFacultySubmit} className="flex w-full flex-col gap-5">
          <Field
            label="Email ID"
            type="email"
            error={facultyForm.formState.errors.email?.message}
            {...facultyForm.register("email")}
          />
          <Field
            label="Password"
            type="password"
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
