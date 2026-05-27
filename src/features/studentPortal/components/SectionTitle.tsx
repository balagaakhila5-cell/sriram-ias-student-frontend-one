interface SectionTitleProps {
  /** First word of the heading. */
  first: string;
  /** Second word of the heading. */
  second: string;
  className?: string;
}

export default function SectionTitle({
  first,
  second,
  className = "",
}: SectionTitleProps) {
  return (
    <h2 className={`student-portal-heading ${className}`}>
      {first} {second}
    </h2>
  );
}
