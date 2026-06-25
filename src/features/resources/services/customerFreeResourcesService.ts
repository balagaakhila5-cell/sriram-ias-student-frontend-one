import { http } from "@/lib/http";
import type { ApiEnvelope } from "@/lib/apiResult";
import type {
  LabelValueOption,
  MockTestCheckAnswerItem,
  MockTestDetailData,
  MockTestListItem,
  MockTestListQuery,
  MockTestSubmitPayload,
  MockTestSubmitResult,
  NcertBookItem,
  NcertListQuery,
  PdfDownloadData,
  PdfViewData,
  PyqListQuery,
  PyqPaperItem,
  StudyMaterialItem,
  StudyMaterialListQuery,
} from "../types/customerFreeResources";

const BASE = "/customer/free-resources";

async function post<T>(path: string, body: object = {}) {
  const { data } = await http.post<ApiEnvelope<T>>(`${BASE}${path}`, body);
  return data.data;
}

export const customerFreeResourcesService = {
  getCategories: () =>
    post<LabelValueOption[]>(`/categories`),

  getNcertSubjects: () => post<string[]>(`/ncert/subjects`),

  getNcertClasses: () => post<string[]>(`/ncert/classes`),

  listNcertBooks: (query: NcertListQuery = {}) =>
    post<NcertBookItem[]>(`/ncert/list`, query),

  viewNcertBook: (id: string) =>
    post<PdfViewData>(`/ncert/view`, { resourceId: id }),

  downloadNcertBook: (id: string) =>
    post<PdfDownloadData>(`/ncert/download`, { resourceId: id }),

  getPyqPaperTypes: () =>
    post<LabelValueOption[]>(`/pyq/paper-types`),

  getPyqPapers: (paperType: string) =>
    post<string[]>(`/pyq/papers`, { paperType }),

  getPyqYears: () => post<number[]>(`/pyq/years`),

  listPyqPapers: (query: PyqListQuery = {}) =>
    post<PyqPaperItem[]>(`/pyq/list`, query),

  viewPyqPaper: (id: string) =>
    post<PdfViewData>(`/pyq/view`, { resourceId: id }),

  downloadPyqPaper: (id: string) =>
    post<PdfDownloadData>(`/pyq/download`, { resourceId: id }),

  getMockTestPaperTypes: () =>
    post<LabelValueOption[]>(`/mock-tests/paper-types`),

  getMockTestPapers: (paperType: string) =>
    post<string[]>(`/mock-tests/papers`, { paperType }),

  listMockTests: (query: MockTestListQuery = {}) =>
    post<MockTestListItem[]>(`/mock-tests/list`, query),

  getMockTestDetails: (mockTestId: string) =>
    post<MockTestDetailData>(`/mock-tests/details`, { mockTestId }),

  submitMockTest: (payload: MockTestSubmitPayload) =>
    post<MockTestSubmitResult>(`/mock-tests/submit`, payload),

  checkMockTestAnswers: (payload: MockTestSubmitPayload) =>
    post<MockTestCheckAnswerItem[]>(`/mock-tests/check-answers`, payload),

  getStudyMaterialCategories: () =>
    post<LabelValueOption[]>(`/study-materials/categories`),

  listStudyMaterials: (query: StudyMaterialListQuery = {}) =>
    post<StudyMaterialItem[]>(`/study-materials/list`, query),

  viewStudyMaterial: (id: string) =>
    post<PdfViewData>(`/study-materials/view`, { resourceId: id }),

  downloadStudyMaterial: (id: string) =>
    post<PdfDownloadData>(`/study-materials/download`, { resourceId: id }),
};
