"use client";

import { useCallback, useMemo } from "react";
import {
  findExploreCenterByCityName,
  flattenProgramCourses,
  getAllProgramNamesForCenter,
  type FlatExploreCourseCard,
} from "../adapters/homepageAdapter";
import {
  findProgramNameByCategorySlug,
  getEnquiryCenterName,
  getProgramNameForCategoryKey,
  type CenterCity,
} from "@/features/center/data/centerCourseCategories";
import { useHomepage } from "./useHomepage";

export function useCenterCoursesCatalog(cityKey: CenterCity) {
  const { data: homepage, isLoading, isError } = useHomepage();
  const centers = homepage?.exploreCenters ?? [];
  const cityName = getEnquiryCenterName(cityKey);

  const apiPrograms = useMemo(() => {
    const center = findExploreCenterByCityName(centers, cityName);
    return getAllProgramNamesForCenter(center);
  }, [centers, cityName]);

  const resolveProgramName = useCallback(
    (categorySlug: string): string | undefined =>
      findProgramNameByCategorySlug(apiPrograms, categorySlug) ??
      getProgramNameForCategoryKey(categorySlug),
    [apiPrograms],
  );

  const getCoursesForCategory = useCallback(
    (categorySlug: string): FlatExploreCourseCard[] => {
      const center = findExploreCenterByCityName(centers, cityName);
      if (!center) return [];

      const programName = resolveProgramName(categorySlug);
      if (!programName) return [];

      return flattenProgramCourses(center, programName);
    },
    [centers, cityName, resolveProgramName],
  );

  return {
    apiPrograms,
    resolveProgramName,
    getCoursesForCategory,
    isLoading,
    isError,
    hasApiData: centers.length > 0,
  };
}
