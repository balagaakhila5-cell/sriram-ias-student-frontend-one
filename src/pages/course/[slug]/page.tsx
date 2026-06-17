import CoursePageClient from './CoursePageClient';
import { courses } from '@/features/course/data/courses';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseRoute({ params }: PageProps) {
  const { slug } = await params;

  return <CoursePageClient courseSlug={slug} />;
}

// REQUIRED for static export / Hostinger
export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}