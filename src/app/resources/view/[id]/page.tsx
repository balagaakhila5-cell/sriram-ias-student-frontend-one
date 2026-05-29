import Link from "next/link";
import { notFound } from "next/navigation";
import "@/features/resources/catalog";
import {
  resolveCatalogDocument,
  type CatalogDocumentHints,
} from "@/features/resources/catalog/registry";
import { resourceDownloadPath } from "@/features/resources/catalog/routes";

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

function hintsFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): CatalogDocumentHints {
  return {
    pdfUrl: pickParam(searchParams.pdf),
    title: pickParam(searchParams.title),
    module: pickParam(searchParams.module) as CatalogDocumentHints["module"],
    subtopic: pickParam(searchParams.subtopic) as CatalogDocumentHints["subtopic"],
  };
}

export default async function ResourceViewPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  const hints = hintsFromSearchParams(query);
  const doc = resolveCatalogDocument(id, hints);

  if (!doc) notFound();

  const backHref =
    doc.module === "current-affairs"
      ? "/student/free-resources"
      : "/student/free-resources";

  return (
    <main className="min-h-screen bg-[#f7f8fb] px-4 py-8 font-['Montserrat',sans-serif]">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wide text-[#1F7AB8]">
              {doc.module === "current-affairs" ? "Current Affairs" : "Free Resources"}
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
    </main>
  );
}
