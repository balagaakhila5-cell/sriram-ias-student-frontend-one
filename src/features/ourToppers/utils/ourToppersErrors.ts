import { ApiError } from "@/lib/apiResult";

export function getOurToppersErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.httpStatus === 401) {
      return "Unauthorized. Please sign in again.";
    }
    if (error.httpStatus === 404) {
      return "Toppers could not be found.";
    }
    if (error.httpStatus === 500) {
      return "Server error. Please try again later.";
    }
    if (!error.httpStatus) {
      return "Network error. Please check your connection.";
    }
    return error.message;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Failed to load toppers. Please try again.";
}

export function getTopperDetailErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.httpStatus === 400) {
      return "Invalid request. Please check the topper link and try again.";
    }
    if (error.httpStatus === 401) {
      return "Unauthorized. Please sign in again.";
    }
    if (error.httpStatus === 404) {
      return "Topper not found.";
    }
    if (error.httpStatus === 500) {
      return "Server error. Please try again later.";
    }
    if (!error.httpStatus) {
      return "Network error. Please check your connection.";
    }
    return error.message;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Failed to load topper details. Please try again.";
}
