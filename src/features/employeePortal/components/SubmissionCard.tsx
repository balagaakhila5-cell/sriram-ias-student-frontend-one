"use client";

import { useRef } from "react";
import Image from "@/components/common/AppImage";
import { Download, Upload } from "lucide-react";

interface SubmissionCardProps {
  title: string;
  subtitle: string;
  downloadUrl: string;
  downloadName: string;
  uploadedFileName?: string;
  onUpload: (file: File) => void;
}

export default function SubmissionCard({
  title,
  subtitle,
  downloadUrl,
  downloadName,
  uploadedFileName,
  onUpload,
}: SubmissionCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = downloadName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    event.target.value = "";
  };

  return (
    <article
      className="flex items-center gap-4 rounded-[18px] bg-white p-4 transition-all duration-300 hover:translate-x-2 hover:bg-[#FFF1F1] hover:shadow-[0_8px_24px_rgba(225,97,101,0.12)]"
      style={{
        border: "1px solid #0000001A",
        boxShadow: "0px 4px 32px 0px #0000000D",
      }}
    >
      <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[12px] bg-[#E5EEF8]">
        <Image
          src="/assets/student/test-img.png"
          alt="Test"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <h3
            className="text-[16px] font-bold leading-tight text-[#0F2030]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {title}
          </h3>
          <p
            className="mt-0.5 text-[14px] font-medium text-[#0F2030]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {subtitle}
          </p>
          {uploadedFileName ? (
            <p
              className="mt-1 truncate text-[12px] font-semibold text-[#2A9FDB]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              title={uploadedFileName}
            >
              Uploaded: {uploadedFileName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-[10px] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#2A9FDB] transition-colors hover:bg-[#F2F8FC]"
            style={{ border: "1px solid #0000001A", fontFamily: "Montserrat, sans-serif" }}
          >
            Download
            <Download size={14} />
          </button>
          <button
            type="button"
            onClick={handleUploadClick}
            className="flex items-center gap-2 rounded-[10px] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#2A9FDB] transition-colors hover:bg-[#F2F8FC]"
            style={{ border: "1px solid #0000001A", fontFamily: "Montserrat, sans-serif" }}
          >
            {uploadedFileName ? "Re-upload" : "Upload"}
            <Upload size={14} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </article>
  );
}
