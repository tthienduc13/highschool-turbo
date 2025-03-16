import {
  CreateSchoolData,
  Pagination,
  ResponseModel,
  School,
} from "@highschool/interfaces";
import { informationEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const createSchools = async (
  schoolList: CreateSchoolData[],
): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      informationEndpoints.createSchools,
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
  return fetchPaginatedData<School[]>(informationEndpoints.getSchools, {
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
    informationEndpoints.getAllProvinceSchool(provinceId),
    {
      search,
      pageNumber,
      pageSize,
    },
  );
};
