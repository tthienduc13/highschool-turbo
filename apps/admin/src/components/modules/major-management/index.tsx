"use client";

import { MajorPrimaryButtons } from "./table/major-primary-buttons";
import { columns } from "./table/major-columns";
import { MajorDialogs } from "./table/major-dialogs";

import TableProvider from "@/stores/table-context";
import { DataTable } from "@/components/core/table/table";
import { useMajorFilter } from "@/hooks/use-filter-major";

function MajorManagement() {
    const filter = useMajorFilter({
        initSearch: "",
    });

    return (
        <TableProvider>
            <DataTable
                columns={columns}
                extraButton={<MajorPrimaryButtons />}
                filter={filter}
                subTitle="Manage your Major here."
                title="Major List"
            />
            <MajorDialogs />
        </TableProvider>
    );
}

export default MajorManagement;
