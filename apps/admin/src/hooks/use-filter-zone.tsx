import { ZonePreview } from "@highschool/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounceValue } from "@highschool/hooks";
import { useZonesQuery } from "@highschool/react-query/queries";

import { usePagination } from "./use-pagination";

import { FilterTable } from "@/domain/interfaces/filter-table";

interface ZoneFilterProps {
    initSearch: string;
    initStatus: string[];
}

export interface ZoneFilter extends FilterTable<ZonePreview> {
    status: string[];
    setStatus: Dispatch<SetStateAction<string[]>>;
}

export function useZoneFilter({
    initSearch,
    initStatus,
}: ZoneFilterProps): ZoneFilter {
    const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });
    const [search, setSearch] = useState(initSearch);
    const [status, setStatus] = useState(initStatus);
    const debounceSearch = useDebounceValue(search, 300);

    const { data, isLoading } = useZonesQuery({
        pageNumber: pagination.page,
        pageSize: pagination.pageSize,
        search: debounceSearch,
        isAscending: true,
    });

    useEffect(() => {
        if (!isLoading) {
            pagination.setPageCount(data?.totalPages ?? 1);
        }
    }, [data]);

    return {
        data: Array.isArray(data?.data) ? data.data : [],
        placeholder: "Filter user",
        pagination,
        isLoading,
        search,
        status,
        setSearch,
        setStatus,
    };
}
