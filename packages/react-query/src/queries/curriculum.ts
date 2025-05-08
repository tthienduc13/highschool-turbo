import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createCurriculum,
  deleteCurriculum,
  editCurriculum,
  getCourseCurriculum,
  getCurricula,
} from "../apis/curriculum.ts";

export const useCurriculaQuery = ({
  pageSize,
  pageNumber,
}: {
  pageSize: number;
  pageNumber: number;
}) => {
  return useQuery({
    queryKey: ["curricula", { pageNumber, pageSize }],
    queryFn: () => getCurricula({ pageNumber, pageSize }),
  });
};

export const useCurriculumMutation = () => {
  return useMutation({
    mutationKey: ["create-curriculum"],
    mutationFn: createCurriculum,
  });
};

export const useDeleteCurriculumMutation = () => {
  return useMutation({
    mutationKey: ["delete-curriculum"],
    mutationFn: deleteCurriculum,
  });
};

export const useEditCurriculumMutation = () => {
  return useMutation({
    mutationKey: ["edit-curriculum"],
    mutationFn: editCurriculum,
  });
};

export const useCourseCurriculumQuery = ({
  courseId,
}: {
  courseId: string;
}) => {
  return useQuery({
    queryKey: ["course-curriculum", courseId],
    queryFn: () => getCourseCurriculum({ courseId: courseId }),
  });
};
