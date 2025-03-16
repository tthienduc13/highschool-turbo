import {
  Document,
  DocumentMedia,
  FilterPayload,
  Pagination,
  ResponseModel,
} from "@highschool/interfaces";
import { documentEndpoints, mediaEndpoints } from "@highschool/endpoints";

import { axiosClientWithoutAuth } from "../lib/axios.ts";

import { fetchUnauthedPaginatedData } from "./common.ts";

export const getDocuments = async ({
  search,
  pageNumber,
  pageSize,
  schoolId,
  categoryIds,
  semester,
  documentYear,
  sortPopular,
  provinceId,
  curriculumIds,
  subjectId,
}: FilterPayload): Promise<Pagination<Document[]>> => {
  return fetchUnauthedPaginatedData<Document[]>(
    documentEndpoints.getDocuments,
    {
      search: search,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortPopular,
      semester,
      subjectId: schoolId,
      categoryIds: categoryIds,
      curriculumIds: curriculumIds,
      SubjectId: subjectId,
      documentYear: documentYear,
      provinceId: provinceId,
    },
  );
};

export const getDocumentBySlug = async ({
  documentSlug,
}: {
  documentSlug: string;
}): Promise<Document> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(
      `${documentEndpoints.getDocumentBySlug(documentSlug)}`,
    );

    return data;
  } catch (error) {
    console.log(`Error fetching document with slug:${documentSlug}`, error);
    throw error;
  }
};
export const getDocumentMedia = async ({
  documentId,
}: {
  documentId: string;
}): Promise<ResponseModel<DocumentMedia>> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(
      `${mediaEndpoints.getDocument(documentId)}`,
    );

    return data;
  } catch (error) {
    console.log(
      `Error fetching document media with documentId:${documentId}`,
      error,
    );
    throw error;
  }
};

export const getDownloadDocument = async ({
  documentId,
}: {
  documentId: string;
}) => {
  const response = await axiosClientWithoutAuth.get(
    `${mediaEndpoints.downloadDocument(documentId)}`,
    {
      responseType: "blob",
    },
  );

  return response;
};
