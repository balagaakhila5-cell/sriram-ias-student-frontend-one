export const TESTIMONIALS = [
  {
    title: 'Shivansh Singh IAS — Rank 164, UPSC CSE 2023',
    excerpt:
      "Read how Shivansh Singh prepared for UPSC CSE 2023 and secured AIR 164 with SRIRAM's IAS.",
    url: 'https://forumias.com/blog/shivansh-singh-ias-rank-164-upsc-cse-2023-testimonial/',
  },
  {
    title: 'Saurabh Kumar Agrawal IAS — Rank 156, UPSC CSE 2015',
    excerpt:
      "Read how Saurabh Kumar Agrawal joined SRIRAM's IAS for GS preparation and secured AIR 156.",
    url: 'https://forumias.com/blog/ias-rank-156-saurabh-kumar-agrawal-3rd-attempt-geography-optional/',
  },
] as const;

export type Testimonial = (typeof TESTIMONIALS)[number];
