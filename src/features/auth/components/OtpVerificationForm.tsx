"use client";

import React, { useEffect, useRef, useState } from "react";

const DEFAULT_VALIDITY_SECONDS = 60;

interface OtpVerificationFormProps {
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResend: () => void;
  error?: string;
  message?: string;
  otpLength?: 4 | 6;
  resendLoading?: boolean;
  validitySeconds?: number;
  /** Increment when OTP is sent or resent to reset timer and inputs. */
  otpSessionKey?: number;
}

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  onVerify,
  onBack,
  onResend,
  error,
  message = "OTP received to your mobile number",
  otpLength = 4,
  resendLoading = false,
  validitySeconds = DEFAULT_VALIDITY_SECONDS,
  otpSessionKey = 0,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    Array.from({ length: otpLength }, () => ""),
  );
  const [validityLeft, setValidityLeft] = useState(validitySeconds);
  const [localError, setLocalError] = useState<string | null>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    setOtpValues(Array.from({ length: otpLength }, () => ""));
    setValidityLeft(validitySeconds);
    setLocalError(null);
    otpRefs.current[0]?.focus();
  }, [otpSessionKey, otpLength, validitySeconds]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setValidityLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const isExpired = validityLeft === 0;

  const handleOtpChange = (index: number, value: string) => {
    const onlyNumber = value.replace(/\D/g, "").slice(0, 1);
    const updatedOtp = [...otpValues];
    updatedOtp[index] = onlyNumber;
    setOtpValues(updatedOtp);
    setLocalError(null);

    if (onlyNumber && index < otpLength - 1) {
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
    if (isExpired) {
      setLocalError("OTP has expired. Please resend OTP.");
      return;
    }

    const otp = otpValues.join("");
    if (otp.length !== otpLength) {
      setLocalError(`Please enter ${otpLength} digit OTP`);
      return;
    }

    onVerify(otp);
  };

  const handleResend = () => {
    if (!isExpired || resendLoading) return;
    onResend();
  };

  const displayError = error ?? localError ?? undefined;

  return (
    <div className="flex w-full flex-col items-center">
      <p className="mb-2 text-center text-[14px] font-medium text-black/70">
        {message}
      </p>

      <p className="mb-4 text-center text-[13px] font-medium text-black/45">
        Enter your {otpLength} digit OTP
      </p>

      <div
        className={`mb-4 flex flex-wrap items-center justify-center gap-3 ${
          otpLength === 6 ? "max-w-[420px]" : ""
        }`}
      >
        {otpValues.map((value, index) => (
          <input
            key={`${otpSessionKey}-${index}`}
            ref={(el) => {
              otpRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={value}
            disabled={isExpired}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            className="h-[42px] w-[52px] rounded-full bg-[#cde8f2] text-center text-[20px] font-bold text-black outline-none focus:shadow-[0_0_0_2px_rgba(42,157,216,0.35)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[58px]"
          />
        ))}
      </div>

      <p
        className={`mb-4 text-center text-[13px] font-medium ${
          isExpired ? "text-red-600" : "text-black/50"
        }`}
      >
        {isExpired
          ? "OTP expired. Please resend to continue."
          : `OTP valid for ${formatTimer(validityLeft)}`}
      </p>

      {displayError && (
        <p className="mb-4 text-center text-xs text-red-600">{displayError}</p>
      )}

      <button
        type="button"
        onClick={handleVerify}
        disabled={isExpired}
        className="h-[43px] w-[233px] rounded-[24px] text-[18px] font-medium text-white shadow-[0px_4px_20px_rgba(0,103,156,0.35)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          background:
            "linear-gradient(90deg, rgba(24,151,216,0.85) 0%, #021C29 100%)",
        }}
      >
        Verify OTP
      </button>

      {isExpired || resendLoading ? (
        <button
          type="button"
          onClick={handleResend}
          disabled={resendLoading}
          className="mt-5 text-[13px] font-bold text-[#0074ab] transition-opacity hover:underline disabled:cursor-not-allowed disabled:text-black/35 disabled:no-underline"
        >
          {resendLoading ? "Resending OTP..." : "Resend OTP"}
        </button>
      ) : null}

      <button
        type="button"
        onClick={onBack}
        className="mt-4 text-[13px] font-bold text-[#0074ab] hover:underline"
      >
        Change mobile / email
      </button>
    </div>
  );
};

export default OtpVerificationForm;
