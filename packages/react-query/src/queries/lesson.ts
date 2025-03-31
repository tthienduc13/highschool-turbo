import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createLesson,
  deleteLessons,
  editLesson,
  getLessonDetail,
  getLessonList,
  markLessonDone,
} from "../apis/lesson.ts";

export const useLessonMutation = () => {
  return useMutation({
    mutationKey: ["create-lesson"],
    mutationFn: createLesson,
  });
};

export const useEditLessonMutation = () => {
  return useMutation({
    mutationKey: ["edit-lesson"],
    mutationFn: editLesson,
  });
};

export const useDeleteLessonMutation = () => {
  return useMutation({
    mutationKey: ["delete-lesson"],
    mutationFn: deleteLessons,
  });
};

export const useLessonsQuery = ({
  chapterId,
  pageNumber,
  pageSize,
}: {
  chapterId: string;
  pageNumber: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["lesson-list", chapterId],
    queryFn: () => getLessonList({ chapterId, pageNumber, pageSize }),
    enabled: !!chapterId,
  });
};

export const useLessonDetailQuery = ({ lessonId }: { lessonId: string }) => {
  return useQuery({
    queryKey: ["lesson-detail", lessonId],
    queryFn: () => getLessonDetail({ lessonId }),
    enabled: !!lessonId,
  });
};

export const useMarkLessonDoneMutation = () => {
  return useMutation({
    mutationKey: ["mark-lesson-done"],
    mutationFn: markLessonDone,
  });
};
