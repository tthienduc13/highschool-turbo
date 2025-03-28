import { Metadata, Pagination } from "@highschool/interfaces";

import axiosServices, { axiosClientWithoutAuth } from "../lib/axios.ts";

type QueryParams = Record<
  string,
  string | number | boolean | undefined | null | string[]
>;

async function fetchPaginatedData<T>(
  endpoint: string,
  params: QueryParams = {},
): Promise<Pagination<T>> {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(params)
        .filter(([_, value]) => {
          if (value === undefined || value === null || value === "") {
            return false;
          }

          if (Array.isArray(value)) {
            const nonEmptyValues = value.filter((item) => item !== "");

            return nonEmptyValues.length > 0;
          }

          return true;
        })
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return [key, value.filter((item) => item !== "")];
          }

          return [key, value];
        }),
    );

    const response = await axiosServices.get(endpoint, {
      params: filteredParams,
    });

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
    console.error("Error while fetching paginated data:", error);
    throw error;
  }
}
export default fetchPaginatedData;

export async function fetchUnauthedPaginatedData<T>(
  endpoint: string,
  params: QueryParams = {},
): Promise<Pagination<T>> {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null && value !== "",
      ),
    );

    const response = await axiosClientWithoutAuth.get(endpoint, {
      params: filteredParams,
    });
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
    console.error("Error while fetching paginated data:", error);
    throw error;
  }
}
