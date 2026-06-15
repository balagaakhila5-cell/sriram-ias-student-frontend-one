"use client";

import React, { useRef, useState } from "react";

interface OtpVerificationFormProps {
  onVerify: (otp: string) => void;
  onBack: () => void;
  error?: string;
  /** Shown above the OTP inputs — e.g. where the code was sent. */
  subtitle?: string;
  /** Number of OTP digits to collect. Defaults to 6. */
  length?: number;
  /** Disables the verify button and shows a pending label. */
  loading?: boolean;
  onResend?: () => void;
  resendLoading?: boolean;
  resendMessage?: string | null;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  onVerify,
  onBack,
  error,
  subtitle,
  length = 6,
  loading = false,
  onResend,
  resendLoading = false,
  resendMessage,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(() =>
    Array.from({ length }, () => ""),
  );
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    const onlyNumber = value.replace(/\D/g, "").slice(0, 1);
    const updatedOtp = [...otpValues];
    updatedOtp[index] = onlyNumber;
    setOtpValues(updatedOtp);

    if (onlyNumber && index < length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    onVerify(otpValues.join(""));
  };

  return (
    <div className="flex w-full flex-col items-center">
      {subtitle ? (
        <p className="mb-3 text-center text-[13px] leading-relaxed text-black/55">
          {subtitle}
        </p>
      ) : null}

      <p className="mb-4 text-center text-[13px] font-medium text-black/45">
        Enter Your {length} Digit OTP
      </p>

      <div className="mb-9 flex items-center justify-center gap-4">
        {otpValues.map((value, index) => (
          <input
            key={index}
            ref={(el) => {
              otpRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            className="h-[42px] w-[58px] rounded-full bg-[#cde8f2] text-center text-[20px] font-bold text-black outline-none focus:shadow-[0_0_0_2px_rgba(42,157,216,0.35)]"
          />
        ))}
      </div>

      {error && <p className="mb-4 text-center text-xs text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handleVerify}
        disabled={loading}
        className="h-[43px] w-[233px] rounded-[24px] text-[18px] font-medium text-white shadow-[0px_4px_20px_rgba(0,103,156,0.35)] transition-opacity hover:opacity-95 disabled:opacity-60"
        style={{
          background:
            "linear-gradient(90deg, rgba(24,151,216,0.85) 0%, #021C29 100%)",
        }}
      >
        {loading ? "Please wait..." : "Verify OTP"}
      </button>

      {resendMessage ? (
        <p className="mb-4 text-center text-xs font-medium text-[#0A73B7]">
          {resendMessage}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onBack}
        className="mt-6 text-[13px] font-bold text-[#0074ab] hover:underline"
      >
        Change mobile / email
      </button>

      {onResend ? (
        <button
          type="button"
          onClick={onResend}
          disabled={resendLoading || loading}
          className="mt-3 text-[13px] font-semibold text-[#0074ab] hover:underline disabled:opacity-60"
        >
          {resendLoading ? "Sending OTP..." : "Resend OTP"}
        </button>
      ) : null}
    </div>
  );
};

export default OtpVerificationForm;
