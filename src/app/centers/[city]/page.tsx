import CenterDetails from '@/features/center/components/sections/CenterDetails';
import JoinCTA from '@/features/course/components/sections/JoinCTA';
import MainLayout from '@/components/common/MainLayout';
import { notFound } from 'next/navigation';

export default async function CenterPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const allowedCities = ['delhi', 'hyderabad', 'pune'];
  
  if (!allowedCities.includes(city.toLowerCase())) {
    notFound();
  }

  return (
    <MainLayout>
      <CenterDetails city={city.toLowerCase()} />
      <JoinCTA city={city.toLowerCase()} title={`CONTACT US : ${city.toUpperCase()} Branch`} />
    </MainLayout>
  );
}
