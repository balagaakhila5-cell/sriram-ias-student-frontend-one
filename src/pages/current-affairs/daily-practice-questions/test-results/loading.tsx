import HeaderLogoOnly from "@/components/common/HeaderLogoOnly";
import DpqTestResultsSkeleton from "@/components/current-affairs/DpqTestResultsSkeleton";

export default function DpqTestResultsLoading() {
  return (
    <>
      <HeaderLogoOnly />
      <main className="min-h-screen bg-[#F8F9FB] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[980px]">
          <div className="mb-8 h-5 w-[280px] animate-pulse rounded-full bg-[#EDEEF2]" />
          <div className="mb-8 mx-auto h-10 w-[240px] animate-pulse rounded-full bg-[#EDEEF2]" />
          <div className="overflow-hidden rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] md:px-8 md:py-8">
            <DpqTestResultsSkeleton />
          </div>
        </div>
      </main>
    </>
  );
}
