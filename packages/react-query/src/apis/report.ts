import { Metadata, Pagination, Report } from "@highschool/interfaces";
import { reportEndpoint } from "@highschool/endpoints";

import axiosServices, { createQueryString } from "../lib/axios.ts";

export const getReportsApp = async (params: {
  page: number;
  eachPage: number;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}): Promise<Pagination<Report[]>> => {
  const queryString = createQueryString(params);
  const response = await axiosServices.get(
    `${reportEndpoint.get}?${queryString}`,
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
};
