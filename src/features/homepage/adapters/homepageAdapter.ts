import type {
  HomepageData,
  HomepageDetailsApiData,
  HomepageExploreCenter,
  HomepageExploreCourseItem,
  HomepageExploreProgram,
} from '../types';

export interface FlatExploreCourseCard extends HomepageExploreCourseItem {
  programName: string;
  centerId: string;
}

const normalizeCenterLabel = (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) return trimmed;
  const lower = trimmed.toLowerCase();
  if (lower === 'new delhi') return 'New Delhi';
  if (lower === 'hyderabad') return 'Hyderabad';
  if (lower === 'pune') return 'Pune';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

export function programHasCourses(program: HomepageExploreProgram): boolean {
  return program.examCategories.some((category) =>
    category.subCategories.some((sub) => (sub.courses?.length ?? 0) > 0),
  );
}

export function flattenProgramCourses(
  center: HomepageExploreCenter,
  programName: string,
): FlatExploreCourseCard[] {
  const target = normalizeProgramKey(programName);
  const program = center.programs.find(
    (item) => normalizeProgramKey(item.programName) === target,
  );
  if (!program) return [];

  const cards: FlatExploreCourseCard[] = [];

  for (const category of program.examCategories) {
    for (const sub of category.subCategories) {
      for (const course of sub.courses ?? []) {
        if (!course.slug && !course.courseName) continue;
        cards.push({
          ...course,
          programName: program.programName,
          centerId: center.centerId,
          centerName: normalizeCenterLabel(course.centerName || center.centerName),
        });
      }
    }
  }

  return cards;
}

function normalizeCenterKey(name: string) {
  const lower = name.trim().toLowerCase();
  if (lower === 'new delhi' || lower === 'delhi') return 'new delhi';
  if (lower === 'hyderabad') return 'hyderabad';
  if (lower === 'pune') return 'pune';
  return lower;
}

export function findExploreCenterByCityName(
  centers: HomepageExploreCenter[],
  cityName: string,
): HomepageExploreCenter | undefined {
  const key = normalizeCenterKey(cityName);
  return centers.find((center) => normalizeCenterKey(center.centerName) === key);
}

/** All program names for a single center (includes programs with no courses). */
export function getAllProgramNamesForCenter(
  center: HomepageExploreCenter | undefined,
): string[] {
  if (!center) return [];

  return sortProgramNames(
    (center.programs ?? [])
      .map((program) => program.programName?.trim())
      .filter((name): name is string => Boolean(name)),
  );
}

export function getProgramsWithCourses(center: HomepageExploreCenter): string[] {
  return center.programs.filter(programHasCourses).map((p) => p.programName);
}

const PREFERRED_PROGRAM_ORDER = [
  'GS Foundation',
  'Mentorship',
  'Optional Foundation',
  'Test Series',
  'CSAT',
  'Enrichment Course',
  'Enrichment Courses',
] as const;

function normalizeProgramKey(name: string) {
  return name.trim().toLowerCase();
}

export function sortProgramNames(programNames: string[]): string[] {
  const unique = Array.from(
    new Map(
      programNames
        .map((name) => name.trim())
        .filter(Boolean)
        .map((name) => [normalizeProgramKey(name), name] as const),
    ).values(),
  );

  const preferred = new Set(
    PREFERRED_PROGRAM_ORDER.map((name) => normalizeProgramKey(name)),
  );

  const ordered = PREFERRED_PROGRAM_ORDER.map((preferredName) =>
    unique.find((name) => normalizeProgramKey(name) === normalizeProgramKey(preferredName)),
  ).filter((name): name is string => Boolean(name));

  const remaining = unique
    .filter((name) => !preferred.has(normalizeProgramKey(name)))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  return [...ordered, ...remaining];
}

/** All program names across every center (includes programs with no courses). */
export function getAllProgramNamesFromCenters(
  centers: HomepageExploreCenter[],
): string[] {
  const names: string[] = [];

  for (const center of centers) {
    for (const program of center.programs ?? []) {
      if (program.programName?.trim()) {
        names.push(program.programName.trim());
      }
    }
  }

  return sortProgramNames(names);
}

/** Courses for a program aggregated from all centers (no city filter). */
export function flattenProgramCoursesAcrossCenters(
  centers: HomepageExploreCenter[],
  programName: string,
): FlatExploreCourseCard[] {
  const target = normalizeProgramKey(programName);
  const cards: FlatExploreCourseCard[] = [];
  const seen = new Set<string>();

  for (const center of centers) {
    const program = center.programs.find(
      (item) => normalizeProgramKey(item.programName) === target,
    );
    if (!program) continue;

    for (const category of program.examCategories) {
      for (const sub of category.subCategories) {
        for (const course of sub.courses ?? []) {
          if (!course.slug && !course.courseName) continue;

          const key = `${course.batchId}:${course.slug}`;
          if (seen.has(key)) continue;
          seen.add(key);

          cards.push({
            ...course,
            programName: program.programName,
            centerId: center.centerId,
            centerName: normalizeCenterLabel(course.centerName || center.centerName),
          });
        }
      }
    }
  }

  return cards;
}

export function mapHomepageDetailsResponse(
  api: HomepageDetailsApiData,
): HomepageData {
  return {
    exploreCenters: api.courses ?? [],
    section3: {
      title: "Our Toppers'",
      subTitle:
        'Driven by a commitment to success, we stand behind our toppers with constant support, expert mentorship, and personalized attention.',
      toppers: (api.toppers ?? []).map((topper) => ({
        _id: topper._id,
        name: topper.name,
        rank: topper.rank,
        year: topper.year ?? undefined,
        courseName: topper.courseName,
        description: topper.courseName,
        image: topper.image,
      })),
    },
    section4: {
      title: 'ACCESS FREE LEARNING RESOURCES',
      cards: (api.freeLearning ?? []).map((item, index) => ({
        _id: item._id,
        title: item.title,
        description: item.description,
        images: item.images,
        order: index,
      })),
    },
    sectionBooks: {
      title: 'BUY BOOKS',
      books: (api.books ?? []).map((book) => ({
        _id: book.productId,
        title: book.productName,
        image: book.thumbnail || '/assets/books.png',
        discountedPrice: book.price,
        summary: 'Explore this book to level up your preparation.',
      })),
    },
    section7: {
      videos: (api.youtubeVideos ?? []).map((video) => ({
        _id: video._id,
        videoUrl: video.youtubeUrl,
        videoThumbnail: video.thumbnail,
        title: video.title,
      })),
    },
  };
}

export { normalizeCenterLabel };
