import Footer from "@/components/common/Footer";
import StudentSidebar from "@/features/studentPortal/components/StudentSidebar";
import StudentTopBar from "@/features/studentPortal/components/StudentTopBar";

export default function StudentPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <StudentTopBar />

      <div className="relative flex-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-0 student-portal-bg opacity-20" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-4 py-10 lg:flex-row lg:gap-14 lg:px-6 xl:px-10">
          <aside className="w-full shrink-0 lg:sticky lg:top-[96px] lg:z-30 lg:w-[294px] lg:self-start">
            <StudentSidebar />
          </aside>

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>

      <Footer lightweight />
    </div>
  );
}
