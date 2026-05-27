const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export const getCenters = async () => {
  const res = await fetch(`${API_BASE_URL}/api/centers`);
  if (!res.ok) throw new Error("Failed to fetch centers");
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const getCourses = async () => {
  const res = await fetch(`${API_BASE_URL}/api/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
};

export const getFilteredCourses = async (
  centerName: string,
  categoryName: string
) => {
  const params = new URLSearchParams({
    centerName,
    categoryName,
  });

  const res = await fetch(`${API_BASE_URL}/api/courses?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch filtered courses");
  return res.json();
};