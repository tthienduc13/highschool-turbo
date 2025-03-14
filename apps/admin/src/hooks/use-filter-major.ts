import { useEffect, useState } from "react";
import { useGetMajorQuery } from "@highschool/react-query/queries";
import { Major } from "@highschool/interfaces";
import { useDebounceValue } from "@highschool/hooks";

import { FilterTable } from "../domain/interfaces/filter-table";

import { usePagination } from "./use-pagination";

interface MajorFilterProps {
  initSearch: string;
}

export interface MajorFilter extends FilterTable<Major> {}

export function useMajorFilter({ initSearch }: MajorFilterProps): MajorFilter {
  const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });
  const [search, setSearch] = useState(initSearch);
  const debounceSearch = useDebounceValue(search, 300);

  const { data, isLoading } = useGetMajorQuery({
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
    pagination,
    isLoading,
    search,
    setSearch,
  };
}
