import {
  City,
  Metadata,
  Pagination,
  ResponseModel,
} from "@highschool/interfaces";
import { informationEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

export const createProvinces = async (
  provinceList: Omit<City, "numberSchool">[],
): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      informationEndpoints.createProvinces,
      provinceList,
    );

    return data;
  } catch (error) {
    console.error("Error while create province list ");
    throw error;
  }
};

export const getProvinces = async ({
  search,
  pageNumber,
  pageSize,
}: {
  search?: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<City[]>> => {
  try {
    const response = await axiosServices.get(
      informationEndpoints.getProvinces,
      {
        params: {
          search,
          pageNumber,
          pageSize,
        },
      },
    );
    const paginationHeader = response.headers["x-pagination"];
    const metadata: Metadata = JSON.parse(paginationHeader || "{}");

    return {
      data: response.data,
      currentPage: metadata.CurrentPage,
      pageSize: metadata.PageSize,
      totalCount: metadata.TotalCount,
      totalPages: metadata.TotalPages,
    };
  } catch (error) {
    console.error("Error while getting provinces", error);
    throw error;
  }
};
