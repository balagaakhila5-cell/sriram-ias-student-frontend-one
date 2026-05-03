'use client';

import React, { lazy } from 'react';
import MainLayout from '@/components/common/MainLayout';
import Hero from '@/components/sections/Hero';
import MottoSection from '@/components/sections/MottoSection';
import ExploreCourses from '@/components/sections/ExploreCourses';
import DeferredSection from '@/components/common/DeferredSection';

const OurToppers = lazy(() => import('@/components/sections/OurToppers')) as React.LazyExoticComponent<React.ComponentType<any>>;
const FreeCourses = lazy(() => import('@/components/sections/FreeCourses')) as React.LazyExoticComponent<React.ComponentType<any>>;
const BuyBooks = lazy(() => import('@/components/sections/BuyBooks')) as React.LazyExoticComponent<React.ComponentType<any>>;
const OfflineCentres = lazy(() => import('@/components/sections/OfflineCentres')) as React.LazyExoticComponent<React.ComponentType<any>>;
const OurStory = lazy(() => import('@/components/sections/OurStory')) as React.LazyExoticComponent<React.ComponentType<any>>;
const AppAndVideos = lazy(() => import('@/components/sections/AppAndVideos')) as React.LazyExoticComponent<React.ComponentType<any>>;

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section - Full Video */}
      <Hero />

      {/* Motto & Text Section */}
      <MottoSection />

      {/* Explore Courses Section */}
      <ExploreCourses />
      
      <DeferredSection
        component={OfflineCentres}
        fallbackClassName="min-h-[820px]"
      />

      {/* Our Toppers Section */}
      <DeferredSection
        component={OurToppers}
        fallbackClassName="min-h-[600px]"
      />

      {/* Access Free Courses Sections */}
      <DeferredSection
        component={FreeCourses}
        fallbackClassName="min-h-[900px]"
      />

      {/* Buy Our Books Section */}
      <DeferredSection
        component={BuyBooks}
        fallbackClassName="min-h-[600px]"
      />

      {/* Our Story Section */}
      <DeferredSection
        component={OurStory}
        fallbackClassName="min-h-[780px]"
      />

      {/* Download App & YouTube Videos Section */}
      <DeferredSection
        component={AppAndVideos}
        fallbackClassName=""
      />

    </MainLayout>
  );
};

export default HomePage;
