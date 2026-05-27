export interface PdfResource {
  id: string;
  title: string;
  category: "current-affairs" | "test-series";
}

export const currentAffairsPdfs: PdfResource[] = [
  { id: "ca-pdf-1", title: "Geography Current affair PDF", category: "current-affairs" },
  { id: "ca-pdf-2", title: "Geography Current affair PDF", category: "current-affairs" },
];

export const testSeriesPdfs: PdfResource[] = [
  { id: "ts-pdf-1", title: "Geography Prelims Model Question and Answer", category: "test-series" },
  { id: "ts-pdf-2", title: "Geography Mains Model Question and Answer", category: "test-series" },
  { id: "ts-pdf-3", title: "Geography Prelims Model Question and Answer", category: "test-series" },
  { id: "ts-pdf-4", title: "Geography Mains Model Question and Answer", category: "test-series" },
];
