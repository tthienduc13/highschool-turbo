import { City, Pagination, School } from "@highschool/interfaces";
import { documentEndpoints } from "@highschool/endpoints";

import { fetchUnauthedPaginatedData } from "./common.ts";

export const getCitySchools = async ({
  cityId,
  search,
  pageNumber,
  pageSize,
}: {
  cityId: number;
  search?: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<School[]>> => {
  return fetchUnauthedPaginatedData<School[]>(
    documentEndpoints.getCitySchools(cityId),
    {
      search,
      pageNumber,
      pageSize,
    },
  );
};

export const getCities = async ({
  search,
  pageNumber,
  pageSize,
}: {
  search?: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<City[]>> => {
  return fetchUnauthedPaginatedData<City[]>(documentEndpoints.getAllCities, {
    search,
    pageNumber,
    pageSize,
  });
};
