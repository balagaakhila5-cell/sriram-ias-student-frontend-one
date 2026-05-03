import CoursePageClient from "./CoursePageClient";

//  Main page component (MUST be default export)
export default function CourseRoute({
  params,
}: {
  params: { slug: string };
}) {
  return <CoursePageClient slug={params.slug} />;
}

//  REQUIRED for static export (Hostinger)
export async function generateStaticParams() {
  return [
    { slug: "course1" },
    { slug: "course2" },
    { slug: "course3" },
  ];
}
