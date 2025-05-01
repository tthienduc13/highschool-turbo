"use client";

import { columns } from "./subject-column";
import { SubjectPrimaryButton } from "./subject-primary-button";
import { SubjectActions } from "./subject-actions";

import { DataTable } from "@/components/core/table/table";
import { useMasterSubjectFilter } from "@/hooks/use-filter-master-subject";
import TableProvider from "@/stores/table-context";

function MasterSubjectModule() {
  const filter = useMasterSubjectFilter();

  return (
    <TableProvider>
      <DataTable
        columns={columns}
        extraButton={<SubjectPrimaryButton />}
        filter={filter}
        subTitle="Manage your Master Subject here."
        title="Master Subject List"
      />
      <SubjectActions />
    </TableProvider>
  );
}

export default MasterSubjectModule;
