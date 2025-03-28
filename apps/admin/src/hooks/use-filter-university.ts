import { useEffect, useState } from "react";
import { useUniversitiesQuery } from "@highschool/react-query/queries";
import { University, UniversityCity } from "@highschool/interfaces";
import { useDebounceValue } from "@highschool/hooks";

import {
  DataFacedFilter,
  FilterTable,
} from "../domain/interfaces/filter-table";

import { usePagination } from "./use-pagination";

interface UniversityFilterProps {
  initSearch: string;
}

export interface UniversityFilter extends FilterTable<University> {}

export function useUniversityFilter({
  initSearch,
}: UniversityFilterProps): UniversityFilter {
  const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });
  const [search, setSearch] = useState(initSearch);
  const debounceSearch = useDebounceValue(search, 300);
  const [province, setProvince] = useState<UniversityCity>();

  const { data, isLoading } = useUniversitiesQuery({
    pageNumber: pagination.page,
    pageSize: pagination.pageSize,
    search: debounceSearch,
    city: province,
  });

  useEffect(() => {
    if (!isLoading) {
      pagination.setPageCount(data?.totalPages ?? 1);
    }
  }, [data]);

  const facedFilter: DataFacedFilter[] = [
    {
      name: "Region",
      list:
        Object.values(UniversityCity).map((city) => ({
          value: city,
          label: city,
        })) ?? [],
      setSingleSelect: (value: string) => setProvince(value as UniversityCity),
    },
  ];

  return {
    data: Array.isArray(data?.data) ? data.data : [],
    placeholder: "Filter university",
    pagination,
    isLoading,
    search,
    setSearch,
    facedFilter,
  };
}
