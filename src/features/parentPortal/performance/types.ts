export type PerformanceResultView = "prelims" | "mains" | "mentorReview";

export type PerformanceListTab =
  | "test-series-prelims"
  | "answer-writing-mains"
  | "mentors-review";

export const PERFORMANCE_TAB_TO_VIEW: Record<
  PerformanceListTab,
  PerformanceResultView
> = {
  "test-series-prelims": "prelims",
  "answer-writing-mains": "mains",
  "mentors-review": "mentorReview",
};

const VALID_VIEWS = new Set<PerformanceResultView>([
  "prelims",
  "mains",
  "mentorReview",
]);

export function resolvePerformanceView(
  testId: string,
  viewParam?: string | null,
): PerformanceResultView {
  if (viewParam && VALID_VIEWS.has(viewParam as PerformanceResultView)) {
    return viewParam as PerformanceResultView;
  }

  if (testId.startsWith("mains-")) return "mains";
  if (testId.startsWith("mentor-")) return "mentorReview";
  return "prelims";
}
