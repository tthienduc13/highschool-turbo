import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createChapter,
  deleteChapter,
  editChapter,
  getChapterList,
  getChapterListById,
} from "../apis/chapter.ts";

export const useChapterListQuery = ({
  courseSlug,
  curriculumId,
  pageNumber,
  pageSize,
}: {
  courseSlug: string;
  curriculumId: string;
  pageNumber: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["chapter-list", courseSlug, curriculumId, pageNumber, pageSize],
    queryFn: () =>
      getChapterList({ courseSlug, curriculumId, pageNumber, pageSize }),
    enabled: !!courseSlug && !!curriculumId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useChapterListByIdQuery = ({
  courseId,
  curriculumId,
  pageNumber,
  pageSize,
}: {
  courseId: string;
  curriculumId: string;
  pageNumber: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["chapter-list", courseId, curriculumId, pageNumber, pageSize],
    queryFn: () =>
      getChapterListById({ courseId, curriculumId, pageNumber, pageSize }),
    enabled: !!courseId && !!curriculumId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useChapterMutation = () => {
  return useMutation({
    mutationKey: ["create-chapter"],
    mutationFn: createChapter,
  });
};

export const useEditChapterMutation = () => {
  return useMutation({
    mutationKey: ["edit-chapter"],
    mutationFn: editChapter,
  });
};

export const useDeleteChapterMutation = () => {
  return useMutation({
    mutationKey: ["delete-chapter"],
    mutationFn: deleteChapter,
  });
};
