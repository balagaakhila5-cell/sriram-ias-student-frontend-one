"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthPortalShell, { UserRole } from "./AuthPortalShell";
import OtpModal from "./OtpModal";
import {
  useParentLoginRequest,
  useSendOtp,
  useStaffLogin,
} from "../hooks/useAuth";

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
  studentEmail: z.string().email("Enter a valid student email"),
  parentEmail: z.string().email("Enter a valid parent email"),
});

const facultySchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPortal: React.FC = () => {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("student");
  const [otpEmail, setOtpEmail] = useState<string | null>(null);

  const sendOtp = useSendOtp();
  const parentLoginRequest = useParentLoginRequest();
  const staffLogin = useStaffLogin("staff");

  const studentForm = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: { identifier: "" },
  });
  const parentForm = useForm({
    resolver: zodResolver(parentSchema),
    defaultValues: { studentEmail: "", parentEmail: "" },
  });
  const facultyForm = useForm({
    resolver: zodResolver(facultySchema),
    defaultValues: { email: "", password: "" },
  });

  const onStudentSubmit = studentForm.handleSubmit(({ identifier }) => {
    const isEmail = identifier.includes("@");
    sendOtp.mutate(
      isEmail ? { email: identifier } : { mobile: identifier },
      {
        onSuccess: () => setOtpEmail(isEmail ? identifier : identifier),
      },
    );
  });

  const onParentSubmit = parentForm.handleSubmit((values) => {
    parentLoginRequest.mutate(values, {
      onSuccess: () => setOtpEmail(values.parentEmail),
    });
  });

  const onFacultySubmit = facultyForm.handleSubmit((values) => {
    staffLogin.mutate(values, {
      onSuccess: () => router.push("/"),
    });
  });

  const mutationError =
    role === "student"
      ? sendOtp.error?.message
      : role === "parent"
        ? parentLoginRequest.error?.message
        : staffLogin.error?.message;

  const isPending =
    role === "student"
      ? sendOtp.isPending
      : role === "parent"
        ? parentLoginRequest.isPending
        : staffLogin.isPending;

  const buttonLabel = role === "faculty" ? "Login" : "Send OTP";

  return (
    <AuthPortalShell
      activeRole={role}
      onRoleChange={setRole}
      loginMode
      title={titleByRole[role]}
    >
      {role === "student" && (
        <form onSubmit={onStudentSubmit} className="flex w-full flex-col gap-5">
          <Field
            label="Mobile Number / Email Id"
            type="text"
            error={studentForm.formState.errors.identifier?.message}
            {...studentForm.register("identifier")}
          />
          {mutationError && <ErrorText>{mutationError}</ErrorText>}
          <SubmitButton loading={isPending} variant="student">
            {buttonLabel}
          </SubmitButton>
          <Footer />
        </form>
      )}

      {role === "parent" && (
        <form onSubmit={onParentSubmit} className="flex w-full flex-col gap-5">
          <Field
            label="Student Email"
            type="email"
            error={parentForm.formState.errors.studentEmail?.message}
            {...parentForm.register("studentEmail")}
          />
          <Field
            label="Parent Email"
            type="email"
            error={parentForm.formState.errors.parentEmail?.message}
            {...parentForm.register("parentEmail")}
          />
          {mutationError && <ErrorText>{mutationError}</ErrorText>}
          <SubmitButton loading={isPending}>{buttonLabel}</SubmitButton>
          <Footer />
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
          <SubmitButton loading={isPending}>{buttonLabel}</SubmitButton>
          <Footer />
        </form>
      )}

      <OtpModal
        open={otpEmail !== null}
        email={otpEmail ?? ""}
        onClose={() => setOtpEmail(null)}
        onSuccess={() => router.push("/")}
      />
    </AuthPortalShell>
  );
};

const Footer = () => (
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
