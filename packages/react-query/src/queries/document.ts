import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createDocument,
  deleteDocument,
  getDocumentBySlug,
  getDocumentManagementBySlug,
  getDocumentMedia,
  getDocuments,
  getDownloadDocument,
  updateDocument,
  uploadDocument,
} from "../apis/document.ts";

export const useDocumentQuery = ({
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
}>) => {
  return useQuery({
    queryKey: [
      "documents",
      {
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
      },
    ],
    queryFn: () =>
      getDocuments({
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

export const useDocumentManagementBySlugQuery = ({
  slug,
}: {
  slug: string;
}) => {
  return useQuery({
    queryKey: ["document-management-by-slug", slug],
    queryFn: () => getDocumentManagementBySlug({ documentSlug: slug }),
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

export const useDeleteDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-document"],
    mutationFn: (documentId: string) => {
      return deleteDocument(documentId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success(data.message ?? "Document deleted successfully");
    },
    onError: () => {
      toast.error("An error occurred while deleting the document.");
    },
  });
};

export const useUploadfileMutation = () => {
  return useMutation({
    mutationKey: ["document-media"],
    mutationFn: uploadDocument,
    onSuccess: (data) => {
      toast.success(data.message ?? "File uploaded successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while uploading the file.");
      console.log("Error uploading file:", error);
    },
  });
};

export const useCreateDocumentMutation = ({ file }: { file: File }) => {
  const { mutate: uploadFile } = useUploadfileMutation();

  return useMutation({
    mutationKey: ["create-document"],
    mutationFn: createDocument,
    onSuccess: (data) => {
      if (data.status === 201) {
        toast.success(data.message ?? "Document created successfully");
        uploadFile({ documentId: data.data!, file: file });
      } else {
        toast.error(
          data.message ?? "An error occurred while creating the document.",
        );
      }
    },
    onError: (error) => {
      toast.error("An error occurred while uploading the file.");
      console.log("Error uploading file:", error);
    },
  });
};

export const useUpdateDocumentMutation = () => {
  return useMutation({
    mutationKey: ["update-document"],
    mutationFn: updateDocument,
    onSuccess: () => {
      toast.success("Document updated successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while uploading the file.");
      console.log("Error uploading file:", error);
    },
  });
};
