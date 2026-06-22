import { FREE_LEARNING_EXPLORE_HREFS } from "@/features/homepage/utils/homepageLinks";

export type FooterLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const FOOTER_COPYRIGHT = {
  brandName: "SRIRAM'S",
} as const;

export function getFooterCopyrightText() {
  return `Copyright © ${FOOTER_COPYRIGHT.brandName}. All Rights Reserved.`;
}

export const FOOTER_SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/sriramsias/",
  facebook: "https://www.facebook.com/sriramsias.official/",
  twitter: "https://twitter.com/sriramsrirangm",
  youtube: "https://www.youtube.com/channel/UCbiWt_Ckrd4dqESbsXGBX6Q",
} as const;

export const FOOTER_WEBSITE_LINKS_PRIMARY: FooterLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Director's Messages", href: "/founders-message" },
  { label: "Why Choose Us", href: "/about" },
  { label: "Contact Us", href: "/centers/delhi" },
  { label: "Our Branches", href: "/centers/delhi" },
  { label: "Referral Policy", href: "/about" },
  { label: "UPSC Articles", href: "/blogs" },
];

export const FOOTER_WEBSITE_LINKS_SECONDARY: FooterLinkItem[] = [
  { label: "UPSC Articles", href: "/blogs" },
  { label: "UPSC Blogs", href: "/blogs" },
  { label: "Exploration", href: "/free_resources" },
  { label: "Daily Quizzes", href: FREE_LEARNING_EXPLORE_HREFS.dailyQuiz },
  { label: "FAQ'S", href: "/about" },
  {
    label: "Career",
    href: "mailto:sriramsias@gmail.com?subject=Career%20Enquiry",
    external: true,
  },
  { label: "Student Login", href: "/login" },
  { label: "Enroll Now", href: "/signup" },
];

export const FOOTER_COURSE_LINKS: FooterLinkItem[] = [
  { label: "All Courses", href: "/centers/delhi" },
  {
    label: "PSIR Test Series and Mentorship",
    href: "/course/prelims-test-series-mentorship",
  },
  { label: "PSIR Optional Courses", href: "/course/psir-optional-foundation" },
  {
    label: "Geography Optional Foundation Courses",
    href: "/course/geography-optional-foundation",
  },
  {
    label: "Mains Enrichment Program 2025",
    href: "/course/mains-enrichment-2025",
  },
  {
    label: "Mains Test Series CSE 2025",
    href: "/course/mains-test-series-mentorship",
  },
  {
    label: "Essay Test Series 2025",
    href: "/course/mains-enrichment-2025",
  },
  {
    label: "Mains Test Series CSE 2025",
    href: "/course/mains-test-series-mentorship",
  },
];

export const FOOTER_BRANCHES = [
  {
    city: "NEW DELHI",
    href: "/centers/delhi",
    image: "/assets/del-footer.png",
    alt: "Delhi",
    address:
      "SRIRAM'S IAS TOWER,10 B, Pusa Road, Bada Bazar Rd, Near Metro Pillar No. 112, Old Rajinder Nagar, New Delhi - 110060",
    phone: "9811489560",
    email: "sriramsias@gmail.com",
  },
  {
    city: "HYDERABAD",
    href: "/centers/hyderabad",
    image: "/assets/hyd-footer.png",
    alt: "Hyderabad",
    address:
      "SRIRAM'S IAS, Opposite Sudharshan Theatre, Pillar No 40, Ashoka Nagar, Hyderabad, 500020",
    phone: "8121191985",
    email: "hyderabad@sriramsias.com",
  },
  {
    city: "PUNE",
    href: "/centers/pune",
    image: "/assets/pune-footer.png",
    alt: "Pune",
    address:
      "SRIRAM'S IAS, 385, Near Modi Ganpati Mandir, Patrya Maruti Chowk Narayan Peth, Pune 411030",
    phone: "9689000979",
    email: "pune@sriramsias.com",
  },
] as const;
