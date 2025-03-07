import {
  Pagination,
  SearchParams,
  SearchResult,
  SearchType,
} from "@highschool/interfaces";
import { endpointSearch } from "@highschool/endpoints";

import fetchPaginatedData from "./common.ts";

// export async function search<T extends SearchType>({
//   type,
//   value,
//   pageSize,
//   pageNumber,
// }: SearchParams): Promise<SearchResult<T>> {
//   try {
//     const { data } = await axiosServices.get(endpointSearch.SEARCH, {
//       params: { type, value },
//     });

//     return data as SearchResult<T>;
//   } catch (error) {
//     console.error("Error in search:", error);
//     throw error;
//   }
// }

export async function search<T extends SearchType>({
  type,
  value,
  pageSize,
  pageNumber,
}: SearchParams): Promise<Pagination<SearchResult<T>>> {
  return fetchPaginatedData<SearchResult<T>>(endpointSearch.SEARCH, {
    pageNumber,
    pageSize,
    type,
    value,
  });
}
