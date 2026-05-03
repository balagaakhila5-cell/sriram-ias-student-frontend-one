import Link from "next/link";
import React from "react";

type Resource = {
  title: string;
  icon: string;
  color: string;
  bg: string;
  link: string;
};

const resources: Resource[] = [
  {
    title: "NCERT Books",
    icon: "📚",
    color: "text-green-600",
    bg: "bg-green-100",
    link: "/free_resources/ncert-books",
  },
  {
    title: "Previous Year Question Papers",
    icon: "📄",
    color: "text-red-500",
    bg: "bg-red-100",
    link: "/free_resources/previous-year",
  },
  {
    title: "Free Mock Tests",
    icon: "📝",
    color: "text-green-600",
    bg: "bg-green-100",
    link: "/free_resources/free-mocktests",   // ✅ fixed
  },
  {
    title: "Study Material",
    icon: "📕",
    color: "text-red-500",
    bg: "bg-red-100",
    link: "/free_resources/study-materials",
  },
];

const FreeResources: React.FC = () => {
  return (
    <section className="w-full py-16 bg-[#f7f8fb]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {resources.map((item, index) => (
          <Link key={index} href={item.link}>

            <div className="cursor-pointer bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center text-center hover:shadow-xl hover:scale-105 transition duration-300">

              <div
                className={`w-16 h-16 ${item.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}
              >
                {item.icon}
              </div>

              <h3 className={`text-lg font-semibold ${item.color}`}>
                {item.title}
              </h3>

            </div>

          </Link>
        ))}

      </div>
    </section>
  );
};

export default FreeResources;