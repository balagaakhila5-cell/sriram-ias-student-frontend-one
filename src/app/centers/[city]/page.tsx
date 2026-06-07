import CenterDetails from '@/features/center/components/sections/CenterDetails';
import JoinCTA from '@/features/course/components/sections/JoinCTA';
import MainLayout from '@/components/common/MainLayout';
import { ALLOWED_CENTER_CITIES } from '@/features/center/data/centerCourseCategories';
import { notFound } from 'next/navigation';

export default async function CenterPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  
  if (!ALLOWED_CENTER_CITIES.includes(city.toLowerCase() as (typeof ALLOWED_CENTER_CITIES)[number])) {
    notFound();
  }

  return (
    <MainLayout>
      <CenterDetails city={city.toLowerCase()} />
      <JoinCTA city={city.toLowerCase()} title={`CONTACT US : ${city.toUpperCase()} Branch`} />
    </MainLayout>
  );
}
