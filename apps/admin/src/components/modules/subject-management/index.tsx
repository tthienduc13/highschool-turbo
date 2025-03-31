"use client";

import { columns } from "./subject-column";
import { SubjectPrimaryButton } from "./subject-primary-button";

import { DataTable } from "@/components/core/table/table";
import { useCourseFilter } from "@/hooks/use-filter-subject";
import TableProvider from "@/stores/table-context";

function SubjectManagementModule() {
  const filter = useCourseFilter({ initSearch: "" });

  return (
    <TableProvider>
      <DataTable
        columns={columns}
        extraButton={<SubjectPrimaryButton />}
        filter={filter}
        subTitle="Manage your Subject here."
        title="Subject List"
      />
      {/* <SubjectActions /> */}
    </TableProvider>
  );
}

export default SubjectManagementModule;
