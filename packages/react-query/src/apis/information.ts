import { endpointInformation } from "@highschool/endpoints";
import { City, Pagination, School } from "@highschool/interfaces";

import fetchPaginatedData from "./common.ts";

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
  return fetchPaginatedData<School[]>(
    endpointInformation.GET_ALL_CITY_SCHOOL(cityId),
    {
      search,
      pageNumber,
      pageSize,
    },
  );
};

// export const getCities = async ({
//   search,
//   pageNumber,
//   pageSize,
// }: {
//   search?: string;
//   pageNumber: number;
//   pageSize: number;
// }): Promise<Pagination<City>> => {
//   return fetchPaginatedData<City>(endpointInformation.GET_ALL_CITIES, {
//     search,
//     pageNumber,
//     pageSize,
//   });
// };

export const getCities = async ({
  search,
  pageNumber,
  pageSize,
}: {
  search?: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<City[]>> => {
  return fetchPaginatedData<City[]>(endpointInformation.GET_ALL_CITIES, {
    search,
    pageNumber,
    pageSize,
  });
};
