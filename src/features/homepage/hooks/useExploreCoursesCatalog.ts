"use client";

import { useCallback, useMemo } from "react";
import {
  flattenProgramCoursesAcrossCenters,
  getAllProgramNamesFromCenters,
  type FlatExploreCourseCard,
} from "../adapters/homepageAdapter";
import { useHomepage } from "./useHomepage";

export function useExploreCoursesCatalog() {
  const { data: homepage, isLoading, isError } = useHomepage();
  const centers = homepage?.exploreCenters ?? [];

  const programs = useMemo(
    () => getAllProgramNamesFromCenters(centers),
    [centers],
  );

  const getCoursesForProgram = useCallback(
    (programName: string): FlatExploreCourseCard[] =>
      flattenProgramCoursesAcrossCenters(centers, programName),
    [centers],
  );

  return {
    centers,
    programs,
    getCoursesForProgram,
    isLoading,
    isError,
    hasApiData: centers.length > 0,
  };
}
