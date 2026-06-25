export {
  currentAffairsService,
  type CurrentAffairsCategory,
  type MainsCategory,
} from "@/features/currentAffairs/services/currentAffairsService";

import { currentAffairsService } from "@/features/currentAffairs/services/currentAffairsService";

export const getDailyCurrentAffairs = (
  filters?: Parameters<typeof currentAffairsService.getDailyCurrentAffairs>[0],
) => currentAffairsService.getDailyCurrentAffairs(filters);

export const getDailyCurrentAffairById = (id: string) =>
  currentAffairsService.getDailyCurrentAffairById(id);

export const getMonthlyMagazines = (
  filters?: Parameters<typeof currentAffairsService.getMonthlyMagazines>[0],
) => currentAffairsService.getMonthlyMagazines(filters);

export const getMonthlyMagazineById = (id: string) =>
  currentAffairsService.getMonthlyMagazineById(id);

export const getPrelimsQuizzes = (
  filters?: Parameters<typeof currentAffairsService.getPrelimsQuizzes>[0],
) => currentAffairsService.getPrelimsQuizzes(filters);

export const getMainsQuizzes = (
  filters?: Parameters<typeof currentAffairsService.getMainsQuizzes>[0],
) => currentAffairsService.getMainsQuizzes(filters);

export const getInfographics = (
  filters?: Parameters<typeof currentAffairsService.getInfographics>[0],
) => currentAffairsService.getInfographics(filters);

export const getInfographicById = (id: string) =>
  currentAffairsService.getInfographicById(id);

export const getMonthlyRecaps = (
  filters?: Parameters<typeof currentAffairsService.getMonthlyRecaps>[0],
) => currentAffairsService.getMonthlyRecaps(filters);

export const getMonthlyRecapById = (id: string) =>
  currentAffairsService.getMonthlyRecapById(id);
