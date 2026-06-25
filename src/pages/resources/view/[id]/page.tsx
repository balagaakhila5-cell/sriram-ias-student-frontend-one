"use client";

import Link from '@/components/common/AppLink';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import '@/features/resources/catalog';
import {
  resolveCatalogDocument,
  type CatalogDocumentHints,
} from '@/features/resources/catalog/registry';
import {
  resourceBackPath,
  type ResourceLinkOrigin,
} from '@/features/resources/catalog/routes';
import type { ResourceModule } from '@/features/resources/catalog/types';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useCurrentAffairsView } from '@/features/currentAffairs/hooks/useCurrentAffairs';
import PdfActionButtons from '@/features/currentAffairs/components/PdfActionButtons';
import ErrorState from '@/features/currentAffairs/components/ErrorState';
import LoadingSkeleton from '@/features/currentAffairs/components/LoadingSkeleton';
import type { CatalogDocument } from '@/features/resources/catalog/types';

export default function ResourceViewPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const hints: CatalogDocumentHints = {
    pdfUrl: searchParams.get('pdf'),
    title: searchParams.get('title'),
    module: searchParams.get('module') as CatalogDocumentHints['module'],
    subtopic: searchParams.get('subtopic') as CatalogDocumentHints['subtopic'],
  };

  const decodedId = decodeURIComponent(id);
  const isCurrentAffairs = hints.module === 'current-affairs';
  const shouldFetchView = isCurrentAffairs && !hints.pdfUrl;

  const {
    data: viewData,
    isLoading: viewLoading,
    isError: viewError,
    error: viewFetchError,
    refetch,
  } = useCurrentAffairsView(shouldFetchView ? decodedId : undefined);

  const doc = resolveCatalogDocument(decodedId, hints);

  if (!doc && !shouldFetchView) {
    const fallback = resourceBackPath({
      module: hints.module as ResourceModule | undefined,
      subtopic: hints.subtopic,
    });
    return <Navigate to={fallback} replace />;
  }

  const origin = searchParams.get('origin') as ResourceLinkOrigin | null;
  const backHref = resourceBackPath({
    module: (searchParams.get('module') ?? doc?.module) as ResourceModule,
    subtopic: searchParams.get('subtopic') ?? String(doc?.subtopic ?? ''),
    origin: origin ?? undefined,
  });

  const title = viewData?.title ?? doc?.title ?? 'Current Affairs';
  const pdfUrl = viewData?.fileUrl ?? doc?.pdfUrl ?? '';

  const actionItem: CatalogDocument | null = doc ?? (shouldFetchView
    ? {
        id: decodedId,
        module: 'current-affairs',
        subtopic: hints.subtopic ?? 'daily-current-affairs',
        year: '',
        month: '',
        title,
        image: '',
        pdfUrl,
      }
    : null);

  if (shouldFetchView && viewLoading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]">
        <Header variant="light" />
        <div className="px-4 py-8">
          <div className="mx-auto max-w-[1100px]">
            <LoadingSkeleton count={1} columnsClassName="grid grid-cols-1" />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (shouldFetchView && viewError) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]">
        <Header variant="light" />
        <div className="px-4 py-8">
          <div className="mx-auto max-w-[1100px]">
            <ErrorState
              message={viewFetchError?.message}
              onRetry={() => refetch()}
            />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!pdfUrl) {
    return <Navigate to={backHref} replace />;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]">
      <Header variant="light" />

      <div className="px-4 py-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-[#1F7AB8]">
                {isCurrentAffairs ? 'Current Affairs' : 'Free Resources'}
              </p>
              <h1 className="mt-1 text-[28px] font-extrabold text-[#111]">{title}</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={backHref}
                className="rounded-full border border-[#58b7ea] px-5 py-2 text-[14px] font-bold text-[#2a9cda]"
              >
                Back
              </Link>
              {actionItem ? (
                <PdfActionButtons item={{ ...actionItem, title, pdfUrl }} compact />
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <iframe
              title={title}
              src={pdfUrl}
              className="h-[min(80vh,900px)] w-full"
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
