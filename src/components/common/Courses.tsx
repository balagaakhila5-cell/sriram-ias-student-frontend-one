import Image from 'next/image'
import React from 'react'

const Courses = () => {
    return (
        <div className="rounded-[22px] bg-white bg-[url('/assets/free-resources/courses-bg.png')] bg-cover bg-center p-4 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">                  <h2 className="mb-4 text-center text-[34px] font-extrabold leading-none">
            <span className="bg-[linear-gradient(90deg,#4D90D2_0%,#B57B95_100%)] bg-clip-text text-transparent">
                Courses
            </span>
        </h2>

            {/* Inserted Course Hover Card here */}
            <div className="group relative w-full cursor-pointer overflow-hidden rounded-[18px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                {/* Changed aspect-[3/4] to aspect-square to make the card a square */}
                <div className="relative w-full overflow-hidden bg-gray-100 aspect-square ">
                    <Image
                        src="/assets/course_image.png"
                        alt="1 Year General Studies Foundation Course"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 transition-opacity duration-300 group-hover:opacity-0">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                        <h3 className="relative text-base font-bold leading-tight text-[#FFE81C] drop-shadow-md">
                            NCERT Course
                        </h3>
                    </div>

                    <div
                        className="absolute inset-0 z-20 flex translate-y-full flex-col justify-between p-5 transition-transform duration-500 ease-out group-hover:translate-y-0"
                        style={{
                            background:
                                "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.95) 100%)",
                        }}
                    >
                        <div
                            className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full opacity-0 transition-opacity delay-100 duration-700 group-hover:opacity-100"
                            style={{
                                background:
                                    "linear-gradient(181.87deg, #FFDFA8 -157.44%, rgba(255, 226, 176, 0.96) -157.4%, rgba(255, 234, 198, 0.67) 216.94%, rgba(250, 211, 144, 0.8) 216.94%)",
                                filter: "blur(60px)",
                            }}
                        />
                        <div
                            className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full opacity-0 transition-opacity delay-100 duration-700 group-hover:opacity-100"
                            style={{
                                background:
                                    "linear-gradient(181.87deg, #FFDFA8 -157.44%, rgba(255, 226, 176, 0.96) -157.4%, rgba(255, 234, 198, 0.67) 216.94%, rgba(250, 211, 144, 0.8) 216.94%)",
                                filter: "blur(60px)",
                            }}
                        />

                        <div className="relative z-30 space-y-3">
                            <div className="translate-y-6 border-b border-white/20 pb-4 opacity-0 transition-all delay-100 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="flex items-start gap-2">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="#FFE81C"
                                        className="mt-0.5 shrink-0"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                    <span className="text-[15px] font-bold leading-snug text-[#FFE81C] md:text-base">
                                        NCERT Course
                                    </span>
                                </div>
                            </div>

                            <div className="translate-y-6 opacity-0 transition-all delay-200 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white md:text-base">
                                    <div className="flex items-center gap-1.5">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                                        </svg>
                                        <span>Delhi</span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                                        </svg>
                                        <span>Hyd</span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                                        </svg>
                                        <span>Pune</span>
                                    </div>
                                </div>
                            </div>

                            <div className="translate-y-3 opacity-0 transition-all delay-250 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                <p className="text-1xl text-[#FFE81C] md:text-1xl">
                                    Rs. 50,000 /-
                                </p>
                            </div>
                        </div>

                        <div className="relative z-30 mt-2 translate-y-4 opacity-0 transition-all delay-300 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            <button className="rounded-xl bg-white px-9 py-1 text-base text-black shadow-lg transition-all hover:bg-gray-100 active:scale-95">
                                Explore
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses