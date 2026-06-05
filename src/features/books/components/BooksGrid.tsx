'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, ArrowRight } from 'lucide-react';
import { Book } from '../types';
import FlipBook from '@/components/common/FlipBook';
import { useCartStore } from '@/store/cartStore';

interface BooksGridProps {
  books: Book[];
}

type PopupBook = {
  title: string;
  image: string;
  slug: string;
};

type BookGridCardProps = {
  book: Book;
  onOpenSample: (book: PopupBook) => void;
};

const BookGridCard: React.FC<BookGridCardProps> = ({ book, onOpenSample }) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const openCart = useCartStore((state) => state.openCart);
  const cartQuantity = useCartStore(
    (state) => state.items.find((item) => item.book.id === book.id)?.quantity ?? 0,
  );

  const popupBook = {
    title: book.title,
    image: book.coverImage,
    slug: book.slug,
  };

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
          onClick={() => onOpenSample(popupBook)}
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
                onOpenSample(popupBook);
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

      <div className="flex items-center justify-center gap-2 mt-1">
        <span className="font-bold text-[#4999C6] text-xl">
          {book.discountedPrice.toLocaleString('en-IN')}
        </span>
        <span className="text-gray-400 line-through text-sm font-bold">
          ({book.originalPrice.toLocaleString('en-IN')})
        </span>
        <span className="text-sm font-semibold text-gray-800 ml-1">
          {book.discountPercentage}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-[280px] mt-5">
        <button
          type="button"
          onClick={handleBuyNow}
          className="py-2 text-xs text-white rounded-md transition-all hover:opacity-90 font-medium cursor-pointer"
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
              className="flex h-7 w-7 items-center justify-center rounded-md text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-white cursor-pointer"
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
              className="flex h-7 w-7 items-center justify-center rounded-md text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-white cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="cursor-pointer rounded-md border border-[#249EDC] py-2 text-xs font-medium text-[#007BB5] transition-all hover:bg-gray-50"
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

const BooksGrid: React.FC<BooksGridProps> = ({ books }) => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState<PopupBook | null>(null);

  const openSamplePopup = (book: PopupBook) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBook(null);
  };

  return (
    <>
      <section className="relative w-full py-16 bg-[#Fdfdfd] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 flex justify-center">
            <h2 className="font-[Montserrat] font-black text-[56px] leading-none text-center uppercase tracking-normal">
              <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#20A0E0_0%,rgba(225,97,101,0.8)_100%)]">
                OUR BEST SELLERS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {books.map((book) => (
              <BookGridCard
                key={book.id}
                book={book}
                onOpenSample={openSamplePopup}
              />
            ))}
          </div>
        </div>
      </section>

      {showPopup && selectedBook && (
        <div className="fixed inset-0 z-[9999] bg-black/55 flex items-center justify-center px-4 py-6">
          <div className="relative w-full max-w-[860px] rounded-[20px] bg-[#F5F5F5] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="px-8 pt-6 pb-4 relative">
              <h2 className="text-[34px] md:text-[42px] font-extrabold uppercase leading-none tracking-[0.5px]">
                <span className="bg-[linear-gradient(90deg,#6AA9D8_0%,#C88EA0_100%)] bg-clip-text text-transparent">
                  SAMPLE
                </span>
              </h2>

              <button
                type="button"
                onClick={closePopup}
                className="absolute top-6 right-8 w-[30px] h-[30px] md:w-[32px] md:h-[32px] rounded-full bg-[#FF0000] flex items-center justify-center cursor-pointer"
              >
                <X size={20} className="text-white" strokeWidth={3} />
              </button>
            </div>

            <div className="px-8 pb-8">
              <div className="bg-[#01285A] rounded-[16px] min-h-[470px] relative px-6 md:px-10 py-6 md:py-8 flex flex-col">
                <FlipBook coverImage={selectedBook.image} />

                <div className="flex justify-center mt-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      router.push(`/books/${selectedBook.slug}`);
                      closePopup();
                    }}
                    className="min-w-[160px] h-[46px] md:h-[48px] px-7 rounded-full border border-white bg-transparent text-white text-[18px] md:text-[20px] font-semibold leading-none transition-all duration-300 hover:bg-[#0F8EDB] hover:border-[#0F8EDB] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Buy Now
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BooksGrid;
