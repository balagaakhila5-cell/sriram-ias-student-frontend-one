"use client";

import React, { useState } from "react";
import { useVerifyOtp } from "../hooks/useAuth";

interface OtpModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
}

const OtpModal: React.FC<OtpModalProps> = ({
  open,
  email,
  onClose,
  onSuccess,
  title = "Enter OTP",
}) => {
  const [otp, setOtp] = useState("");
  const verify = useVerifyOtp();

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    verify.mutate(
      { email, otp },
      {
        onSuccess: () => {
          setOtp("");
          onSuccess?.();
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-[#021C29]">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">
          We sent a 6-digit code to <span className="font-medium">{email}</span>
        </p>
        <form onSubmit={submit} className="mt-5 flex flex-col gap-4">
          <input
            autoFocus
            inputMode="numeric"
            pattern="\d*"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="h-12 w-full rounded-xl bg-[#CDE7F1] px-4 text-center text-lg tracking-[0.4em] outline-none focus:shadow-[0_0_0_2px_rgba(24,151,216,0.4)]"
            placeholder="------"
          />

          {verify.isError && (
            <p className="text-sm text-red-600">{verify.error.message}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 flex-1 rounded-xl border border-gray-300 text-sm font-medium text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={verify.isPending || otp.length < 4}
              className="h-11 flex-1 rounded-xl bg-[#0A73B7] text-sm font-medium text-white disabled:opacity-60"
            >
              {verify.isPending ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;
