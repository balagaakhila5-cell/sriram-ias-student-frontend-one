'use client';

import Link from 'next/link';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import '@/features/resources/catalog';
import {
  resolveCatalogDocument,
  type CatalogDocumentHints,
} from '@/features/resources/catalog/registry';
import {
  resourceBackPath,
  resourceDownloadPath,
  type ResourceLinkOrigin,
} from '@/features/resources/catalog/routes';
import type { ResourceModule } from '@/features/resources/catalog/types';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function ResourceViewPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const hints: CatalogDocumentHints = {
    pdfUrl: searchParams.get('pdf'),
    title: searchParams.get('title'),
    module: searchParams.get('module') as CatalogDocumentHints['module'],
    subtopic: searchParams.get('subtopic') as CatalogDocumentHints['subtopic'],
  };

  const doc = resolveCatalogDocument(decodeURIComponent(id), hints);

  if (!doc) {
    const fallback = resourceBackPath({
      module: hints.module as ResourceModule | undefined,
      subtopic: hints.subtopic,
    });
    return <Navigate to={fallback} replace />;
  }

  const origin = searchParams.get('origin') as ResourceLinkOrigin | null;
  const backHref = resourceBackPath({
    module: (searchParams.get('module') ?? doc.module) as ResourceModule,
    subtopic: searchParams.get('subtopic') ?? String(doc.subtopic),
    origin: origin ?? undefined,
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]">
      <Header variant="light" />

      <div className="px-4 py-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-[#1F7AB8]">
                {doc.module === 'current-affairs' ? 'Current Affairs' : 'Free Resources'}
              </p>
              <h1 className="mt-1 text-[28px] font-extrabold text-[#111]">{doc.title}</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={backHref}
                className="rounded-full border border-[#58b7ea] px-5 py-2 text-[14px] font-bold text-[#2a9cda]"
              >
                Back
              </Link>
              <a
                href={resourceDownloadPath(doc)}
                className="rounded-full bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] px-5 py-2 text-[14px] font-bold text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download PDF
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <iframe
              title={doc.title}
              src={doc.pdfUrl}
              className="h-[min(80vh,900px)] w-full"
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
