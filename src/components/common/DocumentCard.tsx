import Image from "next/image";
import Link from "next/link";

export type DocumentCardButton = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type DocumentCardProps = {
  title: string;
  image?: string;
  buttons: DocumentCardButton[];
  className?: string;
};

export default function DocumentCard({
  title,
  image,
  buttons,
  className = "",
}: DocumentCardProps) {
  return (
    <div
      className={`animate-card group relative flex flex-row items-center gap-5 rounded-[18px] border-l-[4px] border-l-transparent bg-[#FAF8F3] px-6 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:translate-x-4 hover:border-l-[#2a9cda] hover:bg-[#FEF2E5] hover:shadow-[0_18px_42px_rgba(42,156,218,0.18)] ${className}`}
    >
      {image && (
        <div className="relative h-[95px] w-[95px] flex-shrink-0 overflow-hidden rounded-[14px] bg-[#f0ebe3] p-1.5">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-[15px] font-extrabold text-[#111] md:text-[17px]">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {buttons.map((btn) =>
            btn.href ? (
              <Link
                key={btn.label}
                href={btn.href}
                className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-[#58b7ea] bg-white px-5 py-2 text-[14px] font-bold text-[#2a9cda] transition-all duration-300 hover:border-transparent hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white"
              >
                {btn.label}
              </Link>
            ) : (
              <button
                key={btn.label}
                onClick={btn.onClick}
                className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-[#58b7ea] bg-white px-5 py-2 text-[14px] font-bold text-[#2a9cda] transition-all duration-300 hover:border-transparent hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white"
              >
                {btn.label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
