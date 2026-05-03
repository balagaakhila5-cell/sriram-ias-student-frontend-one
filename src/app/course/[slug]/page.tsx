import CoursePageClient from "./CoursePageClient";

type Params = Promise<{ slug: string }>;

export default async function CourseRoute({ params }: { params: Params }) {
  const { slug } = await params;
  return <CoursePageClient slug={slug} />;
}
