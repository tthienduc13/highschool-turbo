import { endpointInformation } from "@highschool/endpoints";
import { City, Pagination, School } from "@highschool/interfaces";

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
    endpointInformation.GET_ALL_CITY_SCHOOL(cityId),
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
  return fetchUnauthedPaginatedData<City[]>(endpointInformation.GET_ALL_CITIES, {
    search,
    pageNumber,
    pageSize,
  });
};
