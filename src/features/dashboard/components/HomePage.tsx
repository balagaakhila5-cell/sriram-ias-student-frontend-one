'use client';

import React, { lazy, useEffect } from 'react';
import MainLayout from '@/components/common/MainLayout';
import { refreshScrollAnimations } from '@/utils/gsapNavigation';
import Hero from '@/components/sections/Hero';
import DeferredSection from '@/components/common/DeferredSection';

const MottoSection = lazy(() => import('@/components/sections/MottoSection'));
const ExploreCourses = lazy(() => import('@/components/sections/ExploreCourses'));
const OurToppers = lazy(() => import('@/components/sections/OurToppers'));
const FreeCourses = lazy(() => import('@/components/sections/FreeCourses'));
const BuyBooks = lazy(() => import('@/components/sections/BuyBooks'));
const OfflineCentres = lazy(() => import('@/components/sections/OfflineCentres'));
const OurStory = lazy(() => import('@/components/sections/OurStory'));
const AppAndVideos = lazy(() => import('@/components/sections/AppAndVideos'));

const HomePage: React.FC = () => {
  useEffect(() => {
    refreshScrollAnimations();
  }, []);

  return (
    <MainLayout>
      <Hero />

      <DeferredSection
        component={MottoSection}
        fallbackClassName="min-h-[430px] sm:min-h-[520px] md:min-h-[620px]"
        rootMargin="280px 0px"
      />

      <DeferredSection
        component={ExploreCourses}
        fallbackClassName="min-h-[700px]"
        rootMargin="320px 0px"
      />

      <DeferredSection
        component={OfflineCentres}
        fallbackClassName="min-h-[820px]"
      />

      <DeferredSection
        component={OurToppers}
        fallbackClassName="min-h-[600px]"
      />

      <DeferredSection
        component={FreeCourses}
        fallbackClassName="min-h-[900px]"
      />

      <DeferredSection
        component={BuyBooks}
        fallbackClassName="min-h-[600px]"
      />

      <DeferredSection
        component={OurStory}
        fallbackClassName="min-h-[780px]"
      />

      <DeferredSection
        component={AppAndVideos}
        fallbackClassName="min-h-[720px]"
      />
    </MainLayout>
  );
};

export default HomePage;
