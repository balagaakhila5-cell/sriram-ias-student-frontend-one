import LiveClassSection from "@/features/studentPortal/components/LiveClassSection";

export default function EmployeeMyClassesPage() {
  return (
    <div className="space-y-8">
      <LiveClassSection
        viewOnly
        upcomingTitle={{ first: "MY UPCOMING CLASSES", second: "TODAY" }}
      />
    </div>
  );
}
