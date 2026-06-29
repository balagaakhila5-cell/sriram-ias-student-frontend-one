import BookDetailsClient from "./BookDetailsClient";

export default async function BookDetailsRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BookDetailsClient slug={slug} />;
}
