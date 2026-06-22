'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ToppersGalleryTabs from '@/features/ourToppers/components/ToppersGalleryTabs';
import TestimonialsCarousel from '@/features/ourToppers/components/TestimonialsCarousel';
import TopperGalleryCard from '@/features/ourToppers/components/TopperGalleryCard';
import ToppersGalleryPagination from '@/features/ourToppers/components/ToppersGalleryPagination';
import ToppersGallerySkeleton from '@/features/ourToppers/components/ToppersGallerySkeleton';
import type { YearWiseSelection } from '@/features/ourToppers/components/YearWiseDropdown';
import type { ToppersYearFilter } from '@/features/ourToppers/components/ToppersYearFilterDropdown';
import { useToppersGallery } from '@/features/ourToppers/hooks/useToppersGallery';
import { FALLBACK_GALLERY_YEARS } from '@/features/ourToppers/data/galleryToppersFallback';
import { TOPPERS_GALLERY_PAGE_SIZE } from '@/features/ourToppers/types';
import JoinCTA from '@/features/course/components/sections/JoinCTA';

const OurToppersGalleryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Toppers' | 'Testimonials'>('Toppers');
  const [filterYear, setFilterYear] = useState<ToppersYearFilter>('all');
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useToppersGallery({
    year: filterYear,
    page,
    limit: TOPPERS_GALLERY_PAGE_SIZE,
  });

  const toppers = data?.toppers ?? [];
  const total = data?.total ?? 0;
  const filterYears =
    data?.years && data.years.length > 0
      ? data.years
      : [...FALLBACK_GALLERY_YEARS];

  const handleTabChange = (tab: 'Toppers' | 'Testimonials') => {
    setActiveTab(tab);
  };

  const handleYearSelect = (selection: YearWiseSelection) => {
    navigate(`/our-toppers-gallery/year-wise/${selection}`);
  };

  const handleFilterYearChange = (year: ToppersYearFilter) => {
    setFilterYear(year);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showSkeleton = isLoading && !data;

  return (
    <main className="min-h-screen overflow-hidden bg-white font-['Montserrat',sans-serif]">
      <Header />

      {/* HERO BANNER */}
      <section className="relative h-[260px] w-full overflow-hidden sm:h-[320px] md:h-[390px]">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="Our Toppers Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-black/90 via-black/60 to-transparent md:w-[48%]" />
        <div className="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-black/25 to-transparent" />
      </section>

      {/* TOPPERS GALLERY */}
      <section className="relative overflow-hidden bg-[#B8E5FB] py-10 md:py-12">
        <Image
          src="/assets/our-toppers-gallery/our-toppers-bg.png"
          alt="Toppers gallery background"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />

        <div className="relative z-10 w-full">
          <div className="mb-8 flex w-full flex-col justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-start md:px-[48px] lg:px-[42px]">
            <div className="text-center md:text-left">
              <h2 className="bg-gradient-to-r from-[#159fe3] via-[#8e91b5] to-[#d96f7d] bg-clip-text text-[34px] font-black uppercase leading-[1.05] tracking-[1px] text-transparent sm:text-[44px] md:text-[66px] lg:text-[74px]">
                {activeTab === 'Testimonials'
                  ? 'TESTIMONIALS'
                  : "TOPPERS' GALLERY"}
              </h2>

              <p className="mx-auto mt-4 max-w-[650px] text-[14px] font-medium text-[#1f3442] sm:text-[16px] md:mx-0 md:text-[20px]">
                Celebrating the remarkable achievements of our students
              </p>
            </div>

            <ToppersGalleryTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onYearSelect={handleYearSelect}
              filterYear={filterYear}
              filterYears={filterYears}
              onFilterYearChange={handleFilterYearChange}
            />
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-0">
            {activeTab === 'Testimonials' ? (
              <TestimonialsCarousel />
            ) : showSkeleton ? (
              <ToppersGallerySkeleton />
            ) : (
              <>
                <div
                  className={`grid w-full grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 ${
                    isFetching ? 'opacity-70' : ''
                  }`}
                >
                  {toppers.map((topper, index) => (
                    <TopperGalleryCard
                      key={topper.id}
                      topper={topper}
                      index={index}
                    />
                  ))}
                </div>

                {toppers.length === 0 && !isLoading && (
                  <p className="py-12 text-center text-[15px] font-semibold text-[#1f3442]">
                    No toppers found for{' '}
                    {filterYear === 'all' ? 'the selected filters' : filterYear}.
                  </p>
                )}

                <ToppersGalleryPagination
                  page={page}
                  total={total}
                  pageSize={TOPPERS_GALLERY_PAGE_SIZE}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </section>

      <JoinCTA />

      <Footer />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap');

        .testimonial-quote-text {
          font-family: 'Caveat', 'Segoe Script', 'Bradley Hand', cursive;
        }
      `}</style>
    </main>
  );
};

export default OurToppersGalleryPage;
