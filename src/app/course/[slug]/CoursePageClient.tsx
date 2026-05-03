'use client';

import React, { Suspense, lazy, useMemo } from 'react';
import MainLayout from '@/components/common/MainLayout';
import NotFoundPage from '@/components/common/NotFound';
import { getCourseBySlug } from '@/features/course/data/courses';
import { useCourse, useCourses } from '@/features/course/hooks/useCourses';
import { findApiIdForSlug, mergeCourseDetail } from '@/features/course/adapters/courseAdapter';
import CourseHero from '@/features/course/components/sections/CourseHero';
import CourseInfoBar from '@/features/course/components/sections/CourseInfoBar';
import CourseDescription from '@/features/course/components/sections/CourseDescription';

const CourseDetails = lazy(() => import('@/features/course/components/sections/CourseDetails'));
const WhyChoose = lazy(() => import('@/features/course/components/sections/WhyChoose'));
const HowWillHelp = lazy(() => import('@/features/course/components/sections/HowWillHelp'));
const JoinCTA = lazy(() => import('@/features/course/components/sections/JoinCTA'));

const sectionFallback = <div className="min-h-[300px]" aria-hidden="true" />;

interface CoursePageClientProps {
  slug: string;
}

const CoursePageClient: React.FC<CoursePageClientProps> = ({ slug }) => {
  const staticCourse = getCourseBySlug(slug);
  const { data: apiCourses } = useCourses();
  const apiId = useMemo(() => findApiIdForSlug(slug, apiCourses), [slug, apiCourses]);
  const { data: apiDetail } = useCourse(apiId);

  const course = useMemo(
    () => mergeCourseDetail(apiDetail, slug) ?? staticCourse,
    [apiDetail, slug, staticCourse],
  );

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <MainLayout>
      <CourseHero course={course} />
      <CourseInfoBar course={course} />
      <CourseDescription course={course} />

      <Suspense fallback={sectionFallback}>
        <CourseDetails course={course} />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <WhyChoose course={course} />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <HowWillHelp course={course} />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <JoinCTA course={course} />
      </Suspense>
    </MainLayout>
  );
};

export default CoursePageClient;
