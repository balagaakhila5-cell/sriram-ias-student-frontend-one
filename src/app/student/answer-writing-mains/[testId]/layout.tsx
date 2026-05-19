import DetailPageShell from "@/features/studentPortal/components/DetailPageShell";

export default function MainsAttemptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DetailPageShell>{children}</DetailPageShell>;
}
