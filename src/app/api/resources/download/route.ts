import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import "@/features/resources/catalog";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import {
  resolveCatalogDocument,
  type CatalogDocumentHints,
} from "@/features/resources/catalog/registry";

function safeFileName(title: string) {
  const cleaned = title.replace(/[^\w\s-]/g, "").trim();
  return (cleaned || "document").replace(/\s+/g, "-");
}

function hintsFromRequest(request: NextRequest): CatalogDocumentHints {
  return {
    pdfUrl: request.nextUrl.searchParams.get("pdf"),
    title: request.nextUrl.searchParams.get("title"),
    module:
      (request.nextUrl.searchParams.get("module") as CatalogDocumentHints["module"]) ??
      undefined,
    subtopic:
      (request.nextUrl.searchParams.get("subtopic") as CatalogDocumentHints["subtopic"]) ??
      undefined,
  };
}

async function streamLocalPdf(relativeUrl: string, fileName: string) {
  const relativePath = relativeUrl.startsWith("/")
    ? relativeUrl.slice(1)
    : relativeUrl;
  const filePath = path.join(process.cwd(), "public", relativePath);
  const buffer = await readFile(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") ?? "resource";
  const hints = hintsFromRequest(request);
  const doc = resolveCatalogDocument(id, hints);
  const pdfUrl = doc?.pdfUrl ?? hints.pdfUrl ?? RESOURCE_ASSETS.DEFAULT_PDF;
  const title = doc?.title ?? hints.title ?? "resource";
  const fileName = safeFileName(title);

  if (pdfUrl.startsWith("http://") || pdfUrl.startsWith("https://")) {
    return NextResponse.redirect(pdfUrl);
  }

  try {
    return await streamLocalPdf(pdfUrl, fileName);
  } catch {
    try {
      return await streamLocalPdf(RESOURCE_ASSETS.DEFAULT_PDF, fileName);
    } catch {
      return NextResponse.json(
        { error: "PDF file not found" },
        { status: 404 },
      );
    }
  }
}
