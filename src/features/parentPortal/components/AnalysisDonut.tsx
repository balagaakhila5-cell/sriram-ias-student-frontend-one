interface AnalysisDonutProps {
  correct: number;
  incorrect: number;
  blank: number;
  centerLabel: string;
  size?: number;
  thickness?: number;
}

export default function AnalysisDonut({
  correct,
  incorrect,
  blank,
  centerLabel,
  size = 220,
  thickness = 28,
}: AnalysisDonutProps) {
  const total = Math.max(1, correct + incorrect + blank);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const correctLen = (correct / total) * circumference;
  const incorrectLen = (incorrect / total) * circumference;
  const blankLen = (blank / total) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#3FB75A"
        strokeWidth={thickness}
        fill="none"
        strokeDasharray={`${correctLen} ${circumference - correctLen}`}
        strokeDashoffset={0}
        transform={`rotate(-90 ${center} ${center})`}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#E83E4E"
        strokeWidth={thickness}
        fill="none"
        strokeDasharray={`${incorrectLen} ${circumference - incorrectLen}`}
        strokeDashoffset={-correctLen}
        transform={`rotate(-90 ${center} ${center})`}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#F2A03F"
        strokeWidth={thickness}
        fill="none"
        strokeDasharray={`${blankLen} ${circumference - blankLen}`}
        strokeDashoffset={-(correctLen + incorrectLen)}
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        fontSize={size * 0.16}
        fontWeight={700}
        fill="#1F2A37"
      >
        {centerLabel}
      </text>
    </svg>
  );
}
