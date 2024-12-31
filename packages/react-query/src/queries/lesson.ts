import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getLessonDetail,
  getLessonList,
  markLessonDone,
} from "../apis/lesson.ts";

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
