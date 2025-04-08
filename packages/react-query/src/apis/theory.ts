import {
  CreateTheoryPayload,
  Pagination,
  ResponseModel,
  Theory,
} from "@highschool/interfaces";
import { theoryEndpoint } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const createTheory = async ({
  lessonId,
  theoryName,
  theoryDescription,
  theoryContent,
  theoryContentHtml,
}: CreateTheoryPayload): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(theoryEndpoint.create(lessonId), {
      theoryName: theoryName,
      theoryDescription: theoryDescription,
      theoryContentJson: theoryContent,
      theoryContentHtml: theoryContentHtml,
    });

    return data;
  } catch (error) {
    console.error("Error while create theory", error);
    throw error;
  }
};

export const updateTheory = async ({
  theoryId,
  theoryName,
  theoryDescription,
  theoryContentJson,
  theoryContentHtml,
}: {
  theoryId: string;
  theoryName?: string;
  theoryDescription?: string;
  theoryContentJson?: string;
  theoryContentHtml?: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(
      theoryEndpoint.update(theoryId),
      {
        theoryName,
        theoryDescription,
        theoryContentJson,
        theoryContentHtml,
      },
    );

    return data;
  } catch (error) {
    console.error("Error while updating theory", theoryId, error);
    throw error;
  }
};

export const getLessonTheory = async ({
  search,
  id,
  pageNumber,
  pageSize,
}: {
  search?: string;
  id: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<Theory[]>> => {
  return fetchPaginatedData<Theory[]>(theoryEndpoint.getLessonTheories(id), {
    search,
    pageNumber,
    pageSize,
    id,
  });
};

export const getTheoryById = async ({
  theoryId,
}: {
  theoryId: string;
}): Promise<Theory> => {
  try {
    const { data } = await axiosServices.get(theoryEndpoint.getById(theoryId));

    return data;
  } catch (error) {
    console.error("Error while getting theory", theoryId, error);
    throw error;
  }
};

export const deleteTheory = async ({
  theoryId,
}: {
  theoryId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      theoryEndpoint.delete(theoryId),
    );

    return data;
  } catch (error) {
    console.error("Error while deleting theory", theoryId, error);
    throw error;
  }
};
