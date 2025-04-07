import {
  FlashcardAttachToType,
  FlashcardEntitySearch,
  Pagination,
  SearchParams,
  SearchResult,
  SearchType,
} from "@highschool/interfaces";
import { searchEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

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
  return fetchPaginatedData<SearchResult<T>>(searchEndpoints.search, {
    pageNumber,
    pageSize,
    type,
    value,
  });
}

export const searchFlashcardEntity = async ({
  type,
  limit,
  value,
}: {
  type: FlashcardAttachToType;
  limit: number;
  value: string;
}): Promise<FlashcardEntitySearch[]> => {
  try {
    const { data } = await axiosServices.get(searchEndpoints.searchEntity, {
      params: { value, limit, type },
    });

    return data;
  } catch (error) {
    console.error("Error in search:", error);
    throw error;
  }
};
