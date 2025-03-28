"use client";

import { columns } from "./region-columns";
import { RegionPrimaryButtons } from "./region-primary-buttons";
import { RegionDialogs } from "./region-dialogs";

import TableProvider from "@/stores/table-context";
import { DataTable } from "@/components/core/table/table";
import { useRegionFilter } from "@/hooks/use-filter-region";

function MasterRegionModule() {
  const filter = useRegionFilter({
    initSearch: "",
  });

  return (
    <TableProvider>
      <DataTable
        columns={columns}
        extraButton={<RegionPrimaryButtons />}
        filter={filter}
        subTitle="Manage your Region here."
        title="Region List"
      />
      <RegionDialogs />
    </TableProvider>
  );
}

export default MasterRegionModule;
