import DetailPageShell from "@/features/studentPortal/components/DetailPageShell";

export default function CourseDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DetailPageShell>{children}</DetailPageShell>;
}
