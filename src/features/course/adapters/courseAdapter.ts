import type { CourseDetail, CourseSummary } from "../services/coursesService";
import type { CourseData } from "../types";
import { courses as staticCourses, getCourseBySlug } from "../data/courses";

const formatFee = (fee?: number): string | undefined =>
  typeof fee === "number" ? `${fee.toLocaleString("en-IN")}/-` : undefined;

const firstNonEmpty = <T,>(...values: (T | undefined | null)[]): T | undefined => {
  for (const v of values) {
    if (v === null || v === undefined) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    return v as T;
  }
  return undefined;
};

const normalize = (s: string) =>
  s.toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9 ]/g, "").trim();

export function findStaticMatch(
  apiCourse: Pick<CourseSummary, "title" | "slug">,
): CourseData | undefined {
  if (apiCourse.slug) {
    const bySlug = getCourseBySlug(apiCourse.slug);
    if (bySlug) return bySlug;
  }
  const target = normalize(apiCourse.title ?? "");
  if (!target) return undefined;
  return staticCourses.find((c) => normalize(c.title) === target)
    ?? staticCourses.find((c) => normalize(c.title).includes(target) || target.includes(normalize(c.title)));
}

export function mergeCourseDetail(
  detail: CourseDetail | undefined,
  fallbackSlug: string,
): CourseData | undefined {
  const staticData = getCourseBySlug(fallbackSlug)
    ?? (detail ? findStaticMatch(detail) : undefined);

  if (!detail && !staticData) return undefined;
  if (!detail && staticData) return staticData;
  if (detail && !staticData) {
    return {
      slug: detail.slug ?? fallbackSlug,
      title: detail.title,
      subtitle: detail.description,
      heroImage: detail.banner ?? "/assets/course/course-hero-bg.png",
      startDate: detail.startDate ?? "Admission Open!",
      mode: (detail.modes ?? []).join(" , ") || "Online , Offline",
      duration: detail.duration ?? "Custom",
      feesOnline: formatFee(detail.onlineFees) ?? "—",
      feesOffline: formatFee(detail.offlineFees) ?? "—",
      highlights: detail.keyHighlights?.keyHighlightTexts ?? [],
      whyChooseFeatures: (detail.whyChoose?.whyChooseItems ?? []).map((item) => ({
        icon: "/assets/why-choose/tdesign_course-filled.png",
        label: item.whyChooseText,
        description: item.whyChooseContent,
      })),
      helpPoints: detail.howItHelps?.howItHelpsTexts ?? [],
      helpImages: detail.gallery?.slice(0, 4) ?? [
        "/assets/why-choose/how-will-1.png",
        "/assets/why-choose/how-will-2.png",
        "/assets/why-choose/how-will-3.png",
        "/assets/why-choose/how-will-4.png",
      ],
      personas: [],
      ctaHeading: "Want To Join IAS or IPS ?",
      ctaImage: "/assets/course/cta-img.png",
      ctaBg: "/assets/course/cta-bg-1.png",
      coursedetailsbg: "/assets/course/course-details-bg.png",
    };
  }

  const base = staticData!;
  const d = detail!;

  const mergedWhyChoose =
    d.whyChoose?.whyChooseItems && d.whyChoose.whyChooseItems.length > 0
      ? d.whyChoose.whyChooseItems.map((item, idx) => ({
          icon: base.whyChooseFeatures[idx]?.icon
            ?? "/assets/why-choose/tdesign_course-filled.png",
          label: item.whyChooseText,
          description: item.whyChooseContent,
        }))
      : base.whyChooseFeatures;

  return {
    ...base,
    title: firstNonEmpty(d.title, base.title) ?? base.title,
    subtitle: firstNonEmpty(d.description, base.subtitle),
    heroImage: firstNonEmpty(d.banner, base.heroImage) ?? base.heroImage,
    startDate: firstNonEmpty(d.startDate, base.startDate) ?? base.startDate,
    mode: firstNonEmpty(d.modes?.join(" , "), base.mode) ?? base.mode,
    duration: firstNonEmpty(d.duration, base.duration) ?? base.duration,
    feesOnline: firstNonEmpty(formatFee(d.onlineFees), base.feesOnline) ?? base.feesOnline,
    feesOffline: firstNonEmpty(formatFee(d.offlineFees), base.feesOffline) ?? base.feesOffline,
    highlights: firstNonEmpty(d.keyHighlights?.keyHighlightTexts, base.highlights) ?? base.highlights,
    whyChooseFeatures: mergedWhyChoose,
    helpPoints: firstNonEmpty(d.howItHelps?.howItHelpsTexts, base.helpPoints) ?? base.helpPoints,
    helpImages: firstNonEmpty(d.gallery, base.helpImages) ?? base.helpImages,
  };
}

export function findApiIdForSlug(
  slug: string,
  apiCourses: CourseSummary[] | undefined,
): string | undefined {
  if (!apiCourses?.length) return undefined;
  const bySlug = apiCourses.find((c) => c.slug === slug);
  if (bySlug) return bySlug._id;
  const staticData = getCourseBySlug(slug);
  if (!staticData) return undefined;
  const target = normalize(staticData.title);
  const match = apiCourses.find((c) => normalize(c.title) === target)
    ?? apiCourses.find((c) => {
      const n = normalize(c.title);
      return n.includes(target) || target.includes(n);
    });
  return match?._id;
}
