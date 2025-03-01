import { useQuery } from "@tanstack/react-query";
import { SearchResult, SearchType } from "@highschool/interfaces";

import { search } from "../apis/search.ts";

export const useSearchQuery = <T extends SearchType>({
  type,
  value,
}: {
  type: T;
  value: string;
}) => {
  return useQuery<SearchResult<T>>({
    queryKey: ["search", type, value],
    queryFn: () => search({ type, value }) as Promise<SearchResult<T>>,
    enabled: Boolean(value),
  });
};
