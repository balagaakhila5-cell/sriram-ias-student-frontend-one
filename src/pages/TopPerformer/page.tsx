import Link from "next/link";

const TopPerformance = () => {
  // Added 'image' and 'points' to match your second screenshot
  const students = [
    { name: "Darshan", points: 1200, rank: 1, image: "/assets/avatar-1.png" },
    { name: "Darshan", points: 1100, rank: 2, image: "/assets/avatar-1.png" },
    { name: "Darshan", points: 1000, rank: 3, image: "/assets/avatar-1.png" },
    { name: "You", points: 900, rank: 10, image: "/assets/avatar-1.png" },
  ];

  return (
    <div className="rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] bg-[url('/dot_background.svg'),url('/dot_background.svg')] bg-[position:top_left,bottom_right] bg-[size:180px_auto] bg-no-repeat overflow-hidden">
      <div className="relative z-10">
        {/* Updated Title */}
        <h2 className="mb-6 text-center text-[30px] font-extrabold leading-none md:text-[34px]">
          <span className="bg-[linear-gradient(90deg,#4D90D2_0%,#B57B95_100%)] bg-clip-text text-transparent">
            Top Performers
          </span>
        </h2>

        {/* New Header Row */}
        <div className="mb-4 flex items-center justify-between rounded-xl bg-[#EEF2FF] px-4 py-3 text-[16px] font-medium text-[#111111]">
          <span className="w-12">Rank</span>
          <span className="flex-1 text-center">Student</span>
          <span className="w-16 text-right">Points</span>
        </div>

        {/* Student List */}
        <div className="space-y-3">
          {students.map((student) => (
            <div 
              key={student.rank} 
              className="flex items-center justify-between rounded-xl bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-50 transition-transform hover:scale-[1.02]"
            >
              {/* Rank */}
              <div className="w-12 text-[18px] font-bold text-[#111111]">
                {student.rank}.
              </div>

              {/* Student Info with Avatar */}
              <div className="flex flex-1 items-center justify-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-100">
                  <img 
                    src={student.image} 
                    alt={student.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-[16px] font-semibold text-[#111111]">
                  {student.name}
                </span>
              </div>

              {/* Points */}
              <div className="w-16 text-right text-[16px] font-bold text-[#111111]">
                {student.points}
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-6 text-center">
          <Link href="/performance" className="text-[14px] font-bold text-[#4D90D2] hover:underline">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopPerformance;