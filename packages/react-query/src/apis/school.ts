import {
  CreateSchoolData,
  Pagination,
  ResponseModel,
  School,
} from "@highschool/interfaces";
import { endpointInformation } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const createSchools = async (
  schoolList: CreateSchoolData[],
): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      endpointInformation.CREATE_SCHOOLS,
      schoolList,
    );

    return data;
  } catch (error) {
    console.error("Error while create school list ", error);
    throw error;
  }
};

export const getSchools = async ({
  search,
  pageNumber,
  pageSize,
  searchProvince,
}: {
  search?: string;
  pageNumber: number;
  pageSize: number;
  searchProvince?: string;
}): Promise<Pagination<School[]>> => {
  return fetchPaginatedData<School[]>(endpointInformation.GET_SCHOOLS, {
    search,
    pageNumber,
    pageSize,
    searchProvince,
  });
};

export const getProvinceSchools = async ({
  provinceId,
  search,
  pageNumber,
  pageSize,
}: {
  provinceId: string;
  search?: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<School[]>> => {
  return fetchPaginatedData<School[]>(
    endpointInformation.GET_ALL_PROVINCE_SCHOOL(provinceId),
    {
      search,
      pageNumber,
      pageSize,
    },
  );
};
