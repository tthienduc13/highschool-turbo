import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createDocument,
  deleteDocument,
  getDocumentBySlug,
  getDocumentManagementBySlug,
  getDocumentMedia,
  getDocuments,
  getDocumentsList,
  getDownloadDocument,
  getRelatedDocuments,
  updateDocument,
  uploadDocument,
} from "../apis/document.ts";

export interface FilterPayload {
  search?: string;
  pageNumber: number;
  pageSize: number;
  schoolId?: string;
  semester?: number | null;
  documentYear?: number;
  sortPopular?: boolean | null;
  provinceId?: string;
  categoryIds?: string;
  curriculumIds?: string;
  subjectId?: string;
}

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
      getDocumentsList({
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
        search: seach,
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

export const useDownloadDocumentMutation = () => {
  return useMutation({
    mutationKey: ["download-document"],
    mutationFn: getDownloadDocument,
    onSuccess: (response) => {
      // Kiểm tra content-type từ response thực tế
      const contentType = response.headers["content-type"] || "application/pdf";

      console.log("Content-Type:", contentType);

      const blob = new Blob([response.data], {
        type: contentType,
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;

      // Xử lý tên file
      let filename = "download.pdf";
      const disposition = response.headers["content-disposition"];

      if (disposition) {
        console.log("Content-Disposition:", disposition);

        // Đầu tiên thử với filename*
        const filenameStarMatch = disposition.match(
          /filename\*\=UTF-8''([^;]+)/i,
        );
        const filenameMatch = disposition.match(/filename="?([^"]+)"?/i);

        if (filenameStarMatch) {
          try {
            filename = decodeURIComponent(filenameStarMatch[1]);
            console.log("Decoded filename*:", filename);
          } catch (err) {
            console.warn("Failed to decode filename*", err);
            // Fallback to regular filename
            if (filenameMatch) {
              filename = filenameMatch[1];
            }
          }
        } else if (filenameMatch) {
          filename = filenameMatch[1];
          // Có thể filename thông thường cũng bị encode
          try {
            filename = decodeURIComponent(filename);
          } catch (err) {
            console.warn("Failed to decode regular filename", err);
          }
        }
      }

      console.log("Final filename:", filename);

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // Kiểm tra blob để debugging
      console.log("Blob size:", blob.size);
      console.log("Blob type:", blob.type);
    },
    onError: (error) => {
      console.error("Tải tài liệu thất bại:", error);
    },
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

export const useRelatedDocumentQuery = ({
  documentId,
}: {
  documentId: string;
}) => {
  return useQuery({
    queryKey: ["related-document", documentId],
    queryFn: () => getRelatedDocuments({ documentId }),
  });
};
