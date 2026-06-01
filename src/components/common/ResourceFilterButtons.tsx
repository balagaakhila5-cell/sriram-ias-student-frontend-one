"use client";

interface PremiumSearchButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function PremiumSearchButton({
  onClick,
  disabled = false,
  label = "Search",
  className = "",
}: PremiumSearchButtonProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="rounded-full bg-[linear-gradient(90deg,#167fbd_0%,#03283b_100%)] px-14 py-3 text-[18px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {label}
      </button>
    </div>
  );
}

interface PremiumAttemptNowButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function PremiumAttemptNowButton({
  onClick,
  disabled = false,
  className = "",
}: PremiumAttemptNowButtonProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="min-w-[200px] rounded-full bg-[linear-gradient(90deg,#0C4A6E_0%,#032B3F_100%)] px-12 py-3 text-[18px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Attempt Now
      </button>
    </div>
  );
}
