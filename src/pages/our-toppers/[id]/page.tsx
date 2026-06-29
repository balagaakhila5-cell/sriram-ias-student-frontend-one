"use client";

import { useParams } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import NotFoundPage from "@/components/common/NotFound";
import ErrorState from "@/features/currentAffairs/components/ErrorState";
import TopperDetailContent from "@/features/ourToppers/components/TopperDetailContent";
import TopperDetailSkeleton from "@/features/ourToppers/components/TopperDetailSkeleton";
import { useTopper } from "@/features/ourToppers/hooks/useTopper";
import { getTopperDetailErrorMessage } from "@/features/ourToppers/utils/ourToppersErrors";

export default function OurTopperDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const topperId = decodeURIComponent(id);

  const { data, isLoading, isError, error, refetch } = useTopper(topperId);

  if (!topperId.trim()) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]">
        <Header variant="light" />
        <TopperDetailSkeleton />
        <Footer />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]">
        <Header variant="light" />
        <div className="px-4 py-10">
          <div className="mx-auto max-w-[980px]">
            <ErrorState
              message={getTopperDetailErrorMessage(error)}
              onRetry={() => refetch()}
            />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!data?.topper) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]">
        <Header variant="light" />
        <div className="px-4 py-16">
          <div className="mx-auto max-w-[980px] text-center">
            <p className="text-[18px] font-semibold text-[#374151]">
              {data?.message?.trim() || "Topper details not found."}
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]">
      <Header variant="light" />
      <TopperDetailContent topper={data.topper} />
      <Footer />
    </main>
  );
}
