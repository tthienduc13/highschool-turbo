import { useEffect, useState } from "react";
import { useGetMajorCategoryQuery } from "@highschool/react-query/queries";
import { MajorCategory } from "@highschool/interfaces";
import { useDebounceValue } from "@highschool/hooks";

import { FilterTable } from "../domain/interfaces/filter-table";

import { usePagination } from "./use-pagination";

interface MajorCategoryFilterProps {
  initSearch: string;
}

export interface MajorCategoryFilter extends FilterTable<MajorCategory> {}

export function useMajorCategoryFilter({
  initSearch,
}: MajorCategoryFilterProps): MajorCategoryFilter {
  const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });
  const [search, setSearch] = useState(initSearch);
  const debounceSearch = useDebounceValue(search, 300);

  const { data, isLoading } = useGetMajorCategoryQuery({
    pageNumber: pagination.page,
    pageSize: pagination.pageSize,
    search: debounceSearch,
  });

  useEffect(() => {
    if (!isLoading) {
      pagination.setPageCount(data?.totalPages ?? 1);
    }
  }, [data]);

  return {
    data: Array.isArray(data?.data) ? data.data : [],
    placeholder: "Filter major category",
    pagination,
    isLoading,
    search,
    setSearch,
  };
}
