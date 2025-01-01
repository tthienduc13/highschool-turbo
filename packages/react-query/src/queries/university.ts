import { useQuery } from "@tanstack/react-query";

import { UniversityCity } from "@highschool/interfaces";

import { getUniversities } from "../apis/university.ts";

export const useUniversitiesQuery = ({
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
}>) => {
  return useQuery({
    queryKey: [
      "universities",
      { search, majorCode, pageNumber, pageSize, minTuition, maxTuition, city },
    ],
    queryFn: () =>
      getUniversities({
        search,
        majorCode,
        pageNumber,
        pageSize,
        minTuition,
        maxTuition,
        city,
      }),
    enabled: !!majorCode,
  });
};
