import LiveSessionRoom from "@/features/studentPortal/components/LiveSessionRoom";

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function StudentSessionPage({ params }: PageProps) {
  const { sessionId } = await params;
  return <LiveSessionRoom sessionId={sessionId} />;
}
