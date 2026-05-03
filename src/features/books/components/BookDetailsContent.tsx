'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Share2, BookOpen } from 'lucide-react';
import { Book } from '../types';
import FlipBook from '@/components/common/FlipBook';
import { useCartStore } from '@/store/cartStore';

interface BookDetailsContentProps {
   book: Book;
}

const BookDetailsContent: React.FC<BookDetailsContentProps> = ({ book }) => {
   const [pincode, setPincode] = useState('');
   const { addItem } = useCartStore();

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
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                     <Share2 size={22} className="text-gray-600" />
                  </button>
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

               <div className="flex items-end gap-3 mt-4">
                  <span className="text-gray-500 font-medium pb-1">MRP : Rs . <span className="line-through">{book.originalPrice.toLocaleString('en-IN')}</span></span>
                  <span className="text-[32px] font-black text-gray-900">Rs {book.discountedPrice.toLocaleString('en-IN')}</span>
                  <span className="bg-[#B9F6A0] text-[#34791E] font-bold text-xs px-2 py-1 rounded mb-2 ml-2">
                     {book.discountPercentage}
                  </span>
               </div>

               <div className="flex gap-4 mt-2">
                  <button onClick={() => addItem(book)} className="group flex items-center justify-center gap-4 py-4 px-10 border-2 border-[#106A96] rounded-3xl font-bold text-xl transition-all duration-300
    hover:bg-gradient-to-r hover:from-[rgba(24,151,216,0.8)] hover:to-[#021C29] hover:text-white">
                     <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 [&_path]:group-hover:fill-white!">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.50633 4.765V3.75C5.50633 2.75544 5.90142 1.80161 6.60468 1.09835C7.30795 0.395088 8.26177 0 9.25634 0C10.2509 0 11.2047 0.395088 11.908 1.09835C12.6112 1.80161 13.0063 2.75544 13.0063 3.75V4.765C14.2933 4.804 15.0813 4.942 15.6823 5.441C16.5153 6.133 16.7353 7.303 17.1743 9.644L17.9243 13.644C18.5413 16.936 18.8493 18.582 17.9503 19.666C17.0503 20.75 15.3753 20.75 12.0263 20.75H6.48633C3.13633 20.75 1.46233 20.75 0.562335 19.666C-0.337665 18.582 -0.0276651 16.936 0.588335 13.644L1.33833 9.644C1.77833 7.304 1.99733 6.133 2.83033 5.441C3.43133 4.942 4.21933 4.804 5.50633 4.765ZM7.00633 3.75C7.00633 3.15326 7.24339 2.58097 7.66534 2.15901C8.0873 1.73705 8.6596 1.5 9.25634 1.5C9.85307 1.5 10.4254 1.73705 10.8473 2.15901C11.2693 2.58097 11.5063 3.15326 11.5063 3.75V4.75H7.00633V3.75Z" fill="url(#paint0_linear_3145_4227)"/>
                        <defs>
                           <linearGradient id="paint0_linear_3145_4227" x1="0" y1="10.375" x2="18.5126" y2="10.375" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#1897D8" stopOpacity="0.8"/>
                              <stop offset="1" stopColor="#021C29"/>
                           </linearGradient>
                        </defs>
                     </svg>
                     <span className="transition-colors duration-300">
                        Add to Bag
                     </span>
                  </button>

                  <button className="group flex items-center justify-center gap-4 py-4 px-10 border-2 border-[#106A96] rounded-3xl font-bold text-xl transition-all duration-300
    hover:bg-gradient-to-r hover:from-[rgba(24,151,216,0.8)] hover:to-[#021C29] hover:text-white">
                     <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 [&_path]:group-hover:fill-white!">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.50633 4.765V3.75C5.50633 2.75544 5.90142 1.80161 6.60468 1.09835C7.30795 0.395088 8.26177 0 9.25634 0C10.2509 0 11.2047 0.395088 11.908 1.09835C12.6112 1.80161 13.0063 2.75544 13.0063 3.75V4.765C14.2933 4.804 15.0813 4.942 15.6823 5.441C16.5153 6.133 16.7353 7.303 17.1743 9.644L17.9243 13.644C18.5413 16.936 18.8493 18.582 17.9503 19.666C17.0503 20.75 15.3753 20.75 12.0263 20.75H6.48633C3.13633 20.75 1.46233 20.75 0.562335 19.666C-0.337665 18.582 -0.0276651 16.936 0.588335 13.644L1.33833 9.644C1.77833 7.304 1.99733 6.133 2.83033 5.441C3.43133 4.942 4.21933 4.804 5.50633 4.765ZM7.00633 3.75C7.00633 3.15326 7.24339 2.58097 7.66534 2.15901C8.0873 1.73705 8.6596 1.5 9.25634 1.5C9.85307 1.5 10.4254 1.73705 10.8473 2.15901C11.2693 2.58097 11.5063 3.15326 11.5063 3.75V4.75H7.00633V3.75Z" fill="url(#paint1_linear_3145_4227)"/>
                        <defs>
                           <linearGradient id="paint1_linear_3145_4227" x1="0" y1="10.375" x2="18.5126" y2="10.375" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#1897D8" stopOpacity="0.8"/>
                              <stop offset="1" stopColor="#021C29"/>
                           </linearGradient>
                        </defs>
                     </svg>
                     <span className="transition-colors duration-300">
                        Buy Now
                     </span>
                  </button>
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
                           <button className="bg-gradient-to-r from-[#1897D8CC] to-[#021C29] hover:bg-[#0e3b58] text-white text-xs font-bold px-4 py-1.5 rounded-md transition-colors">
                              5% Off
                           </button>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Delivery Options */}
               <div className="mt-4">
                  <h3 className="font-semibold text-[#000000] text-xl mb-3">Delivery Options</h3>
                  <div className="bg-[#F2F5FF] rounded-xl p-4 flex w-[50%]">
                     <input
                        type="text"
                        placeholder="Check your Pincode"
                        className="bg-transparent border-none outline-none text-sm w-full font-medium"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                     />
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
      </section>
   );
};

export default BookDetailsContent;
