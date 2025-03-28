import { useEffect } from "react";
import { useMasterCoursesQuery } from "@highschool/react-query/queries";
import { MasterCourse } from "@highschool/interfaces";

import { FilterTable } from "./../domain/interfaces/filter-table";
import { usePagination } from "./use-pagination";

export interface MasterSubjectFilter extends FilterTable<MasterCourse> {}

export function useMasterSubjectFilter(): MasterSubjectFilter {
  const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });

  const { data, isLoading } = useMasterCoursesQuery({
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
    placeholder: "Filter master subject",
    pagination,
    isLoading,
  };
}
