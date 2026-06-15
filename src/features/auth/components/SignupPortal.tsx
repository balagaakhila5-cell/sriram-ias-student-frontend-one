"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthPortalShell, { UserRole } from "./AuthPortalShell";
import AuthSuccessView from "./AuthSuccessView";
import OtpVerificationForm from "./OtpVerificationForm";
import { useStudentSignup, useVerifyStudentSignup } from "../hooks/useAuth";
import { useEnquiryCenters } from "@/features/enquiry/hooks/useEnquiryLookups";
import type { StudentSignupPayload } from "../types";

const mobileRegex = /^\d{10}$/;

const fallbackCenters = [
  { _id: "6a23e7f6687eddba52c0cfb6", name: "Hyderabad" },
  { _id: "6a240c46687eddba52c0cfcb", name: "New Delhi" },
  { _id: "6a23e824687eddba52c0cfb7", name: "Pune" },
];

const studentSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  mobile: z.string().regex(mobileRegex, "Enter a valid 10-digit mobile"),
  centerId: z.string().min(1, "Please select a center"),
});

type StudentSignupForm = z.infer<typeof studentSchema>;
type SignupScreen = "form" | "otp" | "success";

const SignupPortal: React.FC = () => {
  const router = useRouter();

  const [role, setRole] = useState<UserRole>("student");
  const [screen, setScreen] = useState<SignupScreen>("form");
  const [userId, setUserId] = useState<string | null>(null);
  const [signupPayload, setSignupPayload] = useState<StudentSignupPayload | null>(
    null,
  );
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const { data: centersData, isLoading: centersLoading } = useEnquiryCenters();
  const studentSignup = useStudentSignup();
  const verifyStudentSignup = useVerifyStudentSignup();

  const centers = useMemo(
    () => (centersData?.length ? centersData : fallbackCenters),
    [centersData],
  );

  const form = useForm<StudentSignupForm>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      centerId: "",
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
    const payload: StudentSignupPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      mobile: values.mobile.trim(),
      centerId: values.centerId,
    };

    studentSignup.mutate(payload, {
      onSuccess: (res) => {
        setSignupPayload(payload);
        setUserId(res.userId);
        setOtpError(null);
        setResendMessage(null);
        setScreen("otp");
      },
    });
  });

  const handleResendOtp = () => {
    if (!signupPayload) return;

    setOtpError(null);
    studentSignup.mutate(signupPayload, {
      onSuccess: (res) => {
        setUserId(res.userId);
        setResendMessage(
          `A new OTP was sent to ${signupPayload.email}. Check your inbox and spam folder.`,
        );
      },
      onError: (err) => {
        setOtpError(err.message);
      },
    });
  };

  const handleOtpVerify = (otp: string) => {
    if (otp.length !== 6) {
      setOtpError("Please enter 6 digit OTP");
      return;
    }

    if (!userId) {
      setOtpError("Something went wrong. Please sign up again.");
      return;
    }

    setOtpError(null);
    verifyStudentSignup.mutate(
      { userId, otp },
      { onSuccess: () => setScreen("success") },
    );
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setScreen("form");
    setUserId(null);
    setSignupPayload(null);
    setOtpError(null);
    setResendMessage(null);
    studentSignup.reset();
    verifyStudentSignup.reset();
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
            inputMode="numeric"
            maxLength={10}
            error={form.formState.errors.mobile?.message}
            {...form.register("mobile")}
          />

          <label className="flex w-full flex-col gap-2">
            <span className="text-[14px] font-medium text-black/50">Center</span>
            <select
              {...form.register("centerId")}
              disabled={centersLoading}
              className="h-[48px] w-full rounded-[24px] bg-[#CDE7F1] px-5 text-[15px] text-black outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(24,151,216,0.4)] disabled:opacity-60"
            >
              <option value="">
                {centersLoading ? "Loading centers..." : "Select your center"}
              </option>
              {centers.map((center) => (
                <option key={center._id} value={center._id}>
                  {center.name}
                </option>
              ))}
            </select>
            {form.formState.errors.centerId?.message && (
              <span className="text-xs text-red-600">
                {form.formState.errors.centerId.message}
              </span>
            )}
          </label>

          {studentSignup.error && (
            <p className="text-sm text-red-600">
              {studentSignup.error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={studentSignup.isPending || centersLoading}
            className="mt-4 flex h-[43px] w-full items-center justify-center rounded-[24px] text-[18px] font-medium text-white shadow-[0px_4px_20px_rgba(0,103,156,0.35)] transition-opacity hover:opacity-95 disabled:opacity-60"
            style={{
              background:
                "linear-gradient(90deg, rgba(24,151,216,0.85) 0%, #021C29 100%)",
            }}
          >
            {studentSignup.isPending ? "Please wait..." : "Sign Up"}
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
            setResendMessage(null);
            verifyStudentSignup.reset();
          }}
          subtitle={
            signupPayload
              ? `We sent a 6-digit OTP to ${signupPayload.email}. Please check your inbox and spam folder — delivery can take 1–2 minutes.`
              : undefined
          }
          loading={verifyStudentSignup.isPending}
          error={otpError ?? verifyStudentSignup.error?.message ?? undefined}
          onResend={handleResendOtp}
          resendLoading={studentSignup.isPending}
          resendMessage={resendMessage}
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
