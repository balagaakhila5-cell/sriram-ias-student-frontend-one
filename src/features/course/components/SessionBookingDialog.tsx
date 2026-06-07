'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, X, XCircle } from 'lucide-react';

type SessionBookingDialogProps = {
  open: boolean;
  variant: 'success' | 'error';
  message: string;
  onClose: () => void;
};

export default function SessionBookingDialog({
  open,
  variant,
  message,
  onClose,
}: SessionBookingDialogProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isSuccess = variant === 'success';

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-booking-dialog-title"
        className="relative z-10 w-full max-w-[480px] rounded-2xl bg-white p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-5 flex h-16 w-16 items-center justify-center rounded-full ${
              isSuccess ? 'bg-[#E8F9EC]' : 'bg-[#FEECEC]'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 size={36} className="text-[#0CB02D]" />
            ) : (
              <XCircle size={36} className="text-[#E53935]" />
            )}
          </div>

          <h2
            id="session-booking-dialog-title"
            className={`mb-3 text-[22px] font-bold ${
              isSuccess ? 'text-[#0CB02D]' : 'text-[#E53935]'
            }`}
          >
            {isSuccess ? 'Session Booked!' : 'Booking Failed'}
          </h2>

          <p className="mb-8 max-w-[360px] text-[15px] font-medium leading-relaxed text-gray-700">
            {message}
          </p>

          <button
            type="button"
            onClick={onClose}
            className="min-w-[160px] rounded-full px-8 py-3 text-[16px] font-semibold text-white shadow-md transition-opacity hover:opacity-90"
            style={{
              background:
                'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)',
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
