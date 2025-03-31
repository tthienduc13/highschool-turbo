import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createCourse,
  createCourseWithAutomation,
  createMasterCourse,
  deleteMasterCourse,
  editCourses,
  editMasterCourse,
  enrollCourse,
  getCategories,
  getCourseById,
  getCourseBySlug,
  getCourses,
  getMasterCourses,
  unEnrollCourse,
} from "../apis/course.ts";

export const useMasterCourseMutation = () => {
  return useMutation({
    mutationKey: ["master-course"],
    mutationFn: createMasterCourse,
  });
};

export const useEditMasterCourseMutation = () => {
  return useMutation({
    mutationKey: ["edit-master-course"],
    mutationFn: editMasterCourse,
  });
};

export const useDeleteMasterCourseMutation = () => {
  return useMutation({
    mutationKey: ["delete-master-course"],
    mutationFn: deleteMasterCourse,
  });
};

export const useMasterCoursesQuery = ({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["master-courses", { pageSize, pageNumber }],
    queryFn: () => getMasterCourses({ pageNumber, pageSize }),
  });
};

export const useCoursesQuery = ({
  search,
  grade,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  grade: string;
  pageNumber: number;
  pageSize: number;
}>) => {
  return useQuery({
    queryKey: ["courses", { search, grade, pageNumber, pageSize }],
    queryFn: () =>
      getCourses({
        search: search,
        grade: grade,
        pageNumber: pageNumber,
        pageSize: pageSize,
      }),
  });
};

export const useCourseBySlugQuery = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug({ slug }),
  });
};

export const useCourseByIdQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById({ id }),
  });
};

export const useEnrollMutation = () => {
  return useMutation({
    mutationKey: ["enroll"],
    mutationFn: enrollCourse,
  });
};

export const useUnEnrollMutation = () => {
  return useMutation({
    mutationKey: ["unenroll"],
    mutationFn: unEnrollCourse,
  });
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useCourseMutation = () => {
  return useMutation({
    mutationKey: ["create-course"],
    mutationFn: createCourse,
  });
};

export const useCourseWithAutoMutation = () => {
  return useMutation({
    mutationKey: ["create-course-with-auto"],
    mutationFn: createCourseWithAutomation,
  });
};

export const useEditCourseMutation = () => {
  return useMutation({
    mutationKey: ["edit-course"],
    mutationFn: editCourses,
  });
};
