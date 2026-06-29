export interface PortalTopperImage {
  url?: string;
  public_id?: string;
}

export interface PortalTopper {
  _id: string;
  studentId: string;
  studentName: string;
  courseOrProgram: string;
  rank: string;
  year: number | null;
  image?: PortalTopperImage | null;
  isTop10: boolean;
  isDisplayed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface OurTopperListResponse {
  toppers: PortalTopper[];
  count: number;
  message: string;
}

export interface OurTopperDetailResponse {
  topper: PortalTopper | null;
  message: string;
}

export interface DisplayTopperCard {
  id: string;
  name: string;
  studentId: string;
  rank: string;
  year: string | number | null;
  course: string;
  img: string;
  isTop10: boolean;
  y: number;
  scale: number;
}
