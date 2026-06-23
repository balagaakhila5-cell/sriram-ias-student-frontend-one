'use client';

import Image from '@/components/common/AppImage';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FloatingActions from '@/components/common/FloatingActions';
import YearWiseDropdown from '@/features/ourToppers/components/YearWiseDropdown';
import YearWiseToppersGrid from '@/features/ourToppers/components/YearWiseToppersGrid';
import JoinCTA from '@/features/course/components/sections/JoinCTA';
import type { YearWiseSelection } from '@/features/ourToppers/components/YearWiseDropdown';
import {
  getAllYearsTopperItems,
  getYearWiseTopperItems,
  parseYearWiseRouteParam,
} from '@/features/ourToppers/data/yearWiseToppers';

export default function OurToppersYearWisePage() {
  const navigate = useNavigate();
  const { year: yearParam } = useParams<{ year: string }>();
  const yearSelection = parseYearWiseRouteParam(yearParam ?? '');

  if (!yearSelection) {
    return <Navigate to="/our-toppers-gallery" replace />;
  }

  const yearWiseItems =
    yearSelection === 'all'
      ? getAllYearsTopperItems()
      : getYearWiseTopperItems(yearSelection);

  const handleYearSelect = (selection: YearWiseSelection) => {
    navigate(`/our-toppers-gallery/year-wise/${selection}`);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-white font-['Montserrat',sans-serif]">
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
                  TOPPERS&apos; LIST
                </h2>

                <p className="mx-auto mt-4 max-w-[650px] text-[14px] font-medium text-[#1f3442] sm:text-[16px] md:mx-0 md:text-[20px]">
                  Celebrating the remarkable achievements of our students
                </p>
              </div>

              <YearWiseDropdown
                selectedYear={yearSelection}
                onYearSelect={handleYearSelect}
                className="mx-auto md:mx-0"
              />
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-0">
              <YearWiseToppersGrid items={yearWiseItems} />
            </div>
          </div>
        </section>

        <JoinCTA />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
