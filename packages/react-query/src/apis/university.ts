import { Pagination, University, UniversityCity } from "@highschool/interfaces";
import { universityEndpoints } from "@highschool/endpoints";

import fetchPaginatedData from "./common.ts";

export const getUniversities = async ({
  search,
  majorCode,
  pageNumber,
  pageSize,
  minTuition,
  maxTuition,
  city,
}: Partial<{
  search: string;
  majorCode: string;
  pageNumber: number;
  pageSize: number;
  minTuition: number;
  maxTuition: number;
  city: UniversityCity;
}>): Promise<Pagination<University[]>> => {
  return fetchPaginatedData<University[]>(universityEndpoints.getList, {
    pageNumber,
    pageSize,
    search,
    majorCode,
    minTuition,
    maxTuition,
    city,
  });
};
