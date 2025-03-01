import { SearchParams, SearchResult, SearchType } from "@highschool/interfaces";
import { endpointSearch } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

export async function search<T extends SearchType>({
  type,
  value,
}: SearchParams): Promise<SearchResult<T>> {
  try {
    const { data } = await axiosServices.get(endpointSearch.SEARCH, {
      params: { type, value },
    });

    return data as SearchResult<T>;
  } catch (error) {
    console.error("Error in search:", error);
    throw error;
  }
}
