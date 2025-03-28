"use client";

import { columns } from "./university-columns";
import { UniversityPrimaryButtons } from "./university-primary-buttons";
import { UniversityDialogs } from "./university-dialogs";

import TableProvider from "@/stores/table-context";
import { DataTable } from "@/components/core/table/table";
import { useUniversityFilter } from "@/hooks/use-filter-university";

function MasterUniversityModule() {
  const filter = useUniversityFilter({
    initSearch: "",
  });

  return (
    <TableProvider>
      <DataTable
        columns={columns}
        extraButton={<UniversityPrimaryButtons />}
        filter={filter}
        subTitle="Manage your University here."
        title="University List"
      />
      <UniversityDialogs />
    </TableProvider>
  );
}

export default MasterUniversityModule;
