'use client';

import { useCallback, useEffect, useState } from 'react';
import type { BlogCategory } from '@/features/blogs/types/blogCategory';

export function useSelectedBlogCategory(categories: BlogCategory[] = []) {
  const [selectedCategory, setSelectedCategoryState] = useState<BlogCategory | null>(
    null,
  );

  useEffect(() => {
    if (categories.length === 0) {
      setSelectedCategoryState(null);
      return;
    }

    setSelectedCategoryState((current) => {
      if (current && categories.some((category) => category.value === current.value)) {
        return current;
      }
      return categories[0];
    });
  }, [categories]);

  const setSelectedCategory = useCallback((category: BlogCategory) => {
    setSelectedCategoryState(category);
  }, []);

  return {
    selectedCategory,
    selectedCategoryValue: selectedCategory?.value ?? null,
    setSelectedCategory,
  };
}
