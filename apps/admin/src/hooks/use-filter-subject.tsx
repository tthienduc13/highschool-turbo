import { useEffect, useState } from "react";
import { useCoursesQuery } from "@highschool/react-query/queries";
import { Course } from "@highschool/interfaces";
import { useDebounceValue } from "@highschool/hooks";

import { FilterTable } from "./../domain/interfaces/filter-table";
import { usePagination } from "./use-pagination";

interface CourseFilterProps {
  initSearch: string;
}

export interface CourseFilter extends FilterTable<Course> {}

export function useCourseFilter({
  initSearch,
}: CourseFilterProps): CourseFilter {
  const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });
  const [search, setSearch] = useState(initSearch);
  const debounceSearch = useDebounceValue(search, 300);
  const [grade, setGrade] = useState<string>("");

  const { data, isLoading } = useCoursesQuery({
    pageNumber: pagination.page,
    pageSize: pagination.pageSize,
    search: debounceSearch,
    grade: grade,
  });

  useEffect(() => {
    if (!isLoading) {
      pagination.setPageCount(data?.totalPages ?? 1);
    }
  }, [data]);

  //   const facedFilter: DataFacedFilter[] = [
  //     {
  //       name: "category",
  //       list: [],
  //       setSingleSelect: setGrade,
  //     },
  //   ];

  return {
    data: data?.data ?? [],
    placeholder: "Filter subject",
    pagination,
    isLoading,
    search,
    setSearch,
    // facedFilter,
  };
}
