export interface TestSeries {
  id: string;
  title: string;
  validUpto: string;
  progressPercent: number;
  status: "Active" | "Expired";
}

export const testSeriesList: TestSeries[] = [
  {
    id: "series-1",
    title: "2 Year GS Foundation Test Series - Batch Name",
    validUpto: "22 March 2028",
    progressPercent: 80,
    status: "Active",
  },
];

export function getTestSeries(id: string): TestSeries | undefined {
  return testSeriesList.find((s) => s.id === id);
}
