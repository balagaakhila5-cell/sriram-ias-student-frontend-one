import { http } from "@/lib/http";
import { ApiError, type ApiEnvelope } from "@/lib/apiResult";
import type {
  OurTopperDetailResponse,
  OurTopperListResponse,
  PortalTopper,
} from "@/features/ourToppers/types/portalTopper";
import { isPortalTopperDisplayed } from "@/features/ourToppers/utils/portalTopperHelpers";

const TOPPER_NOT_FOUND_MESSAGE = "Topper details not found.";

async function resolveTopperFromPortal(
  id: string,
  signal?: AbortSignal,
): Promise<OurTopperDetailResponse> {
  const { data } = await http.get<ApiEnvelope<PortalTopper[]>>(
    "/our-toppers/portal",
    { signal },
  );

  const topper = (data.data ?? []).find(
    (item) => item._id === id && isPortalTopperDisplayed(item.isDisplayed),
  );

  if (!topper) {
    return {
      topper: null,
      message: TOPPER_NOT_FOUND_MESSAGE,
    };
  }

  return {
    topper,
    message: data.message ?? "Our Toppers fetched successfully",
  };
}

export const toppersPortalService = {
  getDisplayedToppers: async (): Promise<OurTopperListResponse> => {
    const { data } = await http.get<ApiEnvelope<PortalTopper[]>>(
      "/our-toppers/portal",
    );

    const toppers = (data.data ?? []).filter((topper) =>
      isPortalTopperDisplayed(topper.isDisplayed),
    );

    return {
      toppers,
      count: toppers.length,
      message: data.message ?? "Our Toppers fetched successfully",
    };
  },

  getTopperById: async (
    id: string,
    signal?: AbortSignal,
  ): Promise<OurTopperDetailResponse> => {
    const trimmedId = id.trim();

    if (!trimmedId) {
      throw new ApiError("Invalid topper id.", { httpStatus: 400 });
    }

    try {
      const { data } = await http.get<ApiEnvelope<PortalTopper | null>>(
        `/our-toppers/${encodeURIComponent(trimmedId)}`,
        { signal },
      );

      if (!data.success || data.data == null) {
        return {
          topper: null,
          message: data.message?.trim() || TOPPER_NOT_FOUND_MESSAGE,
        };
      }

      if (!isPortalTopperDisplayed(data.data.isDisplayed)) {
        return {
          topper: null,
          message: TOPPER_NOT_FOUND_MESSAGE,
        };
      }

      return {
        topper: data.data,
        message: data.message ?? "Our Toppers fetched successfully",
      };
    } catch (error) {
      if (
        error instanceof ApiError &&
        (error.httpStatus === 401 ||
          error.httpStatus === 403 ||
          error.httpStatus === 404)
      ) {
        return resolveTopperFromPortal(trimmedId, signal);
      }

      throw error;
    }
  },
};
