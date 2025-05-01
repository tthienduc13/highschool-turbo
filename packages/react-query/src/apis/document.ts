import {
  CreateDocument,
  Document,
  DocumentMedia,
  DocumentUpdate,
  FilterPayload,
  Pagination,
  ResponseModel,
  UpdateDocument,
} from "@highschool/interfaces";
import { documentEndpoints, mediaEndpoints } from "@highschool/endpoints";

import axiosServices, { axiosClientUpload } from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const getDocumentsList = async ({
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
  return fetchPaginatedData<Document[]>(documentEndpoints.getDocuments, {
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
  });
};

export const getDocuments = async ({
  pageSize,
  pageNumber,
  seach,
  sortPopular,
  schoolId,
  subjectIds,
  semester,
  documentYear,
  provinceId,
  categoryIds,
  curriculumIds,
}: Partial<{
  pageSize: number;
  pageNumber: number;
  seach?: string;
  sortPopular?: boolean;
  schoolId?: string | null;
  subjectIds?: string;
  semester?: number | null;
  documentYear?: number | null;
  provinceId?: string | null;
  categoryIds?: string;
  curriculumIds?: string;
}>): Promise<Pagination<Document[]>> => {
  schoolId = schoolId ?? undefined;
  semester = semester ?? undefined;
  documentYear = documentYear ?? undefined;
  provinceId = provinceId ?? undefined;

  return fetchPaginatedData<Document[]>(documentEndpoints.getDocuments, {
    pageSize,
    pageNumber,
    seach,
    sortPopular,
    schoolId,
    subjectIds,
    semester,
    documentYear,
    provinceId,
    categoryIds,
    curriculumIds,
  });
};

export const getDocumentBySlug = async ({
  documentSlug,
}: {
  documentSlug: string;
}): Promise<Document> => {
  try {
    const { data } = await axiosServices.get(
      `${documentEndpoints.getDocumentBySlug(documentSlug)}`,
    );

    return data;
  } catch (error) {
    console.log(`Error fetching document with slug:${documentSlug}`, error);
    throw error;
  }
};

export const getDocumentManagementBySlug = async ({
  documentSlug,
}: {
  documentSlug: string;
}): Promise<DocumentUpdate> => {
  try {
    const { data } = await axiosServices.get(
      `${documentEndpoints.getDocumentManagement(documentSlug)}`,
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
    const { data } = await axiosServices.get(
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
  const response = await axiosServices.get(
    `${mediaEndpoints.downloadDocument(documentId)}`,
    {
      responseType: "blob",
    },
  );

  return response;
};

export const deleteDocument = async (
  documentId: string,
): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      documentEndpoints.deleteDocument(documentId),
    );

    return data;
  } catch (error) {
    console.error("Error while deleting document");
    throw error;
  }
};

export const createDocument = async (
  document: CreateDocument,
): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      documentEndpoints.createDocument,
      document,
    );

    return data;
  } catch (error) {
    console.error("Error while creating document", error);
    throw error;
  }
};

export const updateDocument = async (
  document: UpdateDocument,
): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.put(
      documentEndpoints.updateDocument(document.id!),
      document,
    );

    return data;
  } catch (error) {
    console.error("Error while creating document", error);
    throw error;
  }
};

export const uploadDocument = async ({
  documentId,
  file,
}: {
  documentId: string;
  file: File;
}): Promise<ResponseModel<string>> => {
  try {
    const formData = new FormData();

    formData.append("file", file);

    const { data } = await axiosClientUpload.postForm(
      `${documentEndpoints.uploadDocument(documentId)}`,
      formData,
    );

    return data;
  } catch (error) {
    console.error("Error while uploading file");
    throw error;
  }
};
