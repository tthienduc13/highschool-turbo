import { endpointKet } from "@highschool/endpoints";
import { Ket, Pagination } from "@highschool/interfaces";

import fetchPaginatedData from "./common.ts";

export const GetKets = async ({
  typeGet,
  pageNumber,
  pageSize,
  search,
  sortBy,
  isAscensing,
}: Partial<{
  typeGet: string;
  pageNumber: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  isAscensing?: boolean;
}>): Promise<Pagination<Ket>> => {
  return fetchPaginatedData(endpointKet.GET_KETS, {
    typeGet,
    pageNumber,
    pageSize,
    search,
    sortBy,
    isAscensing,
  });
};
