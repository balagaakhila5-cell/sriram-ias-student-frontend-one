import Image from 'next/image'

const OurBooks = () => {
    return (
        <div className="rounded-[22px] bg-[#DCE8F8] px-5 py-5 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
            <h2 className="mb-4 text-center text-[30px] font-extrabold leading-none md:text-[34px]">
                <span className="bg-[linear-gradient(90deg,#4D90D2_0%,#B57B95_100%)] bg-clip-text text-transparent">
                    Our Books
                </span>
            </h2>

            <div className="relative overflow-hidden rounded-[18px]">
                <Image
                    src="/assets/free-resources/NCERT/prelims-revision.png"
                    alt="Our Books"
                    width={420}
                    height={620}
                    className="h-auto w-full object-cover"
                />
                <a
                    href="#"
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-2 text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
                >
                    Buy Now
                    <span aria-hidden className="text-lg leading-none">→</span>
                </a>
            </div>
        </div>
    )
}

export default OurBooks