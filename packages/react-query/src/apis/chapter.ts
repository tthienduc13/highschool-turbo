import {
  Chapter,
  ChapterListResponse,
  CreateChapterPayload,
  EditchapterPayload,
  Pagination,
  ResponseModel,
} from "@highschool/interfaces";
import { chapterEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const getChapterList = async ({
  courseSlug,
  curriculumId,
  pageNumber,
  pageSize,
}: {
  courseSlug: string;
  curriculumId: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<ChapterListResponse>> => {
  return fetchPaginatedData<ChapterListResponse>(
    chapterEndpoints.getChapters(courseSlug, curriculumId),
    {
      pageNumber,
      pageSize,
    },
  );
};

export const getChapterListById = async ({
  courseId,
  curriculumId,
  pageNumber,
  pageSize,
}: {
  courseId: string;
  curriculumId: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<Chapter[]>> => {
  return fetchPaginatedData<Chapter[]>(
    chapterEndpoints.getListById(courseId, curriculumId),
    {
      pageNumber,
      pageSize,
    },
  );
};

export const createChapter = async ({
  values,
  courseId,
  curriculumId,
}: {
  values: CreateChapterPayload;
  courseId: string;
  curriculumId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      chapterEndpoints.createChapter(courseId, curriculumId),
      values,
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const editChapter = async ({
  values,
}: {
  values: EditchapterPayload;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(
      chapterEndpoints.editChapter,
      values,
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteChapter = async ({
  chapterId,
}: {
  chapterId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      chapterEndpoints.deleteChapter(chapterId),
    );

    return data;
  } catch (error) {
    throw error;
  }
};
