"use client";

import { columns } from "./report-columns";
import { ReportDialogs } from "./report-dialogs";

import TableProvider from "@/stores/table-context";
import { DataTable } from "@/components/core/table/table";
import { useReportFilter } from "@/hooks/use-filter-report";

// Status badge component

export default function ReportsModule() {
    const filter = useReportFilter({
        initSearch: "",
    });

    return (
        <TableProvider>
            <DataTable
                columns={columns}
                filter={filter}
                subTitle="Manage your Reports App here."
                title="Reports List"
            />
            <ReportDialogs />
        </TableProvider>
    );
}
