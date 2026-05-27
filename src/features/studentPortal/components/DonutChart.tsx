interface DonutChartProps {
  /** Percentage 0-100 of the primary (present) segment. */
  percent: number;
  size?: number;
  thickness?: number;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export default function DonutChart({
  percent,
  size = 200,
  thickness = 24,
}: DonutChartProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const outerPadding = 8;
  const radius = size / 2 - outerPadding - thickness / 2;
  const center = size / 2;
  const gap = 22; // degrees of gap on each side between segments

  const greenSpan = Math.max(0, (clamped / 100) * 360 - gap);
  const redSpan = Math.max(0, ((100 - clamped) / 100) * 360 - gap);

  // Green opens to the upper-right so the red sits at the top-right (~2 o'clock).
  const greenStart = 90;
  const greenEnd = greenStart + greenSpan;
  const redStart = greenEnd + gap;
  const redEnd = redStart + redSpan;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={center} cy={center} r={size / 2} fill="#ECF1FB" />
      {greenSpan > 0 && (
        <path
          d={describeArc(center, center, radius, greenStart, greenEnd)}
          stroke="#5BC26C"
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
        />
      )}
      {redSpan > 0 && (
        <path
          d={describeArc(center, center, radius, redStart, redEnd)}
          stroke="#E7868D"
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
        />
      )}
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        fontSize={size * 0.18}
        fontWeight={800}
        fill="#0E5811"
      >
        {clamped}%
      </text>
    </svg>
  );
}
