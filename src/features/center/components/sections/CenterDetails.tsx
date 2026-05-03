'use client';

import React from 'react';
import Hero from './Hero';
import CoursesInCity from './CoursesInCity';
import OurToppers from './OurToppers';
import CenterGallery from './CenterGallery';
import SuccessStories from './SuccessStories';
import OurStaff from './OurStaff';

interface Props {
  city: string;
}

const CenterDetails: React.FC<Props> = ({ city }) => {
  return (
    <div className="w-full relative bg-white font-['Montserrat',sans-serif]">
      <Hero city={city} />
      <CoursesInCity city={city} />
      <OurToppers city={city} />
      <CenterGallery city={city} />
      <SuccessStories city={city} />
      <OurStaff city={city} />
    </div>
  );
};

export default CenterDetails;
