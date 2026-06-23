"use client";

import { useEffect } from "react";
import Image from "@/components/common/AppImage";
import { UserRound, X } from "lucide-react";
import type { ServerRole } from "@/features/auth/types";
import { getRoleDisplayLabel } from "@/features/auth/utils/roleDisplay";

interface StudentIdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  id: string;
  mobile?: string;
  email?: string;
  role: ServerRole;
  photoUrl?: string | null;
}

export default function StudentIdCardModal({
  isOpen,
  onClose,
  name,
  id,
  mobile,
  email,
  role,
  photoUrl,
}: StudentIdCardModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const roleLabel = getRoleDisplayLabel(role);
  const contact = mobile?.trim() || email?.trim() || "—";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close ID card"
      />

      <div
        className="relative z-10 w-full max-w-[420px] rounded-[20px] bg-white shadow-[0_24px_60px_rgba(0,36,54,0.28)]"
        role="dialog"
        aria-modal="true"
        aria-label="Student ID card"
      >
        <div
          className="relative z-0 rounded-t-[20px] px-6 pb-14 pt-6 text-white"
          style={{
            background: "linear-gradient(135deg, #1897D8 0%, #00679C 100%)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 pr-10">
            <Image
              src="/assets/Logo.png"
              alt="SRIRAM's IAS"
              width={48}
              height={52}
              className="h-11 w-auto shrink-0 object-contain"
            />
            <div className="min-w-0">
              <p
                className="text-[18px] font-extrabold leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                SRIRAM&apos;s IAS
              </p>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">
                {roleLabel} ID Card
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-8 flex flex-col items-center overflow-visible px-6 pb-8 pt-2">
          <div className="relative mx-auto flex size-[112px] shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#EBF0FF] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="size-full object-cover"
              />
            ) : (
              <UserRound size={48} className="text-[#1F7AB8]" strokeWidth={1.5} />
            )}
          </div>

          <h3
            className="student-portal-heading mt-4 max-w-full truncate text-center text-[22px]! font-extrabold"
          >
            {name}
          </h3>

          <p
            className="mt-1 text-[13px] font-bold uppercase tracking-[0.12em] text-[#00679C]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {roleLabel}
          </p>

          <dl className="mt-6 w-full space-y-3 rounded-[16px] bg-[#F4F8FF] px-5 py-4">
            <div>
              <dt className="text-[12px] font-semibold uppercase tracking-wide text-[#00000080]">
                ID Number
              </dt>
              <dd
                className="mt-1 break-all text-[15px] font-bold text-[#021C29]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {id}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] font-semibold uppercase tracking-wide text-[#00000080]">
                Contact
              </dt>
              <dd
                className="mt-1 break-all text-[15px] font-bold text-[#021C29]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {contact}
              </dd>
            </div>
            {email?.trim() && mobile?.trim() ? (
              <div>
                <dt className="text-[12px] font-semibold uppercase tracking-wide text-[#00000080]">
                  Email
                </dt>
                <dd
                  className="mt-1 break-all text-[15px] font-bold text-[#021C29]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {email}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </div>
  );
}
