'use client';

import React, { useState } from 'react';
import Image from '@/components/common/AppImage';
import { useRouter } from '@/lib/appRouter';
import { Book } from '../types';
import BookSampleModal from './BookSampleModal';
import { useCartStore } from '@/store/cartStore';

interface BooksGridProps {
  books: Book[];
}

const BookGridCard: React.FC<{
  book: Book;
  onOpenSample: () => void;
}> = ({ book, onOpenSample }) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const openCart = useCartStore((state) => state.openCart);
  const cartQuantity = useCartStore(
    (state) => state.items.find((item) => item.book.id === book.id)?.quantity ?? 0,
  );

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(book, { openSidebar: false });
    openCart();
  };

  const handleIncrement = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(book, { openSidebar: false });
    openCart();
  };

  const handleOpenCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    openCart();
  };

  const handleDecrement = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (cartQuantity <= 1) {
      removeItem(book.id);
      return;
    }

    updateQuantity(book.id, cartQuantity - 1);
  };

  const handleBuyNow = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/books/${book.slug}`);
  };

  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative mb-6 w-full">
        <div
          className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
          onClick={onOpenSample}
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwZTEzMjQiIC8+PC9zdmc+';
            }}
          />

          <div className="absolute inset-0 z-20 flex items-end justify-center bg-black/40 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenSample();
              }}
              className="cursor-pointer rounded-full border-[1.5px] border-white bg-transparent px-5 py-2 font-[Montserrat] text-[16px] font-semibold text-white transition-colors hover:border-[#0F8EDB] hover:bg-[#0F8EDB]"
            >
              Sample
            </button>
          </div>
        </div>
      </div>

      <div className="mb-2 w-full max-w-[280px] text-center">
        <h3 className="font-[Montserrat] text-[18px] font-semibold leading-snug text-gray-900 sm:text-[20px]">
          {book.title}
        </h3>
        <p className="mt-1 font-[Montserrat] text-[14px] font-normal leading-snug text-[#666666]">
          {book.subtitle ?? "Sriram's IAS Prelims Series"}
        </p>
      </div>

      <div className="mt-1 flex items-center justify-center gap-2">
        <span className="text-xl font-bold text-[#4999C6]">
          {book.discountedPrice.toLocaleString('en-IN')}
        </span>
        <span className="text-sm font-bold text-gray-400 line-through">
          ({book.originalPrice.toLocaleString('en-IN')})
        </span>
        <span className="ml-1 text-sm font-semibold text-gray-800">
          {book.discountPercentage}
        </span>
      </div>

      <div className="mt-5 grid w-full max-w-[280px] grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleBuyNow}
          className="cursor-pointer rounded-full py-2 text-xs font-medium text-white transition-all hover:opacity-90"
          style={{
            background:
              'linear-gradient(88.42deg, #249EDC 15.64%, #135576 93.77%)',
            boxShadow: '0px 4px 32px 0px #0000001A',
          }}
        >
          Buy Now
        </button>

        {cartQuantity > 0 ? (
          <div className="flex h-[34px] items-center justify-between rounded-md border border-[#249EDC] bg-[#EAF7FF] px-2">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-white"
            >
              −
            </button>
            <button
              type="button"
              onClick={handleOpenCart}
              aria-label="View cart"
              className="min-w-[24px] cursor-pointer text-center text-sm font-bold text-[#007BB5] hover:underline"
            >
              {cartQuantity}
            </button>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label="Increase quantity"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-white"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="cursor-pointer rounded-full border border-[#249EDC] py-2 text-xs font-medium text-[#007BB5] transition-all hover:bg-gray-50"
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

const BooksGrid: React.FC<BooksGridProps> = ({ books }) => {
  const [showSamplePopup, setShowSamplePopup] = useState(false);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#Fdfdfd] py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12">
          <div className="mb-16 flex justify-center text-center">
            <h2 className="text-center font-[Montserrat] text-[56px] font-black uppercase leading-none tracking-normal">
              <span className="bg-[linear-gradient(90deg,#20A0E0_0%,rgba(225,97,101,0.8)_100%)] bg-clip-text text-transparent">
                OUR BEST SELLERS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <BookGridCard
                key={book.id}
                book={book}
                onOpenSample={() => setShowSamplePopup(true)}
              />
            ))}
          </div>
        </div>
      </section>

      <BookSampleModal
        isOpen={showSamplePopup}
        onClose={() => setShowSamplePopup(false)}
      />
    </>
  );
};

export default BooksGrid;
