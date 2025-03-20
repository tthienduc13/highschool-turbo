import {
  Metadata,
  Pagination,
  Report,
  ResponseModel,
} from "@highschool/interfaces";
import { reportEndpoint } from "@highschool/endpoints";

import axiosServices, { createQueryString } from "../lib/axios.ts";

export const getReportsApp = async (params: {
  page: number;
  eachPage: number;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  reportId?: string;
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

export const updateStatusReportsApp = async ({
  reportId,
  status,
}: {
  reportId: string;
  status: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.put(reportEndpoint.updateStatus, {
      reportId,
      status,
    });

    return data;
  } catch (error) {
    console.error("Error while update status report ", error);
    throw error;
  }
};
