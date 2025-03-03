import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUsersQuery } from "@highschool/react-query/queries";
import { UserPreview } from "@highschool/interfaces";
import { useDebounceValue } from "@highschool/hooks";

import { usePagination } from "./use-pagination";

import { UserRole } from "@/domain/enums/user";

interface AccountFilterProps {
  initSearch: string;
  initStatus: string[];
  initRole: UserRole;
}

export interface AccountFilter {
  data: UserPreview[];
  pagination: ReturnType<typeof usePagination>;
  isLoading: boolean;
  search: string;
  status: string[];
  setSearch: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string[]>>;
}

export function useAccountFilter({
  initSearch,
  initStatus,
  initRole,
}: AccountFilterProps): AccountFilter {
  const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });
  const [search, setSearch] = useState(initSearch);
  const [status, setStatus] = useState(initStatus);
  const debounceSearch = useDebounceValue(search, 300);

  const { data, isLoading } = useUsersQuery({
    page: pagination.page,
    eachPage: pagination.pageSize,
    roleName: initRole.toString(),
    status: status,
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
    status,
    setSearch,
    setStatus,
  };
}
