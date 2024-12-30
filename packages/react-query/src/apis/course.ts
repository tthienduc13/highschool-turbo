import { endpointCourse } from "@highschool/endpoints";
import { Course, Pagination } from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";
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

export const getCourseBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Course> => {
  try {
    const { data } = await axiosServices.get(endpointCourse.GET_BY_SLUG(slug));
    return data;
  } catch (error) {
    console.log("Error while getting course by slug", error);
    throw error;
  }
};
