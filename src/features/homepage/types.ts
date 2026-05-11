export interface HomepageSection2 {
  text: string;
}

export interface HomepageTopper {
  _id: string;
  name: string;
  rank: string;
  description?: string;
}

export interface HomepageSection3 {
  title: string;
  subTitle?: string;
  toppers: HomepageTopper[];
}

export interface HomepageLearningCard {
  _id: string;
  title: string;
  description?: string;
  images?: string[];
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HomepageSection4 {
  title: string;
  cards: HomepageLearningCard[];
}

export interface HomepageCenterCard {
  _id: string;
  name: string;
}

export interface HomepageSection5 {
  title: string;
  cards: HomepageCenterCard[];
}

export interface HomepageStat {
  _id: string;
  number: string;
  text: string;
}

export interface HomepageSection6 {
  title: string;
  description?: string;
  subDescription?: string;
  stats: HomepageStat[];
}

export interface HomepageVideo {
  _id: string;
  videoUrl: string;
  videoThumbnail?: string;
}

export interface HomepageSection7 {
  videos: HomepageVideo[];
}

export interface HomepageCourse {
  _id: string;
  title: string;
  bannerImage?: string;
  slug?: string;
}

export interface HomepageCourseCategory {
  name: string;
  courses: HomepageCourse[];
}

export interface HomepageSectionCourses {
  title: string;
  categories: HomepageCourseCategory[];
}

export interface HomepageBook {
  _id: string;
  image?: string;
  title: string;
  discountedPrice?: number;
  summary?: string;
}

export interface HomepageSectionBooks {
  title: string;
  books: HomepageBook[];
}

export interface HomepageData {
  section2?: HomepageSection2;
  section3?: HomepageSection3;
  section4?: HomepageSection4;
  section5?: HomepageSection5;
  section6?: HomepageSection6;
  section7?: HomepageSection7;
  sectionCourses?: HomepageSectionCourses;
  sectionBooks?: HomepageSectionBooks;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface HomepageResponse {
  success: boolean;
  data: HomepageData;
}
