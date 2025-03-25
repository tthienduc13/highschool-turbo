"use client";

import { columns } from "./school-columns";
import { SchoolPrimaryButtons } from "./school-primary-buttons";
import { SchoolDialogs } from "./school-dialogs";

import TableProvider from "@/stores/table-context";
import { DataTable } from "@/components/core/table/table";
import { useSchoolFilter } from "@/hooks/use-filter-school";

function MasterSchoolModule() {
  const filter = useSchoolFilter({
    initSearch: "",
  });

  return (
    <TableProvider>
      <DataTable
        columns={columns}
        extraButton={<SchoolPrimaryButtons />}
        filter={filter}
        subTitle="Manage your School here."
        title="School List"
      />
      <SchoolDialogs />
    </TableProvider>
  );
}

export default MasterSchoolModule;
