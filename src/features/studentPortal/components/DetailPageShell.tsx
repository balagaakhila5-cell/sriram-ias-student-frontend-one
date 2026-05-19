import Footer from "@/components/common/Footer";
import StudentTopBar from "./StudentTopBar";

export default function DetailPageShell({
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

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-10 lg:px-6 xl:px-10">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}
