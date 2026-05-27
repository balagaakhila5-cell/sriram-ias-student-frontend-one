import { CalendarX } from "lucide-react";
import Image from "next/image";

export default function EmptyLiveClass() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
      <div
        className="mb-6 flex h-[200px] w-[200px] items-center justify-center rounded-full"
        style={{
          background:
            "radial-gradient(circle, #F1F7FB 0%, #FFFFFF 80%)",
        }}
      >
        <Image
          src={"/assets/student/No Session.png"}
          alt="No Session"
          width={200}
          height={200}
        />
      </div>

      <h3 className="text-[20px] font-semibold text-[#000000]">
        No Session available for the Selected date
      </h3>
      <p className="mt-2 max-w-[300px] text-[16px] leading-relaxed text-[#000000]/60 font-medium">
        Select a different date in the calender to see the sessions for that day
      </p>
    </div>
  );
}
