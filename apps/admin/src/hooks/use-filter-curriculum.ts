import { useEffect } from "react";
import { useCurriculaQuery } from "@highschool/react-query/queries";
import { Curriculum } from "@highschool/interfaces";

import { FilterTable } from "./../domain/interfaces/filter-table";
import { usePagination } from "./use-pagination";

export interface CurriculumFilter extends FilterTable<Curriculum> {}

export function useCurriculumFilter(): CurriculumFilter {
  const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });

  const { data, isLoading } = useCurriculaQuery({
    pageNumber: pagination.page,
    pageSize: pagination.pageSize,
  });

  useEffect(() => {
    if (!isLoading) {
      pagination.setPageCount(data?.totalPages ?? 1);
    }
  }, [data]);

  return {
    data: Array.isArray(data?.data) ? data.data : [],
    placeholder: "Filter curriculum",
    pagination,
    isLoading,
  };
}
