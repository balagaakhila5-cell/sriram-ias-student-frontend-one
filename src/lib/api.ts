const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://new-sriramias.onrender.com";

export const getCenters = async () => {

  try {

    const res = await fetch(
      `${API_BASE_URL}/api/centers`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to fetch centers"
      );
    }

    return res.json();

  } catch (error) {

    console.error("Centers API Error:", error);

    return {
      centers: [],
    };
  }
};

export const getCategories = async () => {

  try {

    const res = await fetch(
      `${API_BASE_URL}/api/categories`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to fetch categories"
      );
    }

    return res.json();

  } catch (error) {

    console.error("Categories API Error:", error);

    return [];
  }
};

export const getCourses = async () => {

  try {

    const res = await fetch(
      `${API_BASE_URL}/api/courses`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to fetch courses"
      );
    }

    return res.json();

  } catch (error) {

    console.error("Courses API Error:", error);

    return [];
  }
};

export const getFilteredCourses = async (
  centerName: string,
  categoryName: string
) => {

  try {

    const params = new URLSearchParams({
      centerName,
      categoryName,
    });

    const res = await fetch(
      `${API_BASE_URL}/api/courses?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to fetch filtered courses"
      );
    }

    return res.json();

  } catch (error) {

    console.error(
      "Filtered Courses API Error:",
      error
    );

    return [];
  }
};