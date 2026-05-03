'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderId: string;
}

export default function OrderSuccessModal({ isOpen, orderId }: OrderSuccessModalProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger tick animation after a short delay for better visual effect
      const t = setTimeout(() => setChecked(true), 150);
      return () => clearTimeout(t);
    } else {
      setChecked(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Modal Container with Background Image */}
      <div
        className="relative z-10 w-full max-w-[650px] p-10 flex flex-col items-center rounded-2xl shadow-2xl overflow-hidden bg-white bg-cover bg-center bg-no-repeat"
        style={{
          // REPLACE with your actual background image path
          // Added a linear gradient overlay to reduce the background image opacity
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('/assets/books/success-bg.png')",
          // Fallback background color if image fails to load
          backgroundColor: '#FFF9F5',
        }}
      >
        {/* 3D Package image */}
        <div className="relative w-[180px] h-[150px] mb-6 mt-4">
          <Image
            src="/assets/books/order-success.png" // Replace with your box image path
            alt="Order Successful"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Animated tick + ORDER SUCCESSFUL */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="relative w-10 h-10 shrink-0">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              {/* Dashed Circle (Matched to screenshot) */}
              <circle
                cx="20" cy="20" r="18"
                fill="none"
                stroke="#0CB02D"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                className="opacity-100"
              />
              {/* Animated Solid Checkmark */}
              <polyline
                points="12,21 17,26 27,15"
                fill="none"
                stroke="#0CB02D"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 30,
                  strokeDashoffset: checked ? 0 : 30,
                  transition: 'stroke-dashoffset 0.5s ease-out 0.1s',
                }}
              />
            </svg>
          </div>
          <h2 className="text-[23px] font-semibold text-[#0AC20A] font-['Poppins'] tracking-wide">
            ORDER SUCCESSFUL
          </h2>
        </div>

        {/* Description */}
        <p className="text-center text-[16px] text-[#1A1919] font-['Montserrat'] font-medium leading-relaxed mb-6 max-w-[500px]">
          Thank you for the payment the order of service and the payment is received
          and you will get a confirmation mail
        </p>

        {/* Order ID */}
        <p className="text-[15px] text-[#4D4B4B] font-['Montserrat'] font-normal tracking-wide mb-10 uppercase">
          ORDER ID: {orderId}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-5 w-full max-w-[400px] mb-4">
          {/* Download Invoice */}
          <button
            className="flex-1 py-3 rounded-lg text-white font-medium text-[15px] font-['Montserrat'] hover:opacity-90 transition-opacity shadow-md"
            style={{
              background: 'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)',
            }}
          >
            Download Invoice
          </button>

          {/* Go Home */}
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-3 rounded-lg font-medium text-[15px] font-['Montserrat'] hover:opacity-80 transition-opacity"
            style={{
              border: '1.5px solid transparent',
              backgroundClip: 'padding-box',
              background:
                'linear-gradient(white, white) padding-box, linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%) border-box',
              color: '#1897D8CC',
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}