import { useQuery } from "@tanstack/react-query";

import { getCourseBySlug, getCourses } from "../apis/course.ts";

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
