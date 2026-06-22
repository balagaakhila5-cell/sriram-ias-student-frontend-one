'use client';

import React, { useState } from 'react';
import { ArrowRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import FlipBook from '@/components/common/FlipBook';
import { INDIAN_ECONOMY_SAMPLE_BOOK } from '@/features/books/data/books';

type BookSamplePanelProps = {
  onBuyNow: () => void;
  onClose: () => void;
};

const BookSamplePanel: React.FC<BookSamplePanelProps> = ({ onBuyNow, onClose }) => {
  const [sampleZoom, setSampleZoom] = useState(1);

  return (
    <div className="absolute inset-0 z-20 flex w-full flex-col bg-[#01285A] px-4 pb-5 pt-4 sm:px-8 sm:pb-7 sm:pt-5">
      <div className="absolute right-3 top-3 z-30 flex items-center gap-2 sm:right-6 sm:top-5">
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
          onClick={onClose}
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

      <div className="flex min-h-0 flex-1 flex-col">
        <FlipBook
          key={INDIAN_ECONOMY_SAMPLE_BOOK.image}
          coverImage={INDIAN_ECONOMY_SAMPLE_BOOK.image}
          compact
          zoom={sampleZoom}
        />
      </div>

      <div className="mt-1 flex shrink-0 justify-center">
        <button
          type="button"
          onClick={onBuyNow}
          className="flex h-[42px] min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-full border border-white bg-transparent px-6 text-[16px] font-semibold leading-none text-white transition-all duration-300 hover:border-[#0F8EDB] hover:bg-[#0F8EDB] md:h-[44px] md:min-w-[160px] md:text-[18px]"
        >
          Buy Now
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default BookSamplePanel;
