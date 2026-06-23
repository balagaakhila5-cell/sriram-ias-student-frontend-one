"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  studentService,
  type UpdateProfilePayload,
} from "../services/studentService";
import { useAuthStore } from "@/store/authStore";

export const STUDENT_DETAILS_QUERY_KEY = ["student-details"] as const;

export function useStudentDetails(enabled = true) {
  return useQuery({
    queryKey: STUDENT_DETAILS_QUERY_KEY,
    queryFn: () => studentService.getStudentDetails(),
    enabled,
  });
}

export function useUpdateStudentProfile() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      studentService.updateProfile(payload),
    onSuccess: (updatedUser, variables) => {
      if (token && user) {
        setAuth({ ...user, ...updatedUser }, token);
      }
      queryClient.setQueryData(STUDENT_DETAILS_QUERY_KEY, (current) => {
        if (!current || typeof current !== "object") return current;
        const details = current as Awaited<
          ReturnType<typeof studentService.getStudentDetails>
        >;
        return {
          ...details,
          user: { ...details.user, ...updatedUser },
          profile: {
            ...details.profile,
            studentName: variables.name ?? details.profile.studentName,
            email: variables.email ?? details.profile.email,
            mobileNumber: variables.mobile ?? details.profile.mobileNumber,
            parentName: variables.parentName ?? details.profile.parentName,
            parentMobile: variables.parentMobile ?? details.profile.parentMobile,
          },
        };
      });
    },
  });
}
