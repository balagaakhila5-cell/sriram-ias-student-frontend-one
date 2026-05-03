"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthPortalShell, { UserRole } from "./AuthPortalShell";
import OtpModal from "./OtpModal";
import { useSendOtp, useStudentSignup } from "../hooks/useAuth";

const mobileRegex = /^\d{10}$/;

const studentSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  mobile: z.string().regex(mobileRegex, "Enter a valid 10-digit mobile"),
  parentName: z.string().min(2, "Enter parent name"),
  parentEmail: z.string().email("Enter a valid parent email"),
  parentMobile: z.string().regex(mobileRegex, "Enter a valid 10-digit mobile"),
});

const SignupPortal: React.FC = () => {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("student");
  const [otpEmail, setOtpEmail] = useState<string | null>(null);

  const signup = useStudentSignup();
  const sendOtp = useSendOtp();

  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      parentName: "",
      parentEmail: "",
      parentMobile: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (role !== "student") return;
    signup.mutate(values, {
      onSuccess: () => {
        // Auto-trigger OTP for seamless verification -> login
        sendOtp.mutate(
          { email: values.email },
          { onSuccess: () => setOtpEmail(values.email) },
        );
      },
    });
  });

  if (role !== "student") {
    return (
      <AuthPortalShell
        activeRole={role}
        onRoleChange={setRole}
        loginMode={false}
        title="Account Signup"
      >
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <p className="text-sm text-gray-600">
            {role === "parent"
              ? "Parent accounts are created automatically when a student signs up with parent details."
              : "Faculty accounts are provisioned by the center admin."}
          </p>
          <Link
            href="/login"
            className="font-semibold text-[#0A73B7] hover:underline"
          >
            Go to login
          </Link>
        </div>
      </AuthPortalShell>
    );
  }

  return (
    <AuthPortalShell
      activeRole={role}
      onRoleChange={setRole}
      loginMode={false}
      title="Create your account"
    >
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
        <Field
          label="Full Name"
          type="text"
          error={form.formState.errors.name?.message}
          {...form.register("name")}
        />
        <Field
          label="Email ID"
          type="email"
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <Field
          label="Mobile Number"
          type="tel"
          error={form.formState.errors.mobile?.message}
          {...form.register("mobile")}
        />
        <Field
          label="Parent Name"
          type="text"
          error={form.formState.errors.parentName?.message}
          {...form.register("parentName")}
        />
        <Field
          label="Parent Email"
          type="email"
          error={form.formState.errors.parentEmail?.message}
          {...form.register("parentEmail")}
        />
        <Field
          label="Parent Mobile"
          type="tel"
          error={form.formState.errors.parentMobile?.message}
          {...form.register("parentMobile")}
        />

        {(signup.error || sendOtp.error) && (
          <p className="text-sm text-red-600">
            {signup.error?.message ?? sendOtp.error?.message}
          </p>
        )}

        <button
          type="submit"
          disabled={signup.isPending || sendOtp.isPending}
          className="mt-4 flex h-[43px] w-full items-center justify-center rounded-[24px] text-[18px] font-medium text-white shadow-[0px_4px_20px_rgba(0,103,156,0.35)] transition-opacity hover:opacity-95 disabled:opacity-60"
          style={{
            background:
              "linear-gradient(90deg, rgba(24,151,216,0.85) 0%, #021C29 100%)",
          }}
        >
          {signup.isPending || sendOtp.isPending
            ? "Please wait..."
            : "Sign Up"}
        </button>

        <p className="mt-2 text-center text-[13px] text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0A73B7] hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>

      <OtpModal
        open={otpEmail !== null}
        email={otpEmail ?? ""}
        onClose={() => setOtpEmail(null)}
        onSuccess={() => router.push("/")}
        title="Verify your email"
      />
    </AuthPortalShell>
  );
};

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

export default SignupPortal;
