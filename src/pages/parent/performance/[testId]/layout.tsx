import DetailPageShell from "@/features/studentPortal/components/DetailPageShell";

export default function PerformanceDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DetailPageShell>{children}</DetailPageShell>;
}
