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

function SegmentLabel({
  cx,
  cy,
  radius,
  midAngle,
  value,
  fill,
}: {
  cx: number;
  cy: number;
  radius: number;
  midAngle: number;
  value: number;
  fill: string;
}) {
  const position = polarToCartesian(cx, cy, radius, midAngle);

  return (
    <text
      x={position.x}
      y={position.y}
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontFamily: "Montserrat, sans-serif" }}
      fontSize={12}
      fontWeight={700}
      fill={fill}
    >
      {value}%
    </text>
  );
}

export default function DonutChart({
  percent,
  size = 200,
  thickness = 24,
}: DonutChartProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const absentPercent = 100 - clamped;
  const outerPadding = 8;
  const radius = size / 2 - outerPadding - thickness / 2;
  const center = size / 2;
  const gap = 22;

  const greenSpan = Math.max(0, (clamped / 100) * 360 - gap);
  const redSpan = Math.max(0, ((100 - clamped) / 100) * 360 - gap);

  const greenStart = 90;
  const greenEnd = greenStart + greenSpan;
  const redStart = greenEnd + gap;
  const redEnd = redStart + redSpan;

  const greenMidAngle = greenStart + greenSpan / 2;
  const redMidAngle = redStart + redSpan / 2;

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
      {greenSpan >= 28 && (
        <SegmentLabel
          cx={center}
          cy={center}
          radius={radius}
          midAngle={greenMidAngle}
          value={clamped}
          fill="#0E5811"
        />
      )}
      {redSpan >= 28 && (
        <SegmentLabel
          cx={center}
          cy={center}
          radius={radius}
          midAngle={redMidAngle}
          value={absentPercent}
          fill="#B42333"
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
