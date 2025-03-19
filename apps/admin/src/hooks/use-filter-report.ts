import { useEffect, useState } from "react";
import { useReportAppQuery } from "@highschool/react-query/queries";
import { Report } from "@highschool/interfaces";

import { FilterTable } from "../domain/interfaces/filter-table";

import { usePagination } from "./use-pagination";

interface ReportFilterProps {
  initSearch: string;
}

export interface ReportFilter extends FilterTable<Report> {}

export function useReportFilter({
  initSearch,
}: ReportFilterProps): ReportFilter {
  const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });
  const [search, setSearch] = useState(initSearch);

  const { data, isLoading } = useReportAppQuery({
    page: pagination.page,
    eachPage: pagination.pageSize,
  });

  useEffect(() => {
    if (!isLoading) {
      pagination.setPageCount(data?.totalPages ?? 1);
    }
  }, [data]);

  return {
    data: data?.data ?? [],
    // data: Array.isArray(data?.data) ? data.data : [],
    pagination,
    isLoading,
    search,
    setSearch,
  };
}
