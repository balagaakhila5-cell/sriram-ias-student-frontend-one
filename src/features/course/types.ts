export interface CourseFeature {
  icon: string;
  label: string;
  description?: string;
}

export interface CoursePersona {
  image: string;
  label: string;
}

export interface CoursePurchaseMeta {
  courseId: string;
  batchId: string;
  batchBusinessId?: string;
  onlineAmount: number;
  offlineAmount: number;
  discountAmount?: number;
  onlineBulletPoints?: string[];
  offlineBulletPoints?: string[];
}

export interface CourseData {
  slug: string;
  city?: 'delhi' | 'hyderabad' | 'pune';
  purchase?: CoursePurchaseMeta;
  title: string;
  subtitle?: string;
  heroImage: string;
  startDate: string;
  mode: string;
  duration: string;
  feesOnline: string;
  feesOffline: string;
  highlights: string[];
  whyChooseFeatures: CourseFeature[];
  helpPoints: string[];
  helpImages: string[]; // array of 4 images for 2x2 collage
  personas: CoursePersona[];
  ctaHeading: string;
  ctaImage: string;
  ctaBg?: string;
  coursedetailsbg: string;
  brochure?: string;
}
