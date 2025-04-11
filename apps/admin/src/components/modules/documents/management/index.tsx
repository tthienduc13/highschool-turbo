"use client";

import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useDebounceValue } from "@highschool/hooks";
import { useDocumentQuery } from "@highschool/react-query/queries";

import { DocumentCard } from "./document-card";
import { DocumentFilter, FilterDocument } from "./filter-document";

import { ControlBar } from "@/components/ui/control-bar";

function DocumentModule() {
    const [filters, setFilters] = useState<DocumentFilter>({
        schoolId: null,
        subjectIds: [] as string[],
        semester: null,
        documentYear: null as number | null,
        provinceId: null,
        categoryIds: [] as string[],
        curriculumIds: [] as string[],
        search: "",
    });

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const debounceSearch = useDebounceValue(filters.search, 300);

    const { data } = useDocumentQuery({
        pageSize,
        pageNumber: pageIndex,
        categoryIds: filters.categoryIds.join(","),
        curriculumIds: filters.curriculumIds.join(","),
        documentYear: filters.documentYear,
        provinceId: filters.provinceId,
        schoolId: filters.schoolId,
        semester: filters.semester,
        subjectIds: filters.subjectIds.join(","),
        seach: debounceSearch,
    });

    const handleFilter = () => { };

    return (
        <div className="space-y-10">
            <div className="text-primary text-3xl font-bold">Documents</div>
            <FilterDocument
                filters={filters}
                handleFilter={handleFilter}
                setFilters={setFilters}
            />
            <DocumentCard documents={data?.data ?? []} />
            <ControlBar
                currentPage={data?.currentPage ?? 1}
                pageSize={pageSize}
                setPagination={setPagination}
                totalCount={data?.totalCount ?? 0}
                totalPage={data?.totalPages ?? 1}
            />
        </div>
    );
}

export default DocumentModule;
