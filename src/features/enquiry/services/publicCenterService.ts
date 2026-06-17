import {
  listCourseCenters,
  type PublicCourseCenter,
} from "@/lib/allApi";

export type { PublicCourseCenter };

export const publicCenterService = {
  listCourseCenters,
};
