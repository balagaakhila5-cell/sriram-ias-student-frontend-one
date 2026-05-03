// 'use client';

// import React from 'react';
// import Image from 'next/image';

// const BookDetailsHero: React.FC = () => {
//   return (
//     <div className="relative w-full h-[35vh] md:h-[50vh] min-h-[250px] flex md:items-end md:pb-12 items-center justify-start">
//       {/* Background Image Setup */}
//       <div className="absolute inset-0 z-0">
//          <Image 
//            src="/assets/books/Books-Hero-1.png"
//            alt="Book Details Background"
//            fill
//            priority
//            className="object-cover object-center"
//            onError={(e) => {
//               (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiIC8+PC9zdmc+'; // Dark fallback
//            }}
//          />
//          <div className="absolute inset-0 bg-black/60" />
//       </div>

//       <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-16">
//         <h1 className="text-white font-[Montserrat] font-black text-4xl md:text-6xl uppercase tracking-wider text-[#A2B6FE]">
//            BOOK <span className="text-[#8B98EB]">DETAILS</span>
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default BookDetailsHero;

'use client';

import React from 'react';
import Image from 'next/image';

const BookDetailsHero: React.FC = () => {
  return (
    <div className="relative w-full h-[35vh] md:h-[50vh] min-h-[250px] flex items-center justify-start">
      {/* 1. Changed to 'items-center' for all screen sizes to keep it vertically in the middle */}
      
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
         <Image 
           src="/assets/books/Books-Hero-1.png"
           alt="Book Details Background"
           fill
           priority
           className="object-cover object-center"
           onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiIC8+PC9zdmc+'; // Dark fallback
           }}
         />
         <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <h1 className="font-[Montserrat] font-black text-[48px] leading-[56px] tracking-normal uppercase text-left text-transparent bg-clip-text bg-[linear-gradient(90deg,#FFFFFF_12.5%,#7575DF_47.6%,#9E9EFD_100%)] w-fit">
           BOOK DETAILS
        </h1>
      </div>
    </div>
  );
};

export default BookDetailsHero;