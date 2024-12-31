import { endpointLesson } from "@highschool/endpoints";
import {
  Lesson,
  LessonDetail,
  Pagination,
  ResponseModel,
} from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";
import fetchPaginatedData from "./common.ts";

export const getLessonList = async ({
  chapterId,
  pageNumber,
  pageSize,
}: {
  chapterId: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<Lesson[]>> => {
  return fetchPaginatedData<Lesson[]>(endpointLesson.GET_LESSONS(chapterId), {
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
      endpointLesson.GET_LESSON_DETAIL(lessonId),
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
      endpointLesson.FINISH_LESSON(lessonId),
    );
    return data;
  } catch (error) {
    console.log("Error while updating lesson progress", error);
    throw error;
  }
};
