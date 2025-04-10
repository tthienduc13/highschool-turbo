import { FSRSPreset, Pagination, ResponseModel } from "@highschool/interfaces";
import { fsrsEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const getFsrs = async ({
  search,
  pageSize,
  pageNumber,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
}): Promise<Pagination<FSRSPreset[]>> => {
  const result = await fetchPaginatedData<FSRSPreset[]>(fsrsEndpoints.get, {
    search,
    pageSize,
    pageNumber,
  });

  return result;
};

export const updateFsrs = async ({
  id,
  title,
  fsrsParameters,
  retrievability,
  isPublicPreset,
}: {
  id: string;
  title: string;
  fsrsParameters: number[];
  retrievability: number;
  isPublicPreset: boolean;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.put(fsrsEndpoints.update(id), {
      title,
      fsrsParameters,
      retrievability,
      isPublicPreset,
    });

    return data.data;
  } catch (error) {
    console.log("Error while updating fsrs preset", error);
    throw error;
  }
};

export const createFsrs = async ({
  title,
  fsrsParameters,
  retrievability,
  isPublicPreset,
}: {
  title: string;
  fsrsParameters: number[];
  retrievability: number;
  isPublicPreset: boolean;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(fsrsEndpoints.create, {
      title,
      fsrsParameters,
      retrievability,
      isPublicPreset,
    });

    return data.data;
  } catch (error) {
    console.log("Error while updating fsrs preset", error);
    throw error;
  }
};

export const deleteFsrs = async ({
  id,
}: {
  id: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(fsrsEndpoints.delete(id));

    return data.data;
  } catch (error) {
    console.log("Error while updating fsrs preset", error);
    throw error;
  }
};
