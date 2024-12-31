import { useQuery } from "@tanstack/react-query";

import { getCities, getCitySchools } from "../apis/information.ts";

export const useCitySchoolQuery = ({
  cityId,
  search,
  pageSize,
  pageNumber,
}: {
  search?: string;
  cityId: number;
  pageSize: number;
  pageNumber: number;
}) => {
  return useQuery({
    queryKey: ["schools", cityId, search, pageSize, pageNumber],
    queryFn: () =>
      getCitySchools({
        search: search,
        pageNumber: pageNumber,
        pageSize: pageSize,
        cityId: cityId,
      }),
    enabled: !!cityId,
  });
};

export const useCitiesQuery = ({
  search,
  pageSize,
  pageNumber,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
}) => {
  return useQuery({
    queryKey: ["cities", search, pageSize, pageNumber],
    queryFn: () =>
      getCities({
        search: search,
        pageNumber: pageNumber,
        pageSize: pageSize,
      }),
  });
};
