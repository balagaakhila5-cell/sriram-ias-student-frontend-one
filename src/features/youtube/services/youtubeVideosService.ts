import { http } from "@/lib/http";

import { ApiError, type ApiEnvelope, isApiSuccess } from "@/lib/apiResult";

import type { HomepageDetailsApiData } from "@/features/homepage/types";

import type {
  ActiveYoutubeVideosResult,
  YoutubeVideoApiItem,
  YoutubeVideoCard,
} from "@/features/youtube/types/youtubeVideo";

import { getYouTubeVideoId } from "@/lib/youtube";

const PLACEHOLDER_THUMBNAIL = "/assets/youtube_video_image.png";

const PAGE_LIMIT = 100;

const UNRANKED_SORT_VALUE = Number.MAX_SAFE_INTEGER;

type YoutubeListEnvelope = ApiEnvelope<YoutubeVideoApiItem[]> & {
  count?: number;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

function logYoutubeApiResponse(
  source: string,
  videos: Array<{ title?: string; priority?: number; [key: string]: unknown }>,
) {
  console.log(`[Customer Panel] ${source} API response:`, videos);
  console.log(
    `[Customer Panel] ${source} priority fields:`,
    videos.map((video) => ({
      title: video.title,
      priority: video.priority,
      hasPriority: video.priority != null,
    })),
  );
}

function mapApiVideoToCard(video: YoutubeVideoApiItem): YoutubeVideoCard | null {
  if (!video?._id || !video.youtubeUrl) return null;
  if (video.isDeleted) return null;
  if (video.status !== "ACTIVE") return null;

  const youtubeVideoId =
    video.youtubeVideoId ?? getYouTubeVideoId(video.youtubeUrl) ?? undefined;

  return {
    id: video._id,
    title: video.title?.trim() || "YouTube Video",
    description: video.description?.trim() || "",
    thumbnailUrl: video.thumbnailUrl?.trim() || PLACEHOLDER_THUMBNAIL,
    youtubeUrl: video.youtubeUrl,
    youtubeVideoId,
    rank:
      video.rank != null && video.rank >= 1
        ? Number(video.rank)
        : UNRANKED_SORT_VALUE,
    priority: Number.isFinite(Number(video.priority))
      ? Number(video.priority)
      : UNRANKED_SORT_VALUE,
  };
}

function sortVideosByPriority(videos: YoutubeVideoCard[]) {
  return [...videos].sort((a, b) => a.priority - b.priority);
}

async function fetchYoutubeVideosPage(page: number) {
  const { data } = await http.get<YoutubeListEnvelope>("/youtube/videos", {
    params: {
      page,
      limit: PAGE_LIMIT,
      status: "ACTIVE",
      sortBy: "priority",
      sortOrder: "asc",
    },
    timeout: 60_000,
  });

  if (!isApiSuccess(data.statusCode) || data.success !== true) {
    throw new ApiError(data.message || "Something went wrong. Please try again.", {
      statusCode: data.statusCode,
    });
  }

  return data;
}

async function fetchActiveVideosFromHomepage(): Promise<ActiveYoutubeVideosResult> {
  const { data } = await http.post<ApiEnvelope<HomepageDetailsApiData>>(
    "/homepage/details",
    {},
    { timeout: 90_000 },
  );

  if (!isApiSuccess(data.statusCode) || data.success !== true) {
    throw new ApiError(
      data.message || "Unable to fetch homepage YouTube videos. Please try again.",
      { statusCode: data.statusCode },
    );
  }

  const rawVideos = data.data?.youtubeVideos ?? [];
  logYoutubeApiResponse("Homepage YouTube videos", rawVideos);

  const videos = rawVideos
    .map((video, index) =>
      mapApiVideoToCard({
        _id: video._id,
        title: video.title || "",
        description: video.description || "",
        youtubeUrl: video.youtubeUrl,
        youtubeVideoId: video.youtubeVideoId,
        thumbnailUrl: video.thumbnail,
        status: "ACTIVE",
        isDeleted: false,
        priority: video.priority ?? index,
      }),
    )
    .filter((video): video is YoutubeVideoCard => video !== null);

  const sortedVideos = sortVideosByPriority(videos);
  console.log(
    "[Customer Panel] Homepage videos sorted by priority:",
    sortedVideos.map((video) => ({
      title: video.title,
      priority: video.priority,
    })),
  );

  return {
    videos: sortedVideos,
    message: data.message || "YouTube videos fetched successfully",
  };
}

async function fetchAllActiveVideosFromListApi(): Promise<ActiveYoutubeVideosResult> {
  const collected: YoutubeVideoCard[] = [];
  const rawResponses: YoutubeVideoApiItem[] = [];
  let page = 1;
  let hasNextPage = true;
  let message = "YouTube videos fetched successfully";

  while (hasNextPage) {
    const response = await fetchYoutubeVideosPage(page);
    message = response.message || message;

    const pageVideos = response.data ?? [];
    rawResponses.push(...pageVideos);

    const mapped = pageVideos
      .map(mapApiVideoToCard)
      .filter((video): video is YoutubeVideoCard => video !== null);

    collected.push(...mapped);

    hasNextPage = Boolean(response.hasNextPage);
    page += 1;

    if (page > 20) break;
  }

  logYoutubeApiResponse("YouTube videos list", rawResponses);

  const sortedVideos = sortVideosByPriority(collected);
  console.log(
    "[Customer Panel] List API videos sorted by priority:",
    sortedVideos.map((video) => ({
      title: video.title,
      priority: video.priority,
    })),
  );

  return {
    videos: sortedVideos,
    message,
  };
}

export const youtubeVideosService = {
  getActiveVideos: async (): Promise<ActiveYoutubeVideosResult> => {
    try {
      return await fetchAllActiveVideosFromListApi();
    } catch (error) {
      if (
        error instanceof ApiError &&
        (error.httpStatus === 401 || error.httpStatus === 403)
      ) {
        return fetchActiveVideosFromHomepage();
      }

      throw error;
    }
  },
};
