'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { Book } from '../types';
import { useCartStore } from '@/store/cartStore';

interface StickyBottomBarProps {
  book: Book;
}

const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ book }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show the bar after scrolling down past the top hero section
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transform transition-transform duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-3 flex items-center justify-between gap-4 font-['Montserrat']">
        
        {/* Product Info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="hidden sm:block w-12 h-16 relative bg-gray-100 rounded overflow-hidden shadow-sm shrink-0">
             <Image
                 src={book.coverImage}
                 alt={book.title}
                 fill
                 className="object-cover"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwZTEzMjQiIC8+PC9zdmc+'; // Dark fallback
                 }}
               />
          </div>
          <h4 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1 max-w-[200px] md:max-w-none">
             {book.title}
          </h4>
        </div>

        {/* Pricing & Actions */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
           <div className="hidden md:flex items-center gap-2">
             <span className="text-[22px] font-black text-gray-900">Rs {book.discountedPrice.toLocaleString('en-IN')}</span>
             <span className="bg-[#B9F6A0] text-[#34791E] font-bold text-[10px] px-1.5 py-0.5 rounded">
                {book.discountPercentage}
             </span>
           </div>

           <div className="flex gap-2">
             <button onClick={() => addItem(book)} className="flex items-center justify-center gap-1.5 px-4 md:px-6 py-2 md:py-2.5 border-2 border-gray-200 hover:border-gray-300 rounded-full text-gray-800 font-bold text-sm transition-colors whitespace-nowrap">
                <BookOpen size={16} className="text-[#106A96] hidden sm:block" />
                Add to Bag
             </button>
             <button className="px-4 md:px-6 py-2 md:py-2.5 border-2 border-[#106A96] text-[#106A96] hover:bg-[#F2F8FB] rounded-full font-bold text-sm transition-colors whitespace-nowrap">
                Buy Now
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StickyBottomBar;
