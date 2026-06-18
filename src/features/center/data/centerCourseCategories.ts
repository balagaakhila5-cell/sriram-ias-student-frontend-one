import { getCourseBySlug } from '@/features/course/data/courses';

export const ALLOWED_CENTER_CITIES = ['delhi', 'hyderabad', 'pune'] as const;
export type CenterCity = (typeof ALLOWED_CENTER_CITIES)[number];

export const COURSE_CATEGORY_KEYS = [
  'gs-foundation',
  'mentorship',
  'optional-foundation',
  'test-series',
  'csat',
  'enrichment-courses',
] as const;

export type CourseCategoryKey = (typeof COURSE_CATEGORY_KEYS)[number];

export type CenterCourseCategory = {
  key: CourseCategoryKey;
  title: string;
  img: string;
  programSlugs: string[];
};

/** Header / mega-menu tab label → category key */
export const TAB_TO_CATEGORY_KEY: Record<string, CourseCategoryKey> = {
  'GS Foundation': 'gs-foundation',
  Mentorship: 'mentorship',
  'Optional Foundation': 'optional-foundation',
  'Test Series': 'test-series',
  CSAT: 'csat',
  'Enrichment Course': 'enrichment-courses',
  'Enrichment Courses': 'enrichment-courses',
};

export const CITY_NAME_TO_KEY: Record<string, CenterCity> = {
  'New Delhi': 'delhi',
  'NEW DELHI': 'delhi',
  Delhi: 'delhi',
  Hyderabad: 'hyderabad',
  Pune: 'pune',
};

export const CENTER_CATEGORIES_BY_CITY: Record<
  CenterCity,
  CenterCourseCategory[]
> = {
  delhi: [
    {
      key: 'gs-foundation',
      title: 'GS Foundation Course',
      img: 'course-1.png',
      programSlugs: [
        '2-years-gs-foundation',
        '1-year-gs-foundation',
        'ncert-foundation',
      ],
    },
    {
      key: 'mentorship',
      title: 'Mentorship Course',
      img: 'course-2.png',
      programSlugs: ['stride-mentorship-program'],
    },
    {
      key: 'optional-foundation',
      title: 'Optional Foundation',
      img: 'course-3.png',
      programSlugs: [
        'anthropology-optional-foundation',
        'geography-optional-foundation',
        'psir-optional-foundation',
        'sociology-optional-foundation',
      ],
    },
    {
      key: 'test-series',
      title: 'Test Series',
      img: 'course-4.png',
      programSlugs: [
        'prelims-test-series-mentorship',
        'mains-test-series-mentorship',
      ],
    },
    {
      key: 'csat',
      title: 'CSAT',
      img: 'course-4.png',
      programSlugs: ['csat-foundation'],
    },
    {
      key: 'enrichment-courses',
      title: 'Enrichment Course',
      img: 'course-2.png',
      programSlugs: ['interview-guidance-program'],
    },
  ],
  hyderabad: [
    {
      key: 'gs-foundation',
      title: 'GS Foundation Course',
      img: 'course-1.png',
      programSlugs: ['2-years-gs-foundation-hyderabad'],
    },
    {
      key: 'mentorship',
      title: 'Mentorship Course',
      img: 'course-2.png',
      programSlugs: ['mentorship-program'],
    },
    {
      key: 'optional-foundation',
      title: 'Optional Foundation',
      img: 'course-3.png',
      programSlugs: ['psir-optional-foundational', 'geography-optional'],
    },
    {
      key: 'test-series',
      title: 'Test Series',
      img: 'course-4.png',
      programSlugs: ['prelims-test-series-2026'],
    },
    {
      key: 'enrichment-courses',
      title: 'Enrichment Courses',
      img: 'course-2.png',
      programSlugs: [
        'mains-enrichment-2025',
        'psir-value-enrichment-2025',
      ],
    },
  ],
  pune: [
    {
      key: 'gs-foundation',
      title: 'GS Foundation Course',
      img: 'course-1.png',
      programSlugs: ['2-years-gs-foundation-pune'],
    },
    {
      key: 'mentorship',
      title: 'Mentorship Course',
      img: 'course-2.png',
      programSlugs: ['mentorship-program'],
    },
    {
      key: 'optional-foundation',
      title: 'Optional Foundation',
      img: 'course-3.png',
      programSlugs: ['psir-optional-foundational', 'geography-optional'],
    },
    {
      key: 'test-series',
      title: 'Test Series',
      img: 'course-4.png',
      programSlugs: ['prelims-test-series-2026'],
    },
    {
      key: 'enrichment-courses',
      title: 'Enrichment Courses',
      img: 'course-2.png',
      programSlugs: [
        'mains-enrichment-2025',
        'psir-value-enrichment-2025',
      ],
    },
  ],
};

