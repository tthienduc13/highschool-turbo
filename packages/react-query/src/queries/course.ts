import { useMutation, useQuery } from "@tanstack/react-query";

import {
  enrollCourse,
  getCategories,
  getCourseBySlug,
  getCourses,
  getMasterCourses,
  unEnrollCourse,
} from "../apis/course.ts";

export const useMasterCoursesQuery = () => {
  return useQuery({
    queryKey: ["masterCourses"],
    queryFn: getMasterCourses,
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
    queryKey: ["courses", search, grade, pageNumber, pageSize],
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
