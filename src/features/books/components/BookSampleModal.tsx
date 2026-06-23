'use client';

import React, { useState } from 'react';
import { useRouter } from '@/lib/appRouter';
import { ArrowRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import FlipBook from '@/components/common/FlipBook';
import { INDIAN_ECONOMY_SAMPLE_BOOK } from '@/features/books/data/books';

type BookSampleModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BookSampleModal: React.FC<BookSampleModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [sampleZoom, setSampleZoom] = useState(1);

  if (!isOpen) return null;

  const handleClose = () => {
    setSampleZoom(1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 px-4 py-6"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[920px] rounded-[16px] bg-[#01285A] px-4 pb-5 pt-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:px-8 md:pb-7 md:pt-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2 md:right-4 md:top-4">
          <button
            type="button"
            onClick={() =>
              setSampleZoom((value) => Math.max(0.8, Number((value - 0.1).toFixed(1))))
            }
            aria-label="Zoom out"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-md transition-all hover:bg-white/30 md:h-10 md:w-10"
          >
            <ZoomOut size={20} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() =>
              setSampleZoom((value) => Math.min(1.4, Number((value + 0.1).toFixed(1))))
            }
            aria-label="Zoom in"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-md transition-all hover:bg-white/30 md:h-10 md:w-10"
          >
            <ZoomIn size={20} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close sample preview"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#FF0000] shadow-md transition-transform hover:scale-105 md:h-10 md:w-10"
          >
            <X size={20} className="text-white" strokeWidth={3} />
          </button>
        </div>

        <h2 className="mb-3 px-12 text-center text-[24px] font-extrabold uppercase leading-none tracking-[0.5px] md:mb-4 md:text-[28px]">
          <span className="bg-[linear-gradient(90deg,#B8DDF5_0%,#E8B4BE_100%)] bg-clip-text text-transparent">
            Sample
          </span>
        </h2>

        <FlipBook
          key={INDIAN_ECONOMY_SAMPLE_BOOK.image}
          coverImage={INDIAN_ECONOMY_SAMPLE_BOOK.image}
          compact
          zoom={sampleZoom}
        />

        <div className="mt-1 flex shrink-0 justify-center">
          <button
            type="button"
            onClick={() => {
              router.push(`/books/${INDIAN_ECONOMY_SAMPLE_BOOK.slug}`);
              handleClose();
            }}
            className="flex h-[42px] min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-full border border-white bg-transparent px-6 text-[16px] font-semibold leading-none text-white transition-all duration-300 hover:border-[#0F8EDB] hover:bg-[#0F8EDB] md:h-[44px] md:min-w-[160px] md:text-[18px]"
          >
            Buy Now
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSampleModal;
