'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import FlipBook from '@/components/common/FlipBook';
import BookSamplePanel from '@/features/books/components/BookSamplePanel';
import { useCartStore } from '@/store/cartStore';
import { INDIAN_ECONOMY_SAMPLE_BOOK } from '@/features/books/data/books';
import type { Book } from '@/features/books/types';

interface BooksOverviewTabsProps {
  featuredBook?: Book;
}

const BooksOverviewTabs: React.FC<BooksOverviewTabsProps> = ({ featuredBook }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const isInCart = useCartStore((state) =>
    featuredBook
      ? state.items.some((item) => item.book.id === featuredBook.id)
      : false,
  );

  const showAddedLabel = justAdded || isInCart;

  const handleAddToCart = () => {
    if (showAddedLabel) {
      openCart();
      return;
    }

    setJustAdded(true);
    if (featuredBook) {
      addItem(featuredBook, { openSidebar: false });
    }

    window.setTimeout(() => {
      openCart();
    }, 450);
  };

  const handleBuyNow = () => {
    setActiveTab('buy');
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard size={28} strokeWidth={2.2} />,
    },
    {
      id: 'toppers',
      label: "Topper's Recommendations",
      icon: <GraduationCap size={26} strokeWidth={2.2} />,
    },
    {
      id: 'sample',
      label: 'View Sample',
      icon: <FileText size={28} strokeWidth={2.2} />,
    },
    {
      id: 'buy',
      label: 'Buy Now',
      icon: <ShoppingBag size={28} strokeWidth={2.2} />,
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 py-16 bg-[#F8F9FB]">
      <div
        className="w-full max-w-[1400px] mx-auto rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col md:flex-row min-h-[620px]"
        style={{
          backgroundImage: "url('/assets/books/overview-bg.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* LEFT PANEL */}
        <div className="w-full md:w-[34%] lg:w-[34%] relative p-8 md:p-10 lg:p-12 shrink-0">
          <div className="flex flex-col gap-6 mt-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-[40px] flex items-center justify-center gap-2.5 px-4 md:px-6 py-4 md:py-5 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[linear-gradient(90deg,#43A9E7_0%,#001C2D_100%)] text-white shadow-lg'
                    : 'bg-[#EDEFFC] text-[#6D7484] hover:bg-[#E2E6F8]'
                }`}
              >
                <span
                  className={`shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-[#7A7F8B]'}`}
                >
                  {tab.icon}
                </span>
                <span className="whitespace-nowrap text-center font-semibold text-[12px] sm:text-[13px] md:text-[14px] leading-none tracking-[-0.2px]">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-[66%] relative flex-grow bg-black flex items-center justify-center rounded-r-[24px]">

          {activeTab === 'overview' && (
            <video
              src="/assets/books/overview-video1.mp4"
              autoPlay
              muted
              loop
              controls
              className="w-full h-full object-cover rounded-r-[24px]"
            />
          )}

          {activeTab === 'toppers' && (
            <video
              src="/assets/books/Topper's recommendation.mp4"
              autoPlay
              muted
              loop
              controls
              className="w-full h-full object-contain rounded-r-[24px]"
            />
          )}

          {(activeTab === 'sample' || activeTab === 'buy') && (
            <>
              {activeTab === 'sample' ? (
                <BookSamplePanel
                  onBuyNow={handleBuyNow}
                  onClose={() => setActiveTab('overview')}
                />
              ) : (
                <div className="absolute inset-0 z-20 flex w-full flex-col bg-[#01285A] px-4 py-10 sm:px-8">
                  <FlipBook
                    coverImage={featuredBook?.coverImage || INDIAN_ECONOMY_SAMPLE_BOOK.image}
                  />

                  <div className="flex shrink-0 justify-center pb-4">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`flex h-[50px] min-w-[180px] items-center justify-center gap-2 rounded-full border-[1.5px] px-8 text-[18px] font-extrabold leading-none shadow-lg transition-all duration-300 md:h-[54px] md:text-[20px] ${
                        showAddedLabel
                          ? 'border-[#0F8EDB] bg-[#0F8EDB] text-white'
                          : 'border-white bg-transparent text-white hover:border-[#0F8EDB] hover:bg-[#0F8EDB] hover:shadow-xl'
                      }`}
                    >
                      {showAddedLabel ? 'Added to Cart' : 'Add to Cart'}
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BooksOverviewTabs;
