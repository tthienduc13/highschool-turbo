import { useQuery } from "@tanstack/react-query";
import { Pagination, SearchResult, SearchType } from "@highschool/interfaces";

import { search } from "../apis/search.ts";

export const useSearchQuery = <T extends SearchType>({
  type,
  value,
  pageSize,
  pageNumber,
}: {
  type: T;
  value: string;
  pageSize: number;
  pageNumber: number;
}) => {
  return useQuery<Pagination<SearchResult<T>>>({
    queryKey: ["search", { type, value, pageSize, pageNumber }],
    queryFn: () => search({ type, value, pageNumber, pageSize }),
    enabled: Boolean(value),
  });
};
