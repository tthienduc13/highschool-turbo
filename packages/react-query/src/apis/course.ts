import {
  Course,
  CourseCategory,
  MasterCourse,
  Pagination,
  ResponseModel,
} from "@highschool/interfaces";
import { categoryEndpoints, courseEndpoints } from "@highschool/endpoints";

import axiosServices, { axiosClientWithoutAuth } from "../lib/axios.ts";

import { fetchUnauthedPaginatedData } from "./common.ts";

export const getMasterCourses = async (): Promise<MasterCourse[]> => {
  try {
    const { data } = await axiosServices.get(courseEndpoints.getMasterCourse);

    return data;
  } catch (error) {
    console.error("Error while getting master courses", error);
    throw error;
  }
};

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
  return fetchUnauthedPaginatedData<Course[]>(courseEndpoints.getCourses, {
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
    const { data } = await axiosServices.get(courseEndpoints.getBySlug(slug));

    return data;
  } catch (error) {
    console.log("Error while getting course by slug", error);
    throw error;
  }
};

export const getCategories = async (): Promise<CourseCategory[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(categoryEndpoints.getAll);

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
      `${courseEndpoints.enroll({ subjectId: subjectId, curriculumId: curriculumId })}`,
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
      `${courseEndpoints.unenroll({ subjectId: subjectId, curriculumId: curriculumId })}`,
    );

    return data;
  } catch (error) {
    console.log("Error while unenroll", error);
    throw error;
  }
};
