interface HorizontalStatCardProps {
  label: string;
  value: string | number;
  bg: string;
  valueColor: string;
  size?: "lg" | "sm";
}

export default function HorizontalStatCard({
  label,
  value,
  bg,
  valueColor,
  size = "lg",
}: HorizontalStatCardProps) {
  const isLarge = size === "lg";
  return (
    <div
      className={`flex items-center justify-between rounded-[14px] ${
        isLarge ? "px-6 py-5" : "px-5 py-3"
      }`}
      style={{ background: bg }}
    >
      <span
        className={`font-medium text-[#000000] ${
          isLarge ? "text-[16px]" : "text-[14px]"
        }`}
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {label}
      </span>
      <span
        className={`font-bold ${
          isLarge ? "text-[24px]" : "text-[20px]"
        }`}
        style={{ fontFamily: "Montserrat, sans-serif", color: valueColor }}
      >
        {value}
      </span>
    </div>
  );
}
