import DetailPageShell from "@/features/studentPortal/components/DetailPageShell";

export default function TestSeriesDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DetailPageShell>{children}</DetailPageShell>;
}
