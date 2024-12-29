import { endpointCourse } from "@highschool/endpoints";
import { Course, Pagination } from "@highschool/interfaces";

import fetchPaginatedData from "./common.ts";

export const getCourses = async ({
  search,
  grade,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  grade: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<Course[]>> => {
  return fetchPaginatedData<Course[]>(endpointCourse.GET_COURSES, {
    pageNumber,
    pageSize,
    search,
    grade,
  });
};
