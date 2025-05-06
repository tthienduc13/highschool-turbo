"use client";

import { columns } from "./zone-columns";
import { ZoneDialogs } from "./zone-dialogs";

import { DataTable } from "@/components/core/table/table";
import { useZoneFilter } from "@/hooks/use-filter-zone";
import TableProvider from "@/stores/table-context";

function ZoneManagementModule() {
    const filter = useZoneFilter({
        initSearch: "",
        initStatus: [],
    });

    return (
        <TableProvider>
            <DataTable
                columns={columns}
                filter={filter}
                subTitle="Manage your Zone here."
                title="Zone List"
            />
            <ZoneDialogs />
        </TableProvider>
    );
}

export default ZoneManagementModule;
