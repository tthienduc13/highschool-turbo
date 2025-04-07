import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createTheory,
  deleteTheory,
  getLessonTheory,
  getTheoryById,
  updateTheory,
} from "../apis/theory.ts";

export const useGetLessonTheoryQuery = ({
  lessonId,
  pageSize,
  pageNumber,
  search,
}: {
  lessonId: string;
  pageSize: number;
  pageNumber: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["theory-in-lesson", lessonId, search, pageNumber, pageSize],
    queryFn: () =>
      getLessonTheory({
        search: search,
        id: lessonId,
        pageNumber: pageNumber,
        pageSize: pageSize,
      }),
    enabled: !!lessonId,
  });
};

export const useCreateTheoryMutation = () => {
  return useMutation({
    mutationKey: ["create-theory"],
    mutationFn: createTheory,
  });
};

export const useGetTheoryQuery = ({ theoryId }: { theoryId: string }) => {
  return useQuery({
    queryKey: ["theory", theoryId],
    queryFn: () => getTheoryById({ theoryId: theoryId }),
    enabled: !!theoryId,
  });
};

export const useDeleteTheoryMutation = () => {
  return useMutation({
    mutationKey: ["delete-theory"],
    mutationFn: deleteTheory,
  });
};

export const useUpdateTheoryMutation = () => {
  return useMutation({
    mutationKey: ["update-theory"],
    mutationFn: updateTheory,
  });
};
