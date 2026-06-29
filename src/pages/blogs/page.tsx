'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import Image from '@/components/common/AppImage';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BlogHomepage from '@/features/blogs/components/BlogHomepage';
import FeaturedBlog from '@/features/blogs/components/FeaturedBlog';
import BlogGridCard from '@/features/blogs/components/BlogGridCard';
import BlogListSkeleton, {
  BlogFeaturedSkeleton,
} from '@/features/blogs/components/BlogListSkeleton';
import BlogsCalendar from '@/features/blogs/components/BlogsCalendar';
import BlogsSidebar from '@/features/blogs/components/BlogsSidebar';
import { useBlogHomepage } from '@/features/blogs/hooks/useBlogHomepage';
import { getBlogTrendingViewAllHref } from '@/features/blogs/services/blogDetailsService';
import { useBlogLanguages } from '@/features/blogs/hooks/useBlogLanguages';
import { useSelectedBlogLanguage } from '@/features/blogs/hooks/useSelectedBlogLanguage';
import { useSelectedBlogCategory } from '@/features/blogs/hooks/useSelectedBlogCategory';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BlogsPage() {
  const mainRef = useRef<HTMLElement>(null);
  const { data: languages = [] } = useBlogLanguages();
  const { selectedLanguage } = useSelectedBlogLanguage({
    languages,
  });

  const languageName = selectedLanguage?.languageName;
  const languageReady = Boolean(languageName) && languages.length > 0;

  const {
    data: homepageBundle,
    isLoading: homepageLoading,
    isFetching: homepageFetching,
    isError: homepageError,
    error: homepageQueryError,
  } = useBlogHomepage({
    language: languageName,
    enabled: languageReady,
  });

  const homepageCategories = homepageBundle?.categories ?? [];
  const { selectedCategory, setSelectedCategory } =
    useSelectedBlogCategory(homepageCategories);

  const showHomepageLoading =
    homepageLoading || (homepageFetching && !homepageBundle && !homepageError);

  const previewBlogs = homepageBundle?.previewBlogs ?? [];
  const featuredBlog = homepageBundle?.featured ?? null;

  const viewAllDetailHref = useMemo(
    () => getBlogTrendingViewAllHref(selectedLanguage?.slug),
    [selectedLanguage?.slug],
  );

  const selectedCategoryValue = selectedCategory?.value ?? null;
  const categoryBlogCount = useMemo(() => {
    if (!homepageBundle || !selectedCategoryValue) return 0;
    return homepageBundle.gsPaperWise[selectedCategoryValue]?.length ?? 0;
  }, [homepageBundle, selectedCategoryValue]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-main-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-main-card',
            start: 'top 85%',
            once: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>('.blog-grid-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(1.2)',
            delay: i * 0.06,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [
    featuredBlog?.id,
    previewBlogs.length,
    categoryBlogCount,
    selectedCategoryValue,
    showHomepageLoading,
  ]);

  return (
    <>
      <Header />

      <main ref={mainRef} className="min-h-screen bg-white font-['Montserrat',sans-serif]">
        <section className="relative h-[280px] w-full overflow-hidden sm:h-[320px] md:h-[360px]">
          <Image
            src="/assets/blogs/blogs-banner.png"
            alt="Blogs Banner"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 flex h-full items-end px-4 pb-8 sm:px-8 sm:pb-10 md:px-10">
            <h1 className="text-[40px] font-black uppercase leading-none sm:text-[48px] md:text-[56px]">
              <span className="bg-gradient-to-r from-white via-[#c9c4ff] to-[#8f8cff] bg-clip-text text-transparent">
                BLOGS
              </span>
            </h1>
          </div>
        </section>

        <section className="relative overflow-x-hidden px-4 py-12 lg:px-6 xl:px-8">
          <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: 'radial-gradient(#9C9C9C 2px, transparent 2px)',
                backgroundSize: '26px 26px',
              }}
            />
          </div>

          <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_350px]">
            {/* Main column — featured, preview grid, then GS section */}
            <div className="min-w-0">
              <div className="mb-7 lg:hidden">
                <BlogsCalendar />
              </div>

              {showHomepageLoading ? (
                <>
                  <BlogFeaturedSkeleton />
                  <BlogListSkeleton count={3} className="mt-7" />
                </>
              ) : (
                <>
                  {featuredBlog ? (
                    <FeaturedBlog
                      blog={featuredBlog}
                      isError={homepageError}
                      errorMessage={homepageQueryError?.message}
                    />
                  ) : null}

                  {previewBlogs.length > 0 ? (
                    <div
                      className={
                        featuredBlog ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3' : 'mb-7 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
                      }
                    >
                      {previewBlogs.map((blog) => (
                        <BlogGridCard key={blog.id} blog={blog} />
                      ))}
                    </div>
                  ) : null}
                </>
              )}

              <BlogHomepage
                bundle={homepageBundle}
                isLoading={showHomepageLoading}
                isError={homepageError}
                errorMessage={homepageQueryError?.message}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                hideFeatured
                hidePreview
              />
            </div>

            {/* Right sidebar — calendar + widgets only */}
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <div className="hidden lg:block">
                <BlogsCalendar />
              </div>

              <div className="mt-0 lg:mt-6">
                <BlogsSidebar
                  showTrendingVideos
                  showTrendingVideoList
                  showCalendar={false}
                  viewAllHref={viewAllDetailHref}
                />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
