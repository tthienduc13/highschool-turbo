import {
  CreateLessonPayload,
  EditLessonPayload,
  Lesson,
  LessonDetail,
  Pagination,
  ResponseModel,
} from "@highschool/interfaces";
import { lessonEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const createLesson = async ({
  values,
  chapterId,
}: {
  values: CreateLessonPayload;
  chapterId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      lessonEndpoints.createLesson(chapterId),
      values,
    );

    return data;
  } catch (error) {
    console.log("Error while creating lesson", error);
    throw error;
  }
};

export const editLesson = async ({
  values,
}: {
  values: EditLessonPayload;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(
      lessonEndpoints.editLesson,
      values,
    );

    return data;
  } catch (error) {
    console.log("Error while editing lesson", error);
    throw error;
  }
};

export const deleteLessons = async (
  lessonIds: string,
): Promise<ResponseModel<string>> => {
  const { data } = await axiosServices.delete(lessonEndpoints.deleteLessons, {
    data: [lessonIds],
  });

  return data;
};

export const getLessonList = async ({
  chapterId,
  pageNumber,
  pageSize,
}: {
  chapterId: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<Lesson[]>> => {
  return fetchPaginatedData<Lesson[]>(lessonEndpoints.getLessons(chapterId), {
    pageNumber,
    pageSize,
  });
};

export const getLessonDetail = async ({
  lessonId,
}: {
  lessonId: string;
}): Promise<LessonDetail> => {
  try {
    const { data } = await axiosServices.get(
      lessonEndpoints.getLessonDetail(lessonId),
    );

    return data;
  } catch (error) {
    console.log("Error while getting lesson detail", error);
    throw error;
  }
};

export const markLessonDone = async ({
  lessonId,
}: {
  lessonId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      lessonEndpoints.finishLesson(lessonId),
    );

    return data;
  } catch (error) {
    console.log("Error while updating lesson progress", error);
    throw error;
  }
};
