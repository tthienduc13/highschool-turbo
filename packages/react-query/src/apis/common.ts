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
    // Filter params more thoroughly
    const filteredParams = Object.fromEntries(
      Object.entries(params)
        .filter(([_, value]) => {
          // Filter out undefined, null, and empty string values
          if (value === undefined || value === null || value === "") {
            return false;
          }

          // Filter out empty arrays or arrays that only contain empty strings
          if (Array.isArray(value)) {
            // Remove empty strings from the array
            const nonEmptyValues = value.filter((item) => item !== "");

            // Only include if array has non-empty values after filtering
            return nonEmptyValues.length > 0;
          }

          return true;
        })
        .map(([key, value]) => {
          // If it's an array, filter out empty strings
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
