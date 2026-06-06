"use client";

import React, { useRef, useState } from "react";

interface OtpVerificationFormProps {
  onVerify: (otp: string) => void;
  onBack: () => void;
  error?: string;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  onVerify,
  onBack,
  error,
}) => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    const onlyNumber = value.replace(/\D/g, "").slice(0, 1);
    const updatedOtp = [...otpValues];
    updatedOtp[index] = onlyNumber;
    setOtpValues(updatedOtp);

    if (onlyNumber && index < 3) {
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
      <p className="mb-4 text-center text-[13px] font-medium text-black/45">
        Enter Your 4 Digit OTP
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
        className="h-[43px] w-[233px] rounded-[24px] text-[18px] font-medium text-white shadow-[0px_4px_20px_rgba(0,103,156,0.35)] transition-opacity hover:opacity-95"
        style={{
          background:
            "linear-gradient(90deg, rgba(24,151,216,0.85) 0%, #021C29 100%)",
        }}
      >
        Verify OTP
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 text-[13px] font-bold text-[#0074ab] hover:underline"
      >
        Change mobile / email
      </button>
    </div>
  );
};

export default OtpVerificationForm;
