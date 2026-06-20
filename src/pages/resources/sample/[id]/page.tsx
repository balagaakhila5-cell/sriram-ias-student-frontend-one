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
  resourceViewPath,
} from '@/features/resources/catalog/routes';
import type { ResourceModule } from '@/features/resources/catalog/types';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function ResourceSamplePage() {
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]">
      <Header variant="light" />

      <div className="px-4 py-8">
        <div className="mx-auto max-w-[900px]">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-[#1F7AB8]">
            Sample Preview
          </p>
          <h1 className="mt-1 text-[28px] font-extrabold text-[#111]">{doc.title}</h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[#444]">
            This is a sample preview. Open the full document to read complete content or
            download the PDF for offline access.
          </p>

          <div className="mt-8 overflow-hidden rounded-[18px] border border-[#dbe8f3] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <iframe
              title={`${doc.title} sample`}
              src={`${doc.pdfUrl}#page=1`}
              className="h-[min(50vh,480px)] w-full"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={resourceViewPath(doc)}
              className="rounded-full border border-[#58b7ea] px-6 py-2.5 text-[14px] font-bold text-[#2a9cda]"
            >
              Read Full Document
            </Link>
            <a
              href={resourceDownloadPath(doc)}
              className="rounded-full bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] px-6 py-2.5 text-[14px] font-bold text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
