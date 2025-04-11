import { useQuery } from "@tanstack/react-query";
import {
  FlashcardAttachToType,
  Pagination,
  SearchResult,
  SearchType,
} from "@highschool/interfaces";

import { search, searchFlashcardEntity } from "../apis/search.ts";

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

export const useFlashcardEntitySearch = ({
  type,
  limit,
  value,
}: {
  type: FlashcardAttachToType;
  limit: number;
  value: string;
}) => {
  return useQuery({
    queryKey: ["search-entity", { type, value, limit }],
    queryFn: () => searchFlashcardEntity({ type, value, limit }),
  });
};
