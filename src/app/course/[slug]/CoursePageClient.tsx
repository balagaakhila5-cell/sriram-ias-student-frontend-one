'use client';

import React, { Suspense, lazy, useMemo } from 'react';
import MainLayout from '@/components/common/MainLayout';
import NotFoundPage from '@/components/common/NotFound';
import { getCourseBySlug } from '@/features/course/data/courses';
import { useCourse, useCourses } from '@/features/course/hooks/useCourses';
import {
  findApiIdForSlug,
  mergeCourseDetail,
} from '@/features/course/adapters/courseAdapter';
import CourseHero from '@/features/course/components/sections/CourseHero';
import CourseInfoBar from '@/features/course/components/sections/CourseInfoBar';
import CourseDescription from '@/features/course/components/sections/CourseDescription';

const CourseDetails = lazy(() =>
  import('@/features/course/components/sections/CourseDetails'),
);

const WhyChoose = lazy(() =>
  import('@/features/course/components/sections/WhyChoose'),
);

const HowWillHelp = lazy(() =>
  import('@/features/course/components/sections/HowWillHelp'),
);

const JoinCTA = lazy(() =>
  import('@/features/course/components/sections/JoinCTA'),
);

const sectionFallback = <div className="min-h-[300px]" aria-hidden="true" />;

type CoursePageClientProps = {
  courseSlug: string;
};

const CoursePageClient: React.FC<CoursePageClientProps> = ({ courseSlug }) => {
  const staticCourse = getCourseBySlug(courseSlug);

  const {
    data: apiCourses,
    isLoading: isCoursesLoading,
  } = useCourses();

  const apiId = useMemo(() => {
    return findApiIdForSlug(courseSlug, apiCourses);
  }, [courseSlug, apiCourses]);

  const {
    data: apiDetail,
    isLoading: isDetailLoading,
  } = useCourse(apiId);

  const course = useMemo(() => {
    return mergeCourseDetail(apiDetail, courseSlug) ?? staticCourse;
  }, [apiDetail, courseSlug, staticCourse]);

  if (!course && (isCoursesLoading || isDetailLoading)) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading course...</p>
        </div>
      </MainLayout>
    );
  }

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