import MainLayout from '@/components/common/MainLayout';
import CenterCategoryPrograms from '@/features/center/components/sections/CenterCategoryPrograms';
import JoinCTA from '@/features/course/components/sections/JoinCTA';
import {
  getCenterCategory,
  isCenterCity,
  isCourseCategoryKey,
} from '@/features/center/data/centerCourseCategories';
import { notFound } from 'next/navigation';

export default async function CenterCategoryPage({
  params,
}: {
  params: Promise<{ city: string; category: string }>;
}) {
  const { city, category } = await params;
  const cityKey = city.toLowerCase();

  if (!isCenterCity(cityKey) || !isCourseCategoryKey(category)) {
    notFound();
  }

  if (!getCenterCategory(cityKey, category)) {
    notFound();
  }

  return (
    <MainLayout headerVariant="light">
      <CenterCategoryPrograms city={cityKey} category={category} />
      <JoinCTA city={cityKey} />
    </MainLayout>
  );
}
