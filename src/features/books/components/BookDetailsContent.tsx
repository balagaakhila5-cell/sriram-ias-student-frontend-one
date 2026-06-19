'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Share2 } from 'lucide-react';
import { Book } from '../types';
import FlipBook from '@/components/common/FlipBook';
import FreeResourcesCourseSlider from '@/components/common/FreeResourcesCourseSlider';
import DailyLearningCard from '@/features/blogs/components/DailyLearningCard';
import { useCartStore } from '@/store/cartStore';
import { validatePincode } from '@/features/books/utils/checkoutFormValidation';

interface BookDetailsContentProps {
   book: Book;
}

const BookDetailsContent: React.FC<BookDetailsContentProps> = ({ book }) => {
   const [pincode, setPincode] = useState('');
   const [pincodeError, setPincodeError] = useState<string | null>(null);
   const [pincodeSuccess, setPincodeSuccess] = useState<string | null>(null);
   const [shareMessage, setShareMessage] = useState<string | null>(null);
   const addItem = useCartStore((state) => state.addItem);
   const updateQuantity = useCartStore((state) => state.updateQuantity);
   const removeItem = useCartStore((state) => state.removeItem);
   const cartQuantity = useCartStore(
      (state) =>
         state.items.find((item) => item.book.id === book.id)?.quantity ?? 0,
   );

   const priceQuantity = cartQuantity > 0 ? cartQuantity : 1;
   const totalDiscountedPrice = book.discountedPrice * priceQuantity;
   const totalOriginalPrice = book.originalPrice * priceQuantity;

   const handleIncrement = () => {
      addItem(book, { openSidebar: false });
   };

   const handleDecrement = () => {
      if (cartQuantity <= 1) {
         removeItem(book.id);
         return;
      }

      updateQuantity(book.id, cartQuantity - 1);
   };

   const handlePincodeChange = (value: string) => {
      const nextValue = value.replace(/\D/g, '').slice(0, 6);
      setPincode(nextValue);
      setPincodeSuccess(null);

      if (pincodeError) {
         setPincodeError(null);
      }
   };

   const handleCheckPincode = () => {
      const error = validatePincode(pincode);
      if (error) {
         setPincodeError(error);
         setPincodeSuccess(null);
         return;
      }

      setPincodeError(null);
      setPincodeSuccess('Delivery is available for this pin code.');
   };

   const handleShare = useCallback(async () => {
      const url = window.location.href;
      const sharePayload = {
         title: book.title,
         text: `Check out ${book.title} on Sriram's IAS`,
         url,
      };

      try {
         if (typeof navigator !== 'undefined' && navigator.share) {
            await navigator.share(sharePayload);
            return;
         }

         await navigator.clipboard.writeText(url);
         setShareMessage('Link copied to clipboard');
      } catch (error) {
         if (error instanceof Error && error.name === 'AbortError') {
            return;
         }

         try {
            await navigator.clipboard.writeText(url);
            setShareMessage('Link copied to clipboard');
         } catch {
            setShareMessage('Unable to share right now');
         }
      }

      window.setTimeout(() => setShareMessage(null), 2500);
   }, [book.title]);

   return (
      <section className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 pb-32">
         <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

            {/* Left Column: FlipBook */}
            <div className="w-full lg:w-[42%] max-w-[600px]">
               <div className="bg-[#01285A] rounded-3xl p-8 flex flex-col min-h-[500px]">
                  <FlipBook coverImage={book.coverImage} />
               </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full lg:w-[58%] flex flex-col gap-6 font-['Montserrat']">
               <div className="flex justify-between items-start gap-4">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                     {book.title}
                  </h1>
                  <div className="relative shrink-0">
                     <button
                        type="button"
                        onClick={handleShare}
                        aria-label="Share this book"
                        className="rounded-full bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                     >
                        <Share2 size={22} className="text-gray-600" />
                     </button>
                     {shareMessage ? (
                        <span className="absolute right-0 top-full z-10 mt-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                           {shareMessage}
                        </span>
                     ) : null}
                  </div>
               </div>

               <p className="text-xl font-bold text-[#207CA5]">
                  Author <span className="text-gray-900">{book.author}</span>
               </p>

               <div className="flex flex-wrap gap-3 mt-1">
                  {book.tags.map(tag => (
                     <span key={tag} className="px-4 py-2 bg-[#EBF0FF] text-[#00000099] font-medium text-lg rounded-xl">
                        {tag}
                     </span>
                  ))}
               </div>

               <div className="mt-4 flex flex-wrap items-end gap-3">
                  <span className="pb-1 font-medium text-gray-500">
                     MRP : Rs .{' '}
                     <span className="line-through">
                        {totalOriginalPrice.toLocaleString('en-IN')}
                     </span>
                  </span>
                  <span className="text-[32px] font-black text-gray-900">
                     Rs {totalDiscountedPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="mb-2 ml-2 rounded bg-[#B9F6A0] px-2 py-1 text-xs font-bold text-[#34791E]">
                     {book.discountPercentage}
                  </span>
                  {cartQuantity > 1 ? (
                     <span className="mb-2 text-sm font-semibold text-gray-500">
                        ({cartQuantity} × Rs {book.discountedPrice.toLocaleString('en-IN')})
                     </span>
                  ) : null}
               </div>

               <div className="mt-2 flex items-center">
                  <div className="flex items-center gap-3 rounded-2xl border-2 border-[#106A96] px-4 py-1.5">
                     <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={cartQuantity === 0}
                        aria-label="Decrease quantity"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-xl font-bold leading-none text-[#106A96] transition-colors hover:bg-[#EAF7FF] disabled:cursor-not-allowed disabled:opacity-40"
                     >
                        −
                     </button>
                     <span className="min-w-[2ch] text-center text-lg font-bold text-gray-900">
                        {cartQuantity}
                     </span>
                     <button
                        type="button"
                        onClick={handleIncrement}
                        aria-label="Increase quantity"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-xl font-bold leading-none text-[#106A96] transition-colors hover:bg-[#EAF7FF]"
                     >
                        +
                     </button>
                  </div>
               </div>

               {/* Offers */}
               <div className="flex flex-col sm:flex-row gap-4 mt-6 bg-[#EBF0FF] p-6 rounded-xl">
                  {book.offers.map((offer, idx) => (
                     <div key={idx} className="flex-1 relative bg-[#F2F5FF] rounded-xl p-4 flex flex-col justify-between border border-[#E1E8FA]">
                        <div className="flex items-center gap-2 mb-2">
                           <Image src="/assets/books/percent.png" alt="check" width={30} height={30} />
                           <span className="font-bold text-[#000000] text-lg">
                              Get this for {offer.price.toLocaleString('en-IN')}/-
                           </span>
                        </div>
                        <p className="text-xs text-[#00000099] mb-3">{offer.description}</p>
                        <div className="text-right absolute bottom-[-10%] right-4">
                           <button className="rounded-full bg-gradient-to-r from-[#1897D8CC] to-[#021C29] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#0e3b58]">
                              5% Off
                           </button>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Delivery Options */}
               <div className="mt-4">
                  <h3 className="font-semibold text-[#000000] text-xl mb-3">Delivery Options</h3>
                  <div className="flex w-full max-w-[420px] flex-col gap-2">
                     <div className="flex items-center gap-3 rounded-xl bg-[#F2F5FF] p-4">
                        <input
                           type="text"
                           inputMode="numeric"
                           maxLength={6}
                           placeholder="Check your Pincode"
                           className="w-full border-none bg-transparent text-sm font-medium outline-none"
                           value={pincode}
                           onChange={(e) => handlePincodeChange(e.target.value)}
                           onBlur={() => {
                              if (!pincode.trim()) return;
                              const error = validatePincode(pincode);
                              setPincodeError(error ?? null);
                           }}
                        />
                        <button
                           type="button"
                           onClick={handleCheckPincode}
                           className="shrink-0 rounded-full bg-gradient-to-r from-[#1897D8CC] to-[#021C29] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                        >
                           Check
                        </button>
                     </div>
                     {pincodeError ? (
                        <p className="text-left text-xs font-medium text-red-600">{pincodeError}</p>
                     ) : null}
                     {pincodeSuccess ? (
                        <p className="text-left text-xs font-medium text-[#166534]">{pincodeSuccess}</p>
                     ) : null}
                  </div>
               </div>

               {/* Book Summary */}
               <div className="bg-[#FAF9E6] rounded-xl p-6 mt-4">
                  <div className="flex items-center gap-3 mb-3">
                     <Image src="/assets/books/solar_book-bold.png" alt="book" width={30} height={30} />
                     <h3 className="font-semibold text-xl bg-gradient-to-r from-[#1897D8CC] to-[#021C29] bg-clip-text text-transparent">Book Summary</h3>
                  </div>
                  <p className="text-[#00000099] text-lg leading-relaxed font-semibold ">
                     {book.summary}
                  </p>
               </div>
            </div>
         </div>

         <div className="book-details-promo-grid mt-10 grid min-w-0 w-full grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5">
            <DailyLearningCard
               className="relative min-w-0 overflow-hidden transition-transform duration-300 hover:scale-[1.02] lg:col-span-8"
               imageSizes="(max-width: 1024px) 100vw, 66vw"
            />

            <div className="book-details-course-slider min-w-0 w-full rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:col-span-4">
               <FreeResourcesCourseSlider />
            </div>
         </div>
      </section>
   );
};

export default BookDetailsContent;
