import { ClipboardCheck } from "lucide-react";

interface MentorReviewCardProps {
  paragraphs: string[];
}

export default function MentorReviewCard({
  paragraphs,
}: MentorReviewCardProps) {
  return (
    <section className="rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="mb-6 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E2EEF7] text-[#1F7AB8]">
          <ClipboardCheck size={16} />
        </span>
        <h2
          className="text-[18px] font-bold text-[#0F2030]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Mentor Review
        </h2>
      </div>

      <div
        className="rounded-[14px] bg-[#EBF0FF] px-8 py-7 text-[17px] leading-[1.7] text-[#1F2A37] font-semibold"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {paragraphs.map((text, i) => (
          <p key={i} className={i > 0 ? "mt-4" : ""}>
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
