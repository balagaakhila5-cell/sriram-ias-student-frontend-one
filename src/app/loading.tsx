export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8EAF6] border-t-[#004D71]"
          aria-hidden
        />
        <p className="text-[15px] font-medium text-[#555]">Loading...</p>
      </div>
    </div>
  );
}
