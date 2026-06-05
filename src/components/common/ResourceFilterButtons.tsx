"use client";

interface PremiumSearchButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  /** Figma NCERT — solid navy pill */
  variant?: "gradient" | "solid";
}

export function PremiumSearchButton({
  onClick,
  disabled = false,
  label = "Search",
  className = "",
  variant = "gradient",
}: PremiumSearchButtonProps) {
  const buttonClass =
    variant === "solid"
      ? "min-w-[160px] rounded-full bg-[#004D71] px-16 py-3.5 text-[17px] font-bold text-white shadow-[0_6px_18px_rgba(0,77,113,0.25)] transition-all duration-300 ease-in-out hover:bg-[#003a57] hover:shadow-[0_8px_22px_rgba(0,77,113,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
      : "rounded-full bg-[linear-gradient(90deg,#167fbd_0%,#03283b_100%)] px-14 py-3 text-[18px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className={`flex justify-center ${className}`}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={buttonClass}
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
