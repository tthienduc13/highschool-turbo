"use client";

import { MajorCategoryPrimaryButtons } from "./table/major-category-primary-buttons";
import { columns } from "./table/major-category-columns";
import { MajorCategoryDialogs } from "./table/major-category-dialogs";

import TableProvider from "@/stores/table-context";
import { DataTable } from "@/components/core/table/table";
import { useMajorCategoryFilter } from "@/hooks/use-filter-major-category";

function MajorCategoryManagementModule() {
    const filter = useMajorCategoryFilter({
        initSearch: "",
    });

    return (
        <TableProvider>
            <DataTable
                columns={columns}
                extraButton={<MajorCategoryPrimaryButtons />}
                filter={filter}
                subTitle="Manage your Major Category here."
                title="Major Category List"
            />
            <MajorCategoryDialogs />
        </TableProvider>
    );
}

export default MajorCategoryManagementModule;
