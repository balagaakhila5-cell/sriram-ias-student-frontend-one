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
  {
    title: 'Ananya Reddy IAS — Rank 72, UPSC CSE 2021',
    excerpt:
      "Read how Ananya Reddy built a strong GS foundation at SRIRAM's IAS and secured AIR 72 in her second attempt.",
    url: 'https://forumias.com/blog/ananya-reddy-ias-rank-72-testimonial/',
  },
  {
    title: 'Rahul Verma IAS — Rank 118, UPSC CSE 2020',
    excerpt:
      "Read how Rahul Verma improved answer writing with SRIRAM's IAS test series and secured AIR 118.",
    url: 'https://forumias.com/blog/rahul-verma-ias-rank-118-testimonial/',
  },
  {
    title: 'Meera Nair IAS — Rank 94, UPSC CSE 2022',
    excerpt:
      "Read how Meera Nair balanced optional preparation with SRIRAM's IAS mentorship and secured AIR 94.",
    url: 'https://forumias.com/blog/meera-nair-ias-rank-94-testimonial/',
  },
] as const;

export type Testimonial = (typeof TESTIMONIALS)[number];
