"use client";

import { useQuery } from "@tanstack/react-query";
import { youtubeVideosService } from "@/features/youtube/services/youtubeVideosService";

export const youtubeVideoKeys = {
  all: ["youtube-videos"] as const,
  active: ["youtube-videos", "active"] as const,
};

export function useActiveYoutubeVideos() {
  return useQuery({
    queryKey: youtubeVideoKeys.active,
    queryFn: () => youtubeVideosService.getActiveVideos(),
    staleTime: 2 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: true,
  });
}
