import { useQuery } from "@tanstack/react-query";

import { FilterPayload } from "@highschool/interfaces";

import {
  getDocumentBySlug,
  getDocumentMedia,
  getDocuments,
  getDownloadDocument,
} from "../apis/document.ts";

export const useDocumentsQuery = ({
  search,
  pageNumber,
  pageSize,
  schoolId,
  categoryIds,
  semester,
  sortPopular,
  documentYear,
  curriculumIds,
  provinceId,
  subjectId,
}: FilterPayload) => {
  return useQuery({
    queryKey: [
      "document",
      search,
      pageNumber,
      pageSize,
      sortPopular,
      semester,
      schoolId,
      categoryIds,
      curriculumIds,
      documentYear,
      provinceId,
      subjectId,
    ],
    queryFn: () =>
      getDocuments({
        search: search,
        pageNumber: pageNumber,
        pageSize: pageSize,
        schoolId: schoolId,
        semester: semester,
        curriculumIds: curriculumIds,
        categoryIds: categoryIds,
        documentYear: documentYear,
        subjectId: subjectId,
        provinceId: provinceId,
      }),
  });
};

export const useDocumentBySlugQuery = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ["document-by-slug", slug],
    queryFn: () => getDocumentBySlug({ documentSlug: slug }),
    enabled: !!slug,
  });
};

export const useDocumentMediaQuery = (documentId: string) => {
  return useQuery({
    queryKey: ["document-media", documentId],
    queryFn: () => getDocumentMedia({ documentId: documentId }),
    enabled: !!documentId,
  });
};

export const useDownloadDocumentMediaQuery = (documentId: string) => {
  return useQuery({
    queryKey: ["document-media", "download", documentId],
    queryFn: () => getDownloadDocument({ documentId }),
  });
};
