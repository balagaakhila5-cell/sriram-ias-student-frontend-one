"use client";

import { useCallback } from "react";
import {
  findExploreCenterByCityName,
  flattenProgramCourses,
  getAllProgramNamesForCenter,
  type FlatExploreCourseCard,
} from "../adapters/homepageAdapter";
import { useHomepage } from "./useHomepage";

export function useNavbarCoursesCatalog() {
  const { data: homepage, isLoading, isError } = useHomepage();
  const centers = homepage?.exploreCenters ?? [];

  const getProgramsForCity = useCallback(
    (cityName: string): string[] => {
      const center = findExploreCenterByCityName(centers, cityName);
      return getAllProgramNamesForCenter(center);
    },
    [centers],
  );

  const getCoursesForCityProgram = useCallback(
    (cityName: string, programName: string): FlatExploreCourseCard[] => {
      const center = findExploreCenterByCityName(centers, cityName);
      if (!center) return [];
      return flattenProgramCourses(center, programName);
    },
    [centers],
  );

  return {
    getProgramsForCity,
    getCoursesForCityProgram,
    isLoading,
    isError,
    hasApiData: centers.length > 0,
  };
}
