import {
  buildCanonicalExploreCategories,
  EXPLORE_COURSE_TAB_NAMES,
} from "@/features/homepage/data/exploreCourseCatalog";

const MOCK_CENTERS = {
  success: true,
  count: 3,
  centers: [
    { _id: "center-delhi", name: "New Delhi" },
    { _id: "center-hyderabad", name: "Hyderabad" },
    { _id: "center-pune", name: "Pune" },
  ],
};

export const getCenters = async () => MOCK_CENTERS;

export const getCategories = async () =>
  EXPLORE_COURSE_TAB_NAMES.map((name, index) => ({
    _id: `category-${index}`,
    name,
  }));

export const getCourses = async () => {
  const categories = buildCanonicalExploreCategories();
  return categories.flatMap((category) =>
    category.courses.map((course) => ({
      _id: course._id,
      title: course.title,
      slug: course.slug,
      category: { name: category.name },
      center: { name: "New Delhi" },
    })),
  );
};

export const getFilteredCourses = async (
  centerName: string,
  categoryName: string,
) => {
  const courses = await getCourses();
  return courses.filter(
    (course) =>
      course.center?.name === centerName &&
      course.category?.name === categoryName,
  );
};
