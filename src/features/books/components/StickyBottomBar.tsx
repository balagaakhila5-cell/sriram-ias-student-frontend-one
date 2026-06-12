'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '../types';
import { useCartStore } from '@/store/cartStore';

interface StickyBottomBarProps {
  book: Book;
}

const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ book }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartQuantity = useCartStore(
    (state) =>
      state.items.find((item) => item.book.id === book.id)?.quantity ?? 0,
  );
  const hasItems = cartItems.length > 0;
  const priceQuantity = cartQuantity > 0 ? cartQuantity : 1;
  const totalDiscountedPrice = book.discountedPrice * priceQuantity;

  useEffect(() => {
    const handleScroll = () => {
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
        <div className="flex items-center gap-4 flex-1">
          <div className="hidden sm:block w-12 h-16 relative bg-gray-100 rounded overflow-hidden shadow-sm shrink-0">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwZTEzMjQiIC8+PC9zdmc+';
              }}
            />
          </div>
          <h4 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1 max-w-[200px] md:max-w-none">
            {book.title}
          </h4>
        </div>

        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[22px] font-black text-gray-900">
              Rs {totalDiscountedPrice.toLocaleString('en-IN')}
            </span>
            {cartQuantity > 1 ? (
              <span className="text-xs font-semibold text-gray-500">
                × {cartQuantity}
              </span>
            ) : null}
            <span className="bg-[#B9F6A0] text-[#34791E] font-bold text-[10px] px-1.5 py-0.5 rounded">
              {book.discountPercentage}
            </span>
          </div>

          <Link
            href="/checkout"
            aria-disabled={!hasItems}
            className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base text-white whitespace-nowrap transition-opacity ${
              hasItems ? 'hover:opacity-90' : 'pointer-events-none opacity-50'
            }`}
            style={{
              background:
                'linear-gradient(90deg, rgba(24,151,216,0.85) 0%, #021C29 100%)',
            }}
            onClick={(e) => {
              if (!hasItems) e.preventDefault();
            }}
          >
            Check out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;
