'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, ArrowRight } from 'lucide-react';
import { Book } from '../types';
import FlipBook from '@/components/common/FlipBook';

interface BooksGridProps {
  books: Book[];
}

type PopupBook = {
  title: string;
  image: string;
  slug: string;
};

const BooksGrid: React.FC<BooksGridProps> = ({ books }) => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'sample' | 'buy'>('sample');
  const [selectedBook, setSelectedBook] = useState<PopupBook | null>(null);

  const openPopup = (type: 'sample' | 'buy', book: PopupBook) => {
    setPopupType(type);
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
              <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,rgba(225,97,101,0.8)_0%,#20A0E0_100%)]">
                OUR BEST SELLERS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {books.map((book) => {
              const popupBook = {
                title: book.title,
                image: book.coverImage,
                slug: book.slug,
              };

              return (
                <div
                  key={book.id}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  {/* Book image container */}
                  <div
                    className="relative w-full aspect-[3/4] mb-6 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                    onClick={() => openPopup('sample', popupBook)}
                  >
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwZTEzMjQiIC8+PC9zdmc+';
                      }}
                    />

                    {/* Hover Overlay with Buttons */}
                    <div className="absolute inset-0 bg-black/40 flex items-end justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pb-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openPopup('sample', popupBook);
                        }}
                        className="px-5 py-2 rounded-full border-[1.5px] border-white bg-transparent text-white font-[Montserrat] font-semibold text-[16px] hover:bg-[#0F8EDB] hover:border-[#0F8EDB] transition-colors"
                      >
                        Sample
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openPopup('buy', popupBook);
                        }}
                        className="px-5 py-2 rounded-full border-[1.5px] border-white text-white font-[Montserrat] font-semibold text-[16px] hover:bg-[#0F8EDB] hover:border-[#0F8EDB] transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Book details */}
                  <h3 className="font-semibold text-[20px] text-gray-900 leading-snug mb-2 font-[Montserrat]">
                    {book.title} <br />
                    Studies Book -1
                  </h3>

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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FIGMA STYLE POPUP */}
      {showPopup && selectedBook && (
        <div className="fixed inset-0 z-[9999] bg-black/55 flex items-center justify-center px-4 py-6">
          <div className="relative w-full max-w-[860px] rounded-[20px] bg-[#F5F5F5] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="px-8 pt-6 pb-4 relative">
              <h2 className="text-[34px] md:text-[42px] font-extrabold uppercase leading-none tracking-[0.5px]">
                <span className="bg-[linear-gradient(90deg,#C88EA0_0%,#6AA9D8_100%)] bg-clip-text text-transparent">
                  {popupType === 'sample' ? 'SAMPLE' : 'SAMPLE'}
                </span>
              </h2>

              <button
                type="button"
                onClick={closePopup}
                className="absolute top-6 right-8 w-[30px] h-[30px] md:w-[32px] md:h-[32px] rounded-full bg-[#FF0000] flex items-center justify-center"
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
                    className="min-w-[160px] h-[46px] md:h-[48px] px-7 rounded-full border border-white bg-transparent text-white text-[18px] md:text-[20px] font-semibold leading-none transition-all duration-300 hover:bg-[#0F8EDB] hover:border-[#0F8EDB] flex items-center justify-center gap-2"
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