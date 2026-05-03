'use client';

import React from 'react';
import Image from 'next/image';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CouponModal({ isOpen, onClose }: CouponModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[24px] w-full max-w-[480px] overflow-hidden shadow-2xl z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-20 leading-none"
        >
          ×
        </button>

        {/* Coupon illustration */}
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="/assets/books/coupon-popup.png"
            alt="Coupon Offer"
            fill
            className="object-contain p-6"
          />
        </div>
      </div>
    </div>
  );
}
