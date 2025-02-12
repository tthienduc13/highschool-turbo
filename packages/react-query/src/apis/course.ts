import { endpointCategory, endpointCourse } from "@highschool/endpoints";
import {
  Course,
  CourseCategory,
  Pagination,
  ResponseModel,
} from "@highschool/interfaces";

import axiosServices, { axiosClientWithoutAuth } from "../lib/axios.ts";
import fetchPaginatedData, { fetchUnauthedPaginatedData } from "./common.ts";

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
  return fetchUnauthedPaginatedData<Course[]>(endpointCourse.GET_COURSES, {
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

export const getCategories = async (): Promise<CourseCategory[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(
      endpointCategory.GET_ALL_CATEGORIES,
    );
    return data;
  } catch (error) {
    console.error("Error while getting category", error);
    throw error;
  }
};

export const enrollCourse = async ({
  subjectId,
  curriculumId,
}: {
  subjectId: string;
  curriculumId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      `${endpointCourse.ENROLL_COURSE({ subjectId: subjectId, curriculumId: curriculumId })}`,
    );
    return data;
  } catch (error) {
    console.log("Error while enroll", error);
    throw error;
  }
};

export const unEnrollCourse = async ({
  subjectId,
  curriculumId,
}: {
  subjectId: string;
  curriculumId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      `${endpointCourse.UNENROLL_COURSE({ subjectId: subjectId, curriculumId: curriculumId })}`,
    );
    return data;
  } catch (error) {
    console.log("Error while unenroll", error);
    throw error;
  }
};
