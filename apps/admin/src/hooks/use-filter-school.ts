import { useEffect, useState } from "react";
import {
  useProvincesQuery,
  useSchoolsQuery,
} from "@highschool/react-query/queries";
import { School } from "@highschool/interfaces";
import { useDebounceValue } from "@highschool/hooks";

import {
  DataFacedFilter,
  FilterTable,
} from "./../domain/interfaces/filter-table";
import { usePagination } from "./use-pagination";

interface SchoolFilterProps {
  initSearch: string;
}

export interface SchoolFilter extends FilterTable<School> {}

export function useSchoolFilter({
  initSearch,
}: SchoolFilterProps): SchoolFilter {
  const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });
  const [search, setSearch] = useState(initSearch);
  const debounceSearch = useDebounceValue(search, 300);
  const [province, setProvince] = useState<string | null>(null);

  const { data, isLoading } = useSchoolsQuery({
    pageNumber: pagination.page,
    pageSize: pagination.pageSize,
    search: debounceSearch,
    searchProvince: province ?? "",
  });

  useEffect(() => {
    if (!isLoading) {
      pagination.setPageCount(data?.totalPages ?? 1);
    }
  }, [data]);

  const { data: provices } = useProvincesQuery({
    search: debounceSearch,
    pageNumber: pagination.page,
    pageSize: 99999,
  });

  const facedFilter: DataFacedFilter[] = [
    {
      name: "Province",
      list:
        provices?.data.map((province) => ({
          label: province.provinceName,
          value: province.provinceName.toString(),
        })) ?? [],
      setSingleSelect: setProvince,
    },
  ];

  return {
    data: data?.data ?? [],
    placeholder: "Filter school",
    // data: Array.isArray(data?.data) ? data.data : [],
    pagination,
    isLoading,
    search,
    setSearch,
    facedFilter,
  };
}
