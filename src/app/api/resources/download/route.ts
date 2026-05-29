import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PDF = "/assets/samples/sriram-sample.pdf";

/**
 * Lightweight download handler — redirects only.
 * Avoids fs.readFile on public/ assets (which bloated this function to 500MB+ on Vercel).
 */
export async function GET(request: NextRequest) {
  const pdfUrl =
    request.nextUrl.searchParams.get("pdf")?.trim() || DEFAULT_PDF;

  if (pdfUrl.startsWith("http://") || pdfUrl.startsWith("https://")) {
    return NextResponse.redirect(pdfUrl);
  }

  const staticPath = pdfUrl.startsWith("/") ? pdfUrl : `/${pdfUrl}`;
  return NextResponse.redirect(new URL(staticPath, request.nextUrl.origin));
}
