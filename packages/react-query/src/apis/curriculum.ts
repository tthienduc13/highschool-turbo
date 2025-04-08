import { Curriculum, Pagination, ResponseModel } from "@highschool/interfaces";
import { curriculumEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const getCurricula = async ({
  pageNumber,
  pageSize,
}: Partial<{
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<Curriculum[]>> => {
  return fetchPaginatedData<Curriculum[]>(curriculumEndpoints.get, {
    pageNumber,
    pageSize,
  });
};

export const createCurriculum = async ({
  curriculumName,
  isExternal,
  imageUrl,
}: {
  curriculumName: string;
  isExternal: boolean;
  imageUrl: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(curriculumEndpoints.create, {
      curriculumName,
      isExternal,
      imageUrl,
    });

    return data;
  } catch (error) {
    console.log("Error while creating curriculum", error);
    throw error;
  }
};

// TODO: Edit curriculum function

export const editCurriculum = async ({
  id,
  curriculumName,
  isExternal,
  imageUrl,
}: {
  id: string;
  curriculumName: string;
  isExternal: boolean;
  imageUrl: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(curriculumEndpoints.edit(id), {
      curriculumName,
      isExternal,
      imageUrl,
    });

    return data;
  } catch (error) {
    console.log("Error while creating master course", error);
    throw error;
  }
};

export const deleteCurriculum = async ({
  id,
}: {
  id: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(curriculumEndpoints.delete, {
      params: {
        id,
      },
    });

    return data;
  } catch (error) {
    console.log("Error while deleting curriculum", error);
    throw error;
  }
};