export function cityNameToKey(cityName: string): CenterCity {
  return CITY_NAME_TO_KEY[cityName] ?? 'delhi';
}

export function getHeaderTabsForCity(cityName: string): string[] {
  const cityKey = cityNameToKey(cityName);

  if (cityKey === 'delhi') {
    return [
      'GS Foundation',
      'Mentorship',
      'Optional Foundation',
      'Test Series',
      'CSAT',
      'Enrichment Course',
    ];
  }

  return [
    'GS Foundation',
    'Mentorship',
    'Optional Foundation',
    'Test Series',
    'Enrichment Courses',
  ];
}

export function getCategoryKeyFromTab(tab: string): CourseCategoryKey | undefined {
  return TAB_TO_CATEGORY_KEY[tab];
}

export function isCenterCity(value: string): value is CenterCity {
  return ALLOWED_CENTER_CITIES.includes(value.toLowerCase() as CenterCity);
}

export function isCourseCategoryKey(value: string): value is CourseCategoryKey {
  return COURSE_CATEGORY_KEYS.includes(value as CourseCategoryKey);
}

export function getCenterCategory(
  city: string,
  category: string,
): CenterCourseCategory | undefined {
  const cityKey = city.toLowerCase();
  if (!isCenterCity(cityKey) || !isCourseCategoryKey(category)) {
    return undefined;
  }

  return CENTER_CATEGORIES_BY_CITY[cityKey].find((item) => item.key === category);
}

export function formatCourseTitle(title: string): string {
  return title.replace(/\n/g, ' ').trim();
}

const CITY_TITLE_SUFFIXES: Record<CenterCity, string[]> = {
  delhi: ['NEW DELHI', 'New Delhi', 'Delhi'],
  hyderabad: ['Hyderabad'],
  pune: ['Pune'],
};

function stripCitySuffixFromCourseLabel(label: string, cityKey: CenterCity): string {
  return CITY_TITLE_SUFFIXES[cityKey].reduce((result, cityName) => {
    const escaped = cityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return result.replace(new RegExp(`\\s*-\\s*${escaped}\\s*$`, 'i'), '').trim();
  }, label);
}

export type CenterProgram = {
  slug: string;
  title: string;
  feesOnline?: string;
  startDate?: string;
  mode?: string;
};

export type HeaderCourseLink = {
  label: string;
  slug: string;
  href: string;
};

export function getProgramsForCategory(
  city: string,
  category: string,
): CenterProgram[] {
  const categoryData = getCenterCategory(city, category);
  if (!categoryData) return [];

  return categoryData.programSlugs.flatMap((slug) => {
    const course = getCourseBySlug(slug);
    if (!course) return [];

    return [
      {
        slug,
        title: formatCourseTitle(course.title),
        feesOnline: course.feesOnline,
        startDate: course.startDate,
        mode: course.mode,
      },
    ];
  });
}

export function getHeaderCourseLinks(
  cityName: string,
  tab: string,
): HeaderCourseLink[] {
  const cityKey = cityNameToKey(cityName);
  const categoryKey = getCategoryKeyFromTab(tab);
  if (!categoryKey) return [];

  const category = getCenterCategory(cityKey, categoryKey);
  if (!category) return [];

  return category.programSlugs
    .map((slug) => {
      const course = getCourseBySlug(slug);
      if (!course) return null;

      let label = formatCourseTitle(course.title);
      label = stripCitySuffixFromCourseLabel(label, cityKey);

      return {
        label,
        slug,
        href: `/course/${slug}`,
      };
    })
    .filter((item): item is HeaderCourseLink => item !== null);
}

export function getCenterCategoryHref(city: string, category: CourseCategoryKey): string {
  return `/centers/${city.toLowerCase()}/courses/${category}`;
}

export function formatCityLabel(city: string): string {
  const key = city.toLowerCase();
  if (key === 'delhi') return 'NEW DELHI';
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function formatCenterDisplayName(city: string): string {
  const key = city.toLowerCase();
  if (key === 'delhi') return 'NEW DELHI';
  return key.toUpperCase();
}

export function getEnquiryCenterName(city: string): string {
  const key = city.toLowerCase();
  if (key === 'delhi') return 'New Delhi';
  return key.charAt(0).toUpperCase() + key.slice(1);
}
