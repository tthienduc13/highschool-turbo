import { useEffect, useState } from "react";
import { useProvincesQuery } from "@highschool/react-query/queries";
import { City } from "@highschool/interfaces";
import { useDebounceValue } from "@highschool/hooks";

import { FilterTable } from "./../domain/interfaces/filter-table";
import { usePagination } from "./use-pagination";

interface RegionFilterProps {
    initSearch: string;
}

export interface RegionFilter extends FilterTable<City> { }

export function useRegionFilter({
    initSearch,
}: RegionFilterProps): RegionFilter {
    const pagination = usePagination({ initialPage: 1, initialPageSize: 10 });
    const [search, setSearch] = useState(initSearch);
    const debounceSearch = useDebounceValue(search, 300);

    const { data, isLoading } = useProvincesQuery({
        search: debounceSearch,
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
        pagination,
        isLoading,
        search,
        setSearch,
    };
}
