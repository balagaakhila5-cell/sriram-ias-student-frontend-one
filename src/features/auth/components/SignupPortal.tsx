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
import { setMockStudentAuth } from "../utils/mockAuth";

const mobileRegex = /^\d{10}$/;

const studentSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  mobile: z.string().regex(mobileRegex, "Enter a valid 10-digit mobile"),
});

type StudentSignupForm = z.infer<typeof studentSchema>;
type SignupScreen = "form" | "otp" | "success";

const SignupPortal: React.FC = () => {
  const router = useRouter();

  const [role, setRole] = useState<UserRole>("student");
  const [screen, setScreen] = useState<SignupScreen>("form");
  const [signupData, setSignupData] = useState<StudentSignupForm | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  const form = useForm<StudentSignupForm>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
    },
  });

  useEffect(() => {
    if (screen !== "success") return;

    const timer = window.setTimeout(() => {
      router.push("/");
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [screen, router]);

  const onSubmit = form.handleSubmit((values) => {
    if (role !== "student") return;
    setSignupData(values);
    setOtpError(null);
    setScreen("otp");
  });

  const handleOtpVerify = (otp: string) => {
    if (otp.length !== 4) {
      setOtpError("Please enter 4 digit OTP");
      return;
    }

    if (!signupData) return;

    setMockStudentAuth({
      name: signupData.name,
      email: signupData.email,
      mobile: signupData.mobile,
    });
    setOtpError(null);
    setScreen("success");
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setScreen("form");
    setOtpError(null);
  };

  if (role !== "student") {
    return (
      <AuthPortalShell
        activeRole={role}
        onRoleChange={handleRoleChange}
        loginMode={false}
        title="Account Signup"
      >
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <p className="text-sm text-gray-600">
            {role === "parent"
              ? "Parent signup is currently not required."
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

  if (screen === "success") {
    return (
      <AuthPortalShell
        activeRole={role}
        onRoleChange={handleRoleChange}
        loginMode={false}
        title=""
      >
        <AuthSuccessView title="Sign Up Successful" />
      </AuthPortalShell>
    );
  }

  const title =
    screen === "otp" ? "OTP Verification" : "Create your account";

  return (
    <AuthPortalShell
      activeRole={role}
      onRoleChange={handleRoleChange}
      loginMode={false}
      title={title}
    >
      {screen === "form" ? (
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

          <button
            type="submit"
            className="mt-4 flex h-[43px] w-full items-center justify-center rounded-[24px] text-[18px] font-medium text-white shadow-[0px_4px_20px_rgba(0,103,156,0.35)] transition-opacity hover:opacity-95"
            style={{
              background:
                "linear-gradient(90deg, rgba(24,151,216,0.85) 0%, #021C29 100%)",
            }}
          >
            Sign Up
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
      ) : (
        <OtpVerificationForm
          onVerify={handleOtpVerify}
          onBack={() => {
            setScreen("form");
            setOtpError(null);
          }}
          error={otpError ?? undefined}
        />
      )}
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
