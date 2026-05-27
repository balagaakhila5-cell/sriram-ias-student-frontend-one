import Image from "next/image";
import { Download, Upload } from "lucide-react";

interface SubmissionCardProps {
  title: string;
}

export default function SubmissionCard({ title }: SubmissionCardProps) {
  return (
    <div
      className="flex items-start gap-5 rounded-[18px] bg-white p-5"
      style={{
        border: "1px solid #0000001A",
        boxShadow: "0px 4px 32px 0px #0000000D",
      }}
    >
      <div className="flex h-[110px] w-[120px] shrink-0 items-center justify-center rounded-[14px] bg-[#E5EEF8]">
        <Image
          src="/assets/student/Recording.png"
          alt="Test"
          width={70}
          height={70}
          className="object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3">
        <h3
          className="text-[18px] font-bold leading-tight text-[#0F2030]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </h3>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-1.5 text-[14px] font-semibold text-[#2A9FDB]"
            style={{ border: "1px solid #0000001A", fontFamily: "Montserrat, sans-serif" }}
          >
            Download
            <Download size={14} />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-1.5 text-[14px] font-semibold text-[#2A9FDB]"
            style={{ border: "1px solid #0000001A", fontFamily: "Montserrat, sans-serif" }}
          >
            Upload
            <Upload size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
