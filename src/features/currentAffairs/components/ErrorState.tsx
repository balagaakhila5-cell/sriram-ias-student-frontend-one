"use client";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "Failed to load. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-[20px] border border-red-200 bg-red-50 px-6 py-10 text-center">
      <p className="text-[16px] font-semibold text-red-700">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-red-600 px-5 py-2 text-[14px] font-bold text-white"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
