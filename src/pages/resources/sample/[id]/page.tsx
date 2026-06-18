import Link from "next/link";
import { notFound } from "next/navigation";
import "@/features/resources/catalog";
import {
  resolveCatalogDocument,
  type CatalogDocumentHints,
} from "@/features/resources/catalog/registry";
import {
  resourceDownloadPath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function pickParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function ResourceSamplePage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  const hints: CatalogDocumentHints = {
    pdfUrl: pickParam(query.pdf),
    title: pickParam(query.title),
    module: pickParam(query.module) as CatalogDocumentHints["module"],
    subtopic: pickParam(query.subtopic) as CatalogDocumentHints["subtopic"],
  };
  const doc = resolveCatalogDocument(id, hints);

  if (!doc) notFound();

  return (
    <main className="min-h-screen bg-[#f7f8fb] px-4 py-8 font-['Montserrat',sans-serif]">
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
          >
            Download PDF
          </a>
        </div>
      </div>
    </main>
  );
}
