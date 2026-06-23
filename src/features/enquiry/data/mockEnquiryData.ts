import { buildCanonicalExploreCategories } from '@/features/homepage/data/exploreCourseCatalog';
import type {
  EnquiryCenter,
  EnquiryCourse,
  PublicCourseCenter,
} from '@/features/enquiry/types';

export const MOCK_PUBLIC_COURSE_CENTERS: PublicCourseCenter[] = [
  {
    _id: 'center-delhi',
    centerName: 'New Delhi',
    city: 'New Delhi',
    centerCode: 'DEL',
  },
  {
    _id: 'center-hyderabad',
    centerName: 'Hyderabad',
    city: 'Hyderabad',
    centerCode: 'HYD',
  },
  {
    _id: 'center-pune',
    centerName: 'Pune',
    city: 'Pune',
    centerCode: 'PUN',
  },
];

const MOCK_ENQUIRY_COURSES: EnquiryCourse[] = buildCanonicalExploreCategories().flatMap(
  (category) =>
    category.courses.map((course) => ({
      _id: course._id,
      title: course.title,
    })),
);

export function listMockEnquiryCenters(): EnquiryCenter[] {
  return MOCK_PUBLIC_COURSE_CENTERS.map((center) => ({
    _id: center._id,
    name: center.centerName,
  }));
}

export function listMockEnquiryCourses(_centerName?: string): EnquiryCourse[] {
  return MOCK_ENQUIRY_COURSES;
}

export function listMockPublicCourseCenters(): PublicCourseCenter[] {
  return MOCK_PUBLIC_COURSE_CENTERS;
}
