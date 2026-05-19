import SectionTitle from "./SectionTitle";

interface ComingSoonProps {
  titleFirst: string;
  titleSecond: string;
}

export default function ComingSoon({ titleFirst, titleSecond }: ComingSoonProps) {
  return (
    <div>
      <SectionTitle first={titleFirst} second={titleSecond} />
      <div className="mt-10 flex h-[280px] flex-col items-center justify-center rounded-2xl bg-white text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
        <h3 className="text-[18px] font-semibold text-[#1F2A37]">
          Coming soon
        </h3>
        <p className="mt-2 max-w-[360px] text-[13px] text-[#7A858E]">
          This section is being designed. Once the layout is finalised, the
          content will appear here.
        </p>
      </div>
    </div>
  );
}
